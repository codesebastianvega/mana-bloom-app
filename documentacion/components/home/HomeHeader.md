// [MB] Modulo: Home / Seccion: HomeHeader
// Afecta: HomeScreen (encabezado)
// Proposito: Documentar layout, props y comportamiento del header
// Puntos de edicion futura: popover de chips, estados de usuario y safe area
// Autor: Codex - Fecha: 2025-11-25

# HomeHeader

> **Componente:** `HomeHeader`  
> **Ubicacion:** `src/components/home/HomeHeader.js`  
> **Estado:** Activo (sticky en Home)

## Overview
Encabezado fijo con branding, estado del usuario y accesos rápidos (drawer/notificaciones). Respeta safe area.

## Layout
- Fila principal: logo, título “Mana Bloom”, acciones (notificaciones, menú).
- Chip de estado: nombre + estado de planta (floreciendo) con color/acento.
- Maneja safe area y scroll (ref desde HomeScreen).

## Interaccion
- Tap en menú -> abre drawer.
- Tap en campana -> abre notificaciones (ruta según navigator).
- Chip de estado: solo display (sin CTA hoy).
- Expone `onChipPopoverToggle` para ocultar scroll/elementos al abrir popover.

## Pendientes / Notas
- Unificar iconos con pack actual (Material vs Ionicons).
- Ajustar offsets si notch alto (usar safe-area).
- Añadir CTA opcional en chip (ej. “Ver perfil / estado planta”).
