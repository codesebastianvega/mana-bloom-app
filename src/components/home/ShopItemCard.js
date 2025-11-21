import React from "react";
import { Pressable, View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import styles from "./ShopItemCard.styles";
import { Colors, Opacity } from "../../theme";
import { RARITY_TIERS, CURRENCIES } from "../../constants/shopCatalog";

const currencyIcons = {
  [CURRENCIES.MANA]: "water",
  [CURRENCIES.COIN]: "circle-multiple-outline",
  [CURRENCIES.GEM]: "diamond-stone",
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
  cost = {}, // { mana: 10, coin: 50 }
  rarity = "basic",
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
  
  // Rarity Logic
  const rarityKey = rarity ? rarity.toUpperCase() : "BASIC";
  const rarityInfo = RARITY_TIERS[rarityKey] || RARITY_TIERS.BASIC;
  const rarityBorder = rarityInfo.border;

  const accentColor = pill || border || Colors.accent;
  const cardBackground =
    hexToRgba(bg, 0.22) ||
    hexToRgba(accentColor, 0.18) ||
    DEFAULT_CARD_BG;
  
  // Use rarity border if available, otherwise fallback
  const cardBorder = rarityBorder || 
    hexToRgba(border, 0.4) ||
    hexToRgba(accentColor, 0.28) ||
    DEFAULT_CARD_BORDER;

  const chipBackground =
    hexToRgba(accentColor, 0.22) ||
    hexToRgba(border, 0.2) ||
    DEFAULT_CHIP_BG;

  const detailColor = pill || Colors.textMuted;
  const safeHighlights = highlights.slice(0, 2).filter(Boolean);
  const actionValue = stripBuyPrefix(actionLabel || "");

  // Render Cost Chips
  const renderCost = () => {
    return Object.entries(cost).map(([currency, amount]) => {
      const icon = currencyIcons[currency] || "star";
      return (
        <View
          key={currency}
          style={[
            styles.pricePill,
            { backgroundColor: chipBackground, borderColor: cardBorder, marginRight: 4 },
          ]}
        >
          <MaterialCommunityIcons
            name={icon}
            size={14}
            color={Colors.onAccent}
          />
          <Text style={styles.priceText}>{amount}</Text>
        </View>
      );
    });
  };

  return (
    <View
      style={[
        styles.card,
        { borderColor: cardBorder, backgroundColor: cardBackground, borderWidth: 1.5 }, // Increased border width for rarity visibility
        disabled && { opacity: Opacity.disabled },
        containerStyle,
      ]}
      {...rest}
    >
      {/* Rarity Badge (Optional, maybe just border is enough, but let's add a tiny indicator if needed) */}
      
      <View style={styles.header}>
        <View style={[styles.emojiBubble, { borderColor: accentColor }]}>
          <Text style={styles.emojiText}>{emoji}</Text>
        </View>
        <View style={styles.headerContent}>
          <Text style={styles.title}>{title}</Text>
          {headline ? <Text style={styles.headline}>{headline}</Text> : null}
        </View>
        
        {/* Cost Row */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-end', maxWidth: 100 }}>
            {renderCost()}
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
            {/* We can show the total cost summary or just the label passed */}
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
