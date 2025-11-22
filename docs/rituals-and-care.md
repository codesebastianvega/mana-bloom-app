# Rituals & Plant Care (App State Overview)

> Ãšltima actualizaciÃ³n: 2025-11-14  
> MantÃ©n este archivo vivo cada vez que aÃ±adamos/ajustemos rituales o mÃ©tricas.

## 1. Acciones de cuidado de la planta (QuickActions)

Archivo principal: `src/components/plant/QuickActions.js`  
MecÃ¡nicas (textos, cooldowns, costos): `src/components/plant/actionMechanics.js`  
Uso en pantalla: `src/screens/PlantScreen.js`

| Key     | TÃ­tulo UI      | Ãcono | Acento        | Coste (ver `ACTION_COSTS`) | Efectos clave (`METRIC_EFFECT_MAP`) |
|---------|----------------|-------|---------------|----------------------------|-------------------------------------|
| water   | Regar          | tint  | water         | `-20 mana`                 | `water +0.12`, buff Vitalidad       |
| feed    | Nutrir         | seedling | nutrients  | `-120 coins`              | `nutrients +0.10`, buff Crecimiento |
| clean   | Limpiar        | broom | clean         | Gratis                     | `purity +0.08`                      |
| prune   | Podar          | cut   | vitality      | Gratis                     | `purity +0.05`, `focus +0.02`, buff Vitalidad |
| light   | Luz directa    | lightbulb | clarity   | Gratis                     | `light +0.10`                       |
| mist    | Neblina        | cloud | reflection    | Gratis                     | `temperature +0.04`, `purity +0.03` |

Notas:
- QuickActions recibe props `cooldowns` y un handler `onAction(key) -> boolean`.  
- Si `onAction` devuelve `false` (porque abrimos un modal de ritual), **no** se inicia cooldown local ni se consumen recursos. El cooldown de los rituales se aplica **solo cuando se completa el ritual** y `handleAction(key)` se ejecuta correctamente desde `PlantScreen`.  
- Todos los botones muestran un helper corto (`helper` en `buildActionConfig`); al hacer long-press (o usar `ActionInfoModal`) se muestra la descripción completa (`ACTION_MECHANICS[key]`).

## 2. Rituales personales y modales

### Listado de rituales (`RITUAL_ACTIONS`)

| Key         | Modal / Archivo                                 | Flujo en `PlantScreen`                          | Efectos sobre mÃ©tricas |
|-------------|-------------------------------------------------|------------------------------------------------|------------------------|
| meditate    | `GuidedBreathModal.js`                          | `launchBreathModal()` â†’ `handleBreathComplete` | `mood +0.05`, `purity +0.03` |
| hydrate     | `HydrateModal.js`                               | `launchHydrateModal()` â†’ `handleHydrateComplete` | `water +0.08`, `mood +0.02` |
| stretch     | `StretchModal.js`                               | `launchStretchModal()` â†’ `handleStretchComplete` | `focus +0.05`, `temperature +0.02` |
| sunlight    | `SunlightModal.js`                              | `launchSunlightModal()` â†’ `handleSunlightComplete` | `light +0.08`, `mood +0.01` |
| visualize   | `VisualizeModal.js`                             | `launchVisualizeModal()` â†’ `handleVisualizeComplete` | `focus +0.03`, `mood +0.02` |
| journal     | `JournalModal.js`                               | `launchJournalModal()` â†’ `handleJournalComplete` | `focus +0.02`, `mood +0.03` |
| gratitude   | `GratitudeModal.js`                             | `launchGratitudeModal()` â†’ `handleGratitudeComplete` | `mood +0.04`, `purity +0.02` |
| restEyes    | `RestEyesModal.js`                              | `launchRestEyesModal()` â†’ `handleRestEyesComplete` | `focus +0.04` |

Detalles clave por modal:

- **GuidedBreath** (`src/components/plant/GuidedBreathModal.js`)
  - Estados: `phase (intro/active/done)`, `stepIndex`, `cycleIndex`, `timeLeft`.
  - AnimaciÃ³n: `breatheAnim` para el pulso del timer (Animated loop).
  - Timer basado en `BREATH_STEPS`.
  - `onComplete` se dispara cuando termina la sesiÃ³n o al pulsar â€œReclamar XPâ€.

- **Hydrate**
  - Cada vaso incrementa `hydrateCount` (persistido por dÃ­a con `HYDRATION_STATE_KEY`).
  - Barra de progreso (`progressAnim`) con easing.
  - SÃ³lo permite â€œSincronizar con la plantaâ€ cuando `count >= goal`.

- **Stretch**
  - Secuencia de 4 pasos guiados + temporizador.
  - `progressAnim` da un leve â€œbreathingâ€ al badge del timer.
  - Terminar la rutina llama `handleStretchComplete`.

- **Sunlight**
  - Timer de 5 minutos con botÃ³n `Iniciar/Pausar`.
  - `glowAnim` produce un halo animado alrededor del badge.
  - `handleSunlightComplete` se habilita sÃ³lo cuando el timer llega a 0.

- **Visualize**
  - `PROMPTS` rotativos; se guardan borradores en AsyncStorage (`mb:visualizeDraft`).
  - `fadeAnim` para un fade-in suave al abrir.
  - `addVisualizeEntry` registra el texto final en `mb:visualizeEntries`.

- **Journal**
  - EstÃ©tica dramÃ¡tica (gradient + quote).
  - Persiste borradores (`mb:journalDraft`) y entradas (`mb:journalLog`).
  - `onSave` envÃ­a un objeto `{ title, note, createdAt }` a `addJournalEntry`.

- **Gratitude**
  - Selecciona un mensaje al azar y muestra un CTA para abrir WhatsApp.
  - `fadeAnim` en la tarjeta de sugerencias.

- **RestEyes**
  - Temporizador simple de 20s con pulso (`Animated`).
  - Al completar llama `onComplete`, que a su vez ejecuta `handleAction("restEyes")`.

## 3. MÃ©tricas del Hero y efectos (`careMetrics`)

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

`handleAction(key)` llama `applyMetricEffects(key)` siempre que la acciÃ³n se ejecute correctamente. La funciÃ³n:

1. Obtiene los deltas del mapa.
2. Hace `setCareMetrics` sumando cada delta y clampenando `[0, 1]`.
3. Las chips del Hero se actualizan automÃ¡ticamente porque dependen del estado de `careMetrics`.

## 4. Persistencia (storage.js)

Claves relevantes:

| Clave             | DescripciÃ³n                              | Helpers                     |
|-------------------|------------------------------------------|-----------------------------|
| `mb:hydrationState` | Conteo diario de vasos                 | `getHydrationState` / `setHydrationState` |
| `mb:visualizeDraft` | Borrador actual de Visualizar          | `getVisualizeDraft` / `setVisualizeDraft` |
| `mb:visualizeEntries` | Log de visiones guardadas           | `getVisualizeEntries` / `addVisualizeEntry` |
| `mb:journalDraft`  | Borrador actual de Journal              | `getJournalDraft` / `setJournalDraft` |
| `mb:journalLog`    | Log de notas (formato `{ title, note, createdAt }`) | `getJournalEntries` / `addJournalEntry` |
| `mb:journalEntries` | Clave legacy (se migra a `journalLog`) | manejada dentro de `getJournalEntries` |

MigraciÃ³n Journal:
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
- SecciÃ³n â€œDiario personalâ€ muestra:
  - Entradas de Journal (mÃ¡x. 2) con tÃ­tulo, nota y fecha (`formatDate` helper).
  - Visiones (mÃ¡x. 2) con texto y fecha.
  - Mensaje vacÃ­o cuando no hay datos.

Estilos en `ProfileScreen.styles.js`:
- `diaryEntry`, `diaryTag`, `diaryTagVision`, `diaryTitle`, `diaryBody`, `diaryDate`, `diaryEmpty` definen el look de las tarjetas.

---

### PrÃ³ximos pasos sugeridos
1. **Contexto global**: mover `careMetrics`, `hydrateCount`, `journalLogEntries`, etc. a un provider (AppContext) para compartir entre pantallas y evitar mÃºltiples lecturas de AsyncStorage.
2. **Backend**: sincronizar los logs (visualizar / journal / hidrataciÃ³n) con el servidor cuando exista autenticaciÃ³n.
3. **UI**: mostrar un historial completo (modal/pantalla) y permitir borrar/editar entradas.
4. **Notificaciones**: conectar recordatorios push con el estado de cada ritual (goal, streak).

## 6. Mecanicas y reglas pendientes

### Economia (resumen actual)
- **Mana**: llega desde tareas y rachas; se gasta en Regar (-20) y Meditar (-10).
- **Monedas**: recompensas de retos/logros; Nutrir (-120) es su principal sink hoy.
- **Gemas**: reservadas para cosméticos/buffs legendarios (sin mecánica activa).

### Recompensas deseadas por ritual
- Hidratarme: +3 Monedas por vaso y bonus al completar 8/8.
- Estirar / Descansar ojos: reducir cooldown global por unos minutos.
- Visualizar / Journal: bonificaciones de Focus/Claridad convertidas en XP extra.
- Gratitud: +Mood y chance de recibir “gifts” semanales.

### Penalizaciones / salud
- Añadir decay cuando alguna métrica < 30%.
- Estado “marchita”: salud < 10% por 24h ? no gana XP hasta recibir cuidado.
- Buff “Escudo de racha”: pendiente de implementación.

### Integración con AppContext
1. Crear un provider de rituales/métricas que exponga careMetrics, hydrateCount, drafts y logs.
2. PlantScreen y ProfileScreen deberían consumir este contexto para evitar múltiples lecturas de storage.

### Sincronización backend (cuando exista)
- Mantener helpers de storage como interfaz; reemplazar su implementación con fetch/axios cuando haya API.
- Endpoints previstos: `/rituals/log`, `/journal`, `/metrics`.

### Ajustes de UI pendientes
- PlantScreen: paddingBottom en el ScrollView para evitar que el Footer tape el contenido.
- ProfileScreen: CTA “Ver más” y padding adicional en Diario.
- Revisión de textos con tildes/carácteres dañados.
- GratitudeModal: reemplazar el env�o directo a WhatsApp por un share sheet nativo (apps frecuentes y contactos recientes).

### Documentación futura
- Crear `docs/gameplay-rules.md` con tabla completa de costos, recompensas, penalizaciones y misiones.

## 7. Animaciones futuras por acción

**Objetivo**  
Dar feedback inmediato cuando se activa cada acción de cuidado sin bloquear la UI.

**Formato recomendado**  
- Priorizar animaciones Lottie (`assets/animations/care/<accion>.json`) para mantener peso bajo y permitir vectores.  
- Alternativa: spritesheets PNG si ya existe un clip (ej. limpiar.mp4 → 12 frames).  
- Para efectos simples (sacudidas, halos) podemos usar Reanimated/Moti sin assets externos.

**Arquitectura propuesta**  
1. Crear `ACTION_ANIMATIONS` con `{ type: "lottie"|"sprite"|"code", source, durationMs, loop }`.  
2. `QuickActions` seguirá llamando `onAction(key)`. Cuando `handleAction(key)` retorna `true`, `PlantScreen` llamará `AnimationManager.play(key)` para iniciar la animación asociada.  
3. Incluir un overlay opcional dentro de `ActionButton` para mostrar chispas o partículas locales, y otro en `PlantHero` para efectos globales (ej. halo iluminado).  
4. Duración sugerida: 1–1.5s; detener automáticamente al iniciar el cooldown o al recibir `AnimationManager.stop(key)`.

**Notas operativas**  
- No se almacenan videos crudos: conviene exportar desde Figma/After Effects directo a Lottie.  
- Documentar en `assets/animations/README.md` los fps, tamaños y responsables de cada animación.  
- Al migrar a AppContext, exponer también `playActionAnimation(actionKey)` para que otras pantallas puedan reutilizar la misma experiencia.

## 8. Features premium / paywall pendiente

**Cuidado recomendado (chips del hero)**  
- El carrusel de mini botones (regado, podar, etc.) se considera beneficio “Pro”.  
- Cuando activemos el plan premium:  
  1. Leer `featureFlags.recommendedCare` (ej. de AppContext/API).  
  2. Si es `false`, mostrar sólo un CTA genérico “Sube a Pro para ver recomendaciones” y bloquear `MiniActionChip`.  
  3. Mantener la lógica actual en modo gratuito para pruebas internas mientras definimos precios.

**Checklist premium (ideas futuras)**  
- Historial completo de rituales + métricas detalladas.  
- Animaciones exclusivas en QuickActions (ver sección 7).  
- Compartir diarios / exportar reportes semanales.  
- Boosts temporales (ej. reducción de cooldown) tras ver contenido patrocinado.

> Nota: Dejar documentado en cada feature nuevo si pertenece a “core” o “premium” para evitar mezclar experiencia gratuita con beneficios pagos.

