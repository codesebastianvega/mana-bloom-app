# Estado backend / Supabase (implementado vs pendiente)

## Implementado hoy
- **Perfiles (`profiles`)**: mana, xp/xp_goal, level, streak, wallet (coin/gem) se leen/escriben vía `fetchUserData` / `pushProfile` desde AppContext.
- **Tareas (`tasks`)**: hidratar mergeando nube→local; crear inserta y toma UUID generado; update/complete/delete upsert con UUID; borrado suave `is_deleted`. Normalización de tags/subtasks para evitar crashes.
- **Inventario (`inventory`)**: lectura en hidrato; upsert por ítem (`pushInventoryItem`) con sku/category/quantity.
- **Buffs (AppContext)**: se guardan en storage y se limpian expirados; XP x2 aplicado en recompensas.
- **Recompensas/XP**: `APPLY_TASK_REWARD` calcula deltas y sincroniza perfil; aplica coin/gem si corresponde.
- **Desafíos diarios (`dailyChallenges`)**: generación determinística por día; estado persistido en storage.
- **Recompensa diaria (`dailyReward`)**: sorteo diario con peso; estado/claim persistido en storage.
- **Noticias (`news`)**: feed básico cargado/guardado en storage.
- **Logros (`achievements`)**: progreso y desbloqueo guardados; manejo defensivo si el catálogo no carga.
- **Journal (`journal_entries`)**: lectura/upsert disponible en `pushJournalEntry`.
- **Métricas diarias (`daily_metrics`)**: helper `updateDailyMetrics` para upsert por fecha/usuario.

## Pendiente / por reforzar
- **RLS y filtros**: revisar reglas en Supabase para asegurar todas las tablas filtran por `user_id`.
- **Offline/reintentos**: hoy los fallos de push loguean pero no hay cola de reintentos; definir estrategia de “dirty queue” o retry backoff.
- **Consistencia de tareas**: evitar duplicados al reconectar; quizá marcar lastSync/etag o reconciliar por `updated_at`.
- **Subtareas**: esquema en Supabase no guarda estructura detallada; decidir si se normaliza en tabla aparte o JSON.
- **Rituales/PlantScreen**: eventos/rituales no se están enviando; definir tabla o reutilizar métricas diarias.
- **Garden/placements**: si se sincroniza estado de jardín, falta contrato (tabla garden_items o similar).
- **Inventario/buffs bulk**: hoy se hace upsert por ítem en loop; evaluar endpoint batch o RPC para eficiencia.
- **Monedas/gemas**: `pushProfile` actualiza wallet, pero faltan rutas de gasto/compra validadas en backend.
- **Versionado de esquema**: documentar cómo manejar campos nuevos (defaults) para clientes viejos.
- **Logs/telemetría**: no hay colección de eventos de uso; decidir si se guarda en Supabase (tabla events) o en otro servicio.

## Checklist de lanzamiento (backend/app)
- Autenticación y RLS: reglas revisadas en todas las tablas, filtrado por `user_id`, sin fugas entre usuarios.
- Offline/reintentos: decidir si se tolera pérdida de eventos; si no, implementar cola de reenvío o backoff.
- Consistencia y duplicados: usar `updated_at`/etag para reconciliar tareas y evitar duplicados al reconectar.
- Subtareas y JSON: definir contrato (tabla o JSON estable) para subtasks/tags; normalizar siempre arrays.
- Rituales/Garden: si se incluyen en el MVP, definir esquema y sync; si no, deshabilitar endpoints para no romper.
- Monedas/gemas/billing: rutas de gasto/compra validadas; si hay pagos, preparar facturación, TOS, privacidad y etiquetado de datos en Play Console.
- Crash/analytics: integrar crash reporting y métricas básicas sin violar privacidad.
- Build/signing: keystore lista, íconos/splash finales, permisos mínimos, pruebas en dispositivos físicos; versiones de app y code push controladas.
