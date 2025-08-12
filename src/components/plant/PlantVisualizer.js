// [MB] Módulo: Planta / Sección: Visualizador
// Afecta: PlantScreen
// Propósito: muestra emoji de planta con halo y macetero
// Puntos de edición futura: animaciones y niveles extra
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Radii, Elevation, Gradients } from "../../theme";

function getEmoji(level) {
  if (level < 3) return "🌱";
  if (level < 5) return "🌿";
  return "🌳";
}

export default function PlantVisualizer({ level = 1 }) {
  const emoji = getEmoji(level);
  return (
    <View style={styles.container}>
      <LinearGradient colors={Gradients.mana} style={styles.halo} />
      <Text style={styles.emoji}>{emoji}</Text>
      <View style={styles.pot} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "flex-end",
    height: 200,
  },
  halo: {
    position: "absolute",
    top: 0,
    width: 160,
    height: 160,
    borderRadius: 80,
    opacity: 0.5,
  },
  emoji: {
    fontSize: 112,
    marginBottom: 16,
  },
  pot: {
    width: 120,
    height: 100,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.lg,
    ...Elevation.card,
  },
});

