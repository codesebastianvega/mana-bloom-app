# Carpeta de actualización

Este archivo irá guardando el plan de trabajo y la posición del componente que estemos migrando desde los prototipos TSX a la base en JavaScript.

## Flujo propuesto
1. Recibir el TSX y mock del componente.
2. Guardar el TSX original en esta carpeta para referencia.
3. Traducir/adaptar el componente a JavaScript dentro de src/ respetando los patrones existentes.
4. Documentar aquí decisiones clave, pendientes o dudas antes de avanzar al siguiente componente.

## Snapshot del prototipo (TSX)
- Ubicación: ctualizacion/mana-bloom/
- Contiene App.tsx completo, constantes y los componentes pedidos (WelcomeHero, FocusCrystalWidget, SocialTicker, PlantStatus, PlantCareRituals, NavHavenDrawer, StickyHeader, etc.).
- Usaremos esta carpeta como referencia mientras reescribimos cada pieza en React Native JS dentro del proyecto principal.

### Pendientes actuales
- [ ] Revisar el primer mock + componente que migraremos (a definir con el usuario).
- [ ] Documentar mapeo entre nombres del prototipo y componentes existentes para evitar duplicados.
- [ ] Definir checklist por componente (traducción TSX→JS, hooks/estado, estilos, integración en pantalla correspondiente).

## Home (fase 1)
- Header global sticky: reutilizar el diseño actual de HomeHeader como alias StickyHeader para usarlo en Home, Tasks, Plant y Profile (abre drawer con useDrawer(), estado de planta, notificaciones).
- SocialTicker: portado desde el prototipo y montado en Home, usando el feed de useNewsFeed con fallback; animación de fade e intervalo de 5s.
- Welcome card: adaptada con saludo por hora, avatar con estado, Smart Agenda que toma la siguiente tarea real (prioridad), KPIs: tareas pendientes, racha y retos activos.

## Home (fase 2 - Focus Crystal)
- ProductivitySpellsSlider (ex FocusCrystalWidget) ahora es la plantilla del carrusel de hechizos; el slide del Cristal de Enfoque convive con Pulso del Dragón compartiendo los mismos chips, timer y helper texts (ver wireframe en `documentacion/design/wireframes/productivity-spells-slider.md`).
- Imagen ssets/potions/critalmagico.png integrada como centro del widget; acentos azules (FOCUS_ACCENT) alineados con la UI de home.
- La gema es el botón principal (presionar para iniciar/pausar); debajo, chip de timer + texto "Presiona el cristal para iniciar/pausar", barra de progreso y fila de Auto-reanudar/Reiniciar.
- Pendiente: probar en dispositivos con menos memoria que la animación del cristal no degrade el render.

## Drawer global (NavHaven)
- AppDrawer reescrito: header a ancho completo con gradiente, avatar glow + chip de nivel, tabs incrustadas.
- Tarjeta PRO usa el PNG del libro, overlay y tipografías reforzadas. Chip "Ver" (Jardín) y PRO comparten estilo cuadrado.
- Lista de navegación: fondo glass, icon wrappers con bordes, badges compactos y Bosque Social con mini avatares solapados.
- Sincronización ahora es un card glass con switches personalizados. Recursos incluye Ajustes, Oráculo, Guía, Reportar, Portales.
- Footer espeja al header: cita lila, chip "Salir" y wrapper a ancho completo. Backdrop usa BlurView (revisar por qué no se ve en algunos Android).

### Pendientes inmediatos
- [ ] Revisar BlurView (quizás necesita pointerEvents="none" o intensidad distinta).
- [ ] Definir pantallas reales/placeholder para Guía, Feedback y Portales.
- [ ] Medir rendimiento del Focus Crystal en gama media/baja.
- [x] Implementar siguiente hechizo en el slider (Pulso del Dragón) siguiendo el mismo patrón visual (ya vive en `FocusCrystalWidget` con fases 52/17, controles de encadenado y UI propia).
- [ ] Conectar el botón "Hechizos de Productividad" desde el drawer a un modal/lista de hechizos.
- [ ] Extender el nuevo lenguaje de UI a Tasks, Plant y Profile.
