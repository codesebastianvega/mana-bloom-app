// [MB] Modulo: Home / Seccion: DailyChallengesSection
// Afecta: HomeScreen (retos diarios)
// Proposito: Documentar UI y flujo de desafios diarios
// Puntos de edicion futura: conectar timers reales y feed de retos
// Autor: Codex - Fecha: 2025-11-25

# Daily Challenges Section

> **Component:** `DailyChallengesSection`  
> **Location:** `src/components/home/DailyChallengesSection.js`  
> **Last Updated:** 2025-11-25

## Overview
Muestra 3 desafios diarios con progreso, recompensas y boton de reclamo. Header incluye CTA “Ver todos los desafios”.

## Features
- 3 desafios diarios (XP/Mana/Gema).
- Barra de progreso y contador `progress/goal`.
- Estado textual: “En progreso” o “Completada”.
- Boton “Reclamar” con gradiente (solo si cumple la meta).
- CTA en el header para ver la lista completa.

## Datos / Flujo
- Fuente: `AppContext` (`useDailyChallenges`).
- Regeneracion diaria via `generateDailyChallenges` (persistido en AsyncStorage).
- Claim: dispara `CLAIM_DAILY_CHALLENGE` y evento de logro.

## UI actual
- Header: titulo + CTA “Ver todos los desafios” (lila).
- Cards: icono, titulo, reward a la derecha, fila de estado + contador, barra de progreso y boton “Reclamar” (glass lila oscuro).

## Pendientes
- Mostrar countdown de reseteo (hoy omitido en UI).
- Conectar a feed remoto de retos/eventos si aplica.
- Opcional: confetti/haptics al reclamar.

## Conexiones
- Tareas completadas actualizan progreso.
- Persistencia: `@mana_bloom:daily_challenges`.
- Navegacion: CTA puede abrir vista completa de desafios (pendiente hook).
