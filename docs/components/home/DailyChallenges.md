# Daily Challenges System

> **Component:** `DailyChallengesSection`  
> **Location:** `src/components/home/DailyChallengesSection.js`  
> **Last Updated:** 2025-11-23

## 📋 Overview

Sistema de desafíos diarios que ofrece 3 retos aleatorios cada día para incentivar la productividad. Los usuarios ganan XP y Mana al completar desafíos.

## 🎯 Features

- ✅ 3 desafíos diarios generados aleatoriamente
- ✅ Progreso automático al completar tareas
- ✅ Recompensas de XP y Mana
- ✅ Regeneración diaria automática
- ✅ UI con iconos, barras de progreso y descripciones
- ✅ Validación para evitar desafíos repetidos consecutivos

## 🏗️ Architecture

### Data Flow

```
CHALLENGE_TEMPLATES (AppContext.js)
        ↓
generateDailyChallenges()
        ↓
AsyncStorage (dailyChallenges)
        ↓
Hydration on app start
        ↓
DailyChallengesSection (UI)
```

### Challenge Structure

```typescript
interface Challenge {
  id: string;              // Unique ID: `${timestamp}_${index}`
  title: string;           // Display title
  description: string;     // What to do
  type: string;            // "complete_tasks" | "complete_priority"
  param?: string;          // Optional: "Urgente" | "Alta"
  goal: number;            // Target (e.g., 5 tasks)
  progress: number;        // Current progress
  reward: {
    xp: number;           // XP reward
    mana: number;         // Mana reward
  };
  claimed: boolean;        // Whether reward was claimed
}
```

## 🎨 UI Components

### Card Layout

```
┌─────────────────────────────────────────┐
│ [🎯] Título del desafío                 │
│      Descripción en gris                │
│ [████████░░░░] 3/5                      │
│ [⭐ +25 XP] [💧 +20 Mana] [Reclamar]   │
└─────────────────────────────────────────┘
```

### Elements

1. **Icon Badge** - 36x36px circular badge with golden accent
2. **Title** - Bold, 15px
3. **Description** - Gray text, 12px
4. **Progress Bar** - Visual bar (green when complete)
5. **Progress Counter** - Numeric display (e.g., "3/5")
6. **Reward Pills** - XP and Mana with icons
7. **Button** - Compact, right-aligned

## 🔧 Implementation

### Template Definition

Templates are defined **inline** in `AppContext.js` (NOT imported from `challengeTemplates.js`):

```javascript
const CHALLENGE_TEMPLATES = [
  {
    type: "complete_tasks",
    title: "Completar tareas",
    description: "Completa 5 tareas de cualquier tipo",
    goal: 5,
    weight: 10,
    reward: { xp: 25, mana: 20 },
  },
  // ... more templates
];
```

### Generation Logic

```javascript
function generateDailyChallenges(todayKey, lastTypes, userId) {
  // 1. Select 3 random templates (weighted)
  // 2. Avoid repeating types from yesterday
  // 3. Map to challenge objects
  return selected.map((t, idx) => ({
    id: `${Date.now()}_${idx}`,
    title: t.title,
    description: t.description,
    type: t.type,
    param: t.param,
    goal: t.goal,
    progress: 0,
    reward: t.reward,
    claimed: false,
  }));
}
```

### Progress Tracking

Progress updates automatically when tasks are completed:

```javascript
case "UPDATE_DAILY_CHALLENGES_ON_TASK_DONE": {
  const { priority } = action.payload;
  const items = state.dailyChallenges.items.map((it) => {
    if (it.type === "complete_tasks") {
      return { ...it, progress: Math.min(it.goal, it.progress + 1) };
    }
    if (it.type === "complete_priority" && it.param === priority) {
      return { ...it, progress: Math.min(it.goal, it.progress + 1) };
    }
    return it;
  });
  return { ...state, dailyChallenges: { ...state.dailyChallenges, items } };
}
```

## 💾 Data Persistence

### Storage Key
`@mana_bloom:daily_challenges`

### Structure
```json
{
  "dateKey": "2025-11-23",
  "items": [
    {
      "id": "1732392000000_0",
      "title": "Completar tareas",
      "description": "Completa 5 tareas de cualquier tipo",
      "type": "complete_tasks",
      "goal": 5,
      "progress": 2,
      "reward": { "xp": 25, "mana": 20 },
      "claimed": false
    }
  ]
}
```

### Regeneration Logic

Challenges regenerate when:
1. Date changes (new day)
2. No challenges exist
3. **Missing required fields** (e.g., `description`)

```javascript
const needsRegeneration = !dailyChallenges || 
  dailyChallenges.dateKey !== todayKey ||
  (dailyChallenges.items && dailyChallenges.items.some(item => !item.description));
```

## 🔗 Connections

### Affects
- **TasksScreen** - Completing tasks updates challenge progress
- **AppContext** - Stores challenge state
- **HomeScreen** - Displays challenges

### Affected By
- **AppContext.hydrate()** - Loads challenges on app start
- **Task completion** - Updates progress

### Related Components
- `HomeHeroSection` - Shows overall progress
- `HomeRewardsSection` - Related reward system

## 🎮 User Flow

1. User opens app
2. Challenges load from AsyncStorage
3. If new day → regenerate 3 new challenges
4. User completes tasks
5. Challenge progress updates automatically
6. When goal reached → "Reclamar" button activates
7. User claims → receives XP and Mana
8. Challenge marked as claimed

## 🐛 Common Issues

### Issue: "undefined" in titles
**Cause:** Template missing `title` field  
**Solution:** Ensure all templates have `title` defined

### Issue: "NaN%" in progress
**Cause:** Template missing `goal` field  
**Solution:** Ensure all templates have `goal` defined

### Issue: Descriptions not showing
**Cause:** Old challenges in storage without `description`  
**Solution:** Add validation to regenerate if `description` is missing

## 📊 Metrics

- **Daily engagement:** Challenges encourage daily app usage
- **Task completion:** Incentivizes completing more tasks
- **Reward distribution:** Balanced XP/Mana rewards

## 🔮 Future Enhancements

- [ ] Weekly challenges (longer-term goals)
- [ ] Challenge streaks (complete X days in a row)
- [ ] Special event challenges
- [ ] Challenge difficulty tiers
- [ ] Social challenges (compete with friends)

## 📝 Changelog

### 2025-11-23
- ✅ Redesigned UI with icons, progress bars, descriptions
- ✅ Added description field to all templates
- ✅ Moved templates inline in AppContext.js
- ✅ Added validation for missing fields
- ✅ Improved visual hierarchy

### Previous
- Initial implementation with basic card layout
- Simple progress tracking
- Manual claim system

---

*Maintained by: Development Team*
