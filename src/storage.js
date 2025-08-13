// [MB] Módulo: Estado / Sección: Storage helpers
// Afecta: AppContext (persistencia de maná, rachas, progreso, tareas, desafíos y noticias)
// Propósito: Persistir datos básicos de usuario en AsyncStorage
// Puntos de edición futura: extender a otros campos y manejo de errores
// Autor: Codex - Fecha: 2025-08-13

import AsyncStorage from "@react-native-async-storage/async-storage";

const MANA_KEY = "mb:mana";
const STREAK_KEY = "mb:streak";
const LAST_CLAIM_DATE_KEY = "mb:lastClaimDate";
const PROGRESS_KEY = "mb:progress";
const TASKS_KEY = "mb:tasks";
const INVENTORY_KEY = "mb:inventory";
const DAILY_CHALLENGES_KEY = "mb:dailyChallenges";
const NEWS_KEY = "mb:news";
const WALLET_KEY = "mb:wallet";
const DAILY_REWARD_KEY = "mb:dailyReward";

export async function getMana() {
  try {
    const value = await AsyncStorage.getItem(MANA_KEY);
    if (value !== null) {
      const parsed = Number(value);
      return Number.isNaN(parsed) ? 50 : parsed;
    }
  } catch (e) {
    console.warn("Error leyendo maná de storage", e);
  }
  return 50;
}

export async function setMana(value) {
  try {
    await AsyncStorage.setItem(MANA_KEY, String(value));
  } catch (e) {
    console.warn("Error guardando maná en storage", e);
  }
}

export async function getStreak() {
  try {
    const value = await AsyncStorage.getItem(STREAK_KEY);
    if (value !== null) {
      const parsed = Number(value);
      return Number.isNaN(parsed) ? 0 : parsed;
    }
  } catch (e) {
    console.warn("Error leyendo racha de storage", e);
  }
  return 0;
}

export async function setStreak(value) {
  try {
    await AsyncStorage.setItem(STREAK_KEY, String(value));
  } catch (e) {
    console.warn("Error guardando racha en storage", e);
  }
}

export async function getLastClaimDate() {
  try {
    const value = await AsyncStorage.getItem(LAST_CLAIM_DATE_KEY);
    return value ?? null;
  } catch (e) {
    console.warn("Error leyendo fecha de reclamo de storage", e);
    return null;
  }
}

export async function setLastClaimDate(value) {
  try {
    await AsyncStorage.setItem(LAST_CLAIM_DATE_KEY, value);
  } catch (e) {
    console.warn("Error guardando fecha de reclamo en storage", e);
  }
}

// [MB] Helpers de wallet (monedas y diamantes)
const DEFAULT_WALLET = { coin: 0, gem: 0 };

export async function getWallet() {
  try {
    const value = await AsyncStorage.getItem(WALLET_KEY);
    if (value) {
      const parsed = JSON.parse(value);
      return { ...DEFAULT_WALLET, ...parsed };
    }
  } catch (e) {
    console.warn("Error leyendo wallet de storage", e);
  }
  return { ...DEFAULT_WALLET };
}

export async function setWallet(wallet) {
  try {
    await AsyncStorage.setItem(WALLET_KEY, JSON.stringify(wallet));
  } catch (e) {
    console.warn("Error guardando wallet en storage", e);
  }
}

// [MB] Helpers de progreso (xp, nivel, meta de xp)
const DEFAULT_PROGRESS = { xp: 0, level: 1, xpGoal: 100 };

export async function getProgress() {
  try {
    const value = await AsyncStorage.getItem(PROGRESS_KEY);
    if (value !== null) {
      const parsed = JSON.parse(value);
      return { ...DEFAULT_PROGRESS, ...parsed };
    }
  } catch (e) {
    console.warn("Error leyendo progreso de storage", e);
  }
  return { ...DEFAULT_PROGRESS };
}

export async function setProgress(progress) {
  try {
    await AsyncStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.warn("Error guardando progreso en storage", e);
  }
}

// [MB] Helpers de tareas
export async function getTasks() {
  try {
    const value = await AsyncStorage.getItem(TASKS_KEY);
    return value ? JSON.parse(value) : [];
  } catch (e) {
    console.warn("Error leyendo tareas de storage", e);
    return [];
  }
}

export async function setTasks(tasks) {
  try {
    await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch (e) {
    console.warn("Error guardando tareas en storage", e);
  }
}

// [MB] Helpers de inventario
export async function getInventory() {
  try {
    const value = await AsyncStorage.getItem(INVENTORY_KEY);
    return value ? JSON.parse(value) : [];
  } catch (e) {
    console.warn("Error leyendo inventario de storage", e);
    return [];
  }
}

export async function setInventory(items) {
  try {
    await AsyncStorage.setItem(INVENTORY_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn("Error guardando inventario en storage", e);
  }
}

// [MB] Helpers de desafíos diarios
export async function getDailyChallengesState() {
  try {
    const value = await AsyncStorage.getItem(DAILY_CHALLENGES_KEY);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.warn("Error leyendo desafíos diarios de storage", e);
    return null;
  }
}

export async function setDailyChallengesState(state) {
  try {
    await AsyncStorage.setItem(DAILY_CHALLENGES_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Error guardando desafíos diarios en storage", e);
  }
}

// [MB] Helpers de recompensa diaria
export async function getDailyRewardState() {
  try {
    const value = await AsyncStorage.getItem(DAILY_REWARD_KEY);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.warn("Error leyendo recompensa diaria de storage", e);
    return null;
  }
}

export async function setDailyRewardState(state) {
  try {
    await AsyncStorage.setItem(DAILY_REWARD_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Error guardando recompensa diaria en storage", e);
  }
}

// [MB] Helpers de buffs
const BUFFS_KEY = "mb:buffs";

export async function getBuffs() {
  try {
    const value = await AsyncStorage.getItem(BUFFS_KEY);
    return value ? JSON.parse(value) : [];
  } catch (e) {
    console.warn("Error leyendo buffs de storage", e);
    return [];
  }
}

export async function setBuffs(buffs) {
  try {
    await AsyncStorage.setItem(BUFFS_KEY, JSON.stringify(buffs));
  } catch (e) {
    console.warn("Error guardando buffs en storage", e);
  }
}

// [MB] Helpers de noticias
export async function getNewsFeed() {
  try {
    const value = await AsyncStorage.getItem(NEWS_KEY);
    return value ? JSON.parse(value) : null;
  } catch (e) {
    console.warn("Error leyendo noticias de storage", e);
    return null;
  }
}

export async function setNewsFeed(feed) {
  try {
    await AsyncStorage.setItem(NEWS_KEY, JSON.stringify(feed));
  } catch (e) {
    console.warn("Error guardando noticias en storage", e);
  }
}

