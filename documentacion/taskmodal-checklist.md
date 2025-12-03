## TaskModal & TaskScreen Checklist

### Mapa Vivo
- [ ] TaskScreen como mapa vivo sin filtros manuales; tareas/hábitos migran entre secciones según tiempo, prioridad, dificultad y comportamiento (taskmodal.md:3).
- [ ] Sección se calcula al renderizar, nunca se persiste; seguir ejemplo de tareas que cambian entre secciones y terminan en el cementerio (taskmodal.md:215).
- [ ] Mantener rol: TaskScreen = mapa de estados, PlantScreen/Rituales = bienestar inmediato (taskmodal.md:315).

### Secciones
- [ ] **Jefes de Mazmorra**: pending con due vencido, edad ≥7 días o prioridad/dificultad alta; ribbon de atraso/abandono e intensidad visual (taskmodal.md:68).
- [ ] **Misiones Tranquilas**: pending con due futuro o edad <7 días sin prioridad alta; ribbons “Faltan/Creada hace” (taskmodal.md:98).
- [ ] **Tareas Secundarias**: prioridad baja, sin due + dificultad baja o flag secundario; ribbon “Side quest/Opcional” (taskmodal.md:127).
- [ ] **Hábitos Activos**: hábitos con isDead=false; mostrar racha y recordatorio diario (taskmodal.md:153).
- [ ] **Cementerio**: completed/deleted o hábitos muertos; opcional filtrar últimos 7 días y permitir “Revivir” (taskmodal.md:189).

### Ribbon Rules
- [ ] Tareas: due futuro → “Faltan X días”; due hoy → “Vence hoy”; due pasado → “Atraso X días”; sin due → “Creada hace X días” (taskmodal.md:279).
- [ ] Hábitos vivos: “🔥 Racha: X días” + aviso si falta completarlo; hábitos muertos: “☠ Muerto por inactividad” (taskmodal.md:299).

### Hábitos
- [ ] Actualizar `currentStreak` / `missedDaysInARow` diariamente; si missed ≥3 → `isDead=true` y mover al cementerio (taskmodal.md:153).
- [ ] Acción “Revivir hábito” que resetea streak y regresa a Hábitos Activos (taskmodal.md:209).

### Reglas Declarativas
- [ ] Implementar condiciones JSON por sección (taskmodal.md:333) para asegurar coherencia entre lógica y UI.
