# Garden Screen - Walkthrough de Implementación

## ✅ Completado en esta sesión

### 1. Sistema de Grid (Fases 0-6 del roadmap)
- **Grid de 16x18 celdas** con posicionamiento preciso (`GRID_OFFSET_TOP = 310`)
- **Modo Edición** activable con botón "Editar Jardín"
- **Zonas bloqueadas** (21 zonas definidas en `BLOCKED_ZONES`) que impiden colocación de items
- **Selección y movimiento** de items con validación de colisiones
- **Persistencia** en `AppContext` y `AsyncStorage` (automática)

**Archivos modificados:**
- `src/screens/GardenScreen.js`
- `src/state/AppContext.js` - Estado `garden.items`
- `src/storage.js` - `getGardenState()`, `setGardenState()`

### 2. Pan & Zoom (Fase 7 del roadmap)
- **Pinch-to-zoom** con límites: 1x (mínimo) a 2.5x (máximo)
- **Pan (arrastre)** restringido a los bordes de la imagen
- **Botón Reset** para volver a la vista original
- Gestos implementados con `react-native-gesture-handler` y `react-native-reanimated`

**Problemas resueltos:**
- Grid que se movía con el zoom (removida `SafeAreaView` interna)
- Bordes negros al alejar (límite mínimo 1x)
- Pixelación excesiva al acercar (límite máximo 2.5x)

### 3. Inventario Real (Fase 8 del roadmap)
- **InventoryStrip** en la parte inferior (Edit Mode)
- Soporte para **Pets (1x1)** y **Plantas (2x2)**
- Cálculo dinámico: `Inventario Total - Items Colocados = Items Disponibles`
- **Colocación** desde inventario al grid
- **Remoción** de items del grid al inventario ("Guardar")

**Catalogación:**
- **32 plantas** agregadas a `GARDEN_ASSETS` (seeds)
- **29 pets** ya existentes
- Tamaños definidos en `SHOP_ITEM_TRAITS`: `pets.__default__ = 1x1`, `seeds.__default__ = 2x2`

**Archivos modificados:**
- `src/constants/shopCatalog.js` - Agregados assets de plantas

### 4. Mejoras de UI
- **Escala visual mejorada**: Pets 1.5x, Plantas 1.8x (escala del usuario)
- **Splash Screen** de carga con `jardin.png` y frases rotativas:
  - "Pidiendo las llaves al jardinero..."
  - "Buscando a Cocoa..."
  - "Fertilizando las plantas..."
  - 7 frases en total, rotan cada 1 segundo durante 3 segundos

### 5. Bugs Corregidos
- **InventoryScreen Error**: Fixed `TypeError: Cannot read property 'toLowerCase' of undefined`
  - Causa: Items sin `title` property
  - Solución: Optional chaining `(it.title || "")` en línea 84

---

## 🚧 Pendiente para próxima sesión

### Prioridad Alta
1. **Easter Eggs Integration (Fase 9)**
   - Leer `easterEggs.unlocked` del contexto
   - Agregar decoraciones especiales al inventario (estatuas, auras)
   - Efectos visuales (glow, partículas) cuando eggs están desbloqueados

2. **Polish & Performance (Fase 11)**
   - Animaciones de colocación/remoción de items
   - Mejorar UI del Inventory Strip (iconos de categoría, tabs)
   - Optimizar re-renders (React.memo, useMemo)

### Prioridad Media
3. **Movimiento de Pets (No está en roadmap original)**
   - Paths simples sobre el grid
   - Animación de caminar/flotar

4. **Temas de Jardín (Expandir Fase 2)**
   - Fondos alternativos (zen, desierto, noche)
   - Cambio de tema sin perder layout

### Nice to Have
5. **Expansión de Terreno**
   - Sistema de "parcelas" desbloqueables
   - Inicio: 3x3 central, expandir a 6x6 completo

6. **Presets de Garden**
   - Guardar/cargar layouts
   - "Garden Gallery" para inspiración

---

## 📁 Estructura de Archivos Actual

```
src/
├── screens/
│   ├── GardenScreen.js          // ⭐ Pantalla principal + splash
│   ├── GardenScreen.styles.js   // Estilos
│   └── InventoryScreen.js       // Fixed title bug
├── components/
│   └── garden/                  // TODO: Componentes reutilizables
├── constants/
│   └── shopCatalog.js           // ⭐ +32 plantas en GARDEN_ASSETS
├── state/
│   └── AppContext.js            // Estado garden.items
└── storage.js                   // Persistencia garden

assets/
├── Garden/
│   └── gardenexpand.png         // Fondo principal
├── plants/                      // ⭐ 31 assets de plantas
└── Manabloomsplashes/
    └── jardin.png               // Splash de carga
```

---

## 🔧 Configuración Técnica

### Grid Constants
```javascript
GRID_COLS = 16
GRID_ROWS = 18
GRID_OFFSET_TOP = 310  // Ajustado por usuario
CELL_SIZE = (width - 40) / 16
```

### Zoom Limits
```javascript
MIN_SCALE = 1.0   // No black borders
MAX_SCALE = 2.5   // Prevent pixelation
```

### Item Sizes
```javascript
Pets:   1x1 cells, visual scale 1.5x
Plants: 2x2 cells, visual scale 1.8x
```

---

## 🐛 Bugs Conocidos / Limitaciones

1. **Plantas no tienen assets mapeados completamente**
   - Solo ~15 de las plantas del catálogo tienen imágenes
   - Falta mapear semillas a sus respectivos assets en `GARDEN_ASSETS`

2. **No hay validación de "maxInstances"**
   - Actualmente puedes colocar infinitos items si los tienes
   - Fase 8 del roadmap menciona esto pendiente

3. **Grid no se adapta a diferentes tamaños de pantalla**
   - Funciona en móvil, pero no probado en tablets
   - Podría necesitar `Dimensions` dinámicos

4. **Eggs no implementados**
   - No hay assets de huevos en el proyecto
   - Pendiente agregar categoría "eggs" al shop catalog

---

## 🎯 Próximos Pasos Recomendados

Para la próxima sesión, sugiero este orden:

1. **Mejorar Inventory Strip UI** (1-2h)
   - Agregar tabs para filtrar (Pets / Plantas)
   - Iconos de categoría más claros
   - Botón "+" para agregar más pets/plantas (debug)

2. **Easter Eggs Decorations** (2-3h)
   - Definir qué easter eggs desbloquean qué decoraciones
   - Crear sistema de "decor exclusivo"
   - Efectos visuales sutiles (partículas, glow)

3. **Animaciones de Colocación** (1h)
   - Fade in al colocar item
   - Bounce effect al soltar
   - Mejora la UX significativamente

4. **Testing & Bug Fixes** (1h)
   - Probar en diferentes dispositivos
   - Verificar persistencia entre sesiones
   - Ajustar grid offset si es necesario

---

## 📝 Notas Técnicas

### Para Agregar Nuevas Plantas
1. Agregar asset en `/assets/plants/`
2. Mapear en `GARDEN_ASSETS` de `shopCatalog.js`
3. Si necesita tamaño custom, agregar en `SHOP_ITEM_TRAITS.seeds`

### Para Agregar Nuevas Mascotas
1. Agregar asset en `/assets/pets/`
2. Mapear en `GARDEN_ASSETS`
3. Tamaño default es 1x1

### Para Modificar Zonas Bloqueadas
Editar array `BLOCKED_ZONES` en `GardenScreen.js`:
```javascript
{ c1: colInicio, r1: rowInicio, c2: colFin, r2: rowFin }
```

---

**Documentado:** 2025-11-23  
**Versión del Garden:** Phase 8 + Pan & Zoom  
**Estado:** ✅ Funcional, listo para expansión
