// [MB] Módulo: Shop / Sección: Wireframe
// Afecta: ShopScreen
// Propósito: Describir layout y jerarquía visual actuales de la tienda
// Puntos de edición futura: actualizar cuando cambien categorías, catálogo o subs/pases
// Autor: Codex - Fecha: 2025-11-25

# Shop Screen Wireframe (v1 - Align con implementación actual y plan de catálogo)

## 1. Header de Tienda
- Contenido:
  - Título “Tienda mágica” o similar.
  - Información básica de recursos (mana, coins, gems).
  - Botón de cierre o navegación atrás según stack.

## 2. Tabs / Segmentos por categoría
- Categorías principales basadas en `SHOP_CATALOG`:
  - Semillas (Seeds).
  - Herramientas (Tools).
  - Cosméticos (Cosmetics).
  - Pociones (Potions).
  - Mascotas (Pets).
  - Suscripciones / Pases (Subs).
- Cada tab filtra el catálogo a la categoría correspondiente.

## 3. Grid/Listado de ítems
- Cada card de ítem (ShopItemCard) muestra:
  - Imagen/icono desde `shopAssets` o emoji placeholder.
  - Nombre del ítem.
  - Rareza (color/badge).
  - Costo:
    - En mana, coins, gems según configuración de `economyConfig`.
  - Helper contextual:
    - Si faltan recursos: mensaje de recursos insuficientes.
    - Si no faltan recursos: helper de tiempo de vida o descripción especial.

## 4. Lifespan y metadatos (especialmente mascotas)
- Para mascotas:
  - Campo `lifespan` según reglas de `docs/shop-lifespan-plan.md`:
    - Días → minutos en app.
    - Semanas → horas en app.
    - Meses → días en app.
    - Años → meses en app.
    - Especiales (Arturo, Cocoa, Tokyo, Merlín) → `special`.
    - Inmortales → `immortal`.
  - Helper textual en la card:
    - “Tiempo de vida: X”.
    - “Especial” o “Inmortal” según corresponda.
- Otras categorías:
  - Metadatos por categoría (caducidad, espacio en grid, usos, mantras) que se muestran en cards según disponibilidad.

## 5. Panel de Suscripciones y Pases
- Tab “Subs” o sección especial:
  - Plan “Mascota personal” en `SUBSCRIPTION_PLANS` (cuando esté conectado).
  - Packs de gemas y monedas:
    - Recargas rápidas (3 días, 1 semana).
    - Combos con mascotas + plantas.
  - CTA “Adquirir recursos”:
    - Navega al tab de subs/pases si se invoca desde otras pantallas (Home/Profile).

## 6. Integración con Inventario y Garden
- Al comprar un ítem:
  - Se agrega al inventario (`ADD_TO_INVENTORY`).
  - Para ítems equipables o de jardín:
    - Futuros flujos para equipar/colocar directamente desde la tienda.
  - Para packs/subs:
    - Acreditan recursos/buffs directo en wallet, inventario y AppContext.

## 7. Notas visuales
- Fondo con `fondomagicshop.png` o similar para hero/headers.
- Cards pueden usar badges de rareza (common, rare, epic, legendary).
- Consistencia con colores elementales cuando corresponda (por ejemplo, plantas/mascotas elementales).

## Notas

- El wireframe se apoya en la planificación de `docs/shop-lifespan-plan.md` y `docs/magic-shop-assets.md`.
- El estado actual del código puede estar parcial; se considera este documento como guía para terminar de alinear ShopScreen con el catálogo y las suscripciones.

