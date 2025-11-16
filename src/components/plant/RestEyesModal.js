
// [MB] Módulo: Planta / Sección: Ritual Descanso de ojos
// Afecta: PlantScreen (rituales de bienestar)
// Propósito: Guiar micro descanso visual para sincronizar con la planta
// Puntos de edición futura: Integrar vibración o sonidos suaves
// Autor: Codex - Fecha: 2025-11-13

import React, { useEffect, useRef, useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet, Animated } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const DEFAULT_DURATION = 20;

export default function RestEyesModal({ visible, onClose, onComplete, duration = DEFAULT_DURATION }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const timerRef = useRef(null);
  const pulse = useRef(new Animated.Value(0)).current;
  const pulseLoopRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setTimeLeft(duration);
      startTimer();
      startPulse();
    } else {
      stopTimer();
      stopPulse();
    }
    return () => {
      stopTimer();
      stopPulse();
    };
  }, [visible, duration]);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          onComplete?.();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const startPulse = () => {
    stopPulse();
    pulse.setValue(0);
    pulseLoopRef.current = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    );
    pulseLoopRef.current.start();
  };

  const stopPulse = () => {
    if (pulseLoopRef.current) {
      pulseLoopRef.current.stop();
      pulseLoopRef.current = null;
    }
  };

  const handleClose = () => {
    stopTimer();
    setTimeLeft(duration);
    onClose?.();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Descanso visual</Text>
          <Text style={styles.subtitle}>Cierra los ojos, respira y deja que la planta absorba calma.</Text>
          <Animated.View
            style={[
              styles.timerCircle,
              {
                transform: [
                  {
                    scale: pulse.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.12],
                    }),
                  },
                ],
                opacity: pulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.8, 1],
                }),
              },
            ]}
          >
            <Text style={styles.timerText}>{timeLeft}s</Text>
          </Animated.View>
          <Pressable style={styles.secondaryButton} onPress={handleClose}>
            <Text style={styles.secondaryText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    padding: Spacing.base,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.xl,
    padding: Spacing.large,
    alignItems: "center",
    gap: Spacing.base,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
  },
  timerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  timerText: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "700",
  },
  secondaryButton: {
    alignItems: "center",
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.large,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  secondaryText: {
    ...Typography.body,
    color: Colors.text,
  },
});
