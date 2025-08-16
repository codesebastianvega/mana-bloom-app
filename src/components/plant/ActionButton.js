// [MB] Módulo: Planta / Sección: Acciones rápidas
// Afecta: PlantScreen (botones pill reutilizables)
// Propósito: botón con acento, animación y tooltip accesible
// Puntos de edición futura: estilos .styles.js o lógica de economía
// Autor: Codex - Fecha: 2025-08-16

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Typography,
  Elevation,
  Opacity,
} from "../../theme";

// [MB] Mapa de acentos desde tokens
const ElementAccents = {
  water: Colors.elementWater,
  nutrients: Colors.elementEarth,
  clean: Colors.primary,
  spirit: Colors.secondaryFantasy,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ActionButton({
  title,
  icon,
  accentKey,
  costLabel,
  tooltip,
  disabled,
  cooldownMs = 0,
  onPress,
  accessibilityHint,
}) {
  const accent = ElementAccents[accentKey] || Colors.primaryFantasy;

  const scale = useRef(new Animated.Value(1)).current;
  const haloOpacity = useRef(new Animated.Value(0)).current;
  const tooltipOpacity = useRef(new Animated.Value(0)).current;

  const [remaining, setRemaining] = useState(cooldownMs);
  const [tooltipWidth, setTooltipWidth] = useState(0);
  const cooldownDisabled = remaining > 0;

  // [MB] Contador simple mm:ss
  useEffect(() => {
    setRemaining(cooldownMs);
  }, [cooldownMs]);

  useEffect(() => {
    if (remaining <= 0) return;
    const id = setInterval(() => {
      setRemaining((r) => (r - 1000 < 0 ? 0 : r - 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [remaining]);

  const formatted = formatMs(remaining);

  // [MB] Feedback de escala
  const animateScale = useCallback((to) => {
    Animated.spring(scale, {
      toValue: to,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  }, [scale]);

  const handlePress = useCallback(() => {
    if (disabled || cooldownDisabled) return;
    Animated.sequence([
      Animated.timing(haloOpacity, {
        toValue: 0.4,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(haloOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    onPress && onPress();
  }, [disabled, cooldownDisabled, haloOpacity, onPress]);

  const showTooltip = useCallback(() => {
    if (!tooltip && !costLabel) return;
    Animated.timing(tooltipOpacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
    hideAfter.current && clearTimeout(hideAfter.current);
    hideAfter.current = setTimeout(() => hideTooltip(), 1200);
  }, [tooltip, costLabel, tooltipOpacity]);

  const hideAfter = useRef();

  const hideTooltip = useCallback(() => {
    Animated.timing(tooltipOpacity, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start();
  }, [tooltipOpacity]);

  const tooltipText = [
    costLabel ? `Costo: ${costLabel}` : null,
    tooltip || null,
  ]
    .filter(Boolean)
    .join(" • ");

  const accessibilityLabel = `${title} planta`;
  const hint = [
    accessibilityHint,
    cooldownDisabled && formatted ? `Disponible en ${formatted}` : null,
  ]
    .filter(Boolean)
    .join(". ");

  return (
    <View style={styles.wrapper}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.halo,
          { backgroundColor: accent, opacity: haloOpacity },
        ]}
      />
      <AnimatedPressable
        accessibilityRole="button"
        accessibilityLabel={accessibilityLabel}
        accessibilityHint={hint}
        hitSlop={{ top: Spacing.small, bottom: Spacing.small, left: Spacing.small, right: Spacing.small }}
        disabled={disabled || cooldownDisabled}
        onPressIn={() => animateScale(0.96)}
        onPressOut={() => animateScale(1)}
        onPress={handlePress}
        onLongPress={showTooltip}
        style={[
          styles.button,
          { backgroundColor: accent, transform: [{ scale }] },
          (disabled || cooldownDisabled) && { opacity: Opacity.disabled },
        ]}
      >
        {icon && <View style={styles.icon}>{icon}</View>}
        <View style={styles.texts}>
          <View style={styles.titleRow}>
            <Text style={styles.title}>{title}</Text>
            {cooldownDisabled && (
              <Text style={styles.cooldown}>{formatted}</Text>
            )}
          </View>
          {costLabel && <Text style={styles.cost}>{costLabel}</Text>}
        </View>
      </AnimatedPressable>
      {(tooltipText.length > 0) && (
        <Animated.View
          accessible
          accessibilityLiveRegion="polite"
          accessibilityLabel={tooltipText}
          onLayout={(e) => setTooltipWidth(e.nativeEvent.layout.width)}
          style={[
            styles.tooltip,
            {
              opacity: tooltipOpacity,
              transform: [
                { translateX: -tooltipWidth / 2 },
              ],
            },
          ]}
        >
          <Text style={styles.tooltipText}>{tooltipText}</Text>
        </Animated.View>
      )}
    </View>
  );
}

function formatMs(ms) {
  const total = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  halo: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Radii.pill,
  },
  button: {
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
  texts: {
    flexDirection: "column",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    ...Typography.body,
    color: Colors.textInverse,
  },
  cooldown: {
    ...Typography.caption,
    color: Colors.textInverse,
    marginLeft: Spacing.small,
  },
  cost: {
    ...Typography.caption,
    color: Colors.textInverse,
    opacity: Opacity.muted,
  },
  tooltip: {
    position: "absolute",
    bottom: "100%",
    left: "50%",
    marginBottom: Spacing.small,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.md,
    ...Elevation.raised,
  },
  tooltipText: {
    ...Typography.caption,
    color: Colors.text,
  },
});

