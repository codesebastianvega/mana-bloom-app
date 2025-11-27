# Plan de actualización TaskCards (JS actual vs TSX de referencia y mock RPG)

## 1. Referencias y fundamentos
- **Referencia TSX (actualizacion/mana-bloom/components/TasksScreen.tsx)**: agrupa por prioridad (Jefes = alta, Secundarias = media/baja, Historial = completadas) y usa progreso derivado del filtro activo. No implementa swipe/expansión, es un mock web con confetti.
- **Mock RPG (imágenes)**: tres secciones fijas, tarjetas con swipe (verde/rojo), círculo de check a la derecha, acordeón con botón de foco, subtareas, tags y recompensas visibles, estados visuales (prioridad, fecha, elementos).
- **JS actual (src/screens/TasksScreen.js + TaskCard actual)**:
  - Agrupa boss/side/completed, pero las secciones no están etiquetadas ni estilizadas como en el mock.
  - `TaskCard` tiene estilos básicos, sin cuerpo de swipe visible ni círculo de check a la derecha; expansión y subtareas existen pero con layout pobre.
  - Progreso diario ya usa `filteredTasks`, pero la UI sigue simple.
  - Radii y estilos no corresponden al look “glass” del mock.

Conclusión: no necesitamos rehacer toda la lógica de datos; hay que rearmar la UI/gestos de las cards y las secciones.

## 2. Gaps clave entre JS y referencia/mock
1) **Estructura de lista**: faltan secciones visibles “Jefes de Zona / Misiones Secundarias / Historial” y el orden debe ser fijo (alta → media/baja → completadas).
2) **Swipe UI**: no se muestran las capas verde/roja ni el círculo de check; thresholds y rebote deben ser claros.
3) **Cabecera de tarjeta**: en el mock hay tipo, fecha, elemento, chips de tags y prioridad visibles; en JS es minimal.
4) **Expansión**: acordeón debe mostrar botón “Iniciar foco”, descripción completa y subtareas con estilo, similar al mock.
5) **Recompensas/estado**: mostrar XP/Mana y subtareas completadas (x/y) alineadas al mock; opacidad reducida en historial.
6) **Estilos**: radios más cuadrados, fondo vidrio, bordes sutiles, iconos y colores por prioridad/elemento.

## 3. Plan de trabajo detallado

### Fase A: Lista y agrupación
- Añadir encabezados de sección al render: “🔥 Jefes de Zona”, “📜 Misiones Secundarias”, “Historial”.
- Garantizar orden: `bossTasks` (prioridad alta, pendientes) → `sideQuests` (resto pendientes) → `completedTasks`.
- Mantener filtros actuales (`typeFilter`, `activeFilter`) y recalcular progreso diario con `filteredTaskStats` (ya hecho).

### Fase B: Nueva TaskCard (reutilizar lógica, rearmar UI)
- Crear layout con tres capas: fondo swipe left/right (verde éxito / rojo peligro) + contenido.
- Añadir gesto horizontal: seguir dedo, disparar complete/delete en ±100 px, rebote si no supera umbral. Reusar callbacks existentes (`onToggleComplete`, `onSoftDeleteTask`).
- Añadir check “círculo” a la derecha que refleje `completed` y dispara toggle.
- Encabezado: icono de elemento, tipo (Tarea/Hábito/Misión), fecha (Hoy/Mañana), prioridad chip (Urgente/Alta/Media/Baja), tags (#).
- Cuerpo compacto: título, descripción corta; recompensas (⚡ XP / 💧 Mana), subtareas x/y.
- Modo expandido (tap): botón “Iniciar foco” (usa `onEditTask`/futuro hook), descripción completa, checklist con toggle de subtareas, input “Añadir paso...” (opcional si existe en TaskCard).
- Estados visuales: borde/acento para prioridad alta (Jefes), opacidad reducida + check verde en completadas (Historial), desactivar swipe delete en completadas si se quiere.

### Fase C: Estilos y tokens
- Radios: usar valores reducidos ya en `theme` (6/10/14/18) y aplicar 10/12 en card.
- Fondo “glass”: background rgba con blur ligero (si disponible) y borde translúcido. Sombras suaves.
- Colores de swipe: success/danger del tema. Chips con borde sutil (no amarillos fuertes).
- Progreso diario ya con gradiente gris; ajustar bordes para coherencia con cards.

### Fase D: Integración y pruebas
- Verificar que `filteredTasks` y `filteredTaskStats` mantienen conteos correctos por tab.
- Probar swipe en pendientes y completadas, expansión y subtareas.
- Probar filtros (Todos/Tareas/Hábitos/Misiones/Rituales/Papelera) y que la barra/footnote se actualicen.

## 4. Entregables
- Nueva `TaskCard` con gestos y acordeón alineada al mock.
- Secciones de lista con títulos y orden fijo.
- Estilos de tarjeta (glass, chips, recompensas) coherentes con el diseño RPG.
- Notas de prueba manual (swipe, expand, filtros).

## 5. Riesgos/decisiones
- Swipe y scroll anidado: asegurar que gestures no bloqueen el scroll vertical (usar pan responder / gesture handler).
- Performance: usar `FlatList` con `keyExtractor` estable y evitar renders extra (memo donde aplique).
- Feature creep: priorizar primero la UI/gestos; extras como añadir paso nuevo pueden venir después.

## 6. Notas de sync/backend (tareas y app)
- Contrato de tareas: id UUID, user_id, title, status/done/completed, completed_at, is_deleted, priority, type (tarea/hábito/misión/ritual), element, difficulty, tags[], subtasks[], note/description. Defaults: arrays vacíos y flags en false.
- Ciclo de tareas: crear (insert, Supabase genera UUID, actualizar local), update/complete/delete (upsert con UUID), papelera = is_deleted true. Hidratar: merge cloud sobre local solo si cloudData.tasks es array; si no, usar locales.
- Recompensas/XP: al completar se dispara APPLY_TASK_REWARD y se puede sincronizar perfil (mana/xp/coin/gem) vía pushProfile.
- Progreso diario: usa sólo tareas del tab/type activo, excluye eliminadas; conteo y footnote se recalculan con filteredTaskStats.
- Errores/offline: no crashear si faltan arrays (normalizar tags/subtasks), loggear fallos de Supabase y reintentar; AsyncStorage como respaldo.
- Seguridad/RLS: todas las queries a Supabase deben filtrar por user_id; revisar reglas de tablas (profiles, tasks, inventory, journal, daily metrics).
- Compatibilidad: si backend agrega campos nuevos, ignorar o normalizar; si no envía subtasks/tags, usar [].

## 7. Trabajo realizado hoy (UI + lógica)
- Header de TasksScreen alineado al mock: search con placeholder nuevo, tabs en slider horizontal y tarjeta de progreso en vidrio con gradiente.
- Progreso diario contextual: calcula completadas/total según el tab activo, excluyendo eliminadas; texto del footnote se adapta al tipo.
- Chips y bordes menos redondos (ajuste global de Radii) y estilos de search/tabs/chips para lucir más cuadrados.
- Fix de sync: hidrato normaliza tareas y sólo itera cloudData.tasks si es array; IDs locales se reemplazan por UUIDs generados en Supabase sin crashear.
\n\n## 8. Ideas visuales pendientes\n- Estados completados/archivados: bajar opacidad o tinte general y desactivar CTA.\n- Feedback: resaltar hover/tap en tarjeta y CTA con sombra leve.\n- Subtareas: icono verde en checkbox completado, limitar texto largo con ellipsis.\n- Separadores: reforzar l�nea entre CTA y descripci�n si hiciera falta.\n
