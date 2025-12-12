// [MB] Modulo: Design / Seccion: UI Audit
// Afecta: Home, Plant, Tasks, Profile
// Proposito: Registrar hallazgos de la auditoria UI/UX para alinear pantallas base
// Puntos de edicion futura: actualizar cuando se atiendan hallazgos o se agreguen nuevas pantallas
// Autor: Codex - Fecha: 2025-11-25

# Auditoria UI/UX (Home, Plant, Tasks, Profile)

> Referencias base: `documentacion/design/wireframes/*.md`, specs en `documentacion/components/*` y codigo actual (`src/screens/*` + componentes relacionados).

## Home Screen

**Estado actual**
- Layout en `src/screens/HomeScreen.js`: orden Hero → Rewards → DailyChallenges → MagicShop → Inventory → EventHighlights.
- Componentes clave ya usan `CardStyles` (DailyChallengesSection, InventorySection, HomeHeroSection).
- Drawer se abre desde el `HomeHeader`; los atajos se mueven al drawer/Nav Haven.

**Hallazgos**
- `EventHighlightsSection` mantiene acentos hardcodeados (`accent` literal en `EventHighlightsSection.js:15-44`). Falta mapearlos a `CategoryAccents`/tokens para que coincidan con el resto de la paleta.
- `PromoBannerSlider` y `MagicShopSection` siguen usando subtítulos/CTA con copy mixto (mezcla de mayúsculas y frases cortas). Requiere repasar la guía de copy para jerarquía consistente.
- Falta estado “sin banners/eventos” documentado; hoy solo muestra placeholders.

**Acciones sugeridas**
1. Extender `CategoryAccents` al calendario de eventos y banners promocionales. *(2025-11-25: `EventHighlightsSection` ya consume `CategoryAccents` y fondos dinámicos; pendiente ajustar banners y copy).*
2. Documentar en `documentacion/components/home/*.md` los estados vacíos/hidratación.
3. Revisar `HomeWelcomeCard` para asegurarse de que el CTA primario (ir a tareas) use la misma semántica de botones que Tasks/Profile.
4. PromoBannerSlider actualizado para copy/acento unificado (2025-11-25), pendiente documentar cómo agregar nuevos banners.

## Plant Screen

**Estado actual**
- `src/screens/PlantScreen.js` combina la tarjeta de identidad renovada (racha ??, tiles ??/??), PlantHero, QuickActions y ElementBalance actualizado.
- `PlantScreen.styles.js` reutiliza el chip PRO de Productivity Spells y define el glow del bloque premium.

**Hallazgos**
- Los tips PRO siguen usando datos locales y no verifican suscripci�n; falta contrato backend y manejo de errores.
- Los acordeones (tips PRO y ElementBalance) no persisten al navegar; UX inconsistente.
- QuickActions/modales a�n tienen strings con mojibake en `ACTION_MECHANICS`/`BUFF_PRESETS`.

**Acciones sugeridas**
1. Definir API para tips PRO (payload, fallback, gating) y documentarla.
2. Persistir `gardenerExpanded` y la tarjeta elemental seleccionada mediante AsyncStorage/contexto.
3. Completar saneamiento de strings/emoji en `ACTION_MECHANICS` y documentar los tokens en la gu�a de modales.

## Tasks Screen

**Estado actual**
- `src/screens/TasksScreen.js` monta StatsHeader + filtros + lista (`TaskCard`). Gran parte del layout usa estilos propios (Spacing/Tabs) y combina `TaskFilters`, `FiltersHeader`, etc.
- `TaskCard` y `CreateTaskModal` ya consumen `PriorityAccents` y `CategoryAccents` parcialmente.

**Hallazgos**
- Configuraciones de filtros (`mainFilters`, `STATUS_FILTER_CONFIG`, `priorityOptions`) siguen declarando colores manuales (`Colors.secondary`, `Colors.danger`). Falta migrarlos a `PriorityAccents`/tokens para mantener la misma lectura que en Cards.
- Texto con encoding roto en `elementInfo` (e.g. `"Fuego �Y"�"`) debe corregirse antes del MVP.
- Empty states y loaders están definidos en código pero no en documentación actualizada; la guía anterior se perdió al mover docs.

**Acciones sugeridas**
1. Actualizar los arrays de filtros para reutilizar `PriorityAccents` y `CategoryAccents`.
2. Documentar en `documentacion/components/tasks/README.md` (o nuevo archivo) los estados “sin tareas”, “sin filtros”, “sin conexión”.
3. Alinear paddings/gradientes de `StatsHeader` y `TaskFilters` con los que definimos para Home/Plant (mismo spacing vertical, tipografía sectionTitle).

## Profile Screen

**Estado actual**
- `src/screens/ProfileScreen.js` muestra hero + barras de progreso + chips inventario + banners + logros + diario + acciones suaves.
- Drawer/Nav Haven ahora maneja acciones de cuenta, pero Profile aún recibe navegación directa (`navigation.navigate("InventoryModal")`, etc.).

**Hallazgos**
- Falta soporte al “focus” que envía el drawer (`navigation.navigate("ProfileScreen", { focus: "achievements" })`). Actualmente no lee params para abrir el modal ni autoscrollear.
- Banners (Jardín, Inventario, Pases) usan imágenes y CTA consistentes, pero no comparten un componente base documentado; resultará difícil ajustarlos sin guía.
- `resourceChips` (Mascotas/Plantas/Pociones/Herramientas) usan hex literales (`#FFB347`, `#80deea`). Deben migrar a `CategoryAccents`.
- Acciones suaves siguen estáticas (mocks) y no hay documentación de qué hace cada una después del drawer refactor.

**Acciones sugeridas**
1. Leer params `route.params?.focus` para abrir secciones específicas (logros, diario, etc.) cuando el drawer lo solicite.
2. Crear componente/documentación “ProfileBannerCard” para reutilizar en otros sitios.
3. Unificar los chips de inventario con `CategoryAccents` y mover esa definición a la guía UI para que Inventory/Home/Profile muestren los mismos números.

---

## Próximos pasos propuestos
1. **Documentación**: abrir `documentacion/design/ux-roadmap.md` con principios globales y checklist por pantalla (usando esta auditoria como base).
2. **Alineación Home/Plant**: aplicar las acciones arriba (colores en eventos, limpieza de strings, guía de modales) antes de tocar Tasks/Profile.
3. **Sincronización con prototipado externo**: usar la guía para pedir a la IA (Figma) sólo variaciones compatibles (mismos tokens, mismos bloques). Documentar resultados en los wireframes existentes para no perder versión.

> Este archivo debe actualizarse al cerrar cada hallazgo (marcar fecha y commit) para mantener rastreable la convergencia UI/UX previa al MVP.

