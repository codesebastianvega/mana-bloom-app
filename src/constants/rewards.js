// [MB] Módulo: Estado / Sección: Recompensas de tareas
// Afecta: TasksScreen (aplicar recompensas por prioridad)
// Propósito: Definir XP y maná otorgados según la prioridad de la tarea
// Puntos de edición futura: ajustar valores o añadir más prioridades
// Autor: Codex - Fecha: 2025-08-12

export const XP_REWARD_BY_PRIORITY = {
  Baja: { xp: 10, mana: 5 },
  Media: { xp: 25, mana: 12 },
  Urgente: { xp: 50, mana: 25 },
};
