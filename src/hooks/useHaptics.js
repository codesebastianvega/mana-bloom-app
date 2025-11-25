// [MB] Modulo: Hooks / Seccion: useHaptics
// Afecta: Acciones principales (tareas, recompensas, inventario)
// Proposito: Centralizar micro-interacciones con haptics sin depender de hooks de React
// Puntos de edicion futura: añadir configuraciones por usuario
// Autor: Codex - Fecha: 2025-11-25

import * as Haptics from "expo-haptics";

function safeCall(promise) {
  promise.catch(() => {
    // Ignorar errores cuando haptics no esta disponible (web, simuladores sin soporte)
  });
}

export function useHaptics() {
  const success = () => safeCall(Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium));
  const light = () => safeCall(Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light));
  const notification = (type = Haptics.NotificationFeedbackType.Success) =>
    safeCall(Haptics.notificationAsync(type));

  return { success, light, notification };
}
