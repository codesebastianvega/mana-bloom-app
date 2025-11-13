// [MB] Módulo: Economía / Sección: Cápsula de recurso individual
// Afecta: PlantScreen (encabezado económico)
// Propósito: chip de recurso con animaciones y tooltip de saldo insuficiente
// Puntos de edición futura: extraer estilos a .styles.js o añadir persistencia real
// Autor: Codex - Fecha: 2025-08-16

import React, { useEffect, useRef, useState } from "react";
import { Animated, Text, View, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Typography,
  Elevation,
  Opacity,
} from "../../theme";

const withAlpha = (hex = "", alpha = 1) => {
  if (!hex) return hex;
  const cleaned = `${hex}`.replace("#", "").trim();
  if (cleaned.length !== 6) {
    return hex;
  }
  const value = parseInt(cleaned, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const ElementAccents = {
  mana: Colors.primaryFantasy,
  coins: Colors.warning || Colors.primary,
  gems: Colors.info || Colors.secondary,
};

const Icons = {
  mana: "\u{1F52E}",
  coins: "\u{1FA99}",
  gems: "\u{1F48E}",
};

const Labels = {
  mana: "Mana",
  coins: "Monedas",
  gems: "Gemas",
};

export default function ResourceChip({
  type,
  value,
  accentKey,
  txnId,
  delta,
  showInsufficientHint,
  onHintHidden,
}) {
  const accent = ElementAccents[accentKey || type] || Colors.primary;
  const icon = Icons[type];
  const label = Labels[type];

  const scale = useRef(new Animated.Value(1)).current;
  const deltaOpacity = useRef(new Animated.Value(0)).current;
  const deltaY = useRef(new Animated.Value(0)).current;
  const shake = useRef(new Animated.Value(0)).current;
  const hintOpacity = useRef(new Animated.Value(0)).current;
  const valueOpacity = useRef(new Animated.Value(1)).current;
  const [displayValue, setDisplayValue] = useState(value);

  // [MB] Pulso y delta en transacción
  useEffect(() => {
    if (!txnId) return;
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.03,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 90,
        useNativeDriver: true,
      }),
    ]).start();
    if (typeof delta === "number" && delta !== 0) {
      deltaOpacity.setValue(1);
      deltaY.setValue(0);
      Animated.parallel([
        Animated.timing(deltaOpacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(deltaY, {
          toValue: -12,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [txnId, delta, scale, deltaOpacity, deltaY]);

  // [MB] Transición del contador
  useEffect(() => {
    if (value === displayValue) return;
    Animated.timing(valueOpacity, {
      toValue: 0,
      duration: 100,
      useNativeDriver: true,
    }).start(() => {
      setDisplayValue(value);
      Animated.timing(valueOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  }, [value, displayValue, valueOpacity]);

  // [MB] Sacudida y tooltip de saldo insuficiente
  useEffect(() => {
    if (!showInsufficientHint) return;
    Animated.sequence([
      Animated.timing(shake, { toValue: -3, duration: 40, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 3, duration: 40, useNativeDriver: true }),
      Animated.timing(shake, { toValue: -2, duration: 40, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 2, duration: 40, useNativeDriver: true }),
      Animated.timing(shake, { toValue: 0, duration: 40, useNativeDriver: true }),
    ]).start();
    Animated.timing(hintOpacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
    const id = setTimeout(() => {
      Animated.timing(hintOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start(() => {
        onHintHidden && onHintHidden();
      });
    }, 1200);
    return () => clearTimeout(id);
  }, [showInsufficientHint, shake, hintOpacity, onHintHidden]);

  return (
    <View style={styles.wrapper}>
      <Animated.View
        accessible
        accessibilityRole="text"
        accessibilityLabel={`${label}, ${displayValue}`}
        style={[
          styles.chip,
          {
            backgroundColor: withAlpha(accent, 0.22),
            borderColor: withAlpha(accent, 0.55),
            shadowColor: withAlpha(accent, 0.35),
            transform: [{ scale }, { translateX: shake }],
          },
        ]}
      >
        <Text style={styles.icon}>{icon}</Text>
        <Text style={styles.label}>{label}</Text>
        <Animated.Text style={[styles.value, { opacity: valueOpacity }]}>
          {displayValue}
        </Animated.Text>
        {typeof delta === "number" && (
          <Animated.Text
            style={[
              styles.delta,
              {
                opacity: deltaOpacity,
                transform: [{ translateY: deltaY }],
              },
            ]}
          >
            {delta > 0 ? `+${delta}` : `${delta}`}
          </Animated.Text>
        )}
      </Animated.View>
      <Animated.View
        pointerEvents="none"
        accessible
        accessibilityLiveRegion="polite"
        accessibilityLabel="Saldo insuficiente"
        style={[styles.hint, { opacity: hintOpacity }]}
      >
        <Text style={styles.hintText}>Saldo insuficiente</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    ...Elevation.raised,
    borderWidth: 1,
    borderColor: "transparent",
    shadowColor: "transparent",
  },
  icon: {
    marginRight: Spacing.small,
    fontSize: Typography.title.fontSize,
    color: Colors.text,
  },
  label: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
    letterSpacing: 0.3,
    textTransform: "uppercase",
    marginRight: Spacing.small,
  },
  value: {
    ...Typography.body,
    fontWeight: "700",
    color: Colors.text,
  },
  delta: {
    position: "absolute",
    top: -Spacing.small,
    left: 0,
    right: 0,
    textAlign: "center",
    ...Typography.caption,
    color: Colors.text,
  },
  hint: {
    position: "absolute",
    bottom: "100%",
    alignSelf: "center",
    marginBottom: Spacing.small,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.md,
    ...Elevation.raised,
    borderWidth: 1,
    borderColor: "transparent",
    shadowColor: "transparent",
  },
  hintText: {
    ...Typography.caption,
    color: Colors.text,
  },
});










