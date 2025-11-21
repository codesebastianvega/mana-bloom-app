// [MB] Módulo: Logros / Archivo: Achievements
// Propósito: Definir logros progresivos y ocultos
// Autor: Mana Bloom Team - Fecha: 2025-11-21

/**
 * LOGROS PROGRESIVOS
 * 
 * Estos logros tienen múltiples tiers que nunca se acaban
 * Cada tier desbloquea el siguiente
 */
export const PROGRESSIVE_ACHIEVEMENTS = {
  task_master: {
    id: 'task_master',
    name: 'Maestro de Tareas',
    description: 'Completa tareas para desbloquear tiers',
    icon: 'checkbox-marked-circle',
    category: 'productivity',
    tiers: [
      { tier: 1, target: 10, reward: { coin: 100, xp: 50 } },
      { tier: 2, target: 50, reward: { coin: 300, xp: 150 } },
      { tier: 3, target: 100, reward: { coin: 500, xp: 250, gem: 25 } },
      { tier: 4, target: 250, reward: { coin: 800, xp: 400, gem: 50 } },
      { tier: 5, target: 500, reward: { coin: 1000, xp: 500, gem: 100 } },
      { tier: 6, target: 1000, reward: { coin: 2000, xp: 1000, gem: 200 } },
      { tier: 7, target: 2500, reward: { coin: 3000, xp: 1500, gem: 300 } },
      { tier: 8, target: 5000, reward: { coin: 5000, xp: 2500, gem: 500 } },
      { tier: 9, target: 10000, reward: { coin: 10000, xp: 5000, gem: 1000 } },
    ],
  },
  
  habit_hero: {
    id: 'habit_hero',
    name: 'Héroe de Hábitos',
    description: 'Completa hábitos consistentemente',
    icon: 'repeat',
    category: 'habits',
    tiers: [
      { tier: 1, target: 10, reward: { coin: 150, xp: 75 } },
      { tier: 2, target: 50, reward: { coin: 400, xp: 200 } },
      { tier: 3, target: 100, reward: { coin: 600, xp: 300, gem: 30 } },
      { tier: 4, target: 250, reward: { coin: 1000, xp: 500, gem: 75 } },
      { tier: 5, target: 500, reward: { coin: 1500, xp: 750, gem: 150 } },
      { tier: 6, target: 1000, reward: { coin: 2500, xp: 1250, gem: 250 } },
    ],
  },
  
  streak_legend: {
    id: 'streak_legend',
    name: 'Leyenda de Rachas',
    description: 'Mantén rachas largas',
    icon: 'fire',
    category: 'consistency',
    tiers: [
      { tier: 1, target: 7, reward: { coin: 200, xp: 100 } },
      { tier: 2, target: 30, reward: { coin: 1000, xp: 500, gem: 50 } },
      { tier: 3, target: 90, reward: { coin: 3000, xp: 1500, gem: 200 } },
      { tier: 4, target: 180, reward: { coin: 5000, xp: 2500, gem: 400 } },
      { tier: 5, target: 365, reward: { coin: 10000, xp: 5000, gem: 1000, plant: 'exclusive_yearly' } },
    ],
  },
  
  ritual_master: {
    id: 'ritual_master',
    name: 'Maestro de Rituales',
    description: 'Completa rituales de bienestar',
    icon: 'meditation',
    category: 'wellness',
    tiers: [
      { tier: 1, target: 50, reward: { coin: 200, xp: 100 } },
      { tier: 2, target: 100, reward: { coin: 500, xp: 250, gem: 25 } },
      { tier: 3, target: 250, reward: { coin: 1000, xp: 500, gem: 75 } },
      { tier: 4, target: 500, reward: { coin: 1500, xp: 750, gem: 150 } },
      { tier: 5, target: 1000, reward: { coin: 2500, xp: 1250, gem: 250 } },
    ],
  },
  
  level_climber: {
    id: 'level_climber',
    name: 'Escalador de Niveles',
    description: 'Alcanza niveles altos',
    icon: 'trending-up',
    category: 'progression',
    tiers: [
      { tier: 1, target: 5, reward: { coin: 100, mana: 100 } },
      { tier: 2, target: 10, reward: { coin: 300, mana: 300, gem: 10 } },
      { tier: 3, target: 25, reward: { coin: 800, mana: 800, gem: 50 } },
      { tier: 4, target: 50, reward: { coin: 1500, mana: 1500, gem: 100 } },
      { tier: 5, target: 100, reward: { coin: 3000, mana: 3000, gem: 300 } },
    ],
  },
  
  challenge_champion: {
    id: 'challenge_champion',
    name: 'Campeón de Desafíos',
    description: 'Completa desafíos diarios',
    icon: 'trophy',
    category: 'challenges',
    tiers: [
      { tier: 1, target: 10, reward: { coin: 200, xp: 100 } },
      { tier: 2, target: 50, reward: { coin: 500, xp: 250, gem: 25 } },
      { tier: 3, target: 100, reward: { coin: 1000, xp: 500, gem: 75 } },
      { tier: 4, target: 250, reward: { coin: 2000, xp: 1000, gem: 150 } },
      { tier: 5, target: 500, reward: { coin: 3000, xp: 1500, gem: 300 } },
    ],
  },
  
  plant_collector: {
    id: 'plant_collector',
    name: 'Coleccionista de Plantas',
    description: 'Colecciona diferentes plantas',
    icon: 'flower',
    category: 'collection',
    tiers: [
      { tier: 1, target: 3, reward: { coin: 300, gem: 25 } },
      { tier: 2, target: 5, reward: { coin: 600, gem: 50 } },
      { tier: 3, target: 10, reward: { coin: 1200, gem: 100 } },
      { tier: 4, target: 15, reward: { coin: 2000, gem: 200 } },
      { tier: 5, target: 28, reward: { coin: 5000, gem: 500 } }, // Todas las plantas
    ],
  },
};

/**
 * LOGROS OCULTOS
 * 
 * Estos logros se descubren al cumplir condiciones especiales
 */
export const HIDDEN_ACHIEVEMENTS = {
  early_bird: {
    id: 'early_bird',
    name: 'Madrugador',
    description: 'Completa una tarea antes de las 6 AM',
    icon: 'weather-sunset-up',
    category: 'special',
    reward: { coin: 100, gem: 10 },
    condition: 'complete_task_before_6am',
  },
  
  night_owl: {
    id: 'night_owl',
    name: 'Búho Nocturno',
    description: 'Completa un ritual después de las 11 PM',
    icon: 'weather-night',
    category: 'special',
    reward: { coin: 100, gem: 10 },
    condition: 'complete_ritual_after_11pm',
  },
  
  perfect_day: {
    id: 'perfect_day',
    name: 'Día Perfecto',
    description: 'Completa todas tus tareas y todos los rituales en un día',
    icon: 'star-circle',
    category: 'special',
    reward: { coin: 500, gem: 50 },
    condition: 'complete_all_tasks_and_rituals',
  },
  
  speed_demon: {
    id: 'speed_demon',
    name: 'Demonio de Velocidad',
    description: 'Completa 10 tareas en menos de 1 hora',
    icon: 'lightning-bolt',
    category: 'special',
    reward: { coin: 300, gem: 25 },
    condition: 'complete_10_tasks_in_1_hour',
  },
  
  zen_master: {
    id: 'zen_master',
    name: 'Maestro Zen',
    description: 'Completa todos los rituales en un día',
    icon: 'spa',
    category: 'wellness',
    reward: { coin: 400, gem: 40 },
    condition: 'complete_all_rituals_in_day',
  },
  
  comeback_kid: {
    id: 'comeback_kid',
    name: 'El Regreso',
    description: 'Recupera una racha de 30+ días',
    icon: 'backup-restore',
    category: 'special',
    reward: { coin: 500, gem: 100 },
    condition: 'revive_30_day_streak',
  },
  
  element_master: {
    id: 'element_master',
    name: 'Maestro de Elementos',
    description: 'Completa 10 tareas de cada elemento en una semana',
    icon: 'atom',
    category: 'special',
    reward: { coin: 800, gem: 75 },
    condition: 'complete_10_tasks_per_element_weekly',
  },
  
  egg_hunter: {
    id: 'egg_hunter',
    name: 'Cazador de Huevos',
    description: 'Encuentra tu primer Easter Egg',
    icon: 'egg-easter',
    category: 'collection',
    reward: { coin: 200, gem: 20 },
    condition: 'find_first_easter_egg',
  },
  
  egg_collector: {
    id: 'egg_collector',
    name: 'Coleccionista de Huevos',
    description: 'Encuentra todos los Easter Eggs',
    icon: 'treasure-chest',
    category: 'collection',
    reward: { coin: 2000, gem: 500, plant: 'exclusive_egg_hunter' },
    condition: 'find_all_easter_eggs',
  },
};

/**
 * HELPER: Obtener tier actual de un logro progresivo
 * 
 * @param {string} achievementId - ID del logro
 * @param {number} currentProgress - Progreso actual del usuario
 * @returns {Object|null} Tier actual o null
 */
export function getCurrentTier(achievementId, currentProgress) {
  const achievement = PROGRESSIVE_ACHIEVEMENTS[achievementId];
  if (!achievement) return null;
  
  // Encontrar el tier más alto alcanzado
  let currentTier = null;
  for (const tier of achievement.tiers) {
    if (currentProgress >= tier.target) {
      currentTier = tier;
    } else {
      break;
    }
  }
  
  return currentTier;
}

/**
 * HELPER: Obtener siguiente tier de un logro progresivo
 * 
 * @param {string} achievementId - ID del logro
 * @param {number} currentProgress - Progreso actual del usuario
 * @returns {Object|null} Siguiente tier o null si completó todos
 */
export function getNextTier(achievementId, currentProgress) {
  const achievement = PROGRESSIVE_ACHIEVEMENTS[achievementId];
  if (!achievement) return null;
  
  // Encontrar el siguiente tier no alcanzado
  for (const tier of achievement.tiers) {
    if (currentProgress < tier.target) {
      return tier;
    }
  }
  
  return null; // Completó todos los tiers
}

/**
 * HELPER: Verificar si desbloqueó un nuevo tier
 * 
 * @param {string} achievementId - ID del logro
 * @param {number} oldProgress - Progreso anterior
 * @param {number} newProgress - Progreso nuevo
 * @returns {Object|null} Tier desbloqueado o null
 */
export function checkTierUnlocked(achievementId, oldProgress, newProgress) {
  const achievement = PROGRESSIVE_ACHIEVEMENTS[achievementId];
  if (!achievement) return null;
  
  for (const tier of achievement.tiers) {
    if (oldProgress < tier.target && newProgress >= tier.target) {
      return tier;
    }
  }
  
  return null;
}

/**
 * HELPER: Obtener todos los logros disponibles
 * 
 * @returns {Array} Array de todos los logros
 */
export function getAllAchievements() {
  const progressive = Object.values(PROGRESSIVE_ACHIEVEMENTS);
  const hidden = Object.values(HIDDEN_ACHIEVEMENTS);
  return [...progressive, ...hidden];
}

/**
 * HELPER: Obtener logros por categoría
 * 
 * @param {string} category - Categoría del logro
 * @returns {Array} Array de logros de esa categoría
 */
export function getAchievementsByCategory(category) {
  return getAllAchievements().filter(a => a.category === category);
}
