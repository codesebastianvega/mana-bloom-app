# Profile Screen Wireframe (Visual Draft)

## 1. Hero / Identidad
- Avatar con anillo de gradiente y botón de editar.
- Nombre + badge de rango mágico.
- “Días en la academia mágica” como frase corta de identidad.

## 2. Bloque de Progreso (múltiples barras)
- **Barra 1 – Nivel de jugador**
  - Chip `Nivel N`, barra XP, texto `XP actual / objetivo`.
- **Barra 2 – Estado de la planta**
  - “Salud de la planta”: barra tipo vitalidad (verde → amarillo → rojo).
- **Barra 3 – Fase de la planta**
  - Etapas visuales: brote → tallo → en flor → árbol.
  - Puede ser barra segmentada o stepper con íconos.

> Meta: consolidar en un mismo bloque la sensación de progreso global (nivel) + progreso de la planta (salud + fase).

## 3. Stats Rápidos (chips)
- Fila de 3–4 chips con datos clave:
  - Racha actual / mejor racha.
  - Tareas completadas en total.
  - Tiempo total de meditación / rituales de calma.
  - Ritual favorito (según uso).

## 4. Ritual Usage Chips (bienestar)
- Bloque específico para rituales de bienestar:
  - Chips tipo “Calma”, “Hidratación”, “Stretch”, etc.
  - Cada chip muestra:
    - Número de veces usado (hoy / semana / total) **o**
    - Tiempo acumulado (minutos) según aplique.
  - Visual: pequeño icono del ritual + contador + barrita mínima.

> Este bloque responde a “cómo estoy cuidando mi bienestar”, complementando los stats duros de tareas.

## 5. Colección / Fantasía
- **Jardín** (cuando GardenScreen exista):
  - Card pequeña con preview del jardín + CTA “Ver jardín”.
- **Easter eggs del jardín** (ya implementado):
  - Carrusel horizontal con los huevos (bloqueados/desbloqueados).
  - Mantener badges de rareza/lore en los eggs desbloqueados.
- Opcional: mini‑grid de “mascotas favoritas” o skins destacadas con CTA a inventario.

## 6. Logros Mágicos
- Sección “Logros mágicos”:
  - Highlight: próxima meta (“Maestro de tareas”, etc.).
  - AchievementsPanel con límite 3–4.
  - Botón “Ver todos” → AchievementsModal.

## 7. Progreso personal / Diario
- Bloque “Progreso personal”:
  - Métricas tipo: eficiencia (tareas/día), días productivos este mes, etc.
- Bloque “Diario personal”:
  - Últimas notas de journal y visiones (como ya está).
  - Vacío amigable cuando no hay datos.

## 8. Acciones suaves de perfil
- Acciones que son “sobre ti” (no de sistema):
  - Editar nombre / avatar.
  - Ver resumen de temporada / año (futuro).

> Nota: Ajustes técnicos (tema, sonido, cerrar sesión) NO viven aquí, se moverán al menú hamburguesa global.

---

## Menú hamburguesa (drawer global)

El menú hamburguesa se accede desde el header de las pantallas principales (Home, Planta, Jardín, Perfil) y contiene:

### Cuenta
- Ver perfil (lleva a ProfileScreen).
- Cambiar contraseña.
- Cerrar sesión.
- Eliminar cuenta (último ítem, en rojo).

### Apariencia & comportamiento
- Tema (oscuro / seguir sistema).
- Sonidos de la app (on/off).
- Vibración / haptics (on/off).

### Juego & progreso
- Notificaciones (recordatorios de racha, rituales, etc.).
- Idioma (cuando exista).

### Ayuda & comunidad
- Centro de ayuda / FAQ.
- Enviar feedback / reportar bug.
- Enlaces a Discord / Instagram.

### Acerca de
- Versión de la app.
- Créditos.

---

## Plan de trabajo (Profile + Drawer)

### Fase A – Reorganizar ProfileScreen (estructura)
- [ ] Reordenar secciones según jerarquía:
  - Hero → Bloque de Progreso (3 barras) → Stats rápidos → Ritual chips → Colección (Jardín/Easter eggs) → Logros → Diario → Acciones suaves.
- [ ] Ajustar textos y copies para que reflejen el tono de “academia mágica”.

### Fase B – Bloque de Progreso múltiple
- [ ] Unificar las barras de:
  - Nivel de jugador (XP).
  - Salud de la planta.
  - Fase/etapa de la planta.
- [ ] Diseñar estilos coherentes (mismas alturas / radios, distintos colores).
- [ ] Conectar cada barra a sus datos (mock primero, luego Context real).

### Fase C – Stats rápidos y chips de rituales
- [ ] Definir qué stats van a los chips (máx. 4) y qué se queda en bloques detallados.
- [ ] Implementar fila de chips para rachas, tareas, tiempo de meditación.
- [ ] Implementar bloque de “Rituales de bienestar” con chips por ritual y contadores.

### Fase D – Colección y fantasía
- [ ] Integrar preview del Jardín (cuando GardenScreen exista) en una card.
- [ ] Ajustar sección de Easter eggs para encajar con la nueva jerarquía.
- [ ] (Opcional) Añadir carrusel micro de mascotas/skins destacadas.

### Fase E – Limpieza de settings en Profile
- [ ] Mover las opciones de notificaciones, sonido, tema y cerrar sesión al drawer global.
- [ ] Dejar en Profile solo acciones relacionadas con la identidad (editar perfil) y el progreso.

### Fase F – Menú hamburguesa
- [ ] Diseñar UI del drawer global (estructura de secciones y estilo). 
- [ ] Implementar apertura desde el header en las pantallas principales.
- [ ] Conectar acciones básicas: cambiar tema (cuando esté listo), sonidos on/off, cerrar sesión.

> Esta guía sirve para repartir trabajo entre diseño y desarrollo y evitar que ProfileScreen vuelva a mezclar identidad/progreso con ajustes técnicos.

## Pendientes lógicos (para más adelante)

- Conectar los toggles del drawer (tema oscuro, sonidos, notificaciones) al estado global real.
- Reemplazar los mocks de inventario (mascotas, plantas, pociones, herramientas) con datos del `AppContext`.
- Activar la lógica de Easter Eggs (condiciones, combos, recompensas) una vez que la UI esté cerrada.
