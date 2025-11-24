# 🚀 Plan de Optimización - Mana Bloom App

> **Fecha de creación:** 2025-11-24  
> **Análisis base:** Ver `docs/analysis/code_analysis.md`  
> **Estado actual:** 7/10 → **Objetivo:** 9/10

---

## 📋 Índice

1. [Resumen Ejecutivo](#resumen-ejecutivo)
2. [Fase 0: Preparación](#fase-0-preparación-hoy)
3. [Fase 1: Refactorización Crítica](#fase-1-refactorización-crítica)
4. [Fase 2: Mejoras de Calidad](#fase-2-mejoras-de-calidad)
5. [Fase 3: Optimización de Rendimiento](#fase-3-optimización-de-rendimiento)
6. [Fase 4: Testing y Documentación](#fase-4-testing-y-documentación)
7. [Fase 5: Arquitectura Escalable](#fase-5-arquitectura-escalable)
8. [Checklist de Progreso](#checklist-de-progreso)

---

## 🎯 Resumen Ejecutivo

### Problemas Principales Identificados
- **6 problemas críticos** (archivos monolíticos, código duplicado)
- **8 problemas importantes** (console.log, TODOs, falta de tipos)
- **6 mejoras recomendadas** (organización, tests, i18n)

### Archivos Más Críticos
1. `src/state/AppContext.js` - 946 líneas (dividir en 4 contextos)
2. `src/screens/ShopScreen.js` - 1136 líneas (extraer hooks/servicios)
3. `src/screens/TasksScreen.js` - 710 líneas (dividir componentes)
4. `src/constants/shopCatalog.js` - 466 líneas (migrar a JSON)

### Tiempo Estimado Total
**8 semanas** de trabajo enfocado (puede variar según dedicación)

---

## 🔧 Fase 0: Preparación (HOY)

### Objetivo
Arreglar bugs críticos y establecer estándares antes de refactorizar.

### Tareas

#### ✅ 0.1 Eliminar código duplicado en AppContext.js
**Prioridad:** CRÍTICA  
**Tiempo estimado:** 5 minutos  
**Archivos afectados:** `src/state/AppContext.js`

**Problema:**
```javascript
// Línea 590 (DUPLICADA)
dispatch({ type: "SET_ACHIEVEMENTS", payload: storedAchievements });
dispatch({ type: "SET_ACHIEVEMENTS", payload: storedAchievements }); // ← Eliminar
```

**Solución:**
1. Abrir `src/state/AppContext.js`
2. Ir a línea 590
3. Eliminar la línea duplicada
4. Guardar y verificar que la app funciona

**Commit sugerido:**
```
fix: remove duplicate SET_ACHIEVEMENTS dispatch in AppContext

- Removed duplicate line 590 in hydration effect
- No functional changes, just cleanup
```

---

#### ✅ 0.2 Crear guía de estándares de código
**Prioridad:** ALTA  
**Tiempo estimado:** 15 minutos  
**Archivo a crear:** `docs/CODING_STANDARDS.md`

**Contenido:**
- Formato de headers `[MB]` para todos los archivos
- Convenciones de nomenclatura
- Estructura de componentes
- Reglas de imports
- Patrones de estado

**Template de header estándar:**
```javascript
// [MB] Módulo: [Nombre] / Archivo: [Nombre]
// Afecta: [Qué partes de la app]
// Propósito: [Para qué sirve]
// Puntos de edición futura: [Mejoras posibles]
// Autor: [Nombre] - Fecha: [YYYY-MM-DD]
```

---

#### ✅ 0.3 Crear estructura de documentación
**Prioridad:** MEDIA  
**Tiempo estimado:** 10 minutos

**Carpetas a crear:**
```
docs/
├── analysis/          # Análisis de código
├── architecture/      # Diagramas y diseño
├── guides/           # Guías de desarrollo
└── standards/        # Estándares y convenciones
```

---

## 🔨 Fase 1: Refactorización Crítica (2-3 semanas)

### Objetivo
Dividir archivos monolíticos en módulos manejables.

---

### 📦 1.1 Refactorizar AppContext.js

**Prioridad:** CRÍTICA  
**Tiempo estimado:** 1 semana  
**Archivos afectados:** `src/state/AppContext.js` (946 líneas)

#### Problema
- Un solo contexto maneja TODO el estado global
- 30+ tipos de acciones en un reducer
- 14 useEffect diferentes
- Difícil de mantener y testear

#### Solución: Dividir en 4 contextos especializados

##### 1.1.1 Crear EconomyContext
**Archivo:** `src/state/contexts/EconomyContext.js`

**Responsabilidades:**
- Mana
- Wallet (coins, gems)
- XP y niveles
- Buffs

**Acciones a migrar:**
- `SET_MANA`
- `SET_WALLET`
- `ADD_COIN`, `SPEND_COIN`
- `ADD_GEM`, `SPEND_GEM`
- `SET_PROGRESS`
- `APPLY_TASK_REWARD`
- `ACTIVATE_BUFF`
- `CLEAN_EXPIRED_BUFFS`
- `SET_BUFFS`

**Pasos:**
1. Crear archivo `src/state/contexts/EconomyContext.js`
2. Copiar reducer y estado relacionado con economía
3. Crear hooks: `useEconomy()`, `useWallet()`, `useMana()`
4. Migrar componentes uno por uno
5. Eliminar código del AppContext original

**Estimado:** 2 días

---

##### 1.1.2 Crear ChallengesContext
**Archivo:** `src/state/contexts/ChallengesContext.js`

**Responsabilidades:**
- Daily challenges
- Daily rewards
- Achievements
- Streak

**Acciones a migrar:**
- `SET_DAILY_CHALLENGES`
- `UPDATE_DAILY_CHALLENGES_ON_TASK_DONE`
- `CLAIM_DAILY_CHALLENGE`
- `SET_DAILY_REWARD`
- `CLAIM_TODAY_REWARD`
- `SET_ACHIEVEMENTS`
- `ACHIEVEMENT_EVENT`
- `CLAIM_ACHIEVEMENT`
- `CLEAR_ACHIEVEMENT_TOAST`
- `SET_STREAK`
- `SET_LAST_CLAIM_DATE`

**Pasos:**
1. Crear archivo `src/state/contexts/ChallengesContext.js`
2. Migrar lógica de generación de challenges
3. Crear hooks: `useChallenges()`, `useAchievements()`, `useStreak()`
4. Actualizar componentes que usan challenges
5. Limpiar AppContext

**Estimado:** 2 días

---

##### 1.1.3 Crear InventoryContext
**Archivo:** `src/state/contexts/InventoryContext.js`

**Responsabilidades:**
- Inventario de items
- Compras
- Consumo de items

**Acciones a migrar:**
- `SET_INVENTORY`
- `ADD_TO_INVENTORY`
- `CONSUME_ITEM`
- `DISCARD_ITEM`
- `PURCHASE_WITH_MANA`

**Pasos:**
1. Crear archivo `src/state/contexts/InventoryContext.js`
2. Migrar lógica de inventario
3. Crear hooks: `useInventory()`, `useCanAfford()`
4. Actualizar ShopScreen y componentes relacionados
5. Limpiar AppContext

**Estimado:** 1 día

---

##### 1.1.4 Crear GardenContext
**Archivo:** `src/state/contexts/GardenContext.js`

**Responsabilidades:**
- Estado del jardín
- Items plantados
- Mascotas

**Acciones a migrar:**
- `SET_GARDEN_ITEMS`
- `SET_PLANT_STATE`

**Pasos:**
1. Crear archivo `src/state/contexts/GardenContext.js`
2. Migrar estado del jardín
3. Crear hooks: `useGarden()`, `usePlantState()`
4. Actualizar GardenScreen
5. Limpiar AppContext

**Estimado:** 1 día

---

##### 1.1.5 Actualizar AppContext (Core)
**Archivo:** `src/state/AppContext.js` (reducido a ~200 líneas)

**Responsabilidades finales:**
- Proveer todos los contextos
- Noticias
- Sincronización cloud
- Hidratación inicial

**Estructura final:**
```javascript
export function AppProvider({ children }) {
  return (
    <EconomyProvider>
      <ChallengesProvider>
        <InventoryProvider>
          <GardenProvider>
            <NewsProvider>
              {children}
            </NewsProvider>
          </GardenProvider>
        </InventoryProvider>
      </ChallengesProvider>
    </EconomyProvider>
  );
}
```

**Estimado:** 1 día

---

### 📦 1.2 Refactorizar ShopScreen.js

**Prioridad:** CRÍTICA  
**Tiempo estimado:** 1 semana  
**Archivos afectados:** `src/screens/ShopScreen.js` (1136 líneas)

#### Problema
- Lógica de negocio mezclada con UI
- 25 funciones en un solo componente
- Difícil de testear
- No reutilizable

#### Solución: Extraer a hooks y servicios

##### 1.2.1 Crear useShopPurchase hook
**Archivo:** `src/hooks/shop/useShopPurchase.js`

**Responsabilidades:**
- Validar si puede comprar
- Procesar compra
- Actualizar inventario
- Manejar errores

**Funciones a extraer:**
- `handlePurchase`
- `canAffordItem`
- `processMultiCurrencyPurchase`

**Estimado:** 1 día

---

##### 1.2.2 Crear useShopFilters hook
**Archivo:** `src/hooks/shop/useShopFilters.js`

**Responsabilidades:**
- Filtrar por categoría
- Filtrar por rareza
- Búsqueda de items
- Ordenamiento

**Funciones a extraer:**
- `filterByCategory`
- `filterByRarity`
- `searchItems`
- `sortItems`

**Estimado:** 1 día

---

##### 1.2.3 Crear shopService
**Archivo:** `src/services/shopService.js`

**Responsabilidades:**
- Cálculos de precios
- Validaciones de compra
- Lógica de descuentos
- Requisitos de items

**Funciones a extraer:**
- `calculateFinalPrice`
- `validatePurchaseRequirements`
- `applyDiscounts`

**Estimado:** 1 día

---

##### 1.2.4 Dividir ShopScreen en componentes
**Archivos a crear:**
```
src/screens/shop/
├── ShopScreen.js (componente principal, ~200 líneas)
├── components/
│   ├── ShopHeader.js
│   ├── ShopTabs.js
│   ├── ShopItemCard.js
│   ├── ShopItemGrid.js
│   ├── PurchaseModal.js
│   └── SubscriptionCard.js
```

**Estimado:** 2 días

---

### 📦 1.3 Refactorizar TasksScreen.js

**Prioridad:** CRÍTICA  
**Tiempo estimado:** 4-5 días  
**Archivos afectados:** `src/screens/TasksScreen.js` (710 líneas)

#### Problema
- 21 funciones en un componente
- Múltiples responsabilidades
- Difícil debugging

#### Solución: Dividir en componentes especializados

##### 1.3.1 Crear useTaskManagement hook
**Archivo:** `src/hooks/tasks/useTaskManagement.js`

**Responsabilidades:**
- CRUD de tareas
- Sincronización cloud
- Validaciones

**Funciones a extraer:**
- `addTask`
- `updateTask`
- `deleteTask`
- `toggleTaskDone`
- `syncTaskToCloud`

**Estimado:** 1 día

---

##### 1.3.2 Dividir TasksScreen
**Archivos a crear:**
```
src/screens/tasks/
├── TasksScreen.js (componente principal, ~150 líneas)
├── components/
│   ├── TaskList.js
│   ├── TaskFilters.js
│   ├── TaskEditor.js
│   ├── TaskCard.js (ya existe, mejorar)
│   └── ElementInfoSheet.js (ya existe)
```

**Estimado:** 2 días

---

##### 1.3.3 Crear taskService
**Archivo:** `src/services/taskService.js`

**Responsabilidades:**
- Cálculo de recompensas
- Validación de tareas
- Lógica de elementos

**Estimado:** 1 día

---

### 📦 1.4 Migrar shopCatalog.js a JSON

**Prioridad:** ALTA  
**Tiempo estimado:** 2 días  
**Archivos afectados:** `src/constants/shopCatalog.js` (466 líneas)

#### Problema
- 240+ items hardcodeados
- Difícil actualizar
- No escalable

#### Solución

##### 1.4.1 Crear estructura JSON
**Archivo:** `assets/data/shop-catalog.json`

```json
{
  "version": "1.0.0",
  "lastUpdate": "2025-11-24",
  "categories": {
    "potions": [...],
    "seeds": [...],
    "tools": [...],
    "cosmetics": [...],
    "pets": [...]
  }
}
```

**Estimado:** 1 día

---

##### 1.4.2 Crear loader y validación
**Archivo:** `src/services/catalogService.js`

**Responsabilidades:**
- Cargar catálogo desde JSON
- Validar esquema con Zod
- Cache en memoria
- Fallback si falla

**Estimado:** 1 día

---

## 🎨 Fase 2: Mejoras de Calidad (2 semanas)

### 2.1 Implementar PropTypes
**Tiempo estimado:** 3 días

**Archivos prioritarios:**
1. Componentes de Shop
2. Componentes de Tasks
3. Componentes compartidos (common/)

**Pasos:**
1. Instalar: `npm install prop-types`
2. Agregar PropTypes a componentes críticos
3. Verificar warnings en consola
4. Documentar tipos

---

### 2.2 Implementar validación con Zod
**Tiempo estimado:** 3 días

**Archivos a validar:**
1. Datos de AsyncStorage
- `src/screens/TasksScreen.js`
- `src/screens/PlantScreen.js`
- `src/lib/sync.js`

**Solución:**
```javascript
// src/utils/logger.js
const logger = {
  log: __DEV__ ? console.log : () => {},
  warn: __DEV__ ? console.warn : () => {},
  error: console.error, // Siempre loguear errores
};

export default logger;
```

---

### 2.4 Resolver TODOs pendientes
**Tiempo estimado:** 2 días

**Archivos con TODOs:**
1. `src/lib/supabase.js`
2. `src/screens/auth/LoginScreen.js`
3. `src/components/CreateTaskModal/ElementGrid.js`
4. `src/screens/PlantScreen.js`
5. `src/screens/TasksScreen.js`

**Proceso:**
1. Revisar cada TODO
2. Crear issue en GitHub o resolver
3. Documentar decisiones

---

### 2.5 Completar sincronización cloud
**Tiempo estimado:** 2 días

**Archivo:** `src/state/AppContext.js` (líneas 700-706)

**Problema:**
```javascript
// Comentario actual: "pushing the whole array is inefficient"
```

**Solución:**
1. Implementar sync incremental
2. Solo sincronizar cambios
3. Manejar conflictos
4. Agregar retry logic

---

## ⚡ Fase 3: Optimización de Rendimiento (1 semana)

### 3.1 Aplicar memoización estratégica
**Tiempo estimado:** 2 días

**Componentes a optimizar:**
1. `HomeScreen` - React.memo
2. `TaskCard` - React.memo
3. `ShopItemCard` - React.memo
4. Listas grandes - useMemo para filtros

**Pasos:**
1. Identificar re-renders innecesarios con React DevTools
2. Aplicar React.memo a componentes puros
3. Usar useMemo para cálculos costosos
4. Usar useCallback para funciones pasadas como props

---

### 3.2 Optimizar listas con FlatList
**Tiempo estimado:** 1 día

**Archivos:**
- `TasksScreen` - Lista de tareas
- `ShopScreen` - Grid de items
- `InventoryScreen` - Lista de inventario

**Mejoras:**
- `getItemLayout` para mejor scroll
- `removeClippedSubviews`
- `maxToRenderPerBatch`
- `windowSize` optimizado

---

### 3.3 Implementar lazy loading
**Tiempo estimado:** 2 días

**Pantallas a lazy load:**
- ShopScreen
- GardenScreen
- RewardsScreen
- InventoryScreen

**Implementación:**
```javascript
const ShopScreen = lazy(() => import('./screens/ShopScreen'));
```

---

## 🧪 Fase 4: Testing y Documentación (2 semanas)

### 4.1 Configurar Jest y Testing Library
**Tiempo estimado:** 1 día

**Pasos:**
1. Instalar dependencias
2. Configurar jest.config.js
3. Crear setup files
4. Configurar mocks

---

### 4.2 Escribir tests unitarios
**Tiempo estimado:** 1 semana

**Prioridades:**
1. Reducers (economía, challenges)
2. Servicios (shop, tasks)
3. Hooks personalizados
4. Utilidades (cálculos, validaciones)

**Objetivo:** 70% de cobertura en lógica crítica

---

### 4.3 Estandarizar documentación
**Tiempo estimado:** 2 días

**Tareas:**
1. Agregar headers `[MB]` a todos los archivos
2. Documentar APIs públicas
3. Crear README por módulo
4. Actualizar README principal

---

### 4.4 Crear guías de desarrollo
**Tiempo estimado:** 2 días

**Guías a crear:**
1. Cómo agregar un nuevo item al shop
2. Cómo crear un nuevo achievement
3. Cómo agregar una nueva pantalla
4. Guía de debugging

---

## 🏗️ Fase 5: Arquitectura Escalable (1-2 semanas)

### 5.1 Reorganizar estructura de carpetas
**Tiempo estimado:** 3 días

**Nueva estructura:**
```
src/
├── features/
│   ├── shop/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── screens/
│   │   └── types/
│   ├── tasks/
│   ├── garden/
│   ├── profile/
│   └── challenges/
├── shared/
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── constants/
└── core/
    ├── state/
    ├── navigation/
    ├── theme/
    └── services/
```

---

### 5.2 Implementar i18n
**Tiempo estimado:** 3 días

**Pasos:**
1. Instalar react-i18next
2. Crear archivos de traducción
3. Migrar strings hardcodeados
4. Configurar cambio de idioma

**Idiomas iniciales:**
- Español (base)
- Inglés

---

### 5.3 Configurar CI/CD
**Tiempo estimado:** 2 días

**Tareas:**
1. GitHub Actions para tests
2. Linting automático
3. Build checks
4. Deploy preview

---

## ✅ Checklist de Progreso

### Fase 0: Preparación
- [x] 0.1 Eliminar código duplicado AppContext
- [x] 0.2 Crear guía de estándares
- [x] 0.3 Crear estructura de docs

### Fase 1: Refactorización Crítica
- [ ] 1.1.1 Crear EconomyContext
- [ ] 1.1.2 Crear ChallengesContext
- [ ] 1.1.3 Crear InventoryContext
- [ ] 1.1.4 Crear GardenContext
- [ ] 1.1.5 Actualizar AppContext (core)
- [ ] 1.2.1 Crear useShopPurchase
- [ ] 1.2.2 Crear useShopFilters
- [ ] 1.2.3 Crear shopService
- [ ] 1.2.4 Dividir ShopScreen
- [ ] 1.3.1 Crear useTaskManagement
- [ ] 1.3.2 Dividir TasksScreen
- [ ] 1.3.3 Crear taskService
- [ ] 1.4.1 Crear shop-catalog.json
- [ ] 1.4.2 Crear catalogService

### Fase 2: Mejoras de Calidad
- [ ] 2.1 Implementar PropTypes (creo que lo mejor si estas de acuerdo es pasar a typescript)
- [ ] 2.2 Implementar validación Zod
- [ ] 2.3 Eliminar console.log
- [ ] 2.4 Resolver TODOs
- [ ] 2.5 Completar sync cloud

### Fase 3: Optimización
- [ ] 3.1 Aplicar memoización
- [ ] 3.2 Optimizar listas
- [ ] 3.3 Lazy loading

### Fase 4: Testing y Docs
- [ ] 4.1 Configurar Jest
- [ ] 4.2 Tests unitarios
- [ ] 4.3 Estandarizar docs
- [ ] 4.4 Guías de desarrollo

### Fase 5: Arquitectura
- [ ] 5.1 Reorganizar carpetas
- [ ] 5.2 Implementar i18n
- [ ] 5.3 Configurar CI/CD

---

## 📊 Tracking de Progreso

### Métricas a Monitorear
- [ ] Líneas de código por archivo (objetivo: <400)
- [ ] Cobertura de tests (objetivo: >70%)
- [ ] Tiempo de build (objetivo: <2min)
- [ ] Warnings en consola (objetivo: 0)
- [ ] Performance score (objetivo: >90)

### Calidad del Código
- **Inicio:** 7/10
- **Objetivo:** 9/10
- **Actual:** ___ /10

---

## 🎯 Próximos Pasos Inmediatos

1. ✅ **HOY:** Eliminar código duplicado (5 min)
2. ✅ **HOY:** Crear guía de estándares (15 min)
3. 📅 **Esta semana:** Empezar refactorización AppContext
4. 📅 **Próxima semana:** Continuar con ShopScreen

---

## 📝 Notas

- Este plan es flexible, ajustar según necesidades
- Priorizar siempre funcionalidad sobre perfección
- Hacer commits pequeños y frecuentes
- Testear después de cada cambio importante
- Documentar decisiones importantes

---

**Última actualización:** 2025-11-24  
**Responsable:** Sebastian Vega  
**Versión:** 1.0.0
