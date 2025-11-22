# Economía de Mana Bloom - Documentación Técnica

## 📖 Índice
1. [Visión General](#visión-general)
2. [Las 3 Monedas](#las-3-monedas)
3. [Sistema de Recompensas](#sistema-de-recompensas)
4. [Desafíos Dinámicos](#desafíos-dinámicos)
5. [Logros Progresivos](#logros-progresivos)
6. [Balance Económico](#balance-económico)
7. [Archivos de Configuración](#archivos-de-configuración)
8. [Cómo Modificar](#cómo-modificar)

---

## Visión General

Mana Bloom usa un sistema económico de **3 monedas** diseñado para ser:
- ✅ **Justo**: No pay-to-win
- ✅ **Balanceado**: Usuarios free pueden disfrutar todo el juego
- ✅ **Sostenible**: Monetización ética con suscripción Pro

### Principios Fundamentales
1. **Maná** = Gratis, abundante, se gana jugando
2. **Monedas** = Gratis, moderadas, requieren esfuerzo
3. **Gemas** = Premium, escasas, principalmente con dinero real

---

## Las 3 Monedas

### 1. Maná 🔮
**Propósito:** Moneda principal para acciones de juego

**Cómo se gana:**
- Completar tareas: 10-50 maná (según dificultad)
- Completar hábitos: 5-20 maná
- Rituales: 5-15 maná cada uno
- Recompensa diaria: 50 maná
- Subir de nivel: 100 maná

**Para qué sirve:**
- Acciones de cuidado de planta (regar: 20 maná, alimentar: 30 maná)
- Pociones básicas (50-100 maná)
- Revivir rachas (100 maná)

**Balance:** Usuario activo gana ~300-500 maná/día

---

### 2. Monedas 🪙
**Propósito:** Moneda de progreso para items premium

**Cómo se gana:**
- Completar desafíos diarios: 50-150 monedas
- Rachas de 7 días: 200 monedas
- Rachas de 15 días: 500 monedas
- Rachas de 30 días: 1000 monedas
- Logros: 100-500 monedas
- Easter eggs: 50-200 monedas

**Para qué sirve:**
- Pociones premium (300-800 monedas)
- Herramientas (500-2000 monedas)
- Plantas adicionales (1000-3000 monedas)
- Cosméticos básicos (500-1500 monedas)

**Balance:** Usuario activo gana ~200-400 monedas/día

---

### 3. Gemas 💎
**Propósito:** Moneda premium para items exclusivos

**Cómo se gana:**
- 💰 Compra con dinero real (principal)
- 🎁 Rachas de 30 días: 50 gemas (bonus)
- 🎁 Rachas de 60 días: 100 gemas (bonus)
- 🎁 Rachas de 90 días: 200 gemas (bonus)
- 🏆 Logros épicos: 25-100 gemas
- 🥚 Easter eggs raros: 10-50 gemas

**Para qué sirve:**
- Plantas legendarias (500-1500 gemas)
- Cosméticos exclusivos (300-1000 gemas)
- Paquetes de monedas (100 gemas = 1000 monedas)
- Acelerar cooldowns (50 gemas)

**Balance:** Usuario free puede ganar ~50-100 gemas/mes

---

## Sistema de Recompensas

### Recompensas por Tareas

**Archivo:** `src/constants/economyConfig.js`

```javascript
export const TASK_REWARDS = {
  // Por dificultad
  easy: { mana: 10, xp: 5, coin: 0 },
  medium: { mana: 30, xp: 15, coin: 0 },
  hard: { mana: 50, xp: 30, coin: 0 },
  
  // Bonus por tipo
  habit: { mana: 5 }, // +5 maná extra por ser hábito
  
  // Bonus por elemento (si coincide con planta)
  elementMatch: { mana: 10, xp: 5 },
};
```

**Cómo funciona:**
1. Usuario completa una tarea
2. Se calcula recompensa base según dificultad
3. Se agrega bonus si es hábito
4. Se agrega bonus si el elemento coincide con la planta
5. Se otorgan las recompensas al usuario

**Ejemplo:**
- Tarea difícil (hard) + hábito + elemento coincide
- Recompensa: 50 + 5 + 10 = **65 maná** + 30 + 5 = **35 XP**

---

### Recompensas por Desafíos

**Archivo:** `src/constants/economyConfig.js`

```javascript
export const CHALLENGE_REWARDS = {
  easy: { coin: 50, xp: 10 },
  medium: { coin: 100, xp: 25 },
  hard: { coin: 150, xp: 50 },
};
```

---

### Recompensas por Rachas

**Archivo:** `src/constants/economyConfig.js`

```javascript
export const STREAK_REWARDS = {
  7: { coin: 200, mana: 100 },
  15: { coin: 500, gem: 25, mana: 200 },
  30: { coin: 1000, gem: 50, mana: 500 },
  60: { coin: 2000, gem: 100, plant: 'random_rare' },
  90: { coin: 3000, gem: 200, plant: 'random_legendary' },
};
```

**Cómo funciona:**
1. Usuario mantiene racha de días consecutivos
2. Al alcanzar hito (7, 15, 30, etc.), se otorga recompensa
3. Recompensas se acumulan (no reemplazan)

---

## Desafíos Dinámicos

### Problema Resuelto
❌ **Antes:** Solo 40 desafíos fijos → Se repiten rápido
✅ **Ahora:** Templates infinitos + generación procedural

### Sistema de Templates

**Archivo:** `src/constants/challengeTemplates.js`

```javascript
export const CHALLENGE_TEMPLATES = [
  {
    id: 'complete_tasks',
    type: 'count',
    generate: (seed) => ({
      title: `Completa ${randomBetween(3, 8, seed)} tareas`,
      target: randomBetween(3, 8, seed),
      reward: { coin: randomBetween(3, 8, seed) * 20 }
    })
  },
  {
    id: 'element_focus',
    type: 'element',
    generate: (seed) => ({
      title: `Completa ${randomBetween(2, 5, seed)} tareas de ${randomElement(seed)}`,
      element: randomElement(seed),
      target: randomBetween(2, 5, seed),
      reward: { coin: 100, mana: 50 }
    })
  },
  // ... 20+ templates más
];
```

**Cómo funciona:**
1. Cada día se genera un seed basado en fecha + userId
2. Se seleccionan 3 templates aleatorios
3. Cada template genera un desafío único usando el seed
4. Los desafíos son determinísticos (mismo día = mismos desafíos)

**Ventajas:**
- ✅ Desafíos infinitos
- ✅ Variedad diaria
- ✅ Reproducibles (mismo seed = mismo desafío)
- ✅ Balanceados

---

## Logros Progresivos

### Problema Resuelto
❌ **Antes:** Logros finitos → Se acaban
✅ **Ahora:** Logros progresivos con tiers infinitos

### Sistema de Tiers

**Archivo:** `src/constants/achievements.js`

```javascript
export const PROGRESSIVE_ACHIEVEMENTS = {
  task_master: {
    name: 'Maestro de Tareas',
    tiers: [
      { tier: 1, target: 10, reward: { coin: 100 } },
      { tier: 2, target: 50, reward: { coin: 300 } },
      { tier: 3, target: 100, reward: { coin: 500, gem: 25 } },
      { tier: 4, target: 500, reward: { coin: 1000, gem: 50 } },
      { tier: 5, target: 1000, reward: { coin: 2000, gem: 100 } },
      // ... hasta tier 20+
    ]
  },
  streak_legend: {
    name: 'Leyenda de Rachas',
    tiers: [
      { tier: 1, target: 7, reward: { coin: 200 } },
      { tier: 2, target: 30, reward: { coin: 1000, gem: 50 } },
      { tier: 3, target: 90, reward: { coin: 3000, gem: 200 } },
      { tier: 4, target: 365, reward: { coin: 10000, gem: 500 } },
    ]
  },
};
```

**Cómo funciona:**
1. Usuario progresa en una categoría (ej: completar tareas)
2. Al alcanzar cada tier, se desbloquea el siguiente
3. Siempre hay un tier siguiente (nunca se acaban)

---

## Balance Económico

### Usuario Free (Activo)
**Ganancias diarias estimadas:**
- Maná: 300-500
- Monedas: 200-400
- Gemas: 0-2 (raras)

**Puede comprar:**
- ✅ Pociones básicas (con maná)
- ✅ Pociones premium (1-2/semana con monedas)
- ✅ Herramientas (ahorrando 1-2 semanas)
- ✅ Plantas extra (ahorrando 1-2 meses)

### Usuario Pro
**Ganancias diarias estimadas:**
- Maná: 400-650 (+50 bonus diario)
- Monedas: 240-480 (+20% descuento en tienda)
- Gemas: 0-2 (raras)

**Beneficios:**
- ✅ Todas las plantas desbloqueadas
- ✅ 2x XP (progreso más rápido)
- ✅ 20% descuento en tienda
- ✅ Items exclusivos mensuales

---

## Archivos de Configuración

### Estructura del Proyecto

```
src/
├── constants/
│   ├── economyConfig.js       # Recompensas, precios, balance
│   ├── challengeTemplates.js  # Templates de desafíos
│   ├── achievements.js        # Logros y tiers
│   └── shopCatalog.js         # Catálogo de items (futuro)
├── state/
│   └── AppContext.js          # Estado global de economía
└── lib/
    └── sync.js                # Sincronización con Supabase
```

### `economyConfig.js` - Configuración Principal

**Qué contiene:**
- Recompensas por tareas/hábitos
- Recompensas por desafíos
- Recompensas por rachas
- Precios de items
- Costos de acciones

**Cuándo modificar:**
- Balancear recompensas
- Ajustar precios de tienda
- Cambiar costos de acciones

### `challengeTemplates.js` - Desafíos

**Qué contiene:**
- Templates de desafíos dinámicos
- Funciones de generación procedural
- Configuración de dificultad

**Cuándo modificar:**
- Agregar nuevos tipos de desafíos
- Ajustar dificultad
- Cambiar recompensas de desafíos

### `achievements.js` - Logros

**Qué contiene:**
- Logros progresivos
- Logros ocultos
- Recompensas por tier

**Cuándo modificar:**
- Agregar nuevos logros
- Ajustar targets de tiers
- Cambiar recompensas

---

## Cómo Modificar

### Cambiar Recompensas de Tareas

**Archivo:** `src/constants/economyConfig.js`

```javascript
// Aumentar recompensas de tareas difíciles
export const TASK_REWARDS = {
  hard: { mana: 70, xp: 40, coin: 10 }, // Antes: 50, 30, 0
};
```

### Cambiar Recompensas de Rachas

**Archivo:** `src/constants/economyConfig.js`

```javascript
// Dar más gemas en racha de 30 días
export const STREAK_REWARDS = {
  30: { coin: 1000, gem: 100, mana: 500 }, // Antes: gem: 50
};
```

### Agregar Nuevo Desafío

**Archivo:** `src/constants/challengeTemplates.js`

```javascript
export const CHALLENGE_TEMPLATES = [
  // ... templates existentes
  {
    id: 'ritual_master',
    type: 'ritual',
    generate: (seed) => ({
      title: 'Completa todos los rituales',
      target: 8, // 8 rituales totales
      reward: { coin: 200, mana: 100 }
    })
  },
];
```

### Agregar Nuevo Logro

**Archivo:** `src/constants/achievements.js`

```javascript
export const PROGRESSIVE_ACHIEVEMENTS = {
  // ... logros existentes
  ritual_master: {
    name: 'Maestro de Rituales',
    tiers: [
      { tier: 1, target: 50, reward: { coin: 200 } },
      { tier: 2, target: 100, reward: { coin: 500, gem: 25 } },
      // ...
    ]
  },
};
```

### Ajustar Balance General

**Archivo:** `src/constants/economyConfig.js`

```javascript
// Multiplicador global (para eventos especiales)
export const ECONOMY_MULTIPLIERS = {
  mana: 1.0,    // 1.0 = normal, 2.0 = doble
  coin: 1.0,
  xp: 1.0,
  gem: 1.0,
};

// Aplicar en AppContext al otorgar recompensas
const finalMana = baseMana * ECONOMY_MULTIPLIERS.mana;
```

---

## Testing y Balance

### Cómo Probar Cambios

1. **Modificar valores** en `economyConfig.js`
2. **Recargar app** (hot reload automático)
3. **Completar tareas** y verificar recompensas
4. **Revisar logs** en consola
5. **Ajustar** según sea necesario

### Herramientas de Debug

**Archivo:** `src/utils/economyDebug.js` (crear si no existe)

```javascript
// Simular recompensas sin completar tareas
export function debugGrantRewards(userId, rewards) {
  console.log('[ECONOMY DEBUG] Granting rewards:', rewards);
  // Otorgar recompensas directamente
}

// Ver balance actual
export function debugShowBalance(state) {
  console.log('[ECONOMY DEBUG] Current balance:', {
    mana: state.mana,
    coins: state.wallet.coin,
    gems: state.wallet.gem,
  });
}
```

---

## Mejores Prácticas

### ✅ DO (Hacer)
- Probar cambios en desarrollo antes de producción
- Documentar cambios en este archivo
- Mantener balance justo (free vs pro)
- Usar multiplicadores para eventos temporales
- Loguear todas las transacciones económicas

### ❌ DON'T (No Hacer)
- Cambiar valores directamente en producción
- Hacer cambios drásticos sin testing
- Romper el balance free/pro
- Olvidar sincronizar con Supabase
- Ignorar feedback de usuarios

---

## Roadmap Futuro

### Fase 1: Actual ✅
- Sistema de 3 monedas
- Recompensas balanceadas
- Desafíos dinámicos
- Logros progresivos

### Fase 2: Próxima
- Easter eggs coleccionables
- Eventos especiales
- Tablas de clasificación
- Sistema de trading (intercambio)

### Fase 3: Futuro
- Economía social (regalar items)
- Mercado de jugadores
- Subastas de items raros
- Temporadas con recompensas exclusivas

---

## Soporte

**¿Preguntas sobre la economía?**
- Revisar este documento primero
- Consultar `economy_design.md` en artifacts
- Revisar código en `src/constants/economyConfig.js`
- Contactar al equipo de desarrollo

**Última actualización:** 2025-11-21
**Versión:** 1.0.0
