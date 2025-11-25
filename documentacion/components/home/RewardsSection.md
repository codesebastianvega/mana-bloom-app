// [MB] Modulo: Home / Seccion: HomeRewardsSection
// Afecta: HomeScreen (racha/claim)
// Proposito: Documentar bloque de recompensas y pendientes
// Puntos de edicion futura: decidir reintroduccion de daily reward separado
// Autor: Codex - Fecha: 2025-11-25

# Rewards Section Component

> **Component:** `HomeRewardsSection`  
> **Location:** `src/components/home/HomeRewardsSection.js`  
> **Last Updated:** 2025-11-25

## Overview
Bloque de racha con bono reclamable. El daily reward antiguo no se monta aqui (pendiente definir destino).

## Features
- Titulo de racha (“Racha de N dias”) y subtitulo dinamico.
- Texto de bono (ej. “+50 Mana”).
- Boton “Reclamar” con gradiente naranja/rojo cuando esta disponible; badge “Reclamado” si ya se tomo.
- Link a recompensas sociales.

## Datos / Props
- `rewardState`: `"available" | "claimed" | "pending"`.
- `streakCount`: numero de dias.
- `rewardLabel`: texto del bono.
- `onClaimReward`: handler de reclamo.
- `onPressSocial`: abre recompensas sociales.
- `isHydrating`: muestra placeholder.

## UI
- Card con gradiente oscuro y borde suave.
- Icono de fuego, titulo de racha, subtitulo + texto de bono.
- Boton gradiente o badge de reclamo.
- Link “Ver recompensas sociales”.

## Pendientes
- Decidir reintroduccion del daily reward (card separada o modal/Drawer).
- Agregar confetti/haptics al claim.

## Conexiones
- Economia: reclama recursos.
- Streak: actualiza contador de racha.
- Relacion: ver `mechanics/rewards-system.md`.
