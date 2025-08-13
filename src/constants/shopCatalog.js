// [MB] Módulo: Estado / Sección: Catálogo de Tienda
// Afecta: inventario y recompensas
// Propósito: Definir catálogo por categoría y acentos
// Puntos de edición futura: ampliar catálogo, agregar suscripciones
// Autor: Codex - Fecha: 2025-02-14


export const CURRENCIES = { MANA: "mana", COIN: "coin", GEM: "gem" };

export const SHOP_CATALOG = {
  potions: [
    { sku: "shop/potions/p1", emoji: "🧪", title: "Poción de Sabiduría", desc: "XP×2 por 2h", price: 50, currency: CURRENCIES.MANA },
    { sku: "shop/potions/p2", emoji: "💠", title: "Cristal de Maná", desc: "+100 maná", price: 30, currency: CURRENCIES.MANA },
    { sku: "shop/potions/p3", emoji: "🔥", title: "Elixir de Energía", desc: "Agiliza tareas 1h", price: 40, currency: CURRENCIES.MANA },
    { sku: "shop/potions/p4", emoji: "🕒", title: "Pócima Temporal", desc: "+1h de racha", price: 60, currency: CURRENCIES.MANA },
    { sku: "shop/potions/p5", emoji: "🌙", title: "Sueño Reparador", desc: "Recarga energía", price: 35, currency: CURRENCIES.MANA },
    { sku: "shop/potions/p6", emoji: "⚡", title: "Relámpago de Foco", desc: "+50 XP instantáneo", price: 45, currency: CURRENCIES.MANA },
  ],
  tools: [
    { sku: "shop/tools/t1", emoji: "✨", title: "Varita Élfica", desc: "Baja dificultad 1 día", price: 120, currency: CURRENCIES.COIN },
    { sku: "shop/tools/t2", emoji: "🛡️", title: "Escudo Temporal", desc: "Protege racha 1 día", price: 80, currency: CURRENCIES.COIN },
    { sku: "shop/tools/t3", emoji: "⏰", title: "Reloj Mágico", desc: "Recordatorio extra", price: 90, currency: CURRENCIES.COIN },
    { sku: "shop/tools/t4", emoji: "🪓", title: "Hacha Enana", desc: "Duplica recolección", price: 150, currency: CURRENCIES.COIN },
    { sku: "shop/tools/t5", emoji: "🧭", title: "Brújula Arcana", desc: "Sugiere tarea diaria", price: 70, currency: CURRENCIES.COIN },
    { sku: "shop/tools/t6", emoji: "📦", title: "Baúl Portátil", desc: "Espacio +5 inventario", price: 110, currency: CURRENCIES.COIN },
  ],
  cosmetics: [
    { sku: "shop/cosmetics/c1", emoji: "🏺", title: "Maceta Dorada", desc: "Solo visual", price: 3, currency: CURRENCIES.GEM },
    { sku: "shop/cosmetics/c2", emoji: "🎩", title: "Sombrero Encantado", desc: "Solo visual", price: 2, currency: CURRENCIES.GEM },
    { sku: "shop/cosmetics/c3", emoji: "🦋", title: "Ala de Mariposa", desc: "Solo visual", price: 1, currency: CURRENCIES.GEM },
    { sku: "shop/cosmetics/c4", emoji: "🌈", title: "Aura Arcoíris", desc: "Solo visual", price: 4, currency: CURRENCIES.GEM },
    { sku: "shop/cosmetics/c5", emoji: "👑", title: "Corona Real", desc: "Solo visual", price: 5, currency: CURRENCIES.GEM },
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
