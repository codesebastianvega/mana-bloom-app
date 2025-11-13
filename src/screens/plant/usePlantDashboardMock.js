// [MB] Modulo: Plant / Seccion: PlantScreen - Hook de Mock
// Afecta: PlantScreen
// Proposito: Centralizar datos mock y handlers temporales para la UI de la planta
// Puntos de edicion futura: reemplazar por fetch a Context/Backend y cubrir acciones reales
// Autor: Codex - Fecha: 2025-10-21

import { useCallback, useMemo, useState } from "react";
import { Colors, ElementAccents } from "../../theme";

const ACTION_COSTS = {
  water: { mana: 20 },
  feed: { coins: 120 },
  clean: { coins: 0 },
  meditate: { mana: 10 },
};

const BASE_SKINS = [
  {
    id: "s1",
    name: "Maceta Rustica",
    rarity: "common",
    owned: true,
    accentKey: "neutral",
    thumb: "",
  },
  {
    id: "s2",
    name: "Arcana Azul",
    rarity: "rare",
    owned: true,
    accentKey: "water",
    thumb: "",
  },
  {
    id: "s3",
    name: "Esencia Eterea",
    rarity: "epic",
    owned: false,
    accentKey: "spirit",
    cost: { currency: "gems", amount: 120 },
    thumb: "",
  },
  {
    id: "s4",
    name: "Corazon de Mana",
    rarity: "legendary",
    owned: false,
    accentKey: "mana",
    cost: { currency: "coins", amount: 2400 },
    thumb: "",
  },
];

export default function usePlantDashboardMock() {
  const [plantName, setPlantName] = useState("Mi Planta Magica");
  const [economy, setEconomy] = useState({ mana: 140, coins: 850, gems: 12 });
  const [streakDays, setStreakDays] = useState(5);
  const [ritualsToday, setRitualsToday] = useState(2);
  const [level, setLevel] = useState(7);
  const [xp, setXp] = useState({ current: 1240, target: 1500 });
  const [invOpen, setInvOpen] = useState(false);
  const [equippedSkinId, setEquippedSkinId] = useState("s1");
  const [selectedSkinId, setSelectedSkinId] = useState("s1");
  const [txn, setTxn] = useState(null);
  const [insufficient, setInsufficient] = useState(null);

  const skins = useMemo(
    () =>
      BASE_SKINS.map((skin) => ({
        ...skin,
        equipped: skin.id === equippedSkinId,
      })),
    [equippedSkinId]
  );

  const equippedSkin = skins.find((skin) => skin.equipped);
  const skinAccent =
    (equippedSkin?.accentKey &&
      ElementAccents.gradients[equippedSkin.accentKey]) ||
    ElementAccents.gradients.xp?.med;

  const etaText = useMemo(
    () =>
      xp.target > xp.current
        ? `${xp.target - xp.current} XP para la siguiente etapa`
        : "Listo para evolucionar",
    [xp]
  );

  const elementBalance = useMemo(
    () => ({
      total: 7,
      breakdown: [
        { key: "fire", label: "Fuego", value: 2, accent: Colors.elementFire },
        { key: "water", label: "Agua", value: 1, accent: Colors.elementWater },
        { key: "earth", label: "Tierra", value: 3, accent: Colors.elementEarth },
        { key: "air", label: "Aire", value: 1, accent: Colors.elementAir },
      ],
    }),
    []
  );

  const achievements = useMemo(
    () => [
      {
        id: "a1",
        title: "Planta Radiante",
        description: "Salud mayor a 80%",
        status: "earned",
      },
      {
        id: "a2",
        title: "Cuidador Constante",
        description: "7 dias seguidos",
        status: "inProgress",
      },
      {
        id: "a3",
        title: "Florecimiento",
        description: "Planta madura",
        status: "locked",
      },
      {
        id: "a4",
        title: "Equilibrio Elemental",
        description: "20+ rituales",
        status: "locked",
      },
    ],
    []
  );

  const buffs = useMemo(
    () => [
      {
        id: 'buff-xp',
        title: 'XP Boost',
        icon: { family: 'FontAwesome5', name: 'bolt' },
        multiplier: 1.2,
        timeRemainingMs: 120000,
        accentKey: 'xp',
      },
      {
        id: 'buff-mana',
        title: 'Mana Fluido',
        icon: { family: 'FontAwesome5', name: 'water' },
        multiplier: 1.1,
        timeRemainingMs: 45000,
        accentKey: 'mana',
      },
      {
        id: 'buff-shield',
        title: 'Proteccion',
        icon: { family: 'FontAwesome5', name: 'shield-alt' },
        multiplier: 1.0,
        timeRemainingMs: 300000,
        accentKey: 'shield',
      },
    ],
    []
  );const handleAction = useCallback(
    (key) => {
      const costs = ACTION_COSTS[key] || {};
      const lacks = Object.entries(costs).find(
        ([resource, amount]) => (economy[resource] ?? 0) < amount
      );
      if (lacks) {
        const [resource] = lacks;
        setInsufficient({ id: String(Date.now()), resource });
        return { ok: false, reason: "insufficient", resource };
      }

      if (Object.keys(costs).length === 0) {
        return { ok: true };
      }

      setEconomy((prev) => {
        const next = { ...prev };
        Object.entries(costs).forEach(([resource, amount]) => {
          next[resource] -= amount || 0;
        });
        return next;
      });

      const resourceKey = Object.keys(costs)[0];
      const delta = -1 * (costs[resourceKey] || 0);
      setTxn({ id: String(Date.now()), resource: resourceKey, amount: delta });
      if (key === "water" || key === "feed" || key === "meditate") {
        setRitualsToday((prev) => prev + 1);
        setXp((prev) => ({
          current: Math.min(prev.current + 40, prev.target),
          target: prev.target,
        }));
      }
      return { ok: true };
    },
    [economy]
  );

  const openInventory = useCallback(() => {
    setInvOpen(true);
    setSelectedSkinId(equippedSkinId);
  }, [equippedSkinId]);

  const closeInventory = useCallback(() => {
    setInvOpen(false);
  }, []);

  const selectSkin = useCallback((id) => {
    setSelectedSkinId(id);
  }, []);

  const equipSkin = useCallback((id) => {
    setEquippedSkinId(id);
    setInvOpen(false);
  }, []);

  return {
    plantName,
    setPlantName,
    economy,
    streakDays,
    ritualsToday,
    level,
    xp,
    hero: {
      health: 0.95,
      mood: "Floreciendo",
      stage: "Brote",
      auraIntensity: "subtle",
      gradientColors: skinAccent?.colors,
      gradientLocations: skinAccent?.locations,
    },
    metrics: {
      water: 0.62,
      light: 0.48,
      nutrients: 0.3,
      mood: 0.95,
    },
    quickActions: {
      cooldowns: { water: 0, feed: 0, clean: 0, meditate: 0 },
      canWater: true,
      canFeed: true,
      canClean: true,
      canMeditate: true,
      handle: handleAction,
    },
    growth: {
      level,
      xpCurrent: xp.current,
      xpTarget: xp.target,
      stage: "Brote",
      etaText,
            milestones: [
        {
          id: 'm1',
          icon: 'Sprout',
          title: 'Regaste',
          delta: '+15 Agua',
          timestamp: Date.now() - 1000 * 60 * 20,
        },
        {
          id: 'm2',
          icon: 'Meditacion',
          title: 'Meditaste',
          delta: '+10 Animo',
          timestamp: Date.now() - 1000 * 60 * 120,
        },
        {
          id: 'm3',
          icon: 'Nutrientes',
          title: 'Nutrientes aplicados',
          delta: '+10 Nutrientes',
          timestamp: Date.now() - 1000 * 60 * 200,
        },
      ],
    },
    elementBalance,
    achievements,
    buffs,
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





