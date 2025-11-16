// [MB] Modulo: Planta / Seccion: Ritual Sunlight
// Afecta: PlantScreen (rituales de bienestar)
// Proposito: Guiar pausas de luz natural para el usuario y la planta
// Puntos de edicion futura: Integrar datos reales de clima y duracion configurable
// Autor: Codex - Fecha: 2025-11-13

import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Pressable, StyleSheet, Animated, Easing, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Spacing, Radii, Typography } from "../../theme";
import RitualModalLayout from "./RitualModalLayout";
import { ACTION_MECHANICS } from "./actionMechanics";

const DEFAULT_DURATION = 300; // 5 minutos
const SUNLIGHT_MECHANIC = ACTION_MECHANICS.sunlight || {};

export default function SunlightModal({
  visible,
  duration = DEFAULT_DURATION,
  onClose,
  onComplete,
  climateHint,
}) {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [active, setActive] = useState(false);
  const [guideExpanded, setGuideExpanded] = useState(false);
  const timerRef = useRef(null);
  const glowAnim = useRef(new Animated.Value(0)).current;
  const glowLoopRef = useRef(null);

  useEffect(() => {
    if (!visible) {
      stopTimer();
      stopGlow();
      reset();
      setGuideExpanded(false);
    }
  }, [visible]);

  useEffect(
    () => () => {
      stopTimer();
      stopGlow();
    },
    []
  );

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

  const summaryCopy =
    SUNLIGHT_MECHANIC.summary ||
    "Busca luz suave, deja que caliente tu pecho y regala ese brillo a la planta.";
  const cadenceCopy = SUNLIGHT_MECHANIC.cadence || "2 veces al dia";
  const cues = useMemo(
    () => (Array.isArray(SUNLIGHT_MECHANIC.cues) ? SUNLIGHT_MECHANIC.cues.slice(0, 2) : []),
    []
  );
  const tips = useMemo(
    () => (Array.isArray(SUNLIGHT_MECHANIC.tips) ? SUNLIGHT_MECHANIC.tips.slice(0, 2) : []),
    []
  );
  const stackCopy = Array.isArray(SUNLIGHT_MECHANIC.stack) ? SUNLIGHT_MECHANIC.stack[0] : null;
  const hasExtendedGuide = cues.length || tips.length || stackCopy;

  const metaEntries = [
    { icon: "sun", text: `${Math.round(duration / 60)} min de luz` },
    cadenceCopy ? { icon: "redo-alt", text: cadenceCopy } : null,
    SUNLIGHT_MECHANIC.cooldownMin
      ? { icon: "history", text: `${SUNLIGHT_MECHANIC.cooldownMin} min cooldown` }
      : null,
  ]
    .filter(Boolean)
    .map((entry, index) => ({
      ...entry,
      color:
        [Colors.ritualSun, Colors.ritualStretch, Colors.ritualHydrate, Colors.ritualCalm][
          index % 4
        ],
    }));

  const formattedTime = formatSeconds(timeLeft);

  const metaTrack =
    !active && metaEntries.length ? (
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
    !active && (summaryCopy || hasExtendedGuide) ? (
      <View style={[styles.guidance, !guideExpanded && !hasExtendedGuide && styles.guidanceTight]}>
        <Text style={styles.guidanceTitle}>Momento de luz</Text>
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
      title="Cargar luz"
      subtitle="Toma 5 minutos de sol suave o luz artificial cálida y compártela con la planta."
      footer={
        <View style={styles.buttonStack}>
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
      }
    >
      {metaTrack}
      {guidanceBlock}
      {climateHint ? <Text style={styles.climateHint}>{climateHint}</Text> : null}
      <View style={styles.sunCard}>
        <Animated.View
          style={[
            styles.timerBadge,
            {
              shadowOpacity: glowAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.45],
              }),
              transform: [
                {
                  scale: glowAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.04],
                  }),
                },
              ],
            },
          ]}
        >
          <Text style={styles.timerText}>{formattedTime}</Text>
        </Animated.View>
        <Text style={styles.sunCardHint}>
          Mantente cerca de luz suave y deja que el calor recorra tus manos.
        </Text>
        <View style={styles.checklist}>
          <CheckItem label="Ubícate cerca de una ventana o lámpara." />
          <CheckItem label="Respira profundo y siente el calor en tu pecho." />
          <CheckItem label="Visualiza la luz fluyendo hacia la planta." />
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
  buttonStack: {
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
    backgroundColor: "rgba(245,195,92,0.08)",
    borderWidth: 1,
    borderColor: "rgba(245,195,92,0.35)",
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
    gap: Spacing.tiny,
    alignItems: "flex-start",
  },
  groupBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.ritualSun,
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
    color: Colors.ritualSun,
    fontWeight: "700",
  },
  climateHint: {
    ...Typography.caption,
    color: Colors.text,
    marginBottom: Spacing.small,
  },
  sunCard: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: "rgba(245,195,92,0.35)",
    backgroundColor: "rgba(245,195,92,0.08)",
    padding: Spacing.base,
    gap: Spacing.small,
  },
  sunCardHint: {
    ...Typography.body,
    color: Colors.text,
    textAlign: "center",
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
