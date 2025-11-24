# Progression System

> **State:** `xp`, `level`, `xpGoal`
> **Related Components:** `HomeHeroSection`, `ProfileScreen`

## 📈 XP & Leveling

Users earn Experience Points (XP) to level up their profile and unlock features.

### XP Sources
1. **Completing Tasks:** Base XP + Priority Bonus.
2. **Daily Challenges:** Fixed XP reward.
3. **Daily Rewards:** Occasional XP bonus.

### Leveling Formula
We use a progressive curve for XP requirements:

```javascript
// AppContext.js logic
while (xp >= xpGoal) {
  xp -= xpGoal;
  level += 1;
  xpGoal = Math.round(Math.ceil(xpGoal * 1.25) / 10) * 10;
}
```
*XP Goal increases by ~25% each level.*

## 🔓 Unlocks (Planned)

Features unlock at specific levels to avoid overwhelming new users.

| Level | Feature Unlocked |
|-------|------------------|
| 1     | Basic Tasks, Plant Care |
| 3     | Daily Challenges |
| 5     | Magic Shop |
| 10    | Garden Sandbox |

## 🏆 Achievements

Achievements provide long-term goals.

### Types
- **Reach Value:** Reach Level 10, Reach Streak 7.
- **Count Event:** Complete 100 tasks.
- **Window Count:** Complete 5 tasks in 1 hour.

### Rewards
Achievements grant significant amounts of Coins and Gems.
