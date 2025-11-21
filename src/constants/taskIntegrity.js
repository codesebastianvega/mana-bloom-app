// [MB] Módulo: Integridad de Tareas / Archivo: Configuración
// Propósito: Prevenir gaming del sistema y fomentar honestidad
// Autor: Mana Bloom Team - Fecha: 2025-11-21

/**
 * OPCIONES DE TIEMPO ESTIMADO
 * 
 * El usuario selecciona cuánto tiempo cree que tomará la tarea
 * Esto determina el cooldown y las recompensas
 */
export const TIME_ESTIMATES = [
  {
    id: 'quick',
    label: '15-30 min',
    minMinutes: 15,
    maxMinutes: 30,
    cooldownMs: 15 * 60 * 1000, // 15 minutos mínimo
    suggestedDifficulty: 'easy',
  },
  {
    id: 'short',
    label: '30 min - 1 hora',
    minMinutes: 30,
    maxMinutes: 60,
    cooldownMs: 30 * 60 * 1000, // 30 minutos mínimo
    suggestedDifficulty: 'easy',
  },
  {
    id: 'medium',
    label: '1-2 horas',
    minMinutes: 60,
    maxMinutes: 120,
    cooldownMs: 1 * 60 * 60 * 1000, // 1 hora mínimo
    suggestedDifficulty: 'medium',
  },
  {
    id: 'long',
    label: '2-4 horas',
    minMinutes: 120,
    maxMinutes: 240,
    cooldownMs: 2 * 60 * 60 * 1000, // 2 horas mínimo
    suggestedDifficulty: 'medium',
  },
  {
    id: 'extended',
    label: '4+ horas',
    minMinutes: 240,
    maxMinutes: 480,
    cooldownMs: 4 * 60 * 60 * 1000, // 4 horas mínimo
    suggestedDifficulty: 'hard',
  },
  {
    id: 'day_1',
    label: '1 día',
    minMinutes: 480,
    maxMinutes: 1440,
    cooldownMs: 8 * 60 * 60 * 1000, // 8 horas mínimo
    suggestedDifficulty: 'hard',
  },
  {
    id: 'day_2',
    label: '2 días',
    minMinutes: 1440,
    maxMinutes: 2880,
    cooldownMs: 24 * 60 * 60 * 1000, // 1 día mínimo
    suggestedDifficulty: 'hard',
  },
  {
    id: 'day_3',
    label: '3 días',
    minMinutes: 2880,
    maxMinutes: 4320,
    cooldownMs: 48 * 60 * 60 * 1000, // 2 días mínimo
    suggestedDifficulty: 'hard',
  },
  {
    id: 'week',
    label: '1 semana',
    minMinutes: 4320,
    maxMinutes: 10080,
    cooldownMs: 3 * 24 * 60 * 60 * 1000, // 3 días mínimo
    suggestedDifficulty: 'hard',
  },
  {
    id: 'weeks',
    label: 'Varias semanas',
    minMinutes: 10080,
    maxMinutes: 43200,
    cooldownMs: 7 * 24 * 60 * 60 * 1000, // 1 semana mínimo
    suggestedDifficulty: 'hard',
  },
];

/**
 * LÍMITES DIARIOS
 * 
 * Previene spam de tareas
 */
export const DAILY_LIMITS = {
  // Límite total de tareas que se pueden completar al día
  maxTasksCompleted: 20,
  
  // Límite total de tareas que se pueden crear al día
  maxTasksCreated: 20,
  
  // Límites por tipo de tiempo estimado
  maxPerTimeEstimate: {
    quick: 5,      // Máximo 5 tareas de 15-30 min
    short: 5,      // Máximo 5 tareas de 30-60 min
    medium: 4,     // Máximo 4 tareas de 1-2 horas
    long: 3,       // Máximo 3 tareas de 2-4 horas
    extended: 2,   // Máximo 2 tareas de 4+ horas
    day_1: 2,      // Máximo 2 tareas de 1 día
    day_2: 1,      // Máximo 1 tarea de 2 días
    day_3: 1,      // Máximo 1 tarea de 3 días
    week: 1,       // Máximo 1 tarea de 1 semana
    weeks: 1,      // Máximo 1 tarea de varias semanas
  },
};

/**
 * RENDIMIENTOS DECRECIENTES
 * 
 * Después de cierto número de tareas, las recompensas disminuyen
 */
export const DIMINISHING_RETURNS = [
  { min: 1, max: 5, multiplier: 1.0 },    // Primeras 5: 100%
  { min: 6, max: 10, multiplier: 0.8 },   // 6-10: 80%
  { min: 11, max: 15, multiplier: 0.6 },  // 11-15: 60%
  { min: 16, max: 20, multiplier: 0.4 },  // 16-20: 40%
  { min: 21, max: 999, multiplier: 0.0 }, // 21+: 0%
];

/**
 * PENALIZACIÓN POR COMPLETAR ANTES DE TIEMPO
 * 
 * Si completan la tarea antes del cooldown, solo reciben XP
 */
export const EARLY_COMPLETION_PENALTY = {
  mana: 0,     // Sin maná
  coin: 0,     // Sin monedas
  gem: 0,      // Sin gemas
  xp: 0.5,     // Solo 50% del XP
};

/**
 * SISTEMA DE CONFIANZA (Trust Score)
 * 
 * Score invisible que ajusta recompensas según comportamiento
 */
export const TRUST_SCORE = {
  // Valores iniciales
  initial: 75,
  min: 0,
  max: 100,
  
  // Factores que aumentan confianza (+)
  bonuses: {
    completeAfterCooldown: 2,      // +2 por completar después del cooldown
    addReflection: 3,               // +3 por agregar reflexión
    longStreak: 5,                  // +5 por racha de 30+ días
    completeHardChallenge: 4,       // +4 por completar desafío difícil
    consistentDaily: 1,             // +1 por completar tareas diariamente
  },
  
  // Factores que reducen confianza (-)
  penalties: {
    completeBeforeCooldown: -5,     // -5 por completar antes de tiempo
    spamTasks: -10,                 // -10 por crear muchas tareas rápido
    breakStreak: -3,                // -3 por romper racha
    noReflection: -1,               // -1 por nunca reflexionar
  },
  
  // Multiplicadores de recompensas según trust score
  rewardMultipliers: [
    { min: 90, max: 100, multiplier: 1.2, label: 'Excelente' },  // +20%
    { min: 70, max: 89, multiplier: 1.0, label: 'Bueno' },       // Normal
    { min: 50, max: 69, multiplier: 0.9, label: 'Regular' },     // -10%
    { min: 30, max: 49, multiplier: 0.8, label: 'Bajo' },        // -20%
    { min: 0, max: 29, multiplier: 0.7, label: 'Muy Bajo' },     // -30%
  ],
};

/**
 * HELPER: Obtener cooldown basado en tiempo estimado
 * 
 * @param {string} timeEstimateId - ID del tiempo estimado
 * @returns {number} Cooldown en milisegundos
 */
export function getCooldownForTimeEstimate(timeEstimateId) {
  const estimate = TIME_ESTIMATES.find(e => e.id === timeEstimateId);
  return estimate ? estimate.cooldownMs : 0;
}

/**
 * HELPER: Verificar si puede crear tarea de este tipo hoy
 * 
 * @param {string} timeEstimateId - ID del tiempo estimado
 * @param {Array} todaysTasks - Tareas creadas hoy
 * @returns {Object} { canCreate: boolean, reason: string }
 */
export function canCreateTaskOfType(timeEstimateId, todaysTasks) {
  // Verificar límite total
  if (todaysTasks.length >= DAILY_LIMITS.maxTasksCreated) {
    return {
      canCreate: false,
      reason: `Has alcanzado el límite diario de ${DAILY_LIMITS.maxTasksCreated} tareas`,
    };
  }
  
  // Verificar límite por tipo
  const tasksOfType = todaysTasks.filter(t => t.timeEstimate === timeEstimateId);
  const limit = DAILY_LIMITS.maxPerTimeEstimate[timeEstimateId] || 999;
  
  if (tasksOfType.length >= limit) {
    const estimate = TIME_ESTIMATES.find(e => e.id === timeEstimateId);
    return {
      canCreate: false,
      reason: `Has alcanzado el límite de ${limit} tareas de "${estimate?.label}"`,
    };
  }
  
  return { canCreate: true };
}

/**
 * HELPER: Verificar si puede completar tarea ahora
 * 
 * @param {Object} task - La tarea
 * @returns {Object} { canComplete: boolean, reason: string, penalty: boolean }
 */
export function canCompleteTask(task) {
  const now = Date.now();
  const createdAt = new Date(task.createdAt).getTime();
  const cooldown = getCooldownForTimeEstimate(task.timeEstimate);
  const canCompleteAt = createdAt + cooldown;
  
  if (now < canCompleteAt) {
    const remainingMs = canCompleteAt - now;
    const remainingMinutes = Math.ceil(remainingMs / (60 * 1000));
    const remainingHours = Math.floor(remainingMinutes / 60);
    
    let timeString;
    if (remainingHours > 0) {
      timeString = `${remainingHours}h ${remainingMinutes % 60}m`;
    } else {
      timeString = `${remainingMinutes}m`;
    }
    
    return {
      canComplete: true, // Puede completar, pero con penalización
      penalty: true,
      reason: `Completaste antes de tiempo. Solo recibirás 50% del XP. Tiempo restante: ${timeString}`,
    };
  }
  
  return {
    canComplete: true,
    penalty: false,
  };
}

/**
 * HELPER: Calcular multiplicador de rendimientos decrecientes
 * 
 * @param {number} tasksCompletedToday - Tareas completadas hoy
 * @returns {number} Multiplicador (0.0 - 1.0)
 */
export function getDiminishingReturnsMultiplier(tasksCompletedToday) {
  const bracket = DIMINISHING_RETURNS.find(
    b => tasksCompletedToday >= b.min && tasksCompletedToday <= b.max
  );
  return bracket ? bracket.multiplier : 0;
}

/**
 * HELPER: Calcular multiplicador de trust score
 * 
 * @param {number} trustScore - Trust score del usuario (0-100)
 * @returns {number} Multiplicador de recompensas
 */
export function getTrustScoreMultiplier(trustScore) {
  const bracket = TRUST_SCORE.rewardMultipliers.find(
    b => trustScore >= b.min && trustScore <= b.max
  );
  return bracket ? bracket.multiplier : 1.0;
}

/**
 * HELPER: Ajustar trust score
 * 
 * @param {number} currentScore - Score actual
 * @param {string} action - Acción realizada
 * @returns {number} Nuevo score
 */
export function adjustTrustScore(currentScore, action) {
  const bonus = TRUST_SCORE.bonuses[action] || 0;
  const penalty = TRUST_SCORE.penalties[action] || 0;
  const adjustment = bonus + penalty;
  
  const newScore = currentScore + adjustment;
  return Math.max(TRUST_SCORE.min, Math.min(TRUST_SCORE.max, newScore));
}

/**
 * HELPER: Calcular recompensas finales con todos los modificadores
 * 
 * @param {Object} baseReward - Recompensa base
 * @param {Object} modifiers - Modificadores
 * @returns {Object} Recompensas finales
 */
export function calculateFinalReward(baseReward, modifiers = {}) {
  const {
    earlyCompletion = false,
    tasksCompletedToday = 0,
    trustScore = 75,
    isPro = false,
  } = modifiers;
  
  let { mana = 0, coin = 0, gem = 0, xp = 0 } = baseReward;
  
  // Penalización por completar antes de tiempo
  if (earlyCompletion) {
    mana *= EARLY_COMPLETION_PENALTY.mana;
    coin *= EARLY_COMPLETION_PENALTY.coin;
    gem *= EARLY_COMPLETION_PENALTY.gem;
    xp *= EARLY_COMPLETION_PENALTY.xp;
  } else {
    // Solo aplicar otros modificadores si no hay penalización
    
    // Rendimientos decrecientes
    const diminishingMultiplier = getDiminishingReturnsMultiplier(tasksCompletedToday);
    mana *= diminishingMultiplier;
    coin *= diminishingMultiplier;
    gem *= diminishingMultiplier;
    xp *= diminishingMultiplier;
    
    // Trust score
    const trustMultiplier = getTrustScoreMultiplier(trustScore);
    mana *= trustMultiplier;
    coin *= trustMultiplier;
    gem *= trustMultiplier;
    xp *= trustMultiplier;
  }
  
  // Pro multiplier (solo XP)
  if (isPro) {
    xp *= 2.0;
  }
  
  return {
    mana: Math.floor(mana),
    coin: Math.floor(coin),
    gem: Math.floor(gem),
    xp: Math.floor(xp),
  };
}
