// [MB] Módulo: Utilidades / Sección: Random determinista
// Afecta: AppContext (recompensas y desafíos)
// Propósito: Funciones de hash, PRNG y selección ponderada determinista
// Puntos de edición futura: mover a lib compartida si crece
// Autor: Codex - Fecha: 2025-08-13

export function hashStringToInt(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(a) {
  return function () {
    let t = (a += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pickWeightedDeterministic(items, weights, seedStr) {
  const seed = hashStringToInt(seedStr);
  const rnd = mulberry32(seed)();
  const total = weights.reduce((a, b) => a + b, 0);
  let r = rnd * total;
  for (let i = 0; i < items.length; i++) {
    r -= weights[i];
    if (r <= 0) return items[i];
  }
  return items[items.length - 1];
}

