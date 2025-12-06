import React, { useEffect, useMemo, useRef, useState } from "react";
import { View, Text, Image, Animated, Pressable, ScrollView, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const SIZE_MAP = {
  md: Spacing.xlarge * 5.5,
  lg: Spacing.xlarge * 6.5,
  xl: Spacing.xlarge * 7.5,
};

const STAGES = [
  { key: "seed", label: "Semilla", accent: Colors.elementEarthLight },
  { key: "sprout", label: "Brote", accent: Colors.elementWaterLight },
  { key: "bloom", label: "Floreciente", accent: Colors.accent },
  { key: "mature", label: "Madura", accent: Colors.secondary },
];

const LEVELS_PER_STAGE = 10;

const CARE_ACCENTS = {
  water: Colors.elementWater,
  light: Colors.accent,
  nutrients: Colors.success,
  purity: Colors.primary,
};

export default function PlantHero({
  source,
  size = "lg",
  showAura = false,
  health = 1,
  mood,
  stage,
  skinAccent,
  careMetrics = [],
  wellbeingMetrics = [],
  ritualSummary,
  climateInfo,
  stageProgress,
  careSuggestions = [],
  onPressCareSuggestion,
  companionStatus,
  onPressCompanion,
}) {
  const auraAnim = useRef(new Animated.Value(0)).current;
  const sliderRef = useRef(null);
  const [activeStageTip, setActiveStageTip] = useState(null);

  useEffect(() => {
    if (!showAura) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(auraAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(auraAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [auraAnim, showAura]);

  const baseSize = SIZE_MAP[size] || SIZE_MAP.lg;
  const healthPercent = Math.round(Math.max(0, Math.min(1, health)) * 100);

  const chips = careMetrics.map((item) => ({
    key: item.key,
    label: item.label,
    percent: Math.round(Math.max(0, Math.min(1, item.value ?? 0)) * 100),
    accent: CARE_ACCENTS[item.key] || Colors.primary,
  }));

  const wellbeingChips = wellbeingMetrics.map((item) => mapWellbeingChip(item, climateInfo));
  const moodChip = wellbeingChips.find((chip) => chip.key === "mood");
  const temperatureChip = wellbeingChips.find((chip) => chip.key === "temperature");

  const stageData = useMemo(() => {
    const fallback = {
      percentTotal: 0,
      stageIndex: 0,
      stagePercent: 0,
      nextStage: STAGES[1] || null,
      hint: "Completa tareas para avanzar",
    };
    if (!stageProgress) {
      return fallback;
    }
    const totalPercent = Math.max(0, Math.min(1, stageProgress.progress ?? 0));
    const totalLevels = STAGES.length * LEVELS_PER_STAGE;
    const absoluteLevel = totalPercent * totalLevels;
    const stageIndex = Math.min(
      STAGES.length - 1,
      totalPercent > 0 ? Math.floor(absoluteLevel / LEVELS_PER_STAGE) : 0
    );
    const levelWithin = absoluteLevel - stageIndex * LEVELS_PER_STAGE;
    const stagePercent =
      stageIndex >= STAGES.length - 1
        ? 100
        : Math.round(Math.max(0, Math.min(1, levelWithin / LEVELS_PER_STAGE)) * 100);
    const nextStage = stageIndex >= STAGES.length - 1 ? null : STAGES[stageIndex + 1];
    const hint =
      stageProgress.etaText ||
      (nextStage ? `Faltan pasos para ${nextStage.label}` : "Etapa final alcanzada");
    return {
      percentTotal: Math.round(totalPercent * 100),
      stageIndex,
      stagePercent,
      nextStage,
      hint,
    };
  }, [stageProgress]);

  useEffect(() => {
    if (!sliderRef.current) return;
    const slideWidth = 160 + Spacing.small;
    const offset = Math.max(0, stageData.stageIndex * slideWidth - slideWidth);
    sliderRef.current.scrollTo({ x: offset, animated: true });
  }, [stageData.stageIndex]);

  const handleStagePress = (item) => {
    setActiveStageTip((prev) => {
      if (prev?.key === item.key) return null;
      return { key: item.key, title: item.label, text: STAGE_TIPS[item.key] || stageData.hint };
    });
  };

  const auraScale = auraAnim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.05] });
  const auraOpacity = auraAnim.interpolate({ inputRange: [0, 1], outputRange: [0.08, 0.18] });

  const safeSuggestions = Array.isArray(careSuggestions) ? careSuggestions.slice(0, 4) : [];

  return (
    <View style={styles.container}>
      <View style={styles.heroRow}>
        {chips.length ? (
          <View style={styles.metricsColumn}>
            {chips.map((chip) => (
              <View key={chip.key} style={[styles.metricChip, { borderColor: withAlpha(chip.accent, 0.3) }]}>
                <View style={[styles.metricAccent, { backgroundColor: chip.accent }]} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.metricLabel}>{chip.label}</Text>
                  <Text style={styles.metricValue}>{chip.percent}%</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}
        <View style={styles.heroWrap}>
          {showAura && (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.aura,
                {
                  width: baseSize * 1.4,
                  height: baseSize * 1.4,
                  borderRadius: (baseSize * 1.4) / 2,
                  opacity: auraOpacity,
                  transform: [{ scale: auraScale }],
                },
              ]}
            />
          )}
          <Animated.View
            style={[
              styles.heroCircle,
              {
                width: baseSize,
                height: baseSize,
                borderRadius: baseSize / 2,
              },
            ]}
          >
            {source ? (
              <Image source={source} style={styles.heroImage} resizeMode="contain" />
            ) : (
              <Text style={{ fontSize: baseSize * 0.4 }}>🌱</Text>
            )}
            {skinAccent ? <View style={[styles.potAccent, { backgroundColor: skinAccent, width: baseSize * 0.6 }]} /> : null}
          </Animated.View>
        </View>
      </View>

      <View style={styles.stageSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ruta de crecimiento</Text>
          <Text style={styles.sectionHint}>{stageData.hint}</Text>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.stageSlider}
          ref={sliderRef}
        >
          {STAGES.map((item, index) => (
            <StageSlide
              key={item.key}
              stage={item}
              active={index === stageData.stageIndex}
              completed={index < stageData.stageIndex}
              percent={
                index === stageData.stageIndex
                  ? stageData.stagePercent
                  : index < stageData.stageIndex
                  ? 100
                  : 0
              }
              onPress={() => handleStagePress(item)}
            />
          ))}
        </ScrollView>
        {activeStageTip ? (
          <View style={styles.stageTip}>
            <View style={{ flex: 1 }}>
              <Text style={styles.stageTipTitle}>{activeStageTip.title}</Text>
              <Text style={styles.stageTipText}>{activeStageTip.text}</Text>
            </View>
            <Pressable onPress={() => setActiveStageTip(null)} style={styles.stageTipClose}>
              <Text style={styles.stageTipCloseText}>×</Text>
            </Pressable>
          </View>
        ) : null}
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statRow}>
          <VitalityCard
            percent={healthPercent}
            style={[styles.statCardWide, styles.statCardSpacing]}
          />
          <BondCard
            moodChip={moodChip}
            fallbackMood={mood}
            style={[styles.statCardNarrow, styles.statCardSpacing]}
          />
        </View>
        <View style={styles.statRow}>
          <ClimateCard
            climateInfo={climateInfo}
            temperatureChip={temperatureChip}
            style={[styles.statCardWide, styles.statCardSpacing]}
          />
          <NextFormCard
            percent={stageData.stagePercent}
            nextStage={stageData.nextStage}
            style={[styles.statCardNarrow, styles.statCardSpacing]}
          />
        </View>
      </View>

      <CompanionCard status={companionStatus} onPress={onPressCompanion} />

      {ritualSummary ? <RitualCard summary={ritualSummary} /> : null}

      {safeSuggestions.length ? (
        <View style={styles.suggestionBlock}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Cuidados sugeridos</Text>
            <Text style={styles.sectionHint}>Equilibra tus métricas</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.suggestionRow}>
            {safeSuggestions.map((item) => {
              const severity = getSeverity(item.deficit);
              const cooldown = item.cooldownMs && item.cooldownMs > 0 ? formatCooldown(item.cooldownMs) : null;
              return (
                <CareSuggestionChip
                  key={item.key}
                  label={item.label}
                  accent={item.accent}
                  severity={severity}
                  cooldown={cooldown}
                  disabled={Boolean(cooldown)}
                  onPress={() => onPressCareSuggestion?.(item.key)}
                />
              );
            })}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
}

const STAGE_TIPS = {
  seed: "Dedica micro tareas suaves para germinar.",
  sprout: "Introduce hábitos diarios para mantener el ritmo.",
  bloom: "Equilibra tareas de fuego y agua para florecer.",
  mature: "Optimiza tus logros y protege la planta del estrés.",
};

function StageSlide({ stage, active, completed, percent, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.stageSlide,
        {
          borderColor: withAlpha(stage.accent, active ? 0.9 : 0.35),
          backgroundColor: withAlpha(stage.accent, completed ? 0.25 : 0.12),
        },
      ]}
    >
      <View style={styles.stageSlideHeader}>
        <Text style={styles.stageSlideLabel}>{stage.label}</Text>
        <Text style={styles.stageSlidePercent}>{completed ? "100%" : active ? `${Math.max(percent, 5)}%` : "0%"}</Text>
      </View>
      <View style={styles.stageSlideBar}>
        <View
          style={[
            styles.stageSlideFill,
            { width: `${completed ? 100 : active ? Math.max(percent, 5) : 0}%`, backgroundColor: stage.accent },
          ]}
        />
      </View>
    </Pressable>
  );
}

function VitalityCard({ percent, style }) {
  const descriptor =
    percent >= 80
      ? "Sistema de raíces fuerte."
      : percent >= 55
      ? "Estable, sigue hidratando."
      : "Necesita cuidados urgentes.";
  return (
    <LinearGradient
      colors={["#3bb475", "#1d7c5e"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.statCard, styles.vitalityCard, style]}
    >
      <Text style={styles.statLabelLight}>VITALIDAD</Text>
      <View style={styles.vitalityValueRow}>
        <Text style={styles.vitalityValue}>{percent}%</Text>
        <Text style={styles.vitalityHeart}>❤</Text>
      </View>
      <View style={styles.vitalityBar}>
        <View style={[styles.vitalityFill, { width: `${Math.max(10, percent)}%` }]} />
      </View>
      <Text style={styles.vitalityHint}>{descriptor}</Text>
    </LinearGradient>
  );
}

function BondCard({ moodChip, fallbackMood, style }) {
  const moodValue = moodChip?.display || fallbackMood || "Estable";
  const moodEmoji = moodChip?.emoji || "😊";
  return (
    <View style={[styles.statCard, styles.bondCard, style]}>
      <View style={styles.bondHeader}>
        <Text style={styles.statLabelDark}>VÍNCULO</Text>
        <View style={styles.bondMood}>
          <Text style={styles.bondMoodValue}>{moodValue}</Text>
          <Text style={styles.bondMoodEmoji}>{moodEmoji}</Text>
        </View>
      </View>
      <BondMeter label="Confianza" value={78} accent="#FFC04D" />
      <BondMeter label="Sincronía" value={62} accent="#af8bff" />
    </View>
  );
}

function BondMeter({ label, value, accent }) {
  return (
    <View style={styles.bondMeter}>
      <View style={styles.bondMeterHeader}>
        <Text style={styles.bondMeterLabel}>{label}</Text>
        <Text style={[styles.bondMeterLabel, { color: accent }]}>{value}%</Text>
      </View>
      <View style={styles.bondMeterBar}>
        <View style={[styles.bondMeterFill, { width: `${Math.max(8, value)}%`, backgroundColor: accent }]} />
      </View>
    </View>
  );
}

function ClimateCard({ climateInfo = {}, temperatureChip, style }) {
  const parsedTemp =
    climateInfo?.tempC ??
    (temperatureChip?.display ? parseInt(temperatureChip.display, 10) : undefined);
  const tempDisplay =
    parsedTemp !== undefined && !Number.isNaN(parsedTemp)
      ? `${parsedTemp}°C`
      : temperatureChip?.display || "—°C";
  const location = climateInfo?.location || "";
  const conditionRaw =
    climateInfo?.status ||
    climateInfo?.condition ||
    temperatureChip?.label ||
    "Clima estable";
  const showCondition =
    conditionRaw &&
    (!location || conditionRaw.trim().toLowerCase() !== location.trim().toLowerCase());
  const hintCandidate = climateInfo?.flowHint || climateInfo?.hint || temperatureChip?.meta || "";
  const flowHint =
    hintCandidate &&
    (!location || hintCandidate.trim().toLowerCase() !== location.trim().toLowerCase())
      ? hintCandidate
      : "El flujo de mana es óptimo.";
  const icon = climateInfo?.icon || "🌤️";
  return (
    <LinearGradient
      colors={["#2f3d9f", "#14152f"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.statCard, styles.climateCard, style]}
    >
      <Text style={styles.statLabelLight}>CLIMA DE MANA</Text>
      <View style={styles.climateValueStack}>
        <Text style={styles.climateValue}>{tempDisplay}</Text>
        <Text style={styles.climateIcon}>{icon}</Text>
      </View>
      {showCondition ? <Text style={styles.climateCondition}>{conditionRaw}</Text> : null}
      {location ? <Text style={styles.climateLocation}>{location}</Text> : null}
      <View style={styles.climateHintPill}>
        <Text style={styles.climateHintText}>⚡ {flowHint}</Text>
      </View>
    </LinearGradient>
  );
}

function NextFormCard({ percent = 0, nextStage, style }) {
  const remaining = Math.max(0, 100 - percent);
  const nextLabel = nextStage?.label || "Forma final";
  const hasNext = Boolean(nextStage);
  const statusLabel = !hasNext
    ? "Etapa máxima alcanzada"
    : remaining > 0
    ? `${remaining}% restante`
    : "Lista para evolucionar";
  const narrative = !hasNext
    ? "Has desbloqueado todas las formas actuales."
    : remaining > 0
    ? `Tu planta se prepara para ${nextLabel.toLowerCase()}.`
    : `Tu planta puede convertirse en ${nextLabel.toLowerCase()}.`;
  return (
    <View style={[styles.statCard, styles.formCard, style]}>
      <Text style={styles.statLabelDark}>PRÓXIMA FORMA</Text>
      <View style={styles.nextFormStack}>
        <StageProgressDonut percent={percent} />
        <Text style={styles.nextFormLabel}>{nextLabel}</Text>
        <Text style={styles.nextFormRequirement}>{statusLabel}</Text>
        <Text style={styles.nextFormHint}>{narrative}</Text>
      </View>
    </View>
  );
}

function StageProgressDonut({ percent }) {
  const size = 82;
  const strokeWidth = 9;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circumference - (clamped / 100) * circumference;
  return (
    <View style={styles.stageDonut}>
      <Svg width={size} height={size}>
        <Circle
          stroke={withAlpha(Colors.text, 0.1)}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={Colors.secondary}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <Text style={styles.stageDonutPercent}>{clamped}%</Text>
    </View>
  );
}

function CompanionCard({ status, onPress }) {
  const potions = status?.potions ?? [];
  if (!status?.pet && potions.length === 0) {
    return (
      <View style={styles.companionCard}> 
        <Text style={styles.sectionTitle}>Sin compañero activo</Text>
        <Text style={styles.sectionHint}>Equipa una mascota o poción para proteger la planta.</Text>
        <Pressable style={styles.companionButton} onPress={onPress}>
          <Text style={styles.companionButtonText}>Ver inventario</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.companionCard}>
      <View style={styles.companionHeader}> 
        <Text style={styles.sectionTitle}>Compañero activo</Text>
        <Pressable onPress={onPress}>
          <Text style={styles.linkText}>Cambiar</Text>
        </Pressable>
      </View>
      {status.pet ? (
        <Text style={styles.companionPet}>{status.pet.name} {status.pet.emoji || "🐾"}</Text>
      ) : null}
      {potions.length ? (
        <View style={styles.potionRow}>
          {potions.slice(0, 2).map((potion) => (
            <View key={potion.id} style={styles.potionChip}>
              <Text style={styles.potionText}>{potion.label}</Text>
              <Text style={styles.potionMeta}>{potion.remaining}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function RitualCard({ summary }) {
  const tags = summary.tags?.slice(0, 4) || [];
  return (
    <View style={styles.ritualCard}>
      <View style={styles.ritualHeader}>
        <Text style={styles.sectionTitle}>Rituales</Text>
        <Text style={styles.ritualCount}>{`${summary.active} / ${summary.total}`}</Text>
      </View>
      <Text style={styles.sectionHint}>Tus hábitos personales mantienen motivada a la planta.</Text>
      {tags.length ? (
        <View style={styles.ritualTagRow}>
          {tags.map((tag) => (
            <View key={tag} style={styles.ritualTag}>
              <Text style={styles.ritualTagText}>{tag}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

function CareSuggestionChip({ label, accent, severity, cooldown, disabled, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.suggestionChip,
        {
          borderColor: withAlpha(accent || Colors.primary, 0.35),
          backgroundColor: withAlpha(accent || Colors.primary, 0.12),
          opacity: disabled ? 0.5 : 1,
        },
      ]}
    >
      <View style={{ flex: 1 }}>
        <Text style={[styles.suggestionLabel, { color: accent || Colors.primary }]}>{label}</Text>
        <Text style={styles.suggestionMeta}>{cooldown ? `Disponible en ${cooldown}` : "Listo"}</Text>
      </View>
      {severity.label ? (
        <View style={styles.suggestionBadge}>
          <Text style={[styles.suggestionBadgeText, { color: severity.color }]}>{severity.label}</Text>
        </View>
      ) : null}
    </Pressable>
  );
}

function mapWellbeingChip(item, climateInfo) {
  const value = Math.max(0, Math.min(1, item.value ?? 0));
  const percent = Math.round(value * 100);
  switch (item.key) {
    case "mood": {
      if (percent >= 75) return { key: item.key, display: "Feliz", emoji: "😊" };
      if (percent >= 45) return { key: item.key, display: "Estable", emoji: "🙂" };
      return { key: item.key, display: "Baja", emoji: "😕" };
    }
    case "temperature": {
      return {
        key: item.key,
        label: "Temperatura",
        display: `${Math.round(15 + value * 15)}°C`,
        meta: climateInfo?.location,
      };
    }
    default:
      return item;
  }
}

function getSeverity(deficit = 0) {
  if (deficit >= 0.2) return { label: "Alto", color: Colors.danger };
  if (deficit >= 0.1) return { label: "Medio", color: Colors.warning };
  return { label: "", color: Colors.textMuted };
}

function formatCooldown(ms = 0) {
  if (!ms) return null;
  const minutes = Math.max(1, Math.round(ms / 60000));
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const rem = minutes % 60;
    return rem ? `${hours}h ${rem}m` : `${hours}h`;
  }
  return `${minutes}m`;
}

const withAlpha = (hex = "", alpha = 1) => {
  if (!hex) return hex;
  let cleaned = `${hex}`.replace("#", "").trim();
  if (cleaned.length === 3) cleaned = cleaned.split("").map((c) => c + c).join("");
  const value = parseInt(cleaned, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const styles = StyleSheet.create({
  container: {
    gap: Spacing.large,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.large,
  },
  metricsColumn: {
    gap: Spacing.small,
    flexBasis: "38%",
  },
  metricChip: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: Radii.md,
    padding: Spacing.small,
    gap: Spacing.small,
  },
  metricAccent: {
    width: 6,
    height: "70%",
    borderRadius: Radii.pill,
  },
  metricLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  metricValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  heroWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  aura: {
    position: "absolute",
    backgroundColor: Colors.primaryFantasy,
    borderRadius: 200,
  },
  heroCircle: {
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.35),
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.25),
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  heroImage: {
    width: "100%",
    height: "100%",
  },
  potAccent: {
    position: "absolute",
    bottom: Spacing.small,
    height: Spacing.large,
    borderRadius: Radii.pill,
    alignSelf: "center",
    opacity: 0.7,
  },
  stageSection: {
    gap: Spacing.small,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  sectionHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  stageSlider: {
    gap: Spacing.small,
    paddingRight: Spacing.base,
  },
  stageSlide: {
    width: 160,
    borderRadius: Radii.lg,
    borderWidth: 1,
    padding: Spacing.small,
    gap: Spacing.small,
  },
  stageSlideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  stageSlideLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  stageSlidePercent: {
    ...Typography.caption,
    color: Colors.text,
  },
  stageSlideBar: {
    height: 4,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.text, 0.12),
    overflow: "hidden",
  },
  stageSlideFill: {
    height: "100%",
    borderRadius: Radii.pill,
  },
  stageTip: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: withAlpha(Colors.surface, 0.15),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.45),
    padding: Spacing.small,
  },
  stageTipTitle: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  stageTipText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  stageTipClose: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: withAlpha(Colors.text, 0.2),
    alignItems: "center",
    justifyContent: "center",
  },
  stageTipCloseText: {
    color: Colors.text,
    fontWeight: "700",
  },
  statsGrid: {
    gap: Spacing.small,
  },
  statRow: {
    flexDirection: "row",
    gap: Spacing.small,
    justifyContent: "space-between",
  },
  statCard: {
    flex: 1,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: withAlpha(Colors.surface, 0.2),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.5),
    padding: Spacing.base,
    gap: Spacing.small,
  },
  statCardWide: {
    flex: 0.64,
  },
  statCardNarrow: {
    flex: 0.34,
  },
  statCardSpacing: {
    flexGrow: 1,
  },
  statLabelLight: {
    ...Typography.caption,
    color: withAlpha("#ffffff", 0.9),
    letterSpacing: 0.8,
  },
  statLabelDark: {
    ...Typography.caption,
    color: Colors.textMuted,
    letterSpacing: 0.8,
  },
  vitalityCard: {
    backgroundColor: "transparent",
    borderWidth: 0,
  },
  vitalityValueRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  vitalityValue: {
    ...Typography.h1,
    color: "#ffffff",
    fontSize: 32,
  },
  vitalityHeart: {
    fontSize: 24,
    color: "#ffccd7",
  },
  vitalityBar: {
    height: 8,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha("#ffffff", 0.25),
    overflow: "hidden",
  },
  vitalityFill: {
    height: "100%",
    borderRadius: Radii.pill,
    backgroundColor: "#ffffff",
  },
  vitalityHint: {
    ...Typography.caption,
    color: "#ffffff",
  },
  bondCard: {
    backgroundColor: withAlpha(Colors.surface, 0.7),
  },
  bondHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bondMood: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  bondMoodValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  bondMoodEmoji: {
    fontSize: 18,
  },
  bondMeter: {
    gap: Spacing.tiny / 2,
  },
  bondMeterHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bondMeterLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  bondMeterBar: {
    height: 6,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.text, 0.1),
  },
  bondMeterFill: {
    height: "100%",
    borderRadius: Radii.pill,
  },
  climateCard: {
    borderWidth: 0,
    paddingVertical: Spacing.large,
    gap: Spacing.small,
  },
  climateValueStack: {
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.tiny,
  },
  climateValue: {
    ...Typography.h1,
    color: Colors.text,
  },
  climateIcon: {
    fontSize: 24,
  },
  climateLocation: {
    ...Typography.caption,
    color: Colors.text,
  },
  climateCondition: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  climateHintPill: {
    alignSelf: "flex-start",
    borderRadius: Radii.pill,
    backgroundColor: withAlpha("#ffffff", 0.15),
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
  },
  climateHintText: {
    ...Typography.caption,
    color: "#fff",
  },
  formCard: {
    backgroundColor: withAlpha(Colors.secondaryFantasy, 0.16),
    borderColor: withAlpha(Colors.secondaryFantasy, 0.4),
  },
  nextFormStack: {
    alignItems: "center",
    gap: Spacing.small,
  },
  nextFormRequirement: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  nextFormLabel: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  nextFormHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  stageDonut: {
    width: 82,
    height: 82,
    alignItems: "center",
    justifyContent: "center",
  },
  stageDonutPercent: {
    position: "absolute",
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  companionCard: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: withAlpha(Colors.surface, 0.2),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.45),
    padding: Spacing.base,
    gap: Spacing.small,
  },
  companionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  companionPet: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  companionButton: {
    alignSelf: "flex-start",
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: withAlpha(Colors.secondary, 0.6),
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
  },
  companionButtonText: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: "700",
  },
  potionRow: {
    flexDirection: "row",
    gap: Spacing.small,
  },
  potionChip: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surface, 0.3),
  },
  potionText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  potionMeta: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  ritualCard: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: withAlpha(Colors.surface, 0.2),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.45),
    padding: Spacing.base,
    gap: Spacing.small,
  },
  ritualHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  ritualCount: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  ritualTagRow: {
    flexDirection: "row",
    gap: Spacing.small,
    flexWrap: "wrap",
  },
  ritualTag: {
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: withAlpha(Colors.text, 0.2),
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
  },
  ritualTagText: {
    ...Typography.caption,
    color: Colors.text,
  },
  suggestionBlock: {
    gap: Spacing.small,
  },
  suggestionRow: {
    gap: Spacing.small,
    paddingRight: Spacing.base,
  },
  suggestionChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radii.lg,
    borderWidth: 1,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    minWidth: 180,
    gap: Spacing.small,
  },
  suggestionLabel: {
    ...Typography.caption,
    fontWeight: "700",
  },
  suggestionMeta: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 11,
  },
  suggestionBadge: {
    borderRadius: Radii.pill,
    borderWidth: 1,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny / 2,
  },
  suggestionBadgeText: {
    ...Typography.caption,
    fontWeight: "700",
  },
  linkText: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: "700",
  },
});
