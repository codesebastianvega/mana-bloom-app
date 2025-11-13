// [MB] Modulo: Home / Seccion: Tienda Magica (Pestanas)
// Afecta: HomeScreen (layout principal)
// Proposito: Seccion de tienda magica con tabs y compras simuladas
// Puntos de edicion futura: conectar catalogo real y mover data a constantes/mock
// Autor: Codex - Fecha: 2025-10-15

import React, { useState, useMemo, useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./MagicShopSection.styles";
import SectionPlaceholder from "../common/SectionPlaceholder";
import { Colors } from "../../theme";
import { SHOP_CATALOG, ShopColors } from "../../constants/shopCatalog";
import {
  useAppState,
  useAppDispatch,
  useHydrationStatus,
  useWallet,
} from "../../state/AppContext";

const TABS = [
  { key: "potions", label: "Pociones", icon: "bottle-tonic-plus" },
  { key: "tools", label: "Tools", icon: "hammer-screwdriver" },
  { key: "cosmetics", label: "Cosmeticos", icon: "palette-swatch" },
];

const PREVIEW_COUNT = 2;
const SHOP_PREVIEWS = Object.fromEntries(
  ["potions", "tools", "cosmetics"].map((key) => {
    const source = SHOP_CATALOG[key] || [];
    const items = source.slice(0, PREVIEW_COUNT).map((item) => ({
      id: item.sku,
      sku: item.sku,
      title: item.title,
      price: item.price,
      currency: item.currency || "mana",
      emoji: item.emoji || "✨",
    }));
    return [key, items];
  })
);

const CURRENCY_LABELS = {
  mana: "mana",
  coin: "monedas",
  gem: "gemas",
};

const BADGE_BG_ALPHA = 0.28;
const BADGE_ICON_ALPHA = 0.22;

function hexToRgba(hex, alpha = 1) {
  if (!hex || typeof hex !== "string") return undefined;
  if (hex.startsWith("rgba") || hex.startsWith("rgb")) {
    return hex;
  }
  let normalized = hex.replace("#", "");
  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((char) => `${char}${char}`)
      .join("");
  }
  let sourceAlpha = alpha;
  if (normalized.length === 8) {
    const alphaHex = normalized.slice(6, 8);
    const embeddedAlpha = parseInt(alphaHex, 16) / 255;
    sourceAlpha = embeddedAlpha * alpha;
    normalized = normalized.slice(0, 6);
  }
  const intVal = parseInt(normalized, 16);
  if (Number.isNaN(intVal)) return undefined;
  const r = (intVal >> 16) & 255;
  const g = (intVal >> 8) & 255;
  const b = intVal & 255;
  return `rgba(${r},${g},${b},${sourceAlpha})`;
}

const DEFAULT_BADGE_BG = hexToRgba(Colors.surfaceElevated, BADGE_BG_ALPHA) || Colors.surfaceElevated;
const DEFAULT_BADGE_ICON_BG =
  hexToRgba(Colors.surfaceElevated, BADGE_ICON_ALPHA) || Colors.surfaceAlt;

export default function MagicShopSection() {
  const navigation = useNavigation();
  const { mana } = useAppState();
  const { coin, gem } = useWallet();
  const dispatch = useAppDispatch();
  const { modules } = useHydrationStatus();
  const [activeTab, setActiveTab] = useState("potions");

  const walletStats = useMemo(
    () => [
      {
        key: "mana",
        title: "Mana",
        subtitle: "Reservorio",
        value: mana,
        icon: "water",
        accent: ShopColors.potions?.pill || Colors.accent,
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
        subtitle: "Cosmeticos",
        value: gem,
        icon: "diamond-stone",
        accent: ShopColors.cosmetics?.pill || Colors.accent,
      },
    ],
    [mana, coin, gem]
  );

  const addDebugMana = useCallback(() => {
    dispatch({ type: "SET_MANA", payload: mana + 5 });
  }, [dispatch, mana]);

  const handleOpenShop = useCallback(
    (category) => {
      navigation.navigate("ShopScreen", { initialTab: category });
    },
    [navigation]
  );

  if (modules.wallet) {
    return <SectionPlaceholder height={260} />;
  }

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Tienda magica</Text>
        <Text style={styles.subtitle}>
          Sube de nivel con pociones, herramientas y cosmeticos.
        </Text>
      </View>

      <View style={styles.walletCard}>
        {walletStats.map((stat) => (
          <View key={stat.key} style={styles.walletStat}>
            <View style={styles.walletHeader}>
              <MaterialCommunityIcons
                name={stat.icon}
                size={16}
                color={stat.accent}
              />
              <Text style={styles.walletTitle}>{stat.title}</Text>
            </View>
            <Text style={styles.walletSubtitle}>{stat.subtitle}</Text>
            <Text style={styles.walletValue}>{stat.value}</Text>
          </View>
        ))}
      </View>

      {__DEV__ && (
        <Pressable
          onPress={addDebugMana}
          style={({ pressed }) => [
            styles.debugButton,
            pressed && { opacity: 0.8 },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Agregar 5 de mana (debug)"
        >
          <Text style={styles.debugButtonText}>Agregar 5 de mana (debug)</Text>
        </Pressable>
      )}

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
                size={16}
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

      <View style={styles.badgeGrid} accessibilityRole="list">
        {(SHOP_PREVIEWS[activeTab] || []).map((item) => {
          const currency = item.currency || "mana";
          const label = CURRENCY_LABELS[currency] || "";
          const accent = ShopColors[activeTab] || {};
          const borderColor = accent.border || Colors.border;
          const iconTint = accent.pill || Colors.accent;
          const backgroundTint = hexToRgba(accent.bg, BADGE_BG_ALPHA) || DEFAULT_BADGE_BG;
          const iconBackground =
            hexToRgba(iconTint, BADGE_ICON_ALPHA) || DEFAULT_BADGE_ICON_BG;
          return (
            <Pressable
              key={item.id}
              onPress={() => handleOpenShop(activeTab)}
              style={({ pressed }) => [
                styles.badge,
                { borderColor, backgroundColor: backgroundTint },
                pressed && styles.badgePressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Ver ${item.title} en la tienda`}
              accessibilityHint="Abrira la tienda completa para este tipo de objeto"
            >
              <View style={styles.badgeLeft}>
                <View
                  style={[
                    styles.badgeIcon,
                    {
                      borderColor: iconTint,
                      backgroundColor: iconBackground,
                    },
                  ]}
                >
                  <Text style={[styles.badgeEmoji, { color: iconTint }]}>
                    {item.emoji}
                  </Text>
                </View>
                <Text style={styles.badgeTitle}>{item.title}</Text>
              </View>
              <View style={styles.badgeRight}>
                <Text style={styles.badgePrice}>
                  <Text style={styles.badgePriceValue}>{item.price}</Text> {label}
                </Text>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={16}
                  color={Colors.textMuted}
                />
              </View>
            </Pressable>
          );
        })}
      </View>

      <Pressable
        onPress={() =>
          navigation.navigate("ShopScreen", { initialTab: activeTab })
        }
        style={({ pressed }) => [
          styles.viewAllButton,
          pressed && { opacity: 0.85 },
        ]}
        accessibilityRole="button"
        accessibilityLabel="Abrir tienda completa"
      >
        <Text style={styles.viewAllText}>Ver tienda completa</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={18}
          color={Colors.text}
        />
      </Pressable>
    </View>
  );
}
