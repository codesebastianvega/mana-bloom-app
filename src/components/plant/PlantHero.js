import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  View,
  Text,
  Image,
  Animated,
  Pressable,
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

const SUGGESTION_ICON_MAP = {
  water: { emoji: "💧", accent: Colors.elementWater },
  feed: { emoji: "🌱", accent: Colors.elementEarth },
  clean: { emoji: "🧽", accent: Colors.primary },
  prune: { emoji: "✂️", accent: Colors.secondary },
  light: { emoji: "☀️", accent: Colors.elementFire },
  mist: { emoji: "🌫️", accent: Colors.elementAir },
  search: { emoji: "🔍", accent: Colors.secondary },
  meditate: { emoji: "🧘", accent: Colors.ritualCalm },
  hydrate: { emoji: "🚰", accent: Colors.elementWater },
  stretch: { emoji: "🤸", accent: Colors.secondary },
  sunlight: { emoji: "🌞", accent: Colors.elementFire },
  visualize: { emoji: "💭", accent: Colors.ritualJournal },
  journal: { emoji: "📓", accent: Colors.ritualJournal },
  gratitude: { emoji: "🙏", accent: Colors.secondary },
  restEyes: { emoji: "😌", accent: Colors.ritualCalm },
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

  const safeSuggestions = Array.isArray(careSuggestions)
    ? careSuggestions.slice(0, 4)
    : [];

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

      <CompanionCard status={companionStatus} onPress={onPressCompanion} />

      {ritualSummary || safeSuggestions.length ? (
        <MicroMissionsCard
          ritualSummary={ritualSummary}
          suggestions={safeSuggestions}
          onPressMission={onPressCareSuggestion}
        />
      ) : null}
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

function CompanionCard({ status, onPress }) {
  const potions = status?.potions ?? [];
  const hasActiveLoadout = Boolean(status?.pet || potions.length);
  const demoPets = [
    { id: "aurin", emoji: "\u{1F408}", name: "Aurin" },
    { id: "nix", emoji: "\u{1F98B}", name: "Nix" },
  ];

  if (!hasActiveLoadout) {
    return (
      <LinearGradient
        colors={["#36124f", "#180926"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.companionCard, styles.companionCardEmpty]}
      >
        <View style={styles.companionEmptyCopy}>
          <Text style={styles.companionEmptyTitle}>Sin compañero activo</Text>
          <Text style={styles.companionEmptySubtitle}>
            Equipa una mascota o poción para proteger la planta.
          </Text>
          <Pressable style={styles.companionButton} onPress={onPress}>
            <Text style={styles.companionButtonText}>Ver inventario</Text>
          </Pressable>
        </View>
        <View style={styles.companionPetsPreview}>
          <Text style={styles.companionPetsTitle}>Mascotas sugeridas</Text>
          <View style={styles.companionPetsRow}>
            {demoPets.map((pet) => (
              <View key={pet.id} style={styles.companionPetBadge}>
                <View style={styles.companionPetAvatar}>
                  <Text style={styles.companionPetEmoji}>{pet.emoji}</Text>
                </View>
                <Text style={styles.companionPetLabel}>{pet.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient
      colors={["#281335", "#190c25"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.companionCard}
    >
      <View style={styles.companionHeader}>
        <Text style={styles.sectionTitle}>Compañero activo</Text>
        <Pressable onPress={onPress}>
          <Text style={styles.linkText}>Cambiar</Text>
        </Pressable>
      </View>
      {status.pet ? (
        <Text style={styles.companionPet}>
          {status.pet.name} {status.pet.emoji || "\u{1F432}"}
        </Text>
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
    </LinearGradient>
  );
}
function MicroMissionsCard({
  ritualSummary,
  suggestions = [],
  onPressMission,
}) {
  const fallbackMissions = [
    {
      id: "clean_leaves",
      key: "clean",
      title: "Limpiar hojas",
      subtitle: "Detectado polvo astral",
      reward: "+50 XP",
      accent: "#5f2a88",
      emoji: "\u{1F9FD}",
    },
    {
      id: "mist",
      key: "mist",
      title: "Neblina",
      subtitle: "Aumenta humedad",
      reward: "+20 XP",
      accent: "#1b3d8c",
      emoji: "\u{1F32B}",
    },
  ];

  const missionsRaw = suggestions.slice(0, 2).map((item, index) => {
    const severity = getSeverity(item.deficit);
    const iconInfo = SUGGESTION_ICON_MAP[item.key] || {
      emoji: fallbackMissions[index]?.emoji || "?",
      accent: fallbackMissions[index]?.accent || Colors.secondary,
    };
    return {
      id: item.key,
      key: item.key,
      title: item.label,
      subtitle:
        severity.label === "Alto"
          ? "Debes atenderlo hoy"
          : severity.label === "Medio"
          ? "Refuerza el flujo pronto"
          : "Mantén el flujo estable",
      reward:
        severity.label === "Alto"
          ? "+50 XP"
          : severity.label === "Medio"
          ? "+30 XP"
          : "+20 XP",
      accent: iconInfo.accent,
      emoji: iconInfo.emoji,
    };
  });

  const missions = missionsRaw.length ? missionsRaw : fallbackMissions;
  const activeTags = ritualSummary?.tags?.slice(0, 3);
  const activeCount = ritualSummary?.active ?? 0;
  const totalCount = ritualSummary?.total ?? 8;

  return (
    <View style={styles.microShell}>
      <LinearGradient
        colors={["#1a0f2f", "#0f071d"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.ritualCard}
      >
        <View style={styles.microHeader}>
          <View style={styles.microHeaderCopy}>
            <Text style={styles.ritualLabel}>MICRO-MISIONES</Text>
            <Text style={styles.microSubtitle}>
              Activa un ritual personal para potenciar tus misiones.
            </Text>
          </View>
          <View style={styles.ritualSummaryBadge}>
            <Text
              style={styles.ritualSummaryText}
            >{`${activeCount}/${totalCount}`}</Text>
          </View>
        </View>
        {activeTags?.length ? (
          <View style={styles.ritualTagsRow}>
            {activeTags.map((tag) => (
              <View key={tag} style={styles.ritualTagChip}>
                <Text style={styles.ritualTagText}>{tag}</Text>
              </View>
            ))}
          </View>
        ) : (
          <Text style={styles.microActiveTextMuted}>
            Aún no tienes rituales activos.
          </Text>
        )}
        <View style={styles.ritualList}>
          {missions.map((mission, index) => (
            <Pressable
              key={mission.id}
              onPress={() => onPressMission?.(mission.key)}
              style={styles.missionPressable}
            >
              <LinearGradient
                colors={
                  index === 0 ? ["#4c1f6b", "#2c1348"] : ["#15294f", "#0e1735"]
                }
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.missionRow}
              >
                <View
                  style={[
                    styles.missionIconWrap,
                    {
                      backgroundColor: withAlpha(
                        mission.accent || Colors.secondary,
                        0.3
                      ),
                    },
                  ]}
                >
                  <Text style={styles.missionIcon}>{mission.emoji || "?"}</Text>
                </View>
                <View style={styles.missionCopy}>
                  <Text style={styles.missionTitle}>{mission.title}</Text>
                  <Text style={styles.missionSubtitle}>{mission.subtitle}</Text>
                </View>
                <LinearGradient
                  colors={["#30e49c", "#18c678"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.missionReward}
                >
                  <Text style={styles.missionRewardText}>{mission.reward}</Text>
                </LinearGradient>
              </LinearGradient>
            </Pressable>
          ))}
        </View>
      </LinearGradient>
    </View>
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
    alignSelf: "flex-start",
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
  companionCard: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: withAlpha(Colors.surface, 0.3),
    padding: Spacing.base,
    gap: Spacing.small,
  },
  companionCardEmpty: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.large,
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
  companionEmptyCopy: {
    flex: 1,
    gap: Spacing.small,
  },
  companionEmptyTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
    fontSize: 18,
  },
  companionEmptySubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  companionPetsPreview: {
    flex: 1,
    gap: Spacing.small,
  },
  companionPetsTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  companionPetsRow: {
    flexDirection: "row",
    gap: Spacing.small,
    flexWrap: "wrap",
  },
  companionPetBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small / 2,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.lg,
    backgroundColor: withAlpha("#000000", 0.25),
  },
  companionPetAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: withAlpha("#ffffff", 0.08),
  },
  companionPetEmoji: {
    fontSize: 18,
  },
  companionPetLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  companionButton: {
    alignSelf: "flex-start",
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: withAlpha(Colors.secondary, 0.8),
    backgroundColor: withAlpha(Colors.secondary, 0.12),
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
  microShell: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: withAlpha("#ffffff", 0.12),
    borderStyle: "dashed",
    padding: 2,
  },
  ritualCard: {
    borderRadius: Radii.xl,
    padding: Spacing.base,
    gap: Spacing.base,
  },
  microHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  microHeaderCopy: {
    flex: 1,
    gap: Spacing.tiny / 2,
  },
  microSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  ritualSummaryBadge: {
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
    backgroundColor: withAlpha("#000000", 0.35),
  },
  ritualSummaryText: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: "700",
  },
  ritualTagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
  },
  ritualTagChip: {
    borderRadius: Radii.pill,
    backgroundColor: withAlpha("#ffffff", 0.08),
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
  },
  ritualTagText: {
    ...Typography.caption,
    color: Colors.text,
  },
  microActiveTextMuted: {
    ...Typography.caption,
    color: withAlpha(Colors.textMuted, 0.9),
  },
  ritualList: {
    gap: Spacing.small,
  },
  missionPressable: {
    borderRadius: Radii.lg,
    overflow: "hidden",
  },
  missionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    borderRadius: Radii.lg,
    padding: Spacing.small,
  },
  missionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  missionIcon: {
    fontSize: 20,
  },
  missionCopy: {
    flex: 1,
  },
  missionTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  missionSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  missionReward: {
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
  },
  missionRewardText: {
    ...Typography.caption,
    color: Colors.textInverse,
    fontWeight: "700",
  },
  linkText: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: "700",
  },
});
