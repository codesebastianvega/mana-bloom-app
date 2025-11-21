// [MB] Módulo: Desafíos / Archivo: Templates Dinámicos
// Propósito: Generar desafíos infinitos usando templates procedurales
// Autor: Mana Bloom Team - Fecha: 2025-11-21

import { hashStringToInt, mulberry32 } from '../utils/rand';

/**
 * TEMPLATES DE DESAFÍOS
 * 
 * Cada template puede generar desafíos únicos usando un seed
 * Esto permite desafíos infinitos sin repetición predecible
 */
export const CHALLENGE_TEMPLATES = [
  // Completar N tareas
  {
    id: 'complete_tasks',
    type: 'count',
    weight: 10,
    generate: (seed) => {
      const rng = mulberry32(seed);
      const count = Math.floor(rng() * 6) + 3; // 3-8 tareas
      return {
        id: `complete_tasks_${seed}`,
        type: 'complete_tasks',
        title: `Completa ${count} tareas`,
        description: 'Completa cualquier tipo de tarea',
        target: count,
        progress: 0,
        difficulty: count <= 4 ? 'easy' : count <= 6 ? 'medium' : 'hard',
        reward: { coin: count * 20, xp: count * 5 },
      };
    },
  },
  
  // Completar N hábitos
  {
    id: 'complete_habits',
    type: 'count',
    weight: 8,
    generate: (seed) => {
      const rng = mulberry32(seed);
      const count = Math.floor(rng() * 4) + 2; // 2-5 hábitos
      return {
        id: `complete_habits_${seed}`,
        type: 'complete_habits',
        title: `Completa ${count} hábitos`,
        description: 'Mantén tus hábitos diarios',
        target: count,
        progress: 0,
        difficulty: 'medium',
        reward: { coin: count * 25, xp: count * 8 },
      };
    },
  },
  
  // Completar tareas de un elemento específico
  {
    id: 'element_focus',
    type: 'element',
    weight: 7,
    generate: (seed) => {
      const rng = mulberry32(seed);
      const elements = ['fire', 'water', 'earth', 'air'];
      const elementNames = {
        fire: 'Fuego',
        water: 'Agua',
        earth: 'Tierra',
        air: 'Aire',
      };
      const element = elements[Math.floor(rng() * elements.length)];
      const count = Math.floor(rng() * 4) + 2; // 2-5 tareas
      return {
        id: `element_focus_${seed}`,
        type: 'element_focus',
        title: `Maestro de ${elementNames[element]}`,
        description: `Completa ${count} tareas de ${elementNames[element]}`,
        element,
        target: count,
        progress: 0,
        difficulty: 'medium',
        reward: { coin: 100, mana: 50, xp: 25 },
      };
    },
  },
  
  // Completar rituales específicos
  {
    id: 'ritual_combo',
    type: 'ritual',
    weight: 6,
    generate: (seed) => {
      const rng = mulberry32(seed);
      const rituals = ['meditate', 'hydrate', 'stretch', 'sunlight', 'visualize', 'journal', 'gratitude', 'restEyes'];
      const ritualNames = {
        meditate: 'Meditar',
        hydrate: 'Hidratarte',
        stretch: 'Estirar',
        sunlight: 'Tomar Sol',
        visualize: 'Visualizar',
        journal: 'Escribir',
        gratitude: 'Agradecer',
        restEyes: 'Descansar Ojos',
      };
      const count = Math.floor(rng() * 3) + 3; // 3-5 rituales
      const selected = [];
      for (let i = 0; i < count; i++) {
        const idx = Math.floor(rng() * rituals.length);
        selected.push(rituals[idx]);
      }
      const uniqueRituals = [...new Set(selected)];
      const ritualList = uniqueRituals.map(r => ritualNames[r]).join(', ');
      
      return {
        id: `ritual_combo_${seed}`,
        type: 'ritual_combo',
        title: 'Ritual de Bienestar',
        description: `Completa: ${ritualList}`,
        rituals: uniqueRituals,
        target: uniqueRituals.length,
        progress: 0,
        difficulty: uniqueRituals.length >= 4 ? 'hard' : 'medium',
        reward: { coin: uniqueRituals.length * 30, mana: uniqueRituals.length * 15 },
      };
    },
  },
  
  // Completar tareas difíciles
  {
    id: 'hard_tasks',
    type: 'difficulty',
    weight: 5,
    generate: (seed) => {
      const rng = mulberry32(seed);
      const count = Math.floor(rng() * 3) + 2; // 2-4 tareas difíciles
      return {
        id: `hard_tasks_${seed}`,
        type: 'hard_tasks',
        title: 'Desafío Extremo',
        description: `Completa ${count} tareas difíciles`,
        difficulty: 'hard',
        target: count,
        progress: 0,
        reward: { coin: count * 40, xp: count * 20, gem: 5 },
      };
    },
  },
  
  // Día perfecto (todas las tareas + rituales)
  {
    id: 'perfect_day',
    type: 'special',
    weight: 3,
    generate: (seed) => ({
      id: `perfect_day_${seed}`,
      type: 'perfect_day',
      title: 'Día Perfecto',
      description: 'Completa todas tus tareas y al menos 5 rituales',
      target: 1,
      progress: 0,
      difficulty: 'hard',
      reward: { coin: 300, mana: 200, xp: 100, gem: 25 },
    }),
  },
  
  // Racha de productividad
  {
    id: 'productivity_streak',
    type: 'streak',
    weight: 4,
    generate: (seed) => {
      const rng = mulberry32(seed);
      const days = Math.floor(rng() * 3) + 3; // 3-5 días
      return {
        id: `productivity_streak_${seed}`,
        type: 'productivity_streak',
        title: 'Racha de Productividad',
        description: `Completa al menos 3 tareas durante ${days} días seguidos`,
        target: days,
        progress: 0,
        difficulty: 'hard',
        reward: { coin: days * 50, xp: days * 20, gem: 10 },
      };
    },
  },
  
  // Explorador de elementos
  {
    id: 'element_explorer',
    type: 'variety',
    weight: 5,
    generate: (seed) => ({
      id: `element_explorer_${seed}`,
      type: 'element_explorer',
      title: 'Explorador de Elementos',
      description: 'Completa al menos 1 tarea de cada elemento',
      elements: ['fire', 'water', 'earth', 'air'],
      target: 4,
      progress: 0,
      difficulty: 'medium',
      reward: { coin: 150, mana: 100, xp: 50 },
    }),
  },
  
  // Maestro del tiempo
  {
    id: 'time_master',
    type: 'timing',
    weight: 4,
    generate: (seed) => {
      const rng = mulberry32(seed);
      const count = Math.floor(rng() * 4) + 5; // 5-8 tareas
      return {
        id: `time_master_${seed}`,
        type: 'time_master',
        title: 'Maestro del Tiempo',
        description: `Completa ${count} tareas antes de las 6 PM`,
        target: count,
        progress: 0,
        deadline: '18:00',
        difficulty: 'medium',
        reward: { coin: count * 25, xp: count * 10 },
      };
    },
  },
  
  // Cuidado de planta
  {
    id: 'plant_care',
    type: 'care',
    weight: 6,
    generate: (seed) => {
      const rng = mulberry32(seed);
      const count = Math.floor(rng() * 5) + 5; // 5-9 acciones
      return {
        id: `plant_care_${seed}`,
        type: 'plant_care',
        title: 'Jardinero Dedicado',
        description: `Realiza ${count} acciones de cuidado de planta`,
        target: count,
        progress: 0,
        difficulty: 'easy',
        reward: { coin: count * 15, mana: count * 10 },
      };
    },
  },
];

/**
 * Generar desafíos diarios
 * 
 * @param {string} userId - ID del usuario
 * @param {string} date - Fecha en formato YYYY-MM-DD
 * @param {number} count - Número de desafíos a generar (default: 3)
 * @returns {Array} Array de desafíos generados
 */
export function generateDailyChallenges(userId, date, count = 3) {
  const seedBase = `${userId}:${date}:challenges`;
  const baseSeed = hashStringToInt(seedBase);
  const rng = mulberry32(baseSeed);
  
  const challenges = [];
  const usedTemplates = new Set();
  
  // Calcular peso total
  const totalWeight = CHALLENGE_TEMPLATES.reduce((sum, t) => sum + t.weight, 0);
  
  for (let i = 0; i < count; i++) {
    // Seleccionar template basado en peso
    let roll = rng() * totalWeight;
    let selectedTemplate = null;
    
    for (const template of CHALLENGE_TEMPLATES) {
      if (usedTemplates.has(template.id)) continue;
      roll -= template.weight;
      if (roll <= 0) {
        selectedTemplate = template;
        break;
      }
    }
    
    if (!selectedTemplate) {
      // Fallback: seleccionar el primero disponible
      selectedTemplate = CHALLENGE_TEMPLATES.find(t => !usedTemplates.has(t.id));
    }
    
    if (selectedTemplate) {
      usedTemplates.add(selectedTemplate.id);
      const challengeSeed = baseSeed + i;
      const challenge = selectedTemplate.generate(challengeSeed);
      challenges.push(challenge);
    }
  }
  
  return challenges;
}

/**
 * Verificar si un desafío está completado
 * 
 * @param {Object} challenge - El desafío
 * @returns {boolean} True si está completado
 */
export function isChallengeCompleted(challenge) {
  return challenge.progress >= challenge.target;
}

/**
 * Actualizar progreso de desafío
 * 
 * @param {Object} challenge - El desafío
 * @param {number} increment - Cantidad a incrementar
 * @returns {Object} Desafío actualizado
 */
export function updateChallengeProgress(challenge, increment = 1) {
  return {
    ...challenge,
    progress: Math.min(challenge.progress + increment, challenge.target),
  };
}
