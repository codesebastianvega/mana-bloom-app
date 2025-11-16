# Rituals & Plant Care (App State Overview)

> Última actualización: 2025-11-14  
> Mantén este archivo vivo cada vez que añadamos/ajustemos rituales o métricas.

## 1. Acciones de cuidado de la planta (QuickActions)

Archivo principal: `src/components/plant/QuickActions.js`  
Mecánicas (textos, cooldowns, costos): `src/components/plant/actionMechanics.js`  
Uso en pantalla: `src/screens/PlantScreen.js`

| Key     | Título UI      | Ícono | Acento        | Coste (ver `ACTION_COSTS`) | Efectos clave (`METRIC_EFFECT_MAP`) |
|---------|----------------|-------|---------------|----------------------------|-------------------------------------|
| water   | Regar          | tint  | water         | `-20 mana`                 | `water +0.12`, buff Vitalidad       |
| feed    | Nutrir         | seedling | nutrients  | `-120 coins`              | `nutrients +0.10`, buff Crecimiento |
| clean   | Limpiar        | broom | clean         | Gratis                     | `purity +0.08`                      |
| prune   | Podar          | cut   | vitality      | Gratis                     | `purity +0.05`, `focus +0.02`, buff Vitalidad |
| light   | Luz directa    | lightbulb | clarity   | Gratis                     | `light +0.10`                       |
| mist    | Neblina        | cloud | reflection    | Gratis                     | `temperature +0.04`, `purity +0.03` |

Notas:
- QuickActions recibe props `cooldowns` y un handler `onAction(key) -> boolean`.  
- Si `onAction` devuelve `false` (porque abrimos un modal de ritual), **no** se inicia cooldown local.  
- Todos los botones muestran un helper corto (`helper` en `buildActionConfig`); al hacer long-press (o usar `ActionInfoModal`) se muestra la descripción completa (`ACTION_MECHANICS[key]`).

## 2. Rituales personales y modales

### Listado de rituales (`RITUAL_ACTIONS`)

| Key         | Modal / Archivo                                 | Flujo en `PlantScreen`                          | Efectos sobre métricas |
|-------------|-------------------------------------------------|------------------------------------------------|------------------------|
| meditate    | `GuidedBreathModal.js`                          | `launchBreathModal()` → `handleBreathComplete` | `mood +0.05`, `purity +0.03` |
| hydrate     | `HydrateModal.js`                               | `launchHydrateModal()` → `handleHydrateComplete` | `water +0.08`, `mood +0.02` |
| stretch     | `StretchModal.js`                               | `launchStretchModal()` → `handleStretchComplete` | `focus +0.05`, `temperature +0.02` |
| sunlight    | `SunlightModal.js`                              | `launchSunlightModal()` → `handleSunlightComplete` | `light +0.08`, `mood +0.01` |
| visualize   | `VisualizeModal.js`                             | `launchVisualizeModal()` → `handleVisualizeComplete` | `focus +0.03`, `mood +0.02` |
| journal     | `JournalModal.js`                               | `launchJournalModal()` → `handleJournalComplete` | `focus +0.02`, `mood +0.03` |
| gratitude   | `GratitudeModal.js`                             | `launchGratitudeModal()` → `handleGratitudeComplete` | `mood +0.04`, `purity +0.02` |
| restEyes    | `RestEyesModal.js`                              | `launchRestEyesModal()` → `handleRestEyesComplete` | `focus +0.04` |

Detalles clave por modal:

- **GuidedBreath** (`src/components/plant/GuidedBreathModal.js`)
  - Estados: `phase (intro/active/done)`, `stepIndex`, `cycleIndex`, `timeLeft`.
  - Animación: `breatheAnim` para el pulso del timer (Animated loop).
  - Timer basado en `BREATH_STEPS`.
  - `onComplete` se dispara cuando termina la sesión o al pulsar “Reclamar XP”.

- **Hydrate**
  - Cada vaso incrementa `hydrateCount` (persistido por día con `HYDRATION_STATE_KEY`).
  - Barra de progreso (`progressAnim`) con easing.
  - Sólo permite “Sincronizar con la planta” cuando `count >= goal`.

- **Stretch**
  - Secuencia de 4 pasos guiados + temporizador.
  - `progressAnim` da un leve “breathing” al badge del timer.
  - Terminar la rutina llama `handleStretchComplete`.

- **Sunlight**
  - Timer de 5 minutos con botón `Iniciar/Pausar`.
  - `glowAnim` produce un halo animado alrededor del badge.
  - `handleSunlightComplete` se habilita sólo cuando el timer llega a 0.

- **Visualize**
  - `PROMPTS` rotativos; se guardan borradores en AsyncStorage (`mb:visualizeDraft`).
  - `fadeAnim` para un fade-in suave al abrir.
  - `addVisualizeEntry` registra el texto final en `mb:visualizeEntries`.

- **Journal**
  - Estética dramática (gradient + quote).
  - Persiste borradores (`mb:journalDraft`) y entradas (`mb:journalLog`).
  - `onSave` envía un objeto `{ title, note, createdAt }` a `addJournalEntry`.

- **Gratitude**
  - Selecciona un mensaje al azar y muestra un CTA para abrir WhatsApp.
  - `fadeAnim` en la tarjeta de sugerencias.

- **RestEyes**
  - Temporizador simple de 20s con pulso (`Animated`).
  - Al completar llama `onComplete`, que a su vez ejecuta `handleAction("restEyes")`.

## 3. Métricas del Hero y efectos (`careMetrics`)

Variables en `PlantScreen.js`:

- `careMetrics` (estado) con campos: `water, light, nutrients, mood, purity, temperature, focus`.
- `careMetricChips` y `wellbeingMetricChips` (via `useMemo`) se alimentan hacia `PlantHero`.
- `plantHealth` se calcula como promedio simple de todos los valores de `careMetrics`.

Mapa de efectos (`METRIC_EFFECT_MAP`):

```js
const METRIC_EFFECT_MAP = {
  hydrate:   { water: 0.08, mood: 0.02 },
  stretch:   { focus: 0.05, temperature: 0.02 },
  sunlight:  { light: 0.08, mood: 0.01 },
  visualize: { focus: 0.03, mood: 0.02 },
  journal:   { focus: 0.02, mood: 0.03 },
  gratitude: { mood: 0.04, purity: 0.02 },
  restEyes:  { focus: 0.04 },
  meditate:  { mood: 0.05, purity: 0.03 },
  water:     { water: 0.12 },
  feed:      { nutrients: 0.10 },
  clean:     { purity: 0.08 },
  prune:     { purity: 0.05, focus: 0.02 },
  light:     { light: 0.10 },
  mist:      { temperature: 0.04, purity: 0.03 },
};
```

`handleAction(key)` llama `applyMetricEffects(key)` siempre que la acción se ejecute correctamente. La función:

1. Obtiene los deltas del mapa.
2. Hace `setCareMetrics` sumando cada delta y clampenando `[0, 1]`.
3. Las chips del Hero se actualizan automáticamente porque dependen del estado de `careMetrics`.

## 4. Persistencia (storage.js)

Claves relevantes:

| Clave             | Descripción                              | Helpers                     |
|-------------------|------------------------------------------|-----------------------------|
| `mb:hydrationState` | Conteo diario de vasos                 | `getHydrationState` / `setHydrationState` |
| `mb:visualizeDraft` | Borrador actual de Visualizar          | `getVisualizeDraft` / `setVisualizeDraft` |
| `mb:visualizeEntries` | Log de visiones guardadas           | `getVisualizeEntries` / `addVisualizeEntry` |
| `mb:journalDraft`  | Borrador actual de Journal              | `getJournalDraft` / `setJournalDraft` |
| `mb:journalLog`    | Log de notas (formato `{ title, note, createdAt }`) | `getJournalEntries` / `addJournalEntry` |
| `mb:journalEntries` | Clave legacy (se migra a `journalLog`) | manejada dentro de `getJournalEntries` |

Migración Journal:
- `getJournalEntries` intenta primero `mb:journalLog`.
- Si no existe, busca `mb:journalEntries`, copia su contenido al nuevo key y elimina el viejo.

Estado en `PlantScreen`:
- `useEffect` inicial lee hydration + drafts y los coloca en `hydrateCount`, `visualizeDraft`, `journalDraft`.
- `handleHydrateIncrement` y `handleHydrateComplete` escriben en `mb:hydrationState`.
- `handleVisualizeComplete` y `handleJournalComplete` escriben en sus respectivos logs y limpian borradores.

## 5. Perfil / Diario personal

`ProfileScreen.js`:
- Estados: `visualizeEntries`, `journalLogEntries`.
- `useEffect` carga los logs desde storage.
- Sección “Diario personal” muestra:
  - Entradas de Journal (máx. 2) con título, nota y fecha (`formatDate` helper).
  - Visiones (máx. 2) con texto y fecha.
  - Mensaje vacío cuando no hay datos.

Estilos en `ProfileScreen.styles.js`:
- `diaryEntry`, `diaryTag`, `diaryTagVision`, `diaryTitle`, `diaryBody`, `diaryDate`, `diaryEmpty` definen el look de las tarjetas.

---

### Próximos pasos sugeridos
1. **Contexto global**: mover `careMetrics`, `hydrateCount`, `journalLogEntries`, etc. a un provider (AppContext) para compartir entre pantallas y evitar múltiples lecturas de AsyncStorage.
2. **Backend**: sincronizar los logs (visualizar / journal / hidratación) con el servidor cuando exista autenticación.
3. **UI**: mostrar un historial completo (modal/pantalla) y permitir borrar/editar entradas.
4. **Notificaciones**: conectar recordatorios push con el estado de cada ritual (goal, streak).
