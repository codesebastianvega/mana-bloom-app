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
// [MB] Modulo: Home / Seccion: HeroSection
// Afecta: HomeScreen (bloque de nivel/recursos)
// Proposito: Documentar layout y datos del estado general
// Puntos de edicion futura: fuentes reales de XP, recursos y buffs
// Autor: Codex - Fecha: 2025-11-25

# Hero Section Component

> **Component:** `HomeHeroSection`  
> **Location:** `src/components/home/HomeHeroSection.js`  
> **Last Updated:** 2025-11-25

## Overview
Bloque de estado general: muestra nivel, XP y recursos (Mana, Coins, Gems) con un vistazo a buffs activos.

## Features
- Card de nivel: numero grande, XP actual/meta y barra gradiente.
- Recursos: chips compactos para Mana, Coins y Gems (color por tipo).
- Buffs: lista/resumen de buffs activos con tiempo restante (mock si no hay datos).

## Layout (UI actual)
- Nivel: card grande con borde sutil, titulo “Nivel”, numero destacado y barra XP.
- Recursos: fila de 3 chips (icono + valor).
- Buffs: chip/resumen debajo (texto concatenado de buffs activos).

## Datos
- Fuente: `AppContext` (`useProgress`, `useAppState`, `useWallet`, `useActiveBuffs`).
- XP: `xp`, `xpGoal`, `progress` (0..1).
- Recursos: `mana`, `coin`, `gem`.
- Buffs: `buffsActive` (type, expiresAt).

## Pendientes
- Conectar a datos definitivos de backend.
- Ajustar gradientes por rareza del buff.
- Animaciones de entrada opcionales.
