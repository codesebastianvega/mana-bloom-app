// [MB] Módulo: Estado / Archivo: AppContext
// Afecta: toda la app
// Propósito: Proveer estado global para maná, progreso de XP, racha diaria y desafíos
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
  getInventory,
  setInventory,
  getBuffs,
  setBuffs,
  getDailyChallengesState,
  setDailyChallengesState,
} from "../storage";

export const DAILY_REWARD_MANA = 10;

function getLocalISODate(date = new Date()) {
  return date.toLocaleDateString("en-CA");
}

const AppStateContext = createContext();
const AppDispatchContext = createContext();

const now = () => Date.now();
function cleanupExpired(buffs, t = now()) {
  return (buffs || []).filter((b) => (b?.expiresAt || 0) > t);
}
function xpMultiplier(buffs, t = now()) {
  const active = cleanupExpired(buffs, t);
  return active.some((b) => b.type === "xp_double") ? 2 : 1;
}

function generateDefaultDailyChallenges() {
  const base = [
    {
      title: "Completa 3 tareas",
      type: "complete_tasks",
      goal: 3,
      reward: { xp: 25, mana: 10 },
    },
    {
      title: "Termina 1 tarea Urgente",
      type: "complete_priority",
      param: "Urgente",
      goal: 1,
      reward: { xp: 30, mana: 15 },
    },
    {
      title: "Completa 2 tareas",
      type: "complete_tasks",
      goal: 2,
      reward: { xp: 20, mana: 8 },
    },
  ];
  return base.map((item) => ({
    ...item,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    progress: 0,
    claimed: false,
  }));
}

const initialState = {
  mana: 50,
  plantState: "Floreciendo",
  streak: 0,
  lastClaimDate: null,
  xp: 0,
  level: 1,
  xpGoal: 100,
  inventory: [],
  buffs: [],
  dailyChallenges: { dateKey: null, items: [] },
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
    case "SET_INVENTORY":
      return { ...state, inventory: action.payload };
    case "SET_BUFFS":
      return { ...state, buffs: action.payload };
    case "SET_DAILY_CHALLENGES":
      return { ...state, dailyChallenges: action.payload };
    case "ADD_TO_INVENTORY": {
      const { sku, title, category } = action.payload;
      const existing = state.inventory.find((it) => it.sku === sku);
      if (existing) {
        return {
          ...state,
          inventory: state.inventory.map((it) =>
            it.sku === sku ? { ...it, quantity: it.quantity + 1 } : it
          ),
        };
      }
      const newItem = {
        id: Date.now().toString(),
        sku,
        title,
        category,
        quantity: 1,
        createdAt: new Date().toISOString(),
      };
      return { ...state, inventory: [...state.inventory, newItem] };
    }
    case "APPLY_TASK_REWARD": {
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
    case "UPDATE_DAILY_CHALLENGES_ON_TASK_DONE": {
      const { priority } = action.payload;
      const items = state.dailyChallenges.items.map((it) => {
        if (it.type === "complete_tasks") {
          const progress = Math.min(it.goal, it.progress + 1);
          return { ...it, progress };
        }
        if (it.type === "complete_priority" && it.param === priority) {
          const progress = Math.min(it.goal, it.progress + 1);
          return { ...it, progress };
        }
        return it;
      });
      return { ...state, dailyChallenges: { ...state.dailyChallenges, items } };
    }
    case "CLAIM_DAILY_CHALLENGE": {
      const { id } = action.payload;
      const item = state.dailyChallenges.items.find((it) => it.id === id);
      if (!item || item.claimed || item.progress < item.goal) {
        return state;
      }
      const items = state.dailyChallenges.items.map((it) =>
        it.id === id ? { ...it, claimed: true } : it
      );
      const withReward = appReducer(state, {
        type: "APPLY_TASK_REWARD",
        payload: { xpDelta: item.reward.xp, manaDelta: item.reward.mana },
      });
      return {
        ...withReward,
        dailyChallenges: { ...state.dailyChallenges, items },
      };
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
    case "CONSUME_ITEM": {
      const { sku } = action.payload;
      const item = state.inventory.find((it) => it.sku === sku);
      if (!item || item.quantity <= 0) {
        return state;
      }
      let mana = state.mana;
      if (sku === "shop/potions/p2") {
        mana += 100;
      }
      const inventory = state.inventory
        .map((it) =>
          it.sku === sku ? { ...it, quantity: it.quantity - 1 } : it
        )
        .filter((it) => it.quantity > 0);
      return { ...state, mana, inventory };
    }
    case "ACTIVATE_BUFF": {
      const { type, durationMs } = action.payload;
      const startedAt = now();
      const expiresAt = startedAt + durationMs;
      const id = String(startedAt);
      const active = cleanupExpired(state.buffs);
      return {
        ...state,
        buffs: [...active, { id, type, startedAt, expiresAt }],
      };
    }
    case "CLEAN_EXPIRED_BUFFS":
      return { ...state, buffs: cleanupExpired(state.buffs) };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const isHydrating = useRef(true);

  useEffect(() => {
    async function hydrate() {
      const [
        storedMana,
        storedStreak,
        storedLastClaim,
        storedProgress,
        storedInventory,
        storedBuffs,
        storedDailyChallenges,
      ] = await Promise.all([
        getMana(),
        getStreak(),
        getLastClaimDate(),
        getProgress(),
        getInventory(),
        getBuffs(),
        getDailyChallengesState(),
      ]);
      dispatch({ type: "SET_MANA", payload: storedMana });
      dispatch({ type: "SET_STREAK", payload: storedStreak });
      dispatch({ type: "SET_LAST_CLAIM_DATE", payload: storedLastClaim });
      dispatch({ type: "SET_PROGRESS", payload: storedProgress });
      dispatch({ type: "SET_INVENTORY", payload: storedInventory });
      dispatch({
        type: "SET_BUFFS",
        payload: cleanupExpired(storedBuffs),
      });
      const todayKey = getLocalISODate();
      let dailyChallenges = storedDailyChallenges;
      if (!dailyChallenges || dailyChallenges.dateKey !== todayKey) {
        dailyChallenges = {
          dateKey: todayKey,
          items: generateDefaultDailyChallenges(),
        };
        await setDailyChallengesState(dailyChallenges);
      }
      dispatch({
        type: "SET_DAILY_CHALLENGES",
        payload: dailyChallenges,
      });
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

  useEffect(() => {
    if (isHydrating.current) return;
    setInventory(state.inventory);
  }, [state.inventory]);

  useEffect(() => {
    if (isHydrating.current) return;
    setBuffs(state.buffs);
  }, [state.buffs]);

  useEffect(() => {
    if (isHydrating.current) return;
    setDailyChallengesState(state.dailyChallenges);
  }, [state.dailyChallenges]);

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

export function useInventoryCounts() {
  const { inventory } = useAppState();
  const counts = inventory.reduce(
    (acc, item) => {
      acc[item.category] += item.quantity;
      acc.total += item.quantity;
      return acc;
    },
    { potions: 0, tools: 0, cosmetics: 0, total: 0 }
  );
  return counts;
}

export function useActiveBuffs() {
  const { buffs } = useAppState();
  return cleanupExpired(buffs);
}

export function useXpMultiplier() {
  const buffs = useActiveBuffs();
  const multiplier = xpMultiplier(buffs);
  const buff = buffs.find((b) => b.type === "xp_double");
  return { multiplier, expiresAt: buff?.expiresAt };
}

export function useDailyChallenges() {
  const { dailyChallenges } = useAppState();
  return dailyChallenges;
}
