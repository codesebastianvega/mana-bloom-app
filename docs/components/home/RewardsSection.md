# Rewards Section Component

> **Component:** `HomeRewardsSection`
> **Location:** `src/components/home/HomeRewardsSection.js`
> **Last Updated:** 2025-11-23

## 📋 Overview

Displays the user's daily login reward status and current streak. Encourages daily engagement.

## 🎯 Features

- ✅ Daily Reward Card (Claimable/Claimed)
- ✅ Streak Counter (Days in a row)
- ✅ Social Bonus (Referrals/Friends)

## 🏗️ Architecture

### Data Flow

```
AppContext (dailyReward, streak)
        ↓
HomeRewardsSection
        ↓
Claim Action -> AppContext Dispatch
```

## 🎨 UI Components

### Layout

```
┌──────────────┐  ┌──────────────┐
│  Daily Gift  │  │   Streak     │
│   [Claim]    │  │    🔥 5      │
└──────────────┘  └──────────────┘
```

## 🔗 Connections

### Affects
- **Economy:** Claiming adds resources
- **Streak:** Updates streak count

### Related Docs
- [Rewards System](../../mechanics/rewards-system.md)
