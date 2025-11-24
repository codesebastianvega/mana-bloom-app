// [MB] Módulo: State / Archivo: InventoryContext
// Afecta: Shop, Inventory, Rewards (gestión de items del usuario)
// Propósito: Manejar inventario de items (consumibles, cosméticos, herramientas)
// Puntos de edición futura: categorías, filtros, favoritos, estadísticas de uso
// Autor: Sebastian Vega - Fecha: 2025-11-24

import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { getInventory, setInventory as persistInventory } from '../../storage';
import { pushInventoryItem } from '../../lib/sync';

// ========================================
// Types & Interfaces
// ========================================

export interface InventoryItem {
  id: string;
  sku: string;
  title: string;
  category: string;
  quantity: number;
  createdAt: string;
}

export interface InventoryState {
  items: InventoryItem[];
}

export type InventoryAction =
  | { type: 'SET_INVENTORY'; payload: InventoryItem[] }
  | { type: 'ADD_TO_INVENTORY'; payload: { sku: string; title: string; category: string; quantity?: number } }
  | { type: 'CONSUME_ITEM'; payload: { sku: string; quantity?: number } }
  | { type: 'DISCARD_ITEM'; payload: { sku: string; quantity?: number } };

// ========================================
// Initial State
// ========================================

const initialState: InventoryState = {
  items: [],
};

// ========================================
// Reducer
// ========================================

function inventoryReducer(state: InventoryState, action: InventoryAction): InventoryState {
  switch (action.type) {
    case 'SET_INVENTORY':
      return { ...state, items: action.payload };

    case 'ADD_TO_INVENTORY': {
      const { sku, title, category, quantity: rawQuantity } = action.payload;
      const quantityDelta = Math.max(1, Number(rawQuantity) || 1);
      const existing = state.items.find((it) => it.sku === sku);

      if (existing) {
        return {
          ...state,
          items: state.items.map((it) =>
            it.sku === sku ? { ...it, quantity: it.quantity + quantityDelta } : it
          ),
        };
      }

      const newItem: InventoryItem = {
        id: Date.now().toString(),
        sku,
        title,
        category,
        quantity: quantityDelta,
        createdAt: new Date().toISOString(),
      };

      return { ...state, items: [...state.items, newItem] };
    }

    case 'CONSUME_ITEM': {
      const { sku, quantity: consumeQty = 1 } = action.payload;
      const item = state.items.find((it) => it.sku === sku);

      if (!item || item.quantity < consumeQty) {
        return state;
      }

      const newQuantity = item.quantity - consumeQty;

      if (newQuantity <= 0) {
        // Remove item completely
        return {
          ...state,
          items: state.items.filter((it) => it.sku !== sku),
        };
      }

      return {
        ...state,
        items: state.items.map((it) =>
          it.sku === sku ? { ...it, quantity: newQuantity } : it
        ),
      };
    }

    case 'DISCARD_ITEM': {
      const { sku, quantity: discardQty } = action.payload;

      if (!discardQty) {
        // Remove all of this item
        return {
          ...state,
          items: state.items.filter((it) => it.sku !== sku),
        };
      }

      const item = state.items.find((it) => it.sku === sku);
      if (!item) return state;

      const newQuantity = Math.max(0, item.quantity - discardQty);

      if (newQuantity <= 0) {
        return {
          ...state,
          items: state.items.filter((it) => it.sku !== sku),
        };
      }

      return {
        ...state,
        items: state.items.map((it) =>
          it.sku === sku ? { ...it, quantity: newQuantity } : it
        ),
      };
    }

    default:
      return state;
  }
}

// ========================================
// Context
// ========================================

const InventoryStateContext = createContext<InventoryState | undefined>(undefined);
const InventoryDispatchContext = createContext<React.Dispatch<InventoryAction> | undefined>(
  undefined
);

// ========================================
// Provider
// ========================================

interface InventoryProviderProps {
  children: React.ReactNode;
}

export function InventoryProvider({ children }: InventoryProviderProps) {
  const [state, dispatch] = useReducer(inventoryReducer, initialState);
  const isHydrating = useRef(true);
  const userIdRef = useRef<string | null>(null);

  // Hydrate from storage
  useEffect(() => {
    async function hydrate() {
      try {
        const storedInventory = await getInventory();
        dispatch({ type: 'SET_INVENTORY', payload: storedInventory });
      } catch (error) {
        console.error('[InventoryContext] Hydration error:', error);
      } finally {
        isHydrating.current = false;
      }
    }

    hydrate();
  }, []);

  // Persist inventory changes
  useEffect(() => {
    if (isHydrating.current) return;
    persistInventory(state.items);

    // Sync to cloud (iterate and upsert each item)
    if (userIdRef.current) {
      state.items.forEach((item) => pushInventoryItem(userIdRef.current!, item));
    }
  }, [state.items]);

  return (
    <InventoryStateContext.Provider value={state}>
      <InventoryDispatchContext.Provider value={dispatch}>
        {children}
      </InventoryDispatchContext.Provider>
    </InventoryStateContext.Provider>
  );
}

// ========================================
// Hooks
// ========================================

export function useInventoryState(): InventoryState {
  const context = useContext(InventoryStateContext);
  if (context === undefined) {
    throw new Error('useInventoryState must be used within InventoryProvider');
  }
  return context;
}

export function useInventoryDispatch(): React.Dispatch<InventoryAction> {
  const context = useContext(InventoryDispatchContext);
  if (context === undefined) {
    throw new Error('useInventoryDispatch must be used within InventoryProvider');
  }
  return context;
}

export function useInventory(): InventoryItem[] {
  return useInventoryState().items;
}

// Convenience hook to find item by SKU
export function useInventoryItem(sku: string): InventoryItem | undefined {
  const items = useInventory();
  return items.find((item) => item.sku === sku);
}

// Check if user has item
export function useHasItem(sku: string, minQuantity: number = 1): boolean {
  const item = useInventoryItem(sku);
  return item ? item.quantity >= minQuantity : false;
}

// Get item quantity
export function useItemQuantity(sku: string): number {
  const item = useInventoryItem(sku);
  return item?.quantity || 0;
}

// Get items by category
export function useInventoryByCategory(category: string): InventoryItem[] {
  const items = useInventory();
  return items.filter((item) => item.category === category);
}
