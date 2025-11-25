// [MB] Módulo: Docs / Sección: Easter Eggs
// Afecta: assets/easter eggs, ProfileScreen y sistema de logros
// Propósito: Definir cómo se consiguen los easter eggs y cómo se muestran
// Puntos de edición futura: ajustar condiciones cuando exista inventario real y más estados de rituales
// Autor: Codex - Fecha: 2025-11-22

# Easter Eggs Plan

## Assets disponibles en `assets/easter eggs/`

Usaremos solo los PNG que ya existen como base de diseño:

1. `assets/easter eggs/Huevo de Slime.png`
2. `assets/easter eggs/Huevo de Dragón.png`
3. `assets/easter eggs/Huevo Místico.png`
4. `assets/easter eggs/misticegg.png`
5. `assets/easter eggs/Semilla Fénix Bebé.png`

> Nota: algunos ya se usan como assets en `SHOP_ITEM_ASSET_MAP` (por ejemplo, Slime y Semilla Fénix Bebé). Los easter eggs son “metas ocultas” que se disparan por combos; la recompensa puede ser la mascota / planta / buff asociado o solo un badge coleccionable.

## Diseño de cada Easter Egg

### 1. Huevo de Slime — “Colonia traviesa”

- **Asset**: `assets/easter eggs/Huevo de Slime.png`  
- **ID sugerido**: `easter/slime-egg`  
- **Tema**: productividad “pegajosa” / tareas pequeñas en grupo.  
- **Condición de desbloqueo (combo)**:
  - Tener al menos **2 hormigas** en el inventario de mascotas (`ant`).
  - Completar **8 tareas** en un solo día (cualquier tipo).
  - Mantener una **racha activa** (streak > 0) ese mismo día.
- **Recompensa**:
  - Desbloquea la **mascota slime** (si no se tenía).
  - Badge en perfil: “Domador de Slimes”.
- **Hint visible antes de desbloquear**:
  - “Cuando muchas pequeñas criaturas trabajan juntas, algo pegajoso despierta…”
- **Dónde se muestra**:
  - Nueva sección “Easter eggs del jardín” en `ProfileScreen`, con el huevo en silueta hasta que se cumpla el combo.

### 2. Huevo de Dragón — “Corazón de fuego”

- **Asset**: `assets/easter eggs/Huevo de Dragón.png`  
- **ID sugerido**: `easter/dragon-egg`  
- **Tema**: disciplina alta y rachas largas.  
- **Condición de desbloqueo (combo)**:
  - Mantener una **racha de 21 días o más**.
  - Tener al menos **500 de maná** acumulado.
  - Usar al menos **3 pociones épicas o legendarias** en esa ventana de tiempo.
- **Recompensa**:
  - Desbloquea la **mascota Dragón de Bolsillo** o un buff legendario de XP.
  - Badge: “Guardían de Dragones”.
- **Hint**:
  - “Un corazón constante y ardiente puede incubar un dragón.”
- **Dónde se muestra**:
  - Misma sección de easter eggs en perfil, con animación de fuego suave cuando esté desbloqueado (futuro).

### 3. Huevo Místico — “Meditación profunda”

- **Asset**: `assets/easter eggs/Huevo Místico.png`  
- **ID sugerido**: `easter/mystic-egg`  
- **Tema**: calma + recursos internos.  
- **Condición de desbloqueo (combo)**:
  - Tener una **meditación / ritual de calma activo** ese día (p. ej. usar GuidedBreath o ritual de calma).
  - Contar con al menos **500 de maná** en la wallet.
  - Tener en inventario **2 hormigas** (mascotas `ant`) como mínimo.
- **Recompensa**:
  - Buff temporal tipo “claridad mística” (bonus XP o maná durante 24h).
  - Badge: “Silencio fértil”.
- **Hint**:
  - “Cuando la mente se aquieta y la colonia descansa, algo antiguo escucha.”

### 4. Misticegg — “Curioso compulsivo”

- **Asset**: `assets/easter eggs/misticegg.png`  
- **ID sugerido**: `easter/misticegg`  
- **Tema**: exploración de features.  
- **Condición de desbloqueo (combo)**:
  - Abrir la **tienda mágica**, el **inventario** y la **pantalla de recompensas sociales** en el mismo día.
  - Haber probado al menos **3 rituales distintos** en la última semana (según métricas de rituales).
  - Tener **0 tareas fallidas** ese día.
- **Recompensa**:
  - Badge: “Explorador Arcano”.
  - Pequeño boost de XP plano (por ejemplo +50 XP).
- **Hint**:
  - “Los curiosos que tocan cada puerta encuentran huevos donde nadie más mira.”

### 5. Semilla Fénix Bebé — “Renacer de hábitos”

- **Asset**: `assets/easter eggs/Semilla Fénix Bebé.png`  
- **ID sugerido**: `easter/phoenix-seed`  
- **Tema**: recuperación después de romper una racha.  
- **Condición de desbloqueo (combo)**:
  - Haber **perdido una racha grande** (p. ej. > 7 días).
  - Volver a construir una racha de al menos **5 días seguidos** después de esa caída.
  - Completar al menos **1 misión social** en ese periodo (para pedir apoyo/comunidad).
- **Recompensa**:
  - Semilla especial que puede plantarse como planta decorativa (ya mapeada como seed rara).
  - Badge: “Renacido de las cenizas”.
- **Hint**:
  - “Hasta las rachas rotas alimentan a quienes deciden volver.”

## Plan de implementación (cheatsheet)

- [ ] Crear `src/constants/easterEggs.js` con:
  - `id`, `name`, `description`, `assetKey`, `hint`, `rewards`, `requirements`.
  - `requirements` puede ser un objeto con campos como `minMana`, `minStreak`, `minPetsById`, `minEpicPotionsUsed`, `requiresMeditation`, etc.
- [ ] Extender el estado global (`AppContext`) o el sistema de `ACHIEVEMENTS` para:
  - Guardar `easterEggs.unlocked[id] = { achievedAt }`.
  - Disparar un toast o banner similar al de logros cuando se desbloquee un huevo.
- [ ] Añadir una pequeña “engine” de evaluación:
  - Función que reciba `state` (maná, wallet, inventory, streak, rituales usados, misiones sociales) y marque los eggs que se cumplan.
  - Ejecutarla en momentos clave: al completar tarea, ritual, compra en tienda, misión social, cambio grande de racha.
- [ ] UI en `ProfileScreen`:
  - Nueva sección “Easter eggs del jardín” con grid de 2x2 o carrusel.
  - Cards:
    - Bloqueadas: silueta / blur + solo `hint`.
    - Desbloqueadas: asset completo + nombre + fecha + breve texto de lore.
- [ ] Cuando el inventario real esté implementado:
  - Conectar recompensas (mascotas, plantas especiales, buffs) con `inventory` y `buffs`.
  - Evitar duplicar recompensas si ya fueron otorgadas; el egg se mantiene como badge único.

