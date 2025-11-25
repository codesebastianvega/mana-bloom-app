// [MB] Modulo: Home / Seccion: MagicShopSection
// Afecta: HomeScreen (seccion Tienda)
// Proposito: Documentar layout, props y pendientes de la tienda en Home
// Puntos de edicion futura: actualizar acentos por categoria y CTA principal
// Autor: Codex - Fecha: 2025-11-25

# MagicShopSection

> **Componente:** `MagicShopSection`  
> **Ubicacion:** `src/components/home/MagicShopSection.js`  
> **Estado:** Activo en Home

## Layout
- Header con titulo y copy breve.
- Tabs horizontales (pociones, plantas, tools, cosmeticos, mascotas).
- Lista vertical de cards (preview de items) con imagen/emoji, titulo y precio.
- CTA inferior “Ver tienda completa” (full width, gradiente glass).

## Colores/Acentos
- Acento por categoria via `ShopColors[tab].pill`.
- Cards con fondo semitransparente y borde del acento.
- CTA adapta borde/gradiente al acento activo.

## Interaccion
- Tabs cambian `activeTab`.
- Cards abren `ShopScreen` en la tab activa.
- CTA abre `ShopScreen` en la tab activa.

## Pendientes / Notas
- Mantener alineacion con otros bloques (padding 0 y gap internos).
- Revisar assets/emoji de items segun catalogo real.
- Borrar botones debug (ya removido) si reaparecen por merge.

## Props relevantes
- Usa `SHOP_CATALOG`, `ShopColors`, `SHOP_ITEM_ASSET_MAP`.
- Navegacion: `ShopScreen` (`initialTab`).

## QA rapido
- Tabs visibles y scrolleables.
- Cards muestran titulo, costo y CTA de navegacion.
- CTA inferior usa acento correcto segun tab.
