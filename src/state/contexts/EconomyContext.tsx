// [MB] Módulo: State / Archivo: EconomyContext
// Afecta: Toda la app (economía: mana, wallet, XP, buffs)
// Propósito: Manejar estado de economía separado del AppContext monolítico
// Puntos de edición futura: agregar transacciones, descuentos, eventos económicos
// Autor: Sebastian Vega - Fecha: 2025-11-24

import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import {
  getMana,
  setMana as persistMana,
  getWallet,
  setWallet as persistWallet,
  getProgress,
  setProgress as persistProgress,
  getBuffs,
  setBuffs as persistBuffs,
} from '../../storage';
import { pushProfile } from '../../lib/sync';

// ========================================
// Types & Interfaces
// ========================================

export interface Buff {
  type: string;
  expiresAt: number;
  [key: string]: any;
}

export interface Wallet {
  coin: number;
  gem: number;
}

export interface EconomyState {
  mana: number;
  wallet: Wallet;
  xp: number;
  level: number;
  xpGoal: number;
  buffs: Buff[];
}

export type EconomyAction =
  | { type: 'SET_MANA'; payload: number }
  | { type: 'SET_WALLET'; payload: Partial<Wallet> }
  | { type: 'ADD_COIN'; payload: number }
  | { type: 'SPEND_COIN'; payload: number }
  | { type: 'ADD_GEM'; payload: number }
  | { type: 'SPEND_GEM'; payload: number }
  | { type: 'SET_PROGRESS'; payload: { xp: number; level: number; xpGoal: number } }
  | { type: 'SET_BUFFS'; payload: Buff[] }
  | { type: 'APPLY_TASK_REWARD'; payload: { xpDelta?: number; manaDelta?: number } }
  | { type: 'ACTIVATE_BUFF'; payload: Buff }
  | { type: 'CLEAN_EXPIRED_BUFFS' }
  | { type: 'PURCHASE_WITH_MANA'; payload: number };

// ========================================
// Initial State
// ========================================

const initialState: EconomyState = {
  mana: 50,
  wallet: { coin: 0, gem: 0 },
  xp: 0,
  level: 1,
  xpGoal: 100,
  buffs: [],
};

// ========================================
// Helper Functions
// ========================================

function roundToNearest10(n: number): number {
  return Math.round(n / 10) * 10;
}

function cleanupExpired(buffs: Buff[], t: number = Date.now()): Buff[] {
  return (buffs || []).filter((b) => (b?.expiresAt || 0) > t);
}

function xpMultiplier(buffs: Buff[], t: number = Date.now()): number {
  const active = cleanupExpired(buffs, t);
  return active.some((b) => b.type === 'xp_double') ? 2 : 1;
}

// ========================================
// Reducer
// ========================================

function economyReducer(state: EconomyState, action: EconomyAction): EconomyState {
  switch (action.type) {
    case 'SET_MANA':
      return { ...state, mana: action.payload };

    case 'SET_WALLET':
      return { ...state, wallet: { ...state.wallet, ...action.payload } };

    case 'ADD_COIN':
      return {
        ...state,
        wallet: { ...state.wallet, coin: state.wallet.coin + action.payload },
      };

    case 'SPEND_COIN': {
      const newCoin = state.wallet.coin - action.payload;
      if (newCoin < 0) return state;
      return { ...state, wallet: { ...state.wallet, coin: newCoin } };
    }

    case 'ADD_GEM':
      return {
        ...state,
        wallet: { ...state.wallet, gem: state.wallet.gem + action.payload },
      };

    case 'SPEND_GEM': {
      const newGem = state.wallet.gem - action.payload;
      if (newGem < 0) return state;
      return { ...state, wallet: { ...state.wallet, gem: newGem } };
    }

    case 'SET_PROGRESS':
      return {
        ...state,
        xp: action.payload.xp,
        level: action.payload.level,
        xpGoal: action.payload.xpGoal,
      };

    case 'SET_BUFFS':
      return { ...state, buffs: action.payload };

    case 'APPLY_TASK_REWARD': {
      const { xpDelta = 0, manaDelta = 0 } = action.payload;
      const mul = xpMultiplier(state.buffs);
      const xpDeltaAdj = Math.round(xpDelta * mul);
      
      let mana = state.mana + manaDelta;
      if (mana < 0) mana = 0;
      
      let xp = state.xp + xpDeltaAdj;
      let level = state.level;
      let xpGoal = state.xpGoal;
      
      while (xp >= xpGoal) {
        xp -= xpGoal;
        level += 1;
        xpGoal = roundToNearest10(Math.ceil(xpGoal * 1.25));
      }
      
      return { ...state, mana, xp, level, xpGoal };
    }

    case 'ACTIVATE_BUFF': {
      const newBuff = action.payload;
      return { ...state, buffs: [...state.buffs, newBuff] };
    }

    case 'CLEAN_EXPIRED_BUFFS': {
      const cleaned = cleanupExpired(state.buffs);
      return { ...state, buffs: cleaned };
    }

    case 'PURCHASE_WITH_MANA': {
      const cost = action.payload;
      if (state.mana < cost) return state;
      return { ...state, mana: state.mana - cost };
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
  const isHydrating = useRef(true);
  const userIdRef = useRef<string | null>(null);

  // Hydrate from storage on mount
  useEffect(() => {
    async function hydrate() {
      try {
        const [storedMana, storedWallet, storedProgress, storedBuffs] = await Promise.all([
          getMana(),
          getWallet(),
          getProgress(),
          getBuffs(),
        ]);

        dispatch({ type: 'SET_MANA', payload: storedMana });
        dispatch({ type: 'SET_WALLET', payload: storedWallet });
        dispatch({
          type: 'SET_PROGRESS',
          payload: {
            xp: storedProgress.xp,
            level: storedProgress.level,
            xpGoal: storedProgress.xpGoal,
          },
        });
        dispatch({ type: 'SET_BUFFS', payload: storedBuffs });

        // Clean expired buffs after hydration
        dispatch({ type: 'CLEAN_EXPIRED_BUFFS' });
      } catch (error) {
        console.error('[EconomyContext] Hydration error:', error);
      } finally {
        isHydrating.current = false;
      }
    }

    hydrate();
  }, []);

  // Persist mana changes
  useEffect(() => {
    if (isHydrating.current) return;
    persistMana(state.mana);
    if (userIdRef.current) {
      pushProfile(userIdRef.current, { mana: state.mana });
    }
  }, [state.mana]);

  // Persist wallet changes
  useEffect(() => {
    if (isHydrating.current) return;
    persistWallet(state.wallet);
  }, [state.wallet]);

  // Persist progress changes
  useEffect(() => {
    if (isHydrating.current) return;
    persistProgress({
      xp: state.xp,
      level: state.level,
      xpGoal: state.xpGoal,
    });
  }, [state.xp, state.level, state.xpGoal]);

  // Persist buffs changes
  useEffect(() => {
    if (isHydrating.current) return;
    persistBuffs(state.buffs);
  }, [state.buffs]);

  // Periodic cleanup of expired buffs (every minute)
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch({ type: 'CLEAN_EXPIRED_BUFFS' });
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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

export function useWallet(): Wallet {
  return useEconomyState().wallet;
}

export function useLevel(): { level: number; xp: number; xpGoal: number } {
  const { level, xp, xpGoal } = useEconomyState();
  return { level, xp, xpGoal };
}

export function useBuffs(): Buff[] {
  return useEconomyState().buffs;
}

// Convenience hook for checking if user can afford something
export function useCanAffordMana(cost: number): boolean {
  const mana = useMana();
  return mana >= cost;
}

export function useCanAffordCoins(cost: number): boolean {
  const wallet = useWallet();
  return wallet.coin >= cost;
}

export function useCanAffordGems(cost: number): boolean {
  const wallet = useWallet();
  return wallet.gem >= cost;
}
