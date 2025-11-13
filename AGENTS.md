# AGENTS.md

## Contexto

- App Expo 54 (SDK 54), React Native 0.81, React 19.
- Estructura: `src/components`, `src/screens`, tokens en `src/theme.js`.
- Objetivo: productividad y hábitos gamificada; el usuario cultiva una planta virtual con maná ganado por tareas y rachas.

## Principios

1. Cambios **pequeños y atómicos**; mensaje de commit claro.
2. Mantener **consistencia** en imports, rutas y estilos (`*.styles.js` cuando crezcan).
3. **UI/UX puede cambiar**, pero salvo que la tarea lo pida, evitar rediseños grandes.
4. Respetar el **tema oscuro, gradientes y espaciado** existentes.

## Estado y datos (transición)

- Aún **no hay estado global** ni **persistencia**.
- Plan de etapas:
  1. Estado mínimo con **Context** (maná, estado de planta) en memoria.
  2. Agregar **AsyncStorage** para persistir (maná, tareas, rachas).
  3. Extender a más pantallas (tienda, perfil).

## Cómo correr

- Instalar: `npm ci`
- Iniciar: `npm run start` (o `npm run web`)
- Android/iOS: `npm run android` / `npm run ios`

## Verificación mínima (temporal)

- `npm test` (placeholder) debe finalizar **OK**.
- La app debe iniciar sin errores.
- Si toca encabezados/top bars, usar `react-native-safe-area-context` para evitar solaparse con el notch.

## Alcance de tareas típicas

- Integrar y ajustar componentes (p. ej. encabezado en Home).
- Añadir UI simple (badges, contadores, barras).
- Preparar tokens en `theme.js` (evitar “hardcodear” colores/tamaños).
- Añadir Context y luego persistencia con AsyncStorage.

## Checklist por tarea

- [ ] Compila y arranca sin errores.
- [ ] `npm test` OK (placeholder).
- [ ] Cambios limitados a lo pedido.

## Convenciones para nuevas/archivos modificados

- Encabezado obligatorio al inicio de cada archivo nuevo o modificado:

// [MB] Módulo: <Home|Tasks|etc> / Sección: <...>
// Afecta: <pantalla/componente principal>
// Propósito: <qué hace este archivo>
// Puntos de edición futura: <dónde tocar si cambio la UI>
// Autor: <Sebas|Codex> - Fecha: YYYY-MM-DD

- Mantener componentes por sección en subcarpeta `src/components/home/` (o `plant/`, `profile/`, según corresponda).
- Preferir tokens de `theme.js` (Colors, Spacing). No hardcodear colores salvo acentos específicos.

## Notas recientes

- **PlantScreen (visual)**
  - Header de estado = mensaje + barra de salud + 2 stats (Nivel, Rituales) sin chips de racha ni cápsulas de recursos.
  - Tarjeta hero usa `assets/matureplant.png`, incluye fila “XP / ETA” y acciones (Regar, Meditar, Cambiar maceta).
  - Balance elemental = dona arriba + grid 2×2 con íconos `assets/fire|water|earth|wind.png`.
- **CreateTaskModal**: mantener starfield visible (sin blur ni overlays opacos).
- **Estilo de archivos**: no introducir secuencias `\n` literales; escribir saltos reales.

