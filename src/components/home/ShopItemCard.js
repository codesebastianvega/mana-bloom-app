// [MB] Modulo: Home / Seccion: Tienda Magica (Pestanas)
// Afecta: HomeScreen (layout principal)
// Proposito: Card de item reutilizable para la tienda magica
// Puntos de edicion futura: integrar logica de compra y seleccion
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { Pressable, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./ShopItemCard.styles";
import { Colors, Opacity } from "../../theme";

const currencyIcons = {
  mana: "water",
  coin: "circle-multiple-outline",
  gem: "diamond-stone",
};

const DEFAULT_CARD_BG = "rgba(255,255,255,0.18)";
const DEFAULT_CARD_BORDER = "rgba(255,255,255,0.28)";
const DEFAULT_CHIP_BG = "rgba(255,255,255,0.12)";

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

function stripBuyPrefix(label = "") {
  return label.replace(/^[Cc]omprar\s+/, "").trim();
}

export default function ShopItemCard({
  title,
  emoji = "✨",
  price,
  currency = "mana",
  accent = {},
  disabled,
  onPrimaryAction,
  actionLabel = "",
  containerStyle,
  headline = "",
  highlights = [],
  ...rest
}) {
  const { bg, border, pill } = accent || {};
  const accentColor = pill || border || Colors.accent;
  const cardBackground =
    hexToRgba(bg, 0.22) ||
    hexToRgba(accentColor, 0.18) ||
    DEFAULT_CARD_BG;
  const cardBorder =
    hexToRgba(border, 0.4) ||
    hexToRgba(accentColor, 0.28) ||
    DEFAULT_CARD_BORDER;
  const chipBackground =
    hexToRgba(accentColor, 0.22) ||
    hexToRgba(border, 0.2) ||
    DEFAULT_CHIP_BG;

  const currencyIcon = currencyIcons[currency] || currencyIcons.mana;
  const detailColor = pill || Colors.textMuted;
  const safeHighlights = highlights.slice(0, 2).filter(Boolean);
  const actionValue = stripBuyPrefix(actionLabel || "");

  return (
    <View
      style={[
        styles.card,
        { borderColor: cardBorder, backgroundColor: cardBackground },
        disabled && { opacity: Opacity.disabled },
        containerStyle,
      ]}
      {...rest}
    >
      <View style={styles.header}>
        <View style={[styles.emojiBubble, { borderColor: accentColor }]}>
          <Text style={styles.emojiText}>{emoji}</Text>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{title}</Text>
          {headline ? <Text style={styles.headline}>{headline}</Text> : null}
        </View>
        <View
          style={[
            styles.pricePill,
            { backgroundColor: chipBackground, borderColor: cardBorder },
          ]}
        >
          <MaterialCommunityIcons
            name={currencyIcon}
            size={14}
            color={Colors.onAccent}
          />
          <Text style={styles.priceText}>{price}</Text>
        </View>
      </View>

      {safeHighlights.length > 0 ? (
        <View style={styles.highlights}>
          {safeHighlights.map((line, index) => (
            <View key={`${line}-${index}`} style={styles.highlightRow}>
              <MaterialCommunityIcons
                name={index === 0 ? "sparkles" : "star-four-points-outline"}
                size={14}
                color={detailColor}
                style={styles.highlightIcon}
              />
              <Text style={styles.highlightText}>{line}</Text>
            </View>
          ))}
        </View>
      ) : null}

      {actionValue ? (
        <Pressable
          onPress={onPrimaryAction}
          disabled={disabled}
          style={({ pressed }) => [
            styles.ctaRow,
            { borderColor: cardBorder, backgroundColor: chipBackground },
            pressed && !disabled ? { opacity: 0.9 } : null,
          ]}
          accessibilityRole="button"
          accessibilityState={{ disabled }}
        >
          <Text style={styles.ctaLabel}>Comprar</Text>
          <View style={styles.ctaValueWrap}>
            <MaterialCommunityIcons
              name={currencyIcon}
              size={14}
              color={Colors.text}
              style={styles.ctaIcon}
            />
            <Text style={styles.ctaValue}>{actionValue}</Text>
            <MaterialCommunityIcons
              name="chevron-right"
              size={16}
              color={Colors.textMuted}
            />
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}
