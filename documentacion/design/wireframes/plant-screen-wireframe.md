// [MB] Módulo: Plant / Sección: Wireframe
// Afecta: PlantScreen
// Propósito: Describir layout y jerarquía visual actuales de la pantalla de la planta
// Puntos de edición futura: actualizar cuando cambien acciones, métricas o balance elemental
// Autor: Codex - Fecha: 2025-11-25

# Plant Screen Wireframe (v1 - Align con notas y estado actual)

## 1. Header de Estado
- Contenido (según notas de diseño recientes):
  - Mensaje de estado de la planta (ej. “Floreciendo”, “Sedienta”).
  - Barra de salud / vitalidad.
  - Dos stats destacados:
    - Nivel de planta / etapa.
    - Rituales o cuidados recientes.
- Visual:
  - Fila superior con texto y barra, sin chips extra de racha ni cápsulas de recursos.

## 2. Hero de Planta
- Imagen principal:
  - Usa `assets/matureplant.png` como hero base (planta madura).
- Contenido:
  - Nombre de la planta (mock o desde storage).
  - Estado textual (felicidad, vitalidad).
  - Fila `XP / ETA`:
    - XP de la planta o progreso hacia la siguiente fase.
    - ETA aproximado basado en acciones o riego.
  - Acciones principales:
    - Regar.
    - Meditar.
    - Cambiar maceta (puede abrir futura UI de skins/cosméticos).

## 3. Balance Elemental
- Sección de “dona” + grid de elementos:
  - Donut / gráfico circular arriba que representa el mix de elementos (fuego, agua, tierra, viento).
  - Debajo, grid 2×2 con íconos de elementos:
    - `assets/fire.png`
    - `assets/water.png`
    - `assets/earth.png`
    - `assets/wind.png`
- Cada celda del grid:
  - Icono grande del elemento.
  - Label corto (ej. “Fuego”, “Agua”).
  - Posible indicador de balance (porcentaje o “Preferido”).

## 4. Acciones de Cuidado (cards o botones)
- Fila/ grid de acciones que el usuario puede tomar:
  - Regar, Alimentar, Limpiar, Podar, Luz, Neblina, Buscar, Meditar, etc.
- Cada acción:
  - Icono.
  - Label.
  - Placeholder de costo (mana / coins / gratis), a conectar con economía en iteraciones posteriores.
- Estados futuros:
  - Cooldowns por acción (ej. no regar en intervalos demasiado cortos).
  - Feedback visual de éxito (pequeños toasts o highlight en planta).

## 5. Métricas de Cuidado (mock)
- Sección que refleja métricas internas (mock por ahora):
  - Hidratación.
  - Limpieza.
  - Luz.
  - Atención/afecto.
- Visual:
  - Barras horizontales o chips indicando nivel (bajo/medio/alto).
  - Podrían mapearse a los efectos reales en XP/planta en futuras iteraciones.

## 6. Conexiones con otras pantallas
- Vínculos:
  - Inventario: para aplicar pociones o herramientas específicas sobre la planta.
  - Tienda (Shop): para comprar macetas, auras o boosters.
  - Garden: para ver la planta en el contexto del jardín.
- Por ahora, la mayoría de las conexiones son conceptuales; se prioriza la experiencia de cuidado en esta pantalla.

## Notas

- Esta pantalla se apoya fuertemente en el tema visual (gradientes, artes de planta, íconos elementales).
- La lógica de economía y buffs (felicidad, buffs de XP, etc.) se conectará cuando AppContext y economy estén totalmente alineados.

