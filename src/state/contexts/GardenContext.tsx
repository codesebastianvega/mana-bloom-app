// [MB] Módulo: State / Archivo: GardenContext
// Afecta: GardenScreen (gestión de items plantados en el jardín)
// Propósito: Manejar estado del jardín virtual del usuario
// Puntos de edición futura: clima, temporadas, eventos de jardín
// Autor: Sebastian Vega - Fecha: 2025-11-24

import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { getGardenState, setGardenState as persistGardenState } from '../../storage';

// ========================================
// Types & Interfaces
// ========================================

export interface GardenItem {
  id: string;
  sku: string;
  x: number;
  y: number;
  placedAt: string;
  [key: string]: any;
}

export interface GardenState {
  items: GardenItem[];
}

export type GardenAction =
  | { type: 'SET_GARDEN_ITEMS'; payload: GardenItem[] }
  | { type: 'ADD_GARDEN_ITEM'; payload: GardenItem }
  | { type: 'REMOVE_GARDEN_ITEM'; payload: { id: string } }
  | { type: 'UPDATE_GARDEN_ITEM'; payload: { id: string; updates: Partial<GardenItem> } };

// ========================================
// Initial State
// ========================================

const initialState: GardenState = {
  items: [],
};

// ========================================
// Reducer
// ========================================

function gardenReducer(state: GardenState, action: GardenAction): GardenState {
  switch (action.type) {
    case 'SET_GARDEN_ITEMS':
      return { ...state, items: action.payload };

    case 'ADD_GARDEN_ITEM':
      return { ...state, items: [...state.items, action.payload] };

    case 'REMOVE_GARDEN_ITEM': {
      const { id } = action.payload;
      return {
        ...state,
        items: state.items.filter((item) => item.id !== id),
      };
    }

    case 'UPDATE_GARDEN_ITEM': {
      const { id, updates } = action.payload;
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === id ? { ...item, ...updates } : item
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

const GardenStateContext = createContext<GardenState | undefined>(undefined);
const GardenDispatchContext = createContext<React.Dispatch<GardenAction> | undefined>(undefined);

// ========================================
// Provider
// ========================================

interface GardenProviderProps {
  children: React.ReactNode;
}

export function GardenProvider({ children }: GardenProviderProps) {
  const [state, dispatch] = useReducer(gardenReducer, initialState);
  const isHydrating = useRef(true);

  // Hydrate from storage
  useEffect(() => {
    async function hydrate() {
      try {
        const storedGarden = await getGardenState();
        dispatch({ type: 'SET_GARDEN_ITEMS', payload: storedGarden.items || [] });
      } catch (error) {
        console.error('[GardenContext] Hydration error:', error);
      } finally {
        isHydrating.current = false;
      }
    }

    hydrate();
  }, []);

  // Persist garden changes
  useEffect(() => {
    if (isHydrating.current) return;
    persistGardenState({ items: state.items });
  }, [state.items]);

  return (
    <GardenStateContext.Provider value={state}>
      <GardenDispatchContext.Provider value={dispatch}>
        {children}
      </GardenDispatchContext.Provider>
    </GardenStateContext.Provider>
  );
}

// ========================================
// Hooks
// ========================================

export function useGardenState(): GardenState {
  const context = useContext(GardenStateContext);
  if (context === undefined) {
    throw new Error('useGardenState must be used within GardenProvider');
  }
  return context;
}

export function useGardenDispatch(): React.Dispatch<GardenAction> {
  const context = useContext(GardenDispatchContext);
  if (context === undefined) {
    throw new Error('useGardenDispatch must be used within GardenProvider');
  }
  return context;
}

export function useGardenItems(): GardenItem[] {
  return useGardenState().items;
}

export function useGardenItem(id: string): GardenItem | undefined {
  const items = useGardenItems();
  return items.find((item) => item.id === id);
}

export function useGardenItemCount(): number {
  return useGardenItems().length;
}
