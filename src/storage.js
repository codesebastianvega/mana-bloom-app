// [MB] Módulo: Estado / Sección: Storage helpers
// Afecta: AppContext (persistencia de maná)
// Propósito: Persistir maná en AsyncStorage
// Puntos de edición futura: extender a otros campos y manejo de errores
// Autor: Codex - Fecha: 2025-08-12

import AsyncStorage from "@react-native-async-storage/async-storage";

const MANA_KEY = "mb:mana";

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

