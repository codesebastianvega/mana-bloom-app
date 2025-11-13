// [MB] Modulo: Planta / Seccion: MetricPill
// Afecta: PlantScreen (pildora individual)
// Proposito: barra estilo chip para metricas de cuidado
// Puntos de edicion futura: vincular con estado real
// Autor: Codex - Fecha: 2025-10-21

import React, { useEffect, useRef } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const ELEMENT_ACCENTS = {
  water: Colors.elementWater,
  light: Colors.secondary,
  nutrients: Colors.elementEarth,
  mood: Colors.primary,
  purity: Colors.secondaryLight,
  temperature: Colors.warning,
  rituals: Colors.accent,
  focus: Colors.info,
};

const ELEMENT_ACCENTS_LIGHT = {
  water: Colors.elementWaterLight,
  light: Colors.secondaryLight,
  nutrients: Colors.elementEarthLight,
  mood: Colors.primaryLight,
  purity: "rgba(255,255,255,0.25)",
  temperature: "rgba(245,166,35,0.35)",
  rituals: "rgba(255,202,40,0.35)",
  focus: "rgba(100,181,246,0.35)",
};

const LOW = 0.35;
const HIGH = 0.8;

export default function MetricPill({ icon, label, value, accentKey }) {
  const trackAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (value === undefined) {
      trackAnim.setValue(0);
      return;
    }
    Animated.timing(trackAnim, {
      toValue: value,
      duration: 420,
      useNativeDriver: false,
    }).start();
  }, [value, trackAnim]);

  const accent = ELEMENT_ACCENTS[accentKey] || Colors.primary;
  const accentLight = ELEMENT_ACCENTS_LIGHT[accentKey] || Colors.secondaryLight;
  const state = getState(value);
  const fillColor = state === "low" ? accentLight : accent;

  const width = trackAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });
  const percent = value !== undefined ? Math.round(value * 100) : undefined;

  return (
    <View style={styles.tile}>
      <View style={styles.headerRow}>
        <View style={styles.labelRow}>
          <View style={[styles.iconWrap, { backgroundColor: accent }]}>{icon}</View>
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={styles.valueText}>
          {percent !== undefined ? `${percent}%` : "Sin datos"}
        </Text>
      </View>
      <View style={styles.track}>
        <Animated.View
          style={[
            styles.fill,
            {
              width: width.interpolate({ inputRange: [0, 1], outputRange: [0, "100%"] }),
              backgroundColor: fillColor,
            },
          ]}
        />
      </View>
      <Text style={styles.stateText}>{getLabel(state)}</Text>
    </View>
  );
}

function getState(v) {
  if (v === undefined) return "none";
  if (v < LOW) return "low";
  if (v > HIGH) return "high";
  return "ok";
}

function getLabel(state) {
  switch (state) {
    case "low":
      return "Bajo";
    case "high":
      return "Alto";
    case "ok":
      return "En orden";
    default:
      return "Sin datos";
  }
}

const styles = StyleSheet.create({
  tile: {
    backgroundColor: "rgba(31, 23, 52, 0.65)",
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: "rgba(156, 136, 255, 0.25)",
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    gap: Spacing.tiny,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  valueText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  track: {
    height: 6,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: Radii.pill,
  },
  stateText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});
