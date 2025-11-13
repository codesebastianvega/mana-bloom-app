// [MB] Módulo: Planta / Sección: Progress card
// Afecta: PlantScreen (estado intermedio)
// Propósito: mostrar barra de progreso, etapas y próxima acción sugerida
// Puntos de edición futura: enlazar con log real y buffs
// Autor: Codex - Fecha: 2025-11-13

import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Spacing, Radii, Typography, Gradients } from "../../theme";

const STAGES = [
  { key: "semilla", label: "Semilla", icon: "egg" },
  { key: "brote", label: "Brote", icon: "seedling" },
  { key: "joven", label: "Joven", icon: "leaf" },
  { key: "madura", label: "Madura", icon: "tree" },
];

export default function PlantProgressCard({
  stage = "brote",
  progress = 0,
  etaText = "faltan ~3 tareas",
  suggestedAction = "Limpiar",
  onPressAction,
}) {
  const percent = Math.max(0, Math.min(100, Math.round(progress * 100)));

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Estado de la planta</Text>
          <Text style={styles.caption}>{etaText}</Text>
        </View>
        <View style={styles.stageChip}>
          <Text style={styles.stageChipLabel}>Etapa</Text>
          <Text style={styles.stageChipValue}>{labelFor(stage)}</Text>
        </View>
      </View>

      <View
        style={styles.xpBar}
        accessibilityRole="progressbar"
        accessibilityValue={{ now: percent, min: 0, max: 100 }}
      >
        <LinearGradient
          colors={Gradients.growth}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.xpFill, { width: `${percent}%` }]}
        />
        <Text style={styles.xpPercent}>{percent}%</Text>
      </View>

      <View style={styles.stagesRow}>
        {STAGES.map((item) => {
          const active = item.key === stage;
          return (
            <View key={item.key} style={styles.stageItem}>
              <FontAwesome5
                name={item.icon}
                size={14}
                color={active ? Colors.success : Colors.textMuted}
                style={styles.stageIcon}
              />
              <Text style={[styles.stageLabel, active && styles.stageLabelActive]}>{item.label}</Text>
            </View>
          );
        })}
      </View>

      <View style={styles.suggestRow}>
        <Text style={styles.suggestLabel}>Sugerido:</Text>
        <Text style={styles.suggestValue}>{suggestedAction}</Text>
        <Pressable onPress={onPressAction} hitSlop={12}>
          <Text style={styles.suggestCta}>Abrir</Text>
        </Pressable>
      </View>
    </View>
  );
}

function labelFor(stage) {
  const found = STAGES.find((s) => s.key === stage);
  return found ? found.label : stage;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radii.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: Colors.surface,
    gap: Spacing.small,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "600",
  },
  caption: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  stageChip: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  stageChipLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 10,
  },
  stageChipValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  xpBar: {
    height: 14,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
    position: "relative",
  },
  xpFill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: Radii.pill,
  },
  xpPercent: {
    position: "absolute",
    right: Spacing.small,
    top: 0,
    lineHeight: 14,
    color: Colors.text,
    fontWeight: "700",
    fontSize: 12,
  },
  stagesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.tiny,
  },
  stageItem: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.tiny / 2,
  },
  stageIcon: {
    opacity: 0.85,
  },
  stageLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  stageLabelActive: {
    color: Colors.success,
    fontWeight: "700",
  },
  suggestRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    marginTop: Spacing.small,
  },
  suggestLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  suggestValue: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  suggestCta: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: "700",
  },
});

