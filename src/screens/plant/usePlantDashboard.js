// [MB] Módulo: Plant / Sección: PlantScreen - Hook de Estado real
// Afecta: PlantScreen
// Propósito: Conectar la UI de planta con AppContext (mana/xp/nivel) manteniendo interfaz del mock
// Puntos de edición futura: integrar logros reales, métricas dinámicas y skins desde tienda
// Autor: Codex - Fecha: 2025-10-21

import { useCallback, useMemo, useState, useEffect, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import {
  useAppState,
  useAppDispatch,
  useCanAfford,
  useProgress,
} from "../../state/AppContext";
import { Colors, ElementAccents } from "../../theme";
import { SHOP_LOOKUP } from "../../constants/shopCatalog";
import {
  getPlantName as storageGetPlantName,
  setPlantName as storageSetPlantName,
  getTasks as storageGetTasks,
} from "../../storage";

const ACTION_COSTS = {
  water: { mana: 20 },
  feed: { coin: 120 },
  clean: {},
  meditate: { mana: 10 },
  hydrate: {},
  stretch: {},
  sunlight: {},
  visualize: {},
  journal: {},
  gratitude: {},
  restEyes: {},
};

const ELEMENT_META = [
  { key: "fire", label: "Fuego", accent: Colors.elementFire },
  { key: "water", label: "Agua", accent: Colors.elementWater },
  { key: "earth", label: "Tierra", accent: Colors.elementEarth },
  { key: "air", label: "Aire", accent: Colors.elementAir },
];

// Skins placeholder local (hasta integrar tienda/skins reales)
const BASE_SKINS = [
  { id: "s1", name: "Maceta Rústica", rarity: "common", owned: true, accentKey: "neutral", thumb: "" },
  { id: "s2", name: "Arcana Azul", rarity: "rare", owned: true, accentKey: "water", thumb: "" },
  { id: "s3", name: "Esencia Etérea", rarity: "epic", owned: false, accentKey: "spirit", thumb: "" },
];

export default function usePlantDashboard() {
  const state = useAppState();
  const dispatch = useAppDispatch();
  const canAffordMana = useCanAfford();
  const { xp, xpGoal, level } = useProgress();

  const [plantName, setPlantName] = useState("Mi Planta");
  const [invOpen, setInvOpen] = useState(false);
  const [equippedSkinId, setEquippedSkinId] = useState("s1");
  const [selectedSkinId, setSelectedSkinId] = useState("s1");
  const [txn, setTxn] = useState(null);
  const [insufficient, setInsufficient] = useState(null);
  const [cooldownEnds, setCooldownEnds] = useState({
    water: 0,
    feed: 0,
    clean: 0,
    meditate: 0,
    hydrate: 0,
    stretch: 0,
    sunlight: 0,
    visualize: 0,
    journal: 0,
  gratitude: 0,
  restEyes: 0,
});
  const [tasks, setTasks] = useState([]);
  const isMountedRef = useRef(true);

  const loadTasks = useCallback(async () => {
    try {
      const stored = await storageGetTasks();
      if (isMountedRef.current) {
        setTasks(Array.isArray(stored) ? stored : []);
      }
    } catch (error) {
      console.warn("[MB] No se pudieron cargar tareas para balance elemental", error);
      if (isMountedRef.current) {
        setTasks([]);
      }
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      isMountedRef.current = true;
      loadTasks();
      return () => {
        isMountedRef.current = false;
      };
    }, [loadTasks])
  );

  const skins = useMemo(() => {
    const ownedCosmetics = (state.inventory || [])
      .filter((it) => it.category === "cosmetics")
      .map((it) => {
        const info = SHOP_LOOKUP[it.sku] || { title: it.sku };
        return {
          id: it.sku,
          name: info.title,
          rarity: "rare",
          owned: true,
          accentKey: "cosmetics",
          thumb: "",
        };
      });
    const list = [...BASE_SKINS, ...ownedCosmetics];
    return list.map((skin) => ({ ...skin, equipped: skin.id === equippedSkinId }));
  }, [equippedSkinId, state.inventory]);

  const equippedSkin = skins.find((s) => s.equipped);
  // [MB] Fondo sobrio y consistente con el tema (sin colores chillones)
  const skinAccent = null;

  const etaText = useMemo(() => {
    return xpGoal > xp ? `${xpGoal - xp} XP para la siguiente etapa` : "Listo para evolucionar";
  }, [xp, xpGoal]);

  const elementBalance = useMemo(() => {
    const aggregates = ELEMENT_META.reduce((acc, meta) => {
      acc[meta.key] = {
        ...meta,
        tasks: { total: 0, completed: 0, pending: 0 },
        habits: { total: 0, completed: 0, pending: 0 },
      };
      return acc;
    }, {});

    (tasks || [])
      .filter(
        (task) =>
          task &&
          !task.isDeleted &&
          ELEMENT_META.some((meta) => meta.key === task.element)
      )
      .forEach((task) => {
        const bucket = aggregates[task.element];
        const isHabit = (task.type || "single") === "habit";
        const isDone = !!task.done;

        if (isHabit) {
          bucket.habits.total += 1;
          if (isDone) {
            bucket.habits.completed += 1;
          } else {
            bucket.habits.pending += 1;
          }
        } else {
          bucket.tasks.total += 1;
          if (isDone) {
            bucket.tasks.completed += 1;
          } else {
            bucket.tasks.pending += 1;
          }
        }
      });

    const breakdown = ELEMENT_META.map((meta) => {
      const bucket = aggregates[meta.key];
      const completed =
        bucket.tasks.completed + bucket.habits.completed;
      const totalAssigned =
        bucket.tasks.total + bucket.habits.total;
      return {
        key: meta.key,
        label: meta.label,
        accent: meta.accent,
        value: totalAssigned,
        completed,
        tasks: { ...bucket.tasks },
        habits: { ...bucket.habits },
      };
    });

    const totalAssignedAggregate = breakdown.reduce(
      (sum, item) => sum + item.value,
      0
    );

    return { total: totalAssignedAggregate, breakdown };
  }, [tasks]);

  const handleAction = useCallback(
    (key) => {
      setInsufficient(null);
      const costs = ACTION_COSTS[key] || {};

      if (costs.mana && !canAffordMana(costs.mana)) {
        setInsufficient({ resource: "mana", need: costs.mana });
        return { ok: false };
      }
      if (costs.coin && state.wallet.coin < costs.coin) {
        setInsufficient({ resource: "coin", need: costs.coin });
        return { ok: false };
      }

      // Aplicar costos primero
      if (costs.mana) {
        dispatch({ type: "PURCHASE_WITH_MANA", payload: costs.mana });
        setTxn({ id: String(Date.now()), resource: "mana", amount: -costs.mana });
      }
      if (costs.coin) {
        dispatch({ type: "SPEND_COIN", payload: costs.coin });
        setTxn({ id: String(Date.now()), resource: "coin", amount: -costs.coin });
      }

      // Recompensa de acción (xp)
      const xpRewards = {
        water: 40,
        feed: 40,
        meditate: 30,
        clean: 10,
        hydrate: 15,
        stretch: 12,
        sunlight: 15,
        visualize: 12,
        journal: 12,
        gratitude: 12,
        restEyes: 10,
      };
      const xpDelta = xpRewards[key] || 0;

      if (xpDelta) {
        dispatch({ type: "APPLY_TASK_REWARD", payload: { xpDelta, manaDelta: 0 } });
      }
      // Establecer cooldowns (ms)
      const now = Date.now();
      const durations = {
        water: 2 * 60 * 60 * 1000,
        feed: 3 * 60 * 60 * 1000,
        meditate: 45 * 60 * 1000,
        clean: 15 * 60 * 1000,
        hydrate: 60 * 60 * 1000,
        stretch: 30 * 60 * 1000,
        sunlight: 90 * 60 * 1000,
        visualize: 60 * 60 * 1000,
        journal: 120 * 60 * 1000,
        gratitude: 120 * 60 * 1000,
        restEyes: 30 * 60 * 1000,
      };
      setCooldownEnds((prev) => ({ ...prev, [key]: now + (durations[key] || 0) }));
      return { ok: true };
    },
    [dispatch, canAffordMana]
  );

  const openInventory = useCallback(() => {
    setInvOpen(true);
    setSelectedSkinId(equippedSkinId);
  }, [equippedSkinId]);

  const closeInventory = useCallback(() => setInvOpen(false), []);
  const selectSkin = useCallback((id) => setSelectedSkinId(id), []);
  const equipSkin = useCallback((id) => {
    setEquippedSkinId(id);
    setInvOpen(false);
  }, []);

  // [MB] Persistencia del nombre de planta
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const stored = await storageGetPlantName();
        if (mounted && stored) setPlantName(stored);
      } catch {}
    })();
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    storageSetPlantName(plantName);
  }, [plantName]);

  return {
    plantName,
    setPlantName,
    economy: { mana: state.mana, coins: state.wallet.coin, gems: state.wallet.gem },
    streakDays: state.streak,
    ritualsToday: 0,
    level,
    xp: { current: xp, target: xpGoal },
    hero: {
      health: 0.9,
      mood: state.plantState || "Floreciendo",
      stage: level <= 3 ? "Semilla" : level <= 6 ? "Brote" : level <= 9 ? "Joven" : "Madura",
      auraIntensity: "none",
      gradientColors: [Colors.surfaceAlt, Colors.surface],
      gradientLocations: [0, 1],
      gradientStart: { x: 0.15, y: 0.1 },
      gradientEnd: { x: 0.85, y: 0.95 },
      skinAccentColor: null,
    },
    metrics: { water: 0.6, light: 0.5, nutrients: 0.4, mood: 0.9 },
    quickActions: {
      cooldowns: {
        water: Math.max(0, cooldownEnds.water - Date.now()),
        feed: Math.max(0, cooldownEnds.feed - Date.now()),
        clean: Math.max(0, cooldownEnds.clean - Date.now()),
        meditate: Math.max(0, cooldownEnds.meditate - Date.now()),
        hydrate: Math.max(0, cooldownEnds.hydrate - Date.now()),
        stretch: Math.max(0, cooldownEnds.stretch - Date.now()),
        sunlight: Math.max(0, cooldownEnds.sunlight - Date.now()),
        visualize: Math.max(0, cooldownEnds.visualize - Date.now()),
        journal: Math.max(0, cooldownEnds.journal - Date.now()),
        gratitude: Math.max(0, cooldownEnds.gratitude - Date.now()),
        restEyes: Math.max(0, cooldownEnds.restEyes - Date.now()),
      },
      canWater: canAffordMana(ACTION_COSTS.water.mana),
      canFeed: state.wallet.coin >= ACTION_COSTS.feed.coin,
      canClean: true,
      canMeditate: canAffordMana(ACTION_COSTS.meditate.mana),
      canHydrate: true,
      canStretch: true,
      canSunlight: true,
      canVisualize: true,
      canJournal: true,
      canGratitude: true,
      canRestEyes: true,
      handle: handleAction,
    },
    growth: {
      level,
      xpCurrent: xp,
      xpTarget: xpGoal,
      stage: level <= 3 ? "Semilla" : level <= 6 ? "Brote" : level <= 9 ? "Joven" : "Madura",
      etaText,
      milestones: [],
    },
    elementBalance,
    achievements: [
      { id: "a1", title: "Planta Radiante", description: "Salud > 80%", status: "earned" },
      { id: "a2", title: "Cuidador Constante", description: "Racha 7 días", status: "inProgress" },
      { id: "a3", title: "Florecimiento", description: "Planta madura", status: "locked" },
    ],
    buffs: [],
    inventory: {
      open: invOpen,
      skins,
      selectedId: selectedSkinId,
      equippedId: equippedSkinId,
      openInventory,
      closeInventory,
      selectSkin,
      equipSkin,
    },
    economyEvents: { txn, insufficient },
  };
}

