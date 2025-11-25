// [MB] Module: Shop / Screen: ShopScreen (Modal)
// Affects: full shop flow
// Purpose: Fullscreen shop modal with single-column cards and CTA
// Future edits: backend catalog, animated transitions, coupons
// Author: Codex - Date: 2025-10-07

import React, { useState, useMemo, useCallback } from "react";
import { View, Text, Pressable, ScrollView, Alert } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./ShopScreen.styles";
import ShopItemCard from "../components/home/ShopItemCard";
import SubscriptionCard from "../components/shop/SubscriptionCard";
import {
  SHOP_CATALOG,
  ShopColors,
  CURRENCIES,
  RARITY_TIERS,
  SHOP_ITEM_TRAITS,
  SHOP_LOOKUP,
} from "../constants/shopCatalog";
import { SHOP_ITEM_ASSET_MAP } from "../constants/shopAssets";
import {
  useAppState,
  useAppDispatch,
  useCanAfford,
  useWallet,
  useHydrationStatus,
} from "../state/AppContext";
import SectionPlaceholder from "../components/common/SectionPlaceholder";
import { Colors, CategoryAccents } from "../theme";

const TABS = [
  {
    key: "potions",
    label: "Pociones",
    icon: "bottle-tonic-plus",
    caption: "Boosts y elixires",
  },
  {
    key: "seeds",
    label: "Plantas",
    icon: "sprout",
    caption: "Nuevas especies",
    isNew: true,
  },
  {
    key: "tools",
    label: "Herramientas",
    icon: "hammer-screwdriver",
    caption: "Productividad pro",
  },
  {
    key: "cosmetics",
    label: "Cosmeticos",
    icon: "palette-swatch",
    caption: "Skins y auras",
    isNew: true,
  },
  {
    key: "pets",
    label: "Mascotas",
    icon: "paw",
    caption: "Compañeros mágicos",
  },
];

const CATEGORY_ACCENTS = {
  potions: { ...ShopColors.potions, pill: CategoryAccents.potions || ShopColors.potions.pill },
  seeds: { ...ShopColors.seeds, pill: CategoryAccents.seeds || ShopColors.seeds.pill },
  tools: { ...ShopColors.tools, pill: CategoryAccents.tools || ShopColors.tools.pill },
  cosmetics: { ...ShopColors.cosmetics, pill: CategoryAccents.cosmetics || ShopColors.cosmetics.pill },
  pets: { ...ShopColors.pets, pill: CategoryAccents.pets || ShopColors.pets.pill },
  subs: { ...ShopColors.subs, pill: CategoryAccents.cosmetics || ShopColors.subs.pill },
  default: { pill: Colors.accent, border: Colors.accent, bg: Colors.surfaceAlt },
};

const TAB_GRADIENTS = {
  potions: ["#241038", "#7e57c2"],
  seeds: ["#142712", "#66bb6a"],
  tools: ["#0c1c2a", "#4fbcd0"],
  cosmetics: ["#2b1600", "#ffca60"],
  pets: ["#2a1200", "#ff9800"],
};

const TAB_LABEL_MAP = {
  potions: "Pociones",
  seeds: "Plantas",
  tools: "Herramientas",
  cosmetics: "Cosmeticos",
  pets: "Mascotas",
  subs: "Pases premium",
};

const TAB_SUBTITLE_MAP = {
  potions: "Activa elixir de XP, riego instantáneo y cristales de maná.",
  seeds: "Desbloquea brotes elementales para ampliar tu jardín.",
  tools: "Potencia tu productividad con artefactos y boosters de tareas.",
  cosmetics: "Personaliza tu planta con macetas, auras y skins temáticas.",
  pets: "Adopta compañeros que entregan buffs y humor extra.",
  subs: "Obtén XP extra, drops duplicados y misiones premium.",
};

const SUBS_CTA_GRADIENT = [
  Colors.surfaceElevated,
  Colors.primaryFantasy,
  "#f0b13c",
];

const SUBSCRIPTION_PLANS = [
  {
    id: "sub_weekly",
    tier: "Pase Ritual 7 días",
    priceLabel: "$2.49 / semana",
    badge: "Nuevo",
    desc: "Impulsa tus rituales durante una semana completa.",
    perks: ["+20% XP diaria", "3 cristales míticos", "Escudo de racha semanal"],
    ctaLabel: "Activar 7 días",
    accent: {
      gradient: ["#1f1134", "#3f2064"],
      pill: Colors.primaryFantasy,
    },
    rewards: {
      wallet: { coin: 500 },
      inventory: [
        { sku: "shop/potions/p5", quantity: 3 },
        { sku: "shop/potions/p8", quantity: 1 },
      ],
      buffs: [{ type: "ritual_xp_20", durationHours: 168 }],
      notes: ["Escudo de racha semanal aplicado."],
    },
  },
  {
    id: "sub_monthly",
    tier: "Bloom Pass mensual",
    priceLabel: "$5.99 / mes",
    badge: "Más popular",
    desc: "Boost continuo para tareas, XP y recompensas.",
    perks: [
      "+30% XP permanente",
      "Misiones premium semanales",
      "Duplicador de drops de maná",
    ],
    ctaLabel: "Suscribirme",
    accent: {
      gradient: ["#26102f", "#5c1f6d"],
      pill: Colors.accent,
    },
    rewards: {
      wallet: { coin: 2500, gem: 120 },
      inventory: [
        { sku: "shop/potions/p19", quantity: 1 },
        { sku: "shop/tools/t2", quantity: 1 },
      ],
      buffs: [{ type: "xp_double", durationHours: 720 }],
      notes: ["Misiones premium habilitadas por 30 días."],
    },
  },
  {
    id: "sub_focus",
    tier: "Kit Foco 3 días",
    priceLabel: "$1.29 / 3 días",
    desc: "Pack corto para eventos o semanas intensas.",
    perks: ["+15% XP ritual", "Cooldown reducido 25%", "1 llave cosmética"],
    ctaLabel: "Comprar pack",
    accent: {
      gradient: ["#1b142e", "#2f3a63"],
      pill: Colors.secondaryFantasy,
    },
    rewards: {
      mana: 120,
      inventory: [
        { sku: "shop/potions/p3", quantity: 1 },
        { sku: "shop/potions/p6", quantity: 1 },
        { sku: "shop/tools/t9", quantity: 1 },
      ],
      buffs: [{ type: "focus_cooldown", durationHours: 72 }],
    },
  },
  {
    id: "sub_custom_pet",
    tier: "Mascota Personal Inmortal",
    priceLabel: "$14.99 / encargo",
    badge: "Exclusivo",
    desc: "Convierte tu compañero real en guardián eterno del jardín.",
    perks: [
      "Avatar personalizado basado en tu mascota",
      "Buff de humor y motivación permanente",
      "Acceso a misiones temáticas de vínculo",
    ],
    ctaLabel: "Encargar",
    accent: {
      gradient: ["#3b1c2d", "#8f4b77"],
      pill: "#ffb347",
    },
    rewards: {
      wallet: { gem: 500 },
      inventory: [
        { sku: "shop/pets/u_unicorn", quantity: 1 },
        { sku: "shop/cosmetics/u_aura_nebula", quantity: 1 },
      ],
      buffs: [{ type: "pet_loyalty", durationHours: 8760 }],
      notes: ["Equipo de soporte te contactará para personalizar la mascota."],
    },
  },
  {
    id: "pack_gems_arcane",
    tier: "Pack de Gemas Arcanas",
    priceLabel: "$4.99 / pack",
    desc: "Carga inmediata de gemas para compras legendarias.",
    perks: ["600 gemas transferibles", "Bonificación +5% XP por 24h"],
    ctaLabel: "Comprar gemas",
    accent: {
      gradient: ["#18233a", "#2e4a91"],
      pill: "#6dd5ff",
    },
    rewards: {
      wallet: { gem: 600 },
      buffs: [{ type: "xp_plus5", durationHours: 24 }],
    },
  },
  {
    id: "pack_coin_alchemist",
    tier: "Pack de Monedas Alquímicas",
    priceLabel: "$2.99 / pack",
    desc: "Recupera tus cofres de monedas para plantas y herramientas.",
    perks: ["5,000 monedas doradas", "1 cristal de maná de cortesía"],
    ctaLabel: "Comprar monedas",
    accent: {
      gradient: ["#2a1b00", "#b26a00"],
      pill: "#ffca60",
    },
    rewards: {
      wallet: { coin: 5000 },
      mana: 50,
      inventory: [{ sku: "shop/potions/p4", quantity: 1 }],
    },
  },
  {
    id: "combo_garden_3d",
    tier: "Combo Jardín Zen · 3 días",
    priceLabel: "$3.49 / combo",
    desc: "Tríada exprés: planta rara, 2 pociones y boost de felicidad 72h.",
    perks: [
      "Semilla rara a elección",
      "2 pociones premium (foco + riego)",
      "+20% felicidad de planta por 3 días",
    ],
    ctaLabel: "Activar combo 3d",
    accent: {
      gradient: ["#123322", "#3f9566"],
      pill: "#66bb6a",
    },
    rewards: {
      mana: 30,
      inventory: [
        { sku: "shop/seeds/u_frailejon", quantity: 1 },
        { sku: "shop/potions/p3", quantity: 1 },
        { sku: "shop/potions/p6", quantity: 1 },
      ],
      buffs: [{ type: "plant_happiness", durationHours: 72 }],
    },
  },
  {
    id: "combo_garden_week",
    tier: "Combo Jardín Mítico · 1 semana",
    priceLabel: "$6.99 / combo",
    desc: "Paquete semanal con semillas épicas y herramientas listas.",
    perks: [
      "2 semillas épicas + 1 cosmético",
      "Herramienta auto-riego de préstamo (7 días)",
      "Escudo de racha semanal incluido",
    ],
    ctaLabel: "Activar combo 7d",
    accent: {
      gradient: ["#1a0f2f", "#56278f"],
      pill: "#b388ff",
    },
    rewards: {
      wallet: { coin: 800 },
      inventory: [
        { sku: "shop/seeds/u_bonsai", quantity: 1 },
        { sku: "shop/seeds/u_carnivora", quantity: 1 },
        { sku: "shop/cosmetics/u_gold_pot", quantity: 1 },
        { sku: "shop/tools/t2", quantity: 1 },
      ],
      buffs: [{ type: "streak_shield", durationHours: 168 }],
    },
  },
  {
    id: "pack_pets_duo",
    tier: "Pack Mascotas & Plantas",
    priceLabel: "$8.99 / set",
    desc: "Adopta un dúo mascota + planta exclusiva con misiones vinculadas.",
    perks: [
      "Mascota poco común personalizada",
      "Planta temática que comparte afinidad",
      "Cadena de misiones cooperativas",
    ],
    ctaLabel: "Adoptar set",
    accent: {
      gradient: ["#3a1a00", "#d86821"],
      pill: "#ffa726",
    },
    rewards: {
      wallet: { coin: 400 },
      mana: 40,
      inventory: [
        { sku: "shop/pets/u_bunny", quantity: 1 },
        { sku: "shop/seeds/u_lavanda", quantity: 1 },
      ],
      buffs: [{ type: "pet_friendship", durationHours: 240 }],
      notes: ["Misiones cooperativas con tu mascota desbloqueadas."],
    },
  },
];

const currencyLabels = {
  [CURRENCIES.MANA]: "mana",
  [CURRENCIES.COIN]: "monedas",
  [CURRENCIES.GEM]: "gemas",
};

const RARITY_ORDER = [
  "basic",
  "uncommon",
  "rare",
  "epic",
  "legendary",
  "mythic",
  "divine",
];

const RARITY_COST_SHAPES = {
  basic: ["mana"],
  uncommon: ["mana", "coin"],
  rare: ["coin"],
  epic: ["coin", "gem"],
  legendary: ["gem"],
  mythic: ["mana", "coin", "gem"],
  divine: ["gem"],
};

const RARITY_BASE_COSTS = {
  basic: { mana: 60 },
  uncommon: { mana: 80, coin: 140 },
  rare: { coin: 280 },
  epic: { coin: 420, gem: 60 },
  legendary: { gem: 500 },
  mythic: { mana: 140, coin: 360, gem: 90 },
  divine: { gem: 2000 },
};

const COST_FALLBACK = { mana: 80, coin: 200, gem: 80 };

const CATEGORY_ABILITY_TEMPLATES = {
  potions: {
    basic: "Soporte diario para mantener equilibrio y humedad.",
    uncommon: "Mezclas que combinan maná y monedas para empujes medios.",
    rare: "Consumibles premium financiados solo con monedas.",
    epic: "Brews de élite que requieren monedas y gemas.",
    legendary: "Conjuros legendarios que solo aceptan gemas puras.",
    mythic: "Catalizadores mixtos: maná, monedas y gemas al mismo tiempo.",
    divine: "Fármacos sagrados reservados para gemas divinas.",
  },
  seeds: {
    basic: "Brotes accesibles para expandir tu vivero sin riesgo.",
    uncommon: "Semillas híbridas que combinan maná y monedas.",
    rare: "Plantas raras compradas exclusivamente con monedas.",
    epic: "Especies épicas que piden monedas y gemas para brotar.",
    legendary: "Árboles legendarios que solo florecen con gemas.",
    mythic: "Ecosistemas míticos alimentados por todos los recursos.",
    divine: "Seres divinos restringidos a gemas puras.",
  },
  tools: {
    basic: "Herramientas ligeras impulsadas solo con maná.",
    uncommon: "Gadgets mixtos que consumen maná y monedas.",
    rare: "Equipo profesional pagado únicamente en monedas.",
    epic: "Artefactos épicos que requieren monedas y gemas.",
    legendary: "Reliquias legendarias desbloqueadas con gemas.",
    mythic: "Kit mítico que exige todos los recursos a la vez.",
    divine: "Instrumentos divinos solo negociados en gemas.",
  },
  cosmetics: {
    basic: "Accesorios base para refrescar la apariencia.",
    uncommon: "Skins mixtas financiadas con maná y monedas.",
    rare: "Looks raros adquiridos únicamente con monedas.",
    epic: "Cosméticos épicos que requieren monedas y gemas.",
    legendary: "Auras legendarias alimentadas por gemas.",
    mythic: "Transformaciones míticas que usan todos los recursos.",
    divine: "Artefactos divinos exclusivos en gemas puras.",
  },
  pets: {
    basic: "Fieras básicas que se vinculan solo con maná.",
    uncommon: "Compañeros híbridos que piden maná + monedas.",
    rare: "Mascotas raras adquiridas con monedas valiosas.",
    epic: "Criaturas épicas que mezclan monedas y gemas.",
    legendary: "Almas legendarias controladas solo por gemas.",
    mythic: "Bestias míticas que absorben todos los recursos.",
    divine: "Custodios divinos atados a gemas sagradas.",
  },
};

const ITEM_EMOJIS = {
  "shop/potions/p1": "🧪",
  "shop/potions/p2": "🔮",
  "shop/potions/p3": "⚡",
  "shop/potions/p4": "⏳",
  "shop/potions/p5": "🌙",
  "shop/potions/p6": "✨",
  "shop/tools/t1": "🪄",
  "shop/tools/t2": "🛡️",
  "shop/tools/t3": "⏰",
  "shop/tools/t4": "🪓",
  "shop/tools/t5": "🧭",
  "shop/tools/t6": "🎒",
  "shop/cosmetics/c1": "🏆",
  "shop/cosmetics/c2": "🎩",
  "shop/cosmetics/c3": "🪽",
  "shop/cosmetics/c4": "🌈",
  "shop/cosmetics/c5": "👑",
};

function formatEffect(desc = "") {
  if (!desc) return "";
  const trimmed = desc.trim();
  if (!trimmed) return "";
  const capitalized = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  return capitalized.endsWith(".") ? capitalized : `${capitalized}.`;
}

function buildHighlights(item) {
  const primary = formatEffect(item.description || item.desc);
  return primary ? [primary] : [];
}

function hexToRgba(hex = "", alpha = 1) {
  const normalized = hex.replace("#", "");
  if (normalized.length !== 6) {
    return `rgba(255, 255, 255, ${alpha})`;
  }
  const bigint = parseInt(normalized, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function rarityIndex(rarity = "basic") {
  const key = `${rarity}`.toLowerCase();
  const idx = RARITY_ORDER.indexOf(key);
  return idx === -1 ? RARITY_ORDER.length : idx;
}

function deriveCurrencyValue(currency, cost) {
  if (currency === CURRENCIES.COIN && typeof cost.mana === "number") {
    return Math.max(80, Math.round(cost.mana * 1.6));
  }
  if (currency === CURRENCIES.MANA && typeof cost.coin === "number") {
    return Math.max(60, Math.round(cost.coin * 0.6));
  }
  if (currency === CURRENCIES.GEM && typeof cost.coin === "number") {
    return Math.max(40, Math.round(cost.coin / 8));
  }
  if (currency === CURRENCIES.COIN && typeof cost.gem === "number") {
    return Math.max(200, Math.round(cost.gem * 5));
  }
  if (currency === CURRENCIES.MANA && typeof cost.gem === "number") {
    return Math.max(70, Math.round(cost.gem * 1.2));
  }
  if (currency === CURRENCIES.GEM && typeof cost.mana === "number") {
    return Math.max(50, Math.round(cost.mana / 1.5));
  }
  return undefined;
}

function normalizeCostByRarity(cost = {}, rarity = "basic") {
  const key = `${rarity}`.toLowerCase();
  const shape = RARITY_COST_SHAPES[key] || ["mana"];
  const base = RARITY_BASE_COSTS[key] || {};
  return shape.reduce((acc, currency) => {
    const existing = cost[currency];
    if (typeof existing === "number" && existing > 0) {
      acc[currency] = existing;
      return acc;
    }
    const derived =
      deriveCurrencyValue(currency, { ...cost, ...acc }) ??
      base[currency] ??
      COST_FALLBACK[currency];
    acc[currency] = Math.max(1, Math.round(derived));
    return acc;
  }, {});
}

function formatLifespanText(lifespan) {
  if (!lifespan) return null;
  const { unit, value } = lifespan;
  switch (unit) {
    case "days":
      return `${value} min`;
    case "weeks":
      return `${value} h`;
    case "months":
      return `${value} días`;
    case "years":
      return `${value} meses`;
    case "special":
      return "No expira (especial)";
    case "immortal":
      return "Inmortal";
    default:
      return null;
  }
}

function formatHoursToReadable(hours) {
  if (!hours || hours <= 0) return null;
  if (hours >= 24) {
    const days = hours / 24;
    if (Number.isInteger(days)) {
      return `${days} ${days === 1 ? "día" : "días"}`;
    }
    return `${days.toFixed(1)} días`;
  }
  return `${hours} h`;
}

function buildTraitHelper(category, trait, inventoryCount = 0) {
  const safeTrait = trait || {};
  switch (category) {
    case "potions": {
      const parts = [];
      if (safeTrait.shelfLifeHours) {
        parts.push(
          `Caduca en ${formatHoursToReadable(safeTrait.shelfLifeHours)}`
        );
      }
      const amount = inventoryCount || 0;
      parts.push(
        `Tienes ${amount} ${amount === 1 ? "poción" : "pociones"}`
      );
      return parts.join(" · ") || null;
    }
    case "seeds": {
      const parts = [];
      if (safeTrait.grid) {
        parts.push(`Espacio ${safeTrait.grid}`);
      }
      const amount = inventoryCount || 0;
      parts.push(
        `Tienes ${amount} ${amount === 1 ? "semilla" : "semillas"} en reserva`
      );
      return parts.join(" · ") || null;
    }
    case "tools": {
      if (safeTrait.permanent) {
        return "Duración: permanente";
      }
      const parts = [];
      if (safeTrait.durabilityUses) {
        parts.push(`Duración ${safeTrait.durabilityUses} usos`);
      }
      if (safeTrait.cooldownHours) {
        parts.push(
          `Recarga ${formatHoursToReadable(safeTrait.cooldownHours)}`
        );
      }
      return parts.join(" · ") || null;
    }
    case "cosmetics":
      return safeTrait.mantra || null;
    default:
      return null;
  }
}

function describePlanRewards(rewards = {}) {
  const parts = [];
  if (rewards.mana) {
    parts.push(`+${rewards.mana} Maná`);
  }
  const wallet = rewards.wallet || {};
  if (wallet.coin) {
    parts.push(`+${wallet.coin} Monedas`);
  }
  if (wallet.gem) {
    parts.push(`+${wallet.gem} Gemas`);
  }
  (rewards.inventory || []).forEach(({ sku, quantity = 1 }) => {
    const info = SHOP_LOOKUP[sku];
    const label = info?.title || sku;
    const qtyLabel = quantity > 1 ? `${quantity}× ${label}` : label;
    parts.push(`Inventario: ${qtyLabel}`);
  });
  (rewards.buffs || []).forEach(({ type, durationHours }) => {
    if (!type || !durationHours) return;
    const prettyType = type.replace(/_/g, " ");
    const durationLabel = formatHoursToReadable(durationHours);
    parts.push(
      `Buff ${prettyType}${durationLabel ? ` (${durationLabel})` : ""}`
    );
  });
  (rewards.notes || []).forEach((note) => parts.push(note));

  if (!parts.length) {
    parts.push("Beneficio aplicado.");
  }

  return parts.join("\n");
}

export default function ShopScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const initialTab = route.params?.initialTab || "potions";

  const [activeTab, setActiveTab] = useState(initialTab);
  const { mana, inventory } = useAppState();
  const { coin, gem } = useWallet();
  const dispatch = useAppDispatch();
  const canAffordMana = useCanAfford();
  const { modules } = useHydrationStatus();

  const isSubsView = activeTab === "subs";

  const inventoryBySku = useMemo(
    () =>
      inventory.reduce((acc, item) => {
        acc[item.sku] = item.quantity;
        return acc;
      }, {}),
    [inventory]
  );

  const catalogItems = useMemo(() => {
    if (isSubsView) {
      return SUBSCRIPTION_PLANS;
    }
    const traitMap = SHOP_ITEM_TRAITS[activeTab] || {};
    const source = [...(SHOP_CATALOG[activeTab] || [])].sort(
      (a, b) => rarityIndex(a.rarity) - rarityIndex(b.rarity)
    );
    return source.map((item) => {
      const normalizedCost = normalizeCostByRarity(item.cost, item.rarity);
      const abilityCopy =
        CATEGORY_ABILITY_TEMPLATES[activeTab]?.[
          item.rarity?.toLowerCase?.()
        ];
      const lifespanText = formatLifespanText(item.lifespan);
      const ownedCount = inventoryBySku[item.sku] ?? 0;
      const traitHelperText = buildTraitHelper(
        activeTab,
        traitMap[item.sku] || {},
        ownedCount
      );
      return {
        id: item.sku,
        title: item.title,
        description: item.desc,
        cost: normalizedCost,
        rarity: item.rarity || "basic",
        sku: item.sku,
        emoji: item.emoji || ITEM_EMOJIS[item.sku] || "✨",
        image: SHOP_ITEM_ASSET_MAP[item.sku],
        abilityCopy,
        lifespanText,
        traitHelperText,
        ownedCount,
      };
    });
  }, [activeTab, isSubsView, inventoryBySku]);

  const accent = ShopColors[activeTab] || {};

  const walletStats = useMemo(
    () => [
      {
        key: "mana",
        subtitle: "Reservorio",
        value: mana,
        icon: "water",
        accent: ShopColors.potions?.pill || Colors.primary,
      },
      {
        key: "coin",
        title: "Monedas",
        subtitle: "Utilidad",
        value: coin,
        icon: "circle-multiple-outline",
        accent: ShopColors.tools?.pill || Colors.accent,
      },
      {
        key: "gem",
        title: "Gemas",
        subtitle: "Cosméticos",
        value: gem,
        icon: "diamond-stone",
        accent: ShopColors.cosmetics?.pill || Colors.accent,
      },
    ],
    [mana, coin, gem]
  );

  const handleSubscriptionActivation = useCallback(
    (plan) => {
      if (!plan?.rewards) {
        Alert.alert(
          "Próximamente",
          "Este plan aún no está listo para activarse."
        );
        return;
      }
      const { rewards } = plan;
      if (rewards.mana) {
        dispatch({
          type: "SET_MANA",
          payload: Math.max(0, mana + rewards.mana),
        });
      }
      if (rewards.wallet?.coin) {
        dispatch({ type: "ADD_COIN", payload: rewards.wallet.coin });
      }
      if (rewards.wallet?.gem) {
        dispatch({ type: "ADD_GEM", payload: rewards.wallet.gem });
      }
      (rewards.inventory || []).forEach(({ sku, quantity = 1 }) => {
        if (!sku) return;
        const info = SHOP_LOOKUP[sku];
        const payload = {
          sku,
          title: info?.title || plan.tier,
          category: info?.category || "subs",
          quantity,
        };
        dispatch({ type: "ADD_TO_INVENTORY", payload });
      });
      (rewards.buffs || []).forEach(({ type, durationHours }) => {
        if (!type || !durationHours) return;
        dispatch({
          type: "ACTIVATE_BUFF",
          payload: { type, durationMs: durationHours * 3600 * 1000 },
        });
      });

      Alert.alert("Pack activado", describePlanRewards(rewards));
    },
    [dispatch, mana]
  );

  const isAffordable = useCallback(
    (item) => {
      if (!item.cost) return false;
      return Object.entries(item.cost).every(([currency, amount]) => {
        if (currency === CURRENCIES.MANA) return canAffordMana(amount);
        if (currency === CURRENCIES.COIN) return coin >= amount;
        if (currency === CURRENCIES.GEM) return gem >= amount;
        return false;
      });
    },
    [canAffordMana, coin, gem]
  );



  const handlePurchase = useCallback(
    (item) => {
      if (!item) return;
      
      if (!isAffordable(item)) {
        Alert.alert("Saldo insuficiente", "No tienes suficientes recursos para comprar este item.");
        return;
      }

      // Deduct all costs
      Object.entries(item.cost).forEach(([currency, amount]) => {
        if (currency === CURRENCIES.MANA) {
          dispatch({ type: "PURCHASE_WITH_MANA", payload: amount });
        } else if (currency === CURRENCIES.COIN) {
          dispatch({ type: "SPEND_COIN", payload: amount });
        } else if (currency === CURRENCIES.GEM) {
          dispatch({ type: "SPEND_GEM", payload: amount });
        }
      });

      const sku = item.sku || item.id;
      dispatch({
        type: "ADD_TO_INVENTORY",
        payload: { sku, title: item.title, category: activeTab },
      });
      dispatch({
        type: "ACHIEVEMENT_EVENT",
        payload: { type: "purchase", payload: { sku, category: activeTab } },
      });

      Alert.alert("Compra exitosa", "Se agrego al inventario.");
    },
    [activeTab, dispatch, isAffordable]
  );

  const categoryAccent =
    CATEGORY_ACCENTS[isSubsView ? "subs" : activeTab] || CATEGORY_ACCENTS.default;

  if (modules.wallet) {
    return (
      <SafeAreaView style={styles.container}>
        <SectionPlaceholder height={320} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <View>
            <Text style={styles.modalTitle}>Tienda magica</Text>
            <View style={styles.headerTagRow}>
              <Text
                style={[
                  styles.headerCategoryTag,
                  {
                    color: categoryAccent.pill || Colors.text,
                    borderColor:
                      categoryAccent.border || categoryAccent.pill || Colors.accent,
                    backgroundColor:
                      hexToRgba(categoryAccent.pill, 0.12) ||
                      categoryAccent.bg ||
                      Colors.surfaceAlt,
                  },
                ]}
              >
                {TAB_LABEL_MAP[isSubsView ? "subs" : activeTab] ||
                  "Descubre más"}
              </Text>
            </View>
            <Text style={styles.modalSubtitle}>
              {TAB_SUBTITLE_MAP[isSubsView ? "subs" : activeTab] ||
                "Descubre mejoras para tu planta"}
            </Text>
          </View>
          <View style={styles.walletChipsRow}>
            {walletStats.map((stat) => {
              const borderColor = hexToRgba(stat.accent, 0.4);
              const backgroundColor = hexToRgba(stat.accent, 0.12);
              return (
                <View
                  key={stat.key}
                  style={[
                    styles.walletChip,
                    { borderColor, backgroundColor },
                  ]}
                  accessibilityLabel={`${stat.value} disponibles`}
                  accessibilityRole="text"
                >
                  <View
                    style={[
                      styles.walletChipIcon,
                      { borderColor: hexToRgba(stat.accent, 0.4) },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={stat.icon}
                      size={14}
                      color={stat.accent}
                    />
                  </View>
                  <View style={styles.walletChipText}>
                    <Text style={styles.walletChipValue}>{stat.value}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
        <Pressable
          onPress={() => navigation.goBack()}
          style={({ pressed }) => [
            styles.closeButton,
            pressed && styles.closeButtonPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Cerrar tienda"
        >
          <MaterialCommunityIcons name="close" size={20} color={Colors.text} />
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.tabSlider} accessibilityRole="tablist">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabSliderContent}
          >
            {TABS.map((tab) => {
              const isActive = tab.key === activeTab;
              const tabAccent = ShopColors[tab.key] || {};
              const chipGradient =
                TAB_GRADIENTS[tab.key] ||
                [
                  tabAccent.bg || Colors.surfaceAlt,
                  hexToRgba(tabAccent.pill, 0.85) || Colors.surfaceAlt,
                ];
              const activeBorder =
                tabAccent.border || tabAccent.pill || Colors.accent;
              const activeShadow = tabAccent.pill || Colors.accent;
              const chipLabelColor = Colors.text;
              const captionColor = isActive
                ? Colors.text
                : Colors.textMuted;
              const iconBorderColor = isActive
                ? Colors.text
                : hexToRgba(tabAccent.pill, 0.5) || Colors.border;
              const iconBg =
                hexToRgba(tabAccent.pill, 0.25) || Colors.overlay;

              const chipContent = (
                <View style={styles.tabChipContent}>
                  <View
                    style={[
                      styles.tabChipIconWrap,
                      {
                        borderColor: iconBorderColor,
                        backgroundColor: iconBg,
                      },
                    ]}
                  >
                    <MaterialCommunityIcons
                      name={tab.icon}
                      size={16}
                      color={chipLabelColor}
                    />
                  </View>
                  <View style={styles.tabChipTextStack}>
                    <Text style={[styles.tabText, { color: chipLabelColor }]}>
                      {tab.label}
                    </Text>
                    <Text
                      style={[styles.tabCaption, { color: captionColor }]}
                      numberOfLines={1}
                    >
                      {tab.caption}
                    </Text>
                  </View>
                  {tab.isNew ? (
                    <View style={styles.tabChipBadge}>
                      <Text style={styles.tabChipBadgeText}>Nuevo</Text>
                    </View>
                  ) : null}
                </View>
              );

              return (
                <Pressable
                  key={tab.key}
                  onPress={() => setActiveTab(tab.key)}
                  style={({ pressed }) => [
                    styles.tabChipPressable,
                    pressed && styles.tabChipPressed,
                  ]}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  accessibilityLabel={`Mostrar ${tab.label}`}
                >
                  {isActive ? (
                    <LinearGradient
                      colors={chipGradient}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                      style={[
                        styles.tabChip,
                        styles.tabChipActive,
                        {
                          borderColor: activeBorder,
                          shadowColor: activeShadow,
                        },
                      ]}
                    >
                      {chipContent}
                    </LinearGradient>
                  ) : (
                    <View
                      style={[
                        styles.tabChip,
                        styles.tabChipInactive,
                        {
                          borderColor:
                            tabAccent.border || Colors.border,
                        },
                      ]}
                    >
                      {chipContent}
                    </View>
                  )}
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <Pressable
          onPress={() => setActiveTab("subs")}
          style={({ pressed }) => [
            styles.subsCTAWrapper,
            activeTab === "subs" && styles.subsCTAWrapperActive,
            pressed && styles.subsCTAWrapperPressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Ver pases premium"
          accessibilityHint="Muestra los planes premium disponibles"
        >
          <LinearGradient
            colors={SUBS_CTA_GRADIENT}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.subsCTA}
          >
            <View style={styles.subsCTAContent}>
              <View style={styles.subsCTAHeader}>
                <View style={styles.subsCTAIconPill}>
                  <MaterialCommunityIcons
                    name="crown-outline"
                    size={18}
                    color={Colors.text}
                  />
                </View>
                <View style={styles.subsCTATextStack}>
                  <Text style={styles.subsCTATitle}>Pases premium</Text>
                  <Text style={styles.subsCTASubtitle}>
                    Boost semanales y mensuales
                  </Text>
                </View>
              </View>
              <View style={styles.subsCTAButton}>
                <Text style={styles.subsCTAButtonText}>Ver pases</Text>
              </View>
            </View>
          </LinearGradient>
        </Pressable>

        {__DEV__ && !isSubsView && (
          <Pressable
            onPress={() => dispatch({ type: "SET_MANA", payload: mana + 50 })}
            style={({ pressed }) => [
              styles.debugButton,
              pressed && { opacity: 0.85 },
            ]}
            accessibilityRole="button"
            accessibilityLabel="Agregar 50 de mana (debug)"
          >
            <Text style={styles.debugButtonText}>Agregar 50 de mana (debug)</Text>
          </Pressable>
        )}

        {isSubsView ? (
          <View style={styles.subsList}>
            {catalogItems.map((plan) => (
              <SubscriptionCard
                key={plan.id}
                tier={plan.tier}
                priceLabel={plan.priceLabel}
                badge={plan.badge}
                desc={plan.desc}
                perks={plan.perks}
                ctaLabel={plan.ctaLabel}
                accent={plan.accent}
                onPress={() => handleSubscriptionActivation(plan)}
              />
            ))}
          </View>
        ) : (
          <View style={styles.cardStack}>
            {catalogItems.map((item) => {
              const affordable = isAffordable(item);
              const highlights = buildHighlights(item, activeTab);
              const [headline, ...detailHighlights] = highlights;
              const itemCost = item.cost || {};
      const balance = {
        mana,
        coin,
        gem,
      };

      const deficiencies = Object.entries(itemCost).reduce(
        (acc, [currency, amount]) => {
          const current = balance[currency] ?? 0;
          const missing = Math.max(0, amount - current);
          if (missing > 0) {
            acc.push({ currency, amount: missing });
          }
          return acc;
        },
        []
      );

      return (
                <ShopItemCard
                  key={item.id}
                  title={item.title}
                  emoji={item.emoji}
                  image={item.image}
                  cost={itemCost}
                  rarity={item.rarity}
                  accent={accent}
                  disabled={!affordable}
                  canAfford={affordable}
                  onPrimaryAction={() => handlePurchase(item)}
                  containerStyle={styles.cardStackItem}
                  headline={headline}
                  highlights={detailHighlights}
                  deficits={deficiencies}
                  lifespanText={item.lifespanText}
                  metaHelperText={item.traitHelperText}
                  onNavigateToStore={() => setActiveTab("subs")}
                />
      );
            })}
          </View>
        )}

        <Text style={styles.footerNote}>
          Las compras son finales. Necesitas ayuda? Contacta soporte.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}
