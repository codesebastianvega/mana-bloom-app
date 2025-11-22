// [MB] Modulo: Home / Seccion: Tienda Magica (Pestanas)
// Afecta: HomeScreen (layout principal)
// Proposito: Seccion de tienda magica con tabs y compras simuladas
// Puntos de edicion futura: conectar catalogo real y mover data a constantes/mock
// Autor: Codex - Fecha: 2025-10-15

import React, { useState, useMemo, useCallback } from "react";
import { View, Text, Pressable, Image, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./MagicShopSection.styles";
import SectionPlaceholder from "../common/SectionPlaceholder";
import { Colors } from "../../theme";
import { SHOP_CATALOG, ShopColors } from "../../constants/shopCatalog";
import { SHOP_ITEM_ASSET_MAP } from "../../constants/shopAssets";
import {
  useAppState,
  useAppDispatch,
  useHydrationStatus,
} from "../../state/AppContext";

const CATEGORY_CONFIG = {
  potions: { label: "Pociones", icon: "bottle-tonic-plus" },
  seeds: { label: "Plantas", icon: "sprout" },
  tools: { label: "Herramientas", icon: "hammer-screwdriver" },
  cosmetics: { label: "Cosmeticos", icon: "palette-swatch" },
  pets: { label: "Mascotas", icon: "paw" },
};

const PREVIEW_COUNT = 3;

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
  const dispatch = useAppDispatch();
  const { modules } = useHydrationStatus();
  const availableTabs = useMemo(
    () =>
      Object.keys(CATEGORY_CONFIG).filter(
        (key) => Array.isArray(SHOP_CATALOG[key]) && SHOP_CATALOG[key].length > 0
      ),
    []
  );
  const [activeTab, setActiveTab] = useState(
    availableTabs[0] || "potions"
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

  const sectionAccent = ShopColors[activeTab] || {};
  const previews = useMemo(() => {
    const lookup = {};
    availableTabs.forEach((key) => {
      const shuffled = [...(SHOP_CATALOG[key] || [])].sort(
        () => Math.random() - 0.5
      );
      const items = shuffled
        .slice(0, PREVIEW_COUNT)
        .map((item) => {
          const costEntry =
            Object.entries(item.cost || {})[0] || ["mana", item.price || 0];
          return {
            id: item.sku,
            sku: item.sku,
            title: item.title,
            emoji: item.emoji || "✨",
            image: SHOP_ITEM_ASSET_MAP[item.sku],
            costEntry,
          };
        });
      lookup[key] = items;
    });
    return lookup;
  }, [availableTabs]);
  const previewItems = previews[activeTab] || [];

  return (
    <View style={styles.section}>
      <View style={styles.headerRow}>
        <View style={styles.titleStack}>
          <Text style={styles.title}>Tienda magica</Text>
          <Text style={styles.subtitle}>
            Sube de nivel con pociones, herramientas y cosmeticos.
          </Text>
        </View>
        <Pressable
          onPress={() =>
            navigation.navigate("ShopScreen", { initialTab: activeTab })
          }
          style={({ pressed }) => [
            styles.viewAllButton,
            {
              borderColor: sectionAccent.pill || Colors.text,
              backgroundColor:
                hexToRgba(sectionAccent.pill, 0.12) || Colors.surfaceAlt,
            },
            pressed && { opacity: 0.7 },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Abrir tienda completa"
        >
          <Text
            style={[
              styles.viewAllText,
              { color: sectionAccent.pill || Colors.text },
            ]}
          >
            Ver tienda completa
          </Text>
          <MaterialCommunityIcons
            name="arrow-top-right"
            size={16}
            color={sectionAccent.pill || Colors.text}
          />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tabsRow}
        style={styles.tabsScroll}
        accessibilityRole="tablist"
      >
        {availableTabs.map((key) => {
          const tabMeta = CATEGORY_CONFIG[key] || { label: key };
          const isActive = key === activeTab;
          const tabAccent = ShopColors[key] || {};
          return (
            <Pressable
              key={key}
              onPress={() => setActiveTab(key)}
              style={[
                styles.tabButton,
                isActive && {
                  backgroundColor:
                    hexToRgba(tabAccent.pill, 0.18) || Colors.surfaceAlt,
                  borderColor: hexToRgba(tabAccent.pill, 0.85),
                },
              ]}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`Mostrar ${tabMeta.label}`}
            >
              <MaterialCommunityIcons
                name={tabMeta.icon || "star-four-points"}
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
                {tabMeta.label}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.cardList} accessibilityRole="list">
        {previewItems.map((item) => {
          const accent = ShopColors[activeTab] || {};
          const iconTint = accent.pill || Colors.accent;
          const [currency, amount] = item.costEntry || [];
          const priceLabel = currency
            ? `${amount} ${CURRENCY_LABELS[currency] || currency}`
            : "";
          const cardBackground =
            hexToRgba(iconTint, 0.12) || Colors.surfaceAlt;
          const cardBorder =
            hexToRgba(iconTint, 0.35) || Colors.border;
          return (
            <Pressable
              key={item.id}
              onPress={() => handleOpenShop(activeTab)}
              style={({ pressed }) => [
                styles.previewCard,
                { backgroundColor: cardBackground, borderColor: cardBorder },
                pressed && styles.previewCardPressed,
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Ver ${item.title} en la tienda`}
            >
              <View style={styles.previewImageWrapper}>
                {item.image ? (
                  <Image
                    source={item.image}
                    style={styles.previewImage}
                    resizeMode="contain"
                  />
                ) : (
                  <Text style={[styles.badgeEmoji, { color: iconTint }]}>
                    {item.emoji}
                  </Text>
                )}
              </View>
              <View style={styles.previewDetails}>
                <Text style={styles.badgeTitle} numberOfLines={1}>
                  {item.title}
                </Text>
                <Text style={styles.badgeMeta} numberOfLines={1}>
                  {`${CATEGORY_CONFIG[activeTab]?.label || activeTab} · ${priceLabel}`}
                </Text>
              </View>
              <MaterialCommunityIcons
                name="chevron-right"
                size={16}
                color={Colors.textMuted}
              />
            </Pressable>
          );
        })}
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
          <Text style={styles.debugButtonText}>+5 mana (debug)</Text>
        </Pressable>
      )}
    </View>
  );
}
