// [MB] Módulo: Utils / Archivo: Task Helpers
// Propósito: Funciones helper para normalizar y validar tareas
// Autor: Mana Bloom Team - Fecha: 2025-11-21

/**
 * Normalize a task to ensure all required fields exist
 * This prevents "Cannot read property 'forEach' of undefined" errors
 */
export function normalizeTask(task) {
  if (!task) return null;
  
  return {
    ...task,
    tags: Array.isArray(task.tags) ? task.tags : [],
    subtasks: Array.isArray(task.subtasks) ? task.subtasks : [],
    note: task.note || task.description || "",
    completed: task.completed || task.done || false,
    done: task.done || task.completed || false,
    isDeleted: task.isDeleted || false,
  };
}

/**
 * Normalize an array of tasks
 */
export function normalizeTasks(tasks) {
  if (!Array.isArray(tasks)) return [];
  return tasks.map(normalizeTask).filter(Boolean);
}
