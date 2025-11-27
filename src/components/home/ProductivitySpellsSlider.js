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
const DRAGON_ACCENT = "#FF9F45";

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

const DRAGON_CONFIG = {
  focusDuration: 52 * 60,
  breakDuration: 17 * 60,
  waveGoal: 3,
};

const SPELLS = [
  {
    id: "focus",
    name: "Cristal de Enfoque",
    type: "timer",
    description:
      "Pomodoro adaptable con presets 25/15/5 para sesiones rápidas.",
  },
  {
    id: "dragon",
    name: "Pulso del Dragon",
    type: "dragon",
    description: "Sesiones 52/17 para misiones largas sin interrupciones.",
    icon: "fire",
  },
];

const CRYSTAL_IMG = require("../../../assets/potions/critalmagico.png");
const DRAGON_EGG_IMG = require("../../../assets/easter eggs/Huevo de Dragón.png");

const formatTime = (secs = 0) => {
  const minutes = Math.floor(secs / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (secs % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export default function ProductivitySpellsSlider() {
  const [isActive, setIsActive] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(PRESETS[0]);
  const [timeLeft, setTimeLeft] = useState(PRESETS[0].seconds);
  const [autoResume, setAutoResume] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const pulse = useRef(new Animated.Value(1)).current;
  const { width } = useWindowDimensions();
  const cardWidth = width - Spacing.base * 2;
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragonPhase, setDragonPhase] = useState("focus");
  const [dragonIsActive, setDragonIsActive] = useState(false);
  const [dragonTimeLeft, setDragonTimeLeft] = useState(
    DRAGON_CONFIG.focusDuration
  );
  const [dragonWaves, setDragonWaves] = useState(0);
  const [dragonAutoChain, setDragonAutoChain] = useState(true);
  const [dragonHasStarted, setDragonHasStarted] = useState(false);
  const dragonFlame = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const shouldAnimate = dragonIsActive || dragonHasStarted;
    if (!shouldAnimate) {
      dragonFlame.stopAnimation();
      dragonFlame.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(dragonFlame, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(dragonFlame, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [dragonIsActive, dragonHasStarted, dragonFlame]);

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

  useEffect(() => {
    if (!dragonIsActive) {
      return;
    }
    const tick = setInterval(() => {
      setDragonTimeLeft((prev) => {
        if (prev <= 1) {
          handleDragonPhaseComplete();
          return prev;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(tick);
  }, [dragonIsActive, dragonPhase]);

  const handleDragonPhaseComplete = () => {
    if (dragonPhase === "focus") {
      setDragonPhase("break");
      setDragonTimeLeft(DRAGON_CONFIG.breakDuration);
      return;
    }

    setDragonWaves((prev) => prev + 1);
    setDragonPhase("focus");
    setDragonTimeLeft(DRAGON_CONFIG.focusDuration);
    if (!dragonAutoChain) {
      setDragonIsActive(false);
    }
  };

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

  const activeSpell = SPELLS[activeSlide] || SPELLS[0];

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
                  styles.spellChip,
                  styles.spellChipGhost,
                  styles.presetChip,
                  isSelected && styles.spellChipFocus,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Seleccionar ${preset.label}`}
              >
                <Text
                  style={[
                    styles.spellChipLabel,
                    isSelected && styles.spellChipLabelActive,
                  ]}
                >
                  {preset.title}
                </Text>
                <Text
                  style={[
                    styles.spellChipMeta,
                    isSelected && styles.spellChipLabelActive,
                  ]}
                >
                  {preset.label}
                </Text>
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

      <LinearGradient
        colors={["rgba(118,167,255,0.2)", "rgba(66,40,120,0.6)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.timerRow}
      >
        <Text style={[styles.timer, timerStyle]}>{formatTime(timeLeft)}</Text>
        <Text style={styles.crystalHint}>
          {isActive
            ? "Presiona el cristal para pausar"
            : "Presiona el cristal para iniciar"}
        </Text>
      </LinearGradient>

      {(hasStarted || isActive) && (
        <View style={styles.autoRow}>
          <View style={styles.autoTopRow}>
            <Pressable
              onPress={() => setAutoResume((prev) => !prev)}
              accessibilityRole="button"
              accessibilityLabel="Alternar auto-reanudar"
              style={[
                styles.spellChip,
                styles.spellChipGhost,
                autoResume && styles.spellChipFocus,
              ]}
            >
              <MaterialCommunityIcons
                name={autoResume ? "infinity" : "shuffle-disabled"}
                size={14}
                color={autoResume ? FOCUS_ACCENT : Colors.textMuted}
              />
              <Text style={styles.autoLabel}>
                {autoResume ? "Auto-reanudar" : "Manual"}
              </Text>
            </Pressable>
            <Pressable
              onPress={resetTimer}
              accessibilityRole="button"
              accessibilityLabel="Reiniciar temporizador"
              style={[
                styles.spellChip,
                styles.spellChipGhost,
                styles.spellChipDanger,
              ]}
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

  const toggleDragon = () => {
    if (!dragonIsActive) {
      const duration =
        dragonPhase === "focus"
          ? DRAGON_CONFIG.focusDuration
          : DRAGON_CONFIG.breakDuration;
      if (dragonTimeLeft === 0) {
        setDragonTimeLeft(duration);
      }
      setDragonHasStarted(true);
      setDragonIsActive(true);
      return;
    }
    setDragonIsActive(false);
  };

  const skipDragonPhase = () => {
    if (dragonPhase === "focus") {
      setDragonPhase("break");
      setDragonTimeLeft(DRAGON_CONFIG.breakDuration);
      return;
    }
    setDragonPhase("focus");
    setDragonTimeLeft(DRAGON_CONFIG.focusDuration);
    if (!dragonAutoChain) {
      setDragonIsActive(false);
    }
  };

  const renderDragonSpell = () => {
    const phaseDuration =
      dragonPhase === "focus"
        ? DRAGON_CONFIG.focusDuration
        : DRAGON_CONFIG.breakDuration;
    const dragonProgress =
      phaseDuration > 0 ? 1 - dragonTimeLeft / phaseDuration : 0;
    const waveProgress = Math.min(dragonWaves / DRAGON_CONFIG.waveGoal, 1);
    const dragonHint = dragonIsActive
      ? "Presiona la llama para pausar"
      : "Presiona la llama para iniciar";
    const showDragonDetails =
      dragonHasStarted || dragonIsActive || dragonWaves > 0;
    const dragonActionCopy = dragonIsActive
      ? "Pausa consciente"
      : "Despierta al dragon";
    const dragonModeCopy =
      dragonPhase === "focus"
        ? {
            label: "Ir a descanso",
            helper: "Usa la pausa para recuperar energía.",
          }
        : {
            label: "Ir a foco",
            helper: "Activa concentración profunda.",
          };

    return (
      <LinearGradient
        colors={["rgba(255,154,80,0.25)", "rgba(75,16,16,0.9)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.card, styles.dragonCard]}
      >
        <View style={styles.dragonHeader}>
          <View style={{ flex: 1 }}>
            <View style={styles.titleRow}>
              <MaterialCommunityIcons
                name="fire"
                size={18}
                color={DRAGON_ACCENT}
              />
              <Text style={styles.title}>Pulso del Dragon 52/17</Text>
            </View>
          </View>
          <View style={[styles.sectionProChip, styles.dragonPhasePill]}>
            <Text style={styles.sectionProText}>
              {dragonPhase === "focus" ? "Fase Foco" : "Fase Renacer"}
            </Text>
          </View>
        </View>

        <View style={styles.dragonActionRow}>
          <View style={styles.dragonControlColumn}>
            <Pressable
              onPress={skipDragonPhase}
              accessibilityRole="button"
              accessibilityLabel="Cambiar modo del Pulso"
              style={[styles.spellChip, styles.spellChipGhost]}
            >
              <MaterialCommunityIcons
                name="swap-horizontal"
                size={16}
                color={Colors.text}
              />
              <View style={styles.spellChipTextBlock}>
                <Text style={styles.dragonControlGhostLabel}>
                  {dragonModeCopy.label}
                </Text>
                <Text style={styles.dragonModeHelper}>
                  {dragonModeCopy.helper}
                </Text>
              </View>
            </Pressable>
            {showDragonDetails && (
              <Pressable
                onPress={toggleDragon}
                accessibilityRole="button"
                accessibilityLabel={
                  dragonIsActive
                    ? "Pausar Pulso del Dragon"
                    : "Iniciar Pulso del Dragon"
                }
                style={[
                  styles.spellChip,
                  styles.spellChipGhost,
                  styles.spellChipDragon,
                  dragonIsActive && styles.spellChipDragonActive,
                ]}
              >
                <MaterialCommunityIcons
                  name={dragonIsActive ? "pause" : "play"}
                  size={16}
                  color={dragonIsActive ? Colors.text : DRAGON_ACCENT}
                />
                <Text
                  style={[
                    styles.dragonControlLabel,
                    dragonIsActive && styles.dragonControlLabelActive,
                  ]}
                >
                  {dragonActionCopy}
                </Text>
              </Pressable>
            )}
          </View>
          <LinearGradient
            colors={["rgba(255,154,80,0.35)", "rgba(120,35,5,0.9)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.dragonFlameCard}
          >
            <Pressable
              onPress={toggleDragon}
              accessibilityRole="button"
              accessibilityLabel={
                dragonIsActive
                  ? "Pausar Pulso del Dragon"
                  : "Iniciar Pulso del Dragon"
              }
              style={styles.crystalAction}
            >
              <Animated.View
                style={[
                  styles.dragonFlameRect,
                  {
                    borderColor: dragonIsActive
                      ? DRAGON_ACCENT
                      : "rgba(255,255,255,0.25)",
                    transform: [
                      {
                        scale: dragonFlame.interpolate({
                          inputRange: [0, 1],
                          outputRange: [1, 1.06],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <LinearGradient
                  colors={["rgba(255,154,80,0.4)", "rgba(255,154,80,0.1)"]}
                  style={styles.dragonFlameGlowRect}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  pointerEvents="none"
                />
                <Animated.View
                  style={[
                    styles.dragonFlamePulse,
                    {
                      opacity: dragonFlame.interpolate({
                        inputRange: [0, 1],
                        outputRange: [0.4, 0.9],
                      }),
                      transform: [
                        {
                          scale: dragonFlame.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1.08],
                          }),
                        },
                      ],
                    },
                  ]}
                />
                <Image
                  source={DRAGON_EGG_IMG}
                  style={styles.dragonFlameImage}
                  resizeMode="contain"
                />
              </Animated.View>
            </Pressable>
          </LinearGradient>
        </View>

        <LinearGradient
          colors={["rgba(255,154,80,0.25)", "rgba(75,16,16,0.5)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.dragonTimerWrapper}
        >
          <Text
            style={[
              styles.timer,
              styles.dragonTimer,
              dragonIsActive && styles.dragonTimerActive,
            ]}
          >
            {formatTime(Math.max(dragonTimeLeft, 0))}
          </Text>
          <Text style={styles.dragonTimerHint}>{dragonHint}</Text>
        </LinearGradient>

        {showDragonDetails && (
          <>
            <View style={styles.autoRow}>
              <View style={styles.spellChipRow}>
                <Pressable
                  onPress={() => setDragonAutoChain((prev) => !prev)}
                  accessibilityRole="button"
                  accessibilityLabel="Alternar auto encadenar oleadas"
                  style={[
                    styles.spellChip,
                    styles.spellChipGhost,
                    dragonAutoChain && styles.spellChipDragon,
                  ]}
                >
                  <MaterialCommunityIcons
                    name={dragonAutoChain ? "infinity" : "shuffle-disabled"}
                    size={14}
                    color={dragonAutoChain ? DRAGON_ACCENT : Colors.textMuted}
                  />
                  <Text style={styles.dragonAutoLabel}>
                    {dragonAutoChain ? "Auto encadenar" : "Manual"}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setDragonIsActive(false);
                    setDragonPhase("focus");
                    setDragonTimeLeft(DRAGON_CONFIG.focusDuration);
                    setDragonWaves(0);
                    setDragonHasStarted(false);
                  }}
                  accessibilityRole="button"
                  accessibilityLabel="Reiniciar Pulso del Dragon"
                  style={[
                    styles.spellChip,
                    styles.spellChipGhost,
                    styles.spellChipDanger,
                  ]}
                >
                  <MaterialCommunityIcons
                    name="restart"
                    size={16}
                    color={Colors.danger}
                  />
                  <Text style={styles.dragonControlGhostLabel}>Reiniciar</Text>
                </Pressable>
              </View>
            </View>
            {(dragonIsActive || dragonHasStarted) && (
              <>
                <LinearGradient
                  colors={["rgba(255,255,255,0.3)", "rgba(255,255,255,0.05)"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.dragonProgressTrack}
                >
                  <View
                    style={[
                      styles.dragonProgressFill,
                      { width: `${dragonProgress * 100}%` },
                    ]}
                  />
                </LinearGradient>
                <Text style={styles.dragonWaveHint}>
                  Completa {DRAGON_CONFIG.waveGoal} oleadas para cerrar el
                  ritual.
                </Text>
              </>
            )}
          </>
        )}
      </LinearGradient>
    );
  };

  return (
    <View style={styles.sliderWrapper}>
      <View style={styles.sectionHeader}>
        <View style={styles.sectionHeaderText}>
          <View style={styles.sectionTitleRow}>
            <Text style={styles.sectionTitleText}>
              Hechizos de Productividad
            </Text>
            <View style={styles.sectionProChip}>
              <Text style={styles.sectionProText}>PRO</Text>
            </View>
          </View>
          <Text style={styles.sectionCopy}>{activeSpell.description}</Text>
        </View>
      </View>
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
              : spell.id === "dragon"
              ? renderDragonSpell()
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
  sectionHeader: {
    paddingHorizontal: Spacing.small,
    marginBottom: Spacing.small,
  },
  sectionHeaderText: {
    gap: Spacing.tiny / 2,
  },
  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    justifyContent: "space-between",
  },
  sectionTitleText: {
    ...Typography.sectionTitle,
    color: Colors.text,
    flex: 1,
  },
  sectionProChip: {
    paddingHorizontal: Spacing.small + 4,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  sectionProText: {
    fontSize: 10,
    lineHeight: 12,
    color: "#ffdf9b",
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  sectionCopy: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  slide: {
    paddingRight: 8,
    marginLeft: -14,
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
  presetChip: {
    minHeight: 36,
    justifyContent: "space-between",
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
    borderColor: "rgba(255,255,255,0.25)",
    backgroundColor: "rgba(255,255,255,0.04)",
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
    justifyContent: "flex-start",
    gap: Spacing.small,
  },
  autoLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  autoHint: {
    ...Typography.micro,
    color: Colors.textMuted,
  },
  autoResetText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  spellChip: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small - 2,
    borderRadius: Radii.md,
    borderWidth: 1,
    flexGrow: 1,
    flex: 1,
    minHeight: 30,
  },
  spellChipGhost: {
    borderColor: "rgba(255,255,255,0.25)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  spellChipFocus: {
    borderColor: FOCUS_ACCENT,
    backgroundColor: "rgba(118,167,255,0.18)",
  },
  spellChipDragon: {
    borderColor: DRAGON_ACCENT,
    backgroundColor: "rgba(255,159,69,0.18)",
  },
  spellChipDragonActive: {
    backgroundColor: DRAGON_ACCENT,
  },
  spellChipDanger: {
    borderColor: Colors.danger,
    backgroundColor: "rgba(255,0,0,0.12)",
  },
  spellChipRow: {
    flexDirection: "row",
    gap: Spacing.small,
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
  dragonCard: {
    borderColor: "rgba(255,159,69,0.45)",
    position: "relative",
    overflow: "hidden",
  },
  dragonHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.small,
  },
  dragonPhasePill: {
    marginLeft: Spacing.small,
  },
  dragonStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radii.lg,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    marginTop: Spacing.small,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
  },
  dragonStat: {
    flex: 1,
    alignItems: "center",
  },
  dragonStatLabel: {
    ...Typography.micro,
    color: Colors.textMuted,
  },
  dragonStatValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  dragonDivider: {
    width: 1,
    height: 32,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  dragonTimerWrapper: {
    marginTop: Spacing.small,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.large + 2,
    paddingVertical: Spacing.tiny + 2,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  dragonTimer: {
    color: Colors.text,
  },
  dragonTimerActive: {
    color: DRAGON_ACCENT,
  },
  dragonTimerHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  dragonFlameCard: {
    borderRadius: Radii.xl,
    padding: Spacing.base,
    flex: 1,
  },
  dragonFlameRect: {
    width: "100%",
    borderRadius: Radii.lg,
    borderWidth: 1,
    height: 88,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  dragonFlameGlowRect: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.7,
  },
  dragonFlamePulse: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255,159,69,0.25)",
  },
  dragonFlameImage: {
    width: 90,
    height: 90,
  },
  dragonProgressTrack: {
    height: 15,
    width: "100%",
    borderRadius: Radii.pill,
    backgroundColor: "rgba(0,0,0,0.25)",
    overflow: "hidden",
    marginTop: Spacing.small,
  },
  dragonProgressFill: {
    height: "100%",
    backgroundColor: DRAGON_ACCENT,
  },
  dragonStatus: {
    ...Typography.caption,
    color: Colors.text,
    marginTop: Spacing.tiny,
  },
  dragonWaveHint: {
    ...Typography.micro,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
  },
  dragonActionRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  dragonControlColumn: {
    width: 150,
    gap: Spacing.tiny,
    alignSelf: "stretch",
  },
  dragonControlLabel: {
    ...Typography.caption,
    color: DRAGON_ACCENT,
    fontWeight: "700",
  },
  dragonControlLabelActive: {
    color: Colors.text,
  },
  dragonControlGhostLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  spellChipTextBlock: {
    flex: 1,
    gap: 2,
  },
  dragonModeHelper: {
    ...Typography.tiny,
    fontSize: 11,
    color: "rgba(255,255,255,0.7)",
  },
  dragonAutoLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  spellChipLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  spellChipLabelActive: {
    color: FOCUS_ACCENT,
  },
  spellChipMeta: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "700",
  },
});
