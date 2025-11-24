# Data Flow & Persistence

> **Storage Layer:** `src/storage/index.js`
> **Sync Layer:** `src/lib/sync.js`

## 🔄 Architecture Overview

Mana Bloom follows a **Local-First** architecture. The app works fully offline using `AsyncStorage`, and syncs with Supabase when online.

```
[UI Component] 
      ↕️ (Read/Dispatch)
[AppContext (State)]
      ⬇️ (useEffect)
[AsyncStorage (Local)] ⬅️➡️ [Supabase (Cloud)]
```

## 💾 Local Storage (AsyncStorage)

We use `react-native-async-storage` to persist data on the device.

### Key Storage Keys
- `@mana_bloom:mana` (Number)
- `@mana_bloom:wallet` (JSON: `{ coin, gem }`)
- `@mana_bloom:inventory` (JSON Array)
- `@mana_bloom:daily_challenges` (JSON)
- `@mana_bloom:achievements` (JSON)
- ...and others defined in `src/storage/index.js`

### Pattern
Wrapper functions in `src/storage/index.js` handle JSON serialization/parsing:
```javascript
export const getInventory = async () => {
  const json = await AsyncStorage.getItem(KEYS.INVENTORY);
  return json ? JSON.parse(json) : [];
};
```

## ☁️ Cloud Sync (Supabase)

Sync is handled in `src/lib/sync.js`.

### Strategy
1. **Push on Change**: Critical updates (Profile, Inventory) are pushed immediately after local save.
2. **Pull on Hydrate**: On app start, if logged in, we fetch cloud data and merge it into local state.

### Conflict Resolution
Currently, we use a simple "Last Write Wins" or "Merge" strategy depending on the data type:
- **Resources (Mana/Coins)**: Cloud value overwrites local (trusted source).
- **Inventory**: Cloud inventory overwrites local.
- **Tasks**: (Planned) Merged by ID/Timestamp.

## 🔒 Security

- **RLS (Row Level Security)**: Supabase tables are protected so users can only access their own data.
- **Validation**: Basic validation happens on the client. (Future: Server-side validation for economy).

## 🚀 Future Improvements

- [ ] **Offline Queue**: Queue sync requests when offline and retry when online.
- [ ] **Conflict Resolution**: Better handling of merge conflicts for tasks.
- [ ] **Optimistic UI**: UI updates immediately, rollback if sync fails (partially implemented via local-first).
