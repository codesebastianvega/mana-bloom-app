// [MB] Módulo: Estado / Sección: Desafíos Diarios
// Afecta: AppContext y DailyChallengesSection
// Propósito: Plantillas ponderadas para desafíos diarios
// Puntos de edición futura: ajustar pesos y metas
// Autor: Codex - Fecha: 2025-08-13

export const CHALLENGE_TEMPLATES = [
  { id: "ct_3_any", type: "complete_tasks", goal: 3, reward: { xp: 25, mana: 10 }, weight: 30, title: "Completa 3 tareas" },
  { id: "ct_5_any", type: "complete_tasks", goal: 5, reward: { xp: 40, mana: 20 }, weight: 18, title: "Completa 5 tareas" },
  { id: "cp_urg_1", type: "complete_priority", param: "Urgente", goal: 1, reward: { xp: 30, mana: 15 }, weight: 16, title: "Termina 1 tarea Urgente" },
  { id: "cp_med_2", type: "complete_priority", param: "Media", goal: 2, reward: { xp: 35, mana: 18 }, weight: 14, title: "Completa 2 tareas de prioridad Media" },
  { id: "cp_low_3", type: "complete_priority", param: "Baja", goal: 3, reward: { xp: 28, mana: 12 }, weight: 12, title: "Completa 3 tareas de prioridad Baja" },
  { id: "ct_2_any", type: "complete_tasks", goal: 2, reward: { xp: 20, mana: 8 }, weight: 10, title: "Completa 2 tareas" },
];

