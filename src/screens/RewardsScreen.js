// [MB] Módulo: Home / Sección: RewardsScreen
// Afecta: flujo de Recompensas
// Propósito: Pantalla mock de ejemplos de recompensas
// Puntos de edición futura: convertir en UI interactiva y dinámica
// Autor: Codex - Fecha: 2025-08-30

import React from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Colors,
  Spacing,
  Radii,
  Typography,
  Elevation,
  Opacity,
} from "../theme";

export default function RewardsScreen() {
  const Card = ({ title, reward }) => (
    <View
      style={styles.card}
      pointerEvents="none"
      accessibilityRole="text"
      accessibilityLabel={`Ejemplo (no interactivo): ${title} — ${reward}`}
    >
      <Text style={styles.cardTitle}>{title}</Text>
      <View style={styles.rewardChip}>
        <Text style={styles.rewardChipText}>{reward}</Text>
      </View>
      <Text style={styles.exampleTag}>Ejemplo</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Social</Text>
        <Card title="Seguir en Instagram" reward="+10 diamantes" />
        <Card title="Unirte a Discord" reward="+1 buff (24h)" />

        <Text style={styles.sectionTitle}>Compartir/Referidos</Text>
        <Card title="Compartir tu link" reward="+15 maná" />
        <Card title="Invitar a un amigo (1ª misión)" reward="+20 XP" />

        <Text style={styles.sectionTitle}>Progresión</Text>
        <Card title="Completar 5 tareas hoy" reward="+50 XP" />
        <Card title="Racha de 7 días" reward="+100 XP" />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.base,
    gap: Spacing.base,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginTop: Spacing.base,
  },
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    opacity: Opacity.muted || 0.7,
    ...Elevation.raised,
    marginTop: Spacing.small,
  },
  cardTitle: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: Spacing.small,
  },
  rewardChip: {
    alignSelf: "flex-start",
    backgroundColor: Colors.accent,
    borderRadius: Radii.sm,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
  },
  rewardChipText: {
    ...Typography.caption,
    color: Colors.onAccent,
  },
  exampleTag: {
    position: "absolute",
    top: Spacing.small,
    right: Spacing.small,
    ...Typography.caption,
    color: Colors.textMuted,
  },
});

