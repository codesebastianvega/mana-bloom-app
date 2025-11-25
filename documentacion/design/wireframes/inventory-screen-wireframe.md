// [MB] Módulo: Inventory / Sección: Wireframe
// Afecta: InventoryScreen
// Propósito: Describir layout y jerarquía visual actuales del inventario completo
// Puntos de edición futura: actualizar cuando se añadan nuevas categorías o acciones
// Autor: Codex - Fecha: 2025-11-25

# Inventory Screen Wireframe (v1 - Align con implementación actual)

## 1. Header de navegación
- Componente: header nativo + botón de cierre (modal).
- Contenido:
  - Título “Inventario”.
  - Botón para cerrar y volver a la pantalla anterior (Modal).

## 2. Tabs por categoría
- Tabs horizontales:
  - Pociones (`potions`).
  - Semillas (`seeds`).
  - Herramientas (`tools`).
  - Cosméticos (`cosmetics`).
  - Mascotas (`pets`).
  - Todos (`all`).
- Comportamiento:
  - Filtran la lista según categoría.
  - Tab `all` muestra todos los ítems.

## 3. Buscador
- Input de texto en la parte superior de la lista:
  - Placeholder: búsqueda por nombre/título.
  - Filtra la lista por coincidencias en `title` (case-insensitive).

## 4. Resumen de conteo (interno)
- No necesariamente visible como UI separada, pero conceptualmente:
  - `useInventoryCounts()` calcula cuántos ítems hay por categoría.
  - Puede usarse para badges o contadores en tabs (futuro).

## 5. Lista de Ítems
- Orden:
  - Ítems ordenados por `quantity` (desc) y luego por `createdAt` (desc).
- Por cada ítem:
  - Icono de categoría (emoji por categoría).
  - Título (nombre del ítem).
  - SKU (texto pequeño).
  - Cantidad (`xN`).
  - Acciones:
    - `Usar` (si se puede usar).
    - `Descartar`.
- Estilos:
  - Tarjeta con borde y sombra sutil basada en el color de acento de la categoría.
  - Botones de acción con colores derivados del mismo acento.

## 6. Acciones `Usar` y `Descartar`
- Usar:
  - Llama a `CONSUME_ITEM` en AppContext.
  - Casos especiales:
    - Pociones específicas (`shop/potions/p1`, `p2`) disparan buffs:
      - XP x2 por 2 horas, o `+100 mana`.
    - Muestra `Alert` confirmando efecto aplicado.
- Descartar:
  - Muestra `Alert` de confirmación (“Eliminar 1 unidad?”).
  - En caso afirmativo, llama a `DISCARD_ITEM`.

## 7. Estados vacíos y feedback
- Si no hay ítems que coincidan con el filtro:
  - Mostrar un mensaje de estado vacío (“No hay ítems en esta categoría” u otro texto amigable).
- Errores:
  - Se manejan principalmente con logs de consola para debugging, y ocasionalmente con `Alert`.

## Notas

- InventoryScreen sirve como vista detallada, complementando el resumen de `InventorySection` en Home.
- Es un candidato natural para integrarse con Garden y Shop (equipar/colocar ítems desde aquí en futuras iteraciones).

