import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  ScrollView,
  StyleSheet,
} from "react-native";
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
const STAT_CARD_HEIGHT = 148;

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
  climateInfo,
  stageProgress,
}) {
  const auraAnim = useRef(new Animated.Value(0)).current;
  const [statSlideWidth, setStatSlideWidth] = useState(1);

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

  const wellbeingChips = wellbeingMetrics.map((item) =>
    mapWellbeingChip(item, climateInfo)
  );
  const moodChip = wellbeingChips.find((chip) => chip.key === "mood");
  const temperatureChip = wellbeingChips.find(
    (chip) => chip.key === "temperature"
  );

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
        : Math.round(
            Math.max(0, Math.min(1, levelWithin / LEVELS_PER_STAGE)) * 100
          );
    const nextStage =
      stageIndex >= STAGES.length - 1 ? null : STAGES[stageIndex + 1];
    const hint =
      stageProgress.etaText ||
      (nextStage
        ? `Faltan pasos para ${nextStage.label}`
        : "Etapa final alcanzada");
    return {
      percentTotal: Math.round(totalPercent * 100),
      stageIndex,
      stagePercent,
      nextStage,
      hint,
    };
  }, [stageProgress]);

  const currentStage = STAGES[stageData.stageIndex] || STAGES[0];
  const stageSummary = stageData.nextStage
    ? `Estás en ${currentStage.label} con ${stageData.stagePercent}% completado.`
    : `Etapa final: ${currentStage.label}.`;

  const auraScale = auraAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.05],
  });
  const auraOpacity = auraAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.08, 0.18],
  });

  const statCards = [
    {
      key: "vitality",
      element: <VitalityCard percent={healthPercent} />,
    },
    {
      key: "bond",
      element: <BondCard moodChip={moodChip} fallbackMood={mood} />,
    },
    {
      key: "climate",
      element: (
        <ClimateCard
          climateInfo={climateInfo}
          temperatureChip={temperatureChip}
        />
      ),
    },
    {
      key: "next",
      element: (
        <NextFormCard
          percent={stageData.stagePercent}
          nextStage={stageData.nextStage}
        />
      ),
    },
  ];

  const statSlideGap = Spacing.base;
  const statSlideTargetWidth = statSlideWidth ? statSlideWidth * 0.82 : 0;
  const statsSnapInterval = statSlideTargetWidth
    ? statSlideTargetWidth + statSlideGap
    : undefined;

  return (
    <View style={styles.container}>
      <View style={styles.heroRow}>
        {chips.length ? (
          <View style={styles.metricsColumn}>
            {chips.map((chip) => (
              <View
                key={chip.key}
                style={[
                  styles.metricChip,
                  { borderColor: withAlpha(chip.accent, 0.3) },
                ]}
              >
                <View
                  style={[
                    styles.metricAccent,
                    { backgroundColor: chip.accent },
                  ]}
                />
                <View style={{ flex: 1 }}>
                  <Text style={styles.metricLabel}>{chip.label}</Text>
                  <Text style={styles.metricValue}>{chip.percent}%</Text>
                </View>
              </View>
            ))}
          </View>
        ) : null}
        <View style={styles.heroWrap}>
          {source ? (
            <Image
              source={source}
              style={[
                styles.heroImage,
                {
                  width: baseSize * 1.25,
                  height: baseSize * 1.25,
                  marginLeft: -Spacing.base * 2.5,
                },
              ]}
              resizeMode="contain"
            />
          ) : (
            <Text style={{ fontSize: baseSize * 0.4 }}>🌱</Text>
          )}
        </View>
      </View>

      <View style={styles.stageSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ruta de crecimiento</Text>
        </View>
        <Text style={styles.stageDescription}>{stageSummary}</Text>
      </View>

      <View
        style={styles.statsCarousel}
        onLayout={(event) => setStatSlideWidth(event.nativeEvent.layout.width)}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          decelerationRate="fast"
          snapToAlignment="start"
          snapToInterval={statsSnapInterval}
          contentContainerStyle={styles.statsSlides}
        >
          {statCards.map((item, index) => (
            <View
              key={item.key}
              style={[
                styles.statSlide,
                statSlideTargetWidth ? { width: statSlideTargetWidth } : null,
                index < statCards.length - 1
                  ? { marginRight: statSlideGap }
                  : null,
              ]}
            >
              <View style={styles.statSlideInner}>{item.element}</View>
            </View>
          ))}
        </ScrollView>
      </View>

    </View>
  );
}

function VitalityCard({ percent, style }) {
  const safePercent = Math.max(0, Math.min(100, percent));
  const descriptor =
    safePercent >= 80
      ? "Sistema de raíces fuerte."
      : safePercent >= 55
      ? "Estable, sigue hidratando."
      : "Necesita cuidados urgentes.";
  const progressWidth = `${Math.max(8, safePercent)}%`;
  return (
    <LinearGradient
      colors={["#2fc578", "#157050"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.vitalityCard, style]}
    >
      <View style={styles.vitalityHeader}>
        <Text style={styles.vitalityLabel}>VITALIDAD</Text>
        <Text style={styles.vitalityHeart}>❤️</Text>
      </View>
      <Text style={styles.vitalityValue}>{safePercent}%</Text>
      <View style={styles.vitalityBar}>
        <View style={styles.vitalityBarTrack} />
        <LinearGradient
          colors={["#f5fff5", "#b5f2c7"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.vitalityBarFill, { width: progressWidth }]}
        />
      </View>
      <Text style={styles.vitalityHint}>{descriptor}</Text>
    </LinearGradient>
  );
}

function BondCard({ moodChip, fallbackMood, style }) {
  const moodValue = moodChip?.display || fallbackMood || "Estable";
  const moodEmoji = moodChip?.emoji || "😊";
  return (
    <LinearGradient
      colors={["#2c1741", "#140c25"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.bondCard, style]}
    >
      <View style={styles.bondHeader}>
        <Text style={styles.bondLabel}>VÍNCULO</Text>
        <View style={styles.bondMoodTag}>
          <Text style={styles.bondMoodValue}>{moodValue}</Text>
          <Text style={styles.bondMoodEmoji}>{moodEmoji}</Text>
        </View>
      </View>
      <BondMeter label="Confianza" value={78} accent="#ffc04d" />
      <BondMeter label="Sincronía" value={62} accent="#b18bff" />
    </LinearGradient>
  );
}

function BondMeter({ label, value, accent }) {
  const safeValue = Math.max(0, Math.min(100, value));
  return (
    <View style={styles.bondMeter}>
      <View style={styles.bondMeterHeader}>
        <Text style={styles.bondMeterLabel}>{label}</Text>
        <Text style={[styles.bondMeterValue, { color: accent }]}>
          {safeValue}%
        </Text>
      </View>
      <View style={styles.bondMeterTrack}>
        <View
          style={[
            styles.bondMeterFill,
            { width: `${Math.max(8, safeValue)}%`, backgroundColor: accent },
          ]}
        />
      </View>
    </View>
  );
}

function ClimateCard({ climateInfo = {}, temperatureChip, style }) {
  const parsedTemp =
    climateInfo?.tempC ??
    (temperatureChip?.display
      ? parseInt(temperatureChip.display, 10)
      : undefined);
  const tempDisplay =
    parsedTemp !== undefined && !Number.isNaN(parsedTemp)
      ? `${parsedTemp}°C`
      : temperatureChip?.display || "-°C";
  const location = climateInfo?.location || temperatureChip?.meta || "";
  const conditionRaw =
    climateInfo?.status ||
    climateInfo?.condition ||
    climateInfo?.descriptor ||
    climateInfo?.summary ||
    climateInfo?.weatherLabel ||
    climateInfo?.shortStatus ||
    "Clima estable";
  const hintCandidate = climateInfo?.flowHint || climateInfo?.hint || "";
  const flowHint = hintCandidate || "El flujo de mana es optimo.";
  const humidity = climateInfo?.humidity
    ? `Humedad ${climateInfo.humidity}%`
    : null;
  const trendText = climateInfo?.trendText || climateInfo?.trend || null;
  const detailText = [trendText, humidity].filter(Boolean).join(" • ");
  const icon = climateInfo?.icon || "🌤️";
  return (
    <LinearGradient
      colors={["#1c2b6b", "#11163c"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.climateCard, style]}
    >
      <View style={styles.climateHeader}>
        <Text style={styles.climateLabel}>CLIMA DE MANA</Text>
        {location ? (
          <Text style={styles.climateLocationMeta}>{location}</Text>
        ) : null}
      </View>
      <View style={styles.climateInfoRow}>
        <Text style={styles.climateValue}>{tempDisplay}</Text>
        <Text style={styles.climateIcon}>{icon}</Text>
      </View>
      <Text style={styles.climateCondition}>{conditionRaw}</Text>
      <View style={styles.climateFlowPill}>
        <Text style={styles.climateFlowIcon}>💡</Text>
        <Text style={styles.climateFlowText}>{flowHint}</Text>
      </View>
      {detailText ? (
        <Text style={styles.climateTrendText}>{detailText}</Text>
      ) : null}
    </LinearGradient>
  );
}

function NextFormCard({ percent = 0, nextStage, style }) {
  const remaining = Math.max(0, 100 - percent);
  const nextLabel = nextStage?.label || "Forma final";
  const accent = nextStage?.accent || Colors.secondary;
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
  const helperTip = hasNext
    ? "Completa rituales para acelerar el avance."
    : "Mantén el flujo estable para conservar la forma.";
  return (
    <LinearGradient
      colors={["#4b2b16", "#1f1208"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.formCard, style]}
    >
      <View style={styles.formHeader}>
        <Text style={styles.formLabel}>PRÓXIMA FORMA</Text>
        <View style={styles.formStageBadge}>
          <Text style={styles.formStageBadgeText}>En progreso</Text>
        </View>
      </View>
      <View style={styles.nextFormStack}>
        <View style={styles.nextFormMainRow}>
          <Text style={styles.nextFormPercent}>{Math.round(percent)}%</Text>
          <View style={styles.formCopy}>
            <Text style={styles.nextFormLabel}>{nextLabel}</Text>
            <Text style={styles.nextFormRequirement}>{statusLabel}</Text>
          </View>
        </View>
        <View style={styles.nextFormProgressTrack}>
          <View
            style={[
              styles.nextFormProgressFill,
              {
                width: `${Math.max(8, Math.min(100, percent))}%`,
                backgroundColor: accent,
              },
            ]}
          />
        </View>
      </View>
      <View
        style={[
          styles.formTipChip,
          { backgroundColor: withAlpha(accent, 0.12) },
        ]}
      >
        <Text style={[styles.formTipIcon, { color: accent }]}>✨</Text>
        <Text style={styles.formTipText}>{helperTip}</Text>
      </View>
    </LinearGradient>
  );
}

function mapWellbeingChip(item, climateInfo) {
  const value = Math.max(0, Math.min(1, item.value ?? 0));
  const percent = Math.round(value * 100);
  switch (item.key) {
    case "mood": {
      if (percent >= 75)
        return { key: item.key, display: "Feliz", emoji: "😊" };
      if (percent >= 45)
        return { key: item.key, display: "Estable", emoji: "🙂" };
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
  if (cleaned.length === 3)
    cleaned = cleaned
      .split("")
      .map((c) => c + c)
      .join("");
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
    alignItems: "flex-start",
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
  stageDescription: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
  },
  statsGrid: {
    gap: Spacing.base,
  },
  statsCarousel: {
    gap: Spacing.base,
  },
  statsSlides: {
    alignItems: "stretch",
    paddingLeft: 0,
    paddingRight: 0,
  },
  statSlide: {
    flexGrow: 0,
  },
  statSlideInner: {
    height: STAT_CARD_HEIGHT,
    justifyContent: "center",
    width: "100%",
  },
  statLabelLight: {
    ...Typography.caption,
    color: withAlpha("#ffffff", 0.8),
    letterSpacing: 0.6,
  },
  vitalityCard: {
    flex: 1,
    borderRadius: 18,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small + 2,
    gap: Spacing.small,
  },
  vitalityHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  vitalityLabel: {
    ...Typography.caption,
    color: withAlpha("#e6fff4", 0.9),
    letterSpacing: 1,
  },
  vitalityValue: {
    ...Typography.h1,
    color: "#ffffff",
    fontSize: 30,
    lineHeight: 30,
    fontWeight: "800",
    marginTop: -4,
    marginBottom: -2,
  },
  vitalityHeart: {
    fontSize: 20,
    color: "#ff8ba3",
  },
  vitalityBar: {
    height: 8,
    borderRadius: Radii.pill,
    overflow: "hidden",
    marginTop: Spacing.tiny,
    position: "relative",
  },
  vitalityBarTrack: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: withAlpha("#8ce2b1", 0.35),
  },
  vitalityBarFill: {
    height: "100%",
    borderRadius: Radii.pill,
  },
  vitalityHint: {
    ...Typography.body,
    color: withAlpha("#ffffff", 0.9),
    fontSize: 12,
  },
  bondCard: {
    flex: 1,
    borderRadius: 18,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
    gap: Spacing.base,
  },
  bondHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  bondLabel: {
    ...Typography.caption,
    color: withAlpha("#ffffff", 0.8),
    letterSpacing: 0.9,
  },
  bondMoodTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  bondMoodValue: {
    ...Typography.body,
    color: "#ffe48d",
    fontWeight: "700",
  },
  bondMoodEmoji: {
    fontSize: 16,
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
    color: withAlpha("#f0e9ff", 0.8),
  },
  bondMeterValue: {
    ...Typography.caption,
    fontWeight: "700",
  },
  bondMeterTrack: {
    height: 6,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha("#ffffff", 0.12),
  },
  bondMeterFill: {
    height: "100%",
    borderRadius: Radii.pill,
  },
  climateCard: {
    flex: 1,
    borderRadius: 18,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
    gap: Spacing.small,
    position: "relative",
  },
  climateHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  climateLabel: {
    ...Typography.caption,
    color: withAlpha("#d0e2ff", 0.9),
    letterSpacing: 0.9,
  },
  climateInfoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  climateValue: {
    ...Typography.h1,
    color: Colors.text,
    fontSize: 26,
  },
  climateIcon: {
    fontSize: 22,
  },
  climateCondition: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  climateLocationMeta: {
    ...Typography.caption,
    color: withAlpha("#d0e2ff", 0.85),
  },
  climateFlowPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    borderRadius: 6,
    backgroundColor: withAlpha("#ffffff", 0.1),
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
    marginTop: Spacing.small,
  },
  climateFlowIcon: {
    fontSize: 14,
    color: Colors.secondary,
  },
  climateFlowText: {
    ...Typography.caption,
    color: Colors.text,
    textAlign: "center",
  },
  climateTrendText: {
    ...Typography.caption,
    color: withAlpha(Colors.textMuted, 0.85),
  },
  formCard: {
    flex: 1,
    borderRadius: 18,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small + 2,
    gap: Spacing.tiny + 2,
  },
  formHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  formLabel: {
    ...Typography.caption,
    color: withAlpha("#ffe6c5", 0.85),
    letterSpacing: 0.9,
  },
  formStageBadge: {
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: withAlpha("#ffffff", 0.35),
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
    backgroundColor: withAlpha("#ffffff", 0.12),
  },
  formStageBadgeText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  nextFormStack: {
    gap: Spacing.small,
  },
  nextFormMainRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.base,
  },
  formCopy: {
    flex: 1,
    gap: Spacing.tiny / 4,
    minWidth: 0,
  },
  nextFormPercent: {
    ...Typography.body,
    color: Colors.text,
    fontSize: 25,
    lineHeight: 28,
    fontWeight: "700",
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
  formTipChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    alignSelf: "center",
    borderRadius: 6,
    marginTop: Spacing.small,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
  },
  formTipIcon: {
    fontSize: 14,
  },
  formTipText: {
    ...Typography.caption,
    color: Colors.text,
    textAlign: "center",
  },
  nextFormProgressTrack: {
    height: 6,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha("#ffffff", 0.18),
    overflow: "hidden",
  },
  nextFormProgressFill: {
    height: "100%",
    borderRadius: Radii.pill,
  },
});





