
// [MB] Módulo: Planta / Sección: Ritual Estirar
// Afecta: PlantScreen (rituales de bienestar)
// Propósito: Guiar mini rutina de estiramiento para conectar con la planta
// Puntos de edición futura: Animaciones y persistencia de progreso
// Autor: Codex - Fecha: 2025-11-13

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const STRETCH_STEPS = [
  { key: "neck", label: "Cuello", hint: "Inhala y gira la cabeza lentamente", duration: 10 },
  { key: "shoulders", label: "Hombros", hint: "Eleva y suelta los hombros en círculos", duration: 12 },
  { key: "arms", label: "Brazos", hint: "Extiende brazos y entrelaza manos por encima", duration: 12 },
  { key: "legs", label: "Piernas", hint: "Flexiona y toca puntas suavemente", duration: 15 },
];

export default function StretchModal({ visible, onClose, onComplete }) {
  const [phase, setPhase] = useState("intro"); // intro | active | done
  const [stepIndex, setStepIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(STRETCH_STEPS[0].duration);
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
    }
  }, [visible, stopTimer, resetState]);

  useEffect(() => () => stopTimer(), [stopTimer]);

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: stepIndex / Math.max(1, STRETCH_STEPS.length - 1),
      duration: 350,
      useNativeDriver: false,
    }).start();
  }, [stepIndex]);

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

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Estiramiento guiado</Text>
          <Text style={styles.subtitle}>Desbloquea tensión y comparte energía con tu planta.</Text>

          {phase === "intro" ? (
            <View style={styles.section}>
              <Text style={styles.helper}>
                Son ~3 minutos divididos en cuatro tramos. Toca comenzar y sigue la guía.
              </Text>
              <Pressable style={styles.primaryButton} onPress={beginSession}>
                <Text style={styles.primaryText}>Comenzar rutina</Text>
              </Pressable>
              <Pressable style={styles.secondaryButton} onPress={handleClose}>
                <Text style={styles.secondaryText}>Cerrar</Text>
              </Pressable>
            </View>
          ) : null}

          {phase === "active" ? (
            <View style={styles.section}>
              <Text style={styles.stepLabel}>{currentStep.label}</Text>
              <Text style={styles.stepHint}>{currentStep.hint}</Text>
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
              <Pressable style={styles.primaryButton} onPress={handleSkip}>
                <Text style={styles.primaryText}>Siguiente tramo</Text>
              </Pressable>
              <Pressable style={styles.secondaryButton} onPress={handleFinish}>
                <Text style={styles.secondaryText}>Terminar aquí</Text>
              </Pressable>
            </View>
          ) : null}

          {phase === "done" ? (
            <View style={styles.section}>
              <Text style={styles.doneTitle}>¡Rutina completada!</Text>
              <Text style={styles.doneHint}>
                Marca el ritual para reflejar el bonus de Focus y Temperatura en la planta.
              </Text>
              <Pressable style={styles.primaryButton} onPress={handleComplete}>
                <Text style={styles.primaryText}>Sincronizar con la planta</Text>
              </Pressable>
              <Pressable style={styles.secondaryButton} onPress={handleClose}>
                <Text style={styles.secondaryText}>Cerrar</Text>
              </Pressable>
            </View>
          ) : null}

          <View style={styles.stepList}>
            {STRETCH_STEPS.map((step, index) => {
              const active = index === stepIndex && phase === "active";
              return (
                <View key={step.key} style={styles.stepItem}>
                  <View style={[styles.dot, active && styles.dotActive]} />
                  <View style={styles.stepCopy}>
                    <Text style={styles.stepTitle}>{step.label}</Text>
                    <Text style={styles.stepMeta}>{step.hint}</Text>
                  </View>
                </View>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    padding: Spacing.base,
  },
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.xl,
    padding: Spacing.large,
    gap: Spacing.base,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
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
  doneTitle: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "700",
  },
  doneHint: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  stepList: {
    gap: Spacing.small,
  },
  stepItem: {
    flexDirection: "row",
    gap: Spacing.small,
    alignItems: "flex-start",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.border,
    marginTop: Spacing.tiny,
  },
  dotActive: {
    backgroundColor: Colors.ritualStretch,
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
