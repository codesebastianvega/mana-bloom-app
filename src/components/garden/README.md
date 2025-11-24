# Garden Components

Esta carpeta contiene componentes reutilizables específicos para el Garden Screen.

## Componentes Planeados

### GardenGrid
- Renderiza la cuadrícula visual del jardín
- Maneja zonas bloqueadas
- Props: `rows`, `cols`, `cellSize`, `blockedZones`, `onCellPress`

### InventoryStrip
- Barra inferior con items disponibles del inventario
- Tabs para filtrar categorías (Pets, Plantas, Decor)
- Props: `availableItems`, `onItemSelect`, `selectedItem`

### GardenItem
- Componente individual para cada item en el jardín
- Maneja selección, drag, animaciones
- Props: `item`, `isSelected`, `onPress`, `scaleFactor`

### GardenSplash
- Splash screen de carga con frases rotativas
- Props: `phrases`, `duration`, `onComplete`

## Estado Actual

**Actualmente todos los componentes están embebidos en `GardenScreen.js`.**

### TODO (Refactoring)
- [ ] Extraer InventoryStrip a componente separado
- [ ] Crear GardenItem component
- [ ] Separar lógica del grid
- [ ] Mover splash a componente reutilizable

## Estructura Propuesta

```
src/components/garden/
├── GardenGrid.js
├── GardenItem.js
├── InventoryStrip.js
├── GardenSplash.js
└── README.md (este archivo)
```

---

**Creado:** 2025-11-23  
**Estado:** 📋 Planeado, pendiente refactoring
