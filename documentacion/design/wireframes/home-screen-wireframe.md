// [MB] Modulo: Home / Seccion: Wireframe
// Afecta: HomeScreen
// Proposito: Describir layout y jerarquia visual actuales del Home
// Puntos de edicion futura: actualizar cuando cambien secciones o se conecten mas datos reales
// Autor: Codex - Fecha: 2025-11-25

# Home Screen Wireframe (estado actual)

## Orden de secciones
1) Header (HomeHeader)  
2) Welcome Card (HomeWelcomeCard)  
3) PromoBannerSlider  
4) Hero de progreso (HomeHeroSection: nivel/XP + recursos + buffs)  
5) Recompensas (HomeRewardsSection: racha/claim)  
6) Desafios diarios (DailyChallengesSection)  
7) Tienda magica (MagicShopSection: tabs, cards, CTA)  
8) Inventario (InventorySection: slider horizontal de 5 chips)  
9) Eventos misticos (EventHighlightsSection)

## Detalle por bloque

- **Header**  
  Branding, iconos de notificaciones y menu. Chip de estado (nombre + estado planta). Respeta safe area.

- **Welcome Card**  
  Avatar + saludo + frase. KPIs de tareas/habitos/retos. CTA “Ir a mis tareas”.

- **PromoBannerSlider**  
  Banners con gradiente/texture, CTA por banner. Dots centrados.

- **Hero de Progreso**  
  Card de nivel con numero grande y barra XP. Chips de recursos (Mana/Coins/Gems). Resumen de buffs activos.

- **Recompensas (racha)**  
  Card gradiente oscuro. Titulo “Racha de N dias”, subtitulo dinamico y texto de bono. Boton “Reclamar” (gradiente naranja/rojo) o badge “Reclamado”. Link a recompensas sociales.

- **Desafios diarios**  
  Header con CTA “Ver todos los desafios”. Cards con icono, reward a la derecha, estado (“En progreso/Completada”), contador, barra, y boton “Reclamar” (glass lila oscuro) cuando aplica.

- **Tienda magica**  
  Header + tabs horizontales por categoria. Lista vertical de cards de productos (imagen/emoji, titulo, precio). CTA inferior ancho completo “Ver tienda completa” con gradiente glass.

- **Inventario**  
  Titulo + CTA “Abrir”. Slider horizontal de chips rectangulares (104x64 aprox) con icono blanco + numero + label (Pociones, Herram., Cosmeticos, Plantas, Mascotas). Fondo/borde blanco translucido, acento solo en el borde.

- **Eventos misticos**  
  Gradiente azul glass, timeline de 3 items con dots y conectores. Badge “Temporada” azul. CTA “Explorar calendario” debajo del divisor.

## Pendientes
- Mover AchievementsSection al Drawer (no se muestra en Home).  
- Definir reintroduccion de DailyReward (modal/Drawer o card separada junto a racha).  
- Conectar banners/eventos/desafios a feeds remotos cuando esten listos.  
- Revisar assets finales (banners, shop items) y copiar en docs cuando se actualicen.
