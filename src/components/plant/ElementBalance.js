// [MB] Módulo: Planta / Sección: Balance elemental
// Afecta: PlantScreen (sección de elementos)
// Propósito: donut superior + grid 2×2 (Fuego, Agua, Tierra, Viento)
// Puntos de edición futura: conectar con métricas y buffs elementales
// Autor: Codex - Fecha: 2025-11-13

import React, { useMemo } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Svg, { Circle } from "react-native-svg";
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

const clamp01 = (n) => Math.max(0, Math.min(1, Number.isFinite(n) ? n : 0));

const ICONS = {
  fire: require("../../../assets/fire.png"),
  water: require("../../../assets/water.png"),
  earth: require("../../../assets/earth.png"),
  wind: require("../../../assets/wind.png"),
};

const COLORS = {
  fire: Colors.elementFire,
  water: Colors.elementWater,
  earth: Colors.elementEarth,
  wind: Colors.elementAir,
};

const PERSONA_PRESETS = {
  fire: {
    label: "Agresivo (Fuego)",
    description: "Priorizas tareas intensas. Compensa con pausas de agua y notas de aire.",
    color: Colors.elementFire,
  },
  water: {
    label: "Paciente (Agua)",
    description: "Prefieres hábitos tranquilos. Añade fuego para empujar objetivos.",
    color: Colors.elementWater,
  },
  earth: {
    label: "Metódico (Tierra)",
    description: "Proyectos largos dominan tu agenda. Mezcla viento para explorar ideas.",
    color: Colors.elementEarth,
  },
  wind: {
    label: "Explorador (Aire)",
    description: "Mucho aprendizaje y notas. Suma tierra y agua para aterrizar hábitos.",
    color: Colors.elementAir,
  },
  balanced: {
    label: "Equilibrado",
    description: "Tus tareas y hábitos se reparten parejo entre los elementos.",
    color: Colors.text,
  },
};

const PERSONA_GUIDANCE = {
  fire: "Tu energía va a tope: intercala hábitos de agua y notas de aire para enfriar el ritmo sin perder foco.",
  water:
    "Estás fluyendo, pero añade misiones de fuego y proyectos de tierra para evitar quedarte en modo pausa.",
  earth:
    "Tu plan es metódico; reserva slots de aire y agua para que las ideas se muevan y la mente respire.",
  wind:
    "Hay muchas ideas en juego; aterriza esa energía con tareas de tierra y descansos de agua.",
  balanced: "Tienes una mezcla pareja. Vigila que ningún elemento supere 35% para sostener la armonía.",
};

export default function ElementBalance({ values = {}, style, onSelectElement }) {
  const data = {
    fire: clamp01(values.fire ?? 0.5),
    water: clamp01(values.water ?? 0.5),
    earth: clamp01(values.earth ?? 0.5),
    wind: clamp01(values.wind ?? 0.5),
  };
  const counts = values?.counts || {};

  const order = ["fire", "water", "earth", "wind"];
  const summary = useMemo(() => {
    const entries = order.map((key) => ({ key, value: data[key] }));
    entries.sort((a, b) => b.value - a.value);
    const highest = entries[0];
    const lowest = entries[entries.length - 1];
    const gap = highest.value - lowest.value;
    const status = gap >= 0.35 ? "Desbalanceado" : gap >= 0.2 ? "Inestable" : "Equilibrado";
    return { highest, lowest, status, gap };
  }, [data.fire, data.water, data.earth, data.wind]);

  const persona = useMemo(() => {
    const { highest, gap } = summary;
    if (!highest || gap < 0.15) return PERSONA_PRESETS.balanced;
    return PERSONA_PRESETS[highest.key] || PERSONA_PRESETS.balanced;
  }, [summary]);

  const personaAdvice = useMemo(() => {
    const key = summary?.highest?.key;
    if (!key) return PERSONA_GUIDANCE.balanced;
    return PERSONA_GUIDANCE[key] || PERSONA_GUIDANCE.balanced;
  }, [summary]);

  const averagePercent = useMemo(() => {
    const valuesArr = Object.values(data);
    if (!valuesArr.length) return 0;
    const sum = valuesArr.reduce((acc, val) => acc + val, 0);
    return Math.round((sum / valuesArr.length) * 100);
  }, [data.fire, data.water, data.earth, data.wind]);
  const statusAccent = statusAccentColor(summary.status);

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={[withAlpha(Colors.surfaceElevated, 0.9), withAlpha(Colors.surfaceAlt, 0.75)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.summaryCard}
      >
        <View style={styles.summaryHeader}>
          <Text style={styles.summaryLabel}>Personalidad</Text>
          <Text
            style={[
              styles.summaryStatusChip,
              { borderColor: statusAccent, color: statusAccent },
            ]}
          >
            {summary.status}
          </Text>
        </View>
        <View style={styles.summaryRow}>
          <View style={styles.summaryText}>
            <Text style={[styles.summaryPersonaTitle, { color: persona.color }]}>
              {persona.label}
            </Text>
            <Text style={styles.summaryGuidance}>{personaAdvice}</Text>
          </View>
          <BalanceDial percent={averagePercent} />
        </View>
      </LinearGradient>

      <View style={styles.grid}>
        {order.map((key) => {
          const percent = Math.round(data[key] * 100);
          const status = statusLabel(data[key]);
          const bucket = counts[key] || { tasks: 0, habits: 0 };
          const capsuleStyle =
            status === "Alto"
              ? styles.statusCapsuleHigh
              : status === "Bajo"
              ? styles.statusCapsuleLow
              : styles.statusCapsuleNeutral;

          return (
            <Pressable
              key={key}
              style={({ pressed }) => [
                styles.tileWrapper,
                pressed && styles.tilePressed,
              ]}
              android_ripple={{ color: withAlpha(COLORS[key], 0.2) }}
              onPress={() => onSelectElement?.(key)}
              accessibilityRole="button"
              accessibilityLabel={`Mostrar tareas de ${labelFor(key)}`}
            >
              <LinearGradient
                colors={[withAlpha(Colors.surfaceAlt, 0.9), withAlpha(COLORS[key], 0.12)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.tile}
              >
                <View style={styles.tileHeaderRow}>
                  <View style={styles.tileHeaderLeft}>
                    <View style={styles.tileIconWrap}>
                      <Image source={ICONS[key]} style={styles.tileIcon} />
                    </View>
                    <View style={styles.tileTitleGroup}>
                      <Text style={styles.tileTitle}>{labelFor(key)}</Text>
                      <Text style={styles.tileCounts}>
                        {bucket.tasks} tareas · {bucket.habits} hábitos
                      </Text>
                    </View>
                  </View>
                  <Text style={[styles.statusCapsule, capsuleStyle]}>{status}</Text>
                </View>
                <View style={styles.tileBody}>
                  <View style={styles.percentRow}>
                    <View
                      style={[
                        styles.percentPill,
                        { backgroundColor: withAlpha(COLORS[key], 0.25) },
                      ]}
                    >
                      <Text style={styles.percentPillText}>{percent}%</Text>
                    </View>
                    <Text style={styles.percentCopy}>
                      {status === "Alto"
                        ? "Necesita balance"
                        : status === "Bajo"
                        ? "Súbele actividad"
                        : "Estable"}
                    </Text>
                  </View>
                  <View style={styles.track}>
                    <View
                      style={[
                        styles.fill,
                        { width: `${percent}%`, backgroundColor: COLORS[key] },
                      ]}
                    />
                  </View>
                  <Text style={styles.tileSuggestion}>
                    Refuerza con {complementSuggestion(key)}
                  </Text>
                </View>
              </LinearGradient>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.legendText}>
        Consejo: mantén cada elemento cerca de 25% para evitar penalizaciones.
      </Text>
    </View>
  );
}

function labelFor(key) {
  switch (key) {
    case "fire":
      return "Fuego";
    case "water":
      return "Agua";
    case "earth":
      return "Tierra";
    case "wind":
      return "Viento";
    default:
      return String(key);
  }
}

function statusLabel(value) {
  if (value >= 0.7) return "Alto";
  if (value <= 0.35) return "Bajo";
  return "Estable";
}

function statusAccentColor(status) {
  switch (status) {
    case "Desbalanceado":
      return Colors.warning;
    case "Inestable":
      return Colors.secondary;
    default:
      return Colors.success;
  }
}

function complementSuggestion(key) {
  switch (key) {
    case "fire":
      return "agua (descanso) y tareas de aire";
    case "water":
      return "fuego (ritual Sunlight) para retomar momentum";
    case "earth":
      return "aire (notas, gratitud)";
    case "wind":
      return "tierra (proyectos) y agua (hidrata/descansa)";
    default:
      return "otros elementos para equilibrar";
  }
}

function BalanceDial({ percent = 0 }) {
  const clamped = Math.max(0, Math.min(100, Math.round(percent)));
  const size = 72;
  const strokeWidth = 6;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (clamped / 100) * circumference;

  return (
    <View style={styles.dialWrapper}>
      <Svg width={size} height={size}>
        <Circle
          stroke={withAlpha(Colors.text, 0.12)}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <Circle
          stroke={Colors.primaryLight}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      <View style={styles.dialLabel}>
        <Text style={styles.dialPercent}>{clamped}%</Text>
        <Text style={styles.dialCaption}>Promedio</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.base,
  },
  summaryCard: {
    borderRadius: Radii.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.2),
    gap: Spacing.small,
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.small,
  },
  summaryText: {
    flex: 1,
    gap: Spacing.tiny / 2,
  },
  summaryLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    letterSpacing: 1,
    textTransform: "uppercase",
  },
  summaryPersonaTitle: {
    ...Typography.title,
    fontSize: 20,
    textTransform: "none",
    fontWeight: "700",
  },
  summaryGuidance: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  summaryFooter: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  summaryStatusChip: {
    ...Typography.caption,
    borderWidth: 1,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    paddingVertical: 2,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontWeight: "700",
  },
  summaryContext: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  dialWrapper: {
    width: 76,
    height: 76,
    justifyContent: "center",
    alignItems: "center",
  },
  dialLabel: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  dialPercent: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "700",
  },
  dialCaption: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 10,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
  },
  tileWrapper: {
    flexGrow: 1,
    minWidth: 148,
    borderRadius: Radii.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.25),
  },
  tilePressed: {
    opacity: 0.96,
    transform: [{ scale: 0.99 }],
  },
  tile: {
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small + Spacing.tiny,
    gap: Spacing.small,
    borderRadius: Radii.xl,
    backgroundColor: withAlpha(Colors.surfaceAlt, 0.6),
  },
  tileHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  tileHeaderLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    flex: 1,
  },
  tileIconWrap: {
    width: 44,
    height: 44,
    borderRadius: Radii.lg,
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.8),
    justifyContent: "center",
    alignItems: "center",
  },
  tileIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  tileTitleGroup: {
    flex: 1,
    gap: 2,
  },
  tileTitle: {
    ...Typography.caption,
    color: Colors.text,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  tileCounts: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  tileBody: {
    gap: Spacing.small,
  },
  percentRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  percentPill: {
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    paddingVertical: 2,
  },
  percentPillText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  percentCopy: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  track: {
    height: 6,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surface, 0.35),
    overflow: "hidden",
  },
  fill: {
    height: "100%",
    borderRadius: Radii.pill,
  },
  statusCapsule: {
    ...Typography.caption,
    borderWidth: 1,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small + 2,
    paddingVertical: Spacing.tiny / 2,
    fontWeight: "700",
    textTransform: "capitalize",
    letterSpacing: 0.4,
  },
  statusCapsuleHigh: {
    borderColor: Colors.warning,
    color: Colors.warning,
  },
  statusCapsuleLow: {
    borderColor: Colors.secondary,
    color: Colors.secondary,
  },
  statusCapsuleNeutral: {
    borderColor: Colors.textMuted,
    color: Colors.textMuted,
  },
  tileSuggestion: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 11,
  },
  legendText: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: "center",
  },
});
