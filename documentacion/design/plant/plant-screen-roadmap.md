// [MB] Módulo: Plant / Sección: Roadmap
// Afecta: PlantScreen
// Propósito: Registrar avances e identificar próximos pasos críticos
// Puntos de edición futura: tips PRO conectados a backend, balance elemental interactivo, sincronización de rituales
// Autor: Codex - Fecha: 2025-12-07

# PlantScreen Roadmap

## Estado actual (2025-12-07)
- Tarjeta de identidad rearmada con racha 🔥, tiles minimalistas (☀️ clima, 🌿 vitalidad) y bloque “Consejos del jardinero” con badge PRO + acordeón.
- PlantHero conserva métricas clave y copy saneado; QuickActions/rituales operan con `ACTION_MECHANICS` y almacenamiento local.
- ElementBalance usa strings ASCII, tarjetas plegables y cápsulas de sincronía para describir progreso.

## Observaciones pendientes
1. **Tips PRO conectados a backend:** el módulo usa métricas locales (careSuggestion, hydrateCount, ritualActiveCount, clima mock). Falta definir API/IA y gating real por suscripción.
2. **Persistencia de UI:** estados como `gardenerExpanded` y el elemento expandido en `ElementBalance` deberían almacenarse para rehidratar la vista.
3. **Flujo balance → tareas:** al deshabilitar el trigger hacia `CreateTaskModal`, ya no hay atajo directo. Se necesita deep link a TasksScreen con filtros preaplicados o una hoja contextual.
4. **Selector de skins:** la tarjeta heroica muestra acentos pero no expone CTA directo para InventorySheet. Falta definir botón “Cambiar maceta” acorde al nuevo layout.
5. **Higiene de strings/emoji global:** persisten textos con mojibake en `ACTION_MECHANICS`, `BUFF_PRESETS` y algunos componentes; mantener limpieza coordinada.

## Próximos pasos
1. **Diseñar contrato de tips PRO** (payload esperado, frecuencia de refresco, copy guidelines) y documentarlo en `documentacion/backend/estado-backend.md` cuando esté listo.
2. **Persistir acordeones** mediante AsyncStorage/contexto para que el usuario mantenga preferencia (tips y tarjetas elementales).
3. **Hook balance→Tasks:** añadir helper de navegación `navigateToTasks({ element })` reutilizable desde PlantScreen y otros módulos.
4. **Checklist de datos**: consolidar qué viene de AppContext vs. storage para evitar dobles lecturas cuando entremos en fase online.
5. **Actualizar wireframes** (`documentacion/design/wireframes/plant-screen-wireframe.md`) con el layout PRO para referencia del equipo de diseño.
