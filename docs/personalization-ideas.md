// [MB] Modulo: Docs / Seccion: Personalizacion Avatar y Pins
// Afecta: UI de Home (avatar y decoraciones)
// Proposito: Registrar ideas para pines, marcos y eventos tematicos
// Puntos de edicion futura: mover a Notion/base de conocimiento cuando se valide
// Autor: Codex - Fecha: 2025-10-07

# Ideas de Personalización (Avatar & Pins)

## Pins temáticos
- Estacionales: Halloween (calabaza brillante), Equinoccio (hoja dorada), Sakura (flor rosada animada).
- Eventos propios: Torneo de hábitos, Semana Arcana; se desbloquean completando misiones especiales.
- Colaborativos: pines de comunidad o clanes que se asignan según el grupo al que pertenezca el usuario.

## Marcos para avatar
- Marcos coleccionables que se compran con maná/gemas o se ganan por logros (neón arcano, cristal, enredaderas).
- Variantes con rareza (común/épico/legendario) para incentivar la colección.
- Marcos reactivos: cambian sutilmente según el estado de la planta (floreciendo agrega destellos, marchita atenúa colores).

## Progresión y badges
- Rachas: Jardinero Novato (3 días), Cuidador Experto (14 días), Guardián Eterno (60+).
- Logros temáticos: “Alquimista” por uso de pociones, “Explorador Nocturno” por completar tareas tarde.
- Asignar pin + marco al badge activo pero permitir que el usuario reserve diseños previos en un inventario.

## Reglas de activación
- Mantener un *slot* para pin decorativo y otro para marco; ambos se cargan desde estado global.
- Permitir rotación en la tienda para crear urgencia (pins disponibles por tiempo limitado).
- Compatibilidad con personalización futura (selector en perfil, vista previa antes de equipar).

## Tienda de gemas y monetización suave
- Paquetes escalonados de gemas con bonos crecientes (Starter 200 gemas, Adept 500 + bono, Maestro 1200 + ítem exclusivo).
- Bundles temporales que combinan gemas + marco/pin exclusivo para motivar compras puntuales.
- Suscripción estacional “Greenkeeper Pass” con goteo semanal de gemas, boosts ligeros y acceso temprano a decoraciones.
- Recompensas sociales: permite enviar “regalos de gemas” entre amigos con un pequeño fee; abre oportunidades de viralidad.
- Ofertas dinámicas basadas en progreso (si la planta está marchita, ofrecer kit de recuperación; si completa racha, paquete de celebración).

### Flujo sugerido
1. Entrada a la tienda desde Home (botón “Tienda Mágica”) muestra tabs: Decoraciones, Consumibles, Gemas.
2. En la tab de Gemas: tarjetas con precio local, bonus, CTA “Comprar” → abre modal de confirmación (y posteriormente flujo de IAP).
3. Tras la compra, mostrar animación de cofres/gemas y aplicar la recompensa al wallet.
4. Registrar historial de compras para habilitar recompensas de lealtad (descuentos, marcos exclusivos).

## Ideas complementarias
- Edición de nombre de planta desde Perfil: mover las acciones de renombrar fuera del header principal para evitar toques accidentales y concentrar personalización (nombre, maceta, skins) en un flujo dedicado.
- Etiquetas claras de métricas en header: mostrar chips/etiquetas "Crecimiento" y "Salud" junto a sus visualizaciones (barra XP y chip de salud) para evitar ambigüedades.
- **Daily Deals**: ofertas relámpago de 24 h con descuento en gemas o bundles; muestra un contador regresivo en Home.
- **Misiones Premium**: desafíos extra que, al completarse, devuelven parte de la compra en gemas o entregan cosméticos únicos.
- **Cofres sorpresa**: cajas de recompensas que se pueden comprar con gemas; definen rarezas (común/épica) y contienen decoraciones aleatorias.
- **Sistema de crafting**: permitir convertir 3 pins repetidos en uno nuevo; fomenta compras y evita frustración por duplicados.
- **Eventos comunitarios**: metas colectivas (ej. regar 10k plantas entre todos) que desbloquean un pin/marco gratuito para quienes contribuyeron.
- **Referidos mágicos**: al invitar amigos que completen el tutorial, ambos reciben un paquete de gemas o decoración.
- **Publicidad optativa**: ver un anuncio corto para obtener gemas adicionales, limitado a X veces por día (monetización liviana para usuarios free).
- **Vitrina destacada**: rotar cada semana un set “Curador” con storytelling (ej. “Noche Estelar”) para que la tienda se sienta viva.

## Desafíos globales
- Modal dedicado accesible desde Home (botón en la card de desafíos diarios) para listar retos comunitarios.
- Tipos de retos: colaborativos (suma de maná global), competitivos por leaderboard, hitos personales de larga duración.
- Recompensas escalonadas (maná, gemas, cosméticos exclusivos) e insignias especiales para top contribuyentes.
- Visuales sugeridos: barra de progreso global, contador regresivo, lista de contribuciones recientes, CTA “Contribuir ahora”.
- Backend: necesita endpoints para progreso global y reclamación de recompensas; considerar snapshots diarios para evitar fraudes.

## Economía de monedas
- **Maná**: moneda “soft” que se gana a diario; se gasta en consumibles y boosts (pociones de XP, recargas). Siempre accesible y recargable con retos rápidos.
- **Coins**: moneda de progreso, otorgada por desafíos semanales/eventos; habilita compras utilitarias (herramientas, mejoras que ahorran tiempo). Ideal para retener a mid-core players.
- **Gemas**: moneda premium/coleccionable, ligada a logros épicos o IAP. Se usa para cosméticos, marcos y bundles exclusivos.
- En la UI siempre mostrar ícono + tooltips que expliquen el uso (“Maná: energía diaria”, “Coins: mejoras”, “Gemas: cosméticos”). Ubicar enlaces rápidos para obtener más de cada moneda.
- Prever conversión en el futuro (ej. packs de gemas que incluyen coins/maná) pero mantener reglas claras para evitar confusiones.

## Bento Grid personalizable
- Guardar configuraciones por usuario (orden y visibilidad de tiles) que se sincronizan con AsyncStorage/backend.
- Modo edición con drag & drop para reordenar, mostrar/ocultar tiles y restaurar la disposición por defecto.
- Posibles nuevos indicadores: energía diaria, XP restante para subir de nivel, tareas completadas hoy, progreso de eventos, buffs principales, multipliers activos, progreso de logros destacados, estado del clima en la app (si aplica), tiempo restante para recompensas.
- Cada tile debe tener un identificador único (`id`) para soportar ordenamiento y compatibilidad con futuras métricas.
- Permitir slots “vacíos” reservados a futuras features, mostrando un placeholder o sugerencias de activación.

## Backlog recomendado
1. Definir estructura de estado (`avatarFrame`, `avatarPin`, `badgeProgress`).
2. Crear catálogo de assets (nombres, rarezas, condiciones de desbloqueo).
3. UI de selección dentro de la tienda/perfil.
4. Animaciones opcionales (ej. glitter loop, partículas ligeras) con control de rendimiento.
