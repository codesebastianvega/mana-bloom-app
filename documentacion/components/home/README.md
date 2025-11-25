# Home Screen Components

> **Screen:** `HomeScreen`  
> **Location:** `src/screens/HomeScreen.js`  
> **Last Updated:** 2025-11-23

## 📋 Overview

La pantalla principal de Mana Bloom donde los usuarios ven su progreso, recompensas y desafíos diarios.

## 🧩 Components

### 1. HomeHeader
- Logo y menú hamburguesa
- Navegación al drawer

### 2. PromoBannerSlider
- Banners promocionales estilo Epic Games
- Auto-scroll cada 5 segundos
- CTAs para diferentes secciones

### 3. HomeHeroSection
**Título:** "Estado general"  
**Subtitle:** "Tu progreso, recursos y beneficios activos"

- Nivel y XP del usuario
- Recursos (Mana, Coins, Gems)
- Buffs activos

### 4. HomeRewardsSection
**Título:** "Recompensas"  
**Subtitle:** "Reclama tus bonos diarios y sociales"

- Recompensa diaria
- Racha (streak)
- Bonos sociales

### 5. DailyChallengesSection
**Título:** "Desafíos diarios"

- 3 desafíos aleatorios diarios
- Progreso y recompensas
- [Ver documentación completa](DailyChallenges.md)

## 🎨 Layout

```
┌─────────────────────────┐
│ Header                  │
├─────────────────────────┤
│ Promo Banner Slider     │
├─────────────────────────┤
│ Estado General          │
│ - Nivel, XP, Recursos   │
├─────────────────────────┤
│ Recompensas             │
│ - Diaria, Racha         │
├─────────────────────────┤
│ Desafíos Diarios        │
│ - 3 desafíos            │
└─────────────────────────┘
```

## 🔗 Connections

### Data Sources
- `AppContext` - Estado global
- `AsyncStorage` - Persistencia

### Navigation
- `TasksScreen` - Al completar tareas
- `PlantScreen` - Desde banner
- `ShopScreen` - Desde banner
- `ProfileScreen` - Desde header

## 📝 Recent Changes

### 2025-11-23
- Agregados subtítulos a secciones
- Optimizado spacing vertical
- Rediseñados desafíos diarios

---

*Ver componentes individuales para más detalles*
// [MB] Modulo: Home / Seccion: Documentacion componentes
// Afecta: HomeScreen
// Proposito: Resumen de secciones y docs de Home
// Puntos de edicion futura: actualizar cuando cambie layout o props
// Autor: Codex - Fecha: 2025-11-25

# Home Screen Components

> **Screen:** `HomeScreen`  
> **Location:** `src/screens/HomeScreen.js`  
> **Last Updated:** 2025-11-25

## Overview

Pantalla principal de Mana Bloom con progreso, recompensas, retos, tienda e inventario en vista rápida.

## Secciones y docs

- **HomeHeader** – Logo, estado actual y accesos (drawer/alerts).  
- **PromoBannerSlider** – Banners promocionales con CTA (slider). Ver `PromoBannerSlider.md`.
- **HomeHeroSection** – Nivel, XP y recursos (Mana, Coins, Gems) + buffs. Ver `HeroSection.md`.
- **HomeRewardsSection** – Racha y bonus; CTA de reclamar streak.  
- **DailyChallengesSection** – 3 retos diarios con barras y claim. Ver `DailyChallenges.md`.
- **MagicShopSection** – Tabs de tienda y cards de productos. Ver `MagicShopSection.md`.
- **InventorySection** – Slider de chips cuadrados (pociones, tools, cosméticos, plantas, mascotas).
- **EventHighlightsSection** – Línea de tiempo con eventos y CTA “Explorar calendario”.

## Layout actual (orden en Home)

1) Header  
2) Welcome Card (HomeWelcomeCard)  
3) Promo banners (PromoBannerSlider)  
4) Hero (HomeHeroSection: nivel, recursos, buffs)  
5) Recompensas (HomeRewardsSection: racha/claim)  
6) Desafíos diarios (DailyChallengesSection)  
7) Tienda mágica (MagicShopSection: tabs + cards + CTA)  
8) Inventario (InventorySection: slider horizontal)  
9) Eventos místicos (EventHighlightsSection)

## Pendientes

- **Logros:** mover `AchievementsSection` al Drawer (no se muestra en Home).  
- **DailyReward:** decidir reintroducción (modal en Drawer o card compacta junto a racha).  
- **Documentar nuevos componentes:** `MagicShopSection.md`, `InventorySection.md` (agregados).

## Conexiones

- Estado: `AppContext` (nivel, recursos, retos, racha).  
- Navegación: Tasks, Plant, Shop, Profile, Drawer/Modals según CTA.  
- Persistencia: `AsyncStorage` (retos diarios, progreso).

---

*Ver documentos individuales para detalles y props.*
