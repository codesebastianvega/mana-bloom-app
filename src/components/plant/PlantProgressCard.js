// [MB] Módulo: Planta / Sección: Progress card
// Afecta: PlantScreen (estado intermedio)
// Propósito: mostrar barra de progreso, etapas y próxima acción sugerida
// Puntos de edición futura: enlazar con log real y buffs
// Autor: Codex - Fecha: 2025-11-13

import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const STAGES = [
  { key: "semilla", label: "Semilla", icon: "egg", preview: "🌱", accent: Colors.elementEarthLight },
  { key: "germen", label: "Germen", icon: "leaf", preview: "🌿", accent: Colors.elementEarth },
  { key: "brote", label: "Brote", icon: "seedling", preview: "🌰", accent: Colors.elementWaterLight },
  { key: "juvenil", label: "Juvenil", icon: "leaf", preview: "🍃", accent: Colors.elementWater },
  { key: "vibrante", label: "Vibrante", icon: "envira", preview: "🌼", accent: Colors.accent },
  { key: "floreciente", label: "Floreciente", icon: "spa", preview: "🌸", accent: Colors.ritualJournal },
  { key: "radiante", label: "Radiante", icon: "sun", preview: "☀️", accent: Colors.ritualSun },
  { key: "madura", label: "Madura", icon: "tree", preview: "🌳", accent: Colors.secondary },
  { key: "sage", label: "Sabia", icon: "feather-alt", preview: "🌙", accent: Colors.ritualCalm },
  { key: "arcana", label: "Arcana", icon: "star", preview: "✨", accent: Colors.primaryFantasy },
];

const LEVELS_PER_STAGE = 10;

export default function PlantProgressCard({
  stage = "brote",
  progress = 0,
  etaText = "faltan ~3 tareas",
  suggestedAction = "Limpiar",
  onPressAction,
  actionCtaLabel = "Activar",
  actionCompleted = false,
  actionCompletedLabel = "Acción activada",
  showStageBadge = false,
}) {
  const percent = Math.max(0, Math.min(100, Math.round(progress * 100)));
  const totalLevels = STAGES.length * LEVELS_PER_STAGE;
  const absoluteLevel = Math.min(totalLevels, Math.max(0, progress) * totalLevels);
  const derivedIndex = Math.floor(absoluteLevel / LEVELS_PER_STAGE);
  const fallbackIndex = Math.max(0, STAGES.findIndex((s) => s.key === stage));
  const stageIndex = Math.min(
    STAGES.length - 1,
    progress > 0 ? derivedIndex : fallbackIndex >= 0 ? fallbackIndex : 0
  );
  const currentStage = STAGES[stageIndex] || STAGES[0];
  const nextStage = STAGES[Math.min(STAGES.length - 1, stageIndex + 1)];
  const levelWithinStage = absoluteLevel - stageIndex * LEVELS_PER_STAGE;
  const subPercent = Math.round((levelWithinStage / LEVELS_PER_STAGE) * 100);
  const sliderRef = useRef(null);
  const motivationText = "Sigue cuidando la planta para desbloquear la próxima etapa";

  useEffect(() => {
    if (!sliderRef.current) return;
    const slideWidth = 168 + Spacing.small;
    const offset = Math.max(0, stageIndex * slideWidth - slideWidth);
    sliderRef.current.scrollTo({ x: offset, animated: true });
  }, [stageIndex]);

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Estado de la planta</Text>
          <Text style={styles.caption}>{motivationText}</Text>
        </View>
        {showStageBadge ? (
          <View
            style={[
              styles.stageBadge,
              {
                backgroundColor: withAlpha(currentStage.accent || Colors.secondary, 0.18),
                borderColor: withAlpha(currentStage.accent || Colors.secondary, 0.6),
              },
            ]}
          >
            <FontAwesome5
              name={currentStage.icon}
              size={16}
              color={Colors.text}
              style={styles.stageBadgeIcon}
            />
            <Text style={styles.stageBadgeLabel}>
              {labelFor(currentStage.key)} · {Math.floor(levelWithinStage) + 1}/{LEVELS_PER_STAGE}
            </Text>
          </View>
        ) : null}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sliderRow}
        ref={sliderRef}
      >
        {STAGES.map((item, index) => (
          <StageSlide
            key={item.key}
            stage={item}
            index={index}
            level={index === stageIndex ? subPercent : index < stageIndex ? 100 : 0}
            active={index === stageIndex}
            completed={index < stageIndex}
          />
        ))}
      </ScrollView>

      <View style={styles.progressBlock}>
        <View
          style={styles.progressTrack}
          accessibilityRole="progressbar"
          accessibilityValue={{ now: percent, min: 0, max: 100 }}
        >
          <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.progressFill, { width: `${Math.max(percent, 6)}%` }]}
          />
        </View>
        <View style={styles.progressMeta}>
          <Text style={styles.progressPercent}>{percent}% global</Text>
          {nextStage ? (
            <Text style={styles.progressHint}>Siguiente etapa: {nextStage.label}</Text>
          ) : (
            <Text style={styles.progressHint}>Etapa máxima alcanzada</Text>
          )}
        </View>
      </View>

      <View style={styles.actionRow}>
        <Text style={styles.actionLabel}>Siguiente ritual sugerido</Text>
        <View style={styles.actionPill}>
          <View style={styles.actionTextBlock}>
            <Text style={styles.actionText}>{suggestedAction}</Text>
            {actionCompleted ? (
              <Text style={styles.actionHint}>{actionCompletedLabel}</Text>
            ) : null}
          </View>
          {!actionCompleted ? (
            <Pressable
              onPress={onPressAction}
              accessibilityRole="button"
              accessibilityLabel={`Activar ${suggestedAction}`}
              hitSlop={12}
            >
              <Text style={styles.actionCta}>{actionCtaLabel}</Text>
            </Pressable>
          ) : null}
        </View>
      </View>
    </View>
  );
}

function StageSlide({ stage, index, level, active, completed }) {
  const displayLevel = Math.min(100, Math.max(0, Math.round(level)));
  const accentColor = stage.accent || Colors.secondary;
  const baseBorder = withAlpha(accentColor, 0.45);
  const baseBackground = withAlpha(accentColor, completed ? 0.18 : 0.08);
  const activeBackground = withAlpha(accentColor, 0.24);
  const slideStyles = [
    styles.stageSlide,
    { borderColor: baseBorder, backgroundColor: baseBackground },
    completed && styles.stageSlideCompleted,
    active && { borderColor: accentColor, backgroundColor: activeBackground },
  ];
  const dotStyles = [
    styles.stageDot,
    { borderColor: withAlpha(accentColor, active ? 1 : 0.45) },
    completed && styles.stageDotCompleted,
    active && { backgroundColor: accentColor },
  ];
  return (
    <View style={slideStyles}>
      <View style={dotStyles}>
        <Text style={styles.stageDotLabel}>{index + 1}</Text>
      </View>
      <View style={styles.stageCopy}>
        <Text style={styles.stageSlideLabel}>{stage.label}</Text>
        <Text style={styles.stageSlideMeta}>
          {completed ? "Completada" : active ? `${displayLevel}%` : "Pendiente"}
        </Text>
        {active && (
          <View style={styles.stageSubBar}>
            <View style={[styles.stageSubFill, { width: `${Math.max(displayLevel, 6)}%` }]} />
          </View>
        )}
      </View>
      <Text style={[styles.stageIcon, { color: accentColor }]}>{stage.preview}</Text>
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
    borderColor: "rgba(255,255,255,0.05)",
    backgroundColor: "rgba(17, 10, 28, 0.8)",
    gap: Spacing.base,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  headerCopy: {
    gap: 2,
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
  stageBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    paddingVertical: 4,
    borderWidth: 1,
  },
  stageBadgeIcon: {
    opacity: 0.95,
  },
  stageBadgeLabel: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  progressBlock: {
    gap: Spacing.tiny,
  },
  progressTrack: {
    height: 14,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.06)",
    overflow: "hidden",
  },
  progressFill: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: Radii.pill,
  },
  progressMeta: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressPercent: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  progressHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  sliderRow: {
    gap: Spacing.small,
    paddingVertical: Spacing.tiny,
    paddingRight: Spacing.small,
  },
  stageSlide: {
    width: 168,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small,
    borderRadius: Radii.lg,
    backgroundColor: "rgba(255,255,255,0.04)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    gap: Spacing.small,
  },
  stageSlideCompleted: {
    opacity: 0.85,
  },
  stageDot: {
    minWidth: 32,
    minHeight: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  stageDotCompleted: {
    backgroundColor: "rgba(255,255,255,0.08)",
    borderColor: "rgba(255,255,255,0.35)",
  },
  stageDotLabel: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  stageCopy: {
    flex: 1,
    gap: 2,
  },
  stageSlideLabel: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  stageSlideMeta: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  stageIcon: {
    fontSize: 18,
  },
  stageSubBar: {
    height: 5,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  stageSubFill: {
    height: "100%",
    borderRadius: Radii.pill,
    backgroundColor: Colors.secondary,
  },
  actionRow: {
    gap: Spacing.tiny,
  },
  actionLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  actionPill: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    backgroundColor: "rgba(255,255,255,0.05)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  actionText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  actionTextBlock: {
    flex: 1,
    gap: 2,
  },
  actionHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  actionCta: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: "700",
  },
});

function withAlpha(color = Colors.primary, alpha = 1) {
  if (!color || typeof color !== "string") return color;
  if (color.startsWith("rgba")) {
    return color.replace(/rgba\\(([^)]+)\\)/, (_, values) => {
      const parts = values.split(",").map((v) => v.trim());
      parts[3] = String(alpha);
      return `rgba(${parts.join(",")})`;
    });
  }
  if (!color.startsWith("#")) return color;
  let hex = color.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }
  if (hex.length === 8) {
    hex = hex.substring(0, 6);
  }
  if (hex.length !== 6) return color;
  const value = parseInt(hex, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}


