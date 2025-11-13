# PlantScreen Roadmap

## Estado actual
- La pantalla combina múltiples componentes (`PlantHeader`, `PlantHero`, `CareMetrics`, `QuickActions`, `GrowthProgress`, `InventorySheet`) pero cada uno maneja mocks e interacciones aisladas.
- Hay diferencias visuales frente a `HomeScreen` y `TasksScreen`: tokens de color inconsistentes (gradientes, chips), padding irregulares y tipografías con caracteres corruptos (ej. `Mano`).
- Los datos están embebidos en `PlantScreen` (economía, skins, buffs) en lugar de provenir del contexto global o de un hook dedicado.
- La jerarquía no refleja el flujo definido en Home/Tasks: falta un encabezado fijo con CTA y la sección de progreso/acciones no está agrupada en bloques reutilizables.

## Objetivos
1. Alinear la estructura con el patrón Home/Tasks (encabezado ? resumen ? acciones ? historial ? sheets).
2. Centralizar estado (maná, recursos, skins, buffs) usando el mismo contexto que Home/Tasks (`AppContext` o un hook `usePlant`).
3. Homologar tokens (gradientes, chips, cards) usando `theme.js`.
4. Reducir mocks/strings corruptos y preparar i18n (`Maná`, `Subtareas` etc.).

## Estructura propuesta

1. **Encabezado fijo**
   - Reusar layout de `StatsHeader` adaptado a planta (nivel de planta, XP, salud).
   - Mostrar acciones globales (renombrar, abrir inventario) como icon buttons alineados.

2. **Resumen Hero**
   - `PlantHero` + `BuffsBar` dentro de un `ScreenSection` con fondo gradiente controlado por acento de skin.
   - Buffs alineados horizontalmente; cuando no haya buffs, mostrar hint.

3. **Métricas de cuidado**
   - `CareMetrics` en card glass, usando `Spacing.base` y gradiente `Gradients.xp` o preset por elemento.
   - Agregar estado “última acción”/“próxima acción” para reforzar feedback.

4. **Acciones rápidas**
   - Estandarizar botones con el estilo de `QuickActions` Home (chips con ícono + costo).
   - Extraer costos y cooldowns de contexto para sincronizar con economía global.

5. **Historial / Progreso**
   - `GrowthProgress` debe aceptar items normalizados `{ts, icon, delta}` y usar tipografía limpia (sin emojis corruptos).
   - Preparar espacio para “Siguientes hitos” (lista futura).

6. **InventorySheet**
   - Mover `skins` mock a `usePlantInventory` (hook) o al contexto para compartir con Home/Shop.
   - Normalizar `accentKey` con `ElementAccents` y limpiar strings (`Maceta Rústica`).

## Cambios técnicos sugeridos
- Crear `usePlantState()` que consumirá `AppContext` (mana, streak, buffs) y proveerá adaptadores para componentes de planta.
- Añadir presets de gradiente a `ElementAccents.gradients` para cada `accentKey` y reutilizarlos en Plant.
- Remover emojis corruptos en mocks y reemplazar por íconos de `@expo/vector-icons` o glyphs estándar.
- Consolidar tokens de espaciado: usar `ScreenSection` con `Spacing.base` y `gap` controlado.
- Planear i18n: mantener strings en castellano con tildes correctas (`Maná`, `Racha`).

## Próximos pasos
1. Documentar en `AppContext` los campos necesarios para Planta (nivel, crecimiento, buffs, skins, economía).
2. Extraer mocks de `PlantScreen` a fixtures (`src/mocks/plant.ts`) para facilitar pruebas.
3. Diseñar referencia visual (Figma) o derivar estilos de Home/Tasks y registrarlos en `docs/home-checklist.md`.
4. Implementar refactor incremental:
   - Paso 1: Encabezado + Hero con tokens correctos.
   - Paso 2: Métricas y Acciones reusando componentes homogenizados.
   - Paso 3: Historial + Inventory conectados a contexto real.

## Observaciones adicionales
- Verificar accesibilidad: `AccessibilityInfo` se usa para feedback de economía; mantenerlo pero mover strings a utilidades (`announceEconomyChange`).
- Revisar dependencias al mover estado a hooks (`InventorySheet` dependería de `usePlantState`).
- Añadir casos vacíos para inventario y buffs (estado sin data) para evitar renders vacíos.

Con este roadmap podemos alinear PlantScreen con Home/Tasks sin repetir estilos y dejando espacio para la futura persistencia de datos.
