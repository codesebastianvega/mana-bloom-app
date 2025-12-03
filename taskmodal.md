Piensa que estamos definiendo el “sistema nervioso” del TaskScreen.

1. La lógica general: el TaskScreen es un mapa vivo

Tu TaskScreen deja de ser “una lista de cosas” y se convierte en un mapa de estado de tu vida:

No filtras tareas: las tareas se mueven solas entre secciones según:

tiempo ⏳

prioridad 🚨

dificultad 💪

comportamiento (hábitos que se cumplen o se abandonan) 🌱💀

Eso hace que el usuario entienda de un vistazo dónde está el fuego, qué está tranquilo, qué es opcional y qué ya murió.

2. Entidades básicas (lo que la app maneja por debajo)

Tienes solo dos tipos de “objetos” en este sistema:

A) task (Tarea)

Propiedades clave (no técnicas, pero pensando en datos):

type: "task"

title

description

createdAt

dueDate (opcional)

priority: "low" | "normal" | "high"

difficulty: "low" | "medium" | "high"

hasSubtasks: true | false

completedAt (null si no está terminada)

deletedAt (si la mandas al cementerio manualmente)

B) habit (Hábito)

type: "habit"

title

frequency (diario / X veces por semana, etc.)

goalStreakDays (21, 30…)

createdAt

lastDoneDate

currentStreak

missedDaysInARow

isDead (cuando deja de ser hábito activo y va al cementerio)

3. Las secciones del TaskScreen y su “rol emocional”
   🧨 1) Jefes de Mazmorra

Qué representa:
Las cosas que te están “mirando feo”: tareas que no puedes seguir ignorando.

Qué entra aquí:

Tareas no completadas que cumplen al menos una de estas:

Ya están vencidas (dueDate <= hoy), o

Fueron creadas hace muchos días (age >= 7 días) y siguen sin hacerse, o

Tienen prioridad alta o dificultad alta.

Cómo se ve en la card:

Ribbon tipo:

“⚠️ Vencida hace 2 días”

“⏳ Hace 10 días sin tocar”

Visualmente más “intenso”: iconito de jefe, borde, o glow rojo.

Qué experiencia genera:
El usuario abre la app y sabe:

“Si solo hago algo hoy, que sea de este bloque”.

🌿 2) Misiones Tranquilas

Qué representa:
Las cosas que importan, pero no lo están quemando todavía.

Qué entra aquí:

Tareas no completadas que:

Tienen fecha futura (mañana, próxima semana), o

Fueron creadas hace poco (0–6 días) y no son prioridad alta.

Cómo se ve:

Ribbon:

“Para mañana”

“Faltan 4 días”

“Creada hace 1 día”

Qué experiencia genera:
Es el backlog sano.
El usuario siente:

“Puedo avanzar sin ansiedad, escogiendo cosas de aquí”.

🧩 3) Tareas Secundarias

Qué representa:
Side quests, cosas que si las haces, chévere; si no, el mundo no se cae.

Qué entra aquí:

Tareas con:

priority = low

o sin dueDate y dificultad baja

o marcadas explícitamente como “Secundaria”.

Cómo se ve:

Ribbon:

“Side quest”

“Opcional”

Qué experiencia genera:
Lugar donde aparcar ideas / microtareas sin saturar lo importante.

🔁 4) Hábitos Activos

Qué representa:
Los compromisos con tu versión futura.

Qué entra aquí:

Hábitos cuyo isDead = false.

Comportamiento diario:

Cada día:

Si lo completas → lastDoneDate = hoy, currentStreak++, missedDaysInARow = 0.

Si no lo completas y cambia el día → missedDaysInARow++, currentStreak puede quedarse o reiniciarse según la regla que definas.

Regla de muerte:

Si missedDaysInARow >= 3 → el hábito:

pasa a isDead = true

se mueve a Cementerio.

Cómo se ve:

Ribbon:

“🔥 Racha: 5 días”

“Racha rota” cuando quede en 0.

Qué experiencia genera:
Motiva a mantener vivas pocas cosas importantes. No satura.

💀 5) Cementerio

Qué representa:
El lugar de lo que ya fue: tareas cerradas, cosas abandonadas, hábitos muertos.

Qué entra aquí:

Tareas con completedAt != null.

Tareas eliminadas manualmente (deletedAt != null).

Hábitos con isDead = true.

Opcional:

Puedes dejar que este cementerio solo muestre lo de los últimos 7 días. Más viejo se purga solo.

Bonus UX:
Desde el Cementerio puedes:

“Revivir hábito” → vuelve a Hábitos Activos con currentStreak = 0, missedDaysInARow = 0.

Ver pequeños logs tipo:

“Este hábito murió por 3 días sin hacerlo”.

4. Cómo se mueven las tareas entre secciones (sin tocar nada)

No guardas en la BD qué sección tiene cada tarea.
La sección se calcula al momento de dibujar la pantalla.

Ejemplo con una tarea:

Día 0 → creas una tarea “Entregar pitch Mana Bloom”:

DueDate: dentro de 5 días

Prioridad: normal

Dificultad: alta

Render del TaskScreen:

No está vencida, ni muy vieja → Misiones Tranquilas.

Pero como dificultad es alta, podrías decir:

Si faltan ≤ 2 días → pasa automáticamente a Jefes de Mazmorra.

Pasa el tiempo:

Llegó el día del deadline y no la completaste:

Ahora dueDate <= hoy → Jefes de Mazmorra.

Si la completas:

completedAt = hoy → Cementerio.

Ejemplo con un hábito:

Hábito: “Tomar 2 vasos de agua al despertar”.

Día 1, 2, 3 → lo haces:

currentStreak = 3, missedDaysInARow = 0.

Sigue en Hábitos Activos.

Día 4, 5, 6 → no lo haces:

Día 4: missedDaysInARow = 1

Día 5: missedDaysInARow = 2

Día 6: missedDaysInARow = 3 → isDead = true → Cementerio.

En el Cementerio puedes mostrar:

“Este hábito murió tras 3 días sin hacerlo”.

Si el usuario lo revive:

Botón “Revivir hábito” → isDead = false, currentStreak = 0, missedDaysInARow = 0, vuelve a Hábitos Activos.

5. El ribbon: el mini-CEO de cada card

El ribbon es el micro-dashboard de cada tarea/hábito.
No cambia comportamiento, pero explica contexto.

Para tareas (task):

Si tiene dueDate:

Si dueDate > hoy:

“Faltan X días”

Si dueDate = hoy:

“Vence hoy”

Si dueDate < hoy:

“Atraso: X días”

Si no tiene dueDate:

“Creada hace X días”

Para hábitos (habit):

Si isDead = false:

“🔥 Racha: X días”

Si hoy aún no se ha hecho:

Puedes mostrar “Hazlo hoy para mantener tu racha”.

Si isDead = true (en Cementerio):

“💀 Muerto por inactividad”

Esto ayuda a que el usuario entienda por qué algo está en Jefes de Mazmorra, o en Misiones Tranquilas, o en Cementerio, sin leer manuales.

6. Cómo encaja todo con el lore de Mana Bloom

TaskScreen = El mapa de misiones y estados.

PlantScreen + rituales = El espacio de bienestar inmediato: botones rápidos que impactan a la planta y al usuario sin entrar al sistema de tareas.

Tienes:

Tareas/Hábitos = sistema de disciplina y objetivos.

Rituales (PlantScreen) = sistema de cuidado y bienestar instantáneo.

No se pisan, se complementan.

7. Ahora sí: reglas en formato JSON (conceptual)

Te dejo un esquema genérico que luego puedes traducir a lógica real:

{
"sections": {
"JEFES_DE_MAZMORRA": {
"appliesTo": "task",
"conditions": [
"completedAt == null",
"deletedAt == null",
"(",
"dueDate != null && dueDate <= today",
"OR ageInDays >= 7",
"OR priority == 'high'",
"OR difficulty == 'high'",
")"
]
},

    "MISIONES_TRANQUILAS": {
      "appliesTo": "task",
      "conditions": [
        "completedAt == null",
        "deletedAt == null",
        "NOT inSection('JEFES_DE_MAZMORRA')",
        "(",
          "dueDate == null",
          "OR dueDate > today",
        ")"
      ]
    },

    "TAREAS_SECUNDARIAS": {
      "appliesTo": "task",
      "conditions": [
        "completedAt == null",
        "deletedAt == null",
        "(",
          "priority == 'low'",
          "OR (dueDate == null && difficulty == 'low')",
        ")"
      ]
    },

    "HABITOS_ACTIVOS": {
      "appliesTo": "habit",
      "conditions": [
        "isDead == false"
      ]
    },

    "CEMENTERIO": {
      "appliesTo": "task|habit",
      "conditions": [
        "(",
          "completedAt != null",
          "OR deletedAt != null",
          "OR (type == 'habit' && isDead == true)",
        ")"
      ]
    }

}
}
