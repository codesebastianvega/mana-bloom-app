
// [MB] Módulo: Planta / Sección: Ritual Sunlight
// Afecta: PlantScreen (rituales de bienestar)
// Propósito: Guiar pausas de luz natural para el usuario y la planta
// Puntos de edición futura: Integrar datos reales de clima y duración configurable
// Autor: Codex - Fecha: 2025-11-13

import React, { useEffect, useRef, useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet, Animated, Easing } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const DEFAULT_DURATION = 300; // 5 minutos

export default function SunlightModal({
  visible,
  duration = DEFAULT_DURATION,
  onClose,
  onComplete,
  climateHint,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [active, setActive] = useState(false);
  const timerRef = useRef(null);
  const glowAnim = useRef(new Animated.Value(0)).current;
  const glowLoopRef = useRef(null);

  useEffect(() => {
    if (!visible) {
      stopTimer();
      reset();
      stopGlow();
    }
  }, [visible]);

  useEffect(() => () => {
    stopTimer();
    stopGlow();
  }, []);

  const reset = () => {
    setActive(false);
    setTimeLeft(duration);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startTimer = () => {
    stopTimer();
    setActive(true);
    startGlow();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          setActive(false);
          stopGlow();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };
  const startGlow = () => {
    stopGlow();
    glowLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    glowLoopRef.current.start();
  };

  const stopGlow = () => {
    if (glowLoopRef.current) {
      glowLoopRef.current.stop();
      glowLoopRef.current = null;
    }
  };

  const handleComplete = () => {
    stopTimer();
    stopGlow();
    onComplete?.();
    reset();
  };

  const handleClose = () => {
    stopTimer();
    stopGlow();
    reset();
    onClose?.();
  };
  const handlePause = () => {
    stopTimer();
    stopGlow();
    setActive(false);
  };

  const formattedTime = formatSeconds(timeLeft);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Cargar luz</Text>
          <Text style={styles.subtitle}>
            Toma 5 minutos de sol suave o luz artificial cálida y transmítela a la planta.
          </Text>
          {climateHint ? <Text style={styles.climateHint}>{climateHint}</Text> : null}

          <Animated.View
            style={[
              styles.timerBadge,
              {
                shadowOpacity: glowAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.1, 0.35],
                }),
                transform: [
                  {
                    scale: glowAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.05],
                    }),
                  },
                ],
              },
            ]}
          >
            <Text style={styles.timerText}>{formattedTime}</Text>
          </Animated.View>

          <View style={styles.checklist}>
            <CheckItem label="Ubícate cerca de una ventana o lámpara." />
            <CheckItem label="Respira profundo y siente el calor en tu pecho." />
            <CheckItem label="Visualiza la luz fluyendo hacia la planta." />
          </View>

          {!active ? (
            <Pressable style={styles.primaryButton} onPress={startTimer}>
              <Text style={styles.primaryText}>Iniciar temporizador</Text>
            </Pressable>
          ) : (
            <Pressable style={styles.primaryButton} onPress={handlePause}>
              <Text style={styles.primaryText}>Pausar</Text>
            </Pressable>
          )}
          <Pressable
            style={[styles.completeButton, timeLeft > 0 && styles.completeButtonDisabled]}
            onPress={handleComplete}
            disabled={timeLeft > 0}
          >
            <Text style={styles.completeText}>
              {timeLeft > 0 ? "Completa los 5 min" : "Sincronizar con la planta"}
            </Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={handleClose}>
            <Text style={styles.secondaryText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

function CheckItem({ label }) {
  return (
    <View style={styles.checkItem}>
      <View style={styles.checkDot} />
      <Text style={styles.checkText}>{label}</Text>
    </View>
  );
}

function formatSeconds(total) {
  const minutes = Math.floor(total / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(total % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderTopLeftRadius: Radii.xl,
    borderTopRightRadius: Radii.xl,
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
  climateHint: {
    ...Typography.caption,
    color: Colors.text,
  },
  timerBadge: {
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
    shadowColor: Colors.ritualSun,
    shadowOpacity: 0,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
  },
  timerText: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "700",
  },
  checklist: {
    gap: Spacing.small,
  },
  checkItem: {
    flexDirection: "row",
    gap: Spacing.small,
    alignItems: "center",
  },
  checkDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.ritualSun,
  },
  checkText: {
    ...Typography.body,
    color: Colors.text,
  },
  primaryButton: {
    borderRadius: Radii.pill,
    paddingVertical: Spacing.small,
    alignItems: "center",
    backgroundColor: Colors.ritualSun,
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
