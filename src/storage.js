// [MB] Módulo: Estado / Sección: Storage helpers
// Afecta: AppContext (persistencia de maná y rachas)
// Propósito: Persistir datos básicos de usuario en AsyncStorage
// Puntos de edición futura: extender a otros campos y manejo de errores
// Autor: Codex - Fecha: 2025-08-12

import AsyncStorage from "@react-native-async-storage/async-storage";

const MANA_KEY = "mb:mana";
const STREAK_KEY = "mb:streak";
const LAST_CLAIM_DATE_KEY = "mb:lastClaimDate";

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

