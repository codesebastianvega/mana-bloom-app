// [MB] Módulo: Common / Sección: Modals Wireframes
// Afecta: CreateTaskModal, modales de recompensas, logros y otros diálogos clave
// Propósito: Dejar referencia visual/estructural de todos los modales importantes para poder recrearlos rápido
// Puntos de edición futura: actualizar cuando se añadan nuevos modales o cambie su contenido
// Autor: Codex - Fecha: 2025-11-25

# Modals Wireframes (v1)

## 1. CreateTaskModal

### 1.1 Layout general
- Tipo: modal de hoja (bottom sheet) o pantalla completa según plataforma.
- Secciones:
  1. Header:
     - Título “Nueva tarea” / “Editar tarea”.
     - Botón de cerrar (X).
  2. Campos principales:
     - Título (input).
     - Nota / descripción (textarea corta).
  3. Metadatos:
     - Tipo: Tarea vs Hábito.
     - Prioridad (Baja, Media, Urgente) con color y XP base.
     - Elemento (Agua, Fuego, Tierra, Aire) con icono y tooltip.
  4. Campos orientados a economía (según integración actual):
     - Tiempo estimado (minutos).
     - Ventana de ejecución (fecha/hora opcional).
  5. Footer:
     - Botón “Guardar tarea”.

### 1.2 Integración con Task Integrity y Economía
- Usa helpers definidos en `taskIntegrity` y `economyConfig`:
  - Sugerencias de recompensas/cooldowns según tiempo estimado.
  - Validación de límites diarios (tareas y recompensas).
- Visual actual:
  - Labels y helpers textuales (no necesariamente gráficos avanzados aún).

---

## 2. Daily Reward Modal (si aplica)

> Nota: en el estado actual, la recompensa diaria se muestra principalmente como card en Home. Este bloque define el modal/panel que podría reutilizarse.

### 2.1 Contenido
- Icono o ilustración central (cofre, estrella, etc.).
- Título: “Recompensa diaria”.
- Texto: descripción de la recompensa de hoy (tipo y cantidad).
- Detalles:
  - Racha actual y mejor racha.
  - Condición para mantener la racha.
- Botones:
  - “Reclamar” (si está disponible).
  - “Cerrar” o “Más tarde”.

### 2.2 Comportamiento
- Al reclamar:
  - Llama a `CLAIM_TODAY_REWARD` en AppContext.
  - Actualiza racha (`streak`) y registra fecha de reclamo.

---

## 3. AchievementsModal

### 3.1 Layout general
- Título: “Todos los logros”.
- Lista scrollable de logros.
- Cada item:
  - Título del logro.
  - Descripción.
  - Barra de progreso.
  - Texto `progreso/objetivo`.
  - Estado:
    - “Listo para reclamar”.
    - “Reclamado”.
    - “En progreso”.
  - Botón `Reclamar` cuando aplica.

### 3.2 Conexión con AchievementsPanel
- AchievementsPanel (en Profile) muestra preview (3–4 logros).
- AchievementsModal muestra el listado completo, usando el mismo estado de AppContext.

---

## 4. Inventory / Item Detail Modal (futuro)

> Aún no existe como modal dedicado, pero este wireframe sugiere su estructura en caso de añadirlo.

### 4.1 Contenido mínimo
- Imagen grande del ítem.
- Nombre + categoría.
- Descripción corta (lore/efecto).
- Cantidad actual.
- Acciones:
  - Usar (si es usable).
  - Descartar.

---

## 5. Auth / Misc Modals

### 5.1 Login/Signup (pantallas, no modales estrictos)
- Aunque son pantallas completas, se tratan como “modales de flujo”:
  - Inputs de correo/contraseña.
  - Botones para alternar entre Login y SignUp.
  - Mensajes de error y loading.

### 5.2 News / Bandeja de mensajes
- Modal `NewsInboxModal`:
  - Lista de noticias (cards ligeras).
  - Posibilidad de marcar como leído o abrir detalle en futuras iteraciones.

---

## Notas

- Este archivo no sustituye la documentación de componentes (`docs/components/*`), sino que da una vista rápida de las estructuras para reconstruirlos.
- Cuando un modal cambie visualmente o gane nuevas secciones, actualizar aquí para mantener la referencia alineada con el código.

