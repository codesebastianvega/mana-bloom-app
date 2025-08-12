// [MB] Módulo: Tasks / Sección: Encabezado de estadísticas
// Afecta: TasksScreen (encabezado con nivel y recursos)
// Propósito: Mostrar nivel, XP actual y maná desde el contexto
// Puntos de edición futura: estilos y fuentes en StatsHeader
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing } from "../theme";
import { useProgress, useAppState } from "../state/AppContext";

export default function StatsHeader() {
  const { level, xp, xpGoal, progress } = useProgress();
  const { mana } = useAppState();
  const percent = Math.min(Math.max(progress * 100, 0), 100);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Level {level}</Text>
          <Text style={styles.xpText}>
            {xp}/{xpGoal} XP
          </Text>
        </View>
        <Text style={styles.manaText}>Vida: {mana}</Text>
      </View>
      <View style={styles.progressBackground}>
        <LinearGradient
          colors={[Colors.secondary, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressFill, { width: `${percent}%` }]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight / 4 : Spacing.tiny,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginBottom: Spacing.small,
    shadowColor: Colors.background,
    paddingBottom: Spacing.base,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.base,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  levelText: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: "600",
    marginRight: Spacing.small,
  },
  xpText: {
    fontSize: 14,
    color: Colors.text,
  },
  manaText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "600",
  },
  progressBackground: {
    width: "100%",
    height: Spacing.small,
    backgroundColor: Colors.background,
    borderRadius: Spacing.small / 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: Spacing.small / 2,
  },
});
