// [MB] Modulo: Planta / Seccion: Ritual Visualizar
// Afecta: PlantScreen (rituales de bienestar)
// Proposito: Registrar mini visiones/objetivos diarios conectados a la planta
// Puntos de edicion futura: Persistir en Perfil y mostrar historial
// Autor: Codex - Fecha: 2025-11-13

import React, { useState, useEffect, useRef, useMemo } from "react";
import { View, Text, Pressable, StyleSheet, TextInput, Animated, Easing, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Spacing, Radii, Typography } from "../../theme";
import RitualModalLayout from "./RitualModalLayout";
import { ACTION_MECHANICS } from "./actionMechanics";

const PROMPTS = [
  "Que meta quieres alcanzar hoy?",
  "Describe como se ve tu mejor version.",
  "Que emocion quieres cultivar junto a la planta?",
];

const VISUALIZE_MECHANIC = ACTION_MECHANICS.visualize || {};

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
  const [guideExpanded, setGuideExpanded] = useState(false);

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
      setGuideExpanded(false);
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
  const cadenceCopy = VISUALIZE_MECHANIC.cadence || "1 vez al dia";
  const summaryCopy =
    VISUALIZE_MECHANIC.summary ||
    "Describir tu meta en detalle conecta tu mente con la planta y refuerza el enfoque.";
  const cues = useMemo(
    () => (Array.isArray(VISUALIZE_MECHANIC.cues) ? VISUALIZE_MECHANIC.cues.slice(0, 2) : []),
    []
  );
  const tips = useMemo(
    () => (Array.isArray(VISUALIZE_MECHANIC.tips) ? VISUALIZE_MECHANIC.tips.slice(0, 2) : []),
    []
  );
  const stackCopy = Array.isArray(VISUALIZE_MECHANIC.stack) ? VISUALIZE_MECHANIC.stack[0] : null;
  const hasExtendedGuide = cues.length || tips.length || stackCopy;
  const metaEntries = [
    { icon: "pen-fancy", text: "1 frase consciente", color: Colors.ritualFocus },
    cadenceCopy ? { icon: "redo-alt", text: cadenceCopy, color: Colors.ritualStretch } : null,
    VISUALIZE_MECHANIC.cooldownMin
      ? { icon: "history", text: `${VISUALIZE_MECHANIC.cooldownMin} min cooldown`, color: Colors.ritualHydrate }
      : null,
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
    summaryCopy || hasExtendedGuide ? (
      <View style={[styles.guidance, !guideExpanded && !hasExtendedGuide && styles.guidanceTight]}>
        <Text style={styles.guidanceTitle}>Momento de vision</Text>
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

  return (
    <RitualModalLayout
      visible={visible}
      onClose={handleClose}
      title="Visualizar"
      subtitle="Escribe una frase que conecte tu objetivo con la planta."
      footer={
        <View style={styles.footerStack}>
          <Pressable
            style={[styles.primaryButton, !text.trim() && styles.primaryButtonDisabled]}
            onPress={handleComplete}
            disabled={!text.trim()}
          >
            <Text style={styles.primaryText}>Sincronizar vision</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={handleClose}>
            <Text style={styles.secondaryText}>Cerrar</Text>
          </Pressable>
        </View>
      }
    >
      {metaTrack}
      {guidanceBlock}
      <View style={styles.visionCard}>
        <Animated.Text style={[styles.prompt, { opacity: fadeAnim }]}>
          {prompt}
        </Animated.Text>
        <TextInput
          style={styles.input}
          multiline
          placeholder="Describe tu vision..."
          placeholderTextColor="rgba(255,255,255,0.4)"
          value={text}
          onChangeText={setText}
        />
      </View>
    </RitualModalLayout>
  );
}

const styles = StyleSheet.create({
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
    backgroundColor: "rgba(192,165,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(192,165,255,0.35)",
    gap: Spacing.small,
    marginBottom: Spacing.small,
  },
  guidanceTight: {
    paddingVertical: Spacing.tiny,
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
    alignItems: "flex-start",
    gap: Spacing.tiny,
  },
  groupBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.ritualFocus,
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
    color: Colors.ritualFocus,
    fontWeight: "700",
  },
  visionCard: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(255,255,255,0.04)",
    padding: Spacing.base,
    gap: Spacing.small,
  },
  footerStack: {
    gap: Spacing.small,
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
