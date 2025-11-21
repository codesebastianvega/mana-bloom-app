// [MB] Módulo: Economía / Archivo: Configuración
// Propósito: Definir todas las recompensas, precios y balance económico
// Autor: Mana Bloom Team - Fecha: 2025-11-21

/**
 * RECOMPENSAS POR TAREAS Y HÁBITOS
 * 
 * Modificar aquí para ajustar cuánto gana el usuario por completar tareas
 */
export const TASK_REWARDS = {
  // Recompensas base por dificultad
  easy: { 
    mana: 10, 
    xp: 5, 
    coin: 0 
  },
  medium: { 
    mana: 30, 
    xp: 15, 
    coin: 0 
  },
  hard: { 
    mana: 50, 
    xp: 30, 
    coin: 0 
  },
  
  // Bonus adicionales
  bonuses: {
    habit: { mana: 5 }, // +5 maná extra por ser hábito
    elementMatch: { mana: 10, xp: 5 }, // Bonus si elemento coincide con planta
  },
};

/**
 * RECOMPENSAS POR DESAFÍOS
 * 
 * Los desafíos son generados dinámicamente pero usan estas recompensas base
 */
export const CHALLENGE_REWARDS = {
  easy: { 
    coin: 50, 
    xp: 10 
  },
  medium: { 
    coin: 100, 
    xp: 25 
  },
  hard: { 
    coin: 150, 
    xp: 50 
  },
};

/**
 * RECOMPENSAS POR RACHAS
 * 
 * Se otorgan al alcanzar ciertos días consecutivos
 */
export const STREAK_REWARDS = {
  7: { 
    coin: 200, 
    mana: 100 
  },
  15: { 
    coin: 500, 
    gem: 25, 
    mana: 200 
  },
  30: { 
    coin: 1000, 
    gem: 50, 
    mana: 500 
  },
  60: { 
    coin: 2000, 
    gem: 100, 
    plant: 'random_rare' 
  },
  90: { 
    coin: 3000, 
    gem: 200, 
    plant: 'random_legendary' 
  },
  180: { 
    coin: 5000, 
    gem: 500, 
    plant: 'random_ultra_rare' 
  },
  365: { 
    coin: 10000, 
    gem: 1000, 
    plant: 'exclusive_yearly' 
  },
};

/**
 * RECOMPENSAS DIARIAS
 * 
 * Recompensa por iniciar sesión cada día
 */
export const DAILY_LOGIN_REWARD = {
  mana: 50,
  xp: 10,
};

/**
 * RECOMPENSAS POR SUBIR DE NIVEL
 * 
 * Se otorgan cada vez que el usuario sube de nivel
 */
export const LEVEL_UP_REWARD = {
  mana: 100,
  coin: 50,
};

/**
 * COSTOS DE ACCIONES DE CUIDADO
 * 
 * Cuánto maná cuesta cada acción de cuidado de la planta
 */
export const ACTION_COSTS = {
  water: { mana: 20 },
  feed: { mana: 30 },
  clean: { mana: 0 }, // Gratis
  prune: { mana: 0 }, // Gratis
  light: { mana: 0 }, // Gratis
  mist: { mana: 15 },
  search: { mana: 0 }, // Gratis
  meditate: { mana: 10 },
};

/**
 * MULTIPLICADORES GLOBALES
 * 
 * Útil para eventos especiales (ej: fin de semana 2x XP)
 * Modificar temporalmente para eventos
 */
export const ECONOMY_MULTIPLIERS = {
  mana: 1.0,    // 1.0 = normal, 2.0 = doble
  coin: 1.0,
  xp: 1.0,
  gem: 1.0,
};

/**
 * CONFIGURACIÓN PRO
 * 
 * Beneficios de la suscripción Pro
 */
export const PRO_BENEFITS = {
  dailyManaBonus: 50,        // +50 maná extra al día
  xpMultiplier: 2.0,         // 2x XP
  shopDiscount: 0.20,        // 20% descuento en tienda
  inventorySlots: 999,       // Inventario ilimitado
};

/**
 * PRECIOS DE SUSCRIPCIONES (USD)
 */
export const SUBSCRIPTION_PRICES = {
  pro_monthly: 4.99,
  pro_yearly: 49.99, // Ahorra ~17%
};

/**
 * PAQUETES DE GEMAS
 */
export const GEM_PACKS = {
  starter: { 
    gems: 100, 
    price: 0.99, 
    bonus: 0 
  },
  popular: { 
    gems: 500, 
    price: 4.99, 
    bonus: 50  // +10%
  },
  best_value: { 
    gems: 1200, 
    price: 9.99, 
    bonus: 200 // +17%
  },
  mega: { 
    gems: 2500, 
    price: 19.99, 
    bonus: 500 // +20%
  },
};

/**
 * HELPER: Calcular recompensa de tarea
 * 
 * @param {Object} task - La tarea completada
 * @param {string} plantElement - Elemento de la planta actual
 * @param {boolean} isPro - Si el usuario es Pro
 * @returns {Object} Recompensas calculadas
 */
export function calculateTaskReward(task, plantElement = null, isPro = false) {
  const difficulty = task.difficulty || 'easy';
  const baseReward = TASK_REWARDS[difficulty];
  
  let mana = baseReward.mana;
  let xp = baseReward.xp;
  let coin = baseReward.coin;
  
  // Bonus por hábito
  if (task.type === 'habit') {
    mana += TASK_REWARDS.bonuses.habit.mana;
  }
  
  // Bonus por elemento coincidente
  if (plantElement && task.element === plantElement) {
    mana += TASK_REWARDS.bonuses.elementMatch.mana;
    xp += TASK_REWARDS.bonuses.elementMatch.xp;
  }
  
  // Aplicar multiplicadores globales
  mana = Math.floor(mana * ECONOMY_MULTIPLIERS.mana);
  coin = Math.floor(coin * ECONOMY_MULTIPLIERS.coin);
  xp = Math.floor(xp * ECONOMY_MULTIPLIERS.xp);
  
  // Aplicar multiplicador Pro
  if (isPro) {
    xp = Math.floor(xp * PRO_BENEFITS.xpMultiplier);
  }
  
  return { mana, xp, coin };
}

/**
 * HELPER: Calcular recompensa de desafío
 * 
 * @param {string} difficulty - Dificultad del desafío
 * @param {boolean} isPro - Si el usuario es Pro
 * @returns {Object} Recompensas calculadas
 */
export function calculateChallengeReward(difficulty = 'medium', isPro = false) {
  const baseReward = CHALLENGE_REWARDS[difficulty];
  
  let coin = baseReward.coin;
  let xp = baseReward.xp;
  
  // Aplicar multiplicadores
  coin = Math.floor(coin * ECONOMY_MULTIPLIERS.coin);
  xp = Math.floor(xp * ECONOMY_MULTIPLIERS.xp);
  
  // Aplicar multiplicador Pro
  if (isPro) {
    xp = Math.floor(xp * PRO_BENEFITS.xpMultiplier);
  }
  
  return { coin, xp };
}

/**
 * HELPER: Obtener recompensa de racha
 * 
 * @param {number} streakDays - Días de racha
 * @returns {Object|null} Recompensa o null si no hay
 */
export function getStreakReward(streakDays) {
  return STREAK_REWARDS[streakDays] || null;
}

/**
 * HELPER: Calcular precio con descuento Pro
 * 
 * @param {number} basePrice - Precio base
 * @param {boolean} isPro - Si el usuario es Pro
 * @returns {number} Precio final
 */
export function calculatePrice(basePrice, isPro = false) {
  if (isPro) {
    return Math.floor(basePrice * (1 - PRO_BENEFITS.shopDiscount));
  }
  return basePrice;
}
