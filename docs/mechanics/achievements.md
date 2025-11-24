# Achievements System

> **State:** `achievements` (`progress`, `unlocked`)
> **Constants:** `src/constants/achievements.js`

## 🏆 Overview

The achievement system rewards long-term engagement and milestones. It tracks user actions and automatically unlocks badges when criteria are met.

## 🧩 Architecture

### Data Structure
```javascript
// Achievement Definition
{
  id: "t_urgent_10",
  title: "Bombero",
  description: "Completa 10 tareas urgentes",
  type: "count_event", // Logic type
  event: "task_completed", // Trigger event
  goal: 10,
  reward: { coin: 50, xp: 100 }
}
```

### Trigger Types
1. **`count_event`**: Increments a counter every time an event fires (e.g., "Complete Task").
2. **`reach_value`**: Checks if a value meets a threshold (e.g., "Reach Level 10").
3. **`window_count`**: Checks frequency within a time window (e.g., "5 tasks in 1 hour").

## 🔄 Flow

1. **Action:** User performs an action (e.g., completes a task).
2. **Dispatch:** `ACHIEVEMENT_EVENT` is dispatched with payload.
3. **Reducer:**
   - Updates progress counter for relevant achievements.
   - Checks if `progress >= goal`.
   - If unlocked, adds to `unlocked` state and sets `achievementToast`.
4. **UI:** Shows a toast notification. User can view/claim in Profile.

## 🏅 Current Achievements

| ID | Title | Criteria | Reward |
|----|-------|----------|--------|
| `t_first_1` | Primer Paso | Complete 1 task | 10 Coins |
| `t_urgent_10` | Bombero | Complete 10 urgent tasks | 50 Coins |
| `l_level_5` | Aprendiz | Reach Level 5 | 10 Gems |
| `s_streak_7` | Constante | 7-day Streak | 20 Gems |

## 🚀 Future Improvements
- [ ] Visual badge gallery in Profile.
- [ ] Hidden achievements.
- [ ] Multi-stage achievements (Bronze/Silver/Gold).
