// [MB] Modulo: Planta / Seccion: Ritual Estirar
// Afecta: PlantScreen (rituales de bienestar)
// Proposito: Guiar mini rutina de estiramiento para conectar con la planta
// Puntos de edicion futura: Animaciones y persistencia de progreso
// Autor: Codex - Fecha: 2025-11-13

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";
import RitualModalLayout from "./RitualModalLayout";
import { ACTION_MECHANICS } from "./actionMechanics";
import { FontAwesome5 } from "@expo/vector-icons";

const STRETCH_STEPS = [
  { key: "neck", label: "Cuello", hint: "Inhala y gira la cabeza lentamente", duration: 10 },
  { key: "shoulders", label: "Hombros", hint: "Eleva y suelta los hombros en circulos", duration: 12 },
  { key: "arms", label: "Brazos", hint: "Extiende brazos y entrelaza manos por encima", duration: 12 },
  { key: "legs", label: "Piernas", hint: "Flexiona y toca puntas suavemente", duration: 15 },
];

const STRETCH_MECHANIC = ACTION_MECHANICS.stretch || {};

export default function StretchModal({ visible, onClose, onComplete }) {
  const [phase, setPhase] = useState("intro"); // intro | active | done
  const [stepIndex, setStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(STRETCH_STEPS[0].duration);
  const [guideExpanded, setGuideExpanded] = useState(false);
  const timerRef = useRef(null);
  const stepRef = useRef(0);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const currentStep = useMemo(() => STRETCH_STEPS[stepIndex], [stepIndex]);

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const resetState = useCallback(() => {
    stepRef.current = 0;
    setPhase("intro");
    setStepIndex(0);
    setTimeLeft(STRETCH_STEPS[0].duration);
  }, []);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const nextIndex = stepRef.current + 1;
          if (nextIndex >= STRETCH_STEPS.length) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            setPhase("done");
            return 0;
          }
          stepRef.current = nextIndex;
          setStepIndex(nextIndex);
          return STRETCH_STEPS[nextIndex].duration;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  const beginSession = useCallback(() => {
    stopTimer();
    stepRef.current = 0;
    setPhase("active");
    setStepIndex(0);
    setTimeLeft(STRETCH_STEPS[0].duration);
    startTimer();
  }, [startTimer, stopTimer]);

  useEffect(() => {
    if (!visible) {
      stopTimer();
      resetState();
      setGuideExpanded(false);
    }
  }, [visible, stopTimer, resetState]);

  useEffect(
    () => () => {
      stopTimer();
    },
    [stopTimer]
  );

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: stepIndex / Math.max(1, STRETCH_STEPS.length - 1),
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [stepIndex, progressAnim]);

  const handleSkip = () => {
    if (phase !== "active") return;
    stopTimer();
    const nextIndex = stepRef.current + 1;
    if (nextIndex >= STRETCH_STEPS.length) {
      setPhase("done");
      setTimeLeft(0);
      return;
    }
    stepRef.current = nextIndex;
    setStepIndex(nextIndex);
    setTimeLeft(STRETCH_STEPS[nextIndex].duration);
    startTimer();
  };

  const handleFinish = () => {
    stopTimer();
    setPhase("done");
    setTimeLeft(0);
  };

  const handleClose = () => {
    stopTimer();
    resetState();
    onClose?.();
  };

  const handleComplete = () => {
    onComplete?.();
    resetState();
  };

  const cadenceCopy = STRETCH_MECHANIC.cadence || "3 veces al dia";
  const summaryCopy =
    STRETCH_MECHANIC.summary ||
    "Tres tramos cortos liberan tension acumulada y mantienen la planta serena.";
  const cues = useMemo(
    () => (Array.isArray(STRETCH_MECHANIC.cues) ? STRETCH_MECHANIC.cues.slice(0, 2) : []),
    []
  );
  const tips = useMemo(
    () => (Array.isArray(STRETCH_MECHANIC.tips) ? STRETCH_MECHANIC.tips.slice(0, 2) : []),
    []
  );
  const stackCopy = Array.isArray(STRETCH_MECHANIC.stack) ? STRETCH_MECHANIC.stack[0] : null;
  const metaIconColors = [
    Colors.ritualStretch,
    Colors.ritualHydrate,
    Colors.ritualSun,
    Colors.ritualCalm,
  ];
  const metaEntries = [
    { icon: "running", text: "3 min de reset" },
    cadenceCopy ? { icon: "redo-alt", text: cadenceCopy } : null,
    STRETCH_MECHANIC.cooldownMin
      ? { icon: "history", text: `${STRETCH_MECHANIC.cooldownMin} min cooldown` }
      : null,
  ]
    .filter(Boolean)
    .map((entry, index) => ({
      ...entry,
      color: metaIconColors[index % metaIconColors.length],
    }));

  const hasExtendedGuide = cues.length || tips.length || stackCopy;
  const guideBlock =
    summaryCopy || hasExtendedGuide ? (
      <View style={[styles.guidance, phase === "active" && styles.guidanceHidden]}>
        <Text style={styles.guidanceTitle}>Momento de movimiento</Text>
        {summaryCopy ? <Text style={styles.guidanceCopy}>{summaryCopy}</Text> : null}
        {guideExpanded && hasExtendedGuide ? (
          <View style={styles.guidanceGroup}>
            {cues.map((cue) => (
              <View key={cue} style={styles.groupItem}>
                <View style={styles.groupBullet} />
                <Text style={styles.groupText}>{cue}</Text>
              </View>
            ))}
            {tips.map((tip) => (
              <View key={tip} style={styles.groupItem}>
                <View style={styles.groupBullet} />
                <Text style={styles.groupText}>{tip}</Text>
              </View>
            ))}
            {stackCopy ? (
              <View style={styles.groupItem}>
                <View style={styles.groupBullet} />
                <Text style={styles.groupText}>{stackCopy}</Text>
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

  const metaTrack =
    metaEntries.length && phase !== "active"
      ? (
        <View style={styles.metaInlineTrack}>
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
        </View>
      ) : null;

  const stepTimeline = (
    <View style={styles.stepListCard}>
      {STRETCH_STEPS.map((step, index) => {
        const active = index === stepIndex && phase === "active";
        return (
          <View key={step.key} style={[styles.stepItem, active && styles.stepItemActive]}>
            <View style={styles.stepBadge}>
              <Text style={styles.stepBadgeText}>{index + 1}</Text>
            </View>
            <View style={styles.stepCopy}>
              <Text style={styles.stepTitle}>{step.label}</Text>
              <Text style={styles.stepMeta}>{step.hint}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );

  let modalTitle = "Estiramiento guiado";
  let modalSubtitle = "Desbloquea tension y comparte energia con tu planta.";
  let modalBody = (
    <>
      {metaTrack}
      {guideBlock}
      <View style={styles.section}>
        <Text style={styles.helper}>
          Son ~3 minutos divididos en cuatro tramos. Toca comenzar y sigue la guia.
        </Text>
      </View>
      {stepTimeline}
    </>
  );
  let modalFooter = (
    <View style={styles.footerStack}>
      <Pressable style={styles.primaryButton} onPress={beginSession}>
        <Text style={styles.primaryText}>Comenzar rutina</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={handleClose}>
        <Text style={styles.secondaryText}>Cerrar</Text>
      </Pressable>
    </View>
  );

  if (phase === "active") {
    modalTitle = "En movimiento";
    modalSubtitle = `Tramo ${stepIndex + 1} de ${STRETCH_STEPS.length}`;
    modalBody = (
      <>
        <View style={styles.section}>
          <View style={styles.activeCard}>
            <Text style={styles.stepLabel}>{currentStep.label}</Text>
            <Text style={styles.stepHint}>{currentStep.hint}</Text>
          </View>
          <Animated.View
            style={[
              styles.timerBadge,
              {
                transform: [
                  {
                    scale: Animated.interpolateNode
                      ? Animated.interpolateNode(progressAnim, {
                          inputRange: [0, 1],
                          outputRange: [1, 1.05],
                        })
                      : progressAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.05],
                        }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.timerText}>{timeLeft}s</Text>
          </Animated.View>
        </View>
      </>
    );
    modalFooter = (
      <View style={styles.footerStack}>
        <Pressable style={styles.primaryButton} onPress={handleSkip}>
          <Text style={styles.primaryText}>Siguiente tramo</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={handleFinish}>
          <Text style={styles.secondaryText}>Terminar aqui</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={handleClose}>
          <Text style={styles.secondaryText}>Cerrar</Text>
        </Pressable>
      </View>
    );
  } else if (phase === "done") {
    modalTitle = "Rutina completada";
    modalSubtitle = "Marca el ritual para reflejar Focus y Temperatura.";
    modalBody = (
      <>
        {metaTrack}
        {guideBlock}
        <View style={styles.section}>
          <Text style={styles.doneHint}>
            Puedes repetirla si necesitas liberar mas tension.
          </Text>
        </View>
        {stepTimeline}
      </>
    );
    modalFooter = (
      <View style={styles.footerStack}>
        <Pressable style={styles.primaryButton} onPress={handleComplete}>
          <Text style={styles.primaryText}>Sincronizar con la planta</Text>
        </Pressable>
        <Pressable style={styles.secondaryButton} onPress={handleClose}>
          <Text style={styles.secondaryText}>Cerrar</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <RitualModalLayout
      visible={visible}
      onClose={handleClose}
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
    backgroundColor: "rgba(64, 231, 200, 0.08)",
    borderWidth: 1,
    borderColor: "rgba(64, 231, 200, 0.35)",
    gap: Spacing.small,
    marginBottom: Spacing.small,
  },
  guidanceHidden: {
    marginBottom: 0,
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
  guidanceGroup: {
    gap: Spacing.tiny,
  },
  groupItem: {
    flexDirection: "row",
    gap: Spacing.tiny,
  },
  groupBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.ritualStretch,
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
    color: Colors.ritualStretch,
    fontWeight: "700",
  },
  section: {
    gap: Spacing.small,
  },
  helper: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  primaryButton: {
    borderRadius: Radii.pill,
    paddingVertical: Spacing.small,
    alignItems: "center",
    backgroundColor: Colors.ritualStretch,
  },
  primaryText: {
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
  stepLabel: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "600",
  },
  stepHint: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  timerBadge: {
    alignSelf: "center",
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
  },
  timerText: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "700",
  },
  activeCard: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    padding: Spacing.small,
    backgroundColor: "rgba(91,231,200,0.15)",
    marginBottom: Spacing.small,
    gap: 4,
  },
  doneHint: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  stepListCard: {
    gap: Spacing.tiny,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    borderRadius: Radii.lg,
    padding: Spacing.small,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: Colors.surfaceAlt,
  },
  stepItemActive: {
    borderColor: Colors.ritualStretch,
    backgroundColor: "rgba(91,231,200,0.15)",
  },
  stepBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(91,231,200,0.25)",
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
  stepTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  stepMeta: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});
