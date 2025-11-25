// [MB] Modulo: Home / Seccion: InventorySection
// Afecta: HomeScreen (slider inventario)
// Proposito: Documentar slider de inventario y estados
// Puntos de edicion futura: decidir si se expande a modal o grid
// Autor: Codex - Fecha: 2025-11-25

# InventorySection

> **Componente:** `InventorySection`  
> **Ubicacion:** `src/components/home/InventorySection.js`  
> **Estado:** Activo en Home (slider horizontal)

## Layout
- Header con lock + titulo “Inventario” y CTA “Abrir”.
- Slider horizontal sin paginador; chips rectangulares (104x64).
- Contenido de cada chip: icono + numero (fila) y label debajo.

## Colores
- Fondo/borde: blanco translúcido (`rgba(255,255,255,0.08/0.22)`).
- Texto/icono: blanco; borde usa el acento de categoria para contraste sutil.
- Acento solo en borde (no en fondo) para uniformidad con recursos.

## Categorias (orden actual)
- Pociones (flask)  
- Herram. (wrench)  
- Cosmeticos (brush)  
- Plantas (leaf)  
- Mascotas (paw)

## Interaccion
- Tap en chip -> `onGoToShop` (scroll a tienda en Home).
- CTA “Abrir” -> `InventoryModal`.

## Pendientes / Ideas
- Revisar orden/datos reales (fuente AppContext).
- Si se requiere grid 3x2 nuevamente, ajustar `width/height` y `flexWrap`.
- Agregar contador de seeds/otros si se habilitan nuevas categorias.
