// [MB] Modulo: Home / Seccion: EventHighlightsSection
// Afecta: HomeScreen (eventos misticos)
// Proposito: Documentar timeline de eventos y CTA de calendario
// Puntos de edicion futura: conectar a API y variantes por temporada
// Autor: Codex - Fecha: 2025-11-25

# EventHighlightsSection

> **Componente:** `EventHighlightsSection`  
> **Ubicacion:** `src/components/home/EventHighlightsSection.js`  
> **Estado:** Activo en Home

## Overview
Bloque de “Eventos Místicos” con timeline de 3 items, puntos conectados y CTA “Explorar Calendario”.

## Layout
- Header: título + icono calendario.
- Timeline: puntos con conector vertical, titulo y fecha; badge “Temporada” en azul.
- Divisor + CTA centrado.
- Fondo con gradiente azul translúcido y borde tenue.

## Interaccion
- Tap en CTA -> navega a `EventsCalendarModal` o `NewsInboxModal` según disponibilidad.
- Items hoy son estáticos (mock); pendientes datos reales.

## Estilo
- Gradiente glass azul, borde azul.
- Dots usan `CategoryAccents` (potions/cosmetics/tools).
- Badge “Temporada” en `Colors.secondary`.

## Pendientes
- Conectar a feed real de eventos.
- Variar colores por temporada.
- Ajustar padding si se integran ilustraciones de fondo.
