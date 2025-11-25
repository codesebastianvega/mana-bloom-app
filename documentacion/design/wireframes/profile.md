// [MB] Modulo: Profile / Seccion: Wireframe
// Afecta: ProfileScreen y Drawer global
// Proposito: Describir la jerarquia visual actual del perfil y la propuesta del menu hamburguesa
// Puntos de edicion futura: actualizar cuando cambie el layout o el contenido del drawer
// Autor: Codex - Fecha: 2025-11-25

# Profile Screen Wireframe (v2 - alineado con implementacion vigente)

## 1. Hero / Identidad
- Avatar con anillo de gradiente y boton de editar.
- Nombre + badge de rango magico.
- Frase corta: `X dias en la academia magica`.

## 2. Bloque de Progreso Global (3 barras)
- **Barra 1 – Nivel de jugador**
  - Label: `Nivel N` + texto `XP actual / objetivo`.
  - Barra llena en base a `xpCurrent/xpTarget`.
- **Barra 2 – Salud de la planta**
  - Label: `Salud de la planta`.
  - Hint: estado (`Floreciente`, etc.) tomado del mock de progreso.
  - Barra en verde (80-90% mock por ahora).
- **Barra 3 – Rituales y jardin**
  - Label: `Rituales y jardin`.
  - Hint: texto de eficiencia / momentum (mock actual: `En marcha`).
  - Barra en color acento (progreso combinado de nivel + eficiencia).

> Nota: este bloque reemplaza la barra unica de XP del wireframe anterior.

## 3. Callout “Proximo nivel cerca”
- Caja destacada debajo del bloque de barras.
- Contenido:
  - Icono `bolt` + titulo del hint (`Proximo nivel cerca`, etc.).
  - Mensaje explicando cuantos XP faltan.
  - Mini barra de progreso basada en `levelHint.progress`.

## 4. Stats Rapidos (chips)
- Fila de cards pequenas (3+) con datos clave del mock:
  - Nivel (Lv. N).
  - Rituales hoy.
  - Mejor racha.
- Visual:
  - Fondo elevado, borde suave, texto grande para el valor y caption para el label.

## 5. Jardin y Colecciones
- Seccion nueva que no estaba en el wireframe original.

### 5.1 Chips de coleccion (inventario)
- Chips basados en `useInventoryCounts()`:
  - Mascotas (pets).
  - Plantas (seeds).
  - Pociones (potions).
  - Herramientas (tools).
- Cada chip:
  - Label (ej. `Mascotas`).
  - Valor (numero de items en esa categoria).
  - Color de acento propio.

### 5.2 Banners navegables
- Tres banners tipo “hero mini” reutilizando los assets de `assets/banners`:
  1. **Jardin Mistico**  
     - Imagen: `daycocoa.png` (Cocoa).  
     - Texto: “Cocoa te espera entre las flores”.  
     - CTA: `Ir al jardin` -> navega a `Garden`.
  2. **Inventario vivo**  
     - Imagen: `bannerinventory.png`.  
     - CTA: `Abrir inventario` -> navega a `InventoryModal`.
  3. **Pases y suscripciones**  
     - Imagen: `bannerpasessubs.png`.  
     - CTA: `Ver pases` -> navega a `ShopScreen` con tab `subs`.

> Objetivo: dar continuidad visual con los banners del Home pero centrados en el contexto personal del perfil.

## 6. Logros Magicos
- Encabezado: `Logros magicos` con enlace `Ver todos`.
- Highlight:
  - Badge con icono `star`.
  - Titulo fijo `Maestro de Tareas` (por ahora).
  - Subtitulo `Completa 50 tareas` (mock).
  - Tag `Proximo`.
- Lista:
  - `AchievementsPanel` con limite 3, mostrando progreso y boton de `Reclamar` cuando aplique.
  - Modal `AchievementsModal` con listado completo al pulsar `Ver todos`.

## 7. Progreso Personal
- Lista vertical de metricas (mock):
  - Racha actual (dias).
  - Salud de la planta (texto + icono).
  - Eficiencia (tareas/dia), etc.
- Cada item:
  - Icono pequeno (FontAwesome5).
  - Label + hint (ej. “2 para el siguiente logro”).
  - Valor alineado a la derecha.

## 8. Diario Personal
- Bloque con titulo `Diario personal`.
- Estados:
  - Vacio: texto amigable explicando como se desbloquea (rituales/entradas).
  - Con datos: muestra hasta 2 notas de journal y 2 visiones (`visualize`):
    - Tag (`Nota` o `Vision`).
    - Titulo (o fallback “Entrada sin titulo”).
    - Cuerpo.
    - Fecha formateada.

## 9. Acciones Suaves
- Seccion final centrada en acciones “sobre ti”, no de sistema:
  - `Compartir progreso magico`.
  - `Ver todos los logros`.
  - `Respaldo de datos magicos` (placeholder futuro).
- Cada accion:
  - Icono en burbuja pequena.
  - Label.
  - Chevron `>` para indicar navegabilidad (acciones aun mock).

---

# Drawer Global (Menu Hamburguesa) – Propuesta

> El drawer global vive fuera de ProfileScreen. Aqui definimos como debe organizarse para que las opciones de sistema salgan del perfil y el perfil quede solo con identidad/progreso.

## Estructura de secciones

1. **Cuenta**
   - Ver perfil (lleva a ProfileScreen).
   - Cambiar contrasena.
   - Cerrar sesion.
   - Eliminar cuenta (ultimo item, en rojo).

2. **Apariencia & comportamiento**
   - Tema (oscuro / seguir sistema).
   - Sonidos de la app (on/off).
   - Vibracion / haptics (on/off).

3. **Juego & progreso**
   - Notificaciones (recordatorios de racha, rituales, etc.).
   - Idioma (cuando exista).
   - Ajustes de dificultad/ritmo (futuro).

4. **Ayuda & comunidad**
   - Centro de ayuda / FAQ.
   - Enviar feedback / reportar bug.
   - Enlaces a Discord / Instagram.

5. **Acerca de**
   - Version de la app.
   - Creditos.
   - Enlaces legales (Terminos, Privacidad).

## Principios de diseno del Drawer

- No duplicar acciones:  
  - Acciones de identidad/progreso se quedan en ProfileScreen (ej. compartir progreso).  
  - Acciones de sistema/configuracion se mueven al drawer (tema, sonido, logout).
- Mantener pocas secciones, con titulos claros y consistentes con el copy de la app.
- Visual: fondo oscuro consistente con el tema, secciones separadas por headers pequenos, iconos claros por cada opcion.

## Tareas derivadas (para backlog)

- Implementar Drawer siguiendo esta estructura (ver `documentacion/architecture/state-management.md` para como integrarlo con navegacion).
- Mover las acciones de cuenta/configuracion que hoy estan en ProfileScreen al drawer (mantener solo “acciones suaves” en el perfil).
- Ajustar textos y tooltips en ProfileScreen para que no hablen de opciones que vivan en el drawer.
