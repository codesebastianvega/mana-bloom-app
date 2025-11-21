// [MB] Módulo: Estado / Sección: Catálogo de Tienda
// Afecta: inventario y recompensas
// Propósito: Definir catálogo por categoría, rareza y costos compuestos
// Autor: Codex - Fecha: 2025-02-14

export const CURRENCIES = { MANA: "mana", COIN: "coin", GEM: "gem" };

export const RARITY_TIERS = {
  BASIC: { id: "basic", label: "Básico", color: "#B0BEC5", border: "#CFD8DC" }, // Gray
  UNCOMMON: { id: "uncommon", label: "Poco Común", color: "#66BB6A", border: "#81C784" }, // Green
  RARE: { id: "rare", label: "Raro", color: "#42A5F5", border: "#64B5F6" }, // Blue
  EPIC: { id: "epic", label: "Épico", color: "#AB47BC", border: "#BA68C8" }, // Purple
  LEGENDARY: { id: "legendary", label: "Legendario", color: "#FFA726", border: "#FFB74D" }, // Orange
  MYTHIC: { id: "mythic", label: "Mítico", color: "#EF5350", border: "#E57373" }, // Red
  DIVINE: { id: "divine", label: "Divino", color: "#FFD700", border: "#FFFF00" }, // Gold
};

export const SHOP_CATALOG = {
  potions: [
    { sku: "shop/potions/p1", emoji: "🧪", title: "Poción de Sabiduría Menor", desc: "+50% XP por 1h", cost: { mana: 50 }, rarity: "basic" },
    { sku: "shop/potions/p2", emoji: "🔮", title: "Poción de Sabiduría Mayor", desc: "+100% XP por 2h", cost: { mana: 100 }, rarity: "uncommon" },
    { sku: "shop/potions/p3", emoji: "👁️", title: "Elixir de Enfoque", desc: "Reduce tiempo tareas 15%", cost: { mana: 40 }, rarity: "basic" },
    { sku: "shop/potions/p4", emoji: "💠", title: "Cristal de Maná Pequeño", desc: "Recupera 50 Maná", cost: { coin: 25 }, rarity: "basic" },
    { sku: "shop/potions/p5", emoji: "💎", title: "Cristal de Maná Grande", desc: "Recupera 150 Maná", cost: { coin: 60 }, rarity: "uncommon" },
    { sku: "shop/potions/p6", emoji: "💧", title: "Gota de Lluvia Eterna", desc: "Riego instantáneo 100%", cost: { mana: 30 }, rarity: "basic" },
    { sku: "shop/potions/p7", emoji: "☀️", title: "Rayo de Sol Embotellado", desc: "Felicidad planta máx", cost: { mana: 30 }, rarity: "basic" },
    { sku: "shop/potions/p8", emoji: "🛡️", title: "Escudo de Racha (24h)", desc: "Protege 1 día perdido", cost: { coin: 200 }, rarity: "rare" },
    { sku: "shop/potions/p9", emoji: "🧠", title: "Poción de Olvido", desc: "Borra tarea fallida", cost: { coin: 50 }, rarity: "uncommon" },
    { sku: "shop/potions/p10", emoji: "☕", title: "Brebaje de Cafeína", desc: "3 tareas sin cooldown", cost: { mana: 80 }, rarity: "uncommon" },
    { sku: "shop/potions/p11", emoji: "🔥", title: "Esencia Fuego", desc: "Afinidad Fuego (1 uso)", cost: { mana: 20 }, rarity: "basic" },
    { sku: "shop/potions/p12", emoji: "🌊", title: "Esencia Agua", desc: "Afinidad Agua (1 uso)", cost: { mana: 20 }, rarity: "basic" },
    { sku: "shop/potions/p13", emoji: "🌿", title: "Esencia Tierra", desc: "Afinidad Tierra (1 uso)", cost: { mana: 20 }, rarity: "basic" },
    { sku: "shop/potions/p14", emoji: "💨", title: "Esencia Aire", desc: "Afinidad Aire (1 uso)", cost: { mana: 20 }, rarity: "basic" },
    { sku: "shop/potions/p15", emoji: "💰", title: "Transmutador", desc: "500 Maná -> 50 Monedas", cost: { mana: 500 }, rarity: "rare" },
    // User Potions
    { sku: "shop/potions/u_mana_crystal", emoji: "💎", title: "Cristal de Maná", desc: "Recupera maná", cost: { coin: 50 }, rarity: "basic" },
    { sku: "shop/potions/u_magic_crystal", emoji: "🔮", title: "Cristal Mágico", desc: "Potencia mágica", cost: { coin: 100 }, rarity: "uncommon" },
    { sku: "shop/potions/u_energy_elixir", emoji: "⚡", title: "Elixir de Energía", desc: "Energía pura", cost: { coin: 150 }, rarity: "uncommon" },
    { sku: "shop/potions/u_wisdom_potion", emoji: "🧠", title: "Poción de Sabiduría", desc: "+XP temporal", cost: { coin: 200 }, rarity: "rare" },
    { sku: "shop/potions/u_time_potion", emoji: "⏳", title: "Poción Temporal", desc: "Acelera tiempo", cost: { coin: 300 }, rarity: "rare" },
    { sku: "shop/potions/u_green_potion", emoji: "🧪", title: "Poción Herbal", desc: "Curación leve", cost: { coin: 50 }, rarity: "basic" },
    { sku: "shop/potions/u_purple_potion", emoji: "🟣", title: "Poción Mística", desc: "Efecto aleatorio", cost: { coin: 100 }, rarity: "uncommon" },
    { sku: "shop/potions/u_focus_lightning", emoji: "🌩️", title: "Relámpago de Foco", desc: "Concentración", cost: { coin: 250 }, rarity: "rare" },
  ],
  seeds: [
    { sku: "shop/seeds/s1", emoji: "🌸", title: "Semilla Loto Cristal", desc: "Planta de Agua (Nvl 2)", cost: { coin: 500 }, rarity: "rare" },
    { sku: "shop/seeds/s2", emoji: "🔥", title: "Brote de Fénix", desc: "Planta de Fuego (Nvl 3)", cost: { coin: 600 }, rarity: "rare" },
    { sku: "shop/seeds/s3", emoji: "🌳", title: "Bonsái Roble Ancestral", desc: "Planta de Tierra (Nvl 4)", cost: { coin: 700 }, rarity: "rare" },
    { sku: "shop/seeds/s4", emoji: "🌬️", title: "Orquídea de Viento", desc: "Planta de Aire (Nvl 5)", cost: { coin: 800 }, rarity: "epic" },
    { sku: "shop/seeds/s5", emoji: "🌵", title: "Cactus Lunar", desc: "Planta Nocturna", cost: { coin: 1000 }, rarity: "epic" },
    { sku: "shop/seeds/s6", emoji: "🌻", title: "Girasol Radiante", desc: "Planta Diurna", cost: { coin: 1000 }, rarity: "epic" },
    { sku: "shop/seeds/s7", emoji: "🌹", title: "Rosa de los Vientos", desc: "Aire/Agua", cost: { coin: 1500 }, rarity: "epic" },
    { sku: "shop/seeds/s8", emoji: "🍄", title: "Hongo Luminiscente", desc: "Tierra/Oscuridad", cost: { coin: 1500 }, rarity: "epic" },
    { sku: "shop/seeds/s9", emoji: "🐉", title: "Dragón de Jade", desc: "Suculenta Rara", cost: { coin: 2000 }, rarity: "legendary" },
    { sku: "shop/seeds/s10", emoji: "🌸", title: "Cerezo Eterno", desc: "Legendaria", cost: { gem: 500 }, rarity: "legendary" },
    { sku: "shop/seeds/s11", emoji: "🎵", title: "Mandrágora Cantarina", desc: "Mítica", cost: { gem: 1000 }, rarity: "mythic" },
    { sku: "shop/seeds/s12", emoji: "🌍", title: "Árbol del Mundo", desc: "Divina (Pro)", cost: { gem: 2000 }, rarity: "divine" },
    // User Seeds
    { sku: "shop/seeds/u_birch", emoji: "🌳", title: "Semilla de Abedul", desc: "Árbol elegante", cost: { coin: 200 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_poppy", emoji: "🌺", title: "Semilla de Amapola", desc: "Flor vibrante", cost: { coin: 100 }, rarity: "basic" },
    { sku: "shop/seeds/u_apple", emoji: "🍎", title: "Manzano", desc: "Frutos dulces", cost: { coin: 300 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_tree_life", emoji: "🌳", title: "Árbol de la Vida", desc: "Legendario", cost: { gem: 2000 }, rarity: "divine" },
    { sku: "shop/seeds/u_bird_paradise", emoji: "🦜", title: "Ave del Paraíso", desc: "Exótica", cost: { coin: 400 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_baobab", emoji: "🌲", title: "Baobab Místico", desc: "Gigante antiguo", cost: { coin: 800 }, rarity: "epic" },
    { sku: "shop/seeds/u_bell", emoji: "🔔", title: "Flor Campana", desc: "Musical", cost: { coin: 150 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_bonsai", emoji: "🪴", title: "Bonsái Zen", desc: "Relajante", cost: { coin: 500 }, rarity: "rare" },
    { sku: "shop/seeds/u_carnivore", emoji: "🦷", title: "Planta Carnívora", desc: "Voraz", cost: { coin: 350 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_daisy", emoji: "🌼", title: "Margarita", desc: "Simple y bella", cost: { coin: 50 }, rarity: "basic" },
    { sku: "shop/seeds/u_dandelion1", emoji: "🌬️", title: "Diente de León (Fase 1)", desc: "Etéreo", cost: { coin: 80 }, rarity: "basic" },
    { sku: "shop/seeds/u_dandelion2", emoji: "🌬️", title: "Diente de León (Fase 2)", desc: "Volador", cost: { coin: 80 }, rarity: "basic" },
    { sku: "shop/seeds/u_frailejon", emoji: "🏔️", title: "Frailejón", desc: "Guardián del páramo", cost: { coin: 600 }, rarity: "rare" },
    { sku: "shop/seeds/u_hibiscus", emoji: "🌺", title: "Hibisco", desc: "Tropical", cost: { coin: 200 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_lavender", emoji: "🪻", title: "Lavanda", desc: "Aromática", cost: { coin: 150 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_lotus", emoji: "🪷", title: "Loto Sagrado", desc: "Acuático", cost: { coin: 400 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_magic_rose", emoji: "🌹", title: "Rosa Mágica", desc: "Eterna", cost: { gem: 500 }, rarity: "legendary" },
    { sku: "shop/seeds/u_mushroom", emoji: "🍄", title: "Hongo Mágico", desc: "Misterioso", cost: { coin: 120 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_orchid", emoji: "🌸", title: "Orquídea", desc: "Delicada", cost: { coin: 450 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_nettle", emoji: "🌿", title: "Ortiga", desc: "Picante", cost: { coin: 100 }, rarity: "basic" },
    { sku: "shop/seeds/u_palm", emoji: "🌴", title: "Palmera", desc: "Playera", cost: { coin: 250 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_pine", emoji: "🌲", title: "Pino", desc: "Resistente", cost: { coin: 200 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_oak", emoji: "🌳", title: "Roble", desc: "Fuerte", cost: { coin: 300 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_ancient_oak", emoji: "🌳", title: "Roble Antiguo", desc: "Sabio", cost: { gem: 1000 }, rarity: "mythic" },
    { sku: "shop/seeds/u_sakura", emoji: "🌸", title: "Sakura", desc: "Cerezo en flor", cost: { coin: 600 }, rarity: "rare" },
    { sku: "shop/seeds/u_willow", emoji: "🌳", title: "Sauce Llorón", desc: "Melancólico", cost: { coin: 350 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_sequoia", emoji: "🌲", title: "Secuoya", desc: "Gigante", cost: { coin: 900 }, rarity: "epic" },
    { sku: "shop/seeds/u_sunflower", emoji: "🌻", title: "Girasol", desc: "Radiante", cost: { coin: 150 }, rarity: "uncommon" },
  ],
  tools: [
    { sku: "shop/tools/t1", emoji: "🌧️", title: "Regadera de Nubes", desc: "Riego dura +20%", cost: { coin: 800 }, rarity: "rare" },
    { sku: "shop/tools/t2", emoji: "🤖", title: "Regadera Auto", desc: "Riego auto 1/día", cost: { coin: 2000 }, rarity: "epic" },
    { sku: "shop/tools/t3", emoji: "⛏️", title: "Pala de Mitril", desc: "+10% XP Tierra", cost: { coin: 1200 }, rarity: "rare" },
    { sku: "shop/tools/t4", emoji: "✂️", title: "Tijeras de Oro", desc: "+10% Drop extra", cost: { coin: 1500 }, rarity: "epic" },
    { sku: "shop/tools/t5", emoji: "🏺", title: "Maceta Rápida", desc: "-10% tiempo evo", cost: { gem: 100 }, rarity: "legendary" },
    { sku: "shop/tools/t6", emoji: "💡", title: "Lámpara Arcana", desc: "Crecimiento nocturno", cost: { coin: 800 }, rarity: "rare" },
    { sku: "shop/tools/t7", emoji: "🧪", title: "Fertilizante Alq.", desc: "+20% Maná cosecha", cost: { coin: 500 }, rarity: "uncommon" },
    { sku: "shop/tools/t8", emoji: "🧤", title: "Guantes Maestros", desc: "Stats detalladas", cost: { coin: 300 }, rarity: "uncommon" },
    { sku: "shop/tools/t9", emoji: "🍀", title: "Amuleto Suerte", desc: "+5% Crítico Tareas", cost: { coin: 1000 }, rarity: "epic" },
    { sku: "shop/tools/t10", emoji: "🎒", title: "Mochila Sin Fondo", desc: "+10 Espacios Inv", cost: { coin: 500 }, rarity: "rare" },
    // User Tools
    { sku: "shop/tools/u_chest", emoji: "📦", title: "Baúl Mágico", desc: "Almacenamiento extra", cost: { coin: 500 }, rarity: "rare" },
    { sku: "shop/tools/u_compass", emoji: "🧭", title: "Brújula Mística", desc: "Encuentra items", cost: { coin: 800 }, rarity: "rare" },
    { sku: "shop/tools/u_cure_plant", emoji: "🩹", title: "Kit de Curación", desc: "Sana tu planta", cost: { coin: 150 }, rarity: "uncommon" },
    { sku: "shop/tools/u_time_shield", emoji: "🛡️", title: "Escudo Temporal", desc: "Protege racha", cost: { coin: 1000 }, rarity: "epic" },
    { sku: "shop/tools/u_dwarf_axe", emoji: "🪓", title: "Hacha Enana", desc: "Herramienta robusta", cost: { coin: 600 }, rarity: "rare" },
    { sku: "shop/tools/u_spellbook", emoji: "📖", title: "Libro de Hechizos", desc: "Conocimiento arcano", cost: { coin: 1200 }, rarity: "epic" },
    { sku: "shop/tools/u_masterkey", emoji: "🗝️", title: "Llave Maestra", desc: "Abre cualquier cofre", cost: { gem: 2000 }, rarity: "divine" },
    { sku: "shop/tools/u_mystic_egg", emoji: "🥚", title: "Huevo Místico", desc: "¿Qué nacerá?", cost: { gem: 1500 }, rarity: "mythic" },
    { sku: "shop/tools/u_shovel", emoji: "🥄", title: "Pala de Jardín", desc: "Para plantar", cost: { coin: 200 }, rarity: "uncommon" },
    { sku: "shop/tools/u_scroll", emoji: "📜", title: "Pergamino Antiguo", desc: "Sabiduría olvidada", cost: { coin: 400 }, rarity: "uncommon" },
    { sku: "shop/tools/u_magic_clock", emoji: "🕰️", title: "Reloj Mágico", desc: "Controla el tiempo", cost: { coin: 900 }, rarity: "epic" },
    { sku: "shop/tools/u_ring", emoji: "💍", title: "Anillo de Poder", desc: "Boost permanente", cost: { gem: 2500 }, rarity: "divine" },
    { sku: "shop/tools/u_elf_wand", emoji: "🪄", title: "Varita Élfica", desc: "Magia natural", cost: { gem: 1800 }, rarity: "mythic" },
  ],
  cosmetics: [
    { sku: "shop/cosmetics/c1", emoji: "🏺", title: "Maceta Arcilla", desc: "Clásica", cost: { coin: 0 }, rarity: "basic" },
    { sku: "shop/cosmetics/c2", emoji: "🍶", title: "Maceta Porcelana", desc: "Estilo Oriental", cost: { coin: 200 }, rarity: "uncommon" },
    { sku: "shop/cosmetics/c3", emoji: "🛸", title: "Maceta Flotante", desc: "Futurista", cost: { coin: 500 }, rarity: "rare" },
    { sku: "shop/cosmetics/c4", emoji: "🪵", title: "Maceta Tronco", desc: "Natural", cost: { coin: 300 }, rarity: "uncommon" },
    { sku: "shop/cosmetics/c5", emoji: "📚", title: "Fondo Biblioteca", desc: "Ambiente Mágico", cost: { gem: 100 }, rarity: "legendary" },
    { sku: "shop/cosmetics/c6", emoji: "🧘", title: "Fondo Zen", desc: "Relajante", cost: { gem: 100 }, rarity: "legendary" },
    { sku: "shop/cosmetics/c7", emoji: "🌌", title: "Fondo Espacio", desc: "Cósmico", cost: { gem: 200 }, rarity: "mythic" },
    { sku: "shop/cosmetics/c8", emoji: "🎩", title: "Sombrero Mago", desc: "Accesorio Planta", cost: { gem: 50 }, rarity: "epic" },
    { sku: "shop/cosmetics/c9", emoji: "🕶️", title: "Gafas de Sol", desc: "Accesorio Planta", cost: { gem: 50 }, rarity: "epic" },
    { sku: "shop/cosmetics/c10", emoji: "🧣", title: "Bufanda", desc: "Accesorio Planta", cost: { gem: 50 }, rarity: "epic" },
    { sku: "shop/cosmetics/c11", emoji: "✨", title: "Aura Dorada", desc: "Efecto Visual", cost: { gem: 300 }, rarity: "legendary" },
    { sku: "shop/cosmetics/c12", emoji: "🧚", title: "Polvo de Hadas", desc: "Efecto Visual", cost: { gem: 300 }, rarity: "legendary" },
    // User Cosmetics
    { sku: "shop/cosmetics/u_butterfly_wing", emoji: "🦋", title: "Alas de Mariposa", desc: "Accesorio", cost: { gem: 500 }, rarity: "legendary" },
    { sku: "shop/cosmetics/u_royal_crown", emoji: "👑", title: "Corona Real", desc: "Accesorio", cost: { gem: 1000 }, rarity: "mythic" },
    { sku: "shop/cosmetics/u_gold_pot", emoji: "🏺", title: "Maceta Dorada", desc: "Skin de maceta", cost: { coin: 800 }, rarity: "epic" },
    { sku: "shop/cosmetics/u_enchanted_hat", emoji: "🎩", title: "Sombrero Encantado", desc: "Accesorio", cost: { coin: 600 }, rarity: "rare" },
    // Auras
    { sku: "shop/cosmetics/u_aura_arcane", emoji: "🔮", title: "Aura Arcana", desc: "Efecto visual", cost: { gem: 300 }, rarity: "legendary" },
    { sku: "shop/cosmetics/u_aura_rainbow", emoji: "🌈", title: "Aura Arcoíris", desc: "Efecto visual", cost: { gem: 400 }, rarity: "mythic" },
    { sku: "shop/cosmetics/u_aura_water", emoji: "💧", title: "Aura de Agua", desc: "Efecto visual", cost: { gem: 300 }, rarity: "legendary" },
    { sku: "shop/cosmetics/u_aura_fire", emoji: "🔥", title: "Aura de Fuego", desc: "Efecto visual", cost: { gem: 300 }, rarity: "legendary" },
    { sku: "shop/cosmetics/u_aura_leaves", emoji: "🍃", title: "Aura de Hojas", desc: "Efecto visual", cost: { gem: 300 }, rarity: "legendary" },
    { sku: "shop/cosmetics/u_aura_nebula", emoji: "🌌", title: "Aura Nebulosa", desc: "Efecto visual", cost: { gem: 500 }, rarity: "mythic" },
    { sku: "shop/cosmetics/u_aura_wind", emoji: "💨", title: "Aura de Viento", desc: "Efecto visual", cost: { gem: 300 }, rarity: "legendary" },
    { sku: "shop/cosmetics/u_aura_earth", emoji: "🌍", title: "Aura de Tierra", desc: "Efecto visual", cost: { gem: 300 }, rarity: "legendary" },
  ],
  pets: [
    { sku: "shop/pets/p1", emoji: "🥚", title: "Huevo de Slime", desc: "Mascota inicial", cost: { coin: 500 }, rarity: "rare" },
    { sku: "shop/pets/p2", emoji: "🐈‍⬛", title: "Gato Negro Mágico", desc: "+Suerte en eventos", cost: { coin: 1500 }, rarity: "epic" },
    { sku: "shop/pets/p3", emoji: "🦉", title: "Búho Mensajero", desc: "Trae noticias extra", cost: { coin: 2000 }, rarity: "epic" },
    { sku: "shop/pets/p4", emoji: "🐉", title: "Dragón de Bolsillo", desc: "Mascota rara", cost: { gem: 500 }, rarity: "legendary" },
    { sku: "shop/pets/p5", emoji: "👻", title: "Espíritu del Bosque", desc: "Mascota mítica", cost: { gem: 1000 }, rarity: "mythic" },
    { sku: "shop/pets/p6", emoji: "🐣", title: "Fénix Bebé", desc: "Renace racha (1/mes)", cost: { gem: 2000 }, rarity: "divine" },
    // User Pets
    { sku: "shop/pets/u_ant", emoji: "🐜", title: "Hormiga Trabajadora", desc: "Pequeña pero fuerte", cost: { coin: 100 }, rarity: "basic" },
    { sku: "shop/pets/u_arturo1", emoji: "🐻", title: "Arturo (Joven)", desc: "Oso valiente", cost: { coin: 500 }, rarity: "rare" },
    { sku: "shop/pets/u_arturo2", emoji: "🐻", title: "Arturo (Adulto)", desc: "Guardián del bosque", cost: { coin: 1500 }, rarity: "epic" },
    { sku: "shop/pets/u_slug", emoji: "🐌", title: "Babosa Veloz", desc: "No tan lenta", cost: { coin: 150 }, rarity: "uncommon" },
    { sku: "shop/pets/u_bee", emoji: "🐝", title: "Abeja Reina", desc: "Polinizadora", cost: { coin: 300 }, rarity: "uncommon" },
    { sku: "shop/pets/u_bug1", emoji: "🪲", title: "Escarabajo Joya", desc: "Brillante", cost: { coin: 400 }, rarity: "uncommon" },
    { sku: "shop/pets/u_bunny", emoji: "🐰", title: "Conejito", desc: "Saltarín", cost: { coin: 350 }, rarity: "uncommon" },
    { sku: "shop/pets/u_butterfly", emoji: "🦋", title: "Mariposa Monarca", desc: "Elegante", cost: { coin: 400 }, rarity: "uncommon" },
    { sku: "shop/pets/u_snail", emoji: "🐌", title: "Caracol Mágico", desc: "Con casa propia", cost: { coin: 200 }, rarity: "uncommon" },
    { sku: "shop/pets/u_woodlouse", emoji: "🐛", title: "Cochinilla", desc: "Blindada", cost: { coin: 150 }, rarity: "uncommon" },
    { sku: "shop/pets/u_cocoa", emoji: "🍫", title: "Cocoa", desc: "Dulce compañía", cost: { coin: 600 }, rarity: "rare" },
    { sku: "shop/pets/u_deer", emoji: "🦌", title: "Ciervo Místico", desc: "Noble", cost: { gem: 1200 }, rarity: "mythic" },
    { sku: "shop/pets/u_dragon", emoji: "🐉", title: "Dragón Rojo", desc: "Poderoso", cost: { gem: 2500 }, rarity: "divine" },
    { sku: "shop/pets/u_fly", emoji: "🪰", title: "Mosca Curiosa", desc: "Siempre observando", cost: { coin: 50 }, rarity: "basic" },
    { sku: "shop/pets/u_fox", emoji: "🦊", title: "Zorro Astuto", desc: "Inteligente", cost: { coin: 800 }, rarity: "rare" },
    { sku: "shop/pets/u_goldfish", emoji: "🐠", title: "Pez Dorado", desc: "De la suerte", cost: { coin: 300 }, rarity: "uncommon" },
    { sku: "shop/pets/u_fairy", emoji: "🧚", title: "Hada del Bosque", desc: "Mágica", cost: { gem: 1500 }, rarity: "mythic" },
    { sku: "shop/pets/u_hummingbird", emoji: "🐦", title: "Colibrí", desc: "Veloz", cost: { coin: 500 }, rarity: "rare" },
    { sku: "shop/pets/u_ladybug", emoji: "🐞", title: "Mariquita", desc: "Buena suerte", cost: { coin: 250 }, rarity: "uncommon" },
    { sku: "shop/pets/u_merlin", emoji: "🧙‍♂️", title: "Merlín", desc: "Mago legendario", cost: { gem: 3000 }, rarity: "divine" },
    { sku: "shop/pets/u_owl", emoji: "🦉", title: "Búho Sabio", desc: "Vigilante nocturno", cost: { coin: 700 }, rarity: "rare" },
    { sku: "shop/pets/u_moth", emoji: "🦋", title: "Polilla Lunar", desc: "Nocturna", cost: { coin: 450 }, rarity: "uncommon" },
    { sku: "shop/pets/u_spider", emoji: "🕷️", title: "Araña Tejedora", desc: "Arquitecta", cost: { coin: 200 }, rarity: "uncommon" },
    { sku: "shop/pets/u_squirrel", emoji: "🐿️", title: "Ardilla", desc: "Recolectora", cost: { coin: 350 }, rarity: "uncommon" },
    { sku: "shop/pets/u_tokyo", emoji: "🗼", title: "Tokyo", desc: "Viajero", cost: { coin: 1000 }, rarity: "epic" },
    { sku: "shop/pets/u_turtle", emoji: "🐢", title: "Tortuga", desc: "Longeva", cost: { coin: 400 }, rarity: "uncommon" },
    { sku: "shop/pets/u_unicorn", emoji: "🦄", title: "Unicornio", desc: "Puro", cost: { gem: 2000 }, rarity: "divine" },
    { sku: "shop/pets/u_worm", emoji: "🪱", title: "Lombriz", desc: "Ayuda a la tierra", cost: { coin: 50 }, rarity: "basic" },
  ],
};

export const ShopColors = {
  potions:   { bg: "#1b1231", border: "#7e57c2", pill: "#B542F6" },
  seeds:     { bg: "#1a2e1a", border: "#4caf50", pill: "#66bb6a" },
  tools:     { bg: "#10251c", border: "#1cd47b", pill: "#1cd47b" },
  cosmetics: { bg: "#281e00", border: "#FFD700", pill: "#FFD700" },
  pets:      { bg: "#2A1B0A", border: "#FF9800", pill: "#FF9800" },
  subs:      { bg: "#281e00", border: "#FFD700", pill: "#FFD700" },
};

export const SHOP_LOOKUP = Object.fromEntries(
  Object.entries(SHOP_CATALOG).flatMap(([category, items]) =>
    items.map((item) => [item.sku, { title: item.title, category, rarity: item.rarity }])
  )
);
