# Hero Section Component

> **Component:** `HomeHeroSection`
> **Location:** `src/components/home/HomeHeroSection.js`
> **Last Updated:** 2025-11-23

## 📋 Overview

The primary status display for the user. It shows their current level, XP progress, and available resources (Mana, Coins, Gems).

## 🎯 Features

- ✅ User Avatar & Name
- ✅ Level & XP Progress Bar
- ✅ Resource Counters (Mana, Coins, Gems)
- ✅ Active Buffs Display

## 🏗️ Architecture

### Data Flow

```
AppContext (user, wallet, buffs)
        ↓
HomeHeroSection
```

## 🎨 UI Components

### Layout

```
┌──────────────────────────────┐
│ [Avatar]  Username           │
│           Level 5  [XP Bar]  │
├──────────────────────────────┤
│ 💧 50   🪙 120   💎 5       │
└──────────────────────────────┘
```

## 🔗 Connections

### Affected By
- **Tasks:** Completing tasks adds XP/Mana
- **Shop:** Spending reduces Coins/Gems
- **Profile:** Changing avatar/name

### Related Components
- `ProfileScreen` (Detailed stats)
