

export interface UserProfile {
  name: string;
  avatarUrl: string;
  level: number;
  currentXp: number;
  maxXp: number;
  joinedAt?: string; // New field
  resources: {
    mana: number;
    coins: number;
    gems: number;
  };
  stats: {
    pendingTasks: number;
    habitsStreak: number;
    challenges: number;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  isUnlocked: boolean;
  xpReward: number;
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  ctaText: string;
  type: 'garden' | 'inventory' | 'premium' | 'lore';
  imageGradient: string;
}

export interface Challenge {
  id: string;
  title: string;
  progress: number;
  total: number;
  reward: string;
  icon: string;
}

export interface ShopItem {
  id: string;
  name: string;
  price: number;
  currency: 'coins' | 'gems';
  image: string; // Emoji or URL
  category: 'potions' | 'plants' | 'tools' | 'cosmetics' | 'pets';
}

export interface EventHighlight {
  id: string;
  title: string;
  date: string;
  type: 'event' | 'season';
}

// --- New Task Types ---

export type TaskType = 'task' | 'habit' | 'mission' | 'ritual';
export type TaskPriority = 'low' | 'medium' | 'high';
export type TaskDifficulty = 'easy' | 'medium' | 'hard' | 'legendary';
export type TaskElement = 'fire' | 'water' | 'earth' | 'air' | 'void';
export type TaskStatus = 'pending' | 'completed' | 'archived';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  type: TaskType;
  priority: TaskPriority;
  difficulty?: TaskDifficulty; // Added difficulty field
  element: TaskElement;
  rewards: {
    xp: number;
    mana: number;
  };
  status: TaskStatus;
  tags: string[];
  dueDate?: string; // ISO String or "Today", "Tomorrow"
  warning?: string; // e.g. "Completar antes de tiempo reduce XP"
  subtasks?: Subtask[];
}

// --- Plant / Garden Types ---

export interface ElementStat {
    value: number; // 0-100% of dominance
    tasksCount: number;
    habitsCount: number;
    status: 'Bajo' | 'Estable' | 'Alto';
    advice: string;
}

export interface PlantData {
  name: string;
  species: string;
  stage: string; // e.g. "Floreciente"
  stageNumber: number; // e.g. 6
  nextStage: string; // e.g. "Radiante"
  nextStageNumber: number; // e.g. 7
  xp: number;
  maxXp: number;
  globalStageProgress: number; // 0-100% for the circular indicator
  streak: number;
  nextStageEta: string; // e.g., "3 tareas"
  stats: {
    hydration: number; // 0-100
    sunlight: number;
    nutrients: number;
    purity: number;
    health: number; // Overall health
    happiness: number;
    temperature: number;
  };
  personality: {
      type: string; // e.g., "Paciente (Agua)"
      description: string;
      balanceStatus: 'Balanced' | 'Unbalanced';
      balancePercentage: number;
  };
  elementalBalance: {
    fire: ElementStat;
    water: ElementStat;
    earth: ElementStat;
    air: ElementStat;
  };
  activeBuffs: string[];
  ritualsCompleted: number;
  ritualsTotal: number;
}

export interface PlantAction {
  id: string;
  label: string;
  description?: string;
  icon: string;
  cost: { mana: number; coins?: number };
  cooldown?: string;
  type: 'care' | 'magic' | 'ritual';
  color?: string;
}

// --- Garden Sandbox Types ---

export type BuildCategory = 'plants' | 'decor' | 'paths' | 'special';

export interface GardenItem {
  id: string;
  name: string;
  type: BuildCategory;
  icon: string; // Emoji for now, could be asset URL
  cost: number;
  currency: 'mana' | 'coins' | 'gems';
  isPremium: boolean;
  description?: string; // Added field
}

export interface GardenObject {
  id: string;
  itemId: string;
  x: number;
  y: number;
  health?: number;
}

// --- Social Types ---

export interface Friend {
  id: string;
  name: string;
  avatarUrl: string;
  level: number;
  streak: number;
  isOnline: boolean;
  isPremium?: boolean;
  clan?: string;
}

export interface SocialFeedItem {
  id: string;
  user: { name: string; avatarUrl: string };
  action: string;
  details?: string;
  timeAgo: string;
  reactions: number;
  type: 'levelUp' | 'donation' | 'achievement';
}

export interface CoopChallenge {
  id: string;
  title: string;
  description: string;
  progress: number;
  goal: number;
  participants: number;
  timeLeft: string;
  type: 'coop' | 'competitive';
  reward: string;
}

export interface SocialBadge {
  id: string;
  name: string;
  icon: string;
  description: string;
  isUnlocked: boolean;
}

// --- Lore Types ---

export interface LoreChapter {
  id: string;
  season: number;
  chapterNumber: number;
  title: string;
  content: string;
  unlockLevel: number; // Level required to unlock
  isUnlocked: boolean;
  image?: string; // Optional illustration
}