<!-- [MB] Módulo: Docs / Sección: Visión general -->
<!-- Afecta: Equipo completo -->
<!-- Propósito: Registrar decisiones de arquitectura, UI y mecánicas clave -->
<!-- Puntos de edición futura: Actualizar etapas, mecánicas y backlog cuando cambien -->
<!-- Autor: Codex - Fecha: 2025-11-13 -->

# Project Overview

Guía breve para entender cómo está organizada la app, qué decisiones recientes tomamos y qué mecánicas impulsan la experiencia de Maná Bloom.

## 1. Estructura actual
- **App Expo 54 / RN 0.81 / React 19**.
- **Carpetas clave**:
  - `src/screens`: pantallas (`PlantScreen`, `HomeScreen`, etc.).
  - `src/components/<sección>`: componentes por dominio (ej. `plant/`, `home/`).
  - `src/theme.js`: tokens (colores, spacing, tipografía, gradientes).
  - `docs/`: referencias de wireframes, roadmap y ahora este overview.
- **Convenciones**:
  - Cada archivo lleva encabezado `// [MB] ...` (o comentario equivalente en MD).
  - Preferimos componentes UI en subcarpetas (ej. `src/components/plant/PlantSectionCard.js`).
  - Usamos tokens de `theme.js` en lugar de hardcodear colores/espaciado.

## 2. Decisiones recientes
| Fecha | Cambio | Racional |
| ----- | ------ | -------- |
| 2025-11-13 | Header minimal en `PlantScreen` | Separar navegación del estado: solo nombre, campana y cápsulas de economía arriba. |
| 2025-11-13 | `PlantProgressCard` entre header y hero | Mantener contexto de progreso (etapa, barra XP, sugerido) sin saturar el header. |
| 2025-11-13 | `ElementBalance` después del hero | Nueva sección visual con donut + grid 2×2 usando íconos de elementos. |
| 2025-11-13 | Eliminado `GrowthProgress` final | Evitar duplicar información de progreso; ahora el card intermedio cubre ese rol. |
| 2025-10-31 | `QuickActions` amplió rituales + tooltips | Se añadió `ActionInfoModal` y cooldown local para cada acción. |
| 2025-10-21 | `PlantSectionCard` y `ScreenSection` | Contenedores estándar para mantener padding/glass consistente. |

## 3. Mecánicas clave
- **Economía**: `mana`, `coins`, `gems` (por ahora mock). `QuickActions` descuenta recursos según `ACTION_COSTS` y muestra toast.
- **Acciones**:
  - `Cuidado` (Regar, Nutrir, Limpiar, Podar) consumen recursos base.
  - `Rituales` (Meditar, Hidratar, etc.) añaden helpers y cooldown/tooltip informativo.
- **Progreso de planta**:
  - `PlantProgressCard` usa `xpProgress` (mock 0.62) para mostrar % y etapa (`semilla → madura`).
  - `ElementBalance` traduce valores 0–1 en porcentajes por elemento + promedio central.
- **Inventario**: `InventorySheet` se abre desde acción “Limpiar / Cambiar maceta” y gestiona skins equipadas.

## 4. Backlog inmediato
1. **Context global**: mover estado de planta/economía a `AppContext` (plan etapa 1 de AGENTS.md).
2. **Persistencia**: sincronizar `economy`, `tasks`, `streaks` vía AsyncStorage cuando definamos modelos.
3. **Hero XP / ETA**: agregar fila `XP / ETA` textual antes de la barra dentro del hero (pendiente tras este refactor).
4. **Docs**: crear ADR puntuales si se toman decisiones mayores (ej. arquitectura de contexto, manejo de assets grandes).
5. **QA visual**: revisar `PlantProgressCard` y `ElementBalance` en tablets para asegurar que el grid 2×2 responda bien.

> Actualiza este overview cuando haya un cambio relevante (nuevo módulo, decisión de diseño, mecánica confirmada). Mantenerlo breve y accionable.

