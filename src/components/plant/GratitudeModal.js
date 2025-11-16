// [MB] Modulo: Planta / Seccion: Ritual Gratitud
// Afecta: PlantScreen (rituales de bienestar)
// Proposito: Sugerir mensajes de gratitud y abrir WhatsApp
// Puntos de edicion futura: Persistir mensajes enviados y metricas
// Autor: Codex - Fecha: 2025-11-13

import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Linking, Animated, Easing, ScrollView, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Spacing, Radii, Typography } from "../../theme";
import RitualModalLayout from "./RitualModalLayout";
import { ACTION_MECHANICS } from "./actionMechanics";

const SUGGESTIONS = [
  // Cortos (10)
  "Gracias por estar.",
  "Te admiro mucho.",
  "Pienso en ti con alegria.",
  "Siempre me inspiras.",
  "Tu apoyo es luz.",
  "Eres mi calma diaria.",
  "Aprecio tu energia.",
  "Tu mensaje me sostiene.",
  "Me contagias esperanza.",
  "Gracias por tu paciencia.",
  // Medios (5)
  "Hoy recorde que tus palabras me hacen sentir en casa, gracias por eso.",
  "Me alegre al pensar en ti, tu amistad usa el mismo brillo que mi planta.",
  "Gracias por motivarme incluso cuando no tengo fuerzas, lo noto y lo valoro.",
  "Solo queria agradecerte por creer en mis ideas, me impulsa cada dia.",
  "Tu presencia constante se siente como una sombra fresca en verano, gracias.",
  // Largos (5)
  "Queria decirte que tu forma de escucharme con calma hace que mi mente descanse y la planta respire mejor.",
  "Cada mensaje tuyo llega como luz de mañana; gracias por recordarme que no estoy sola en este camino.",
  "Agradezco lo que haces por mi aunque sea silencioso; esas pequeñas cosas nutren mi animo profundamente.",
  "Hoy decidi enviar este mensaje porque noto cuanto influyes en mi paz diaria, gracias por tu energia.",
  "Gracias por compartir tu tiempo, tus consejos y tu cariño; ayudan a que mis raices y las de la planta sigan firmes.",
];

const GRATITUDE_MECHANIC = ACTION_MECHANICS.gratitude || {};

export default function GratitudeModal({ visible, onClose, onComplete }) {
  const [suggestion, setSuggestion] = useState(SUGGESTIONS[0]);
  const [message, setMessage] = useState(SUGGESTIONS[0]);
  const [guideExpanded, setGuideExpanded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      const next = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
      setSuggestion(next);
      setMessage(next);
      fadeAnim.setValue(0);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();
    } else {
      setGuideExpanded(false);
    }
  }, [visible, fadeAnim]);

  const handleSend = async () => {
    const encoded = encodeURIComponent(message);
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

  const handleClose = () => {
    onClose?.();
  };

  const handleShuffle = () => {
    const next = SUGGESTIONS[Math.floor(Math.random() * SUGGESTIONS.length)];
    setSuggestion(next);
    setMessage(next);
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 400,
      easing: Easing.out(Easing.quad),
      useNativeDriver: true,
    }).start();
  };

  const cadenceCopy = GRATITUDE_MECHANIC.cadence || "1 mensaje al dia";
  const summaryCopy =
    GRATITUDE_MECHANIC.summary || "Compartir un mensaje sincero enciende tu estado de animo y el de la planta.";
  const cues = useMemo(
    () => (Array.isArray(GRATITUDE_MECHANIC.cues) ? GRATITUDE_MECHANIC.cues.slice(0, 2) : []),
    []
  );
  const tips = useMemo(
    () => (Array.isArray(GRATITUDE_MECHANIC.tips) ? GRATITUDE_MECHANIC.tips.slice(0, 2) : []),
    []
  );
  const stackCopy = Array.isArray(GRATITUDE_MECHANIC.stack) ? GRATITUDE_MECHANIC.stack[0] : null;
  const hasExtendedGuide = cues.length || tips.length || stackCopy;
  const metaEntries = [
    { icon: "heart", text: "Acto sencillo", color: Colors.ritualGratitude },
    cadenceCopy ? { icon: "redo-alt", text: cadenceCopy, color: Colors.ritualStretch } : null,
    GRATITUDE_MECHANIC.cooldownMin
      ? { icon: "history", text: `${GRATITUDE_MECHANIC.cooldownMin} min cooldown`, color: Colors.ritualHydrate }
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
        <Text style={styles.guidanceTitle}>Momento de gratitud</Text>
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
      title="Acto de gratitud"
      subtitle="Envia un mensaje corto para liberar energia positiva y compartirla con tu planta."
      footer={
        <View style={styles.footerStack}>
          <Pressable style={styles.primaryButton} onPress={handleSend}>
            <Text style={styles.primaryText}>Abrir WhatsApp</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={handleComplete}>
            <Text style={styles.secondaryText}>Ya lo envie</Text>
          </Pressable>
          <Pressable style={styles.tertiaryButton} onPress={handleClose}>
            <Text style={styles.tertiaryText}>Cerrar</Text>
          </Pressable>
        </View>
      }
    >
      {metaTrack}
      {guidanceBlock}
      <Animated.View style={[styles.suggestionBox, { opacity: fadeAnim }]}>
        <View style={styles.suggestionHeader}>
          <View style={styles.suggestionMeta}>
            <FontAwesome5 name="heart" size={14} color={Colors.ritualGratitude} />
            <Text style={styles.suggestionLabel}>Mensaje sugerido</Text>
          </View>
          <Pressable style={styles.shuffleButton} onPress={handleShuffle}>
            <Text style={styles.shuffleText}>Cambiar</Text>
          </Pressable>
        </View>
        <Text style={styles.suggestionHint}>
          Personaliza el texto antes de compartirlo.
        </Text>
        <TextInput
          style={styles.suggestionInput}
          multiline
          value={message}
          onChangeText={setMessage}
        />
      </Animated.View>
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
    backgroundColor: "rgba(255,155,176,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,155,176,0.4)",
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
    backgroundColor: Colors.ritualGratitude,
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
    color: Colors.ritualGratitude,
    fontWeight: "700",
  },
  footerStack: {
    gap: Spacing.small,
  },
  suggestionBox: {
    borderRadius: Radii.lg,
    padding: Spacing.base,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    gap: Spacing.small,
  },
  suggestionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  suggestionMeta: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  suggestionLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  suggestionHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  suggestionInput: {
    minHeight: 90,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    padding: Spacing.base,
    color: Colors.text,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  shuffleButton: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,155,176,0.2)",
  },
  shuffleText: {
    ...Typography.caption,
    color: Colors.ritualGratitude,
    fontWeight: "700",
  },
  primaryButton: {
    borderRadius: Radii.pill,
    paddingVertical: Spacing.small,
    alignItems: "center",
    backgroundColor: "rgba(255,155,176,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,155,176,0.5)",
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
    borderWidth: 1,
    borderColor: "rgba(255,155,176,0.5)",
  },
  secondaryText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  tertiaryButton: {
    alignItems: "center",
    paddingVertical: Spacing.small,
  },
  tertiaryText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});
