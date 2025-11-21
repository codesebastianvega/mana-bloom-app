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

import styles from "./ShopScreen.styles";
import ShopItemCard from "../components/home/ShopItemCard";
import SubscriptionCard from "../components/shop/SubscriptionCard";
import { SHOP_CATALOG, ShopColors, CURRENCIES, RARITY_TIERS } from "../constants/shopCatalog";
import {
  useAppState,
  useAppDispatch,
  useCanAfford,
  useWallet,
  useHydrationStatus,
} from "../state/AppContext";
import SectionPlaceholder from "../components/common/SectionPlaceholder";
import { Colors } from "../theme";

const TABS = [
  { key: "potions", label: "Pociones", icon: "bottle-tonic-plus" },
  { key: "seeds", label: "Semillas", icon: "sprout" },
  { key: "tools", label: "Herramientas", icon: "hammer-screwdriver" },
  { key: "cosmetics", label: "Cosmeticos", icon: "palette-swatch" },
  { key: "pets", label: "Mascotas", icon: "paw" },
  { key: "subs", label: "Suscripciones", icon: "crown-outline" },
];

const SUBSCRIPTION_PLANS = [
  {
    id: "sub_monthly",
    tier: "Plan mensual",
    priceLabel: "$4.99 / mes",
    desc: "Boosts semanales, mas recompensas y skins exclusivas.",
  },
  {
    id: "sub_yearly",
    tier: "Plan anual",
    priceLabel: "$49.99 / anio",
    badge: "Ahorra 30%",
    desc: "Incluye eventos de temporada y drops especiales.",
  },
  {
    id: "sub_lifetime",
    tier: "Acceso vitalicio",
    priceLabel: "$99.99 unico",
    desc: "Todo el contenido actual y futuro para siempre.",
  },
];

const currencyLabels = {
  [CURRENCIES.MANA]: "mana",
  [CURRENCIES.COIN]: "monedas",
  [CURRENCIES.GEM]: "gemas",
};

const SECONDARY_HIGHLIGHTS = {
  potions: "Aplica efectos temporales desde el inventario.",
  seeds: "Planta nuevas compañeras en tu jardín.",
  tools: "Mejora tu estrategia diaria y permanece hasta usarla.",
  cosmetics: "Solo modifica la apariencia de tu planta.",
  pets: "Compañeros leales para tu aventura.",
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

function buildHighlights(item, category) {
  const primary = formatEffect(item.description || item.desc);
  const secondary = SECONDARY_HIGHLIGHTS[category];
  return [primary, secondary].filter(Boolean);
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

export default function ShopScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const initialTab = route.params?.initialTab || "potions";

  const [activeTab, setActiveTab] = useState(initialTab);
  const { mana } = useAppState();
  const { coin, gem } = useWallet();
  const dispatch = useAppDispatch();
  const canAffordMana = useCanAfford();
  const { modules } = useHydrationStatus();

  const isSubsView = activeTab === "subs";

  const catalogItems = useMemo(() => {
    if (isSubsView) {
      return SUBSCRIPTION_PLANS;
    }
    const source = SHOP_CATALOG[activeTab] || [];
    return source.map((item) => ({
      id: item.sku,
      title: item.title,
      description: item.desc,
      cost: item.cost || { mana: 9999 }, // Fallback if missing
      rarity: item.rarity || "basic",
      sku: item.sku,
      emoji: item.emoji || ITEM_EMOJIS[item.sku] || "✨",
    }));
  }, [activeTab, isSubsView]);

  const accent = ShopColors[activeTab] || {};

  const walletStats = useMemo(
    () => [
      {
        key: "mana",
        value: mana,
        icon: "water",
        accent: ShopColors.potions?.pill || Colors.primary,
      },
      {
        key: "coin",
        value: coin,
        icon: "circle-multiple-outline",
        accent: ShopColors.tools?.pill || Colors.accent,
      },
      {
        key: "gem",
        value: gem,
        icon: "diamond-stone",
        accent: ShopColors.cosmetics?.pill || Colors.accent,
      },
    ],
    [mana, coin, gem]
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

  const getCostLabel = (cost) => {
    if (!cost) return "";
    return Object.entries(cost)
      .map(([curr, amt]) => {
        // Simple short labels for button
        if (curr === CURRENCIES.MANA) return `${amt} Mana`;
        if (curr === CURRENCIES.COIN) return `${amt} Monedas`;
        if (curr === CURRENCIES.GEM) return `${amt} Gemas`;
        return `${amt}`;
      })
      .join(" + ");
  };

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
        <View>
          <Text style={styles.modalTitle}>Tienda magica</Text>
          <Text style={styles.modalSubtitle}>
            Sube de nivel con pociones, herramientas y cosmeticos.
          </Text>
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
        <View style={styles.walletSummary}>
          {walletStats.map((stat) => {
            const accentGlass = hexToRgba(stat.accent, 0.18);
            const accentBorder = hexToRgba(stat.accent, 0.35);
            const accentText = stat.accent || Colors.text;
            return (
              <View
                key={stat.key}
                style={[
                  styles.walletStat,
                  {
                    backgroundColor: accentGlass,
                    borderColor: accentBorder,
                  },
                ]}
              >
                <View
                  style={[styles.walletIconPill, { borderColor: accentText }]}
                >
                  <MaterialCommunityIcons
                    name={stat.icon}
                    size={14}
                    color={accentText}
                  />
                </View>
                <Text style={[styles.walletStatValue, { color: accentText }]}>
                  {stat.value}
                </Text>
              </View>
            );
          })}
        </View>

        <View style={styles.tabsRow} accessibilityRole="tablist">
          {TABS.map((tab) => {
            const isActive = tab.key === activeTab;
            const tabAccent = ShopColors[tab.key] || {};
            return (
              <Pressable
                key={tab.key}
                onPress={() => setActiveTab(tab.key)}
                style={[
                  styles.tabButton,
                  isActive && {
                    backgroundColor: tabAccent.bg,
                    borderColor: tabAccent.border,
                  },
                ]}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                accessibilityLabel={`Mostrar ${tab.label}`}
              >
                <MaterialCommunityIcons
                  name={tab.icon}
                  size={14}
                  color={isActive ? tabAccent.pill : Colors.textMuted}
                  style={styles.tabIcon}
                />
                <Text
                  style={[
                    styles.tabText,
                    { color: isActive ? tabAccent.pill : Colors.textMuted },
                  ]}
                >
                  {tab.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

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
                onPress={() =>
                  Alert.alert(
                    "Proximamente",
                    "Las suscripciones requeriran pasarela de pago."
                  )
                }
              />
            ))}
          </View>
        ) : (
          <View style={styles.cardStack}>
            {catalogItems.map((item) => {
              const affordable = isAffordable(item);
              const highlights = buildHighlights(item, activeTab);
              const [headline, ...detailHighlights] = highlights;
              const costLabel = getCostLabel(item.cost);
              
              return (
                <ShopItemCard
                  key={item.id}
                  title={item.title}
                  emoji={item.emoji}
                  cost={item.cost}
                  rarity={item.rarity}
                  accent={accent}
                  disabled={!affordable}
                  actionLabel={
                    affordable
                      ? `Comprar (${costLabel})`
                      : "Saldo insuficiente"
                  }
                  onPrimaryAction={() => handlePurchase(item)}
                  containerStyle={styles.cardStackItem}
                  headline={headline}
                  highlights={detailHighlights}
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
