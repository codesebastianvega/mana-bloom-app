// [MB] Módulo: Planta / Sección: Hero animado
// Afecta: PlantScreen (demo inicial)
// Propósito: mostrar la planta junto a métricas y barra de salud
// Puntos de edición futura: enlazar métricas reales, animaciones extra
// Autor: Codex - Fecha: 2025-08-16

import React, { useEffect, useRef } from "react";
import { View, Text, Image, Animated, Easing, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const SIZE_MAP = {
  md: Spacing.xlarge * 4,
  lg: Spacing.xlarge * 5,
  xl: Spacing.xlarge * 6,
  hero: Spacing.xlarge * 7,
};

export default function PlantHero({
  source,
  size = "lg",
  showAura = false,
  health = 1,
  mood,
  stage,
  skinAccent,
  careMetrics = [],
  wellbeingMetrics = [],
  ritualSummary,
  climateInfo,
  style,
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!showAura) return;
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
  }, [anim, showAura]);

  const baseSize = SIZE_MAP[size] || SIZE_MAP.lg;
  const scale = !showAura
    ? 1
    : anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.03] });
  const auraOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.08, 0.18],
  });
  const auraSizeOuter = baseSize * 1.45;

  const label = `Planta ${stage}; salud ${Math.round(
    health * 100
  )}%; ánimo ${mood}`;
  const healthPercent = Math.round(Math.max(0, Math.min(1, health)) * 100);
  const healthGradient = healthPercent > 66 ? [Colors.success, Colors.success] : healthPercent > 33 ? [Colors.success, Colors.warning] : [Colors.warning, Colors.danger];

  const healthColor =
    healthPercent > 66
      ? Colors.success
      : healthPercent > 33
      ? Colors.warning
      : Colors.danger;
  const chips = careMetrics.map((item) => ({
    key: item.key,
    label: item.label,
    percent: Math.round(Math.max(0, Math.min(1, item.value ?? 0)) * 100),
  }));
  const wellbeingChips = wellbeingMetrics.map((item) =>
    mapWellbeingChip(item, climateInfo)
  );
  const derivedRitualSummary = ritualSummary
    ? {
        key: "rituals",
        label: "Rituales",
        display: `${ritualSummary.active} / ${ritualSummary.total}`,
        active: ritualSummary.active,
        total: ritualSummary.total,
        tags:
          ritualSummary.tags && ritualSummary.tags.length > 0
            ? ritualSummary.tags
            : [],
        accent: Colors.accent,
      }
    : wellbeingChips.find((chip) => chip.key === "rituals");
  const temperatureChip = wellbeingChips.find(
    (chip) => chip.key === "temperature"
  );
  const moodChip = wellbeingChips.find((chip) => chip.key === "mood");
  const focusChip = wellbeingChips.find((chip) => chip.key === "focus");
  const secondaryChipsRaw = [moodChip, focusChip].filter(Boolean);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.heroRow}>
        <View style={styles.metricsColumn}>
          {chips.map((chip) => (
            <View key={chip.key} style={styles.metricChip}>
              <Text style={styles.metricLabel}>{chip.label}</Text>
              <Text style={styles.metricValue}>{chip.percent}%</Text>
            </View>
          ))}
        </View>
        <View style={styles.heroWrap}>
          {showAura && (
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
                backgroundColor: showAura ? Colors.surface : "transparent",
                shadowOpacity: showAura ? 0.25 : 0,
              },
            ]}
          >
            {source ? (
              <Image
                source={source}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: baseSize / 2,
                }}
                resizeMode="contain"
              />
            ) : (
              <Text style={{ fontSize: baseSize * 0.6 }}>🌱</Text>
            )}
            {skinAccent && showAura && (
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
          </Animated.View>
        </View>
      </View>
      <View style={styles.healthBlock}>
        <View style={styles.healthHeader}>
          <Text style={styles.healthTitle}>Salud de la planta</Text>
          <Text style={[styles.healthValue, { color: healthColor }]}>
            {healthPercent}%
          </Text>
        </View>
        <View
          style={styles.healthBar}
          accessibilityRole="progressbar"
          accessibilityValue={{ now: healthPercent, min: 0, max: 100 }}
        >
          <LinearGradient
            colors={healthGradient}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={[styles.healthFill, { width: `${Math.max(8, healthPercent)}%` }]}
          />
        </View>
      </View>
      {temperatureChip || secondaryChipsRaw.length > 0 ? (
        <View style={styles.subChipColumns}>
          <View style={styles.leftChipColumn}>
            {moodChip ? (
              <View
                style={[styles.subChipStack, { borderColor: moodChip.accent }]}
              >
                <View style={styles.subChipStackContent}>
                  <Text style={styles.subChipEmoji}>
                    {moodChip.emoji || "😊"}
                  </Text>
                  <Text style={styles.subChipLabel}>{moodChip.label}</Text>
                  <Text
                    style={[
                      styles.subChipInlineValue,
                      { color: moodChip.accent },
                    ]}
                  >
                    {moodChip.display}
                  </Text>
                </View>
                {moodChip.meta ? (
                  <Text style={styles.subChipMeta}>{moodChip.meta}</Text>
                ) : null}
              </View>
            ) : null}
            {focusChip ? (
              <View
                style={[styles.subChipStack, { borderColor: focusChip.accent }]}
              >
                <View style={styles.subChipStackContent}>
                  <Text style={styles.subChipEmoji}>🧠</Text>
                  <Text style={styles.subChipLabel}>{focusChip.label}</Text>
                  <Text
                    style={[
                      styles.subChipInlineValue,
                      { color: focusChip.accent },
                    ]}
                  >
                    {focusChip.display}
                  </Text>
                </View>
                {focusChip.meta ? (
                  <Text style={styles.subChipMeta}>{focusChip.meta}</Text>
                ) : null}
              </View>
            ) : null}
          </View>
          {temperatureChip ? (
            <View style={styles.rightTempColumn}>
              <View
                style={[
                  styles.subChipFull,
                  styles.tempChip,
                  { borderColor: temperatureChip.accent },
                ]}
              >
                <View style={styles.tempChipContent}>
                  <View style={styles.tempChipHeader}>
                    <Text style={styles.subChipEmoji}>🌡️</Text>
                    <Text style={styles.subChipLabel}>
                      {temperatureChip.label}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.tempValue,
                      { color: temperatureChip.accent },
                    ]}
                  >
                    {temperatureChip.display}
                  </Text>
                  {temperatureChip.meta ? (
                    <Text style={styles.subChipMeta}>
                      {temperatureChip.meta}
                    </Text>
                  ) : null}
                </View>
              </View>
            </View>
          ) : null}
        </View>
      ) : null}
      {derivedRitualSummary ? (
        <View style={styles.ritualCard}>
          <View style={styles.ritualHeader}>
            <Text style={styles.ritualTitle}>Rituales</Text>
            <Text
              style={[
                styles.ritualCount,
                { color: derivedRitualSummary.accent },
              ]}
            >
              {derivedRitualSummary.display}
            </Text>
          </View>
          <Text style={styles.ritualHint}>
            Tus hábitos personales mantienen motivada a la planta.
          </Text>
          {derivedRitualSummary.active > 0 ? (
            <View style={styles.ritualTags}>
              {derivedRitualSummary.tags.map((hint) => (
                <View key={hint} style={styles.ritualTag}>
                  <Text style={styles.ritualTagText}>{hint}</Text>
                </View>
              ))}
            </View>
          ) : null}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.base,
  },
  heroRow: {
    flexDirection: "row",
    gap: Spacing.base,
    alignItems: "center",
  },
  heroWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  metricsColumn: {
    gap: Spacing.small,
    paddingVertical: Spacing.small,
  },
  metricChip: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 140,
  },
  metricLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  metricValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  healthBlock: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    backgroundColor: "rgba(0,0,0,0.25)",
    padding: Spacing.base,
    gap: Spacing.small,
  },
  healthHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  healthTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  healthValue: {
    ...Typography.body,
    fontWeight: "700",
  },
  healthBar: {
    height: 12,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  healthFill: {
    height: "100%",
    borderRadius: Radii.pill,
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.08)",
    marginTop: Spacing.small,
  },
  subChipColumns: {
    flexDirection: "row",
    gap: Spacing.small,
    alignItems: "stretch",
  },
  leftChipColumn: {
    flex: 0.9,
    gap: Spacing.small,
  },
  rightTempColumn: {
    flex: 1.1,
  },
  subChipStack: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    borderRadius: Radii.lg,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    shadowColor: Colors.shadow,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "stretch",
  },
  subChipFull: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    borderRadius: Radii.lg,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    shadowColor: Colors.shadow,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    minHeight: 104,
    justifyContent: "center",
    alignItems: "center",
  },
  subChipLabelWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  subChipLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  subChipValue: {
    ...Typography.caption,
    fontWeight: "700",
  },
  subChipInlineValue: {
    ...Typography.caption,
    fontWeight: "700",
    marginLeft: Spacing.small,
  },
  subChipMeta: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 11,
  },
  subChipEmoji: {
    fontSize: 14,
  },
  subChipStackContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tempValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  tempChipContent: {
    alignItems: "center",
    gap: Spacing.small,
  },
  tempChipHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  tempValue: {
    ...Typography.title,
    fontSize: 28,
    fontWeight: "800",
    paddingVertical: Spacing.tiny,
  },
  ritualCard: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(26,20,48,0.75)",
    padding: Spacing.base,
    gap: Spacing.small,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
  },
  ritualHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ritualTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  ritualCount: {
    ...Typography.body,
    fontWeight: "700",
  },
  ritualHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  ritualTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
  },
  ritualTag: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  ritualTagText: {
    ...Typography.caption,
    color: Colors.text,
  },
});

function mapWellbeingChip(item, climateInfo) {
  const value = Math.max(0, Math.min(1, item.value ?? 0));
  const percent = Math.round(value * 100);
  switch (item.key) {
    case "mood": {
      const moodState =
        percent >= 75
          ? { emoji: "😄", text: "Feliz", accent: Colors.success }
          : percent >= 45
          ? { emoji: "🙂", text: "Estable", accent: Colors.secondary }
          : percent >= 25
          ? { emoji: "😟", text: "Baja", accent: Colors.warning }
          : { emoji: "😭", text: "Crítica", accent: Colors.danger };
      return {
        key: item.key,
        label: item.label,
        display: moodState.text,
        emoji: moodState.emoji,
        accent: moodState.accent,
      };
    }
    case "temperature": {
      const tempC = Math.round(15 + value * 15);
      return {
        key: item.key,
        label: item.label,
        display: `${tempC}°C`,
        meta: climateInfo?.location
          ? climateInfo.condition
            ? `${climateInfo.location} · ${climateInfo.condition}`
            : climateInfo.location
          : undefined,
        fullWidth: true,
        accent: Colors.warning,
      };
    }
    case "rituals": {
      const active = Math.max(0, Math.round(value * 4));
      const tagCount = Math.min(3, Math.max(1, active));
      return {
        key: item.key,
        label: item.label,
        display: `${active} activos`,
        tags: Array.from({ length: tagCount }, (_, idx) => `Ritual ${idx + 1}`),
        accent: Colors.accent,
      };
    }
    case "focus": {
      const score = Math.max(0, Math.round(value * 5));
      return {
        key: item.key,
        label: item.label,
        display: `${score}/5`,
        accent: Colors.info,
      };
    }
    default:
      return {
        key: item.key,
        label: item.label,
        display: `${percent}%`,
        accent: Colors.text,
      };
  }
}

const RITUAL_HINTS = ["Hidratarme", "Meditar", "Gratitud"];
