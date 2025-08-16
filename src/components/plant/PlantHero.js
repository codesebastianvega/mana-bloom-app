// [MB] Módulo: Planta / Sección: Hero animado
// Afecta: PlantScreen (demo inicial)
// Propósito: muestra la planta con aura, glow y animación de respirar
// Puntos de edición futura: estilos y tamaños adaptables
// Autor: Codex - Fecha: 2025-08-15

import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, Easing, StyleSheet } from "react-native";
import { Colors, Spacing, Elevation } from "../../theme";

// [MB] Mapa de tamaños derivado de Spacing
const SIZE_MAP = {
  md: Spacing.xlarge * 4,
  lg: Spacing.xlarge * 5,
};

export default function PlantHero({
  source,
  size = "lg",
  health,
  mood,
  stage,
  style,
}) {
  const anim = useRef(new Animated.Value(0)).current;

  // [MB] Loop de animación "respirar"
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 1750,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 1750,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim]);

  const baseSize = SIZE_MAP[size] || SIZE_MAP.lg;
  const scale = anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.03] });
  const auraOpacity = anim.interpolate({ inputRange: [0, 1], outputRange: [0.12, 0.22] });
  const auraSizeOuter = baseSize * 1.6;
  const auraSizeInner = baseSize * 1.3;

  const label = `Planta ${stage}; salud ${Math.round(health * 100)}%; ánimo ${mood}`;

  return (
    <View style={[styles.container, style]}>
      {/* [MB] Aura exterior */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.aura,
          {
            width: auraSizeOuter,
            height: auraSizeOuter,
            borderRadius: auraSizeOuter / 2,
            backgroundColor: Colors.primaryFantasy,
            opacity: auraOpacity,
            transform: [{ scale }],
          },
        ]}
      />
      {/* [MB] Aura interior */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.aura,
          {
            width: auraSizeInner,
            height: auraSizeInner,
            borderRadius: auraSizeInner / 2,
            backgroundColor: Colors.secondaryFantasy,
            opacity: auraOpacity,
            transform: [{ scale }],
          },
        ]}
      />
      {/* [MB] Círculo principal con glow */}
      <Animated.View
        accessibilityRole="image"
        accessibilityLabel={label}
        style={[
          styles.hero,
          {
            width: baseSize,
            height: baseSize,
            borderRadius: baseSize / 2,
            transform: [{ scale }],
          },
        ]}
      >
        {source ? (
          <Image
            source={source}
            style={{ width: "100%", height: "100%", borderRadius: baseSize / 2 }}
            resizeMode="contain"
          />
        ) : (
          <Text style={{ fontSize: baseSize * 0.6 }}>🌱</Text>
        )}
        <View
          pointerEvents="none"
          style={[
            StyleSheet.absoluteFillObject,
            {
              borderRadius: baseSize / 2,
              backgroundColor: Colors.primaryFantasy,
              opacity: 0.08,
            },
          ]}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.large,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Spacing.large,
    ...Elevation.card,
  },
  aura: {
    position: "absolute",
  },
  hero: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    shadowColor: Colors.primaryFantasy,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: Spacing.small,
  },
});

