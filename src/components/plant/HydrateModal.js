// [MB] Modulo: Planta / Seccion: Ritual Hidratar
// Afecta: PlantScreen (rituales de bienestar)
// Proposito: Contar vasos de agua diarios y conectar con la planta
// Puntos de edicion futura: Persistir conteo y sincronizar con Perfil
// Autor: Codex - Fecha: 2025-11-13

import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated, Easing, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Spacing, Radii, Typography } from "../../theme";
import RitualModalLayout from "./RitualModalLayout";
import { ACTION_MECHANICS } from "./actionMechanics";

const HYDRATE_MECHANIC = ACTION_MECHANICS.hydrate || {};

export default function HydrateModal({
  visible,
  goal = 8,
  count = 0,
  onIncrement,
  onComplete,
  onClose,
}) {
  const [guideExpanded, setGuideExpanded] = useState(false);
  const remaining = Math.max(0, goal - count);
  const progress = Math.min(1, goal === 0 ? 1 : count / goal);
  const canIncrement = count < goal;
  const canComplete = count >= goal;
  const progressAnim = useRef(new Animated.Value(progress)).current;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 450,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [progress, progressAnim]);

  useEffect(() => {
    if (!visible) {
      setGuideExpanded(false);
    }
  }, [visible]);

  const cadenceCopy = HYDRATE_MECHANIC.cadence || "8 vasos al dia";
  const summaryCopy =
    HYDRATE_MECHANIC.summary ||
    "Pequenas pausas para tomar agua refrescan tu cuerpo y el aura de la planta.";
  const cues = useMemo(
    () => (Array.isArray(HYDRATE_MECHANIC.cues) ? HYDRATE_MECHANIC.cues.slice(0, 2) : []),
    []
  );
  const tips = useMemo(
    () => (Array.isArray(HYDRATE_MECHANIC.tips) ? HYDRATE_MECHANIC.tips.slice(0, 2) : []),
    []
  );
  const stackCopy = Array.isArray(HYDRATE_MECHANIC.stack) ? HYDRATE_MECHANIC.stack[0] : null;
  const cooldownCopy = HYDRATE_MECHANIC.cooldownMin ? `${HYDRATE_MECHANIC.cooldownMin} min` : null;
  const rewards = Array.isArray(HYDRATE_MECHANIC.rewards) ? HYDRATE_MECHANIC.rewards : [];
  const rewardText = rewards.length
    ? rewards
        .map((entry) =>
          entry?.amount ? `+${entry.amount} ${entry?.label || entry?.type || ""}` : entry?.label
        )
        .filter(Boolean)
        .join(" • ")
    : null;

  const metaEntries = [
    { icon: "tint", text: `Meta ${goal} vasos`, color: Colors.ritualHydrate },
    rewardText ? { icon: "coins", text: rewardText, color: Colors.accent } : null,
    cadenceCopy ? { icon: "redo-alt", text: cadenceCopy, color: Colors.ritualStretch } : null,
    cooldownCopy ? { icon: "history", text: cooldownCopy, color: Colors.ritualSun } : null,
  ].filter(Boolean);

  const metaTrack =
    metaEntries.length > 0 ? (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.metaInlineTrack}
      >
        {metaEntries.map((entry, index) => (
          <React.Fragment key={`${entry.icon}-${entry.text}-${index}`}>
            <View style={styles.metaInlineItem}>
              <FontAwesome5 name={entry.icon} size={12} color={entry.color} />
              <Text style={[styles.metaInlineText, { color: entry.color }]}>{entry.text}</Text>
            </View>
            {index < metaEntries.length - 1 ? (
              <Text style={styles.metaInlineDivider}>|</Text>
            ) : null}
          </React.Fragment>
        ))}
      </ScrollView>
    ) : null;

  const guidanceBlock =
    summaryCopy || cues.length || tips.length || stackCopy ? (
      <View style={[styles.guidance, !guideExpanded && styles.guidanceCollapsed]}>
        <Text style={styles.guidanceTitle}>Momento de hidratacion</Text>
        {summaryCopy ? <Text style={styles.guidanceCopy}>{summaryCopy}</Text> : null}
        {guideExpanded ? (
          <View style={styles.fullGuide}>
            {cues.length ? (
              <View style={styles.guidanceGroup}>
                <Text style={styles.groupLabel}>Cuando hacerlo</Text>
                {cues.map((cue) => (
                  <View key={cue} style={styles.groupItem}>
                    <View style={styles.groupBullet} />
                    <Text style={styles.groupText}>{cue}</Text>
                  </View>
                ))}
              </View>
            ) : null}
            {tips.length ? (
              <View style={styles.guidanceGroup}>
                <Text style={styles.groupLabel}>Consejos</Text>
                {tips.map((tip) => (
                  <View key={tip} style={styles.groupItem}>
                    <View style={styles.groupBullet} />
                    <Text style={styles.groupText}>{tip}</Text>
                  </View>
                ))}
              </View>
            ) : null}
            {stackCopy ? (
              <View style={styles.guidanceGroup}>
                <Text style={styles.groupLabel}>Combinalo con</Text>
                <View style={styles.groupItem}>
                  <View style={styles.groupBullet} />
                  <Text style={styles.groupText}>{stackCopy}</Text>
                </View>
              </View>
            ) : null}
          </View>
        ) : null}
        {(cues.length || tips.length || stackCopy) ? (
          <Pressable style={styles.linkButton} onPress={() => setGuideExpanded((prev) => !prev)}>
            <Text style={styles.linkButtonText}>
              {guideExpanded ? "Ocultar guia completa" : "Ver guia completa"}
            </Text>
          </Pressable>
        ) : null}
      </View>
    ) : null;

  return (
    <RitualModalLayout
      visible={visible}
      onClose={onClose}
      title="Hidratarme"
      subtitle="Toma agua con calma, cada vaso mantiene viva la conexion con tu planta."
      footer={
        <View style={styles.buttonStack}>
          <Pressable
            style={[styles.primaryButton, !canIncrement && styles.primaryButtonDisabled]}
            onPress={onIncrement}
            disabled={!canIncrement}
          >
            <Text style={styles.primaryText}>
              {canIncrement ? "Tomar un vaso con agua" : "Meta alcanzada"}
            </Text>
          </Pressable>
          <Pressable
            style={[styles.completeButton, !canComplete && styles.completeButtonDisabled]}
            onPress={onComplete}
            disabled={!canComplete}
          >
            <Text style={styles.completeText}>Sincronizar con la planta</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={onClose}>
            <Text style={styles.secondaryText}>Cerrar</Text>
          </Pressable>
        </View>
      }
    >
      {metaTrack}
      {guidanceBlock}
      <View style={styles.progressSection}>
        <View style={styles.hydrationCard}>
          <Animated.View
            style={[
              styles.hydrationFill,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
          <View style={styles.hydrationContent}>
            <Text style={styles.hydrationTitle}>Hidratacion diaria</Text>
            <Text style={styles.hydrationMeta}>
              {count}/{goal} vasos
            </Text>
            <Text style={styles.hydrationHint}>
              {remaining > 0 ? `Faltan ${remaining} sorbos.` : "Meta lograda, sincroniza cuando quieras."}
            </Text>
          </View>
        </View>
      </View>
    </RitualModalLayout>
  );
}

const styles = StyleSheet.create({
  buttonStack: {
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  metaInlineTrack: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.small,
  },
  metaInlineItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    marginRight: Spacing.tiny,
  },
  metaInlineText: {
    ...Typography.caption,
    color: Colors.text,
  },
  metaInlineDivider: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginHorizontal: Spacing.small,
  },
  guidance: {
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    backgroundColor: "rgba(6,40,56,0.4)",
    borderWidth: 1,
    borderColor: "rgba(65,200,244,0.35)",
    gap: Spacing.small,
    marginBottom: Spacing.small,
  },
  guidanceCollapsed: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  guidanceTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  guidanceCopy: {
    ...Typography.body,
    color: Colors.text,
  },
  fullGuide: {
    gap: Spacing.small,
  },
  guidanceGroup: {
    gap: Spacing.tiny,
  },
  groupLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.tiny,
  },
  groupBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.ritualHydrate,
    marginTop: 6,
  },
  groupText: {
    ...Typography.caption,
    color: Colors.textMuted,
    flex: 1,
  },
  linkButton: {
    paddingVertical: Spacing.tiny,
  },
  linkButtonText: {
    ...Typography.caption,
    color: Colors.ritualHydrate,
    fontWeight: "700",
  },
  progressSection: {
    gap: Spacing.small,
  },
  hydrationCard: {
    borderRadius: Radii.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(65,200,244,0.35)",
    backgroundColor: "rgba(65,200,244,0.08)",
  },
  hydrationFill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(65,200,244,0.35)",
  },
  hydrationContent: {
    padding: Spacing.base,
    gap: 4,
  },
  hydrationTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
  },
  hydrationMeta: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "700",
  },
  hydrationHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  primaryButton: {
    borderRadius: Radii.pill,
    paddingVertical: Spacing.small,
    alignItems: "center",
    backgroundColor: Colors.ritualHydrate,
  },
  primaryButtonDisabled: {
    backgroundColor: "rgba(255,255,255,0.2)",
  },
  primaryText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  completeButton: {
    borderRadius: Radii.pill,
    paddingVertical: Spacing.small,
    alignItems: "center",
    backgroundColor: Colors.primary,
  },
  completeButtonDisabled: {
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  completeText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  secondaryButton: {
    alignItems: "center",
    paddingVertical: Spacing.small,
  },
  secondaryText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});
