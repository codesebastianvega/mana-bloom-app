// [MB] Módulo: Estado / Sección: Recompensas Diarias
// Afecta: AppContext y HomeScreen (DailyRewardSection)
// Propósito: Pool ponderado de recompensas diarias
// Puntos de edición futura: ajustar pesos y contenido del pool
// Autor: Codex - Fecha: 2025-08-13

export const DAILY_REWARDS = [
  { id: "mana_25", kind: "mana", amount: 25, weight: 30, title: "+25 Maná" },
  { id: "coin_50", kind: "coin", amount: 50, weight: 25, title: "+50 Monedas" },
  { id: "mana_50", kind: "mana", amount: 50, weight: 20, title: "+50 Maná" },
  { id: "item_p2", kind: "item", sku: "shop/potions/p2", weight: 15, title: "Cristal de Maná" },
  { id: "gem_1", kind: "gem", amount: 1, weight: 10, title: "+1 Diamante" },
];

