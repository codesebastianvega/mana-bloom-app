// [MB] Módulo: Planta / Sección: Hero animado
// Afecta: PlantScreen (demo inicial)
// Propósito: mostrar la planta junto a métricas y barra de salud
// Puntos de edición futura: enlazar métricas reales, animaciones extra
// Autor: Codex - Fecha: 2025-08-16

import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, Animated, Easing, StyleSheet, ScrollView, Pressable } from "react-native";
import Svg, { Circle } from "react-native-svg";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const withAlpha = (hex = "", alpha = 1) => {
  if (!hex) return hex;
  let cleaned = `${hex}`.replace("#", "").trim();
  if (cleaned.length === 3) cleaned = cleaned.split("").map((c) => c + c).join("");
  if (cleaned.length === 8) cleaned = cleaned.slice(0, 6);
  if (cleaned.length !== 6) return hex;
  const value = parseInt(cleaned, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const SIZE_MAP = {
  md: Spacing.xlarge * 5.5,
  lg: Spacing.xlarge * 6.5,
  xl: Spacing.xlarge * 7.5,
  hero: Spacing.xlarge * 8.5,
};

const STAGES = [
  { key: "semilla", label: "Semilla", icon: "🥚", preview: "🌱", accent: Colors.elementEarthLight },
  { key: "germen", label: "Germen", icon: "🌿", preview: "🌿", accent: Colors.elementEarth },
  { key: "brote", label: "Brote", icon: "🌱", preview: "🌰", accent: Colors.elementWaterLight },
  { key: "juvenil", label: "Juvenil", icon: "🍃", preview: "🍃", accent: Colors.elementWater },
  { key: "vibrante", label: "Vibrante", icon: "🌼", preview: "🌼", accent: Colors.accent },
  { key: "floreciente", label: "Floreciente", icon: "🌸", preview: "🌸", accent: Colors.ritualJournal },
  { key: "radiante", label: "Radiante", icon: "☀️", preview: "☀️", accent: Colors.ritualSun },
  { key: "madura", label: "Madura", icon: "🌳", preview: "🌳", accent: Colors.secondary },
  { key: "sage", label: "Sabia", icon: "🌙", preview: "🌙", accent: Colors.ritualCalm },
  { key: "arcana", label: "Arcana", icon: "✨", preview: "✨", accent: Colors.primaryFantasy },
];

const LEVELS_PER_STAGE = 10;

const STAGE_TIPS = {
  semilla: "Dedica tiempo a hábitos suaves para germinar tu rutina.",
  germen: "Sigue regando con tareas cortas para consolidar momentum.",
  brote: "Introduce misiones de enfoque y revisiones diarias para crecer.",
  juvenil: "Combina proyectos largos con pausas activas para no saturarte.",
  vibrante: "Prioriza retos de fuego y comparte logros para potenciar XP.",
  floreciente: "Añade rituales y descansos profundos para sostener la energía.",
  radiante: "Protege tu planta evitando sobrecarga; alterna tareas duras y suaves.",
  madura: "Enfócate en optimizar hábitos existentes y pulir detalles.",
  sage: "Experimenta con nuevas disciplinas y documenta aprendizajes.",
  arcana: "Explora habilidades avanzadas y comparte conocimientos con tu guild.",
};

const CTA_RAINBOW = [
  Colors.primary,
  Colors.secondary,
  Colors.elementWater,
  Colors.accent,
];

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
  style,
  stageProgress,
  careSuggestions = [],
  onPressCareSuggestion,
  companionStatus,
  onPressCompanion,
}) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!showAura) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(anim, {
          toValue: 1,
          duration: 1750,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration: 1750,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [anim, showAura]);

  const baseSize = SIZE_MAP[size] || SIZE_MAP.lg;
  const scale = !showAura
    ? 1
    : anim.interpolate({ inputRange: [0, 1], outputRange: [1, 1.03] });
  const auraOpacity = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.08, 0.18],
  });
  const auraSizeOuter = baseSize * 1.45;

  const label = `Planta ${stage}; salud ${Math.round(
    health * 100
  )}%; ánimo ${mood}`;
  const healthPercent = Math.round(Math.max(0, Math.min(1, health)) * 100);
  const healthGradient =
    healthPercent > 66
      ? [Colors.success, Colors.success]
      : healthPercent > 33
      ? [Colors.success, Colors.warning]
      : [Colors.warning, Colors.danger];

  const healthColor =
    healthPercent > 66
      ? Colors.success
      : healthPercent > 33
      ? Colors.warning
      : Colors.danger;
  const chips = careMetrics.map((item) => ({
    key: item.key,
    label: item.label,
    percent: Math.round(Math.max(0, Math.min(1, item.value ?? 0)) * 100),
  }));
  const wellbeingChips = wellbeingMetrics.map((item) =>
    mapWellbeingChip(item, climateInfo)
  );
  const derivedRitualSummary = ritualSummary
    ? {
        key: "rituals",
        label: "Rituales",
        display: `${ritualSummary.active} / ${ritualSummary.total}`,
        active: ritualSummary.active,
        total: ritualSummary.total,
        tags:
          ritualSummary.tags && ritualSummary.tags.length > 0
            ? ritualSummary.tags
            : [],
        accent: Colors.accent,
      }
    : wellbeingChips.find((chip) => chip.key === "rituals");
  const temperatureChip = wellbeingChips.find(
    (chip) => chip.key === "temperature"
  );
  const moodChip = wellbeingChips.find((chip) => chip.key === "mood");
  const focusChip = wellbeingChips.find((chip) => chip.key === "focus");
  const secondaryChipsRaw = [moodChip, focusChip].filter(Boolean);

  const stageInfo = stageProgress || {};
  const sliderRef = useRef(null);
  const stagePercent = Math.max(
    0,
    Math.min(100, Math.round((stageInfo.progress ?? 0) * 100))
  );
  const totalLevels = STAGES.length * LEVELS_PER_STAGE;
  const absoluteLevel = Math.min(
    totalLevels,
    Math.max(0, stageInfo.progress ?? 0) * totalLevels
  );
  const fallbackIndex = Math.max(
    0,
    STAGES.findIndex((s) => s.key === (stageInfo.stage || stage))
  );
  const stageIndex = Math.min(
    STAGES.length - 1,
    stageInfo.progress > 0
      ? Math.floor(absoluteLevel / LEVELS_PER_STAGE)
      : fallbackIndex >= 0
      ? fallbackIndex
      : 0
  );
  const currentStage = STAGES[stageIndex] || STAGES[0];
  const nextStage = STAGES[Math.min(STAGES.length - 1, stageIndex + 1)];
  const levelWithinStage = absoluteLevel - stageIndex * LEVELS_PER_STAGE;
  const subPercent = Math.round((levelWithinStage / LEVELS_PER_STAGE) * 100);
  const stageHint =
    stageInfo.etaText || "Completa tareas para desbloquear la siguiente etapa";
  const [activeStageTip, setActiveStageTip] = useState(null);

  useEffect(() => {
    if (!sliderRef.current) return;
    const slideWidth = 168 + Spacing.small;
    const offset = Math.max(0, stageIndex * slideWidth - slideWidth);
    sliderRef.current.scrollTo({ x: offset, animated: true });
  }, [stageIndex]);

  const careSuggestionList = Array.isArray(careSuggestions)
    ? careSuggestions
    : [];
  const safeCompanionStatus = companionStatus || {};
  const topSuggestion = careSuggestionList[0];
  const leftStatStack = [
    <HealthChip
      key="health"
      percent={healthPercent}
      gradient={healthGradient}
      color={healthColor}
    />,
  ];
  if (moodChip) {
    leftStatStack.push(
      <StatDetailChip
        key="mood"
        emoji={moodChip.emoji || "😊"}
        label={moodChip.label}
        value={moodChip.display}
        accent={moodChip.accent}
        meta={moodChip.meta}
      />
    );
  }
  leftStatStack.push(
    <CompanionChip
      key="companion"
      status={safeCompanionStatus}
      onAction={onPressCompanion}
    />
  );
  const rightStatStack = [];
  if (stageProgress) {
    rightStatStack.push(
      <StageDonutCard key="stage" percent={stagePercent} nextStage={nextStage?.label} />
    );
  }
  if (temperatureChip) {
    rightStatStack.push(
      <View
        key="temperature"
        style={[
          styles.subChipFull,
          styles.tempChip,
          { borderColor: temperatureChip.accent },
        ]}
      >
        <View style={styles.tempChipContent}>
          <View style={styles.tempChipHeader}>
            <Text style={styles.subChipEmoji}>🌡️</Text>
            <Text style={styles.subChipLabel}>
              {temperatureChip.label}
            </Text>
          </View>
          <Text
            style={[
              styles.tempValue,
              { color: temperatureChip.accent },
            ]}
          >
            {temperatureChip.display}
          </Text>
          {temperatureChip.meta ? (
            <Text style={styles.subChipMeta}>
              {temperatureChip.meta}
            </Text>
          ) : null}
        </View>
      </View>
    );
  }
  const handleStagePress = (item) => {
    setActiveStageTip((prev) => {
      if (prev && prev.title === item.label) {
        return null;
      }
      return {
        title: item.label,
        text: STAGE_TIPS[item.key] || stageHint,
      };
    });
  };

  return (
    <View style={[styles.container, style]}>
      <View style={styles.heroRow}>
        {chips.length ? (
          <View style={styles.metricsColumn}>
            {chips.map((chip) => (
              <View key={chip.key} style={styles.metricChip}>
                <Text style={styles.metricLabel}>{chip.label}</Text>
                <Text style={styles.metricValue}>{chip.percent}%</Text>
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
                  width: auraSizeOuter,
                  height: auraSizeOuter,
                  borderRadius: auraSizeOuter / 2,
                  backgroundColor: Colors.primaryFantasy,
                  opacity: auraOpacity,
                  transform: [{ scale }],
                },
              ]}
            />
          )}
          <Animated.View
            accessibilityRole="image"
            accessibilityLabel={label}
            style={[
              styles.hero,
              {
                width: baseSize,
                height: baseSize,
                borderRadius: baseSize / 2,
                transform: [{ scale }],
                backgroundColor: showAura ? Colors.surface : "transparent",
                shadowOpacity: showAura ? 0.25 : 0,
              },
            ]}
          >
            {source ? (
              <Image
                source={source}
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: baseSize / 2,
                }}
                resizeMode="contain"
              />
            ) : (
              <Text style={{ fontSize: baseSize * 0.6 }}>🌱</Text>
            )}
            {skinAccent && showAura && (
              <View
                pointerEvents="none"
                style={[
                  styles.pot,
                  {
                    backgroundColor: skinAccent,
                    width: baseSize * 0.6,
                    height: baseSize * 0.25,
                    borderRadius: (baseSize * 0.6) / 2,
                    left: (baseSize - baseSize * 0.6) / 2,
                    bottom: Spacing.small,
                  },
                ]}
              />
            )}
          </Animated.View>
        </View>
      </View>
      {stageProgress ? (
        <View style={styles.stageSection}>
          <View style={styles.stageHeader}>
            <Text style={styles.stageTitle}>Ruta de crecimiento</Text>
            <Text style={styles.stageHint}>{stageHint}</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.stageSliderRow}
            ref={sliderRef}
          >
            {STAGES.map((item, index) => (
              <StageSlide
                key={item.key}
                stage={item}
                index={index}
                level={index === stageIndex ? subPercent : index < stageIndex ? 100 : 0}
                active={index === stageIndex}
                completed={index < stageIndex}
                onPressStage={handleStagePress}
              />
            ))}
          </ScrollView>
          {activeStageTip ? (
            <View style={styles.stageTooltip}>
              <View style={{ flex: 1 }}>
                <Text style={styles.stageTooltipTitle}>{activeStageTip.title}</Text>
                <Text style={styles.stageTooltipText}>{activeStageTip.text}</Text>
              </View>
              <Pressable
                onPress={() => setActiveStageTip(null)}
                style={styles.stageTooltipClose}
                accessibilityLabel="Cerrar detalle de etapa"
              >
                <Text style={styles.stageTooltipCloseText}>×</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      ) : null}
      <View style={styles.statsCard}>
        {(leftStatStack.length || rightStatStack.length) ? (
          <View style={styles.statColumns}>
            <View style={[styles.statColumn, styles.statColumnLeft]}>
              {leftStatStack.map((chip, idx) => (
                <View key={`left-${idx}`} style={styles.statColumnItem}>
                  {chip}
                </View>
              ))}
            </View>
            <View style={[styles.statColumn, styles.statColumnRight]}>
              {rightStatStack.map((chip, idx) => (
                <View key={`right-${idx}`} style={styles.statColumnItem}>
                  {chip}
                </View>
              ))}
            </View>
          </View>
        ) : null}
        {derivedRitualSummary ? (
          <View style={styles.ritualCard}>
            <View style={styles.ritualHeader}>
              <Text style={styles.ritualTitle}>Rituales</Text>
              <Text
                style={[
                  styles.ritualCount,
                  { color: derivedRitualSummary.accent },
                ]}
              >
                {derivedRitualSummary.display}
              </Text>
            </View>
            <Text style={styles.ritualHint}>
              Tus hábitos personales mantienen motivada a la planta.
            </Text>
            {derivedRitualSummary.active > 0 ? (
              <View style={styles.ritualTags}>
                {derivedRitualSummary.tags.map((hint) => (
                  <View key={hint} style={styles.ritualTag}>
                    <Text style={styles.ritualTagText}>{hint}</Text>
                  </View>
                ))}
              </View>
            ) : null}
          </View>
        ) : null}
        {careSuggestionList.length ? (
          <View style={styles.careSuggestionBlock}>
            <View style={styles.careSuggestionHeader}>
              <Text style={styles.careSuggestionTitle}>Cuidados sugeridos</Text>
              <Text style={styles.careSuggestionHint}>
                Prioriza estos para equilibrar
              </Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.careSuggestionRow}
            >
              {careSuggestionList.map((item) => {
                const severity = getSeverityMeta(item.deficit);
                const cooldown =
                  item.cooldownMs && item.cooldownMs > 0
                    ? formatCooldownShort(item.cooldownMs)
                    : null;
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
    </View>
  );
}

function StageSlide({ stage, index, level, active, completed, onPressStage }) {
  const displayLevel = Math.min(100, Math.max(0, Math.round(level)));
  const accentColor = stage.accent || Colors.secondary;
  const baseBorder = withAlpha(accentColor, 0.45);
  const baseBackground = withAlpha(accentColor, completed ? 0.18 : 0.08);
  const activeBackground = withAlpha(accentColor, 0.24);
  const slideStyles = [
    styles.stageSlide,
    { borderColor: baseBorder, backgroundColor: baseBackground },
    completed && styles.stageSlideCompleted,
    active && { borderColor: accentColor, backgroundColor: activeBackground },
  ];
  const dotStyles = [
    styles.stageDot,
    { borderColor: withAlpha(accentColor, active ? 1 : 0.45) },
    completed && styles.stageDotCompleted,
    active && { backgroundColor: accentColor },
  ];
  return (
    <Pressable
      style={slideStyles}
      onPress={() => onPressStage?.(stage)}
      accessibilityRole="button"
      accessibilityLabel={`Ver detalles de ${stage.label}`}
    >
      <View style={dotStyles}>
        <Text style={styles.stageDotLabel}>{index + 1}</Text>
      </View>
      <View style={styles.stageCopy}>
        <Text style={styles.stageSlideLabel}>{stage.label}</Text>
        <Text style={styles.stageSlideMeta}>
          {completed ? "Completada" : active ? `${displayLevel}%` : "Pendiente"}
        </Text>
        {active && (
          <View style={styles.stageSubBar}>
            <View
              style={[styles.stageSubFill, { width: `${Math.max(displayLevel, 6)}%` }]}
            />
          </View>
        )}
      </View>
      <Text style={[styles.stageIcon, { color: accentColor }]}>{stage.preview}</Text>
    </Pressable>
  );
}

function HealthChip({ percent, gradient, color }) {
  return (
    <View style={styles.healthChip}>
      <View style={styles.healthChipHeader}>
        <Text style={styles.healthChipTitle}>Salud</Text>
        <Text style={[styles.healthChipPercent, { color }]}>{percent}%</Text>
      </View>
      <View
        style={styles.healthChipBar}
        accessibilityRole="progressbar"
        accessibilityValue={{ now: percent, min: 0, max: 100 }}
      >
        <LinearGradient
          colors={gradient}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.healthChipFill, { width: `${Math.max(8, percent)}%` }]}
        />
      </View>
      <Text style={styles.healthChipHint}>Manténla sobre 80% para evitar retrocesos.</Text>
    </View>
  );
}

function StageDonutCard({ percent, nextStage }) {
  const size = 110;
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <View style={styles.stageDonutCard}>
      <Text style={styles.stageDonutTitle}>Etapa global</Text>
      <View style={styles.stageDonutSvg}>
        <Svg width={size} height={size}>
          <Circle
            stroke={withAlpha(Colors.text, 0.15)}
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
      <Text style={styles.stageDonutHint}>
        {nextStage ? `Siguiente: ${nextStage}` : "Etapa final"}
      </Text>
    </View>
  );
}

function StatDetailChip({ emoji, label, value, accent, meta, hint }) {
  return (
    <View
      style={[
        styles.subChipStack,
        { borderColor: accent },
      ]}
    >
      <View style={styles.subChipStackContent}>
        <Text style={styles.subChipEmoji}>{emoji}</Text>
        <Text style={styles.subChipLabel}>{label}</Text>
        <Text
          style={[
            styles.subChipInlineValue,
            { color: accent },
          ]}
        >
          {value}
        </Text>
      </View>
      {meta ? <Text style={styles.subChipMeta}>{meta}</Text> : null}
      {hint ? <Text style={styles.subChipHint}>{hint}</Text> : null}
    </View>
  );
}

function CompanionChip({ status = {}, onAction }) {
  const pet = status.pet;
  const potions = status.potions || [];
  if (pet) {
    return (
      <View style={styles.companionChip}>
        <View style={styles.companionHeader}>
          <Text style={styles.companionEmoji}>{pet.emoji || "🐾"}</Text>
          <View>
            <Text style={styles.companionTitle}>Compañero activo</Text>
            <Text style={styles.companionPetName}>{pet.name}</Text>
          </View>
        </View>
        <Text style={styles.companionPetHint}>{pet.status || "Cuidando tu planta mientras descansas."}</Text>
      </View>
    );
  }
  if (potions.length) {
    return (
      <View style={styles.companionChip}>
        <Text style={styles.companionTitle}>Pociones activas</Text>
        {potions.slice(0, 2).map((potion) => (
          <View key={potion.id} style={styles.potionRow}>
            <Text style={styles.companionEmoji}>{potion.emoji || "🧪"}</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.potionLabel}>{potion.label}</Text>
              <Text style={styles.potionHint}>
                {potion.remaining ? `Expira en ${potion.remaining}` : "En curso"}
              </Text>
            </View>
          </View>
        ))}
        {potions.length > 2 ? (
          <Text style={styles.potionMore}>+{potions.length - 2} adicionales</Text>
        ) : null}
      </View>
    );
  }
  return (
    <View style={[styles.companionChip, styles.companionEmpty]}>
      <Text style={styles.companionTitle}>Sin compañero</Text>
      <Text style={styles.companionPetHint}>
        Activa una poción o adopta una mascota premium para proteger tu planta cuando te ausentes.
      </Text>
      <Pressable
        style={styles.companionButton}
        onPress={onAction}
        accessibilityRole="button"
        accessibilityLabel="Ver más opciones de pociones o mascotas"
      >
        <View style={styles.companionRainbowBorder}>
          <LinearGradient
            colors={CTA_RAINBOW}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.companionBorder}
          />
          <View style={styles.companionButtonInner}>
            <Text style={styles.companionButtonText}>Ver más</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
}

function CareSuggestionChip({ label, accent, severity, cooldown, disabled, onPress }) {
  const color = accent || Colors.primary;
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.careSuggestionChip,
        { borderColor: withAlpha(color, 0.3), backgroundColor: withAlpha(color, 0.08) },
        disabled && styles.careSuggestionChipDisabled,
      ]}
      accessibilityRole="button"
      accessibilityLabel={`Aplicar cuidado ${label}`}
      disabled={disabled}
    >
      <View style={styles.careSuggestionInfo}>
        <Text style={[styles.careSuggestionLabel, { color }]} numberOfLines={1}>
          {label}
        </Text>
        <Text style={styles.careSuggestionMeta}>
          {cooldown ? `Disponible en ${cooldown}` : "Listo para activar"}
        </Text>
      </View>
      {severity.label ? (
        <View
          style={[
            styles.careSuggestionBadge,
            { borderColor: severity.color, backgroundColor: withAlpha(severity.color, 0.12) },
          ]}
        >
          <Text style={[styles.careSuggestionBadgeText, { color: severity.color }]}>
            {severity.label}
          </Text>
        </View>
      ) : null}
    </Pressable>
  );
}

function getSeverityMeta(deficit = 0) {
  if (deficit >= 0.2) return { label: "Alto", color: Colors.danger };
  if (deficit >= 0.1) return { label: "Medio", color: Colors.warning };
  return { label: "", color: Colors.secondary };
}

function formatCooldownShort(ms = 0) {
  if (!ms) return "";
  const minutes = Math.max(1, Math.round(ms / 60000));
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const rem = minutes % 60;
    return rem ? `${hours}h ${rem}m` : `${hours}h`;
  }
  return `${minutes}m`;
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.base,
  },
  stageSection: {
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  stageHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  stageTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  stageHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  stageSliderRow: {
    gap: Spacing.small,
    paddingRight: Spacing.base,
  },
  stageSlide: {
    width: 168,
    borderRadius: Radii.lg,
    borderWidth: 1,
    padding: Spacing.small,
    backgroundColor: "rgba(255,255,255,0.05)",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  stageSlideCompleted: {
    opacity: 0.9,
  },
  stageDot: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  stageDotCompleted: {
    backgroundColor: Colors.success,
    borderColor: Colors.success,
  },
  stageDotLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  stageCopy: {
    flex: 1,
    gap: 4,
  },
  stageSlideLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  stageSlideMeta: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  stageSubBar: {
    height: 4,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  stageSubFill: {
    height: "100%",
    borderRadius: Radii.pill,
    backgroundColor: Colors.accent,
  },
  stageIcon: {
    fontSize: 18,
  },
  stageTooltip: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(0,0,0,0.25)",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    marginTop: Spacing.small,
  },
  stageTooltipTitle: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  stageTooltipText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  stageTooltipClose: {
    width: 28,
    height: 28,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  stageTooltipCloseText: {
    color: Colors.text,
    fontWeight: "700",
    fontSize: 16,
  },
  heroRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.base,
  },
  statsCard: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(28,24,52,0.9)",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
    padding: Spacing.base,
    gap: Spacing.base,
  },
  aura: {
    position: "absolute",
  },
  hero: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
  },
  pot: {
    position: "absolute",
  },
  heroWrap: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.small,
  },
  metricsColumn: {
    minWidth: 148,
    gap: Spacing.small,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small,
  },
  metricChip: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    minWidth: 140,
  },
  metricLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  metricValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  divider: {
    height: 1,
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.08)",
    marginTop: Spacing.small,
  },
  subChipColumns: {
    flexDirection: "row",
    gap: Spacing.small,
    alignItems: "stretch",
  },
  statColumns: {
    flexDirection: "row",
    gap: Spacing.small,
    alignItems: "stretch",
  },
  statColumn: {
    flex: 1,
    gap: Spacing.small,
  },
  statColumnLeft: {
    justifyContent: "space-between",
  },
  statColumnRight: {
    justifyContent: "space-between",
  },
  statColumnItem: {
    flex: 1,
  },
  statColumnItemSpacer: {
    flex: 1,
  },
  subChipStack: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    borderRadius: Radii.lg,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    shadowColor: Colors.shadow,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    minHeight: 48,
    justifyContent: "center",
    alignItems: "stretch",
  },
  subChipFull: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    borderRadius: Radii.lg,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    shadowColor: Colors.shadow,
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    minHeight: 104,
    justifyContent: "center",
    alignItems: "center",
  },
  subChipLabelWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  subChipLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  subChipValue: {
    ...Typography.caption,
    fontWeight: "700",
  },
  subChipInlineValue: {
    ...Typography.caption,
    fontWeight: "700",
    marginLeft: Spacing.small,
  },
  subChipMeta: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 11,
  },
  subChipHint: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 11,
  },
  subChipEmoji: {
    fontSize: 14,
  },
  subChipStackContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  tempValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  tempChipContent: {
    alignItems: "center",
    gap: Spacing.small,
  },
  tempChipHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  progressChip: {
    marginTop: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    padding: Spacing.small + Spacing.tiny,
    backgroundColor: "rgba(255,255,255,0.05)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  progressChipLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  progressChipHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  progressChipValue: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "700",
  },
  careSuggestionBlock: {
    gap: Spacing.tiny,
  },
  careSuggestionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  careSuggestionTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  careSuggestionHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  careSuggestionRow: {
    gap: Spacing.small,
    paddingRight: Spacing.base,
  },
  careSuggestionChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
    minWidth: 180,
  },
  careSuggestionChipDisabled: {
    opacity: 0.5,
  },
  careSuggestionInfo: {
    flex: 1,
    gap: 2,
  },
  careSuggestionLabel: {
    ...Typography.caption,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  careSuggestionMeta: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 11,
  },
  careSuggestionBadge: {
    borderWidth: 1,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny / 2,
  },
  careSuggestionBadgeText: {
    ...Typography.caption,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  companionChip: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(255,255,255,0.05)",
    gap: Spacing.small,
    minHeight: 96,
    justifyContent: "center",
  },
  companionEmpty: {
    justifyContent: "space-between",
  },
  companionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  companionEmoji: {
    fontSize: 20,
  },
  companionTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontWeight: "700",
  },
  companionPetName: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  companionPetHint: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 11,
  },
  companionButton: {
    alignSelf: "flex-start",
  },
  companionRainbowBorder: {
    borderRadius: Radii.pill,
    padding: 1,
  },
  companionBorder: {
    borderRadius: Radii.pill,
  },
  companionButtonInner: {
    borderRadius: Radii.pill,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
  },
  companionButtonText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  potionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  potionLabel: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  potionHint: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 11,
  },
  potionMore: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontStyle: "italic",
  },
  healthChip: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(255,255,255,0.05)",
    gap: Spacing.tiny,
    flex: 1,
  },
  healthChipHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  healthChipTitle: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  healthChipPercent: {
    ...Typography.body,
    fontWeight: "700",
  },
  healthChipBar: {
    height: 12,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  healthChipFill: {
    height: "100%",
    borderRadius: Radii.pill,
  },
  healthChipHint: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 11,
  },
  stageDonutCard: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    backgroundColor: "rgba(0,0,0,0.2)",
    padding: Spacing.small,
    alignItems: "center",
    gap: Spacing.tiny,
    flex: 1,
  },
  stageDonutTitle: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  stageDonutSvg: {
    justifyContent: "center",
    alignItems: "center",
  },
  stageDonutPercent: {
    position: "absolute",
    ...Typography.title,
    color: Colors.text,
    fontWeight: "700",
  },
  stageDonutHint: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 11,
  },
  tempValue: {
    ...Typography.title,
    fontSize: 28,
    fontWeight: "800",
    paddingVertical: Spacing.tiny,
  },
  ritualCard: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(26,20,48,0.75)",
    padding: Spacing.base,
    gap: Spacing.small,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.18,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 20,
  },
  ritualHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  ritualTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  ritualCount: {
    ...Typography.body,
    fontWeight: "700",
  },
  ritualHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  ritualTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
  },
  ritualTag: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  ritualTagText: {
    ...Typography.caption,
    color: Colors.text,
  },
});

function mapWellbeingChip(item, climateInfo) {
  const value = Math.max(0, Math.min(1, item.value ?? 0));
  const percent = Math.round(value * 100);
  switch (item.key) {
    case "mood": {
      const moodState =
        percent >= 75
          ? { emoji: "😄", text: "Feliz", accent: Colors.success }
          : percent >= 45
          ? { emoji: "🙂", text: "Estable", accent: Colors.secondary }
          : percent >= 25
          ? { emoji: "😟", text: "Baja", accent: Colors.warning }
          : { emoji: "😭", text: "Crítica", accent: Colors.danger };
      return {
        key: item.key,
        label: item.label,
        display: moodState.text,
        emoji: moodState.emoji,
        accent: moodState.accent,
      };
    }
    case "temperature": {
      const tempC = Math.round(15 + value * 15);
      return {
        key: item.key,
        label: item.label,
        display: `${tempC}°C`,
        meta: climateInfo?.location
          ? climateInfo.condition
            ? `${climateInfo.location} · ${climateInfo.condition}`
            : climateInfo.location
          : undefined,
        fullWidth: true,
        accent: Colors.warning,
      };
    }
    case "rituals": {
      const active = Math.max(0, Math.round(value * 4));
      const tagCount = Math.min(3, Math.max(1, active));
      return {
        key: item.key,
        label: item.label,
        display: `${active} activos`,
        tags: Array.from({ length: tagCount }, (_, idx) => `Ritual ${idx + 1}`),
        accent: Colors.accent,
      };
    }
    case "focus": {
      const score = Math.max(0, Math.round(value * 5));
      return {
        key: item.key,
        label: item.label,
        display: `${score}/5`,
        accent: Colors.info,
      };
    }
    default:
      return {
        key: item.key,
        label: item.label,
        display: `${percent}%`,
        accent: Colors.text,
      };
  }
}

