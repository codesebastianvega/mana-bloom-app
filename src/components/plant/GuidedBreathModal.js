// [MB] Modulo: Planta / Seccion: Respiracion guiada
// Afecta: PlantScreen
// Proposito: Guiar una meditacion corta que otorga XP al completarse
// Puntos de edicion futura: Integrar audio, animaciones y duraciones configurables
// Autor: Codex - Fecha: 2025-10-22

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Spacing, Radii, Typography } from "../../theme";
import RitualModalLayout from "./RitualModalLayout";
import { ACTION_MECHANICS } from "./actionMechanics";

const BREATH_STEPS = [
  { key: "inhale", label: "Inhala", hint: "Lleva aire por 4 segundos", duration: 4 },
  { key: "hold", label: "Sosten", hint: "Mantiene el aire 4 segundos", duration: 4 },
  { key: "exhale", label: "Exhala", hint: "Libera en 6 segundos", duration: 6 },
];

const withAlpha = (hex = "", alpha = 1) => {
  try {
    if (hex.startsWith("rgba")) return hex;
    let value = hex.replace("#", "");
    if (value.length === 3) {
      value = value
        .split("")
        .map((c) => `${c}${c}`)
        .join("");
    }
    if (value.length !== 6) return hex;
    const num = parseInt(value, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r},${g},${b},${alpha})`;
  } catch {
    return hex;
  }
};

const XP_REWARD = 30;
const MECHANIC = ACTION_MECHANICS.meditate || {};

export default function GuidedBreathModal({
  visible,
  cycles = 3,
  onClose,
  onComplete,
}) {
  const [phase, setPhase] = useState("intro"); // intro | active | done
  const [stepIndex, setStepIndex] = useState(0);
  const [cycleIndex, setCycleIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(BREATH_STEPS[0].duration);

  const timerRef = useRef(null);
  const stepRef = useRef(0);
  const cycleRef = useRef(0);
  const breatheAnim = useRef(new Animated.Value(0)).current;
  const breatheLoopRef = useRef(null);
  const [guideExpanded, setGuideExpanded] = useState(false);
  const cycleDurationSeconds = useMemo(
    () => BREATH_STEPS.reduce((sum, step) => sum + step.duration, 0),
    []
  );
  const totalRoutineSeconds = useMemo(
    () => cycles * cycleDurationSeconds,
    [cycles, cycleDurationSeconds]
  );
  const formattedRoutineDuration = useMemo(() => {
    if (totalRoutineSeconds >= 60) {
      const minutes = totalRoutineSeconds / 60;
      const rounded = Math.round(minutes * 10) / 10;
      return `~${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)} min`;
    }
    return `${totalRoutineSeconds}s`;
  }, [totalRoutineSeconds]);

  const cadenceCopy = MECHANIC.cadence || "1-2 veces al dia";
  const summaryCopy =
    MECHANIC.summary ||
    "Respira por fases cortas para liberar ansiedad y regalar Pureza a tu planta.";
  const cues = Array.isArray(MECHANIC.cues) ? MECHANIC.cues.slice(0, 2) : [];
  const tips = Array.isArray(MECHANIC.tips) ? MECHANIC.tips.slice(0, 2) : [];
  const stackCopy = Array.isArray(MECHANIC.stack) ? MECHANIC.stack[0] : null;
  const hasExtendedGuide = cues.length > 0 || tips.length > 0;
  const formattedCost = useMemo(() => {
    const items = Array.isArray(MECHANIC.cost) ? MECHANIC.cost : [];
    if (items.length === 0) return "Sin costo";
    return items
      .map((entry) => {
        const amount = entry?.amount ?? 0;
        const type = String(entry?.type || "").toLowerCase();
        if (!amount) {
          return type || "Costo";
        }
        return `${amount} ${type}`;
      })
      .join(" + ");
  }, [MECHANIC]);
  const formattedCooldown = MECHANIC.cooldownMin
    ? `${MECHANIC.cooldownMin} min`
    : null;
  const guidanceChips = [
    { label: "Costo", value: formattedCost },
    formattedCooldown ? { label: "Cooldown", value: formattedCooldown } : null,
    cadenceCopy ? { label: "Cadencia", value: cadenceCopy } : null,
  ].filter(Boolean);
  const showGuidance = Boolean(summaryCopy || hasExtendedGuide);
  const detailEntries = [
    { icon: "stopwatch", text: formattedRoutineDuration },
    { icon: "star", text: `+${XP_REWARD} XP` },
    { icon: "hand-holding-usd", text: formattedCost },
    formattedCooldown ? { icon: "history", text: `${formattedCooldown}` } : null,
    cadenceCopy ? { icon: "redo-alt", text: cadenceCopy } : null,
  ];

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const stopBreathLoop = useCallback(() => {
    if (breatheLoopRef.current) {
      breatheLoopRef.current.stop();
      breatheLoopRef.current = null;
    }
  }, []);

  const startBreathLoop = useCallback(() => {
    stopBreathLoop();
    breatheAnim.setValue(0);
    breatheLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(breatheAnim, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(breatheAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ])
    );
    breatheLoopRef.current.start();
  }, [breatheAnim, stopBreathLoop]);

  const resetState = useCallback(() => {
    setPhase("intro");
    setStepIndex(0);
    setCycleIndex(0);
    setTimeLeft(BREATH_STEPS[0].duration);
    stepRef.current = 0;
    cycleRef.current = 0;
  }, []);

  const advanceStep = useCallback(() => {
    let nextStep = stepRef.current + 1;
    let nextCycle = cycleRef.current;
    if (nextStep >= BREATH_STEPS.length) {
      nextStep = 0;
      nextCycle += 1;
    }
    if (nextCycle >= cycles) {
      stopTimer();
      setPhase("done");
      setTimeLeft(0);
      cycleRef.current = cycles;
      setCycleIndex(cycles);
      return null;
    }
    stepRef.current = nextStep;
    cycleRef.current = nextCycle;
    setStepIndex(nextStep);
    setCycleIndex(nextCycle);
    return BREATH_STEPS[nextStep].duration;
  }, [cycles, stopTimer]);

  const beginSession = useCallback(() => {
    stopTimer();
    stepRef.current = 0;
    cycleRef.current = 0;
    setPhase("active");
    setStepIndex(0);
    setCycleIndex(0);
    const firstDuration = BREATH_STEPS[0].duration;
    setTimeLeft(firstDuration);
    timerRef.current = setInterval(() => {
      setTimeLeft((remaining) => {
        if (remaining <= 1) {
          const nextDuration = advanceStep();
          return nextDuration ?? 0;
        }
        return remaining - 1;
      });
    }, 1000);
  }, [advanceStep, stopTimer]);

  useEffect(() => {
    if (!visible) {
      stopTimer();
      resetState();
      stopBreathLoop();
      return;
    }
    if (phase === "active") {
      startBreathLoop();
    }
  }, [visible, resetState, stopTimer, startBreathLoop, stopBreathLoop, phase]);

  useEffect(
    () => () => {
      stopTimer();
      stopBreathLoop();
    },
    [stopTimer, stopBreathLoop]
  );

  const handleStart = useCallback(() => {
    beginSession();
    startBreathLoop();
  }, [beginSession, startBreathLoop]);

  const handleCancel = useCallback(() => {
    stopTimer();
    stopBreathLoop();
    resetState();
    onClose?.();
  }, [onClose, resetState, stopTimer, stopBreathLoop]);

  const handleFinish = useCallback(() => {
    stopTimer();
    stopBreathLoop();
    resetState();
    onComplete?.();
  }, [onComplete, resetState, stopTimer, stopBreathLoop]);

  const pulseScale = breatheAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.08],
  });
  const pulseOpacity = breatheAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.75, 1],
  });

  const currentStep = useMemo(() => BREATH_STEPS[stepIndex], [stepIndex]);
  const displayCycle = Math.min(cycleIndex + (phase === "done" ? 0 : 1), cycles);

  useEffect(() => {
    if (!visible) {
      setGuideExpanded(false);
    }
  }, [visible]);

  useEffect(() => {
    if (!visible) {
      setGuideExpanded(false);
    }
  }, [visible]);

  if (!visible) {
    return null;
  }

  const metaIconColors = [
    withAlpha(Colors.ritualCalm, 0.95),
    withAlpha(Colors.accent, 0.95),
    withAlpha(Colors.ritualHydrate, 0.95),
    withAlpha(Colors.ritualSun, 0.95),
    withAlpha(Colors.ritualJournal, 0.95),
  ];
  const inlineMeta = detailEntries.filter(Boolean).map((entry, index) => ({
    ...entry,
    color: metaIconColors[index % metaIconColors.length],
  }));
  const sessionMetaBlock = inlineMeta.length ? (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.metaInlineTrack}
    >
      {inlineMeta.map((entry, index) => (
        <React.Fragment key={`${entry.icon}-${entry.text}`}>
          <View style={styles.metaInlineItem}>
            <FontAwesome5 name={entry.icon} size={12} color={entry.color} />
            <Text style={[styles.metaInlineText, { color: entry.color }]}>{entry.text}</Text>
          </View>
          {index < inlineMeta.length - 1 ? (
            <Text style={styles.metaInlineDivider}>|</Text>
          ) : null}
        </React.Fragment>
      ))}
    </ScrollView>
  ) : null;

  const guidanceBlock = showGuidance ? (
    <View style={[styles.guidance, !guideExpanded && styles.guidanceCollapsed]}>
      <Text style={styles.guidanceTitle}>Momento de calma</Text>
      {summaryCopy ? <Text style={styles.guidanceCopy}>{summaryCopy}</Text> : null}
      {guideExpanded && hasExtendedGuide ? (
        <View style={styles.fullGuide}>
          {cues.length ? (
            <View style={styles.guidanceGroup}>
              <Text style={styles.groupLabel}>Cuando usarlo</Text>
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
      {hasExtendedGuide ? (
        <Pressable style={styles.linkButton} onPress={() => setGuideExpanded((prev) => !prev)}>
          <Text style={styles.linkButtonText}>
            {guideExpanded ? "Ocultar guia completa" : "Ver guia completa"}
          </Text>
        </Pressable>
      ) : null}
    </View>
  ) : null;

  const stepGuide = (
    <View style={styles.stepList}>
      {BREATH_STEPS.map((step, index) => (
        <View key={step.key} style={styles.stepItem}>
          <View style={styles.stepBadge}>
            <Text style={styles.stepBadgeText}>{index + 1}</Text>
          </View>
          <View style={styles.stepCopy}>
            <Text style={styles.stepLabel}>{step.label}</Text>
            <Text style={styles.stepHint}>{step.hint}</Text>
          </View>
        </View>
      ))}
    </View>
  );

  let modalTitle = "Meditacion guiada";
  let modalSubtitle = `Regalate ${cycles} ciclos suaves para bajar la ansiedad y regresar al centro.`;
  let modalBody = (
    <>
      {sessionMetaBlock}
      {guidanceBlock}
      {stepGuide}
    </>
  );
  let modalFooter = (
    <View style={styles.footerStack}>
      <Pressable style={styles.primaryButton} onPress={handleStart}>
        <Text style={styles.primaryButtonText}>Comenzar {cycles} ciclos</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={handleCancel}>
        <Text style={styles.secondaryButtonText}>Cancelar</Text>
      </Pressable>
    </View>
  );

  if (phase === "active") {
    modalTitle = "Respira";
    modalSubtitle = `Ciclo ${displayCycle} de ${cycles}`;
    modalBody = (
      <>
        <View style={styles.timerBadgeWrapper}>
          <Animated.View
            style={[
              styles.timerBadgeOuter,
              { transform: [{ scale: pulseScale }], opacity: pulseOpacity },
            ]}
          >
            <Animated.View
              style={[
                styles.timerRing,
                { transform: [{ scale: pulseScale }], opacity: pulseOpacity },
              ]}
            />
            <View style={styles.timerBadgeInner}>
              <Text style={styles.timerText}>{timeLeft}s</Text>
            </View>
          </Animated.View>
        </View>
        <View style={styles.liveCard}>
          <Text style={styles.liveLabel}>{currentStep.label}</Text>
          <Text style={styles.liveHint}>{currentStep.hint}</Text>
        </View>
        <View style={styles.stepDotsRow}>
          {BREATH_STEPS.map((step, idx) => (
            <View
              key={step.key}
              style={[styles.dot, idx === stepIndex && styles.dotActive]}
            />
          ))}
        </View>
      </>
    );
    modalFooter = (
      <View style={styles.footerStack}>
        <Pressable style={styles.secondaryButton} onPress={handleCancel}>
          <Text style={styles.secondaryButtonText}>Cancelar</Text>
        </Pressable>
      </View>
    );
  } else if (phase === "done") {
    modalTitle = "Respiracion completada";
    modalSubtitle = "Tu calma ahora nutre a la planta.";
    modalBody = (
      <>
        {sessionMetaBlock}
        <Text style={styles.doneHint}>
          Tu respiracion calma el entorno y sincroniza Pureza con tu mood.
        </Text>
        {guidanceBlock}
      </>
    );
    modalFooter = (
      <View style={styles.footerStack}>
        <Pressable style={styles.primaryButton} onPress={handleFinish}>
          <Text style={styles.primaryButtonText}>Reclamar XP</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={handleCancel}>
          <Text style={styles.secondaryButtonText}>Cerrar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <RitualModalLayout
      visible={visible}
      onClose={handleCancel}
      title={modalTitle}
      subtitle={modalSubtitle}
      footer={modalFooter}
    >
      {modalBody}
    </RitualModalLayout>
  );
}

const styles = StyleSheet.create({
  footerStack: {
    gap: Spacing.small,
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
  stepList: {
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radii.lg,
    padding: Spacing.small,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.small,
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: withAlpha(Colors.ritualCalm, 0.35),
  },
  stepBadgeText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  stepCopy: {
    flex: 1,
    gap: 2,
  },
  stepLabel: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  stepHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  primaryButton: {
    backgroundColor: Colors.ritualCalm,
    borderRadius: Radii.pill,
    paddingVertical: Spacing.small,
    alignItems: "center",
  },
  primaryButtonText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  secondaryButton: {
    borderRadius: Radii.pill,
    paddingVertical: Spacing.small,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  secondaryButtonText: {
    ...Typography.body,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  doneHint: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
  },
  timerBadgeWrapper: {
    alignSelf: "center",
    padding: Spacing.small,
  },
  timerBadgeOuter: {
    width: 104,
    height: 104,
    borderRadius: 52,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: withAlpha(Colors.ritualCalm, 0.22),
  },
  timerRing: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: withAlpha(Colors.ritualCalm, 0.35),
    opacity: 0.9,
  },
  timerBadgeInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: withAlpha(Colors.surfaceAlt, 0.9),
    borderWidth: 1,
    borderColor: withAlpha(Colors.ritualCalm, 0.5),
  },
  timerText: {
    ...Typography.title,
    color: Colors.text,
    fontVariant: ["tabular-nums"],
  },
  liveCard: {
    borderRadius: Radii.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: withAlpha(Colors.ritualCalm, 0.3),
    backgroundColor: withAlpha(Colors.ritualCalm, 0.12),
    alignItems: "center",
    gap: 4,
  },
  liveLabel: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "700",
  },
  liveHint: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
  },
  guidance: {
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    backgroundColor: withAlpha(Colors.surfaceAlt, 0.4),
    borderWidth: 1,
    borderColor: withAlpha(Colors.ritualCalm, 0.15),
    gap: Spacing.small,
  },
  guidanceCollapsed: {
    paddingBottom: Spacing.tiny,
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
    marginTop: Spacing.small / 2,
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
    backgroundColor: Colors.ritualCalm,
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
    color: Colors.ritualCalm,
    fontWeight: "700",
  },
  stepDotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.small,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.border,
  },
  dotActive: {
    backgroundColor: Colors.ritualCalm,
  },
});

