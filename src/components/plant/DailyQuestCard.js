// [MB] Módulo: Planta / Sección: Daily Quest Card
// Afecta: PlantScreen (bloque de misiones diarias)
// Propósito: Mostrar conteo de desafíos diarios y acceso rápido
// Puntos de edición futura: permitir reclamar desde aquí y listar progreso
// Autor: Codex - Fecha: 2025-10-21

import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Elevation } from "../../theme";

export default function DailyQuestCard({ total = 0, completed = 0, onPress }) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.title}>Misiones diarias</Text>
        <Text style={styles.progress}>{completed}/{total}</Text>
      </View>
      <Text style={styles.caption}>Completa retos para ganar XP y maná</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Abrir misiones diarias" style={styles.cta} onPress={onPress}>
        <Text style={styles.ctaText}>Ver desafíos</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Elevation.card,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.small,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
  },
  progress: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  caption: {
    ...Typography.body,
    color: Colors.textMuted,
    marginBottom: Spacing.base,
  },
  cta: {
    alignSelf: "flex-start",
    backgroundColor: Colors.accent,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
  },
  ctaText: {
    ...Typography.body,
    color: Colors.onAccent,
    fontWeight: "700",
  },
});

