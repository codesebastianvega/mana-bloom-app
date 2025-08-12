// [MB] Módulo: Planta / Sección: Pantalla principal
// Afecta: PlantScreen
// Propósito: mostrar la planta, progreso de XP y buffs activos
// Puntos de edición futura: estilos separados y más estados
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import PlantVisualizer from "../components/plant/PlantVisualizer";
import { useProgress, useXpMultiplier } from "../state/AppContext";
import { Colors, Spacing, Radii, Gradients } from "../theme";

export default function PlantScreen() {
  const { xp, xpGoal, level, progress } = useProgress();
  const { multiplier } = useXpMultiplier();

  return (
    <View style={styles.container}>
      <View style={styles.visualWrapper}>
        <PlantVisualizer level={level} />
        {multiplier > 1 && (
          <View style={styles.buffChip}>
            <Text style={styles.buffText}>XP ×2</Text>
          </View>
        )}
      </View>
      <View style={styles.progressWrapper}>
        <Text style={styles.progressLabel}>{`${xp} / ${xpGoal} XP`}</Text>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={Gradients.xp}
            style={[styles.progressFill, { width: `${progress * 100}%` }]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.background,
  },
  visualWrapper: {
    alignItems: "center",
  },
  buffChip: {
    position: "absolute",
    top: 0,
    right: -Spacing.large,
    backgroundColor: Colors.secondary,
    paddingHorizontal: Spacing.small,
    paddingVertical: 4,
    borderRadius: Radii.pill,
  },
  buffText: {
    color: Colors.textInverse,
    fontWeight: "700",
  },
  progressWrapper: {
    width: "80%",
    marginTop: Spacing.large,
  },
  progressLabel: {
    color: Colors.text,
    textAlign: "center",
    marginBottom: Spacing.small,
  },
  progressBar: {
    height: 12,
    backgroundColor: Colors.surface,
    borderRadius: Radii.md,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: Radii.md,
  },
});

