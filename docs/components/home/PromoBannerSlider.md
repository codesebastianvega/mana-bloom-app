# Promo Banner Slider Component

> **Component:** `PromoBannerSlider`
> **Location:** `src/components/home/PromoBannerSlider.js`
> **Last Updated:** 2025-11-23

## 📋 Overview

A dynamic, auto-scrolling slider that highlights key features, events, or premium offers. Designed with a premium "Epic Games" aesthetic.

## 🎯 Features

- ✅ Auto-scroll (5 seconds)
- ✅ Pagination Dots
- ✅ Gradient Overlays & Typography
- ✅ Deep Linking (Navigation to other screens)

## 🏗️ Architecture

### Data Source
Currently uses static data defined within the component.
*Future:* Fetch from remote config/backend.

### Slides
1. **Garden:** Promotes Plant Screen
2. **Premium:** Promotes Shop/Premium
3. **Events:** Promotes special events

## 🎨 UI Components

### Layout

```
┌──────────────────────────────────┐
│  [ Background Image ]            │
│  Title                           │
│  Subtitle                        │
│  [CTA Button]                    │
│            ● ○ ○                 │
└──────────────────────────────────┘
```

## 🔗 Connections

### Navigation
- Navigates to `PlantScreen`, `ShopScreen`, etc.
