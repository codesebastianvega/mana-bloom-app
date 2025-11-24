# EconomyContext

## 📄 Overview

Context especializado para manejar todo el estado de economía de la app, extraído de `AppContext.js`.

**Archivo:** `src/state/contexts/Economy Context.tsx`  
**Tipo:** TypeScript Context  
**Estado:** ✅ Implementado (Fase 1.1.1)

---

## 🎯 Propósito

Manejar todo el estado relacionado con la economía del usuario:
- Maná (moneda principal)
- Wallet (coins, gems)
- XP y niveles
- Buffs temporales

---

## 📊 Estado

```typescript
interface EconomyState {
  mana: number;              // Moneda principal
  wallet: {
    coin: number;            // Monedas
    gem: number;             // Gemas
  };
  xp: number;                // Experiencia actual
  level: number;             // Nivel actual
  xpGoal: number;            // XP necesaria para siguiente nivel
  buffs: Buff[];             // Buffs activos
}
```

---

## 🔧 Acciones

### Mana
- `SET_MANA` - Establecer maná
- `PURCHASE_WITH_MANA` - Gastar maná (con validación)

### Wallet
- `SET_WALLET` - Establecer wallet
- `ADD_COIN` - Agregar monedas
- `SPEND_COIN` - Gastar monedas (con validación)
- `ADD_GEM` - Agregar gemas
- `SPEND_GEM` - Gastar gemas (con validación)

### Progresión
- `SET_PROGRESS` - Establecer XP/level/xpGoal
- `APPLY_TASK_REWARD` - Aplicar recompensa de tarea (XP + mana)
  - Multiplica XP según buffs activos
  - Auto-sube de nivel si alcanza xpGoal

### Buffs
- `SET_BUFFS` - Establecer buffs
- `ACTIVATE_BUFF` - Activar nuevo buff
- `CLEAN_EXPIRED_BUFFS` - Limpiar buffs expirados

---

## 🎣 Hooks

### Estado
```typescript
useEconomyState()       // Estado completo
useEconomyDispatch()    // Dispatch function
```

### Especializados
```typescript
useMana()               // number
useWallet()             // { coin, gem }
useLevel()              // { level, xp, xpGoal }
useBuffs()              // Buff[]
```

### Utilidades
```typescript
useCanAffordMana(cost)  // boolean
useCanAffordCoins(cost) // boolean
useCanAffordGems(cost)  // boolean
```

---

## 💾 Persistencia

- **AsyncStorage**: Todos los cambios se persisten automáticamente
- **Cloud Sync**: Mana se sincroniza con Supabase (pushProfile)
- **Hydration**: Estado se carga al montar el provider

---

## ⏱️ Features

### Auto-cleanup de Buffs
- Buffs expirados se limpian cada 60 segundos
- Se limpian en hidratación inicial
- Se limpian al aplicar acciones

### XP Multiplier
- Si hay buff `xp_double`, multiplica XP x2
- Se aplica automáticamente en `APPLY_TASK_REWARD`

### Level Up Automático
- Al ganar XP, sube de nivel automáticamente
- XP goal aumenta 25% por nivel
- Se redondea a múltiplo de 10

---

## 📝 Uso

### Setup
```typescript
import { EconomyProvider } from './state/contexts/EconomyContext';

function App() {
  return (
    <EconomyProvider>
      <YourApp />
    </EconomyProvider>
  );
}
```

### Componente
```typescript
import { useMana, useEconomyDispatch } from './state/contexts/EconomyContext';

function ShopItem({ cost }) {
  const mana = useMana();
  const dispatch = useEconomyDispatch();
  const canAfford = mana >= cost;

  const handlePurchase = () => {
    dispatch({ type: 'PURCHASE_WITH_MANA', payload: cost });
  };

  return (
    <Button onPress={handlePurchase} disabled={!canAfford}>
      Buy ({cost} mana)
    </Button>
  );
}
```

### Recompensas de Tareas
```typescript
const dispatch = useEconomyDispatch();

// Al completar tarea
dispatch({
  type: 'APPLY_TASK_REWARD',
  payload: {
    xpDelta: 25,
    manaDelta: 20,
  },
});
```

---

## 🎯 Próximos Pasos

1. ⏳ Integrar con AppProvider  
2. ⏳ Migrar componentes que usan economía
3. ⏳ Eliminar código duplicado de AppContext
4. ⏳ Testing unitario

---

**Creado:** 2025-11-24  
**Versión:** 1.0.0  
**Estado:** Implementado, pendiente integración
