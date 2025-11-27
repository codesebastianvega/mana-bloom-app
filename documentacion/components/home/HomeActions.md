# Home Actions & KPIs (Nov 2025)

> Resumen de los módulos superiores del Home screen vinculados al nuevo flujo de bienvenida. Sirve para QA y para futuros ajustes al onboarding/HUD.

## Welcome Hero
- Smart Agenda detecta la siguiente tarea real (prioridad/fecha) y la muestra como "Siguiente paso".
- Saludo contextual (mañana/tarde/noche) + subtítulo con flavor narrativo.
- KPIs compactos: Tareas pendientes, Racha de fuego días, Retos activos.

## Focus Crystal (Pomodoro)
- Vive dentro del slider de Hechizos (scroll horizontal con dots). Cada slide ocupa el slot completo.
- Layout lateral: a la izquierda una columna de presets (Profundo 25m, Sprint 15m, Micro 5m) como chips compactos; a la derecha la card rectangular con el cristal mágico.
- El cristal usa el PNG ssets/potions/critalmagico.png, animado con pulso; la tarjeta tiene acentos azules (FOCUS_ACCENT) consistentes con la UI del home.
- Bajo los chips vive un chip ancho "timer row" que muestra el tiempo restante y el texto "Presiona el cristal para iniciar/pausar".
- Fila inferior: botón "Auto‑reanudar" (chip con icono infinito) + chip "Reiniciar"; entre ellos y el copy "Sesión en curso / Reanuda · queda 12:10" hay una barra de progreso lineal ligeramente más gruesa que las barras estándar.

## Social Ticker
- Barra debajo del header que rota eventos de la comunidad ("Alex reclamó la recompensa diaria").
- Animación de fade cada ~5s y puntos indicadores ocultos (se usan los datos reales del feed).

### Pendientes
- [ ] Documentar interacciones de largo plazo (qué pasa si no hay tareas activas en Welcome Hero y Focus Crystal al mismo tiempo).
- [ ] Validar performance del Focus Crystal en dispositivos de gama media/baja.
