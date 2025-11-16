
// [MB] Módulo: Planta / Sección: Ritual Hidratar
// Afecta: PlantScreen (rituales de bienestar)
// Propósito: Contar vasos de agua diarios y conectar con la planta
// Puntos de edición futura: Persistir conteo y sincronizar con Perfil
// Autor: Codex - Fecha: 2025-11-13

import React, { useEffect, useRef } from "react";
import { Modal, View, Text, Pressable, StyleSheet, Animated, Easing } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default function HydrateModal({
  visible,
  goal = 8,
  count = 0,
  onIncrement,
  onComplete,
  onClose,
}) {
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

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Hidratarme</Text>
          <Text style={styles.subtitle}>
            Registra cada vaso para cuidar tu cuerpo y darle humedad a la planta.
          </Text>

          <View style={styles.progressSection}>
            <Text style={styles.progressLabel}>
              Vasos {count}/{goal}
            </Text>
            <View style={styles.progressTrack}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progressAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: ["0%", "100%"],
                    }),
                  },
                ]}
              />
            </View>
            <Text style={styles.progressHint}>
              {remaining > 0 ? `Faltan ${remaining} vasos hoy` : "Meta diaria completada"}
            </Text>
          </View>

          <View style={styles.glassGrid}>
            {Array.from({ length: goal }).map((_, index) => {
              const filled = index < count;
              return (
                <View
                  key={`glass-${index}`}
                  style={[styles.glass, filled && styles.glassFilled]}
                  accessibilityLabel={`Vaso ${index + 1} ${filled ? "completo" : "pendiente"}`}
                />
              );
            })}
          </View>

          <Pressable
            style={[styles.primaryButton, !canIncrement && styles.primaryButtonDisabled]}
            onPress={onIncrement}
            disabled={!canIncrement}
          >
            <Text style={styles.primaryText}>
              {canIncrement ? "Tomé un vaso" : "Meta alcanzada"}
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
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: Colors.surfaceElevated,
    padding: Spacing.large,
    borderTopLeftRadius: Radii.xl,
    borderTopRightRadius: Radii.xl,
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
  progressSection: {
    gap: Spacing.tiny,
  },
  progressLabel: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  progressTrack: {
    height: 10,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.ritualHydrate,
    borderRadius: Radii.pill,
  },
  progressHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  glassGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
    justifyContent: "space-between",
  },
  glass: {
    width: "11%",
    aspectRatio: 1 / 2,
    minWidth: 26,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    backgroundColor: "transparent",
  },
  glassFilled: {
    backgroundColor: Colors.ritualHydrate,
    borderColor: Colors.ritualHydrate,
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
