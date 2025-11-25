# Tab Bar Component

> **Component:** `TabBar`
> **Location:** `src/components/TabBar.js`
> **Last Updated:** 2025-11-23

## 📋 Overview

The main navigation bar at the bottom of the screen. Uses a floating "Glassmorphism" design.

## 🎯 Features

- ✅ Navigation between main screens (Home, Tasks, Plant, Profile)
- ✅ Active state indication (Glow/Color)
- ✅ Floating design (doesn't touch bottom edge)
- ✅ Blur effect background

## 🏗️ Architecture

### Navigation
Uses `react-navigation` props to handle screen switching.

## 🎨 UI Components

### Layout

```
   [Home]  [Tasks]  [Plant]  [Profile]
(Floating Glass Bar with Blur Background)
```

## 🔗 Connections

### Related Components
- `AppNavigator` (Main navigation config)
