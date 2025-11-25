# Garden Screen

> **Estado:** ✅ Implementado (Fase 8 + Pan & Zoom)  
> **Última actualización:** 2025-11-23

## Descripción

Pantalla tipo "sandbox" donde el usuario organiza su jardín místico colocando plantas, mascotas y decoraciones en una grilla interactiva.

## Características Implementadas

### ✅ Sistema de Grid
- Grilla de **16x18 celdas** con posicionamiento preciso
- **21 zonas bloqueadas** (obstáculos del fondo)
- Validación de colisiones y límites
- Persistencia automática en AsyncStorage

### ✅ Pan & Zoom
- Pinch-to-zoom: **1x - 2.5x**
- Pan restringido a bordes de imagen
- Botón reset para vista original
- Implementado con `react-native-gesture-handler` + `reanimated`

### ✅ Inventario Real
- Soporte para **Pets (1x1)** y **Plantas (2x2)**
- Inventory Strip en modo edición
- Colocación desde inventario
- Remoción al inventario ("Guardar")

### ✅ UI
- Splash screen de carga (3s) con frases rotativas
- Escala visual: Pets 1.5x, Plantas 1.8x
- 32 plantas + 29 mascotas en catálogo

## Archivos Principales

- `src/screens/GardenScreen.js` - Pantalla principal
- `src/screens/GardenScreen.styles.js` - Estilos
- `src/constants/shopCatalog.js` - Assets y tamaños
- `src/state/AppContext.js` - Estado `garden.items`

## Pendientes

### Prioridad Alta
- [ ] Easter Eggs Integration (Fase 9)
- [ ] Animaciones de colocación/remoción
- [ ] Mejorar UI del Inventory Strip

### Refactoring
- [ ] Extraer componentes a `src/components/garden/`
- [ ] Separar lógica de grid
- [ ] Optimizar re-renders

## Documentación

- [Walkthrough Completo](./walkthrough.md) - Detalles de implementación
- [Roadmap Original](../ideas/garden-sandbox.md) - Plan completo de 11 fases

## Configuración Técnica

```javascript
// Grid
GRID_COLS = 16
GRID_ROWS = 18
GRID_OFFSET_TOP = 310
CELL_SIZE = (width - 40) / 16

// Zoom
MIN_SCALE = 1.0
MAX_SCALE = 2.5

// Tamaños
Pets: 1x1 (escala 1.5x)
Plantas: 2x2 (escala 1.8x)
```

## Assets

```
assets/
├── Garden/gardenexpand.png      # Fondo principal (1440x2560)
├── plants/                       # 31 plantas
├── pets/                         # 29 mascotas
└── Manabloomsplashes/jardin.png # Splash de carga
```

---

**Versión:** Phase 8 + Pan & Zoom  
**Próxima fase:** Easter Eggs (Phase 9)
