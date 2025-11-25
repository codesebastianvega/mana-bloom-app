// [MB] Modulo: Navigation / Seccion: AppDrawer
// Afecta: Overlay global desde burger button
// Proposito: Documentar la estructura y flujos del nuevo drawer “Navbar Haven”
// Puntos de edicion futura: actualizar si cambian las secciones o accesos rapidos
// Autor: Codex - Fecha: 2025-11-25

# AppDrawer (Navbar Haven)

## Resumen
- Archivo: `src/components/navigation/AppDrawer.js`
- Invocacion: siempre montado dentro de `App.js`, visible cuando `drawerOpen` es `true`.
- Trigger: `HomeHeader` y otros componentes llaman `useDrawer().openDrawer()`.

## Layout
1. **Header**
   - Avatar emoji 🌱 + titulo “Navbar Haven”.
   - Subtitulo dinámico: `Nivel {level} • Racha {streak}d`.
2. **Atajos mágicos**
   - Reutiliza `NavChip`.
   - Chips: Jardín, Tienda, Tareas, Logros (abre Profile con `focus: achievements`).
   - Copy recordatorio: “Disponible desde cualquier pantalla.”
3. **Secciones**
   - **Cuenta**: Ver perfil, Cerrar sesión, Eliminar cuenta.
   - **Apariencia**: Switches para `themeDark`, `haptics`, `sounds`.
   - **Juego & progreso**: Switch `notifications`.
   - **Ayuda & comunidad**: Links (Help Center, Discord, Report bug).
4. **Pie**
   - Versión (`expoConfig.version`) + nota de que las changelog viven en `documentacion/changelog`.
   - Botón “Cerrar”.

## Estado y acciones
- Nuevos campos en `AppContext`:
  - `drawerOpen: boolean`.
  - `preferences: { themeDark, sounds, notifications, haptics }`.
- Acciones disponibles:
  - `OPEN_DRAWER` / `CLOSE_DRAWER` / `TOGGLE_DRAWER`.
  - `SET_PREFERENCE` con `{ key, value }`.
- Hook `useDrawer()` expone `{ isDrawerOpen, openDrawer, closeDrawer, toggleDrawer }`.

## Navegacion
- Se usa `navigationRef` para navegar aun cuando el drawer esté fuera de la jerarquía de React Navigation.
- Cada `NavChip` y item `Cuenta` cierra primero el drawer y luego navega.

## Futuras mejoras
- Persistir `preferences` en AsyncStorage cuando se integre el sistema de settings.
- Añadir estados e iconografía dinámica (ej. foto real del usuario).
- Integrar métricas rápidas (mana, XP restante) al header del drawer.
