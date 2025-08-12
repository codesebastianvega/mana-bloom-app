// [MB] Módulo: Estado / Archivo: AppContext
// Afecta: toda la app
// Propósito: Proveer estado global para maná, progreso de XP y racha diaria
// Puntos de edición futura: extender persistencia a otros campos y acciones
// Autor: Codex - Fecha: 2025-08-12

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  getMana,
  setMana,
  getStreak,
  setStreak,
  getLastClaimDate,
  setLastClaimDate,
  getProgress,
  setProgress,
} from "../storage";

export const DAILY_REWARD_MANA = 10;

function getLocalISODate(date = new Date()) {
  return date.toLocaleDateString("en-CA");
}

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const initialState = {
  mana: 50,
  plantState: "Floreciendo",
  streak: 0,
  lastClaimDate: null,
  xp: 0,
  level: 1,
  xpGoal: 100,
};

function roundToNearest10(n) {
  return Math.round(n / 10) * 10;
}

function appReducer(state, action) {
  switch (action.type) {
    case "SET_MANA":
      return { ...state, mana: action.payload };
    case "SET_PLANT_STATE":
      return { ...state, plantState: action.payload };
    case "SET_STREAK":
      return { ...state, streak: action.payload };
    case "SET_LAST_CLAIM_DATE":
      return { ...state, lastClaimDate: action.payload };
    case "SET_PROGRESS":
      return {
        ...state,
        xp: action.payload.xp,
        level: action.payload.level,
        xpGoal: action.payload.xpGoal,
      };
    case "APPLY_TASK_REWARD": {
      const { xpDelta = 0, manaDelta = 0 } = action.payload;
      let mana = state.mana + manaDelta;
      if (mana < 0) mana = 0;
      let xp = state.xp + xpDelta;
      let level = state.level;
      let xpGoal = state.xpGoal;
      while (xp >= xpGoal) {
        xp -= xpGoal;
        level += 1;
        xpGoal = roundToNearest10(Math.ceil(xpGoal * 1.25));
      }
      return { ...state, mana, xp, level, xpGoal };
    }
    case "CLAIM_DAILY_REWARD": {
      const today = getLocalISODate();
      if (state.lastClaimDate === today) {
        return state;
      }
      const yesterday = getLocalISODate(new Date(Date.now() - 86400000));
      const newStreak = state.lastClaimDate === yesterday ? state.streak + 1 : 1;
      return {
        ...state,
        mana: state.mana + DAILY_REWARD_MANA,
        streak: newStreak,
        lastClaimDate: today,
      };
    }
    case "PURCHASE_WITH_MANA": {
      const cost = action.payload;
      if (state.mana < cost) {
        return state;
      }
      return { ...state, mana: state.mana - cost };
    }
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const isHydrating = useRef(true);

  useEffect(() => {
    async function hydrate() {
      const [storedMana, storedStreak, storedLastClaim, storedProgress] =
        await Promise.all([
          getMana(),
          getStreak(),
          getLastClaimDate(),
          getProgress(),
        ]);
      dispatch({ type: "SET_MANA", payload: storedMana });
      dispatch({ type: "SET_STREAK", payload: storedStreak });
      dispatch({ type: "SET_LAST_CLAIM_DATE", payload: storedLastClaim });
      dispatch({ type: "SET_PROGRESS", payload: storedProgress });
      isHydrating.current = false;
    }
    hydrate();
  }, []);

  useEffect(() => {
    if (isHydrating.current) return;
    setMana(state.mana);
  }, [state.mana]);

  useEffect(() => {
    if (isHydrating.current) return;
    setStreak(state.streak);
  }, [state.streak]);

  useEffect(() => {
    if (isHydrating.current) return;
    if (state.lastClaimDate) {
      setLastClaimDate(state.lastClaimDate);
    }
  }, [state.lastClaimDate]);

  useEffect(() => {
    if (isHydrating.current) return;
    setProgress({ xp: state.xp, level: state.level, xpGoal: state.xpGoal });
  }, [state.xp, state.level, state.xpGoal]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
}

export function useAppDispatch() {
  const context = useContext(AppDispatchContext);
  if (context === undefined) {
    throw new Error("useAppDispatch must be used within an AppProvider");
  }
  return context;
}

export function useCanClaimToday() {
  const { lastClaimDate } = useAppState();
  return lastClaimDate !== getLocalISODate();
}

export function useCanAfford() {
  const { mana } = useAppState();
  return useCallback((cost) => mana >= cost, [mana]);
}

export function useProgress() {
  const { xp, xpGoal, level } = useAppState();
  const progress = xpGoal ? xp / xpGoal : 0;
  return { xp, xpGoal, level, progress };
}
