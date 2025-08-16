// [MB] Módulo: Planta / Sección: Progreso de crecimiento
// Afecta: PlantScreen (barra y log)
// Propósito: mostrar etapa actual, progreso animado y últimos hitos
// Puntos de edición futura: extraer colores de stage y consolidar estilos
// Autor: Codex - Fecha: 2025-08-16

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import GrowthMilestoneItem from "./GrowthMilestoneItem";
import Divider from "../ui/Divider";
import { Colors, Spacing, Radii, Typography, Opacity } from "../../theme";

// [MB] Acentos para crecimiento
const ElementAccents = {
  growth: Colors.primaryFantasy,
};

function getStageVisual(stage) {
  // [MB] Mapa sencillo de etapa a emoji
  const map = {
    semilla: { emoji: "🌰", accentKey: "growth" },
    brote: { emoji: "🌱", accentKey: "growth" },
    planta: { emoji: "🌿", accentKey: "growth" },
  };
  return map[stage] || { emoji: "🌱", accentKey: "growth" };
}

export default function GrowthProgress({
  stage,
  progress,
  milestones = [],
  limitLog = 5,
  style,
}) {
  const { emoji, accentKey } = getStageVisual(stage);
  const accent = ElementAccents[accentKey || "growth"] || Colors.primary;

  const percent = Math.round(progress * 100);

  // [MB] Animación de fill de la barra
  const anim = useRef(new Animated.Value(0)).current;
  const [trackWidth, setTrackWidth] = useState(0);
  useEffect(() => {
    Animated.timing(anim, {
      toValue: progress,
      duration: 400,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false,
    }).start();
  }, [progress, anim]);
  const barWidth = anim.interpolate({ inputRange: [0, 1], outputRange: [0, trackWidth] });

  // [MB] Halo y escala al cambiar de etapa
  const prevStage = useRef(stage);
  const badgeScale = useRef(new Animated.Value(1)).current;
  const haloOpacity = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (prevStage.current !== stage) {
      prevStage.current = stage;
      Animated.parallel([
        Animated.sequence([
          Animated.timing(badgeScale, {
            toValue: 1.04,
            duration: 125,
            useNativeDriver: true,
          }),
          Animated.timing(badgeScale, {
            toValue: 1,
            duration: 125,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(haloOpacity, {
            toValue: 0.25,
            duration: 125,
            useNativeDriver: true,
          }),
          Animated.timing(haloOpacity, {
            toValue: 0,
            duration: 125,
            useNativeDriver: true,
          }),
        ]),
      ]).start();
    }
  }, [stage, badgeScale, haloOpacity]);

  const accessibleStage = `Etapa: ${stage}, ${percent}% completado`;

  return (
    <View style={[styles.container, style]}>
      {/* [MB] Etapa actual con badge y porcentaje */}
      <View style={styles.header} accessible accessibilityLabel={accessibleStage}>
        <View style={styles.badgeWrapper}>
          <Animated.View
            pointerEvents="none"
            style={[styles.halo, { backgroundColor: accent, opacity: haloOpacity }]}
          />
          <Animated.View style={[styles.badge, { transform: [{ scale: badgeScale }] }]}
            accessible={false}
          >
            <Text style={styles.badgeText}>{emoji}</Text>
          </Animated.View>
        </View>
        <Text style={styles.stageLabel}>{stage}</Text>
        <Text style={styles.percent}>{percent}%</Text>
      </View>
      <View
        style={styles.barTrack}
        accessibilityRole="progressbar"
        accessibilityLabel="Progreso hacia la siguiente etapa"
        accessibilityValue={{ min: 0, max: 100, now: percent }}
        onLayout={(e) => setTrackWidth(e.nativeEvent.layout.width)}
      >
        <Animated.View style={[styles.barFill, { backgroundColor: accent, width: barWidth }]} />
      </View>
      {milestones.length > 0 && <Divider style={styles.divider} />}
      <View style={styles.milestones}>
        {milestones.length === 0 ? (
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🕰️</Text>
            <Text style={styles.emptyText}>Sin eventos recientes</Text>
          </View>
        ) : (
          milestones
            .slice(0, limitLog)
            .map((m) => <GrowthMilestoneItem key={m.id} {...m} />)
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "stretch",
    gap: Spacing.base,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  badgeWrapper: {
    width: Spacing.xlarge,
    height: Spacing.xlarge,
    marginRight: Spacing.small,
  },
  badge: {
    width: "100%",
    height: "100%",
    borderRadius: Radii.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  halo: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: Radii.pill,
  },
  badgeText: {
    fontSize: Spacing.xlarge * 0.75,
  },
  stageLabel: {
    ...Typography.title,
    color: Colors.text,
    flex: 1,
    textAlign: "center",
  },
  percent: {
    ...Typography.title,
    color: Colors.text,
  },
  barTrack: {
    // [MB] Track con surfaceAlt (no existe surfaceVariant)
    height: Spacing.small + Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: Colors.surfaceAlt,
    overflow: "hidden",
  },
  barFill: {
    height: "100%",
    borderRadius: Radii.pill,
  },
  divider: {
    marginTop: Spacing.base,
  },
  milestones: {
    marginTop: Spacing.base,
  },
  empty: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.base,
  },
  emptyIcon: {
    fontSize: Spacing.large,
    opacity: Opacity.muted,
    marginBottom: Spacing.small,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.text,
    opacity: Opacity.muted,
  },
});

