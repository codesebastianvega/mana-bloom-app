
// [MB] Módulo: Planta / Sección: Ritual Gratitud
// Afecta: PlantScreen (rituales de bienestar)
// Propósito: Sugerir mensajes de gratitud y abrir WhatsApp
// Puntos de edición futura: Persistir mensajes enviados y métricas
// Autor: Codex - Fecha: 2025-11-13

import React, { useEffect, useMemo, useRef, useState } from "react";
import { Modal, View, Text, Pressable, StyleSheet, Linking, Animated, Easing } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const SUGGESTIONS = [
  "Gracias por escucharme hoy. 💜",
  "Solo quería decirte que valoro tu presencia. 🌱",
  "Tu apoyo me ayuda a cuidar mi planta y mi ánimo. ✨",
];

export default function GratitudeModal({ visible, onClose, onComplete }) {
  const [suggestion, setSuggestion] = useState(SUGGESTIONS[0]);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setSuggestion(SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)]);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    }
  }, [visible, fadeAnim]);

  const handleSend = async () => {
    const encoded = encodeURIComponent(suggestion);
    const url = `whatsapp://send?text=${encoded}`;
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      }
    } catch (error) {
      console.warn("[MB] No se pudo abrir WhatsApp", error);
    }
  };

  const handleComplete = () => {
    onComplete?.();
  };

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Acto de gratitud</Text>
          <Text style={styles.subtitle}>
            Envía un mensaje corto para liberar energía positiva y compartirla con tu planta.
          </Text>
          <Animated.View style={[styles.suggestionBox, { opacity: fadeAnim }]}>
            <Text style={styles.suggestionText}>{suggestion}</Text>
          </Animated.View>
          <Pressable style={styles.primaryButton} onPress={handleSend}>
            <Text style={styles.primaryText}>Abrir WhatsApp</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={handleComplete}>
            <Text style={styles.secondaryText}>Ya lo envié</Text>
          </Pressable>
          <Pressable style={styles.tertiary} onPress={onClose}>
            <Text style={styles.tertiaryText}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
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
  suggestionBox: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    padding: Spacing.base,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  suggestionText: {
    ...Typography.body,
    color: Colors.text,
  },
  primaryButton: {
    borderRadius: Radii.pill,
    paddingVertical: Spacing.small,
    alignItems: "center",
    backgroundColor: Colors.ritualGratitude,
  },
  primaryText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  secondaryButton: {
    borderRadius: Radii.pill,
    paddingVertical: Spacing.small,
    alignItems: "center",
    backgroundColor: Colors.secondary,
  },
  secondaryText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  tertiary: {
    alignItems: "center",
    paddingVertical: Spacing.small,
  },
  tertiaryText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});
