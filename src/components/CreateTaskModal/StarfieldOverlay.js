// [MB] Modulo: Tasks / Seccion: CreateTaskModal - StarfieldOverlay
// Afecta: CreateTaskModal
// Proposito: Capa animada de estrellas para el fondo del modal
// Puntos de edicion futura: ajustar cantidad de estrellas y velocidad segun tema
// Autor: Codex - Fecha: 2025-10-21

import React, { useMemo } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";

const STAR_COUNT = 64;
const SHOOTING_COUNT = 4;
const STAR_COLORS = [
  "rgba(255,255,255,0.98)",
  "rgba(180,224,255,0.98)",
  "rgba(231,203,255,0.98)",
  "rgba(255,214,165,0.96)",
];

const randomBetween = (min, max) => Math.random() * (max - min) + min;

function useStarConfigs(count) {
  return useMemo(
    () =>
      Array.from({ length: count }).map((_, idx) => ({
        id: `star-${idx}`,
        left: randomBetween(0, 100),
        top: randomBetween(0, 100),
        size: randomBetween(2.8, 5.6),
        delay: randomBetween(0, 1500),
        duration: randomBetween(1600, 3800),
        color: STAR_COLORS[idx % STAR_COLORS.length],
      })),
    [count]
  );
}

function TwinkleStar({ config }) {
  const opacity = React.useRef(new Animated.Value(randomBetween(0.6, 0.95))).current;
  const scale = React.useRef(new Animated.Value(randomBetween(0.9, 1.25))).current;

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(config.delay),
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: randomBetween(0.9, 1),
            duration: config.duration,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: randomBetween(1.15, 1.45),
            duration: config.duration,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: randomBetween(0.35, 0.6),
            duration: config.duration,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: randomBetween(0.8, 0.95),
            duration: config.duration,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [config, opacity, scale]);

  const haloOpacity = opacity.interpolate({ inputRange: [0, 1], outputRange: [0, 0.35] });

  return (
    <View pointerEvents="none" style={[styles.starWrap, { left: `${config.left}%`, top: `${config.top}%` }]}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.starHalo,
          {
            width: config.size * 1.9,
            height: config.size * 1.9,
            borderRadius: (config.size * 1.9) / 2,
            opacity: haloOpacity,
            transform: [{ scale }],
            backgroundColor: config.color,
            shadowColor: config.color,
          },
        ]}
      />
      <Animated.View
        pointerEvents="none"
        style={[
          styles.star,
          {
            width: config.size,
            height: config.size,
            opacity,
            transform: [{ scale }],
            backgroundColor: config.color,
            shadowColor: config.color,
          },
        ]}
      />
    </View>
  );
}

function ShootingStar({ index }) {
  const progress = React.useRef(new Animated.Value(0)).current;
  const startY = randomBetween(10, 60);

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.delay(4000 + index * 2000 + randomBetween(0, 3000)),
        Animated.timing(progress, {
          toValue: 1,
          duration: 1200,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, [index, progress]);

  const translateX = progress.interpolate({ inputRange: [0, 1], outputRange: [-60, 260] });
  const translateY = progress.interpolate({ inputRange: [0, 1], outputRange: [0, 120] });
  const opacity = progress.interpolate({ inputRange: [0, 0.1, 0.8, 1], outputRange: [0, 1, 0.2, 0] });

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.shootingStar,
        { top: `${startY}%`, transform: [{ translateX }, { translateY }, { rotateZ: "-12deg" }], opacity },
      ]}
    />
  );
}

export default function StarfieldOverlay({ style }) {
  const stars = useStarConfigs(STAR_COUNT);
  return (
    <View pointerEvents="none" style={[styles.container, style]}>
      {stars.map((star) => (
        <TwinkleStar key={star.id} config={star} />
      ))}
      {Array.from({ length: SHOOTING_COUNT }).map((_, idx) => (
        <ShootingStar key={`shooting-${idx}`} index={idx} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { ...StyleSheet.absoluteFillObject },
  starWrap: { position: "absolute" },
  starHalo: {
    position: "absolute",
    shadowOpacity: 0.5,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 0 },
  },
  star: {
    position: "absolute",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 999,
    shadowOpacity: 0.9,
    shadowRadius: 26,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  shootingStar: {
    position: "absolute",
    width: 120,
    height: 2,
    borderRadius: 2,
    backgroundColor: "rgba(255,255,255,0.9)",
    shadowColor: "rgba(255,255,255,1)",
    shadowOpacity: 0.7,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
  },
});
