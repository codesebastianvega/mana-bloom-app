// [MB] Modulo: Plant / Seccion: PlantScreen - PlantSectionCard
// Afecta: PlantScreen
// Proposito: Contenedor reutilizable para secciones de la pantalla de planta
// Puntos de edicion futura: mover a ui/ si otras pantallas lo reutilizan
// Autor: Codex - Fecha: 2025-10-21

import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors, Spacing, Radii } from "../../theme";

const withAlpha = (hex = "", alpha = 1) => {
  if (!hex) return hex;
  const cleaned = `${hex}`.replace("#", "").trim();
  if (cleaned.length !== 6 && cleaned.length !== 8) {
    return hex;
  }
  const value = parseInt(cleaned.slice(0, 6), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

export default function PlantSectionCard({ children, style, ...rest }) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.18),
    gap: Spacing.small,
  },
});
