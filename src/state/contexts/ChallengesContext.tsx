// [MB] Módulo: State / Archivo: ChallengesContext
// Afecta: Home, Challenges, Tasks (desafíos diarios, logros, streaks, recompensas)
// Propósito: Manejar desafíos diarios, logros, streaks y recompensas diarias
// Puntos de edición futura: agregar eventos especiales, challenges semanales
// Autor: Sebastian Vega - Fecha: 2025-11-24

import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import {
  getStreak,
  setStreak as persistStreak,
  getLastClaimDate,
  setLastClaimDate as persistLastClaimDate,
  getDailyChallengesState,
  setDailyChallengesState as persistDailyChallenges,
  getDailyRewardState,
  setDailyRewardState as persistDailyReward,
  getAchievementsState,
  setAchievementsState as persistAchievements,
} from '../../storage';
import { getAllAchievements } from '../../constants/achievements';
import {
  pickWeightedDeterministic,
} from '../../utils/rand';

// ========================================
// Types & Interfaces
// ========================================

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: string;
  param?: string;
  goal: number;
  progress: number;
  reward: {
    xp: number;
    mana: number;
  };
  claimed: boolean;
}

export interface DailyChallengesState {
  dateKey: string | null;
  items: Challenge[];
}

export interface DailyRewardState {
  dateKey: string | null;
  rewardId: string | null;
  claimed: boolean;
}

export interface AchievementProgress {
  [key: string]: number;
}

export interface UnlockedAchievement {
  achievedAt: string;
  claimed: boolean;
}

export interface AchievementsState {
  progress: AchievementProgress;
  unlocked: {
    [key: string]: UnlockedAchievement;
  };
}

export interface AchievementToast {
  id: string;
  title: string;
  ts: number;
}

export interface ChallengesState {
  streak: number;
  lastClaimDate: string | null;
  dailyChallenges: DailyChallengesState;
  dailyReward: DailyRewardState;
  achievements: AchievementsState;
  achievementToast: AchievementToast | null;
}

export type ChallengesAction =
  | { type: 'SET_STREAK'; payload: number }
  | { type: 'SET_LAST_CLAIM_DATE'; payload: string | null }
  | { type: 'SET_DAILY_CHALLENGES'; payload: DailyChallengesState }
  | { type: 'SET_DAILY_REWARD'; payload: DailyRewardState }
  | { type: 'SET_ACHIEVEMENTS'; payload: AchievementsState }
  | { type: 'UPDATE_DAILY_CHALLENGES_ON_TASK_DONE'; payload: { priority: string } }
  | { type: 'CLAIM_DAILY_CHALLENGE'; payload: { id: string } }
  | { type: 'CLAIM_TODAY_REWARD' }
  | { type: 'ACHIEVEMENT_EVENT'; payload: { type: string; delta?: number } }
  | { type: 'CLAIM_ACHIEVEMENT'; payload: { id: string } }
  | { type: 'CLEAR_ACHIEVEMENT_TOAST' };

// ========================================
// Challenge Templates
// ========================================

const CHALLENGE_TEMPLATES = [
  {
    type: 'complete_tasks',
    title: 'Completar tareas',
    description: 'Completa 5 tareas de cualquier tipo',
    goal: 5,
    weight: 10,
    reward: { xp: 25, mana: 20 },
  },
  {
    type: 'complete_priority',
    param: 'Urgente',
    title: 'Tareas urgentes',
    description: 'Completa 3 tareas marcadas como urgentes',
    goal: 3,
    weight: 8,
    reward: { xp: 30, mana: 25 },
  },
  {
    type: 'complete_priority',
    param: 'Alta',
    title: 'Tareas de alta prioridad',
    description: 'Completa 4 tareas de prioridad alta',
    goal: 4,
    weight: 7,
    reward: { xp: 20, mana: 15 },
  },
  {
    type: 'complete_tasks',
    title: 'Día productivo',
    description: 'Completa 8 tareas en un solo día',
    goal: 8,
    weight: 6,
    reward: { xp: 50, mana: 40 },
  },
  {
    type: 'complete_tasks',
    title: 'Primeros pasos',
    description: 'Completa tus primeras 3 tareas del día',
    goal: 3,
    weight: 9,
    reward: { xp: 15, mana: 10 },
  },
];

// ========================================
// Helper Functions
// ========================================

function getLocalISODate(date: Date = new Date()): string {
  return date.toLocaleDateString('en-CA');
}

function generateDailyChallenges(
  todayKey: string,
  lastTypes: Set<string> = new Set(),
  userId: string = 'guest'
): Challenge[] {
  const seedBase = `${userId || 'guest'}:${todayKey}:challenges`;
  const selected: typeof CHALLENGE_TEMPLATES = [];
  const used = new Set<string>();

  for (let idx = 0; idx < 3; idx++) {
    let candidates = CHALLENGE_TEMPLATES.filter((t) => {
      const key = `${t.type}:${t.param || ''}`;
      return !used.has(key) && !lastTypes.has(key);
    });

    if (candidates.length === 0) {
      candidates = CHALLENGE_TEMPLATES.filter((t) => {
        const key = `${t.type}:${t.param || ''}`;
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
    used.add(`${template.type}:${template.param || ''}`);
  }

  return selected.map((t, idx) => ({
    id: `${Date.now().toString()}_${idx}`,
    title: t.title,
    description: t.description,
    type: t.type,
    param: t.param,
    goal: t.goal,
    progress: 0,
    reward: t.reward,
    claimed: false,
  }));
}

function resolveTitleFrom(list: any[], id: string): string {
  return list.find((a) => a.id === id)?.title || id;
}

function markUnlocked(state: ChallengesState, id: string): void {
  if (!state.achievements.unlocked[id]) {
    state.achievements.unlocked[id] = {
      achievedAt: new Date().toISOString(),
      claimed: false,
    };
    state.achievementToast = {
      id,
      title: resolveTitleFrom(getAllAchievements(), id),
      ts: Date.now(),
    };
  }
}

// ========================================
// Initial State
// ========================================

const initialState: ChallengesState = {
  streak: 0,
  lastClaimDate: null,
  dailyChallenges: { dateKey: null, items: [] },
  dailyReward: { dateKey: null, rewardId: null, claimed: false },
  achievements: { progress: {}, unlocked: {} },
  achievementToast: null,
};

// ========================================
// Reducer
// ========================================

function challengesReducer(state: ChallengesState, action: ChallengesAction): ChallengesState {
  switch (action.type) {
    case 'SET_STREAK':
      return { ...state, streak: action.payload };

    case 'SET_LAST_CLAIM_DATE':
      return { ...state, lastClaimDate: action.payload };

    case 'SET_DAILY_CHALLENGES':
      return { ...state, dailyChallenges: action.payload };

    case 'SET_DAILY_REWARD':
      return { ...state, dailyReward: action.payload };

    case 'SET_ACHIEVEMENTS':
      return { ...state, achievements: action.payload };

    case 'UPDATE_DAILY_CHALLENGES_ON_TASK_DONE': {
      const { priority } = action.payload;
      const items = state.dailyChallenges.items.map((it) => {
        if (it.type === 'complete_tasks') {
          const progress = Math.min(it.goal, it.progress + 1);
          return { ...it, progress };
        }
        if (it.type === 'complete_priority' && it.param === priority) {
          const progress = Math.min(it.goal, it.progress + 1);
          return { ...it, progress };
        }
        return it;
      });
      return { ...state, dailyChallenges: { ...state.dailyChallenges, items } };
    }

    case 'CLAIM_DAILY_CHALLENGE': {
      const { id } = action.payload;
      const item = state.dailyChallenges.items.find((it) => it.id === id);
      
      if (!item || item.claimed || item.progress < item.goal) {
        return state;
      }

      const items = state.dailyChallenges.items.map((it) =>
        it.id === id ? { ...it, claimed: true } : it
      );

      return {
        ...state,
        dailyChallenges: { ...state.dailyChallenges, items },
      };
    }

    case 'CLAIM_TODAY_REWARD': {
      const today = getLocalISODate();
      if (state.dailyReward.dateKey !== today || state.dailyReward.claimed) {
        return state;
      }

      return {
        ...state,
        dailyReward: { ...state.dailyReward, claimed: true },
      };
    }

    case 'ACHIEVEMENT_EVENT': {
      const { type: eventType, delta = 1 } = action.payload;
      const newProgress = { ...state.achievements.progress };
      newProgress[eventType] = (newProgress[eventType] || 0) + delta;

      const newState = {
        ...state,
        achievements: { ...state.achievements, progress: newProgress },
      };

      // Check for achievement unlocks
      getAllAchievements().forEach((achievement) => {
        if (
          achievement.condition?.type === eventType &&
          newProgress[eventType] >= achievement.condition?.threshold &&
          !newState.achievements.unlocked[achievement.id]
        ) {
          markUnlocked(newState, achievement.id);
        }
      });

      return newState;
    }

    case 'CLAIM_ACHIEVEMENT': {
      const { id } = action.payload;
      const unlocked = state.achievements.unlocked[id];
      
      if (!unlocked || unlocked.claimed) {
        return state;
      }

      return {
        ...state,
        achievements: {
          ...state.achievements,
          unlocked: {
            ...state.achievements.unlocked,
            [id]: { ...unlocked, claimed: true },
          },
        },
      };
    }

    case 'CLEAR_ACHIEVEMENT_TOAST':
      return { ...state, achievementToast: null };

    default:
      return state;
  }
}

// ========================================
// Context
// ========================================

const ChallengesStateContext = createContext<ChallengesState | undefined>(undefined);
const ChallengesDispatchContext = createContext<React.Dispatch<ChallengesAction> | undefined>(
  undefined
);

// ========================================
// Provider
// ========================================

interface ChallengesProviderProps {
  children: React.ReactNode;
  userId?: string;
}

export function ChallengesProvider({ children, userId = 'guest' }: ChallengesProviderProps) {
  const [state, dispatch] = useReducer(challengesReducer, initialState);
  const isHydrating = useRef(true);

  // Hydrate from storage
  useEffect(() => {
    async function hydrate() {
      try {
        const [
          storedStreak,
          storedLastClaim,
          storedChallenges,
          storedReward,
          storedAchievements,
        ] = await Promise.all([
          getStreak(),
          getLastClaimDate(),
          getDailyChallengesState(),
          getDailyRewardState(),
          getAchievementsState(),
        ]);

        dispatch({ type: 'SET_STREAK', payload: storedStreak });
        dispatch({ type: 'SET_LAST_CLAIM_DATE', payload: storedLastClaim });
        dispatch({ type: 'SET_DAILY_CHALLENGES', payload: storedChallenges });
        dispatch({ type: 'SET_DAILY_REWARD', payload: storedReward });
        dispatch({ type: 'SET_ACHIEVEMENTS', payload: storedAchievements });

        // Generate new challenges if needed
        const today = getLocalISODate();
        if (storedChallenges.dateKey !== today) {
          const lastTypes = new Set<string>(
            storedChallenges.items.map((it: any) => `${it.type}:${it.param || ''}`)
          );
          const newChallenges = generateDailyChallenges(today, lastTypes, userId);
          dispatch({
            type: 'SET_DAILY_CHALLENGES',
            payload: { dateKey: today, items: newChallenges },
          });
        }
      } catch (error) {
        console.error('[ChallengesContext] Hydration error:', error);
      } finally {
        isHydrating.current = false;
      }
    }

    hydrate();
  }, [userId]);

  // Persist streak
  useEffect(() => {
    if (isHydrating.current) return;
    persistStreak(state.streak);
  }, [state.streak]);

  // Persist last claim date
  useEffect(() => {
    if (isHydrating.current) return;
    persistLastClaimDate(state.lastClaimDate);
  }, [state.lastClaimDate]);

  // Persist daily challenges
  useEffect(() => {
    if (isHydrating.current) return;
    persistDailyChallenges(state.dailyChallenges);
  }, [state.dailyChallenges]);

  // Persist daily reward
  useEffect(() => {
    if (isHydrating.current) return;
    persistDailyReward(state.dailyReward);
  }, [state.dailyReward]);

  // Persist achievements
  useEffect(() => {
    if (isHydrating.current) return;
    persistAchievements(state.achievements);
  }, [state.achievements]);

  return (
    <ChallengesStateContext.Provider value={state}>
      <ChallengesDispatchContext.Provider value={dispatch}>
        {children}
      </ChallengesDispatchContext.Provider>
    </ChallengesStateContext.Provider>
  );
}

// ========================================
// Hooks
// ========================================

export function useChallengesState(): ChallengesState {
  const context = useContext(ChallengesStateContext);
  if (context === undefined) {
    throw new Error('useChallengesState must be used within ChallengesProvider');
  }
  return context;
}

export function useChallengesDispatch(): React.Dispatch<ChallengesAction> {
  const context = useContext(ChallengesDispatchContext);
  if (context === undefined) {
    throw new Error('useChallengesDispatch must be used within ChallengesProvider');
  }
  return context;
}

export function useStreak(): number {
  return useChallengesState().streak;
}

export function useDailyChallenges(): Challenge[] {
  return useChallengesState().dailyChallenges.items;
}

export function useDailyReward(): DailyRewardState {
  return useChallengesState().dailyReward;
}

export function useAchievements(): AchievementsState {
  return useChallengesState().achievements;
}

export function useAchievementToast(): AchievementToast | null {
  return useChallengesState().achievementToast;
}
