// [MB] Módulo: Planta / Sección: Header compacto
// Afecta: PlantScreen (cabecera con ánimo)
// Propósito: chip de ánimo opcional
// Puntos de edición futura: estados de color o layout
// Autor: Codex - Fecha: 2025-08-16

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
  spirit: Colors.secondaryFantasy,
};

const LOW = 0.35;
const HIGH = 0.8;

export default function MoodChip({ value }) {
  const hasValue = typeof value === "number";
  const v = clamp01(value);
  const pct = hasValue ? Math.round(v * 100) : null;
  const state = hasValue ? getState(v) : null;
  const chipOpacity = !hasValue
    ? Opacity.muted
    : state === "LOW"
    ? 0.6
    : state === "OK"
    ? 0.85
    : 1;

  return (
    <View
      accessibilityRole="text"
      accessibilityLabel={
        hasValue ? `Ánimo ${pct} %, estado ${state}` : "Ánimo sin datos"
      }
      style={[styles.chip, { backgroundColor: ElementAccents.spirit, opacity: chipOpacity }]}
    >
      <Text style={styles.icon}>🧘</Text>
      <Text style={styles.label}>Ánimo</Text>
      <Text style={styles.value}>{hasValue ? `${pct}%` : "—"}</Text>
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
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    ...Elevation.raised,
  },
  icon: {
    marginRight: Spacing.small,
  },
  label: {
    ...Typography.caption,
    color: Colors.textInverse,
    opacity: Opacity.muted,
    marginRight: Spacing.small,
  },
  value: {
    ...Typography.body,
    fontWeight: "700",
    color: Colors.textInverse,
  },
});

