// [MB] Módulo: Garden / Sección: Wireframe
// Afecta: GardenScreen
// Propósito: Describir layout y jerarquía visual actuales del Jardín Místico
// Puntos de edición futura: actualizar cuando se extraigan componentes garden/* o cambie la lógica de grid
// Autor: Codex - Fecha: 2025-11-25

# Garden Screen Wireframe (v1 - Align con implementación actual)

## 1. Splash interno de carga
- Antes de mostrar el jardín completo:
  - Pantalla semi-transparente sobre el fondo con frases rotando:
    - “Pidiendo las llaves al jardinero...”
    - “Buscando a Cocoa...”
    - “Fertilizando las plantas...”
    - “Regando las flores...”
    - etc. (ver constante `GARDEN_LOADING_PHRASES`).
  - Duración típica: ~3 segundos (`LOADING_DURATION`).
  - Animación de opacidad (fade-in / fade-out).

## 2. Fondo del Jardín
- Imagen de fondo:
  - `assets/Garden/gardenexpand.png`.
- Ocupa toda la pantalla detrás de los elementos del grid.
- Capa base sobre la que se dibujan planta, mascotas y demás ítems.

## 3. Grid y Obstáculos
- Configuración:
  - GRID_COLS = 16, GRID_ROWS = 18.
  - CELL_SIZE calculado según ancho de pantalla y padding horizontal.
  - Offset vertical (GRID_OFFSET_TOP) para posicionar el grid sobre el fondo.
- Zonas bloqueadas:
  - Definidas en `BLOCKED_ZONES` (rectángulos de celdas que no pueden usarse).
- Propósito visual:
  - Representar caminos, paredes y zonas de interés donde no se pueden colocar ítems.

## 4. Ítems colocados (planta y mascotas)
- Mock inicial (`MOCK_ITEMS`):
  - Planta principal:
    - `id: plant_main`, tipo `plant`, nombre “Bonsai Astral”.
    - Imagen: `assets/plants/bonsai.png`.
    - Tamaño: `size: 2` (ocupa varias celdas).
  - Mascotas:
    - Cocoa, Merlin, Tokyo (sprites en `assets/pets`).
    - Cada una ubicada en coordenadas de grid distintas.
- Visual:
  - Cada ítem se posiciona usando `getGridPosition(col, row)` para convertir la celda en posición absoluta.
  - Tamaño basado en `size` (y futuros traits de grid).

## 5. Inventario disponible para colocar
- Fuente:
  - `inventory` desde AppContext + `GARDEN_ASSETS` y `SHOP_ITEM_TRAITS` desde `shopCatalog`.
- Lógica:
  - Calcula cuántos ítems de inventario (pets/seeds) quedan disponibles tras restar los ya colocados en el jardín.
  - Para cada SKU válido:
    - Busca imagen en `GARDEN_ASSETS`.
    - Determina tamaño de grid a partir de `SHOP_ITEM_TRAITS` (propiedad `grid`, ej. “1x1”, “2x2”).
- Visual:
  - Panel (actual o futuro) que lista las piezas disponibles para arrastrar/colocar en el jardín.

## 6. Gestos (Pan & Pinch)
- Implementado con `react-native-gesture-handler` y `react-native-reanimated`.
- Pan:
  - Permite desplazar el “viewport” del jardín cuando el usuario arrastra.
  - Limitado por un máximo de traslación según el nivel de zoom (no permite ver fuera del fondo).
- Pinch:
  - Permite hacer zoom in/out con límites:
    - Escala mínima: 1 (ajuste a pantalla).
    - Escala máxima: 2.5 (evitar pixelado y “black bars”).
- Reseteo:
  - Botón o gesto que resetea escala y traslaciones a valores por defecto.

## 7. UI de soporte (botones, overlays)
- Botones posibles (según implementación actual/futura):
  - Volver atrás (navegación).
  - Mostrar/ocultar grid.
  - Modo “colocar ítem” o “seleccionar”.
- Overlays:
  - Durante la fase de carga (splash).
  - Potencial overlay para mostrar detalles de un ítem seleccionado (nombre, descripción, estadísticas).

## Notas

- GardenScreen es actualmente monolítico; la intención futura es extraer:
  - `GardenGrid`, `GardenItem`, `GardenSplash` y otros en `src/components/garden/`.
- El wireframe describe la visión actual basada en mock + integración parcial con inventario; la lógica completa de “juego de jardín” se irá conectando con economía, logros y Easter Eggs (ver docs de ideas correspondientes).

