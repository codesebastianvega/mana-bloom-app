// [MB] Módulo: Home / Sección: ShopItemCard
// Afecta: ShopScreen (grid productos)
// Propósito: Renderizar cards de tienda con imagen destacada, rareza y costos
// Puntos de edición futura: vincular estados de stock y wishlist
// Autor: Codex - Fecha: 2025-11-21

import React from "react";
import { View, Text, Image, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./ShopItemCard.styles";
import { Colors, Opacity } from "../../theme";
import { RARITY_TIERS, CURRENCIES } from "../../constants/shopCatalog";

const currencyIcons = {
  [CURRENCIES.MANA]: "water",
  [CURRENCIES.COIN]: "circle-multiple-outline",
  [CURRENCIES.GEM]: "diamond-stone",
};

const currencyNames = {
  [CURRENCIES.MANA]: "Maná",
  [CURRENCIES.COIN]: "Monedas",
  [CURRENCIES.GEM]: "Gemas",
};

const CTA_LABEL_ACTIVE = "Comprar";
const CTA_LABEL_DISABLED = "Adquirir recursos";


const DEFAULT_CARD_BG = "rgba(255,255,255,0.08)";
const DEFAULT_CARD_BORDER = "rgba(255,255,255,0.22)";
const DEFAULT_CHIP_BG = "rgba(255,255,255,0.1)";

function hexToRgba(hex = "", alpha = 1) {
  if (!hex) return undefined;
  if (hex.startsWith("rgba") || hex.startsWith("rgb")) return hex;
  let normalized = hex.replace("#", "");
  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((c) => `${c}${c}`)
      .join("");
  }
  if (normalized.length !== 6) return undefined;
  const intVal = parseInt(normalized, 16);
  const r = (intVal >> 16) & 255;
  const g = (intVal >> 8) & 255;
  const b = intVal & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

const formatDeficit = (deficits = []) =>
  deficits
    .map((item) => `${item.amount} ${currencyNames[item.currency] || item.currency}`)
    .join(" · ");

const getCtaLabel = (canAfford) =>
  canAfford ? CTA_LABEL_ACTIVE : CTA_LABEL_DISABLED;

export default function ShopItemCard({
  title,
  emoji = "✨",
  image,
  cost = {},
  rarity = "basic",
  accent = {},
  disabled,
  canAfford = true,
  onPrimaryAction,
  onNavigateToStore,
  containerStyle,
  headline = "",
  highlights = [],
  deficits = [],
  lifespanText,
  metaHelperText = "",
  ...rest
}) {
  const imageSource = image || null;
  const { bg, border, pill } = accent || {};
  const rarityKey = rarity ? rarity.toUpperCase() : "BASIC";
  const rarityInfo = RARITY_TIERS[rarityKey] || RARITY_TIERS.BASIC;

  const accentColor =
    (typeof pill === "string" && pill.length ? pill : undefined) ||
    (typeof border === "string" && border.length ? border : undefined) ||
    Colors.accent;
  const rarityAccent = rarityInfo.color || accentColor;
  const cardBackground =
    hexToRgba(bg, 0.18) ||
    hexToRgba(accentColor, 0.12) ||
    DEFAULT_CARD_BG;
  const cardBorder =
    rarityInfo.border ||
    hexToRgba(border, 0.35) ||
    hexToRgba(accentColor, 0.25) ||
    DEFAULT_CARD_BORDER;
  const chipBackground =
    hexToRgba(rarityAccent, 0.18) ||
    hexToRgba(border, 0.18) ||
    DEFAULT_CHIP_BG;
  const detailColor = pill || Colors.textMuted;
  const accentBorderColor = hexToRgba(rarityAccent, 0.5) || cardBorder;
  const accentTextColor =
    hexToRgba(rarityAccent, 0.9) || hexToRgba(Colors.text, 0.9);

  const safeHighlights = highlights.slice(0, 2).filter(Boolean);
  const showCardDisabled = disabled ?? !canAfford;
  const pressableDisabled = !canAfford && !onNavigateToStore;
  const ctaText = getCtaLabel(canAfford);

  const renderCost = () =>
    Object.entries(cost).map(([currency, amount]) => {
      const icon = currencyIcons[currency] || "star";
      return (
        <View
          key={currency}
            style={[
              styles.pricePill,
            { borderColor: accentBorderColor, backgroundColor: chipBackground },
            ]}
          >
            <MaterialCommunityIcons
              name={icon}
              size={14}
              color={accentTextColor}
            />
          <Text style={[styles.priceAmount, { color: accentTextColor }]}>{amount}</Text>
          </View>
        );
      });

  return (
    <View
      style={[
        styles.card,
        {
          borderColor: cardBorder,
          backgroundColor: cardBackground,
        },
        showCardDisabled && { opacity: Opacity.disabled },
        containerStyle,
      ]}
      {...rest}
    >
      <View style={styles.media}>
        {imageSource ? (
          <Image source={imageSource} style={styles.mediaImage} resizeMode="contain" />
        ) : (
          <View style={styles.mediaEmoji}>
            <Text style={styles.mediaEmojiText}>{emoji}</Text>
          </View>
        )}
        <View
          style={[
            styles.rarityBadge,
            {
              borderColor: cardBorder,
              backgroundColor: hexToRgba(rarityInfo.color, 0.15),
            },
          ]}
        >
          <Text style={styles.rarityText}>{rarityInfo.label}</Text>
        </View>
      </View>

      <View style={styles.body}>
        <Text style={styles.title}>{title}</Text>
        {headline ? <Text style={styles.subtitle}>{headline}</Text> : null}
        {Object.keys(cost).length ? (
          <View style={styles.costRow}>{renderCost()}</View>
        ) : null}

        {safeHighlights.length > 0 ? (
          <View style={styles.highlights}>
            {safeHighlights.map((line, index) => (
              <View key={`${line}-${index}`} style={styles.highlightRow}>
                <MaterialCommunityIcons
                  name={index === 0 ? "star-four-points" : "star-four-points-outline"}
                  size={14}
                  color={detailColor}
                />
                <Text style={styles.highlightText}>{line}</Text>
              </View>
            ))}
          </View>
        ) : null}
      </View>

      {deficits.length ? (
        <Text style={styles.helperText}>{`Te faltan ${formatDeficit(
          deficits
        )}`}</Text>
      ) : lifespanText ? (
        <Text style={styles.helperText}>{`Tiempo de vida: ${lifespanText}`}</Text>
      ) : metaHelperText ? (
        <Text style={styles.helperText}>{metaHelperText}</Text>
      ) : null}

      <Pressable
        onPress={() => {
          if (!canAfford) {
            onNavigateToStore?.();
            return;
          }
          onPrimaryAction?.();
        }}
        disabled={pressableDisabled}
        style={({ pressed }) => [
          styles.ctaRow,
          { borderColor: accentBorderColor },
          pressed && !pressableDisabled ? { opacity: 0.9 } : null,
        ]}
        accessibilityRole="button"
        accessibilityState={{ disabled: pressableDisabled }}
      >
        <Text style={[styles.ctaLabel, { color: accentTextColor }]}>{ctaText}</Text>
        <MaterialCommunityIcons name="arrow-right" size={16} color={accentTextColor} />
      </Pressable>
    </View>
  );
}
