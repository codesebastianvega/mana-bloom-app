// [MB] Módulo: Estado / Sección: Catálogo de Tienda
// Afecta: inventario y recompensas
// Propósito: Definir catálogo por categoría y acentos
// Puntos de edición futura: ampliar catálogo, agregar suscripciones
// Autor: Codex - Fecha: 2025-08-13

export const CURRENCIES = { MANA: "mana", COIN: "coin", GEM: "gem" };

export const SHOP_CATALOG = {
  potions: [
    { sku: "shop/potions/p1", emoji: "🧪", title: "Poción de Sabiduría", desc: "XP×2 por 2h", price: 50, currency: CURRENCIES.MANA },
    { sku: "shop/potions/p2", emoji: "💠", title: "Cristal de Maná", desc: "+100 maná", price: 30, currency: CURRENCIES.MANA },
  ],
  tools: [
    { sku: "shop/tools/t1", emoji: "✨", title: "Varita Élfica", desc: "Baja dificultad 1 día", price: 120, currency: CURRENCIES.COIN },
    { sku: "shop/tools/t2", emoji: "🛡️", title: "Escudo Temporal", desc: "Protege racha 1 día", price: 80, currency: CURRENCIES.COIN },
  ],
  cosmetics: [
    { sku: "shop/cosmetics/c1", emoji: "🏺", title: "Maceta Dorada", desc: "Solo visual", price: 3, currency: CURRENCIES.GEM },
  ],
};

export const ShopColors = {
  potions:   { bg: "#1b1231", border: "#7e57c2", pill: "#B542F6" },
  tools:     { bg: "#10251c", border: "#1cd47b", pill: "#1cd47b" },
  cosmetics: { bg: "#281e00", border: "#FFD700", pill: "#FFD700" },
  subs:      { bg: "#281e00", border: "#FFD700", pill: "#FFD700" },
};

export const SHOP_LOOKUP = Object.fromEntries(
  Object.entries(SHOP_CATALOG).flatMap(([category, items]) =>
    items.map((item) => [item.sku, { title: item.title, category }])
  )
);
