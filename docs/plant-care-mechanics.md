# Plant Care Mechanics

## Variables Base
- **Salud (HP)**: Promedio ponderado de Agua, Luz, Nutrientes, Pureza y Temperatura (próximamente también Rituales, Focus y Energía del suelo). Disminuye si alguna métrica cae por debajo de umbrales.
- **Ánimo (Mood)**: Refleja motivación; sube con actividades de descanso o sociales, baja con tareas pendientes acumuladas.
- **Etapas**: Semilla → Brote → Joven → Madura (gating por XP acumulada).
- **Buffs**: Efectos temporales (ej. XP doble, Escudo de racha, Manantial arcano).

## Recursos
- **Maná**: Tareas completadas, misiones diarias, rachas cortas. Se usa para regar, meditar, activar buffs básicos.
- **Monedas**: Retos semanales, logros clave. Compran nutrientes premium, cosméticos.
- **Gemas**: Logros mayores, eventos especiales. Buffs raros o skins legendarias.

## Acciones de Cuidado
1. **Regar**
   - Coste: Maná bajo.
   - Efecto: Aumenta Agua, salud y un poco de XP.
   - Gatillo sugerido: Completar 1–2 tareas cortas. Alerta cuando Agua < 30%.
2. **Dar luz**
   - Coste: None; requiere que el usuario salga o haga actividad física ligera.
   - Efecto: Sube Luz.
   - Gatillo: Paseos, ejercicio, exposición al sol. Si Luz < 30% por 24h, reduce XP ganado.
3. **Nutrientes**
   - Coste: Monedas.
  - Efecto: Sube Nutrientes y activa buff de crecimiento (XP extra).
   - Gatillo: Recompensa de retos semanales o logros; el usuario decide cuándo aplicarlo.
4. **Meditar / Calmar**
   - Coste: Maná bajo.
   - Efecto: Sube Ánimo y activa buff ligero (bono de XP/maná por un tiempo).
   - Gatillo: Sesiones de bienestar (meditación, journaling, respiración).
5. **Cambiar maceta / Skins**
   - Coste: Monedas o gemas.
   - Efecto: Cosmético + buff pasivo (ej. maceta acuática da más agua al regar).

## Pérdida de Vida y Alertas
- Salud cae 1–2% cada 4h si alguna métrica permanece < 25%.
- Salud < 10% durante 24h → estado “marchita” (sin XP hasta atenderla).
- Buff “Escudo de racha” protege salud si el usuario mantuvo constancia.

## Relación Planta ↔ Usuario
- **Agua**: Microtareas, hábitos rápidos.
- **Luz**: Actividad física / contacto con el exterior.
- **Nutrientes**: Proyectos profundos, aprendizaje.
- **Ánimo**: Descanso mental, autocuidado.
- **Pureza / Aire**: Orden, limpieza, ventilación del espacio (acciones “Limpiar” o “Ventilar”).
- **Temperatura**: Clima real vs. rango óptimo de la planta; habilita features como invernaderos o lámparas.
- **Rituales cumplidos**: Ritual semanal de bienestar; tiene bloque propio en PlantScreen para diferenciar hábitos personales de los cuidados directos y aun así repercute en la salud.
- **Focus / Estrés**: Sesiones de Guided Breath o meditación; reduce cooldowns y evita penalizaciones.
- **Energía del suelo / Fertilizante**: Se representará como refuerzo directo de Nutrientes (no chip separado) mediante ítems consumibles.

## Misiones
- **Diarias**: Combos sencillos; dan maná + agua.
- **Semanales**: Retos mayores; entregan nutrientes + monedas.
- **Eventos especiales**: Tormentas mágicas, eclipses; piden cuidado extra o dan buff global.

## UX / Notificaciones
- Panel “Estado” con semáforo (OK / atención / crítico).
- Notificaciones positivas (“Tu planta quiere luz, ¿tomas 10 minutos de paseo?”).
- Reportes diarios/semanales: resumen de cuidados, próximos objetivos.

## Próximos pasos
- Integrar métricas con contexto real cuando exista.
- Ajustar penalizaciones tras playtesting.
- Añadir misiones dinámicas ligadas a temporadas o eventos.

## Nuevas métricas y futuros ítems (2025-02)
- **Motivación del cambio**: mostrar directamente en PlantScreen cómo Pureza, Temperatura, Rituales, Focus y Energía del suelo impactan la salud para que el usuario entienda qué hábito reforzar.
- **Motivación del cambio**: PlantScreen muestra ahora dos grupos de métricas: esenciales (Agua, Luz, Nutrientes, Ánimo, Pureza) junto al hero y métricas de bienestar (Temperatura, Rituales, Focus) bajo la barra de salud.
- **Motivación del cambio**: PlantScreen muestra ahora dos grupos de métricas: esenciales (Agua, Luz, Nutrientes, Pureza) junto al hero, mientras que Temperatura, Ánimo y Focus se agrupan en chips de bienestar; los rituales ejecutados desde QuickActions alimentan una tarjeta dedicada que indica cuántos hábitos personales están activos.
- **Datos ficticios temporales**: hasta que tengamos `AppContext` + API de clima, las métricas se mockean en `PlantScreen` para permitir iterar en UI y usabilidad sin bloquear por backend.
- **Invernaderos y lámparas**: cuando la temperatura real esté fuera del rango óptimo, la app sugerirá comprar un “Invernadero Arcano” o “Lámpara UV” (ítems que compensan clima). Se documentarán en el catálogo de tienda y desbloquearán especies específicas.
- **Nuevas especies**: algunas plantas (ej. rosales) exigirán temperatura mínima; otras (suculentas, plantas tropicales) usarán los nuevos ítems como requisitos de desbloqueo, fomentando coleccionismo.
- **Persistencia**: las métricas extendidas se guardarán en AsyncStorage y luego en backend para mantener continuidad entre sesiones y dispositivos.
---

# Plant Care Mechanics v1 (actualizado)

## Acciones de planta (costo, efecto, buff, cooldown)
- Regar
  - Costo: -20 Maná
  - Efectos: +15 Agua; Vitalidad +2h (buff temporal)
  - Cooldown: 2h
  - Notas: refresca el buff si se vuelve a aplicar
- Alimentar
  - Costo: -120 Monedas
  - Efectos: +10 Nutrientes; Crecimiento +1h (puede otorgar XP extra al cerrar tareas)
  - Cooldown: 3h
- Limpiar
  - Costo: Gratis
  - Efectos: +10 Pureza
  - Cooldown: 15m
- Meditar (respiración guiada)
  - Costo: -10 Maná
  - Efectos: +30 XP al completar; Calma +45m (reduce cooldowns un 10% mientras dure)
  - Cooldown: 45m

## Rituales de bienestar (vínculo IRL → recompensas en app)
- Hidratarme (1 vaso)
  - Recompensas: +3 Monedas; Vitalidad +30m; racha de 30 días → +10 Gemas
  - Objetivo diario: 8 vasos (~2L) → bonus +20 Monedas al completar
- Estirarme (3 movimientos)
  - Recompensas: Vitalidad +30m
- Chequeo de luz (salir/abrir cortinas)
  - Recompensas: Luz +30m
- Visualizar metas (1 objetivo)
  - Recompensas: Focus +20m
- Journaling flash (1 frase)
  - Recompensas: Claridad +20m
- Compartir gratitud (1 mensaje)
  - Recompensas: Ánimo +20m
- Descanso de ojos (20s)
  - Recompensas: Descanso visual +10m

## XP, etapas y progreso
- XP se obtiene por acciones (p. ej., Meditar) y por tareas completadas
- Etapas: Semilla → Brote → Joven → Madura (no hay “tope duro”; al llegar a Madura se desbloquean cosméticos/metas extendidas y el progreso continúa)
- Indicadores del hero:
  - “XP N%”: porcentaje hacia la siguiente etapa
  - “Faltan X XP”: XP pendiente (antes “ETA”)
  - Barra de progreso ligada a growthPercent

## Monedas, Gemas y Maná
- Maná: viene de tareas, diarias, rachas cortas; se usa en Regar/Meditar
- Monedas: retos/diarias; sinks en Alimentar y tienda
- Gemas: logros y rachas largas (p. ej., agua 30 días)

## Buffs y stacking
- Los buffs no apilan duración; reaplicarlos refresca el tiempo restante
- Los buffs pueden modificar cooldowns o dar probabilidad de XP extra

## Tooltips y detalle
- En el botón: helper corto (qué hace + costo + beneficio inmediato)
- Mantener pulsado o icono de “i”: modal con costos, recompensas, buffs, duración, cooldown y metas IRL

## Copia recomendada de helpers (botón)
- Regar: “Riega la planta (+15 Agua, Vitalidad +2h) • -20 Maná”
- Alimentar: “Nutre la tierra (+10 Nutrientes, Crecimiento +1h) • -120 Monedas”
- Limpiar: “Limpia hojas y maceta (+10 Pureza) • Gratis”
- Meditar: “Relaja el aura (+30 XP al completar) • -10 Maná”
- Hidratarme: “Toma agua con tu planta (1 vaso) • Monedas +3”
- Estirarme: “Activa el cuerpo (3 estiramientos) • Vitalidad +30m”
- Chequeo de luz: “Busca luz natural unos minutos • Luz +30m”
- Visualizar metas: “Visualiza tu objetivo del día • Focus +20m”
- Journaling flash: “Escribe 1 frase sobre tu estado • Claridad +20m”
- Compartir gratitud: “Envía un agradecimiento • Ánimo +20m”
- Descanso de ojos: “Mira lejos 20s • Descanso visual +10m”

## Notas de implementación
- Los helpers cambian a “Disponible en Xm” cuando el cooldown > 0
- Long‑press existente muestra tooltip; el botón “i” opcional abre el modal de mecánicas
- Los buffs refrescan tiempo, no se apilan
