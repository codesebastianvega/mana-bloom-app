// [MB] Módulo: Shop / Componente: ShopGridItem
// Afecta: ShopScreen
// Propósito: Card de producto en grid 2×N para la tienda
// Puntos de edición futura: integrar imágenes reales y estados
// Autor: Codex - Fecha: 2025-08-24

import React, { useState } from "react";
import { Pressable, Text, View } from "react-native";
import styles from "./ShopGridItem.styles";
import { Opacity } from "../../theme";

function currencySymbol(currency) {
  switch (currency) {
    case "mana":
      return "✨";
    case "coin":
      return "🪙";
    default:
      return "💎";
  }
}

function ShopGridItem({
  sku,
  emoji,
  title,
  desc,
  price,
  currency,
  accent,
  disabled,
  onPress,
  accessibilityLabel,
}) {
  const [pressed, setPressed] = useState(false);
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}
      style={[
        styles.card,
        { borderColor: accent.border, transform: [{ scale: pressed ? 0.98 : 1 }] },
        disabled && { opacity: Opacity.disabled },
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessibilityLabel={accessibilityLabel}
    >
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.desc}>{desc}</Text>
      <View style={[styles.pricePill, { backgroundColor: accent.pill }]}>
        <Text style={styles.priceText}>
          {currencySymbol(currency)}{price}
        </Text>
      </View>
    </Pressable>
  );
}

export default React.memo(ShopGridItem);
