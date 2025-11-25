# Rewards System

> **Related Components:** `HomeRewardsSection`, `DailyChallengesSection`
> **State:** `dailyReward`, `streak`

## 🎁 Daily Rewards

The daily reward system incentivizes users to open the app every day.

### Mechanics
1. **Generation:** A random reward is selected daily based on weighted probabilities.
2. **Types:**
   - **Mana (💧):** Common
   - **Coins (🪙):** Uncommon
   - **Gems (💎):** Rare
   - **Items (🧪):** Very Rare (Potions, Seeds)
3. **Claiming:** User must manually claim the reward in `HomeRewardsSection`.
4. **Reset:** Resets at midnight local time.

## 🔥 Streak System

Tracks consecutive days of activity (claiming rewards).

### Mechanics
- **Increment:** +1 when claiming daily reward if previous claim was yesterday.
- **Reset:** Resets to 1 if a day is missed.
- **Bonus:** (Planned) Higher streaks multiply daily rewards.

## 🎯 Challenge Rewards

Rewards earned by completing 3 daily challenges.

### Mechanics
- **XP:** For leveling up.
- **Mana:** For plant care.
- **Amounts:** Defined in `CHALLENGE_TEMPLATES` (e.g., 25 XP, 20 Mana).
