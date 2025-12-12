# Plant Component

> **Screen:** `PlantScreen`  
> **Location:** `src/screens/PlantScreen.js`  
> **Last Updated:** 2025-12-07

## Overview
El dashboard de la planta resume salud, hábitos y próximos pasos. La pantalla quedó organizada en cuatro bloques:
1. **Tarjeta de identidad** – nombre, etapa, racha 🔥 y dos tiles minimalistas con emojis (`☀️ Clima actual`, `🌿 Vitalidad`).  
2. **PlantHero (“Signos”)** – integra chips de cuidado esenciales, métricas de bienestar y estado climático.  
3. **QuickActions + modales de rituales** – acciones contextuales (regar, limpiar, meditar, etc.) conectadas a `ACTION_MECHANICS`.  
4. **Balance elemental + Tips del jardinero (PRO)** – dona + grid con consejos por elemento y un bloque de IA premium que sugiere qué cuidar.

## Cambios realizados (2025-12-07)
- **Tarjeta heroica refrescada:** se eliminó el avatar ficticio, se añadió chip de racha con emoji, y los tiles de clima/vitalidad ahora usan tipografía reducida y fondo translúcido para aligerar la lectura.
- **Consejos del jardinero (PRO):** nuevo módulo fuera de la tarjeta con badge “PRO” (mismo estilo que Productivity Spells), tarjeta con borde glow y tips plegables (“Ver tips/Ocultar”). El contenido es contextual: sugerencia de acción, riego pendiente, rituales inactivos y alerta climática.
- **ElementBalance:** strings normalizados en ASCII, tarjetas plegables, resumen con cápsulas de sincronía/estado. Se retiró el trigger implícito hacia `CreateTaskModal` para evitar aperturas accidentales.
- **Higiene de copy:** se reemplazaron textos mixtos (“Prioriza limpiar hoy”, acentos rotos) por mensajes en español neutro (“Sugerencia: …”, “Clima estable”). Emojis ayudan a contextualizar sin saturar.

## Arquitectura / datos
```
AppContext (mana, wallet, buffs)   Storage (tasks, hydration)   Supabase (metrics)
            │                                   │                      │
            └──────────────┬────────────────────┴──────────────┬───────┘
                           │                                   │
                      PlantScreen                       sync helpers
                           │
      PlantHero / QuickActions / ElementBalance / GardenerTips
                           │
                   handleAction → ACTION_MECHANICS
```

- `careSuggestion` deriva de métricas locales mientras llega el backend real.
- `hydrateCount`, `ritualActiveCount` y `climateInfo` alimentan los tips.
- `gardenerExpanded` controla el plegado pero aún no persiste entre sesiones.

## Pendientes identificados
1. **Datos reales para los tips PRO:** conectar con API/IA definitiva y parametrizar copy (actualmente hardcodeado).
2. **Persistir estado del acordeón:** guardar `gardenerExpanded` en storage o contexto para mantener preferencia.
3. **Gating PRO real:** validar tier del usuario antes de mostrar el bloque; hoy solo se aplica branding.
4. **Integrar balance elemental → acciones:** definir el flujo para abrir filtros/tareas desde las tarjetas sin volver a mostrar el modal anterior.
5. **Normalizar emojis/strings en `ACTION_MECHANICS` y buff presets** para evitar mojibake pendiente.

## Conexiones
- **Tasks/Productivity:** siguen determinando recursos y evolución; los tips deben reaccionar a la cantidad de tareas completas cuando el backend esté listo.
- **Shop/Skins:** la tarjeta heroica contempla acentos por maceta; falta exponer el selector de skins renovado.
- **Hydration / Ritual tracking:** la UI usa `hydrateCount` y `ritualActiveCount` locales; al sincronizar con Supabase esos valores deben venir del backend.

## Related Docs
- [Plant Care Mechanics](../../mechanics/plant-care.md)
- [Rituals](../../mechanics/rituals.md)
- [PlantScreen Roadmap](../../design/plant/plant-screen-roadmap.md)

---
Mantener esta ficha actualizada cada vez que se toque la UI o la lógica de PlantScreen.
