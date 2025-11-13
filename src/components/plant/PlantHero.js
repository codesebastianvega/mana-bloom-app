// [MB] Módulo: Planta / Sección: Hero animado
// Afecta: PlantScreen (demo inicial)
// Propósito: muestra la planta con aura, glow y animación de respirar
// Puntos de edición futura: estilos, tamaños y assets de maceta
// Autor: Codex - Fecha: 2025-08-16

import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, Easing, StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme";

// [MB] Mapa de tamaños derivado de Spacing
const SIZE_MAP = {
  md: Spacing.xlarge * 4,
  lg: Spacing.xlarge * 5,
  xl: Spacing.xlarge * 6,
  hero: Spacing.xlarge * 7,
};

export default function PlantHero({
  source,
  size = "lg",
  auraIntensity = "none",
  health,
  mood,
  stage,
  skinAccent,
  style,
}) {
  const anim = useRef(new Animated.Value(0)).current;

  // [MB] Loop de animación "respirar"
  useEffect(() => {
    if (auraIntensity === "none") return;
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
  }, [anim, auraIntensity]);

  const baseSize = SIZE_MAP[size] || SIZE_MAP.hero || SIZE_MAP.lg;
  const scale = auraIntensity === "none" ? 1 : anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.03] });
  const auraOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: auraIntensity === "subtle" ? [0.08, 0.16] : [0.12, 0.22],
  });
  const auraSizeOuter = baseSize * (auraIntensity === "subtle" ? 1.4 : 1.6);
  const auraSizeInner = baseSize * 1.3;

  const label = `Planta ${stage}; salud ${Math.round(health * 100)}%; ánimo ${mood}`;

  return (
    <View style={[styles.container, style]}>
      {auraIntensity === "ring" && (
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
      )}
      {auraIntensity === "subtle" && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.aura,
            {
              width: auraSizeOuter,
              height: auraSizeOuter,
              borderRadius: auraSizeOuter / 2,
              backgroundColor: Colors.secondaryFantasy,
              opacity: auraOpacity,
              transform: [{ scale }],
            },
          ]}
        />
      )}
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
            backgroundColor: auraIntensity === "none" ? "transparent" : Colors.surface,
            shadowOpacity: auraIntensity === "none" ? 0 : 0.25,
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
        {skinAccent && auraIntensity !== "none" && (
          <View
            pointerEvents="none"
            style={[
              styles.pot,
              {
                backgroundColor: skinAccent,
                width: baseSize * 0.6,
                height: baseSize * 0.25,
                borderRadius: (baseSize * 0.6) / 2,
                left: (baseSize - baseSize * 0.6) / 2,
                bottom: Spacing.small,
              },
            ]}
          />
        )}
        {auraIntensity !== "none" && (
          <View
            pointerEvents="none"
            style={[
              StyleSheet.absoluteFillObject,
              {
                borderRadius: baseSize / 2,
                backgroundColor: Colors.surface,
                opacity: 0.06,
              },
            ]}
          />
        )}
      </Animated.View>
      {auraIntensity !== "none" && (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            bottom: Spacing.small,
            width: baseSize * 0.7,
            height: 10,
            borderRadius: 5,
            backgroundColor: "rgba(0,0,0,0.35)",
            alignSelf: "center",
            opacity: 0.6,
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginVertical: Spacing.large,
  },
  aura: {
    position: "absolute",
  },
  hero: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  pot: {
    position: "absolute",
  },
});

