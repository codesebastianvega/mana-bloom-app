// [MB] Módulo: Planta / Sección: Header compacto
// Afecta: PlantScreen (cabecera con salud)
// Propósito: chip de salud derivada de agua/luz/nutrientes
// Puntos de edición futura: estados de color o layout
// Autor: Codex - Fecha: 2025-08-17

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Typography,
  Elevation,
  Opacity,
} from "../../theme";

const ElementAccents = {
  health: Colors.success,
};

const LOW = 0.35;
const HIGH = 0.8;

export default function HealthChip({ value }) {
  const v = clamp01(value);
  const pct = Math.round(v * 100);
  const state = getState(v);
  const chipOpacity = state === "LOW" ? 0.6 : state === "OK" ? 0.85 : 1;
  const accent = ElementAccents.health;

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={`Salud ${pct} %, estado ${state}`}
      style={[styles.chip, { borderColor: accent, opacity: chipOpacity }]}
    >
      <Text style={styles.icon}>❤️</Text>
      <Text style={styles.label}>Salud</Text>
      <Text style={styles.value}>{pct}%</Text>
    </View>
  );
}

function clamp01(n) {
  return Math.max(0, Math.min(1, n ?? 0));
}

function getState(v) {
  if (v < LOW) return "LOW";
  if (v <= HIGH) return "OK";
  return "HIGH";
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    ...Elevation.raised,
  },
  icon: {
    marginRight: Spacing.tiny,
  },
  label: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginRight: Spacing.tiny,
  },
  value: {
    ...Typography.caption,
    fontWeight: "700",
    color: Colors.text,
  },
});

