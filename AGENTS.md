# AGENTS.md

## Contexto

- App Expo 53, React Native 0.79, React 19.
- Estructura: `src/components`, `src/screens`, tokens en `src/theme.js`.
- Objetivo: productividad y hábitos gamificada; el usuario cultiva una planta virtual con maná ganado por tareas y rachas.

## Principios

1. Cambios **pequeños y atómicos**; mensaje de commit claro.
2. Mantener **consistencia** en imports, rutas y estilos (`*.styles.js` cuando crezcan).
3. **UI/UX puede cambiar**, pero salvo que la tarea lo pida, evite rediseños grandes.
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

// [MB] Módulo: Home / Sección: Tienda Mágica (Pestañas)
// Afecta: HomeScreen (layout principal)
// Propósito: UI de tienda con tabs Potiones|Herramientas|Cosméticos
// Puntos de edición futura: estilos .styles.js y data mock en la sección
// Autor: <tu_nombre o Codex> - Fecha: YYYY-MM-DD

- Mantener componentes por sección en subcarpeta `src/components/home/`.
- Preferir tokens de `theme.js` (Colors, Spacing). No hardcodear colores salvo acentos de cada tab (ver abajo).

## Encabezado obligatorio en archivos nuevos o modificados

// [MB] Módulo: <Home|Tasks|etc> / Sección: <...>
// Afecta: <pantalla/componente principal>
// Propósito: <qué hace este archivo>
// Puntos de edición futura: <dónde tocar si cambio la UI>
// Autor: <Sebas|Codex> - Fecha: YYYY-MM-DD

## Verificación de ejecución (política práctica)

- Prioridad: `npm test` (placeholder) debe terminar OK.
- Opcional: `npx expo doctor` para chequeos de entorno.
- `expo start` o `npm run web` son auxiliares: si fallan por red/puerto/proxy, NO bloquean la tarea.
- La validación visual final la hago yo en Expo Go (QR en mi teléfono).
