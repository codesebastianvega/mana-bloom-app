// [MB] Módulo: Tasks / Sección: Wireframe
// Afecta: TasksScreen
// Propósito: Describir layout y jerarquía visual actuales de la pantalla de tareas
// Puntos de edición futura: actualizar cuando cambie la lógica de filtros, economía o se añadan nuevas vistas
// Autor: Codex - Fecha: 2025-11-25

# Tasks Screen Wireframe (v1 - Align con implementación actual)

## 1. Header de Stats
- Componente: `StatsHeader`.
- Ubicación: parte superior, debajo de SafeArea.
- Contenido:
  - Resumen de tareas (pendientes, completadas, eliminadas).
  - Información de racha/productividad (según implementación actual).

## 2. Filter Bar (tipo, estado, prioridad, tags)
- Componentes:
  - `FiltersHeader` (encabezado con resumen de filtros activos).
  - `TaskFilters` (bottom sheet/modal con opciones de filtro).
- Filtros soportados:
  - Tipo: Todos, Tareas, Hábitos.
  - Estado: Pendientes, Completadas, Eliminadas.
  - Prioridad: Baja, Media, Urgente (mapeado a colores y recompensas base).
  - Elemento: Agua, Fuego, Tierra, Aire (balance elemental).
  - Tags: dinámicos según tags usados en tareas.

## 3. Lista de Tareas
- Componente: `TaskCard` (por ítem) dentro de un `FlatList`.
- Fuente de datos:
  - Tareas leídas desde AsyncStorage (`getTasks`) y, si hay sesión, merge con Supabase (`fetchUserData().tasks`).
- Para cada tarea:
  - Título, nota, iconos de prioridad/elemento.
  - Indicadores de estado (completada, eliminada).
  - Acciones (completar, borrar suave, restaurar, edición).

## 4. Acciones sobre tareas
- Completar/Descompletar:
  - Toggle actualiza `done`, `completed`, `completedAt` y `isDeleted`.
  - Al completar:
    - Verifica integridad/economía (`canCompleteTask`, `calculateTaskReward`).
    - Aplica recompensas: mana, coins, gems, XP (`APPLY_TASK_REWARD`, `ADD_COIN`, `ADD_GEM`).
    - Actualiza desafíos diarios (`UPDATE_DAILY_CHALLENGES_ON_TASK_DONE`).
    - Dispara evento de logro (`ACHIEVEMENT_EVENT` con prioridad).
- Borrado:
  - Soft delete (marca `isDeleted: true`).
  - Restaurar tarea desde lista de eliminadas.
  - Borrado permanente con acción dedicada.

## 5. FAB / Crear Tarea
- Componente: `CreateTaskModal` (modal aparte).
- Trigger:
  - Botón flotante (FAB) en esquina inferior derecha.
- Comportamiento:
  - Abre modal para crear tarea simple/hábito, con campos como título, nota, prioridad, elemento, tiempo estimado (cuando se conecte con economía).

## 6. Integración con Economía y Task Integrity
- Configuraciones usadas:
  - `XP_REWARD_BY_PRIORITY` (recompensas base por prioridad).
  - `canCompleteTask`, `calculateFinalReward` desde `taskIntegrity`.
  - `calculateTaskReward` desde `economyConfig`.
- Visual actual:
  - Mensajes de consola y alertas informando de penalizaciones o recompensas.
  - A futuro puede añadirse un toast/sheet visual de “loot” por tarea.

## 7. Elementos y Tooltips (educativos)
- Información por elemento (Fuego, Agua, Tierra, Aire) incluida en constantes:
  - Título, descripción, ejemplos y propósito.
- Uso actual:
  - Copys en popovers o descripciones que guían al usuario en cómo asignar elementos a tareas.

## 8. Layout y comportamiento
- SafeArea + respeto a la altura de la TabBar:
  - Usa `useSafeAreaInsets` y `useBottomTabBarHeight` para posicionar FAB y evitar solapamiento.
- Filtros:
  - Fila de filtros principales (tipo de tarea).
  - Botones para abrir filtros avanzados (estado, prioridad, etc.).
- Lista:
  - `FlatList` optimizada con key por `id`.
  - Soporte para refresco al cambiar filtros y para estados vacíos.

## Notas

- Esta pantalla es el “hub” de productividad: conecta tareas con economía, desafíos diarios y logros.
- El wireframe describe la jerarquía visual; la lógica de economía y task integrity está documentada en `docs/ECONOMY.md` y `src/constants/taskIntegrity.js`.

