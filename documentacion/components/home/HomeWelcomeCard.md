// [MB] Modulo: Home / Seccion: HomeWelcomeCard
// Afecta: HomeScreen (tarjeta hero bienvenida)
// Proposito: Documentar layout y props de la tarjeta de bienvenida
// Puntos de edicion futura: animaciones, avatar y KPIs dinamicos
// Autor: Codex - Fecha: 2025-11-25

# HomeWelcomeCard

> **Componente:** `HomeWelcomeCard`  
> **Ubicacion:** `src/components/home/HomeWelcomeCard.js`  
> **Estado:** Activo en Home

## Overview
Tarjeta hero de bienvenida con avatar, saludo, frase y KPIs de tareas/hábitos/retos, más CTA a Tasks.

## Layout
- Avatar circular con estado online.
- Titulo “¡Hola, {name}!” y frase secundaria.
- KPIs en fila (tareas, hábitos, retos).
- CTA primario “Ir a mis tareas”.
- Fondos con gradiente/glow y borde sutil.

## Interaccion
- CTA: navega a Tasks (`onNext` prop).
- KPIs son solo display (sin tap actual).

## Tokens / Estilo
- Usa `Colors`, `Spacing`, `Radii` del tema.
- Gradientes/blur internos para estilo glass.

## Pendientes / Notas
- Atar datos reales (tareas pendientes, hábitos, retos).
- Revisar tamaños de avatar y status para notch alto.
- Animaciones ligeras (entrada/stagger) opcionales.
