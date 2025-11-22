// [MB] Módulo: Estado / Sección: Catálogo de Tienda
// Afecta: inventario y recompensas
// Propósito: Definir catálogo por categoría, rareza y costos compuestos
// Autor: Codex - Fecha: 2025-02-14

export const CURRENCIES = { MANA: "mana", COIN: "coin", GEM: "gem" };

export const RARITY_TIERS = {
  BASIC: { id: "basic", label: "Básico", color: "#B0BEC5", border: "#CFD8DC" }, // Gray
  UNCOMMON: {
    id: "uncommon",
    label: "Poco Común",
    color: "#66BB6A",
    border: "#81C784",
  }, // Green
  RARE: { id: "rare", label: "Raro", color: "#42A5F5", border: "#64B5F6" }, // Blue
  EPIC: { id: "epic", label: "Épico", color: "#AB47BC", border: "#BA68C8" }, // Purple
  LEGENDARY: {
    id: "legendary",
    label: "Legendario",
    color: "#FFA726",
    border: "#FFB74D",
  }, // Orange
  MYTHIC: {
    id: "mythic",
    label: "Mítico",
    color: "#EF5350",
    border: "#E57373",
  }, // Red
  DIVINE: {
    id: "divine",
    label: "Divino",
    color: "#FFD700",
    border: "#FFFF00",
  }, // Gold
};

export const SHOP_CATALOG = {
  potions: [
    // Basic
    { sku: "shop/potions/p1", emoji: "🧪", title: "Poción de Sabiduría Menor", desc: "Impulsa +50% de XP durante 60 minutos de estudio.", cost: { mana: 55 }, rarity: "basic" },
    { sku: "shop/potions/p3", emoji: "⚡", title: "Relámpago de Foco", desc: "Reduce 15% la duración de la próxima tanda productiva.", cost: { mana: 45 }, rarity: "basic" },
    { sku: "shop/potions/p6", emoji: "💧", title: "Gota de Lluvia Eterna", desc: "Riega y limpia la maceta al instante.", cost: { mana: 40 }, rarity: "basic" },
    { sku: "shop/potions/p7", emoji: "🌈", title: "Aurora Embotellada", desc: "Maximiza la felicidad y el brillo de la planta durante 1 hora.", cost: { mana: 45 }, rarity: "basic" },
    { sku: "shop/potions/p11", emoji: "🔥", title: "Esencia Ígnea", desc: "Activa afinidad de fuego durante un ritual de cultivo.", cost: { mana: 25 }, rarity: "basic" },
    { sku: "shop/potions/p12", emoji: "🌊", title: "Esencia de Mareas", desc: "Sintoniza el flujo de agua para riegos críticos.", cost: { mana: 25 }, rarity: "basic" },
    { sku: "shop/potions/p13", emoji: "⛰️", title: "Esencia Terraria", desc: "Refuerza la defensa de tierra en tareas pesadas.", cost: { mana: 25 }, rarity: "basic" },
    { sku: "shop/potions/p14", emoji: "💨", title: "Esencia de Cierzo", desc: "Agiliza rachas rápidas durante 2 horas.", cost: { mana: 25 }, rarity: "basic" },
    { sku: "shop/potions/p16", emoji: "🌿", title: "Eco-sérum Restaurador", desc: "Recupera 80% de salud y elimina parásitos ambientales.", cost: { mana: 65 }, rarity: "basic" },
    { sku: "shop/potions/p17", emoji: "🧘", title: "Mist Calmante", desc: "Disipa estrés ambiental por 12 horas.", cost: { mana: 60 }, rarity: "basic" },
    { sku: "shop/potions/u_green_potion", emoji: "🍃", title: "Infusión Herbal", desc: "Regenera la maceta lentamente tras maratones productivos.", cost: { mana: 45 }, rarity: "basic" },
    { sku: "shop/potions/u_mana_crystal", emoji: "🔷", title: "Fragmento Resonante", desc: "Condensa 50 puntos de maná puro para emergencias.", cost: { mana: 50 }, rarity: "basic" },
    { sku: "shop/potions/p4", emoji: "🔹", title: "Cristal de Maná Compacto", desc: "Libera 50 unidades de maná instantáneo.", cost: { mana: 55 }, rarity: "basic" },
    // Uncommon
    { sku: "shop/potions/p2", emoji: "🔮", title: "Poción de Sabiduría Mayor", desc: "Duplica la XP de rituales y tareas largas por 2 horas.", cost: { mana: 90, coin: 130 }, rarity: "uncommon" },
    { sku: "shop/potions/p5", emoji: "💠", title: "Prisma Catalizador", desc: "Recupera 150 de maná y purifica el suelo.", cost: { mana: 95, coin: 150 }, rarity: "uncommon" },
    { sku: "shop/potions/p9", emoji: "🕳️", title: "Borrador Arcano", desc: "Anula la penalización de una tarea fallida por día.", cost: { mana: 85, coin: 160 }, rarity: "uncommon" },
    { sku: "shop/potions/p10", emoji: "⚙️", title: "Elixir de Energía", desc: "Entrega tres tareas sin cooldown y +10% de energía.", cost: { mana: 100, coin: 170 }, rarity: "uncommon" },
    { sku: "shop/potions/u_magic_crystal", emoji: "📐", title: "Cristal Mágico", desc: "Multiplica los drops elementales durante 6 horas.", cost: { mana: 95, coin: 165 }, rarity: "uncommon" },
    { sku: "shop/potions/u_energy_elixir", emoji: "🔋", title: "Ampolla Dynamo", desc: "Recarga energía mental y elimina la fatiga.", cost: { mana: 105, coin: 175 }, rarity: "uncommon" },
    { sku: "shop/potions/u_purple_potion", emoji: "🪄", title: "Poción Nebulosa", desc: "Otorga un efecto aleatorio de rareza media por 30 minutos.", cost: { mana: 90, coin: 150 }, rarity: "uncommon" },
    { sku: "shop/potions/u_focus_lightning", emoji: "🌩️", title: "Rayo Sináptico", desc: "Completa una tarea corta al instante con bonificación.", cost: { mana: 110, coin: 185 }, rarity: "uncommon" },
    // Rare
    { sku: "shop/potions/p8", emoji: "🛡️", title: "Escudo de Racha 24h", desc: "Protege una caída completa de racha durante 24 horas.", cost: { coin: 340 }, rarity: "rare" },
    { sku: "shop/potions/p15", emoji: "⚖️", title: "Transmutador Áureo", desc: "Convierte 500 de maná acumulado en 50 monedas.", cost: { coin: 360 }, rarity: "rare" },
    { sku: "shop/potions/p18", emoji: "✨", title: "Ímpetu Arcano", desc: "Duplica la XP de la próxima misión diaria completada.", cost: { coin: 380 }, rarity: "rare" },
    { sku: "shop/potions/u_wisdom_potion", emoji: "🌓", title: "Tónica Visionaria", desc: "Triplica la XP de las siguientes tres tareas terminadas.", cost: { coin: 360 }, rarity: "rare" },
    { sku: "shop/potions/u_time_potion", emoji: "⏳", title: "Ampolla Temporal", desc: "Congela el desgaste de la planta y la maceta por 2 horas.", cost: { coin: 400 }, rarity: "rare" },
    // Epic
    { sku: "shop/potions/p19", emoji: "🧬", title: "Tónico de Prosperidad", desc: "Aumenta los drops de recursos en 25% durante 24 horas.", cost: { coin: 420, gem: 60 }, rarity: "epic" },
    { sku: "shop/potions/p20", emoji: "🌌", title: "Esencia Temporal", desc: "Reduce a la mitad los cooldowns globales por 12 horas.", cost: { coin: 450, gem: 70 }, rarity: "epic" },
    // Legendary
    { sku: "shop/potions/p22", emoji: "🪶", title: "Fénix Embotellado", desc: "Reinicia rachas perdidas y otorga +50% XP por 72 horas.", cost: { gem: 620 }, rarity: "legendary" },
    // Mythic
    { sku: "shop/potions/p21", emoji: "🌫️", title: "Neblina de Atemporalidad", desc: "Suspende el desgaste y duplica la XP durante 24 horas.", cost: { mana: 150, coin: 380, gem: 95 }, rarity: "mythic" },
    // Divine
    { sku: "shop/potions/p23", emoji: "🪽", title: "Sello del Alba", desc: "Bloquea todo desgaste por 7 días y activa un aura divina.", cost: { gem: 1600 }, rarity: "divine" },
  ],  seeds: [
    // Basic
    { sku: "shop/seeds/u_amapola", emoji: "🌺", title: "Amapola Carmesí", desc: "Flor base para camas vibrantes.", cost: { mana: 60 }, rarity: "basic" },
    { sku: "shop/seeds/u_daisy", emoji: "🌼", title: "Margarita del Alba", desc: "Ilumina el jardín al amanecer.", cost: { mana: 65 }, rarity: "basic" },
    { sku: "shop/seeds/u_ortiga", emoji: "🌿", title: "Ortiga Guardiana", desc: "Levanta barreras naturales.", cost: { mana: 55 }, rarity: "basic" },
    { sku: "shop/seeds/u_palm", emoji: "🌴", title: "Palmera de Brisa", desc: "Aporta control climático.", cost: { mana: 70 }, rarity: "basic" },
    { sku: "shop/seeds/u_dandelion1", emoji: "🌼", title: "Diente de León Joven", desc: "Esparce semillas rápidas.", cost: { mana: 50 }, rarity: "basic" },
    // Uncommon
    { sku: "shop/seeds/u_abedul", emoji: "🌳", title: "Abedul Áureo", desc: "Refresca la humedad y XP diaria.", cost: { mana: 85, coin: 120 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_hibiscus", emoji: "🌺", title: "Hibisco Solar", desc: "Aumenta radiación diaria.", cost: { mana: 90, coin: 130 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_lavanda", emoji: "🪻", title: "Lavanda Nebulosa", desc: "Reduce estrés ambiental.", cost: { mana: 95, coin: 140 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_bell", emoji: "🔔", title: "Campanilla Arcoíris", desc: "Convoca colibríes energéticos.", cost: { mana: 90, coin: 135 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_pine", emoji: "🌲", title: "Pino Brumoso", desc: "Agrega almacenamiento de maná.", cost: { mana: 100, coin: 150 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_sauce", emoji: "🌳", title: "Sauce Llorón", desc: "Controla lluvias ligeras.", cost: { mana: 95, coin: 145 }, rarity: "uncommon" },
    { sku: "shop/seeds/u_apple", emoji: "🍎", title: "Manzano Lunar", desc: "Genera frutos de energía.", cost: { mana: 105, coin: 165 }, rarity: "uncommon" },
    // Rare
    { sku: "shop/seeds/u_frailejon", emoji: "🏔️", title: "Frailejón Andino", desc: "Protege climas fríos.", cost: { coin: 420 }, rarity: "rare" },
    { sku: "shop/seeds/u_baobab", emoji: "🌳", title: "Baobab Místico", desc: "Multiplica drops de tierra.", cost: { coin: 450 }, rarity: "rare" },
    { sku: "shop/seeds/u_orchid", emoji: "🌸", title: "Orquídea Glacial", desc: "Habilita rituales de viento.", cost: { coin: 460 }, rarity: "rare" },
    { sku: "shop/seeds/u_roble", emoji: "🌳", title: "Roble Centinela", desc: "Aumenta la defensa de macetas.", cost: { coin: 480 }, rarity: "rare" },
    { sku: "shop/seeds/s1", emoji: "🌸", title: "Semilla Loto Cristal", desc: "Produce gotas de maná puras.", cost: { coin: 520 }, rarity: "rare" },
    // Epic
    { sku: "shop/seeds/u_bonsai", emoji: "🌳", title: "Bonsái Roble Ancestral", desc: "Eleva el límite de XP.", cost: { coin: 600, gem: 45 }, rarity: "epic" },
    { sku: "shop/seeds/u_carnivora", emoji: "🪴", title: "Planta Carnívora", desc: "Convierte insectos en XP.", cost: { coin: 620, gem: 50 }, rarity: "epic" },
    { sku: "shop/seeds/u_mushroom", emoji: "🍄", title: "Hongo Luminiscente", desc: "Produce compuestos nocturnos.", cost: { coin: 640, gem: 55 }, rarity: "epic" },
    { sku: "shop/seeds/u_sunflower", emoji: "🌻", title: "Girasol Radiante", desc: "Aumenta producción diurna.", cost: { coin: 660, gem: 60 }, rarity: "epic" },
    { sku: "shop/seeds/u_paraiso", emoji: "🏵️", title: "Ave del Paraíso", desc: "Canaliza energía elemental.", cost: { coin: 680, gem: 65 }, rarity: "epic" },
    // Legendary
    { sku: "shop/seeds/s10", emoji: "🌸", title: "Cerezo Eterno", desc: "Floración infinita.", cost: { gem: 420 }, rarity: "legendary" },
    { sku: "shop/seeds/u_magic_rose", emoji: "🌹", title: "Rosa Mágica", desc: "Produce perfumes únicos.", cost: { gem: 400 }, rarity: "legendary" },
    { sku: "shop/seeds/u_robleantiguo", emoji: "🌳", title: "Roble Antiguo", desc: "Regenera recursos estacionales.", cost: { gem: 440 }, rarity: "legendary" },
    // Mythic
    { sku: "shop/seeds/s11", emoji: "🎵", title: "Mandrágora Cantarina", desc: "(Pendiente asset) desbloquea misiones musicales.", cost: { mana: 130, coin: 350, gem: 70 }, rarity: "mythic" },
    { sku: "shop/seeds/u_secuoya", emoji: "🌲", title: "Secuoya Primordial", desc: "Amplía el límite de niveles.", cost: { mana: 140, coin: 380, gem: 80 }, rarity: "mythic" },
    { sku: "shop/seeds/u_dandelion2", emoji: "🌼", title: "Diente de León Gigante", desc: "Distribuye XP por el mapa.", cost: { mana: 135, coin: 360, gem: 75 }, rarity: "mythic" },
    // Divine
    { sku: "shop/seeds/s12", emoji: "🌍", title: "Árbol del Mundo", desc: "(Pendiente asset) multiplica recompensas semanales.", cost: { gem: 1200 }, rarity: "divine" },
    { sku: "shop/seeds/u_tree_life", emoji: "🌳", title: "Árbol de la Vida", desc: "Mantiene la humedad perfecta.", cost: { gem: 1400 }, rarity: "divine" },
    { sku: "shop/seeds/u_cactus_luna", emoji: "🌵", title: "Cactus Lunar", desc: "(Pendiente asset) planta nocturna misteriosa.", cost: { gem: 1500 }, rarity: "divine" },
    { sku: "shop/seeds/p6", emoji: "🐣", title: "Semilla Fénix Bebé", desc: "(Pendiente asset) regenera la maceta cada mes.", cost: { gem: 1600 }, rarity: "divine" },
  ],
  tools: [
    // Basic
    { sku: "shop/tools/u_shovel", emoji: "🧹", title: "Pala Ligera", desc: "Herramienta básica para cultivar.", cost: { mana: 70 }, rarity: "basic" },
    { sku: "shop/tools/u_cure_plant", emoji: "🩹", title: "Kit de Curación", desc: "Sana plantas enfermas.", cost: { mana: 80 }, rarity: "basic" },
    // Uncommon
    { sku: "shop/tools/t7", emoji: "🧪", title: "Fertilizante Alquímico", desc: "+20% maná en cosecha.", cost: { mana: 90, coin: 160 }, rarity: "uncommon" },
    { sku: "shop/tools/t8", emoji: "🧤", title: "Guantes Maestros", desc: "Muestra stats detalladas.", cost: { mana: 100, coin: 150 }, rarity: "uncommon" },
    { sku: "shop/tools/u_bellows", emoji: "🪣", title: "Regadera Compacta", desc: "Reduce costos de riego.", cost: { mana: 95, coin: 140 }, rarity: "uncommon" },
    // Rare
    { sku: "shop/tools/t1", emoji: "🌧️", title: "Regadera de Nubes", desc: "Riego dura +20%.", cost: { coin: 800 }, rarity: "rare" },
      { sku: "shop/tools/t3", emoji: "⛏️", title: "Pala de Mitril", desc: "+10% XP Tierra.", cost: { coin: 1200 }, rarity: "rare" },
      { sku: "shop/tools/t6", emoji: "💡", title: "Lámpara Arcana", desc: "Crecimiento nocturno.", cost: { coin: 850 }, rarity: "rare" },
      { sku: "shop/tools/t10", emoji: "🎒", title: "Mochila Sin Fondo", desc: "+10 espacios de inventario.", cost: { coin: 700 }, rarity: "rare" },
      { sku: "shop/tools/u_chest", emoji: "📦", title: "Baúl de Expedición", desc: "Almacenamiento extra.", cost: { coin: 650 }, rarity: "rare" },
      { sku: "shop/tools/u_compass", emoji: "🧭", title: "Brújula Mística", desc: "Encuentra ítems ocultos.", cost: { coin: 900 }, rarity: "rare" },
      { sku: "shop/tools/u_dwarf_axe", emoji: "🪓", title: "Hacha Enana", desc: "Corta troncos duros.", cost: { coin: 800 }, rarity: "rare" },
      { sku: "shop/tools/u_quill", emoji: "🪶", title: "Pluma Rúnica", desc: "Firma rituales y contratos al instante.", cost: { coin: 950 }, rarity: "rare" },
      { sku: "shop/tools/u_ancestral_shovel", emoji: "⚒️", title: "Pala Ancestral", desc: "Desbloquea excavaciones legendarias.", cost: { coin: 1250 }, rarity: "rare" },
      // Epic
      { sku: "shop/tools/t2", emoji: "🤖", title: "Regadera Auto", desc: "Riego automático 1/día.", cost: { coin: 1600, gem: 40 }, rarity: "epic" },
      { sku: "shop/tools/t4", emoji: "✂️", title: "Tijeras de Oro", desc: "+10% drop extra.", cost: { coin: 1500, gem: 35 }, rarity: "epic" },
      { sku: "shop/tools/t9", emoji: "🍀", title: "Amuleto Suerte", desc: "+5% crítico en tareas.", cost: { coin: 1400, gem: 30 }, rarity: "epic" },
      { sku: "shop/tools/u_spellbook", emoji: "📖", title: "Libro de Hechizos", desc: "Acceso a recetas raras.", cost: { coin: 1700, gem: 45 }, rarity: "epic" },
      { sku: "shop/tools/u_scroll", emoji: "📜", title: "Pergamino Antiguo", desc: "Sabiduría olvidada.", cost: { coin: 1200, gem: 30 }, rarity: "epic" },
      { sku: "shop/tools/u_magic_clock", emoji: "🕰️", title: "Reloj Mágico", desc: "Controla el tiempo." , cost: { coin: 1300, gem: 40 }, rarity: "epic" },
      { sku: "shop/tools/u_lunar_scepter", emoji: "🌙", title: "Cetro Lunar", desc: "Sincroniza ciclos nocturnos y XP.", cost: { coin: 1800, gem: 55 }, rarity: "epic" },
      { sku: "shop/tools/u_solar_scepter", emoji: "☀️", title: "Cetro Solar", desc: "Amplifica la productividad diurna.", cost: { coin: 1750, gem: 55 }, rarity: "epic" },
      { sku: "shop/tools/u_truth_orb", emoji: "🔮", title: "Orbe de la Verdad", desc: "Revela recursos escondidos.", cost: { coin: 1600, gem: 50 }, rarity: "epic" },
      // Legendary
      { sku: "shop/tools/t5", emoji: "🏺", title: "Maceta Rápida", desc: "-10% tiempo de evolución.", cost: { gem: 120 }, rarity: "legendary" },
      { sku: "shop/tools/u_time_shield", emoji: "🛡️", title: "Escudo Temporal", desc: "Protege la racha.", cost: { gem: 150 }, rarity: "legendary" },
      { sku: "shop/tools/u_rope", emoji: "🧵", title: "Cuerda Arcana", desc: "Amplía alcance de herramientas.", cost: { gem: 130 }, rarity: "legendary" },
      { sku: "shop/tools/u_sarcophagus", emoji: "⚱️", title: "Sarcófago Rúnico", desc: "Guarda buffs sin que expiren.", cost: { gem: 260 }, rarity: "legendary" },
      // Mythic
      { sku: "shop/tools/t11", emoji: "🥚", title: "Huevo Místico", desc: "Herramienta sorpresa.", cost: { mana: 150, coin: 360, gem: 70 }, rarity: "mythic" },
      { sku: "shop/tools/u_elf_wand", emoji: "🪄", title: "Varita Élfica", desc: "Magia natural.", cost: { mana: 140, coin: 380, gem: 80 }, rarity: "mythic" },
      { sku: "shop/tools/u_chrono_plume", emoji: "⌛", title: "Péndulo Astral", desc: "Congela el desgaste global 6h.", cost: { mana: 170, coin: 400, gem: 95 }, rarity: "mythic" },
      // Divine
      { sku: "shop/tools/u_masterkey", emoji: "🗝️", title: "Llave Maestra", desc: "Abre cualquier cofre.", cost: { gem: 2000 }, rarity: "divine" },
      { sku: "shop/tools/u_ring", emoji: "💍", title: "Anillo de Poder", desc: "Boost permanente.", cost: { gem: 2500 }, rarity: "divine" },
  ],
  cosmetics: [
    // Basic
    { sku: "shop/cosmetics/c1", emoji: "🏺", title: "Maceta Arcilla", desc: "Clásica de inicio.", cost: { mana: 60 }, rarity: "basic" },
    { sku: "shop/cosmetics/u_basic_hat", emoji: "🎩", title: "Sombrero Simple", desc: "Accesorio de arranque.", cost: { mana: 70 }, rarity: "basic" },
    // Uncommon
    { sku: "shop/cosmetics/c2", emoji: "🍶", title: "Maceta Porcelana", desc: "Estilo oriental.", cost: { mana: 85, coin: 150 }, rarity: "uncommon" },
    { sku: "shop/cosmetics/c4", emoji: "🪵", title: "Maceta Tronco", desc: "Diseño natural.", cost: { mana: 90, coin: 160 }, rarity: "uncommon" },
    { sku: "shop/cosmetics/u_enchanted_hat", emoji: "🎩", title: "Sombrero Encantado", desc: "Accesorio animado.", cost: { mana: 95, coin: 180 }, rarity: "uncommon" },
    { sku: "shop/cosmetics/u_basic_glasses", emoji: "🕶️", title: "Gafas Simples", desc: "Accesorio casual.", cost: { mana: 100, coin: 170 }, rarity: "uncommon" },
    // Rare
    { sku: "shop/cosmetics/c3", emoji: "🛸", title: "Maceta Flotante", desc: "Futurista.", cost: { coin: 500 }, rarity: "rare" },
    { sku: "shop/cosmetics/u_gold_pot", emoji: "🏺", title: "Maceta Dorada", desc: "Skin brillante.", cost: { coin: 600 }, rarity: "rare" },
    { sku: "shop/cosmetics/c9", emoji: "🕶️", title: "Gafas Clásicas", desc: "Accesorio vintage.", cost: { coin: 550 }, rarity: "rare" },
    // Epic
    { sku: "shop/cosmetics/c8", emoji: "🎩", title: "Sombrero de Mago", desc: "Accesorio único.", cost: { coin: 600, gem: 25 }, rarity: "epic" },
    { sku: "shop/cosmetics/c10", emoji: "🧣", title: "Bufanda Destello", desc: "Accesorio cálido.", cost: { coin: 620, gem: 30 }, rarity: "epic" },
    { sku: "shop/cosmetics/u_aura_arcane", emoji: "🔮", title: "Aura Arcana", desc: "Efecto visual arcano.", cost: { coin: 650, gem: 35 }, rarity: "epic" },
    { sku: "shop/cosmetics/u_aura_water", emoji: "💧", title: "Aura de Agua", desc: "Bruma elegante.", cost: { coin: 660, gem: 35 }, rarity: "epic" },
    { sku: "shop/cosmetics/u_aura_fire", emoji: "🔥", title: "Aura de Fuego", desc: "Chispas místicas.", cost: { coin: 670, gem: 35 }, rarity: "epic" },
    { sku: "shop/cosmetics/u_aura_wind", emoji: "💨", title: "Aura de Viento", desc: "Efecto visual aéreo.", cost: { coin: 680, gem: 35 }, rarity: "epic" },
    // Legendary
    { sku: "shop/cosmetics/c5", emoji: "📚", title: "Fondo Biblioteca", desc: "Ambiente místico.", cost: { gem: 120 }, rarity: "legendary" },
    { sku: "shop/cosmetics/c6", emoji: "🧘", title: "Fondo Zen", desc: "Relajante.", cost: { gem: 140 }, rarity: "legendary" },
    { sku: "shop/cosmetics/u_aura_leaves", emoji: "🍃", title: "Aura de Hojas", desc: "Efecto visual.", cost: { gem: 160 }, rarity: "legendary" },
    { sku: "shop/cosmetics/u_aura_earth", emoji: "🌍", title: "Aura de Tierra", desc: "Efecto visual.", cost: { gem: 160 }, rarity: "legendary" },
    { sku: "shop/cosmetics/u_aura_golden", emoji: "✨", title: "Aura Dorada", desc: "Brillo permanente.", cost: { gem: 200 }, rarity: "legendary" },
    // Mythic
    { sku: "shop/cosmetics/c7", emoji: "🌌", title: "Fondo Espacio", desc: "Ambiente cósmico.", cost: { mana: 130, coin: 350, gem: 70 }, rarity: "mythic" },
    { sku: "shop/cosmetics/u_aura_nebula", emoji: "🌌", title: "Aura Nebulosa", desc: "Efecto inmersivo.", cost: { mana: 140, coin: 380, gem: 80 }, rarity: "mythic" },
    { sku: "shop/cosmetics/u_aura_rainbow", emoji: "🌈", title: "Aura Arcoíris", desc: "Efecto mixto.", cost: { mana: 150, coin: 400, gem: 90 }, rarity: "mythic" },
    { sku: "shop/cosmetics/u_royal_crown", emoji: "👑", title: "Corona Real", desc: "Accesorio prestigio.", cost: { mana: 160, coin: 420, gem: 100 }, rarity: "mythic" },
    // Divine
    { sku: "shop/cosmetics/u_butterfly_wing", emoji: "🦋", title: "Alas de Mariposa", desc: "Skin legendaria.", cost: { gem: 500 }, rarity: "divine" },
  ],
  pets: [
    // Basic
    { sku: "shop/pets/u_ant", emoji: "🐜", title: "Hormiga Trabajadora", desc: "Optimiza cosechas ligeras.", cost: { coin: 100 }, rarity: "basic", lifespan: { unit: "years", value: 1 } },
    { sku: "shop/pets/u_fly", emoji: "🪰", title: "Mosca Curiosa", desc: "Detecta plagas a tiempo.", cost: { coin: 50 }, rarity: "basic", lifespan: { unit: "days", value: 3 } },
    { sku: "shop/pets/u_worm", emoji: "🪱", title: "Lombriz Fertilizante", desc: "Revitaliza el suelo.", cost: { coin: 50 }, rarity: "basic", lifespan: { unit: "months", value: 5 } },
    // Uncommon
    { sku: "shop/pets/u_slug", emoji: "🐌", title: "Babosa Veloz", desc: "Reduce cooldowns de riego.", cost: { coin: 150 }, rarity: "uncommon", lifespan: { unit: "months", value: 18 } },
    { sku: "shop/pets/u_bee", emoji: "🐝", title: "Abeja Reina", desc: "Duplica polen diario.", cost: { coin: 300 }, rarity: "uncommon", lifespan: { unit: "weeks", value: 6 } },
    { sku: "shop/pets/u_bug1", emoji: "🪲", title: "Escarabajo Joya", desc: "Convierte residuos en XP.", cost: { coin: 400 }, rarity: "uncommon", lifespan: { unit: "months", value: 8 } },
    { sku: "shop/pets/u_bunny", emoji: "🐰", title: "Conejito Vibrante", desc: "Eleva felicidad diaria.", cost: { coin: 350 }, rarity: "uncommon", lifespan: { unit: "years", value: 8 } },
    { sku: "shop/pets/u_butterfly", emoji: "🦋", title: "Mariposa Monarca", desc: "Extiende rachas activas.", cost: { coin: 400 }, rarity: "uncommon", lifespan: { unit: "weeks", value: 4 } },
    { sku: "shop/pets/u_snail", emoji: "🐌", title: "Caracol Mágico", desc: "Conserva humedad.", cost: { coin: 200 }, rarity: "uncommon", lifespan: { unit: "years", value: 3 } },
    { sku: "shop/pets/u_woodlouse", emoji: "🐛", title: "Cochinilla Blindada", desc: "Absorbe daño elemental.", cost: { coin: 150 }, rarity: "uncommon", lifespan: { unit: "months", value: 12 } },
    { sku: "shop/pets/u_goldfish", emoji: "🐠", title: "Pez Dorado", desc: "Da suerte en drops.", cost: { coin: 300 }, rarity: "uncommon", lifespan: { unit: "years", value: 10 } },
    { sku: "shop/pets/u_oruga", emoji: "🐛", title: "Oruga Aurora", desc: "Devora plagas y deja compost premium.", cost: { coin: 320 }, rarity: "uncommon", lifespan: { unit: "months", value: 10 } },
    { sku: "shop/pets/u_ladybug", emoji: "🐞", title: "Mariquita Guardiana", desc: "Previene plagas leves.", cost: { coin: 250 }, rarity: "uncommon", lifespan: { unit: "months", value: 10 } },
    { sku: "shop/pets/u_moth", emoji: "🦋", title: "Polilla Lunar", desc: "Aumenta XP nocturna.", cost: { coin: 450 }, rarity: "uncommon", lifespan: { unit: "weeks", value: 5 } },
    { sku: "shop/pets/u_spider", emoji: "🕷️", title: "Araña Tejedora", desc: "Genera fibras raras.", cost: { coin: 200 }, rarity: "uncommon", lifespan: { unit: "years", value: 2 } },
    { sku: "shop/pets/u_squirrel", emoji: "🐿️", title: "Ardilla Recolectora", desc: "Guarda recursos extra.", cost: { coin: 350 }, rarity: "uncommon", lifespan: { unit: "years", value: 6 } },
    { sku: "shop/pets/u_turtle", emoji: "🐢", title: "Tortuga Raíz", desc: "Protege macetas.", cost: { coin: 400 }, rarity: "uncommon", lifespan: { unit: "years", value: 50 } },
    // Rare
    { sku: "shop/pets/u_arturo1", emoji: "🐻", title: "Arturo (Joven)", desc: "Oso valiente.", cost: { coin: 500 }, rarity: "rare", lifespan: { unit: "special" } },
    { sku: "shop/pets/u_cocoa", emoji: "🍫", title: "Cocoa", desc: "Compañera dulce.", cost: { coin: 600 }, rarity: "rare", lifespan: { unit: "special" } },
    { sku: "shop/pets/u_fox", emoji: "🦊", title: "Zorro Astuto", desc: "Otorga misiones raras.", cost: { coin: 800 }, rarity: "rare", lifespan: { unit: "years", value: 5 } },
    { sku: "shop/pets/u_hummingbird", emoji: "🐦", title: "Colibrí Prisma", desc: "Acelera rituales.", cost: { coin: 500 }, rarity: "rare", lifespan: { unit: "years", value: 5 } },
    { sku: "shop/pets/u_owl", emoji: "🦉", title: "Búho Sabio", desc: "Revela estadísticas.", cost: { coin: 700 }, rarity: "rare", lifespan: { unit: "years", value: 12 } },
    { sku: "shop/pets/p1", emoji: "🥚", title: "Huevo de Slime", desc: "Mascota inicial.", cost: { coin: 500 }, rarity: "rare", lifespan: { unit: "months", value: 1 } },
    // Epic
    { sku: "shop/pets/u_arturo2", emoji: "🐻", title: "Arturo (Adulto)", desc: "Guardián del bosque.", cost: { coin: 1500 }, rarity: "epic", lifespan: { unit: "special" } },
    { sku: "shop/pets/u_tokyo", emoji: "🗼", title: "Tokyo", desc: "Viajero dimensional.", cost: { coin: 1000 }, rarity: "epic", lifespan: { unit: "special" } },
    { sku: "shop/pets/p3", emoji: "🦉", title: "Búho Mensajero", desc: "Envía noticias extra.", cost: { coin: 2000 }, rarity: "epic", lifespan: { unit: "years", value: 12 } },
    // Legendary
    { sku: "shop/pets/p4", emoji: "🐉", title: "Dragón de Bolsillo", desc: "Mascota rara.", cost: { gem: 500 }, rarity: "legendary", lifespan: { unit: "years", value: 100 } },
    { sku: "shop/pets/u_orca", emoji: "🐋", title: "Orca Mística", desc: "Mantiene mareas energéticas estables.", cost: { gem: 900 }, rarity: "legendary", lifespan: { unit: "years", value: 80 } },
    { sku: "shop/pets/u_pulpo", emoji: "🐙", title: "Pulpo Astral", desc: "Optimiza rompecabezas y rituales acuáticos.", cost: { gem: 850 }, rarity: "legendary", lifespan: { unit: "years", value: 60 } },
    // Mythic
    { sku: "shop/pets/u_deer", emoji: "🦌", title: "Ciervo Místico", desc: "Canaliza manantiales.", cost: { gem: 1200 }, rarity: "mythic", lifespan: { unit: "years", value: 20 } },
    { sku: "shop/pets/u_jaguar", emoji: "🐆", title: "Jaguar Nebular", desc: "Otorga emboscadas críticas y ferocidad.", cost: { gem: 1500 }, rarity: "mythic", lifespan: { unit: "years", value: 25 } },
    { sku: "shop/pets/u_whale", emoji: "🐳", title: "Ballena Jorobada", desc: "Genera mareas de XP y calma planetaria.", cost: { gem: 1600 }, rarity: "mythic", lifespan: { unit: "years", value: 120 } },
    { sku: "shop/pets/u_fairy", emoji: "🧚", title: "Hada del Bosque", desc: "Mágica.", cost: { gem: 1500 }, rarity: "mythic", lifespan: { unit: "immortal" } },
    { sku: "shop/pets/p5", emoji: "👻", title: "Espíritu del Bosque", desc: "Mascota mítica.", cost: { gem: 1000 }, rarity: "mythic", lifespan: { unit: "immortal" } },
    // Divine
    { sku: "shop/pets/u_dragon", emoji: "🐉", title: "Dragón Rojo", desc: "Poderoso.", cost: { gem: 2500 }, rarity: "divine", lifespan: { unit: "years", value: 200 } },
    { sku: "shop/pets/u_merlin", emoji: "🧙‍♂️", title: "Merlín", desc: "Mago legendario.", cost: { gem: 3000 }, rarity: "divine", lifespan: { unit: "special" } },
    { sku: "shop/pets/u_unicorn", emoji: "🦄", title: "Unicornio", desc: "Puro.", cost: { gem: 2000 }, rarity: "divine", lifespan: { unit: "years", value: 150 } },
    { sku: "shop/pets/p6", emoji: "🐣", title: "Fénix Bebé", desc: "Renace racha (1/mes).", cost: { gem: 2000 }, rarity: "divine", lifespan: { unit: "years", value: 40 } },
  ],
};

export const ShopColors = {
  potions: { bg: "#1b1231", border: "#7e57c2", pill: "#B542F6" },
  seeds: { bg: "#1a2e1a", border: "#4caf50", pill: "#66bb6a" },
  tools: { bg: "#111f2f", border: "#4fbcd0", pill: "#4fbcd0" },
  cosmetics: { bg: "#281e00", border: "#FFD700", pill: "#FFD700" },
  pets: { bg: "#2A1B0A", border: "#FF9800", pill: "#FF9800" },
  subs: { bg: "#281e00", border: "#FFD700", pill: "#FFD700" },
};

export const SHOP_ITEM_TRAITS = {
  potions: {
    "shop/potions/p1": { shelfLifeHours: 24, doses: 2 },
    "shop/potions/p2": { shelfLifeHours: 36, doses: 3 },
    "shop/potions/p3": { shelfLifeHours: 18, doses: 3 },
    "shop/potions/p4": { shelfLifeHours: 48, doses: 1 },
    "shop/potions/p5": { shelfLifeHours: 48, doses: 2 },
    "shop/potions/p6": { shelfLifeHours: 12, doses: 2 },
    "shop/potions/p7": { shelfLifeHours: 24, doses: 2 },
    "shop/potions/p8": { shelfLifeHours: 72, doses: 1 },
    "shop/potions/p9": { shelfLifeHours: 24, doses: 1 },
    "shop/potions/p10": { shelfLifeHours: 30, doses: 2 },
    "shop/potions/p11": { shelfLifeHours: 8, doses: 1 },
    "shop/potions/p12": { shelfLifeHours: 8, doses: 1 },
    "shop/potions/p13": { shelfLifeHours: 8, doses: 1 },
    "shop/potions/p14": { shelfLifeHours: 8, doses: 1 },
    "shop/potions/p15": { shelfLifeHours: 96, doses: 1 },
    "shop/potions/p16": { shelfLifeHours: 36, doses: 1 },
    "shop/potions/p17": { shelfLifeHours: 30, doses: 2 },
    "shop/potions/p18": { shelfLifeHours: 48, doses: 1 },
    "shop/potions/p19": { shelfLifeHours: 72, doses: 2 },
    "shop/potions/p20": { shelfLifeHours: 60, doses: 2 },
    "shop/potions/p21": { shelfLifeHours: 96, doses: 1 },
    "shop/potions/p22": { shelfLifeHours: 120, doses: 1 },
    "shop/potions/p23": { shelfLifeHours: 168, doses: 1 },
    "shop/potions/u_green_potion": { shelfLifeHours: 24, doses: 2 },
    "shop/potions/u_mana_crystal": { shelfLifeHours: 72, doses: 1 },
    "shop/potions/u_magic_crystal": { shelfLifeHours: 48, doses: 2 },
    "shop/potions/u_energy_elixir": { shelfLifeHours: 30, doses: 2 },
    "shop/potions/u_purple_potion": { shelfLifeHours: 24, doses: 1 },
    "shop/potions/u_focus_lightning": { shelfLifeHours: 12, doses: 1 },
    "shop/potions/u_wisdom_potion": { shelfLifeHours: 48, doses: 2 },
    "shop/potions/u_time_potion": { shelfLifeHours: 12, doses: 1 },
  },
  seeds: {
    "shop/seeds/u_amapola": { grid: "1x1", bundleCount: 3 },
    "shop/seeds/u_daisy": { grid: "1x1", bundleCount: 3 },
    "shop/seeds/u_ortiga": { grid: "1x1", bundleCount: 3 },
    "shop/seeds/u_palm": { grid: "2x1", bundleCount: 2 },
    "shop/seeds/u_dandelion1": { grid: "1x1", bundleCount: 3 },
    "shop/seeds/u_abedul": { grid: "2x2", bundleCount: 2 },
    "shop/seeds/u_hibiscus": { grid: "1x1", bundleCount: 2 },
    "shop/seeds/u_lavanda": { grid: "1x1", bundleCount: 2 },
    "shop/seeds/u_bell": { grid: "1x1", bundleCount: 2 },
    "shop/seeds/u_pine": { grid: "2x2", bundleCount: 2 },
    "shop/seeds/u_sauce": { grid: "2x2", bundleCount: 2 },
    "shop/seeds/u_apple": { grid: "2x2", bundleCount: 2 },
    "shop/seeds/u_frailejon": { grid: "2x2", bundleCount: 1 },
    "shop/seeds/u_baobab": { grid: "3x3", bundleCount: 1 },
    "shop/seeds/u_orchid": { grid: "1x2", bundleCount: 1 },
    "shop/seeds/u_roble": { grid: "3x3", bundleCount: 1 },
    "shop/seeds/s1": { grid: "2x2", bundleCount: 1 },
    "shop/seeds/u_bonsai": { grid: "1x1", bundleCount: 1 },
    "shop/seeds/u_carnivora": { grid: "1x1", bundleCount: 1 },
    "shop/seeds/u_mushroom": { grid: "1x1", bundleCount: 2 },
    "shop/seeds/u_sunflower": { grid: "2x2", bundleCount: 2 },
    "shop/seeds/u_paraiso": { grid: "2x2", bundleCount: 1 },
    "shop/seeds/s10": { grid: "3x3", bundleCount: 1 },
    "shop/seeds/u_magic_rose": { grid: "1x1", bundleCount: 1 },
    "shop/seeds/u_robleantiguo": { grid: "3x3", bundleCount: 1 },
    "shop/seeds/s11": { grid: "2x2", bundleCount: 1 },
    "shop/seeds/u_secuoya": { grid: "4x4", bundleCount: 1 },
    "shop/seeds/u_dandelion2": { grid: "2x2", bundleCount: 2 },
    "shop/seeds/s12": { grid: "4x4", bundleCount: 1 },
    "shop/seeds/u_tree_life": { grid: "4x4", bundleCount: 1 },
    "shop/seeds/u_cactus_luna": { grid: "2x2", bundleCount: 1 },
    "shop/seeds/p6": { grid: "2x2", bundleCount: 1 },
  },
  tools: {
    "shop/tools/u_shovel": { durabilityUses: 25 },
    "shop/tools/u_cure_plant": { durabilityUses: 12 },
    "shop/tools/t7": { durabilityUses: 6 },
    "shop/tools/t8": { durabilityUses: 40, cooldownHours: 4 },
    "shop/tools/u_bellows": { durabilityUses: 35 },
    "shop/tools/t1": { durabilityUses: 32, cooldownHours: 2 },
    "shop/tools/t3": { durabilityUses: 80 },
    "shop/tools/t6": { durabilityUses: 60, cooldownHours: 6 },
    "shop/tools/t10": { permanent: true },
    "shop/tools/u_chest": { permanent: true },
    "shop/tools/u_compass": { permanent: true },
    "shop/tools/u_dwarf_axe": { durabilityUses: 45 },
    "shop/tools/t2": { durabilityUses: 50, cooldownHours: 6 },
    "shop/tools/t4": { durabilityUses: 55 },
    "shop/tools/t9": { durabilityUses: 90 },
    "shop/tools/u_spellbook": { permanent: true },
    "shop/tools/u_scroll": { durabilityUses: 10 },
    "shop/tools/u_magic_clock": { durabilityUses: 30, cooldownHours: 3 },
    "shop/tools/t5": { durabilityUses: 35 },
    "shop/tools/u_time_shield": { durabilityUses: 15 },
    "shop/tools/u_rope": { durabilityUses: 25 },
    "shop/tools/t11": { durabilityUses: 20 },
    "shop/tools/u_elf_wand": { durabilityUses: 70 },
    "shop/tools/u_masterkey": { durabilityUses: 50 },
    "shop/tools/u_ring": { permanent: true },
  },
  cosmetics: {
    "shop/cosmetics/c1": { mantra: "Las bases sólidas sostienen cualquier hábito." },
    "shop/cosmetics/u_basic_hat": { mantra: "Pequeños gestos suman magia diaria." },
    "shop/cosmetics/c2": { mantra: "Cuida los detalles, ellos cuentan tu historia." },
    "shop/cosmetics/c4": { mantra: "Vuelve a la naturaleza cuando necesites foco." },
    "shop/cosmetics/u_enchanted_hat": { mantra: "Deja que la curiosidad lidere tus rituales." },
    "shop/cosmetics/u_basic_glasses": { mantra: "Observa tu progreso con paciencia." },
    "shop/cosmetics/c3": { mantra: "Sueña en grande aunque tus raíces sean pequeñas." },
    "shop/cosmetics/u_gold_pot": { mantra: "Tu esfuerzo merece lucir brillante." },
    "shop/cosmetics/c9": { mantra: "Mira tus logros con ojos nuevos cada día." },
    "shop/cosmetics/c8": { mantra: "La disciplina también puede ser divertida." },
    "shop/cosmetics/c10": { mantra: "Abraza el calor del proceso, no solo la meta." },
    "shop/cosmetics/u_aura_arcane": { mantra: "Confía en el misterio de tus rutinas." },
    "shop/cosmetics/u_aura_water": { mantra: "Fluye incluso cuando el ritmo se traba." },
    "shop/cosmetics/u_aura_fire": { mantra: "Enciende tu motivación con cada riego." },
    "shop/cosmetics/u_aura_wind": { mantra: "Respira hondo, suelta la tensión." },
    "shop/cosmetics/c5": { mantra: "Relee tu historia y escribe un capítulo nuevo hoy." },
    "shop/cosmetics/c6": { mantra: "Haz pausa, respira, continúa." },
    "shop/cosmetics/u_aura_leaves": { mantra: "Cambia lento, como una hoja que brota." },
    "shop/cosmetics/u_aura_earth": { mantra: "Mantente firme incluso en tormentas." },
    "shop/cosmetics/u_aura_golden": { mantra: "Tu constancia es oro puro." },
    "shop/cosmetics/c7": { mantra: "Imagina futuros posibles y constrúyelos." },
    "shop/cosmetics/u_aura_nebula": { mantra: "Acepta el caos; ahí germina la innovación." },
    "shop/cosmetics/u_aura_rainbow": { mantra: "Celebra cada color de tus hábitos." },
    "shop/cosmetics/u_royal_crown": { mantra: "Trata tu rutina como un ritual sagrado." },
    "shop/cosmetics/u_butterfly_wing": { mantra: "Transformarte es un proceso, no un instante." },
  },
};

export const SHOP_LOOKUP = Object.fromEntries(
  Object.entries(SHOP_CATALOG).flatMap(([category, items]) =>
    items.map((item) => [
      item.sku,
      { title: item.title, category, rarity: item.rarity },
    ])
  )
);
