# 🔷 Guía de Migración a TypeScript - Mana Bloom App

> **Versión:** 1.0.0  
> **Fecha:** 2025-11-24  
> **Propósito:** Guía completa para migrar gradualmente de JavaScript a TypeScript

---

## 📋 Índice

1. [Introducción](#introducción)
2. [Setup Inicial](#setup-inicial)
3. [Migración Paso a Paso](#migración-paso-a-paso)
4. [Templates y Ejemplos](#templates-y-ejemplos)
5. [Patrones Comunes](#patrones-comunes)
6. [Troubleshooting](#troubleshooting)
7. [Checklist de Migración](#checklist-de-migración)

---

## 🎯 Introducción

### ¿Por qué TypeScript?

- ✅ **Refactorización segura** - Detecta errores antes de ejecutar
- ✅ **Autocompletado mejorado** - VS Code/Cursor saben qué propiedades existen
- ✅ **Documentación viva** - Los tipos son documentación
- ✅ **Menos bugs** - Validación en tiempo de desarrollo

### Estrategia de Migración

**GRADUAL** - JavaScript y TypeScript coexisten sin problemas:

```
✅ App.js (JavaScript) + EconomyContext.tsx (TypeScript) = Funciona perfectamente
```

**No necesitas migrar todo de golpe.** La app seguirá funcionando mientras migras archivo por archivo.

---

## 🔧 Setup Inicial

### 1. Dependencias Instaladas ✅

```bash
npm install --save-dev typescript @types/react @types/react-native
```

### 2. Configuración Creada ✅

- `tsconfig.json` - Configuración de TypeScript
- Modo estricto activado
- Compatibilidad con JavaScript habilitada

### 3. Verificar Setup

```bash
# Verificar que TypeScript está instalado
npx tsc --version

# Debería mostrar: Version 5.x.x
```

---

## 📝 Migración Paso a Paso

### Regla de Oro

**"Cuando toques un archivo para refactorizar, migrarlo a TypeScript"**

No migres archivos que funcionan bien. Solo migra cuando:
1. Estés refactorizando ese archivo
2. Estés creando un archivo nuevo
3. Estés arreglando un bug en ese archivo

---

### Proceso de Migración de un Archivo

#### Paso 1: Renombrar Archivo

```bash
# Componente
ShopItemCard.js → ShopItemCard.tsx

# Hook
useShopPurchase.js → useShopPurchase.ts

# Servicio
shopService.js → shopService.ts

# Utilidad
errorTracker.js → errorTracker.ts
```

**Nota:** Usa `.tsx` solo si el archivo tiene JSX (componentes React)

#### Paso 2: Agregar Tipos Básicos

```typescript
// Antes (JS)
function calculatePrice(item) {
  return item.price * item.quantity;
}

// Después (TS)
interface Item {
  price: number;
  quantity: number;
}

function calculatePrice(item: Item): number {
  return item.price * item.quantity;
}
```

#### Paso 3: Corregir Errores de TypeScript

El editor te mostrará errores en rojo. Corrígelos uno por uno:

```typescript
// Error: Property 'sku' does not exist on type 'Item'
// Solución: Agregar 'sku' a la interfaz
interface Item {
  sku: string;
  price: number;
  quantity: number;
}
```

#### Paso 4: Probar que Funciona

```bash
# La app debe seguir funcionando
npx expo start
```

---

## 📦 Templates y Ejemplos

### Template: Componente React

```typescript
// [MB] Módulo: Shop / Archivo: ShopItemCard
// Afecta: ShopScreen
// Propósito: Renderizar tarjeta de item con precio y rareza
// Puntos de edición futura: agregar animaciones
// Autor: Sebastian Vega - Fecha: 2025-11-24

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors, Spacing } from '../theme';

// ========================================
// Types & Interfaces
// ========================================

interface ShopItem {
  sku: string;
  title: string;
  emoji: string;
  desc: string;
  cost: {
    mana?: number;
    coin?: number;
    gem?: number;
  };
  rarity: 'basic' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'divine';
}

interface ShopItemCardProps {
  item: ShopItem;
  onPress: (item: ShopItem) => void;
  disabled?: boolean;
}

// ========================================
// Component
// ========================================

export default function ShopItemCard({ item, onPress, disabled = false }: ShopItemCardProps) {
  const handlePress = () => {
    if (!disabled) {
      onPress(item);
    }
  };

  return (
    <TouchableOpacity 
      style={[styles.container, disabled && styles.disabled]} 
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={styles.emoji}>{item.emoji}</Text>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.desc}</Text>
    </TouchableOpacity>
  );
}

// ========================================
// Styles
// ========================================

const styles = StyleSheet.create({
  container: {
    padding: Spacing.base,
    backgroundColor: Colors.surface,
    borderRadius: 12,
  },
  disabled: {
    opacity: 0.5,
  },
  emoji: {
    fontSize: 32,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.text,
  },
  description: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
```

---

### Template: Custom Hook

```typescript
// [MB] Módulo: Shop / Archivo: useShopPurchase
// Afecta: ShopScreen, InventoryContext
// Propósito: Manejar lógica de compra con validación
// Puntos de edición futura: agregar descuentos
// Autor: Sebastian Vega - Fecha: 2025-11-24

import { useState, useCallback } from 'react';
import { useAppState, useAppDispatch } from '../state/AppContext';

// ========================================
// Types & Interfaces
// ========================================

interface PurchaseResult {
  success: boolean;
  message: string;
  item?: ShopItem;
}

interface ShopItem {
  sku: string;
  title: string;
  cost: {
    mana?: number;
    coin?: number;
    gem?: number;
  };
}

// ========================================
// Hook
// ========================================

export default function useShopPurchase() {
  const { mana, wallet } = useAppState();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);

  const canAfford = useCallback((item: ShopItem): boolean => {
    const { cost } = item;
    
    if (cost.mana && mana < cost.mana) return false;
    if (cost.coin && wallet.coin < cost.coin) return false;
    if (cost.gem && wallet.gem < cost.gem) return false;
    
    return true;
  }, [mana, wallet]);

  const purchase = useCallback(async (item: ShopItem): Promise<PurchaseResult> => {
    setLoading(true);

    try {
      if (!canAfford(item)) {
        return {
          success: false,
          message: 'No tienes suficientes recursos',
        };
      }

      // Procesar compra
      if (item.cost.mana) {
        dispatch({ type: 'PURCHASE_WITH_MANA', payload: item.cost.mana });
      }
      if (item.cost.coin) {
        dispatch({ type: 'SPEND_COIN', payload: item.cost.coin });
      }
      if (item.cost.gem) {
        dispatch({ type: 'SPEND_GEM', payload: item.cost.gem });
      }

      // Agregar a inventario
      dispatch({
        type: 'ADD_TO_INVENTORY',
        payload: {
          sku: item.sku,
          title: item.title,
          category: 'potions', // Determinar categoría
        },
      });

      return {
        success: true,
        message: `${item.title} comprado exitosamente`,
        item,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Error al procesar la compra',
      };
    } finally {
      setLoading(false);
    }
  }, [canAfford, dispatch]);

  return {
    purchase,
    canAfford,
    loading,
  };
}
```

---

### Template: Servicio

```typescript
// [MB] Módulo: Shop / Archivo: shopService
// Afecta: ShopScreen, useShopPurchase
// Propósito: Lógica de negocio del shop
// Puntos de edición futura: integrar con backend
// Autor: Sebastian Vega - Fecha: 2025-11-24

// ========================================
// Types & Interfaces
// ========================================

export interface ShopItem {
  sku: string;
  title: string;
  emoji: string;
  desc: string;
  cost: ItemCost;
  rarity: Rarity;
}

export interface ItemCost {
  mana?: number;
  coin?: number;
  gem?: number;
}

export type Rarity = 'basic' | 'uncommon' | 'rare' | 'epic' | 'legendary' | 'mythic' | 'divine';

export interface Wallet {
  coin: number;
  gem: number;
}

// ========================================
// Service Functions
// ========================================

/**
 * Valida si el usuario puede comprar un item
 */
export function canAffordItem(
  item: ShopItem,
  mana: number,
  wallet: Wallet
): boolean {
  const { cost } = item;
  
  if (cost.mana && mana < cost.mana) return false;
  if (cost.coin && wallet.coin < cost.coin) return false;
  if (cost.gem && wallet.gem < cost.gem) return false;
  
  return true;
}

/**
 * Calcula el precio total de un item
 */
export function calculateTotalCost(item: ShopItem, quantity: number = 1): ItemCost {
  return {
    mana: item.cost.mana ? item.cost.mana * quantity : undefined,
    coin: item.cost.coin ? item.cost.coin * quantity : undefined,
    gem: item.cost.gem ? item.cost.gem * quantity : undefined,
  };
}

/**
 * Filtra items por rareza
 */
export function filterByRarity(items: ShopItem[], rarity: Rarity): ShopItem[] {
  return items.filter(item => item.rarity === rarity);
}

/**
 * Ordena items por precio (mana)
 */
export function sortByPrice(items: ShopItem[], ascending: boolean = true): ShopItem[] {
  return [...items].sort((a, b) => {
    const priceA = a.cost.mana || a.cost.coin || a.cost.gem || 0;
    const priceB = b.cost.mana || b.cost.coin || b.cost.gem || 0;
    return ascending ? priceA - priceB : priceB - priceA;
  });
}
```

---

### Template: Context

```typescript
// [MB] Módulo: State / Archivo: EconomyContext
// Afecta: Toda la app (economía)
// Propósito: Manejar estado de mana, wallet, XP
// Puntos de edición futura: sincronización cloud
// Autor: Sebastian Vega - Fecha: 2025-11-24

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { getMana, setMana, getWallet, setWallet } from '../storage';

// ========================================
// Types & Interfaces
// ========================================

interface EconomyState {
  mana: number;
  wallet: {
    coin: number;
    gem: number;
  };
  xp: number;
  level: number;
  xpGoal: number;
}

type EconomyAction =
  | { type: 'SET_MANA'; payload: number }
  | { type: 'ADD_COIN'; payload: number }
  | { type: 'SPEND_COIN'; payload: number }
  | { type: 'ADD_GEM'; payload: number }
  | { type: 'SPEND_GEM'; payload: number }
  | { type: 'ADD_XP'; payload: number };

// ========================================
// Initial State
// ========================================

const initialState: EconomyState = {
  mana: 50,
  wallet: { coin: 0, gem: 0 },
  xp: 0,
  level: 1,
  xpGoal: 100,
};

// ========================================
// Reducer
// ========================================

function economyReducer(state: EconomyState, action: EconomyAction): EconomyState {
  switch (action.type) {
    case 'SET_MANA':
      return { ...state, mana: action.payload };
    
    case 'ADD_COIN':
      return {
        ...state,
        wallet: { ...state.wallet, coin: state.wallet.coin + action.payload },
      };
    
    case 'SPEND_COIN': {
      const newCoin = state.wallet.coin - action.payload;
      if (newCoin < 0) return state;
      return {
        ...state,
        wallet: { ...state.wallet, coin: newCoin },
      };
    }
    
    case 'ADD_GEM':
      return {
        ...state,
        wallet: { ...state.wallet, gem: state.wallet.gem + action.payload },
      };
    
    case 'SPEND_GEM': {
      const newGem = state.wallet.gem - action.payload;
      if (newGem < 0) return state;
      return {
        ...state,
        wallet: { ...state.wallet, gem: newGem },
      };
    }
    
    case 'ADD_XP': {
      let xp = state.xp + action.payload;
      let level = state.level;
      let xpGoal = state.xpGoal;
      
      while (xp >= xpGoal) {
        xp -= xpGoal;
        level += 1;
        xpGoal = Math.ceil(xpGoal * 1.25);
      }
      
      return { ...state, xp, level, xpGoal };
    }
    
    default:
      return state;
  }
}

// ========================================
// Context
// ========================================

const EconomyStateContext = createContext<EconomyState | undefined>(undefined);
const EconomyDispatchContext = createContext<React.Dispatch<EconomyAction> | undefined>(undefined);

// ========================================
// Provider
// ========================================

interface EconomyProviderProps {
  children: React.ReactNode;
}

export function EconomyProvider({ children }: EconomyProviderProps) {
  const [state, dispatch] = useReducer(economyReducer, initialState);

  // Hydrate from storage
  useEffect(() => {
    async function hydrate() {
      const storedMana = await getMana();
      const storedWallet = await getWallet();
      
      dispatch({ type: 'SET_MANA', payload: storedMana });
      // Wallet hydration would go here
    }
    hydrate();
  }, []);

  // Persist to storage
  useEffect(() => {
    setMana(state.mana);
  }, [state.mana]);

  return (
    <EconomyStateContext.Provider value={state}>
      <EconomyDispatchContext.Provider value={dispatch}>
        {children}
      </EconomyDispatchContext.Provider>
    </EconomyStateContext.Provider>
  );
}

// ========================================
// Hooks
// ========================================

export function useEconomyState(): EconomyState {
  const context = useContext(EconomyStateContext);
  if (context === undefined) {
    throw new Error('useEconomyState must be used within EconomyProvider');
  }
  return context;
}

export function useEconomyDispatch(): React.Dispatch<EconomyAction> {
  const context = useContext(EconomyDispatchContext);
  if (context === undefined) {
    throw new Error('useEconomyDispatch must be used within EconomyProvider');
  }
  return context;
}

export function useMana(): number {
  return useEconomyState().mana;
}

export function useWallet() {
  return useEconomyState().wallet;
}
```

---

## 🎨 Patrones Comunes

### 1. Props de Componentes

```typescript
// ❌ Evitar
function MyComponent(props) {
  return <View>{props.title}</View>;
}

// ✅ Correcto
interface MyComponentProps {
  title: string;
  count?: number; // Opcional
  onPress: () => void;
}

function MyComponent({ title, count = 0, onPress }: MyComponentProps) {
  return <View>{title}</View>;
}
```

### 2. Estado con useState

```typescript
// ❌ Evitar
const [items, setItems] = useState([]);

// ✅ Correcto
interface Item {
  id: string;
  title: string;
}

const [items, setItems] = useState<Item[]>([]);
```

### 3. Funciones Async

```typescript
// ❌ Evitar
async function fetchData() {
  const response = await fetch('/api/data');
  return response.json();
}

// ✅ Correcto
interface ApiResponse {
  data: Item[];
  error?: string;
}

async function fetchData(): Promise<ApiResponse> {
  const response = await fetch('/api/data');
  return response.json();
}
```

### 4. Eventos

```typescript
// ❌ Evitar
function handlePress(event) {
  console.log(event);
}

// ✅ Correcto
import { GestureResponderEvent } from 'react-native';

function handlePress(event: GestureResponderEvent) {
  console.log(event.nativeEvent);
}
```

---

## 🔧 Troubleshooting

### Error: "Cannot find module"

```typescript
// Error
import { Colors } from '../theme';

// Solución: Crear archivo de tipos
// theme.d.ts
export const Colors: {
  background: string;
  text: string;
  // ...
};
```

### Error: "Property does not exist"

```typescript
// Error
const item = { sku: 'p1', title: 'Potion' };
console.log(item.price); // Error: Property 'price' does not exist

// Solución: Definir interfaz completa
interface Item {
  sku: string;
  title: string;
  price?: number; // Opcional si no siempre existe
}
```

### Error: "Type 'null' is not assignable"

```typescript
// Error
const [user, setUser] = useState(null);

// Solución: Usar union type
interface User {
  name: string;
}

const [user, setUser] = useState<User | null>(null);
```

---

## ✅ Checklist de Migración

### Por Archivo

- [ ] Renombrar `.js` → `.ts` o `.tsx`
- [ ] Agregar header `[MB]` si no lo tiene
- [ ] Definir interfaces para props
- [ ] Definir interfaces para estado
- [ ] Tipar funciones (parámetros y retorno)
- [ ] Corregir errores de TypeScript
- [ ] Probar que la app funciona
- [ ] Commit con mensaje descriptivo

### Por Módulo

- [ ] Crear archivo de tipos compartidos (`types.ts`)
- [ ] Migrar componentes principales
- [ ] Migrar hooks
- [ ] Migrar servicios
- [ ] Actualizar imports en archivos relacionados

---

## 📊 Orden de Migración Recomendado

### Fase 1: Archivos Nuevos (Semana 1-2)
1. ✅ `EconomyContext.tsx`
2. ✅ `ChallengesContext.tsx`
3. ✅ `InventoryContext.tsx`
4. ✅ `GardenContext.tsx`

### Fase 2: Hooks y Servicios (Semana 3-4)
5. ✅ `useShopPurchase.ts`
6. ✅ `useTaskManagement.ts`
7. ✅ `shopService.ts`
8. ✅ `taskService.ts`

### Fase 3: Pantallas Grandes (Semana 5-6)
9. ✅ `ShopScreen.tsx`
10. ✅ `TasksScreen.tsx`
11. ✅ `HomeScreen.tsx`

### Fase 4: Componentes y Utilidades (Semana 7-8)
12. ✅ Componentes comunes
13. ✅ Utilidades
14. ✅ Constantes → tipos

---

## 🎯 Comandos Útiles

```bash
# Verificar errores de TypeScript
npx tsc --noEmit

# Generar tipos para una librería
npm install --save-dev @types/[nombre-libreria]

# Limpiar caché de TypeScript
rm -rf node_modules/.cache
```

---

## 📚 Recursos

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [React TypeScript Cheatsheet](https://react-typescript-cheatsheet.netlify.app/)
- [React Native TypeScript](https://reactnative.dev/docs/typescript)

---

**Última actualización:** 2025-11-24  
**Mantenedor:** Sebastian Vega  
**Versión:** 1.0.0
