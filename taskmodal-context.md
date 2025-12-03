## Estado actual del TaskModal (antes de reconstruir)

- CreateTaskModal.js volvi? al estado base del commit cd1119b (sin los cambios recientes de UI ni l?gica extra).
- CreateTaskModal.styles.js todav?a contiene estilos modernos para header, botones, dropdowns, etc. (mezcla de lo viejo y lo nuevo).
- Se perdieron:
  - Modal con bordes redondeados/gamma de colores custom.
  - Header ?Forjar Misi?n? grande.
  - Inputs estilizados de nombre/nota.
  - Afinidad elemental con tile tonal y texto din?mico.
  - Chips de prioridad/dificultad 2x2.
  - Dropdowns para Tiempo estimado y Fecha.
  - Secci?n de etiquetas estilo subtareas (card + chips inline).
  - Selectores de frecuencia/duraci?n para h?bitos.
  - L?gica para guardar habitFrequency y goalStreakDays.

### Notas
- Necesitamos reintroducir todo lo anterior paso a paso, manteniendo el progreso y validando en dispositivo.
- Siguiente paso: reconstruir la UI general (overlay, header, inputs) antes de pasar a afinidad y dem?s bloques.
