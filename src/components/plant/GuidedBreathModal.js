// [MB] Modulo: Planta / Seccion: Respiracion guiada
// Afecta: PlantScreen
// Proposito: Guiar una meditacion corta que otorga XP al completarse
// Puntos de edicion futura: Integrar audio, animaciones y duraciones configurables
// Autor: Codex - Fecha: 2025-10-22

import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

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

  const stopTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

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
    }
  }, [visible, resetState, stopTimer]);

  useEffect(() => stopTimer, [stopTimer]);

  const handleStart = useCallback(() => {
    beginSession();
  }, [beginSession]);

  const handleCancel = useCallback(() => {
    stopTimer();
    resetState();
    onClose?.();
  }, [onClose, resetState, stopTimer]);

  const handleFinish = useCallback(() => {
    stopTimer();
    resetState();
    onComplete?.();
  }, [onComplete, resetState, stopTimer]);

  const currentStep = useMemo(() => BREATH_STEPS[stepIndex], [stepIndex]);
  const displayCycle = Math.min(cycleIndex + (phase === "done" ? 0 : 1), cycles);

  if (!visible) {
    return null;
  }

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={handleCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          {phase === "intro" && (
            <>
              <Text style={styles.title}>Meditacion guiada</Text>
              <Text style={styles.subtitle}>
                Completa {cycles} ciclos para ganar +30 XP y calmar a tu planta.
              </Text>
              <View style={styles.stepList}>
                {BREATH_STEPS.map((step) => (
                  <View key={step.key} style={styles.stepItem}>
                    <View style={styles.stepDot} />
                    <View style={styles.stepCopy}>
                      <Text style={styles.stepLabel}>{step.label}</Text>
                      <Text style={styles.stepHint}>{step.hint}</Text>
                    </View>
                  </View>
                ))}
              </View>
              <Pressable style={styles.primaryButton} onPress={handleStart}>
                <Text style={styles.primaryButtonText}>Comenzar 3 ciclos</Text>
              </Pressable>
              <Pressable style={styles.secondaryButton} onPress={handleCancel}>
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </Pressable>
            </>
          )}

          {phase === "active" && (
            <>
              <Text style={styles.title}>Respira</Text>
              <Text style={styles.subtitle}>
                Ciclo {displayCycle} de {cycles}
              </Text>
              <View style={styles.timerBadgeWrapper}>
                <View style={styles.timerBadgeOuter}>
                  <View style={styles.timerBadgeInner}>
                    <Text style={styles.timerText}>{timeLeft}s</Text>
                  </View>
                  <View style={styles.timerRing} />
                </View>
              </View>
              <Text style={styles.currentStep}>{currentStep.label}</Text>
              <Text style={styles.currentHint}>{currentStep.hint}</Text>
              <View style={styles.stepDotsRow}>
                {BREATH_STEPS.map((step, idx) => (
                  <View
                    key={step.key}
                    style={[
                      styles.dot,
                      idx === stepIndex && styles.dotActive,
                    ]}
                  />
                ))}
              </View>
              <Pressable style={styles.secondaryButton} onPress={handleCancel}>
                <Text style={styles.secondaryButtonText}>Cancelar</Text>
              </Pressable>
            </>
          )}

          {phase === "done" && (
            <>
              <Text style={styles.title}>Respiracion completada</Text>
              <Text style={styles.subtitle}>+30 XP listos para tu planta</Text>
              <Pressable style={styles.primaryButton} onPress={handleFinish}>
                <Text style={styles.primaryButtonText}>Reclamar XP</Text>
              </Pressable>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: withAlpha(Colors.background, 0.88),
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.large,
  },
  card: {
    width: "100%",
    maxWidth: 360,
    borderRadius: Radii.xl,
    backgroundColor: Colors.surfaceElevated,
    padding: Spacing.large,
    gap: Spacing.base,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: "center",
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
  },
  stepList: {
    marginTop: Spacing.base,
    gap: Spacing.small,
  },
  stepItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.small,
  },
  stepDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.primary,
    marginTop: Spacing.tiny,
  },
  stepCopy: {
    flex: 1,
    gap: 2,
  },
  stepLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  stepHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  primaryButton: {
    marginTop: Spacing.base,
    backgroundColor: Colors.accent,
    borderRadius: Radii.pill,
    paddingVertical: Spacing.small,
    alignItems: "center",
  },
  primaryButtonText: {
    ...Typography.body,
    color: Colors.onAccent,
    fontWeight: "700",
  },
  secondaryButton: {
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.small,
    alignItems: "center",
  },
  secondaryButtonText: {
    ...Typography.body,
    color: Colors.textMuted,
    fontWeight: "600",
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
    backgroundColor: withAlpha(Colors.secondary, 0.22),
  },
  timerRing: {
    position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: withAlpha(Colors.secondary, 0.35),
    opacity: 0.9,
  },
  timerBadgeInner: {
    width: 88,
    height: 88,
    borderRadius: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: withAlpha(Colors.surfaceAlt, 0.85),
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.35),
  },
  timerText: {
    ...Typography.title,
    color: Colors.text,
    fontVariant: ["tabular-nums"],
  },
  currentStep: {
    ...Typography.title,
    color: Colors.text,
    textAlign: "center",
  },
  currentHint: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
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
    backgroundColor: Colors.secondary,
  },
});
