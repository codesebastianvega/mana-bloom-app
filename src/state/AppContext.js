// [MB] Módulo: Estado / Archivo: AppContext
// Afecta: toda la app
// Propósito: Proveer estado global (maná, progreso, racha, desafíos y noticias)
// Puntos de edición futura: extender persistencia a otros campos y acciones
// Autor: Codex - Fecha: 2025-08-17

import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useRef,
  useCallback,
  useState,
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
  getDailyRewardState,
  setDailyRewardState,
  getNewsFeed,
  setNewsFeed,
  getWallet,
  setWallet,
  getAchievementsState,
  setAchievementsState,
} from "../storage";
import { DAILY_REWARDS } from "../constants/dailyRewards";
import { SHOP_CATALOG } from "../constants/shopCatalog";
import { CHALLENGE_TEMPLATES } from "../constants/challengeTemplates";
import {
  hashStringToInt,
  mulberry32,
  pickWeightedDeterministic,
} from "../utils/rand";
import { ACHIEVEMENTS } from "../constants/achievements";

function getLocalISODate(date = new Date()) {
  return date.toLocaleDateString("en-CA");
}

const AppStateContext = createContext();
const AppDispatchContext = createContext();
const HydrationStatusContext = createContext();

const now = () => Date.now();
function cleanupExpired(buffs, t = now()) {
  return (buffs || []).filter((b) => (b?.expiresAt || 0) > t);
}
function xpMultiplier(buffs, t = now()) {
  const active = cleanupExpired(buffs, t);
  return active.some((b) => b.type === "xp_double") ? 2 : 1;
}

function clampWindow(ts = [], days = 20, nowMs = Date.now()) {
  const minMs = nowMs - days * 86400000;
  return ts.filter((iso) => new Date(iso).getTime() >= minMs);
}

function resolveTitleFrom(list, id) {
  return list.find((a) => a.id === id)?.title || id;
}

function markUnlocked(state, id) {
  if (!state.unlocked[id]) {
    state.unlocked[id] = {
      achievedAt: new Date().toISOString(),
      claimed: false,
    };
    state.achievementToast = {
      id,
      title: resolveTitleFrom(ACHIEVEMENTS, id),
      ts: Date.now(),
    };
  }
}

function generateDailyChallenges(todayKey, lastTypes = new Set(), userId = "guest") {
  const seedBase = `${userId || "guest"}:${todayKey}:challenges`;
  const selected = [];
  const used = new Set();
  for (let idx = 0; idx < 3; idx++) {
    let candidates = CHALLENGE_TEMPLATES.filter((t) => {
      const key = `${t.type}:${t.param || ""}`;
      return !used.has(key) && !lastTypes.has(key);
    });
    if (candidates.length === 0) {
      candidates = CHALLENGE_TEMPLATES.filter((t) => {
        const key = `${t.type}:${t.param || ""}`;
        return !used.has(key);
      });
    }
    const weights = candidates.map((c) => c.weight);
    const template = pickWeightedDeterministic(
      candidates,
      weights,
      `${seedBase}#${idx + 1}`
    );
    selected.push(template);
    used.add(`${template.type}:${template.param || ""}`);
  }
  return selected.map((t, idx) => ({
    id: `${Date.now().toString()}_${idx}`,
    title: t.title,
    type: t.type,
    param: t.param,
    goal: t.goal,
    progress: 0,
    reward: t.reward,
    claimed: false,
  }));
}

function generateDefaultNewsFeed() {
  const now = Date.now();
  return {
    items: [
      {
        id: `news-${now}-1`,
        title: "Bienvenido a Mana Bloom",
        iconName: "sparkles",
        timestamp: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
        read: false,
      },
      {
        id: `news-${now}-2`,
        title: "Recuerda regar tu planta",
        iconName: "leaf",
        timestamp: new Date(now - 6 * 60 * 60 * 1000).toISOString(),
        read: false,
      },
      {
        id: `news-${now}-3`,
        title: "Nueva recompensa diaria disponible",
        iconName: "flame",
        timestamp: new Date(now - 24 * 60 * 60 * 1000).toISOString(),
        read: false,
      },
      {
        id: `news-${now}-4`,
        title: "Evento especial de hace 3 días",
        iconName: "sparkles",
        timestamp: new Date(now - 3 * 24 * 60 * 60 * 1000).toISOString(),
        read: false,
      },
    ],
  };
}

const initialState = {
  mana: 50,
  plantState: "Floreciendo",
  streak: 0,
  lastClaimDate: null,
  wallet: { coin: 0, gem: 0 },
  xp: 0,
  level: 1,
  xpGoal: 100,
  inventory: [],
  buffs: [],
  dailyChallenges: { dateKey: null, items: [] },
  news: { items: [] },
  dailyReward: { dateKey: null, rewardId: null, claimed: false },
  achievements: { progress: {}, unlocked: {} },
  achievementToast: null,
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
    case "SET_WALLET":
      return { ...state, wallet: { ...state.wallet, ...action.payload } };
    case "ADD_COIN":
      return {
        ...state,
        wallet: { ...state.wallet, coin: state.wallet.coin + action.payload },
      };
    case "SPEND_COIN": {
      const newCoin = state.wallet.coin - action.payload;
      if (newCoin < 0) return state;
      return { ...state, wallet: { ...state.wallet, coin: newCoin } };
    }
    case "ADD_GEM":
      return {
        ...state,
        wallet: { ...state.wallet, gem: state.wallet.gem + action.payload },
      };
    case "SPEND_GEM": {
      const newGem = state.wallet.gem - action.payload;
      if (newGem < 0) return state;
      return { ...state, wallet: { ...state.wallet, gem: newGem } };
    }
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
    case "SET_NEWS":
      return { ...state, news: action.payload };
    case "SET_DAILY_REWARD":
      return { ...state, dailyReward: action.payload };
    case "SET_ACHIEVEMENTS":
      return { ...state, achievements: action.payload };
    case "MARK_NEWS_READ": {
      const items = state.news.items.map((it) =>
        it.id === action.payload.id ? { ...it, read: true } : it
      );
      return { ...state, news: { ...state.news, items } };
    }
    case "MARK_ALL_NEWS_READ": {
      const items = state.news.items.map((it) => ({ ...it, read: true }));
      return { ...state, news: { ...state.news, items } };
    }
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
    case "CLAIM_TODAY_REWARD": {
      const today = getLocalISODate();
      if (
        state.dailyReward.dateKey !== today ||
        state.dailyReward.claimed
      ) {
        return state;
      }
      const reward = DAILY_REWARDS.find(
        (r) => r.id === state.dailyReward.rewardId
      );
      if (!reward) return state;
      let withReward = state;
      if (reward.kind === "mana") {
        withReward = { ...state, mana: state.mana + (reward.amount || 0) };
      } else if (reward.kind === "coin") {
        withReward = appReducer(state, {
          type: "ADD_COIN",
          payload: reward.amount || 0,
        });
      } else if (reward.kind === "gem") {
        withReward = appReducer(state, {
          type: "ADD_GEM",
          payload: reward.amount || 0,
        });
      } else if (reward.kind === "item" && reward.sku) {
        const info =
          SHOP_CATALOG[reward.sku] || {
            title: "Ítem misterioso",
            category: "potions",
          };
        withReward = appReducer(state, {
          type: "ADD_TO_INVENTORY",
          payload: { sku: reward.sku, title: info.title, category: info.category },
        });
      }
      const yesterday = getLocalISODate(new Date(Date.now() - 86400000));
      const newStreak =
        state.lastClaimDate === yesterday ? state.streak + 1 : 1;
      return {
        ...withReward,
        streak: newStreak,
        lastClaimDate: today,
        dailyReward: { ...state.dailyReward, claimed: true },
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
    case "DISCARD_ITEM": {
      const { sku } = action.payload;
      const item = state.inventory.find((it) => it.sku === sku);
      if (!item || item.quantity <= 0) {
        return state;
      }
      const inventory = state.inventory
        .map((it) =>
          it.sku === sku ? { ...it, quantity: it.quantity - 1 } : it
        )
        .filter((it) => it.quantity > 0);
      return { ...state, inventory };
    }
    case "ACHIEVEMENT_EVENT": {
      const { type, payload } = action.payload;
      const progress = { ...state.achievements.progress };
      const unlocked = { ...state.achievements.unlocked };
      const wrapper = { unlocked, achievementToast: null };
      const nowIso = new Date().toISOString();
      ACHIEVEMENTS.forEach((a) => {
        if (a.type === "count_event" && a.event === type) {
          if (a.id === "t_urgent_10" && payload?.priority !== "Urgente") {
            return;
          }
          const prev = progress[a.id]?.count || 0;
          const next = prev + 1;
          progress[a.id] = { ...progress[a.id], count: next };
          if (next >= a.goal) markUnlocked(wrapper, a.id);
        } else if (a.type === "reach_value") {
          if (a.metric === "level" && type === "level_up") {
            if (payload?.level >= a.goal) markUnlocked(wrapper, a.id);
          }
          if (a.metric === "streak" && type === "streak_update") {
            if (payload?.streak >= a.goal) markUnlocked(wrapper, a.id);
          }
        } else if (a.type === "window_count" && a.event === type) {
          if (a.toolId && payload?.toolId !== a.toolId) return;
          const prevTs = progress[a.id]?.timestamps || [];
          const ts = clampWindow([...prevTs, nowIso], a.windowDays || 20);
          progress[a.id] = { ...progress[a.id], timestamps: ts };
          if (ts.length >= a.goal) markUnlocked(wrapper, a.id);
        }
      });
      return {
        ...state,
        achievements: { progress, unlocked: wrapper.unlocked },
        achievementToast: wrapper.achievementToast || state.achievementToast,
      };
    }
    case "CLAIM_ACHIEVEMENT": {
      const { id } = action.payload;
      const unlocked = state.achievements.unlocked[id];
      const template = ACHIEVEMENTS.find((a) => a.id === id);
      if (!unlocked || unlocked.claimed || !template) return state;
      let mana = state.mana;
      let wallet = { ...state.wallet };
      const reward = template.reward || {};
      if (reward.mana) mana += reward.mana;
      if (reward.coin) wallet.coin += reward.coin;
      if (reward.gem) wallet.gem += reward.gem;
      const newUnlocked = {
        ...state.achievements.unlocked,
        [id]: { ...unlocked, claimed: true },
      };
      return {
        ...state,
        mana,
        wallet,
        achievements: { ...state.achievements, unlocked: newUnlocked },
      };
    }
    case "CLEAR_ACHIEVEMENT_TOAST":
      return { ...state, achievementToast: null };
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
  const prevLevel = useRef(initialState.level);
  const prevStreak = useRef(initialState.streak);
  const [hydration, setHydration] = useState({
    mana: true,
    wallet: true,
    progress: true,
    inventory: true,
    news: true,
    challenges: true,
    dailyReward: true,
    achievements: true,
  });

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
        storedNews,
        storedWallet,
        storedDailyReward,
        storedAchievements,
      ] = await Promise.all([
        getMana(),
        getStreak(),
        getLastClaimDate(),
        getProgress(),
        getInventory(),
        getBuffs(),
        getDailyChallengesState(),
        getNewsFeed(),
        getWallet(),
        getDailyRewardState(),
        getAchievementsState(),
      ]);
      dispatch({ type: "SET_MANA", payload: storedMana });
      setHydration((h) => ({ ...h, mana: false }));
      dispatch({ type: "SET_STREAK", payload: storedStreak });
      dispatch({ type: "SET_LAST_CLAIM_DATE", payload: storedLastClaim });
      dispatch({ type: "SET_PROGRESS", payload: storedProgress });
      dispatch({
        type: "SET_BUFFS",
        payload: cleanupExpired(storedBuffs),
      });
      setHydration((h) => ({ ...h, progress: false }));
      dispatch({ type: "SET_INVENTORY", payload: storedInventory });
      setHydration((h) => ({ ...h, inventory: false }));
      dispatch({ type: "SET_WALLET", payload: storedWallet });
      setHydration((h) => ({ ...h, wallet: false }));
      dispatch({ type: "SET_ACHIEVEMENTS", payload: storedAchievements });
      setHydration((h) => ({ ...h, achievements: false }));
      const todayKey = getLocalISODate();
      let dailyChallenges = storedDailyChallenges;
      if (!dailyChallenges || dailyChallenges.dateKey !== todayKey) {
        const lastTypes = new Set(
          (dailyChallenges?.items || []).map(
            (i) => `${i.type}:${i.param || ""}`
          )
        );
        const items = generateDailyChallenges(todayKey, lastTypes);
        dailyChallenges = { dateKey: todayKey, items };
        await setDailyChallengesState(dailyChallenges);
      }
      dispatch({
        type: "SET_DAILY_CHALLENGES",
        payload: dailyChallenges,
      });
      setHydration((h) => ({ ...h, challenges: false }));
      let news = storedNews;
      if (!news) {
        news = generateDefaultNewsFeed();
        await setNewsFeed(news);
      }
      dispatch({ type: "SET_NEWS", payload: news });
      setHydration((h) => ({ ...h, news: false }));
      let dailyReward = storedDailyReward;
      if (!dailyReward || dailyReward.dateKey !== todayKey) {
        const weights = DAILY_REWARDS.map((r) => r.weight);
        const reward = pickWeightedDeterministic(
          DAILY_REWARDS,
          weights,
          `guest:${todayKey}`
        );
        dailyReward = {
          dateKey: todayKey,
          rewardId: reward.id,
          claimed: false,
        };
        await setDailyRewardState(dailyReward);
      }
      dispatch({ type: "SET_DAILY_REWARD", payload: dailyReward });
      setHydration((h) => ({ ...h, dailyReward: false }));
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
    setWallet(state.wallet);
  }, [state.wallet]);

  useEffect(() => {
    if (isHydrating.current) return;
    setBuffs(state.buffs);
  }, [state.buffs]);

  useEffect(() => {
    if (isHydrating.current) return;
    setDailyChallengesState(state.dailyChallenges);
  }, [state.dailyChallenges]);

  useEffect(() => {
    if (isHydrating.current) return;
    setNewsFeed(state.news);
  }, [state.news]);

  useEffect(() => {
    if (isHydrating.current) return;
    setDailyRewardState(state.dailyReward);
  }, [state.dailyReward]);

  useEffect(() => {
    if (isHydrating.current) return;
    setAchievementsState(state.achievements);
  }, [state.achievements]);

  useEffect(() => {
    if (isHydrating.current) {
      prevLevel.current = state.level;
      return;
    }
    if (state.level > prevLevel.current) {
      dispatch({
        type: "ACHIEVEMENT_EVENT",
        payload: { type: "level_up", payload: { level: state.level } },
      });
    }
    prevLevel.current = state.level;
  }, [state.level]);

  useEffect(() => {
    if (isHydrating.current) {
      prevStreak.current = state.streak;
      return;
    }
    if (state.streak !== prevStreak.current) {
      dispatch({
        type: "ACHIEVEMENT_EVENT",
        payload: { type: "streak_update", payload: { streak: state.streak } },
      });
    }
    prevStreak.current = state.streak;
  }, [state.streak]);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        <HydrationStatusContext.Provider value={hydration}>
          {children}
        </HydrationStatusContext.Provider>
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

export function useCanAfford() {
  const { mana } = useAppState();
  return useCallback((cost) => mana >= cost, [mana]);
}

export function useWallet() {
  const { wallet } = useAppState();
  return wallet;
}

export function useCanAffordCurrency(currency, amount) {
  const { wallet } = useAppState();
  return wallet[currency] >= amount;
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

export function useDailyReward() {
  const { dailyReward } = useAppState();
  const reward = DAILY_REWARDS.find((r) => r.id === dailyReward.rewardId);
  return { ...dailyReward, reward };
}

export function useDailyChallenges() {
  const { dailyChallenges } = useAppState();
  return dailyChallenges;
}

export function useNewsFeed() {
  const { news } = useAppState();
  return news;
}

export function useHydrationStatus() {
  const context = useContext(HydrationStatusContext);
  if (context === undefined) {
    throw new Error("useHydrationStatus must be used within an AppProvider");
  }
  const isHydratingGlobal = Object.values(context).some(Boolean);
  return { ...context, isHydratingGlobal };
}

export function useAchievements() {
  const { achievements } = useAppState();
  return achievements;
}

export function useTopAchievements() {
  const state = useAppState();
  const list = ACHIEVEMENTS.map((a) => {
    let progress = 0;
    if (a.type === "count_event") {
      progress = state.achievements.progress[a.id]?.count || 0;
    } else if (a.type === "window_count") {
      progress =
        state.achievements.progress[a.id]?.timestamps?.length || 0;
    } else if (a.type === "reach_value") {
      progress = a.metric === "level" ? state.level : state.streak;
    }
    const unlocked = !!state.achievements.unlocked[a.id];
    const claimed = state.achievements.unlocked[a.id]?.claimed;
    return { ...a, progress, unlocked, claimed };
  });
  const unclaimed = list.filter((a) => a.unlocked && !a.claimed);
  const locked = list.filter((a) => !a.unlocked);
  locked.sort((a, b) => b.progress / b.goal - a.progress / a.goal);
  const combined = [...unclaimed, ...locked];
  return combined.slice(0, 3);
}

export function useAchievementToast() {
  const { achievementToast } = useAppState();
  return achievementToast;
}

export function canUseItem(sku) {
  return sku === "shop/potions/p1" || sku === "shop/potions/p2";
}
