# PlantScreen Wireframe

## Layout Overview
```
PlantWireframeScreen
+-- SafeAreaView
    +-- ScrollView
        +-- HeaderCard
        �   +-- LevelBlock
        �   +-- ResourcesBlock
        +-- HeroSection
        �   +-- PlantAvatar
        �   +-- BuffCarousel
        +-- MetricsSection
        �   +-- MetricCard � 4 (Water, Light, Nutrients, Mood)
        +-- ActionsSection
        �   +-- QuickActionRow (Water, Feed, Clean, Meditate)
        +-- ProgressSection
            +-- StageSummary
            +-- TimelineListPS D:\BUSSINESS CHAN\CHAN\Programacion\mana-bloom-app> npx expo install react-dom react-native-web
› Installing 2 SDK 54.0.0 compatible native modules using npm
> npm install

added 19 packages, and audited 715 packages in 7s

72 packages are looking for funding
  run `npm fund` for details

found 0 vulnerabilities
PS D:\BUSSINESS CHAN\CHAN\Programacion\mana-bloom-app> 
```

## Visual Notes
- **HeaderCard**: glass effect (transparent background + border) similar a `StatsHeader`.
- **HeroSection**: full width gradient (usar `Gradients.mana` por defecto), avatar centrado 200�200.
- **BuffCarousel**: horizontal pills con icono + tiempo restante.
- **MetricsSection**: grid 2�2, cada card con `Spacing.base` y `Radii.lg`.
- **ActionsSection**: botones pill (icono + label + costo) alineados con wrap.
- **ProgressSection**: card con t�tulo, subt�tulo �Pr�ximo hito�, timeline simple (icono + t�tulo + delta).

## Token Checklist
| Elemento          | Token sugerido            |
| ----------------- | ------------------------- |
| Fondos            | `Colors.surface`, `Colors.surfaceAlt` |
| Gradientes        | `Gradients.xp`, `Gradients.mana`      |
| Bordes            | `Radii.lg`, `Radii.pill`              |
| Espaciado         | `Spacing.base`, `Spacing.small`       |
| Tipograf�as       | `Typography.h2`, `Typography.body`, `Typography.caption` |

## Componentizaci�n sugerida
- `HeaderCard` (nuevo): reutilizable en planta para resumen r�pido.
- `BuffPill` (reutilizable): icono + label + countdown.
- `MetricCard` (reutilizable): t�tulo, valor, barra mini.
- `QuickActionButton` (reutilizable): icon + label + costo.
- `TimelineItem` (reutilizable): icon + texto + delta.

## Diferencias vs Home/Tasks
- Hero en Planta requiere un gradiente dominante y avatar central, mientras Home muestra tarjetas m�ltiples.
- M�tricas y acciones en Planta miran hacia el �estado de cuidado�, no a tareas.
- InventorySheet se mantiene como overlay modal (wireframe muestra entrada + CTA), se documentar� cuando se conecte el estado real.

---
Este wireframe sirve como gu�a visual/estructural sin l�gica. El componente `PlantWireframeScreen` usa placeholders para iterar r�pido en estilos.
