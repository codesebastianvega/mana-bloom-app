// [MB] Modulo: Planta / Seccion: Ritual Descanso de ojos
// Afecta: PlantScreen (rituales de bienestar)
// Proposito: Guiar micro descanso visual para sincronizar con la planta
// Puntos de edicion futura: Integrar vibracion o sonidos suaves
// Autor: Codex - Fecha: 2025-11-13

import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Spacing, Radii, Typography } from "../../theme";
import RitualModalLayout from "./RitualModalLayout";
import { ACTION_MECHANICS } from "./actionMechanics";

const DEFAULT_DURATION = 20;
const REST_MECHANIC = ACTION_MECHANICS.restEyes || {};

export default function RestEyesModal({ visible, onClose, onComplete, duration = DEFAULT_DURATION }) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [guideExpanded, setGuideExpanded] = useState(false);
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
      setGuideExpanded(false);
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

  const cadenceCopy = REST_MECHANIC.cadence || "Cada 30 minutos de pantalla";
  const summaryCopy =
    REST_MECHANIC.summary || "Aplica la regla 20-20-20: mira lejos, respira y deja que tus ojos descansen.";
  const cues = useMemo(
    () => (Array.isArray(REST_MECHANIC.cues) ? REST_MECHANIC.cues.slice(0, 2) : []),
    []
  );
  const tips = useMemo(
    () => (Array.isArray(REST_MECHANIC.tips) ? REST_MECHANIC.tips.slice(0, 2) : []),
    []
  );
  const stackCopy = Array.isArray(REST_MECHANIC.stack) ? REST_MECHANIC.stack[0] : null;
  const hasExtendedGuide = cues.length || tips.length || stackCopy;
  const metaEntries = [
    { icon: "eye", text: `${duration}s de descanso`, color: Colors.ritualCalm },
    cadenceCopy ? { icon: "redo-alt", text: cadenceCopy, color: Colors.ritualStretch } : null,
    REST_MECHANIC.cooldownMin
      ? { icon: "history", text: `${REST_MECHANIC.cooldownMin} min cooldown`, color: Colors.ritualHydrate }
      : null,
  ].filter(Boolean);

  const instructions = [
    "Mira un punto lejano por 20 segundos.",
    "Parpadea suavemente para humedecer los ojos.",
    "Cierra los ojos 5 segundos y respira profundo.",
  ];

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
        <Text style={styles.guidanceTitle}>Momento de descanso</Text>
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
      title="Descanso visual"
      subtitle="Cierra los ojos, respira y deja que la planta absorba calma."
      footer={
        <View style={styles.footerStack}>
          <Pressable style={styles.secondaryButton} onPress={handleClose}>
            <Text style={styles.secondaryText}>Cerrar</Text>
          </Pressable>
        </View>
      }
    >
      {metaTrack}
      {guidanceBlock}
      <View style={styles.restCard}>
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
        <View style={styles.checklist}>
          {instructions.map((label) => (
            <CheckItem key={label} label={label} />
          ))}
        </View>
      </View>
    </RitualModalLayout>
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
    backgroundColor: "rgba(91, 172, 231, 0.12)",
    borderWidth: 1,
    borderColor: "rgba(91, 172, 231, 0.35)",
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
    backgroundColor: Colors.ritualCalm,
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
    color: Colors.ritualCalm,
    fontWeight: "700",
  },
  restCard: {
    borderRadius: Radii.xl,
    padding: Spacing.large,
    backgroundColor: Colors.surfaceAlt,
    gap: Spacing.base,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },
  timerCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "rgba(255,255,255,0.25)",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.08)",
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
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.ritualCalm,
  },
  checkText: {
    ...Typography.body,
    color: Colors.text,
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
