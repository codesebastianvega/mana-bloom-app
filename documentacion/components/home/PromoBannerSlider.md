// [MB] Modulo: Home / Seccion: PromoBannerSlider
// Afecta: HomeScreen (banners)
// Proposito: Documentar slider de banners con CTA
// Puntos de edicion futura: conectar a feed remoto y assets definitivos
// Autor: Codex - Fecha: 2025-11-25

# Promo Banner Slider Component

> **Component:** `PromoBannerSlider`  
> **Location:** `src/components/home/PromoBannerSlider.js`  
> **Last Updated:** 2025-11-25

## Overview
Slider auto-scroll de banners promocionales (jardín, tienda, eventos) con estilo glass/gradiente y CTA por banner.

## Features
- Auto-scroll cada 5s y swipe manual.
- Paginación con dots.
- Gradientes y textura ligera en los banners.
- CTA por banner con deep link (Shop, Plant, Inventory, etc.).

## Data / Arquitectura
- Fuente actual: datos estáticos en el componente (titulo, subtitulo, CTA, gradiente/asset).
- Futuro: remote config/backend para contenido dinámico.

## UI
- Card con gradiente y opción de imagen de fondo.
- Título + subtítulo + CTA (pill).
- Dots centrados bajo el slider.

## Navegación
- CTA abre la pantalla correspondiente: `ShopScreen`, `PlantScreen`, `Inventory`, `Events`, según el banner activo.

## Pendientes
- Sustituir mocks por assets finales.
- Hookear a feed remoto y permitir orden dinámico de banners.
