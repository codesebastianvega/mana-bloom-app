

import { UserProfile, PromoBanner, Challenge, ShopItem, EventHighlight, Task, PlantData, PlantAction, Achievement, Friend, SocialFeedItem, CoopChallenge, SocialBadge, GardenItem, GardenObject, LoreChapter } from './types';

export const USER_DATA: UserProfile = {
  name: "Alex",
  avatarUrl: "https://picsum.photos/100/100",
  level: 12,
  currentXp: 2450,
  maxXp: 3000,
  joinedAt: "15 Ene 2024",
  resources: {
    mana: 450,
    coins: 1250,
    gems: 45
  },
  stats: {
    pendingTasks: 5,
    habitsStreak: 12,
    challenges: 2
  }
};

export const ACHIEVEMENTS: Achievement[] = [
    { id: 'a1', title: 'Primer Brote', description: 'Completa tu primera tarea.', icon: '🌱', isUnlocked: true, xpReward: 50 },
    { id: 'a2', title: 'Maestro del Fuego', description: '5 tareas de fuego seguidas.', icon: '🔥', isUnlocked: true, xpReward: 100 },
    { id: 'a3', title: 'Constancia Pura', description: 'Racha de 30 días.', icon: '🗓️', isUnlocked: false, xpReward: 500 },
    { id: 'a4', title: 'Alquimista', description: 'Crea 10 pociones.', icon: '🧪', isUnlocked: false, xpReward: 200 },
    { id: 'a5', title: 'Guardian del Zen', description: 'Completa 50 rituales.', icon: '🧘', isUnlocked: true, xpReward: 150 },
];

export const PROMO_BANNERS: PromoBanner[] = [
  {
    id: '1',
    title: 'La Historia Continúa',
    subtitle: 'Capítulo 3 disponible',
    ctaText: 'Leer Lore',
    type: 'lore',
    imageGradient: 'from-amber-700 to-purple-900'
  },
  {
    id: '2',
    title: 'Tu Jardín Zen',
    subtitle: 'Nuevas semillas disponibles',
    ctaText: 'Ir al Jardín',
    type: 'garden',
    imageGradient: 'from-emerald-600 to-teal-900'
  },
  {
    id: '3',
    title: 'Inventario Místico',
    subtitle: 'Revisa tus recolecciones',
    ctaText: 'Abrir Bolsa',
    type: 'inventory',
    imageGradient: 'from-violet-600 to-indigo-900'
  }
];

export const DAILY_CHALLENGES: Challenge[] = [
  {
    id: 'c1',
    title: 'Meditar bajo la luna',
    progress: 1,
    total: 1,
    reward: '50 XP',
    icon: '🌙'
  },
  {
    id: 'c2',
    title: 'Completar 3 Tareas de Enfoque',
    progress: 2,
    total: 3,
    reward: '20 Mana',
    icon: '🎯'
  },
  {
    id: 'c3',
    title: 'Regar a Ernesto',
    progress: 0,
    total: 1,
    reward: '1 Gema',
    icon: '💧'
  }
];

export const SHOP_ITEMS: ShopItem[] = [
  { id: 's1', name: 'Poción de Foco', price: 50, currency: 'coins', category: 'potions', image: '🧪' },
  { id: 's2', name: 'Elixir de Energía', price: 10, currency: 'gems', category: 'potions', image: '🍷' },
  { id: 's3', name: 'Orquídea Lunar', price: 200, currency: 'coins', category: 'plants', image: '🌺' },
  { id: 's4', name: 'Bonsai Etéreo', price: 450, currency: 'coins', category: 'plants', image: '🌳' },
  { id: 's5', name: 'Pala de Mithril', price: 1000, currency: 'coins', category: 'tools', image: '🛠️' },
  { id: 's6', name: 'Aura Neón', price: 50, currency: 'gems', category: 'cosmetics', image: '✨' },
  { id: 's7', name: 'Gato Espectral', price: 500, currency: 'gems', category: 'pets', image: '🐈‍⬛' },
];

export const EVENTS: EventHighlight[] = [
  { id: 'e1', title: 'Luna Llena: XP Doble', date: 'Viernes', type: 'event' },
  { id: 'e2', title: 'Torneo de Alquimia', date: 'Sábado', type: 'event' },
  { id: 'e3', title: 'Temporada de Escarcha', date: 'En 3 días', type: 'season' },
];

export const SHOP_CATEGORIES = [
  { id: 'potions', label: 'Pociones', icon: '🧪' },
  { id: 'plants', label: 'Plantas', icon: '🌿' },
  { id: 'tools', label: 'Herramientas', icon: '🔨' },
  { id: 'cosmetics', label: 'Cosméticos', icon: '✨' },
  { id: 'pets', label: 'Mascotas', icon: '🐱' },
];

export const MOCK_TASKS: Task[] = [
  {
    id: 't1',
    title: 'Diseñar interfaz de pociones',
    type: 'task',
    priority: 'high',
    element: 'fire',
    rewards: { xp: 150, mana: 30 },
    status: 'pending',
    tags: ['Design', 'Work'],
    dueDate: 'Hoy',
    description: 'Bocetar 3 variantes para el menú de alquimia. Debe incluir efectos de partículas y tooltips informativos.',
    subtasks: [
      { id: 'st1', title: 'Boceto Baja Fidelidad', completed: true },
      { id: 'st2', title: 'Paleta de colores neón', completed: false },
      { id: 'st3', title: 'Prototipo interactivo', completed: false }
    ]
  },
  {
    id: 't2',
    title: 'Beber 2L de agua',
    type: 'habit',
    priority: 'medium',
    element: 'water',
    rewards: { xp: 20, mana: 5 },
    status: 'pending',
    tags: ['Salud'],
    warning: 'Demasiada agua diluye el mana (broma)',
    subtasks: [
      { id: 'st1', title: 'Vaso mañana', completed: true },
      { id: 'st2', title: 'Vaso tarde', completed: false },
      { id: 'st3', title: 'Vaso noche', completed: false }
    ]
  },
  {
    id: 't3',
    title: 'Ritual de la mañana',
    type: 'ritual',
    priority: 'low',
    element: 'air',
    rewards: { xp: 50, mana: 50 },
    status: 'completed',
    tags: ['Mindfulness'],
  },
  {
    id: 't4',
    title: 'Derrotar al Bug de Producción',
    type: 'mission',
    priority: 'high',
    element: 'void',
    rewards: { xp: 500, mana: 100 },
    status: 'pending',
    tags: ['Dev', 'Urgent'],
    dueDate: 'Mañana',
    description: 'El bug aparece cuando el usuario intenta comprar 99 pociones a la vez. Investigar logs del servidor.',
    subtasks: [
      { id: 'st1', title: 'Reproducir bug en local', completed: false },
      { id: 'st2', title: 'Hotfix en base de datos', completed: false }
    ]
  },
  {
    id: 't5',
    title: 'Caminar 30 mins',
    type: 'habit',
    priority: 'medium',
    element: 'earth',
    rewards: { xp: 30, mana: 10 },
    status: 'pending',
    tags: ['Salud'],
  }
];

export const MOCK_PLANT: PlantData = {
  name: "Ernesto",
  species: "Bonsai Etéreo",
  stage: "Floreciente",
  stageNumber: 6,
  nextStage: "Radiante",
  nextStageNumber: 7,
  xp: 75,
  maxXp: 100,
  globalStageProgress: 62,
  streak: 5,
  nextStageEta: "~3 tareas",
  stats: {
    hydration: 82,
    sunlight: 64,
    nutrients: 70,
    purity: 76,
    health: 75,
    happiness: 90,
    temperature: 24,
  },
  personality: {
      type: "Paciente (Agua)",
      description: "Estás fluyendo, pero añade misiones de fuego y proyectos de tierra para evitar quedarte en modo pausa.",
      balanceStatus: "Unbalanced",
      balancePercentage: 25
  },
  elementalBalance: {
    fire: { value: 17, tasksCount: 1, habitsCount: 1, status: 'Bajo', advice: 'Refuerza con agua (descanso) y tareas de aire' },
    water: { value: 58, tasksCount: 7, habitsCount: 0, status: 'Estable', advice: 'Refuerza con fuego (ritual Sunlight) para retomar momentum' },
    earth: { value: 17, tasksCount: 2, habitsCount: 0, status: 'Bajo', advice: 'Refuerza con aire (notas, gratitud)' },
    air: { value: 8, tasksCount: 1, habitsCount: 0, status: 'Bajo', advice: 'Súbele actividad' }
  },
  activeBuffs: ['Crecimiento acelerado', 'Aura de calma'],
  ritualsCompleted: 0,
  ritualsTotal: 8
};

export const PLANT_ACTIONS: PlantAction[] = [
  { id: 'meditate', label: 'Meditar', description: 'Respira 3 ciclos profundos.', icon: '🕉️', cost: { mana: 0 }, type: 'ritual', color: 'indigo' },
  { id: 'hydrate', label: 'Hidratar', description: 'Toma un vaso de agua ahora.', icon: '💧', cost: { mana: 0 }, type: 'ritual', color: 'blue' },
  { id: 'stretch', label: 'Estirar', description: 'Suelta la tensión en 60s.', icon: '🧘', cost: { mana: 0 }, type: 'ritual', color: 'teal' },
  { id: 'light', label: 'Luz', description: 'Busca luz suave y recárgate.', icon: '☀️', cost: { mana: 0 }, type: 'ritual', color: 'amber' },
  { id: 'visualize', label: 'Visualizar', description: 'Enfoca tu meta del día.', icon: '👁️', cost: { mana: 0 }, type: 'ritual', color: 'violet' },
  { id: 'notes', label: 'Notas', description: 'Escribe una línea honesta.', icon: '🪶', cost: { mana: 0 }, type: 'ritual', color: 'rose' },
  { id: 'gratitude', label: 'Gratitud', description: 'Envía un mensaje lleno de gratitud.', icon: '🤲', cost: { mana: 0 }, type: 'ritual', color: 'pink' },
  { id: 'rest', label: 'Descanso', description: 'Cierra los ojos durante 20s.', icon: '🪷', cost: { mana: 0 }, type: 'ritual', color: 'indigo' },
];

export const MOCK_FRIENDS: Friend[] = [
  { id: 'f1', name: 'Sofia', avatarUrl: 'https://picsum.photos/101/101', level: 15, streak: 20, isOnline: true, isPremium: true, clan: 'Solarios' },
  { id: 'f2', name: 'Marcos', avatarUrl: 'https://picsum.photos/102/102', level: 8, streak: 3, isOnline: true },
  { id: 'f3', name: 'Elena', avatarUrl: 'https://picsum.photos/103/103', level: 11, streak: 0, isOnline: false },
  { id: 'f4', name: 'Ryu', avatarUrl: 'https://picsum.photos/104/104', level: 22, streak: 45, isOnline: false, clan: 'Sombras' },
];

export const SOCIAL_FEED: SocialFeedItem[] = [
  { id: 'sf1', user: { name: 'Sofia', avatarUrl: 'https://picsum.photos/101/101' }, action: 'ha florecido su planta', details: 'Nivel 6: Radiante', timeAgo: '2h', reactions: 12, type: 'levelUp' },
  { id: 'sf2', user: { name: 'Ryu', avatarUrl: 'https://picsum.photos/104/104' }, action: 'plantó un árbol real', details: 'Vía reforestación', timeAgo: '5h', reactions: 45, type: 'donation' },
  { id: 'sf3', user: { name: 'Marcos', avatarUrl: 'https://picsum.photos/102/102' }, action: 'completó el reto', details: 'Meditar bajo la luna', timeAgo: '1d', reactions: 3, type: 'achievement' },
];

export const COOP_CHALLENGES: CoopChallenge[] = [
  { id: 'cc1', title: 'Gran Reforestación', description: 'Regar 10,000 plantas entre todos.', progress: 7500, goal: 10000, participants: 320, timeLeft: '2 días', type: 'coop', reward: 'Skin de Roble' },
  { id: 'cc2', title: 'Torneo de Clanes', description: 'Clan con más rituales gana.', progress: 120, goal: 500, participants: 45, timeLeft: '5 días', type: 'competitive', reward: 'Insignia Dorada' },
];

export const SOCIAL_BADGES: SocialBadge[] = [
  { id: 'sb1', name: 'Mentor', icon: '🎓', description: 'Ayuda a 3 amigos.', isUnlocked: false },
  { id: 'sb2', name: 'Guardián', icon: '🛡️', description: 'Racha social de 30 días.', isUnlocked: true },
  { id: 'sb3', name: 'Embajador', icon: '🤝', description: 'Invita a 5 personas.', isUnlocked: false },
];

// --- Garden Sandbox Data ---

export const GARDEN_ITEMS: GardenItem[] = [
  { id: 'gi1', name: 'Bonsai Ancestral', type: 'plants', icon: '🌳', cost: 100, currency: 'mana', isPremium: false, description: 'Un árbol sabio.' },
  { id: 'gi2', name: 'Orquídea Lunar', type: 'plants', icon: '🌺', cost: 250, currency: 'mana', isPremium: false, description: 'Brilla de noche.' },
  { id: 'gi3', name: 'Fuente Zen', type: 'decor', icon: '⛲', cost: 500, currency: 'coins', isPremium: false, description: 'Agua fluyendo.' },
  { id: 'gi4', name: 'Lámpara Arcana', type: 'decor', icon: '🏮', cost: 50, currency: 'gems', isPremium: true, description: 'Iluminación mágica.' },
  { id: 'gi5', name: 'Camino de Piedra', type: 'paths', icon: '🪨', cost: 20, currency: 'coins', isPremium: false, description: 'Sendero firme.' },
  { id: 'gi6', name: 'Tótem del Tiempo', type: 'special', icon: '⏳', cost: 100, currency: 'gems', isPremium: true, description: 'Acelera el crecimiento.' },
];

export const INITIAL_GARDEN_LAYOUT: GardenObject[] = [
  { id: 'go1', itemId: 'gi1', x: 3, y: 3, health: 100 }, // Center tree
  { id: 'go2', itemId: 'gi5', x: 3, y: 4 },
  { id: 'go3', itemId: 'gi5', x: 3, y: 5 },
  { id: 'go4', itemId: 'gi3', x: 1, y: 2 },
];

// --- LORE CHAPTERS ---
export const LORE_CHAPTERS: LoreChapter[] = [
    {
        id: 'chap1',
        season: 1,
        chapterNumber: 1,
        title: 'El Despertar de la Semilla',
        content: "Al principio, solo había silencio. La Gran Niebla cubría el mundo, sofocando la creatividad y el propósito. Pero tú encontraste la chispa. Al completar tu primera tarea, una pequeña luz pulsó en el vacío. No era mucho, apenas un destello, pero fue suficiente para despertar a Ernesto, el espíritu de la flora antigua. Ahora, cada hábito que cultivas empuja la niebla un poco más lejos.",
        unlockLevel: 1,
        isUnlocked: true,
        image: '🌱'
    },
    {
        id: 'chap2',
        season: 1,
        chapterNumber: 2,
        title: 'Los Ecos del Agua',
        content: "Ernesto ha comenzado a susurrar. Dice que el agua no es solo H2O, sino el flujo del tiempo mismo. Cuando te hidratas, no solo nutres tu cuerpo, sino que sincronizas tu reloj interno con el río del cosmos. Has notado que los días que fluyes con tus tareas, el agua del jardín brilla con un tono azul etéreo. Los Antiguos llamaban a esto 'Flow'.",
        unlockLevel: 5,
        isUnlocked: true,
        image: '💧'
    },
    {
        id: 'chap3',
        season: 1,
        chapterNumber: 3,
        title: 'La Prueba del Fuego',
        content: "La niebla contraatacó hoy. Una oleada de procrastinación, densa y pegajosa. Pero encendiste la llama de la Prioridad Alta. Al enfrentar esa tarea difícil, el fuego de tu voluntad quemó la pereza. Ernesto ha crecido una hoja roja en honor a tu batalla. Dicen que si dominas el fuego, podrás forjar el tiempo a tu voluntad.",
        unlockLevel: 10,
        isUnlocked: true, // Mock unlocked for demo
        image: '🔥'
    },
    {
        id: 'chap4',
        season: 1,
        chapterNumber: 4,
        title: 'El Secreto del Vacío',
        content: "Has alcanzado un nivel de consciencia que pocos logran. Entiendes que el descanso no es la ausencia de trabajo, sino la preparación para la magia. En el silencio de tu meditación, escuchaste la verdad: el Mana Bloom no es la app, eres tú floreciendo.",
        unlockLevel: 15,
        isUnlocked: false,
        image: '✨'
    }
];