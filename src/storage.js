// [MB] Módulo: Estado / Sección: Storage helpers
// Afecta: AppContext (persistencia de maná, rachas, progreso, tareas, desafíos y noticias)
// Propósito: Persistir datos básicos de usuario en AsyncStorage
// Puntos de edición futura: extender a otros campos y manejo de errores
// Autor: Codex - Fecha: 2025-08-17

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
const ACHIEVEMENTS_KEY = "mb:achievements";
const PLANT_NAME_KEY = "mb:plantName";
const HYDRATION_STATE_KEY = "mb:hydrationState";
const VISUALIZE_DRAFT_KEY = "mb:visualizeDraft";
const VISUALIZE_LOG_KEY = "mb:visualizeEntries";
const JOURNAL_DRAFT_KEY = "mb:journalDraft";
const JOURNAL_LOG_KEY = "mb:journalLog";
const LEGACY_JOURNAL_KEY = "mb:journalEntries";

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

// [MB] Helpers de logros
export async function getAchievementsState() {
  try {
    const value = await AsyncStorage.getItem(ACHIEVEMENTS_KEY);
    if (value) {
      return JSON.parse(value);
    }
  } catch (e) {
    console.warn("Error leyendo logros de storage", e);
  }
  return { progress: {}, unlocked: {} };
}

export async function setAchievementsState(state) {
  try {
    await AsyncStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Error guardando logros en storage", e);
  }
}

// [MB] Helpers de perfil de planta (nombre)
export async function getPlantName() {
  try {
    const value = await AsyncStorage.getItem(PLANT_NAME_KEY);
    return value || "Mi Planta";
  } catch (e) {
    console.warn("Error leyendo nombre de planta de storage", e);
    return "Mi Planta";
  }
}

export async function setPlantName(name) {
  try {
    await AsyncStorage.setItem(PLANT_NAME_KEY, name || "");
  } catch (e) {
    console.warn("Error guardando nombre de planta en storage", e);
  }
}

const DEFAULT_HYDRATION_STATE = { date: null, count: 0 };

export async function getHydrationState() {
  try {
    const value = await AsyncStorage.getItem(HYDRATION_STATE_KEY);
    return value ? JSON.parse(value) : { ...DEFAULT_HYDRATION_STATE };
  } catch (e) {
    console.warn("Error leyendo estado de hidratación", e);
    return { ...DEFAULT_HYDRATION_STATE };
  }
}

export async function setHydrationState(state = DEFAULT_HYDRATION_STATE) {
  try {
    await AsyncStorage.setItem(HYDRATION_STATE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Error guardando estado de hidratación", e);
  }
}

export async function getVisualizeDraft() {
  try {
    const value = await AsyncStorage.getItem(VISUALIZE_DRAFT_KEY);
    return value || "";
  } catch (e) {
    console.warn("Error leyendo borrador de visualizar", e);
    return "";
  }
}

export async function setVisualizeDraft(value) {
  try {
    await AsyncStorage.setItem(VISUALIZE_DRAFT_KEY, value || "");
  } catch (e) {
    console.warn("Error guardando borrador de visualizar", e);
  }
}

export async function getVisualizeEntries() {
  try {
    const value = await AsyncStorage.getItem(VISUALIZE_LOG_KEY);
    return value ? JSON.parse(value) : [];
  } catch (e) {
    console.warn("Error leyendo entradas de visualizar", e);
    return [];
  }
}

export async function addVisualizeEntry(entry) {
  try {
    const current = await getVisualizeEntries();
    await AsyncStorage.setItem(VISUALIZE_LOG_KEY, JSON.stringify([entry, ...current]));
  } catch (e) {
    console.warn("Error guardando entrada de visualizar", e);
  }
}

export async function getJournalDraft() {
  try {
    const value = await AsyncStorage.getItem(JOURNAL_DRAFT_KEY);
    return value || "";
  } catch (e) {
    console.warn("Error leyendo borrador de diario", e);
    return "";
  }
}

export async function setJournalDraft(value) {
  try {
    await AsyncStorage.setItem(JOURNAL_DRAFT_KEY, value || "");
  } catch (e) {
    console.warn("Error guardando borrador de diario", e);
  }
}

export async function getJournalEntries() {
  try {
    const value = await AsyncStorage.getItem(JOURNAL_LOG_KEY);
    if (value) {
      return JSON.parse(value);
    }
    const legacy = await AsyncStorage.getItem(LEGACY_JOURNAL_KEY);
    if (legacy) {
      const parsed = JSON.parse(legacy);
      await AsyncStorage.setItem(JOURNAL_LOG_KEY, legacy);
      await AsyncStorage.removeItem(LEGACY_JOURNAL_KEY);
      return parsed;
    }
    return [];
  } catch (e) {
    console.warn("Error leyendo entradas de diario", e);
    return [];
  }
}

export async function addJournalEntry(entry) {
  try {
    const current = await getJournalEntries();
    await AsyncStorage.setItem(JOURNAL_LOG_KEY, JSON.stringify([entry, ...current]));
  } catch (e) {
    console.warn("Error guardando entrada de diario", e);
  }
}

