# NavHaven Drawer – Estado Nov 2025

> Snapshot del rediseño del drawer global basado en el prototipo TSX. Sirve para alinear diseño/desarrollo y como referencia rápida antes de extender funcionalidad.

## Identidad del Header
- **Hero card** a ancho completo con gradiente (`#352358 → #1a122f`), padding generoso y radios 20px.
- Avatar con glow, anillo dorado y chip “Lv.X”.
- Tabs “Inicio / Perfil” incrustadas (_no_ se renderizan en Tasks_).

## Drawer – Detalle de secciones
| Zona | Componentes | Notas clave |
| --- | --- | --- |
| Perfil | Avatar glow + chip de nivel, tabs Inicio/Perfil | Mismo header en todas las pantallas excepto Tasks. |
| Promo | Tarjeta PRO “Grimorio Arcano” (PNG `libro de hechizos.png`). | Imagen posicionada absoluta, overlay místico. |
| Navegación | Jardín Zen, Mis Misiones, Historia, Bosque Social | Fondos glass, icon wrappers con acentos, chips compactos (“Ver”, “Listo”). Bosque Social usa mini avatares solapados. |
| Sincronización | Alertas, Sonidos, Vibración | Card glass con toggles personalizados (iconos suaves, switches escalados). |
| Recursos | Ajustes Avanzados, Ayuda del Oráculo, Guía del Grimorio, Reportar Anomalía, Portales Vinculados | Cada fila incluye descripción secundaria y chevron. |
| Footer | Cita lilácea + chip “Salir” | Wrapper a ancho completo con borde superior. |

## Experiencia visual
- **Backdrop**: `BlurView` + overlay oscuro (pendiente verificar en Android real, quizá requiere `pointerEvents="none"`).
- **Glass tokens**: `rgba(255,255,255,0.05)` con borde 0.5–1 px según caso.
- **Chips**: padding reducido, tipografía capitular 10 px, radios 6–8 px.

## Pendientes
- [ ] Confirmar rutas reales para “Guía del Grimorio”, “Reportar Anomalía” y “Portales Vinculados” (hoy son placeholders).
- [ ] Revisar intensidad y compatibilidad del blur en dispositivos de gama media.
- [ ] Documentar comportamiento del Focus Crystal en `documentacion/components/home`.
