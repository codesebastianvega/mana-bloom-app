# Mana Bloom

Mana Bloom es una app de productividad y habitos gamificada donde cultivas una planta virtual alimentada por tu progreso diario. El mana que ganas al completar tareas mantiene viva a la planta y desbloquea nuevas etapas de crecimiento.

## Objetivos del proyecto
- Entregar una experiencia accesible que motive rutinas saludables mediante retroalimentacion visual constante.
- Iterar rapido en UI/UX mobile-first basada en gradientes oscuros, vidrio y componentes reutilizables.
- Documentar el flujo de trabajo para que contribuciones futuras sean consistentes con la vision del equipo.

## Caracteristicas clave
- Cuidado de la planta: vista PlantScreen con header de estado, barra de salud, estadisticas, hero con avatar y acciones contextuales (regar, meditar, cambiar maceta).
- Moneda y progresion: mana, experiencia y rachas impulsan el crecimiento; las acciones tienen costos, cooldown y efectos visibles.
- Ecosistema de componentes: bloques reutilizables en `src/components` con estilos desacoplados en archivos `.styles.js` cuando el tamaño lo requiere.
- Visuales tematizados: tokens centralizados en `src/theme.js` para colores, gradientes, tipografias, espaciado y radios; evitar hardcodear valores.
- Sin persistencia aun: el estado se mantiene en memoria mientras se completa la etapa 1 del roadmap.

## Stack tecnico
- Expo SDK 54 (React Native 0.81, React 19).
- React Navigation (tabs y native stack).
- React Native Reanimated, Gesture Handler y Safe Area Context.
- AsyncStorage (dependencia lista para la etapa de persistencia).
- Expo Linear Gradient, Blur y fuentes personalizadas.

## Estructura del proyecto
```
src/
  components/      componentes compartidos agrupados por dominio (plant/, home/, etc)
  screens/         pantallas principales
  theme.js         tokens de estilo (Colors, Gradients, Spacing, Typography, Radii)
docs/
  plant-screen-wireframe.md   referencia visual para la pantalla de planta
assets/
  ...              iconos elementales, ilustraciones de la planta y fondos
```

## Requisitos y configuracion
1. Node 18 o superior y npm 9+.
2. Instalar dependencias con `npm ci`.
3. Iniciar Metro bundler: `npm run start` (o `npm run web`, `npm run android`, `npm run ios` segun plataforma).
4. Pruebas placeholder: `npm test` (debe responder `OK: no hay tests formales todavia`).
5. La app debe abrir sin errores en Expo Go o en el Web bundler.

## Guia de desarrollo
- Cambios pequeños y atomicos; cada commit debe describir claramente la modificacion.
- Mantener consistencia en alias, rutas y patrones de estilos. Crecer hacia archivos `.styles.js` cuando haya multiples bloques de estilo.
- Conservar el tema oscuro, gradientes y espaciado actuales; si se agregan variantes deben declararse en `theme.js`.
- Encabezado obligatorio en cada archivo de codigo tocado:
  ```js
  // [MB] Modulo: <Home|Tasks|etc> / Seccion: <...>
  // Afecta: <pantalla/componente principal>
  // Proposito: <descripcion breve>
  // Puntos de edicion futura: <notas de mantenimiento>
  // Autor: <Sebas|Codex> - Fecha: YYYY-MM-DD
  ```
- Cuando se modifique layout cercano a zonas seguras, usar `react-native-safe-area-context`.
- PlantScreen: seguir el wireframe documentado (header con resumen, hero con gradiente `Gradients.mana`, metricas 2x2, acciones pill, timeline compacto).
- CreateTaskModal: mantener el starfield visible, sin overlays opacos ni blur completo.

## Estado actual y roadmap
1. Estado minimo en memoria con Context (mana y planta) **en progreso**.
2. Persistencia con AsyncStorage para mana, tareas y rachas.
3. Nuevas pantallas: tienda, perfil, mejoras permanentes.
4. Integrar audio/sensaciones y micro-animaciones opcionales.

## Recursos utiles
- `docs/plant-screen-wireframe.md` para layout y tokens sugeridos.
- `src/theme.js` como unica fuente de verdad para estilos.
- Issues del repositorio para prioridades y bugs abiertos (proximamente).

## Contribuir
1. Haz un fork del repositorio.
2. Clona tu fork: `git clone https://github.com/<tu-usuario>/mana-bloom-app.git`.
3. Crea una rama descriptiva: `git checkout -b feature/nueva-accion`.
4. Implementa cambios siguiendo la guia de desarrollo.
5. Ejecuta `npm test` y arranca la app para validar que no haya errores.
6. Sube la rama y abre un Pull Request explicando el alcance y capturas si aplica.

## Licencia

Proyecto bajo licencia MIT. Revisa `LICENSE` para mas detalles.
