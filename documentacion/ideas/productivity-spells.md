# Concepto: Hechizos de Productividad (Nov 2025)

## Visión general
- Reemplazar la idea rígida de 'Focus Crystal' por una colección de herramientas/rituales productivos llamados **Hechizos de Productividad**.
- Cada hechizo representa una técnica (Pomodoro, Técnica 52/17, Focus Sprint, Meditación guiada, etc.) y puede activarse desde Home, pero se configuran desde un modal dedicado.
- El usuario elige qué hechizo se ancla al slot de Home (donde hoy vive el Cristal), usando un toggle selector dentro del modal o en el botón 'Recursos → Hechizos de Productividad' del drawer.

## Flujo propuesto
1. **Entrada**: botón en Drawer → Recursos → *Hechizos de Productividad* (opción nueva).
2. **Modal/Sheet**:
   - Grid de cartas con el nombre del hechizo, duración, beneficio y un CTA 'Seleccionar'.
   - Explicación breve + video/animación opcional.
   - Toggle global para mostrar/ocultar el slot en Home (por si el usuario quiere otro módulo en ese espacio).
3. **Home Slot**:
   - Renderiza el hechizo seleccionado: si es Pomodoro, muestra el widget actual; si es una sesión de meditación, mostraría audio/tiempo restante, etc.
   - Mantener API uniforme (estado, duración, auto-reanudar).

## Ideas de hechizos iniciales
| Hechizo | Técnica | Elementos clave |
| --- | --- | --- |
| **Cristal de Enfoque** | Pomodoro 25/5 | Igual al widget actual. |
| **Pulso del Dragón** | Técnica 52/17 | Largas sesiones profundizadas, menos interrupciones. |
| **Sprint Fulgor** | Focus Sprint 15 min | Ideal para tareas cortas. |
| **Niebla Restauradora** | Break guiado / respiración | Temporizador breve + guía de respiración. |
| **Meditación Arcana** | Meditación guiada (audio) | Reproductor simple, modo silencio. |

## Consideraciones
- Persistir la elección del hechizo para que Home respete el mismo módulo tras reinicios.
- Pensar en 'slots' futuros: ¿serán 1 o 2? ¿El usuario podría tener un carrusel de hechizos?
- Ajustar documentación de HomeActions y Drawer una vez se defina UX final.
- En Tasks:
  - **TaskModal**: sugerir hechizos según dificultad/estimado (p. ej. tareas largas → Pulso del Dragón).
  - **TaskCard**: botón compacto 'Activar hechizo' dentro del card cuando la tarea requiere foco. Al tocarlo:
    - Se abre el hechizo recomendado (shortcut al módulo seleccionado) y se registra qué tarea está asociada.
    - Se guarda la duración real usada con ese hechizo para calibrar cuánto tarda el usuario en completar tareas similares.
    - La próxima vez que una tarea se marque con la misma etiqueta/prioridad, la card puede mostrar 'Este hechizo te ayudó antes · 3 sesiones · 75 min'.
