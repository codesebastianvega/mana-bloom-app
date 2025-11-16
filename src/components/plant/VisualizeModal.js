
// [MB] Módulo: Planta / Sección: Ritual Visualizar
// Afecta: PlantScreen (rituales de bienestar)
// Propósito: Registrar mini visiones/objetivos diarios conectados a la planta
// Puntos de edición futura: Persistir en Perfil y mostrar historial
// Autor: Codex - Fecha: 2025-11-13

import React, { useState, useEffect, useRef } from "react";
import { Modal, View, Text, Pressable, StyleSheet, TextInput, Animated, Easing } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const PROMPTS = [
  "¿Qué meta quieres alcanzar hoy?",
  "Describe cómo se ve tu mejor versión.",
  "¿Qué emoción quieres cultivar junto a la planta?",
];

export default function VisualizeModal({
  visible,
  onClose,
  onComplete,
  onSaveDraft,
  initialDraft = "",
}) {
  const [promptIndex, setPromptIndex] = useState(0);
  const [text, setText] = useState(initialDraft);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      setPromptIndex(Math.floor(Math.random() * PROMPTS.length));
      setText(initialDraft);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    } else {
      fadeAnim.setValue(0);
    }
  }, [visible, initialDraft, fadeAnim]);

  const handleComplete = () => {
    if (!text.trim()) return;
    onComplete?.(text.trim());
    setText("");
  };

  const handleClose = () => {
    if (text.trim()) {
      onSaveDraft?.(text);
    }
    onClose?.();
  };

  const prompt = PROMPTS[promptIndex] || PROMPTS[0];

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <Animated.View style={[styles.card, { opacity: fadeAnim }]}>
          <Text style={styles.title}>Visualizar</Text>
          <Text style={styles.subtitle}>Escribe una frase que conecte tu objetivo con la planta.</Text>
          <Animated.Text style={[styles.prompt, { opacity: fadeAnim }]}>
            {prompt}
          </Animated.Text>
          <TextInput
            style={styles.input}
            multiline
            placeholder="Describe tu visión..."
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={text}
            onChangeText={setText}
          />
          <Pressable style={[styles.primaryButton, !text.trim() && styles.primaryButtonDisabled]} onPress={handleComplete} disabled={!text.trim()}>
            <Text style={styles.primaryText}>Sincronizar visión</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={handleClose}>
            <Text style={styles.secondaryText}>Cerrar</Text>
          </Pressable>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.75)",
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
  prompt: {
    ...Typography.caption,
    color: Colors.text,
    opacity: 0.85,
  },
  input: {
    minHeight: 120,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    padding: Spacing.base,
    color: Colors.text,
    textAlignVertical: "top",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  primaryButton: {
    borderRadius: Radii.pill,
    paddingVertical: Spacing.small,
    alignItems: "center",
    backgroundColor: Colors.ritualFocus,
  },
  primaryButtonDisabled: {
    backgroundColor: "rgba(255,255,255,0.15)",
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
});
