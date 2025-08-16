// [MB] Módulo: Planta / Sección: Buffs activos
// Afecta: PlantScreen (chips de buff individual)
// Propósito: chip compacto con icono, multiplicador y contador que expira
// Puntos de edición futura: estilos .styles.js o lógica real de buffs
// Autor: Codex - Fecha: 2025-08-18

import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Text, View, StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Typography,
  Elevation,
} from "../../theme";

// [MB] Mapa de acentos desde tokens; fallback a primario/fantasía
const ElementAccents = {
  xp: Colors.primaryFantasy,
  mana: Colors.secondaryFantasy,
  shield: Colors.elementEarth,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function formatTime(ms) {
  if (ms <= 0) return "00:00";
  const total = Math.floor(ms / 1000);
  const m = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function BuffChip({
  id,
  title,
  icon,
  multiplier,
  timeRemainingMs,
  accentKey,
  stack,
  onPress,
  onExpire,
}) {
  const fade = useRef(new Animated.Value(1)).current;
  const pulse = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const expired = useRef(false);

  const accent = ElementAccents[accentKey] || Colors.primary;
  const haloOpacity = pulse.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.25],
  });

  // [MB] Pulso suave cuando quedan <60s
  useEffect(() => {
    if (timeRemainingMs > 0 && timeRemainingMs < 60000) {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ])
      );
      loop.start();
      return () => loop.stop();
    }
  }, [timeRemainingMs, pulse]);

  // [MB] Fade out al expirar y notifica a la barra
  useEffect(() => {
    if (timeRemainingMs <= 0 && !expired.current) {
      expired.current = true;
      Animated.timing(fade, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }).start(() => {
        onExpire && onExpire(id);
      });
    }
  }, [timeRemainingMs, fade, onExpire, id]);

  const animateScale = (to) => {
    Animated.spring(scale, {
      toValue: to,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  const formatted = formatTime(timeRemainingMs);
  const accessibilityLabel = `Buff ${title}, multiplicador x${
    multiplier ?? 1
  }, ${formatted} restantes${stack && stack > 1 ? `, apilado ×${stack}` : ""}`;

  const Container = onPress ? AnimatedPressable : Animated.View;

  return (
    <Animated.View style={{ opacity: fade }}>
      <Animated.View
        pointerEvents="none"
        style={[styles.halo, { backgroundColor: accent, opacity: haloOpacity }]}
      />
      <Container
        accessibilityRole={onPress ? "button" : "text"}
        accessibilityHint={onPress ? "Muestra detalles del buff" : undefined}
        accessibilityLiveRegion={timeRemainingMs < 60000 ? "polite" : undefined}
        accessibilityLabel={accessibilityLabel}
        hitSlop={
          onPress
            ? {
                top: Spacing.base,
                bottom: Spacing.base,
                left: Spacing.base,
                right: Spacing.base,
              }
            : undefined
        }
        onPressIn={onPress ? () => animateScale(0.96) : undefined}
        onPressOut={onPress ? () => animateScale(1) : undefined}
        onPress={onPress}
        style={[
          styles.chip,
          {
            backgroundColor: accent,
            borderColor: accent,
            transform: [{ scale }],
          },
        ]}
      >
        {icon ? (
          typeof icon === "string" ? (
            <Text style={styles.icon}>{icon}</Text>
          ) : (
            <View style={styles.icon}>{icon}</View>
          )
        ) : null}
        <View style={styles.center}>
          <Text style={styles.title}>
            {title}
            {stack && stack > 1 ? ` ×${stack}` : ""}
          </Text>
          {typeof multiplier === "number" && (
            <Text style={styles.mult}>x{multiplier.toFixed(1)}</Text>
          )}
        </View>
        <Text style={styles.timer}>{formatted}</Text>
      </Container>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    borderRadius: Radii.pill,
    borderWidth: 1,
    ...Elevation.raised,
    gap: Spacing.small,
  },
  icon: {
    fontSize: Typography.body.fontSize,
    color: Colors.textInverse,
  },
  center: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    flexShrink: 1,
  },
  title: {
    ...Typography.body,
    color: Colors.textInverse,
  },
  mult: {
    ...Typography.caption,
    color: Colors.textInverse,
  },
  timer: {
    ...Typography.caption,
    color: Colors.textInverse,
  },
  halo: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    borderRadius: Radii.pill,
  },
});

