# Coding Guidelines for Mana Bloom

## 🎯 Core Principles

1. **Minimize edits** - Only change what's necessary
2. **Use precise tools** - `multi_replace_file_content` for small edits
3. **Never rewrite entire files** - Wastes resources and introduces errors
4. **Test incrementally** - Small changes, verify, then continue

---

## 🛠️ Tool Usage Rules

### ✅ ALWAYS Use These Tools

**For small/multiple edits:**
```javascript
multi_replace_file_content({
  TargetFile: "path/to/file.js",
  ReplacementChunks: [
    {
      StartLine: 10,
      EndLine: 15,
      TargetContent: "exact code to replace",
      ReplacementContent: "new code"
    }
  ]
})
```

**For single contiguous edit:**
```javascript
replace_file_content({
  TargetFile: "path/to/file.js",
  StartLine: 10,
  EndLine: 15,
  TargetContent: "exact code to replace",
  ReplacementContent: "new code"
})
```

### ❌ NEVER Do These

- ❌ Rewrite entire files with `write_to_file` when editing
- ❌ Use `git checkout` if there are inline changes (like CHALLENGE_TEMPLATES)
- ❌ Make parallel edits to the same file
- ❌ Assume data structure without checking first

---

## 🗄️ Data Persistence Patterns

### AsyncStorage Regeneration

**Problem:** Data persists between app reloads, old structure remains even after code changes.

**Solution:** Add validation in hydration to force regeneration when structure changes.

**Example - Daily Challenges:**
```javascript
// In AppContext.js hydrate() function
const needsRegeneration = !dailyChallenges || 
  dailyChallenges.dateKey !== todayKey ||
  (dailyChallenges.items && dailyChallenges.items.some(item => !item.description));

if (needsRegeneration) {
  const items = generateDailyChallenges(todayKey, lastTypes);
  dailyChallenges = { dateKey: todayKey, items };
  await setDailyChallengesState(dailyChallenges);
}
```

**Key Pattern:**
- Check for new required fields (e.g., `!item.description`)
- Regenerate if missing
- Save to storage

---

## 🎮 Challenge System Architecture

### Template Location: INLINE in AppContext.js

**❌ WRONG - Don't import from challengeTemplates.js:**
```javascript
import { CHALLENGE_TEMPLATES } from "../constants/challengeTemplates";
```

**✅ CORRECT - Define inline:**
```javascript
// In AppContext.js, after imports
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

**Why?** The `challengeTemplates.js` file uses a different structure with `generate()` functions that's incompatible with the simple mapping in `generateDailyChallenges()`.

### Challenge Generation Flow

1. **Templates** → Defined inline in AppContext.js
2. **Generation** → `generateDailyChallenges()` maps templates to challenge objects
3. **Storage** → Saved to AsyncStorage with `dateKey`
4. **Hydration** → Loaded on app start, validated for required fields
5. **Display** → `DailyChallengesSection` component renders

### Required Challenge Fields

```typescript
{
  id: string,           // Generated: `${Date.now()}_${idx}`
  title: string,        // From template
  description: string,  // From template - MUST be present
  type: string,         // From template
  param?: string,       // From template (optional)
  goal: number,         // From template
  progress: number,     // Always starts at 0
  reward: {             // From template
    xp: number,
    mana: number
  },
  claimed: boolean      // Always starts false
}
```

---

## 🎨 UI Component Patterns

### DailyChallengesSection Structure

```
Card Layout:
┌─────────────────────────────────────┐
│ [Icon] Title                        │
│        Description (gray text)      │
│ [████████░░] Progress  0/5          │
│ [⭐ +25 XP] [💧 +20 Mana] [Button] │
└─────────────────────────────────────┘
```

**Key Elements:**
- Icon badge (36x36px, golden accent)
- Title + Description (description is optional but recommended)
- Visual progress bar + numeric counter
- Reward pills with icons
- Compact button (right-aligned)

---

## 🔧 Common Issues & Solutions

### Issue: "undefined" in UI

**Symptoms:** Component shows "undefined" for text fields

**Causes:**
1. Missing field in data structure
2. Incorrect mapping in generation function
3. Old data in AsyncStorage

**Solution:**
1. Check data structure has all required fields
2. Verify mapping includes the field (e.g., `description: t.description`)
3. Add validation to force regeneration if field is missing

### Issue: "NaN%" in progress

**Symptoms:** Progress shows "NaN%" or "0/undefined"

**Cause:** `goal` field is undefined

**Solution:**
1. Ensure templates have `goal` defined
2. Verify `generateDailyChallenges()` maps `goal: t.goal`
3. Force regeneration with validation

### Issue: Changes not appearing

**Symptoms:** Code changes don't reflect in app

**Causes:**
1. Data cached in AsyncStorage
2. App not reloaded
3. Wrong file being edited

**Solution:**
1. Add regeneration validation
2. Reload app (press 'r' in terminal)
3. Clear app data if necessary
4. Verify correct file path

---

## 📝 Editing Workflow

### Before Editing

1. ✅ View the file to understand structure
2. ✅ Identify exact lines to change
3. ✅ Check for dependencies (imports, data flow)
4. ✅ Plan minimal change needed

### During Editing

1. ✅ Use `multi_replace_file_content` for precision
2. ✅ Include exact `TargetContent` (copy from view)
3. ✅ Verify line numbers are correct
4. ✅ Make one logical change at a time

### After Editing

1. ✅ Check for lint errors
2. ✅ Verify file wasn't corrupted
3. ✅ Test the change (reload app)
4. ✅ If broken, use `git checkout` to restore

---

## 🚨 Emergency Recovery

### If file gets corrupted:

```bash
git checkout HEAD -- path/to/file.js
```

**Then:** Make the edit again, more carefully, with smaller chunks.

### If app crashes after edit:

1. Check terminal for error message
2. Identify the problematic file
3. Restore with `git checkout`
4. Review what went wrong
5. Make smaller, incremental change

---

## 💡 Best Practices

### DO:
- ✅ Use `view_file` before editing
- ✅ Copy exact text for `TargetContent`
- ✅ Test after each logical change
- ✅ Add validation for new data fields
- ✅ Document complex changes

### DON'T:
- ❌ Edit files you haven't viewed
- ❌ Make multiple parallel edits to same file
- ❌ Assume data structure
- ❌ Skip testing after changes
- ❌ Rewrite entire files unnecessarily

---

## 📚 Key Files Reference

### State Management
- `src/state/AppContext.js` - Global state, challenge generation, hydration
- `src/storage/index.js` - AsyncStorage persistence

### Components
- `src/components/home/DailyChallengesSection.js` - Challenge cards UI
- `src/components/home/DailyChallengesSection.styles.js` - Challenge styles
- `src/screens/HomeScreen.js` - Main home screen

### Constants
- `src/constants/challengeTemplates.js` - ⚠️ NOT USED (incompatible structure)
- Templates are INLINE in AppContext.js

---

## 🎓 Lessons Learned

### Session: 2025-11-23 - Daily Challenges Redesign

**Problem:** Descriptions not showing in challenge cards

**Root Cause:** 
1. `description` field not mapped in `generateDailyChallenges()`
2. Old challenges in AsyncStorage without `description`
3. CHALLENGE_TEMPLATES imported from incompatible file

**Solution:**
1. Added `description: t.description` to mapping
2. Added validation: `item => !item.description` to force regeneration
3. Moved CHALLENGE_TEMPLATES inline in AppContext.js

**Key Takeaway:** When adding new fields to persisted data, ALWAYS add validation to regenerate old data.

---

## 📞 When to Ask User

### Ask for clarification when:
- Requirements are ambiguous
- Multiple valid approaches exist
- Change affects user-facing behavior significantly
- Breaking changes are needed

### Don't ask when:
- Fix is obvious (like adding missing field)
- Following established patterns
- Making incremental improvements
- Fixing clear bugs

---

*Last Updated: 2025-11-23*
*Maintainer: Development Team*
