// [MB] Módulo: Economía / Sección: Racha de conexión
// Afecta: PlantScreen (encabezado económico)
// Propósito: chip de racha con animación de pulso
// Puntos de edición futura: estilos .styles.js o lógica de progreso
// Autor: Codex - Fecha: 2025-08-16

import React, { useEffect, useRef } from "react";
import { Animated, Text, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Typography,
  Elevation,
  Opacity,
} from "../../theme";

const ElementAccents = {
  streak: Colors.success,
};

export default function StreakChip({ days, accentKey }) {
  const accent = ElementAccents[accentKey || "streak"] || Colors.success;
  const flameOpacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(flameOpacity, {
          toValue: 0.8,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(flameOpacity, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [flameOpacity]);

  return (
    <Animated.View
      accessibilityRole="text"
      accessibilityLabel={`Racha, ${days} días`}
      style={[styles.chip, { backgroundColor: accent }]}
    >
      <Animated.Text style={[styles.icon, { opacity: flameOpacity }]}>🔥</Animated.Text>
      <Text style={styles.label}>Racha</Text>
      <Text style={styles.value}>{days}</Text>
    </Animated.View>
  );
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

