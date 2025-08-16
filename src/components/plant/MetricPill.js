// [MB] Módulo: Planta / Sección: Métricas de cuidado
// Afecta: PlantScreen (píldora individual)
// Propósito: barra animada para una métrica de cuidado
// Puntos de edición futura: ajustes de estado/colores
// Autor: Codex - Fecha: 2025-08-16

import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Typography,
  Opacity,
} from "../../theme";

// [MB] Mapas de acentos desde tokens; sin hardcodes
const ElementAccents = {
  water: Colors.elementWater,
  light: Colors.secondary,
  nutrients: Colors.elementEarth,
  mood: Colors.primary,
};

const ElementAccentsLight = {
  water: Colors.elementWaterLight,
  light: Colors.secondaryLight,
  nutrients: Colors.elementEarthLight,
  mood: Colors.primaryLight,
};

const LOW = 0.35;
const HIGH = 0.8;

export default function MetricPill({ icon, label, value, accentKey }) {
  const [trackWidth, setTrackWidth] = useState(0);
  const anim = useRef(new Animated.Value(0)).current;

  // [MB] Animación de llenado al montar/actualizar
  useEffect(() => {
    if (value === undefined) {
      anim.setValue(0);
      return;
    }
    Animated.timing(anim, {
      toValue: value,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [value, anim]);

  const state = getState(value);
  const accentBase = ElementAccents[accentKey] || Colors.accent;
  const accentLight = ElementAccentsLight[accentKey];
  const fillColor = state === "low" && accentLight ? accentLight : accentBase;
  const fillOpacity = state === "low" ? 0.6 : state === "high" ? 1 : 0.85;

  const width = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, trackWidth],
  });

  const percent = value !== undefined ? Math.round(value * 100) : undefined;
  const stateLabel =
    state === "low"
      ? "bajo"
      : state === "high"
      ? "alto"
      : state === "ok"
      ? "OK"
      : "sin datos";

  return (
    <View
      style={[styles.track, { opacity: value === undefined ? Opacity.disabled : 1 }]}
      onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
      accessibilityRole="progressbar"
      accessibilityLabel={`${label}, ${
        percent !== undefined ? percent + " %" : "sin datos"
      }, estado ${stateLabel}`}
      accessibilityValue={
        value !== undefined ? { min: 0, max: 100, now: percent } : undefined
      }
    >
      {/* [MB] Barra de relleno animada */}
      <Animated.View
        style={[
          styles.fill,
          { width, backgroundColor: fillColor, opacity: fillOpacity },
        ]}
      />
      {/* [MB] Contenido textual/iconográfico */}
      <View style={styles.content}>
        <View style={styles.left}>
          {icon &&
            React.cloneElement(icon, {
              size: icon.props?.size ?? Spacing.base,
            })}
          <Text style={styles.label}>{label}</Text>
        </View>
        <Text style={styles.value}>
          {percent !== undefined ? `${percent}%` : "Sin datos"}
        </Text>
      </View>
    </View>
  );
}

function getState(v) {
  if (v === undefined) return "none";
  if (v < LOW) return "low";
  if (v > HIGH) return "high";
  return "ok";
}

const styles = StyleSheet.create({
  track: {
    position: "relative",
    justifyContent: "center",
    height: Spacing.large + Spacing.small,
    borderRadius: Radii.pill,
    backgroundColor: Colors.surfaceAlt,
    overflow: "hidden",
    paddingHorizontal: Spacing.base,
  },
  fill: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  left: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  label: {
    ...Typography.body,
    color: Colors.text,
  },
  value: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: "right",
  },
});

