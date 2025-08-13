// [MB] Módulo: Home / Sección: Tienda Mágica (Pestañas)
// Afecta: HomeScreen (layout principal)
// Propósito: Card de item reutilizable para la tienda mágica
// Puntos de edición futura: integrar lógica de compra y selección
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { Pressable, View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ShopItemCard.styles";
import { Colors, Opacity } from "../../theme";

export default function ShopItemCard({
  title,
  description,
  price,
  iconName,
  accent,
  selected,
  disabled,
  onPress,
  ...rest
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.card,
        { borderColor: accent.border },
        selected && {
          borderColor: accent.pill,
          shadowColor: accent.pill,
          shadowOpacity: 0.6,
          shadowRadius: 6,
        },
        disabled && { opacity: Opacity.disabled },
        pressed && { transform: [{ scale: 0.98 }] },
      ]}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      {...rest}
    >
      <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={[styles.pill, { backgroundColor: accent.pill }]}>
        <Ionicons name={iconName} size={16} color={Colors.textInverse} />
        <Text style={styles.pillText}>{price}</Text>
      </View>
    </Pressable>
  );
}
