// [MB] Modulo: Docs / Seccion: Premium Features
// Afecta: Producto completo (funciones de pago)
// Proposito: listar beneficios Pro y condiciones de acceso
// Puntos de edicion futura: actualizar cuando se lancen nuevos tiers
// Autor: Codex - Fecha: 2025-11-17

# Premium Features & Paywall Plan

> Mantener este documento sincronizado con la app. Cada nueva función debe indicar claramente si es gratuita o "Pro".

## 1. Care Insights (Cuidados recomendados)

- **Estado actual:** activo para pruebas internas; muestra chips con las acciones prioritarias (scraper en PlantProgressCard).
- **Modo Pro:** sólo usuarios con `featureFlags.recommendedCare === true` pueden ver/usar los chips. Usuarios free ven un mensaje motivacional + CTA para mejorar plan.
- **Acción:** cuando se conecte autenticación, obtener el flag desde AppContext/backend. Implementar placeholder “Sube a Pro para desbloquear recomendaciones” en modo gratuito.

## 2. Ritual Insights

- **Idea:** historial detallado post-ritual (tiempo dedicado, XP ganada, estados afectadas).
- **Modo Pro:** permitir revisar gráficas semanal/mensual y exportar registros. Versión free mantiene sólo el conteo básico.
- **Estado:** pendiente de diseño/implementación.

## 3. Journal & Visualize Dashboard

- **Free:** guardar entradas y ver 2 más recientes en Perfil.
- **Pro:** acceso completo al diario (scroll infinito), filtros por emoción/fecha, backup en la nube y exportación PDF.

## 4. Animaciones exclusivas

- Relacionado con `ACTION_ANIMATIONS`: efectos especiales sólo para usuarios Pro (por ejemplo partículas premium al activar Regar o nuevas skins animadas).
- Opcional: permitir a usuarios free ver una animación básica y reservar las variantes especiales para Pro.

## 5. Boosts y Buffs

- **Pro:** cooldowns reducidos, bonificación de mana/monedas en rituales, buffs temporales al completar rachas.
- **Free:** mantiene la experiencia base.

## 6. Sharing & Integraciones

- Enviar diarios, cartas de gratitud o reportes de planta a canales externos (WhatsApp, email, redes) sólo en Pro, sin marca de agua.

## 7. Recordatorios inteligentes (Header + Planner)

- **Descripción:** chips de recordatorios en el header (ex agenda de cuidado) + sección dedicada para crear/editar recordatorios de rituales y cuidados.
- **Modo Pro:** mostrará recordatorios dinámicos conectados a objetivos diarios y permitirá crearlos desde el header/FAB. Usuarios gratuitos sólo ven un placeholder motivacional.
- **Implementación:** `featureFlags.remindersPro`; al desbloquearlo se habilita el carrusel de recordatorios y el botón "Nuevo recordatorio" abre el planner.
- **Notas:** estos recordatorios también deberían sincronizarse con notificaciones push (ver `docs/plant-screen-roadmap.md`).

## 8. Floating Action Hub (FAB modular)

- **Idea:** centralizar acciones premium (nuevo recordatorio, registrar ritual, añadir notas) en un FAB con menú radial.
- **Modo Pro:** acceso completo al hub; usuarios free mantienen el CTA actual limitado (p. ej. sólo “Agregar tarea”).
- **Pendiente:** definir iconografía y animación; documentar cada acción secundaria para no mezclar flujos core/premium.

## 9. Coach IA (botón “Mi Planta”)

- **Descripción:** el botón central del tab bar abre el hub “Mi Planta” con insights IA:
  - Resumen instantáneo (salud, XP restante, rituales pendientes).
  - Recomendaciones del coach (qué ritual hacer, qué tarea desbloquea buffs).
  - CTA rápidos: “Generar hábito”, “Programar ritual”, “Plan de cuidado”.
- **Modo Pro:** coach IA con conversación/chat y generación de planes personalizados. Usuarios Free ven sólo la tarjeta de estado y tips básicos.
- **Implementación:** `featureFlags.aiCoach`. Si está desactivado, mostrar sólo status card y CTA “Mejora tu plan”.

## 10. Bosque Social / Comunidad

- **Idea:** nueva pestaña “Social” con:
  - Leaderboard de rachas / niveles de amigos.
  - Feed de logros mágicos (“Alex floreció su planta”, “María regó árbol real”).
  - Mapa o grid con ubicaciones simbólicas de árboles sembrados y retos cooperativos.
- **Modo Pro:** acceso completo al feed, retos cooperativos especiales y métricas globales. Usuarios Free ven sólo una vista resumida + invitación a Pro.
- **Notas:** depende de backend social. Documentar endpoints y flags (p. ej. `featureFlags.socialMap`, `featureFlags.coopChallenges`).

## 9. Roadmap premium

| Feature                             | Estado        | Responsable | Notas |
|-------------------------------------|---------------|-------------|-------|
| Care Insights paywall               | En progreso   | Codex       | Añadir flag en AppContext, fallback CTA |
| Ritual analytics                    | Ideación      | Sebas       | Requiere almacenamiento histórico |
| Diario completo + exportación       | Pendiente     | Producto    | Decidir formato (PDF/Markdown) |
| Buffs exclusivos (cooldown boost)   | Concepto      | Producto    | Depende de economía definidas |
| Animaciones premium                 | Concepto      | UI/UX       | Requiere assets dedicados |
| Recordatorios inteligentes          | Diseño        | Producto    | Integrar en header y FAB, flag `remindersPro` |
| Floating Action Hub                 | Concepto      | Producto/UI | Agrupa acciones premium + CTA |
| Coach IA (Mi Planta)                | Concepto      | Producto/IA | Requiere chat + recomendaciones contextualizadas |
| Bosque Social                       | Concepto      | Producto    | Necesita backend social y mapa colaborativo |

---

### Checklist para nuevas features
1. ¿La función debe estar detrás del plan Pro? Sí → documentarla aquí con flag/config.
2. ¿Se necesita un fallback para usuarios Free? Describir el comportamiento.
3. ¿Qué métricas o storage nuevos requiere? Añadir al doc correspondiente (rituals-and-care, gameplay-rules).
4. ¿Cómo se activa? (flag remoto, compra in-app, plan mensual).
