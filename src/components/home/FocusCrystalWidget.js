// [MB] Modulo: Home / Seccion: ProductivitySpells (ex FocusCrystalWidget)
// Afecta: HomeScreen
// Proposito: Slider de hechizos de productividad con Cristal de Enfoque
// Puntos de edicion futura: permitir anclar/desanclar, cargar hechizos desde configuracion
// Autor: Codex - Fecha: 2025-11-27 (V7)

import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const FOCUS_ACCENT = "rgba(118,167,255,1)";

const PRESETS = [
  {
    id: "focus",
    title: "Profundo",
    label: "25m",
    seconds: 25 * 60,
    icon: "diamond-stone",
  },
  {
    id: "sprint",
    title: "Sprint",
    label: "15m",
    seconds: 15 * 60,
    icon: "diamond",
  },
  {
    id: "micro",
    title: "Micro",
    label: "5m",
    seconds: 5 * 60,
    icon: "rhombus",
  },
];

const SPELLS = [
  { id: "focus", name: "Cristal de Enfoque", type: "timer" },
  {
    id: "dragon",
    name: "Pulso del Dragon",
    type: "placeholder",
    description: "Sesiones 52/17 para misiones largas",
    icon: "fire",
  },
  {
    id: "mist",
    name: "Niebla Restauradora",
    type: "placeholder",
    description: "Descansos guiados y respiracion",
    icon: "weather-fog",
  },
];

const CRYSTAL_IMG = require("../../../assets/potions/critalmagico.png");

const formatTime = (secs = 0) => {
  const minutes = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secs % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export default function FocusCrystalWidget() {
  const [isActive, setIsActive] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [timeLeft, setTimeLeft] = useState(PRESETS[0].seconds);
  const [autoResume, setAutoResume] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const pulse = useRef(new Animated.Value(1)).current;
  const { width } = useWindowDimensions();
  const cardWidth = width - Spacing.base * 2;
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    let timer;
    if (isActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => Math.max(0, prev - 1));
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(autoResume);
      setHasStarted(true);
      setTimeLeft(selectedPreset.seconds);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, timeLeft, selectedPreset.seconds, autoResume]);

  useEffect(() => {
    if (!isActive) {
      pulse.stopAnimation();
      pulse.setValue(1);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.08,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [isActive, pulse]);

  const toggleTimer = () => {
    setHasStarted(true);
    setIsActive((prev) => !prev);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(selectedPreset.seconds);
    setHasStarted(false);
  };

  const selectPreset = (preset) => {
    setIsActive(false);
    setHasStarted(false);
    setSelectedPreset(preset);
    setTimeLeft(preset.seconds);
  };

  const progress =
    selectedPreset.seconds > 0 ? 1 - timeLeft / selectedPreset.seconds : 0;

  const statusText = isActive
    ? "En curso"
    : timeLeft === selectedPreset.seconds
    ? "Listo"
    : `Reanuda - queda ${formatTime(timeLeft)}`;

  const timerStyle = isActive
    ? styles.timerActive
    : timeLeft === selectedPreset.seconds
    ? styles.timer
    : styles.timerPaused;

  const handleMomentumEnd = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / cardWidth);
    setActiveSlide(index);
  };

  const renderPlaceholder = (spell) => (
    <LinearGradient
      colors={["rgba(129,104,255,0.25)", "rgba(79,46,143,0.4)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.placeholderHeader}>
        <MaterialCommunityIcons
          name={spell.icon}
          size={18}
          color={Colors.text}
        />
        <Text style={styles.title}>{spell.name}</Text>
      </View>
      <Text style={styles.placeholderDescription}>{spell.description}</Text>
      <Text style={styles.placeholderBadge}>Proximamente</Text>
      <Text style={styles.placeholderHint}>
        Se desbloquea desde Recursos &gt; Hechizos
      </Text>
    </LinearGradient>
  );

  const renderFocusSpell = () => (
    <View style={styles.card}>
      <View style={styles.titleRow}>
        <MaterialCommunityIcons
          name="diamond-stone"
          size={16}
          color={FOCUS_ACCENT}
        />
        <Text style={styles.title}>Cristal de Enfoque (Pomodoro)</Text>
      </View>
      <View style={styles.focusGrid}>
        <View style={styles.presetColumn}>
          {PRESETS.map((preset) => {
            const isSelected = preset.id === selectedPreset.id;
            return (
              <Pressable
                key={preset.id}
                onPress={() => selectPreset(preset)}
                style={[
                  styles.presetCard,
                  isSelected && styles.presetCardActive,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Seleccionar ${preset.label}`}
              >
                <View style={styles.presetHeader}>
                  <Text
                    style={[
                      styles.presetTitle,
                      isSelected && styles.presetTitleActive,
                    ]}
                  >
                    {preset.title}
                  </Text>
                  <Text
                    style={[
                      styles.presetTime,
                      isSelected && styles.presetTimeActive,
                    ]}
                  >
                    {preset.label}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>

        <LinearGradient
          colors={["rgba(118,167,255,0.35)", "rgba(66,40,120,0.85)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.crystalCard}
        >
          <Pressable
            onPress={toggleTimer}
            accessibilityRole="button"
            accessibilityLabel={isActive ? "Pausar sesion" : "Iniciar sesion"}
            style={styles.crystalAction}
          >
            <Animated.View
              style={[
                styles.crystalRect,
                {
                  transform: [{ scale: pulse }],
                  borderColor: isActive
                    ? FOCUS_ACCENT
                    : "rgba(255,255,255,0.25)",
                },
              ]}
            >
              <LinearGradient
                colors={["rgba(118,167,255,0.35)", "rgba(118,167,255,0.1)"]}
                style={styles.crystalGlowRect}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                pointerEvents="none"
              />
              <Image
                source={CRYSTAL_IMG}
                style={styles.crystalImage}
                resizeMode="contain"
              />
            </Animated.View>
          </Pressable>
        </LinearGradient>
      </View>

      <View style={styles.timerRow}>
        <Text style={[styles.timer, timerStyle]}>{formatTime(timeLeft)}</Text>
        <Text style={styles.crystalHint}>
          {isActive
            ? "Presiona el cristal para pausar"
            : "Presiona el cristal para iniciar"}
        </Text>
      </View>

      {(hasStarted || isActive) && (
        <View style={styles.autoRow}>
          <View style={styles.autoTopRow}>
            <Pressable
              onPress={() => setAutoResume((prev) => !prev)}
              accessibilityRole="button"
              accessibilityLabel="Alternar auto-reanudar"
              style={[styles.autoButton, autoResume && styles.autoButtonActive]}
            >
              <MaterialCommunityIcons
                name="infinity"
                size={14}
                color={autoResume ? FOCUS_ACCENT : Colors.textMuted}
              />
              <Text style={styles.autoLabel}>Auto-reanudar</Text>
            </Pressable>
            <Pressable
              onPress={resetTimer}
              accessibilityRole="button"
              accessibilityLabel="Reiniciar temporizador"
              style={styles.autoResetChip}
            >
              <MaterialCommunityIcons
                name="restart"
                size={14}
                color={Colors.danger}
              />
              <Text style={styles.autoResetText}>Reiniciar</Text>
            </Pressable>
          </View>
          <LinearGradient
            colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.05)"]}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 1, y: 0.5 }}
            style={styles.progressTrack}
          >
            <View
              style={[styles.progressFill, { width: `${progress * 100}%` }]}
            />
          </LinearGradient>
          <Text style={styles.autoHint}>
            {isActive ? "Sesion en curso" : statusText}
          </Text>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.sliderWrapper}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: Spacing.base }}
        onMomentumScrollEnd={handleMomentumEnd}
      >
        {SPELLS.map((spell) => (
          <View key={spell.id} style={[styles.slide, { width: cardWidth }]}>
            {spell.id === "focus"
              ? renderFocusSpell()
              : renderPlaceholder(spell)}
          </View>
        ))}
      </ScrollView>
      <View style={styles.dotsRow}>
        {SPELLS.map((spell, index) => (
          <View
            key={spell.id}
            style={[styles.dot, index === activeSlide && styles.dotActive]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sliderWrapper: {
    width: "100%",
    marginLeft: -Spacing.tiny,
  },
  slide: {
    paddingRight: 8,
    marginLeft: -15,
    marginRight: 16,
  },
  card: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: "rgba(102,94,255,0.45)",
    padding: Spacing.base,
    shadowColor: Colors.primary,
    shadowOpacity: 0.14,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    marginBottom: Spacing.base,
  },
  title: {
    ...Typography.cardTitle,
    color: Colors.text,
    fontWeight: "700",
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginBottom: Spacing.tiny,
  },
  focusGrid: {
    flexDirection: "row",
    gap: Spacing.small,
    alignItems: "stretch",
  },
  presetColumn: {
    flexDirection: "column",
    gap: Spacing.tiny,
    width: "42%",
    flexGrow: 0,
    flexShrink: 0,
  },
  presetCard: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny + 2,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    minHeight: 35,
    justifyContent: "center",
    flex: 1,
  },
  presetCardActive: {
    borderColor: FOCUS_ACCENT,
    backgroundColor: "rgba(118,167,255,0.18)",
  },
  presetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  presetTitle: {
    ...Typography.micro,
    color: Colors.textMuted,
  },
  presetTitleActive: {
    color: FOCUS_ACCENT,
  },
  presetTime: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "800",
    marginTop: 2,
  },
  presetTimeActive: {
    color: FOCUS_ACCENT,
  },
  presetReset: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.tiny,
    paddingVertical: Spacing.tiny + 2,
    backgroundColor: Colors.surfaceAlt,
  },
  presetResetText: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "700",
  },
  timerRow: {
    marginTop: Spacing.small,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.large + 2,
    paddingVertical: Spacing.tiny + 2,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  crystalCard: {
    flex: 1,
    borderRadius: Radii.xl,
    padding: Spacing.base,
    minWidth: 0,
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  crystalHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  crystalHint: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.8)",
  },
  crystalAction: {
    alignItems: "center",
    justifyContent: "center",
  },
  crystalRect: {
    width: "100%",
    borderRadius: Radii.lg,
    borderWidth: 1,
    height: 88,
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  crystalGlowRect: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
  },
  crystalImage: {
    width: 90,
    height: 90,
    opacity: 0.95,
  },
  progressTrack: {
    height: 15,
    width: "100%",
    borderRadius: Radii.pill,
    overflow: "hidden",
    backgroundColor: "rgba(255,255,255,0.08)",
    marginTop: Spacing.tiny,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "rgba(118,167,255,0.95)",
  },
  autoRow: {
    marginTop: Spacing.small,
    gap: Spacing.tiny,
  },
  autoTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  autoLabel: {
    ...Typography.micro,
    color: Colors.text,
    fontWeight: "700",
  },
  autoHint: {
    ...Typography.micro,
    color: Colors.textMuted,
  },
  autoButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny + 2,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    flex: 1,
  },
  autoButtonActive: {
    borderColor: FOCUS_ACCENT,
    backgroundColor: "rgba(118,167,255,0.18)",
  },
  autoResetChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small - 2,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  autoResetText: {
    ...Typography.micro,
    color: Colors.textMuted,
    fontWeight: "700",
  },
  sliderWrapper: {
    width: "100%",
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: Spacing.tiny,
    marginTop: Spacing.small,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "rgba(255,255,255,0.25)",
  },
  dotActive: {
    backgroundColor: FOCUS_ACCENT,
    width: 16,
  },
  placeholderHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginBottom: Spacing.small,
  },
  placeholderDescription: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: Spacing.small,
  },
  placeholderHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  placeholderBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.small,
    paddingVertical: 2,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    color: Colors.text,
    ...Typography.micro,
  },
  timer: {
    ...Typography.h1,
    color: Colors.text,
    fontWeight: "800",
    fontVariant: ["tabular-nums"],
  },
  timerActive: {
    color: FOCUS_ACCENT,
  },
  timerPaused: {
    color: Colors.textMuted,
  },
});
