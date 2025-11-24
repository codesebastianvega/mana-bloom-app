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
