// [MB] Módulo: Docs / Sección: Plan de tienda
// Afecta: ShopScreen y catálogos de SHOP_CATALOG
// Propósito: Registrar checklist de vida útil y pendientes del catálogo
// Puntos de edición futura: Actualizar cuando se sumen categorías, assets o planes premium
// Autor: Codex - Fecha: 2025-11-21

# Shop Lifespan Plan

- [x] Paso 1 - Estrategia general
  - Mantener el catálogo ordenado por rareza en `src/constants/shopCatalog.js`.
  - Centralizar assets en `src/constants/shopAssets.js`.
  - `ShopItemCard` muestra costos según rareza y helper contextual (recursos faltantes o tiempo de vida).

- [x] Paso 2 - Mascotas: lógica de tiempo de vida y helper
  - Agregar `lifespan` por mascota con estas reglas:
    - Vive días → equivale a minutos dentro de la app.
    - Vive semanas → equivale a horas en la app.
    - Vive meses → equivale a días en la app.
    - Vive años → equivale a meses en la app.
    - Especiales (Arturo, Cocoa, Tokyo, Merlín) → `special` (no expiran, pero no son “inmortales”).
    - Inmortales (hada, espíritu, etc.) → `immortal`.
  - Helper en la card (cuando no faltan recursos) debe mostrar “Tiempo de vida: X” o “Especial/Inmortal”.

- [x] Paso 3 - Otras categorías
  - [x] Seeds reorganizados y ligados a assets disponibles.
  - [x] Tools reorganizados con assets y costos actualizados.
  - [x] Cosmetics reorganizados con assets y costos actualizados.
  - [x] Potions reorganizadas con copys/costos alineados a rareza y assets reales.
  - [x] Mapear sus assets en `shopAssets` (emoji placeholder cuando no exista PNG).
  - [x] Añadir metadatos por categoría (caducidad, espacio en grid, usos, mantras) y mostrarlos en las cards con inventario en tiempo real.
  - [x] Documentado que las plantas no expiran; sólo morirán con plagas futuras en el sandbox editable.

- [x] Paso 4 - Planes premium / packs personalizados
  - Añadido plan “Mascota personal” en `SUBSCRIPTION_PLANS` con perks exclusivos.
  - Añadidos packs de gemas y monedas para recargas rápidas y combos (3 días / 1 semana / mascotas + plantas).
  - Las activaciones acreditan recursos/buffs directo en inventario, wallet y estado global.
  - CTA “Adquirir recursos” envía al tab de suscripciones (subs) para contratar el plan o comprar packs.

## Próximos pasos

- [ ] Persistir y aprovechar buffs nuevos (`plant_happiness`, `streak_shield`, etc.) para que afecten XP/felicidad/racha.
- [ ] Integrar telemetría o backend real para registrar compras de packs/Suscripciones cuando exista pasarela.
- [ ] Auditar assets/cartas pendientes: quedan PNG de herramientas decorativas sin carta y algunas cards (ej. placeholders cosméticos legacy) por eliminar hasta que haya arte definitivo.
