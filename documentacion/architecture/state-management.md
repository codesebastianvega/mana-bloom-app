# State Management Architecture

> **Core File:** `src/state/AppContext.js`
> **Pattern:** React Context + useReducer

## 🏗️ Overview

Mana Bloom uses a centralized global state managed by `AppContext`. It combines `useReducer` for complex state logic with `useEffect` hooks for side effects (persistence and sync).

## 🧩 Core Components

### 1. Contexts
- **`AppStateContext`**: Holds the entire state object.
- **`AppDispatchContext`**: Provides the `dispatch` function.
- **`HydrationStatusContext`**: Tracks which parts of the state have finished loading from storage.

### 2. State Structure
```javascript
const initialState = {
  // Economy
  mana: 50,
  wallet: { coin: 0, gem: 0 },
  
  // Progression
  xp: 0,
  level: 1,
  xpGoal: 100,
  streak: 0,
  
  // Game State
  plantState: "Floreciendo",
  inventory: [],
  buffs: [],
  
  // Features
  dailyChallenges: { dateKey: null, items: [] },
  dailyReward: { dateKey: null, claimed: false },
  achievements: { progress: {}, unlocked: {} },
  news: { items: [] }
};
```

## 🔄 Data Flow

1. **Action Dispatch**: Components call `dispatch({ type: 'ACTION_NAME', payload: ... })`.
2. **Reducer Update**: `appReducer` processes the action and returns new state.
3. **Re-render**: Context providers update, causing consuming components to re-render.
4. **Persistence (Side Effect)**: `useEffect` hooks detect state changes and save to `AsyncStorage`.
5. **Cloud Sync (Side Effect)**: If logged in, critical changes are pushed to Supabase.

## 💾 Persistence Strategy

We use a "Save on Change" strategy. Individual `useEffect` hooks watch specific state slices:

```javascript
// Example: Persist Mana
useEffect(() => {
  if (isHydrating.current) return;
  setMana(state.mana); // Save to AsyncStorage
  if (userId) pushProfile(userId, { mana: state.mana }); // Sync to Cloud
}, [state.mana]);
```

## 🌊 Hydration

On app launch, `hydrate()` runs once:
1. Fetches all data from `AsyncStorage` in parallel.
2. Dispatches `SET_*` actions to populate state.
3. Updates `HydrationStatusContext` as items load.
4. Checks for daily resets (Challenges, Rewards).
5. Attempts cloud sync if user is authenticated.

## 🛠️ Key Actions

- **Economy**: `ADD_COIN`, `SPEND_COIN`, `PURCHASE_WITH_MANA`
- **Progression**: `APPLY_TASK_REWARD` (handles leveling up logic)
- **Inventory**: `ADD_TO_INVENTORY`, `CONSUME_ITEM`
- **System**: `ACHIEVEMENT_EVENT` (triggers achievement checks)

## ⚠️ Best Practices

1. **Do not mutate state**: Always return new objects in reducer.
2. **Complex Logic**: Put complex business logic (like level up formulas) inside the reducer, not components.
3. **Persistence**: If you add a new state field, add a corresponding `useEffect` to persist it.
4. **Hydration**: Always check `!isHydrating` before running side effects.
