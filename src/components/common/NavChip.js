// [MB] Modulo: Common / Componente: NavChip
// Afecta: Home/Profile (atajos)
// Proposito: Boton compacto reutilizable para navegar a otra seccion
// Puntos de edicion futura: soportar iconos custom
// Autor: Codex - Fecha: 2025-11-25

import React from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default function NavChip({ icon, label, onPress, accent }) {
  const color = accent || Colors.accent;
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.chip,
        { borderColor: color },
        pressed && styles.chipPressed,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View style={[styles.iconWrap, { backgroundColor: `${color}22` }]}
      >
        <MaterialCommunityIcons name={icon} size={18} color={color} />
      </View>
      <Text style={[styles.label, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    borderRadius: Radii.pill,
    borderWidth: 1,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
  },
  chipPressed: {
    opacity: 0.85,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    ...Typography.button,
  },
});
