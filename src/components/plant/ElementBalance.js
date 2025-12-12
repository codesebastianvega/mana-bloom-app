// [MB] M?dulo: Planta / Secci?n: Balance elemental
// Afecta: PlantScreen (secci?n de elementos)
// Prop?sito: donut superior + grid 2?2 (Fuego, Agua, Tierra, Viento)
// Puntos de edici?n futura: conectar con m?tricas y buffs elementales
// Autor: Codex - Fecha: 2025-11-13

import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
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
    description: "Prefieres h?bitos tranquilos. A?ade fuego para empujar objetivos.",
    color: Colors.elementWater,
  },
  earth: {
    label: "Met?dico (Tierra)",
    description: "Proyectos largos dominan tu agenda. Mezcla viento para explorar ideas.",
    color: Colors.elementEarth,
  },
  wind: {
    label: "Explorador (Aire)",
    description: "Mucho aprendizaje y notas. Suma tierra y agua para aterrizar h?bitos.",
    color: Colors.elementAir,
  },
  balanced: {
    label: "Equilibrado",
    description: "Tus tareas y h?bitos se reparten parejo entre los elementos.",
    color: Colors.text,
  },
};

const PERSONA_GUIDANCE = {
  fire: "Tu energ?a va a tope: intercala h?bitos de agua y notas de aire para enfriar el ritmo sin perder foco.",
  water:
    "Est?s fluyendo, pero a?ade misiones de fuego y proyectos de tierra para evitar quedarte en modo pausa.",
  earth:
    "Tu plan es met?dico; reserva slots de aire y agua para que las ideas se muevan y la mente respire.",
  wind:
    "Hay muchas ideas en juego; aterriza esa energ?a con tareas de tierra y descansos de agua.",
  balanced: "Tienes una mezcla pareja. Vigila que ning?n elemento supere 35% para sostener la armon?a.",
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

  const syncPercent = Math.max(0, Math.min(100, Math.round((1 - summary.gap) * 100)));

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

  const preferredKey = summary.highest?.key ?? order[0];
  const [expandedKey, setExpandedKey] = useState(preferredKey);

  const statusAccent = statusAccentColor(summary.status);

  return (
    <View style={[styles.container, style]}>
      <LinearGradient
        colors={[withAlpha(Colors.surfaceElevated, 0.9), withAlpha(Colors.surfaceAlt, 0.75)]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.summaryCard}
      >
        <Text style={styles.summaryEssenceLabel}>ESENCIA</Text>
        <Text style={[styles.summaryPersonaTitle, { color: persona.color }]}>
          {persona.label}
        </Text>
        <Text style={styles.summaryGuidance}>{personaAdvice}</Text>
        <View style={styles.syncRow}>
          <View style={styles.syncBar}>
            <View style={[styles.syncFill, { width: `${syncPercent}%` }]} />
          </View>
        </View>
        <View style={styles.syncMetaRow}>
          <View style={styles.syncMetaTile}>
            <Text style={styles.syncMetaLabel}>Sincron?a</Text>
            <Text style={styles.syncMetaValue}>{syncPercent}%</Text>
          </View>
          <View
            style={[
              styles.syncMetaTile,
              styles.syncStatusTile,
              { borderColor: withAlpha(statusAccent, 0.4) },
            ]}
          >
            <Text style={[styles.syncMetaLabel, { color: statusAccent }]}>Estado</Text>
            <Text style={[styles.syncStatusValue, { color: statusAccent }]}>
              {summary.status}
            </Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.grid}>
        {order.map((key) => {
          const percent = Math.round(data[key] * 100);
          const status = statusLabel(data[key]);
          const bucket = counts[key] || { tasks: 0, habits: 0 };
          const isExpanded = expandedKey === key;

          return (
            <Pressable
              key={key}
              style={({ pressed }) => [
                styles.tileWrapper,
                pressed && styles.tilePressed,
              ]}
              android_ripple={{ color: withAlpha(COLORS[key], 0.2) }}
              onPress={() => {
                setExpandedKey((prev) => (prev === key ? null : key));
              }}
              accessibilityRole="button"
              accessibilityLabel={`Mostrar tareas de ${labelFor(key)}`}
            >
              <LinearGradient
                colors={[withAlpha(Colors.surfaceAlt, 0.95), withAlpha(COLORS[key], 0.16)]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={[
                  styles.tile,
                  !isExpanded && styles.tileCollapsed,
                  { borderColor: withAlpha(COLORS[key], 0.5) },
                ]}
              >
                <View style={styles.tileTopRow}>
                  <View style={styles.tileHeaderLeft}>
                    <View
                      style={[
                        styles.tileIconWrap,
                        { backgroundColor: withAlpha(COLORS[key], 0.25) },
                      ]}
                    >
                      <Image source={ICONS[key]} style={styles.tileIcon} />
                    </View>
                    <View style={styles.tileTitleGroup}>
                      <Text style={styles.tileTitle}>{labelFor(key)}</Text>
                      <Text style={styles.tileCounts}>{statusCopy(status)}</Text>
                    </View>
                  </View>
                  <Text style={[styles.tilePercent, { color: COLORS[key] }]}>{percent}%</Text>
                </View>
                <View style={styles.track}>
                  <View
                    style={[
                      styles.fill,
                      { width: `${percent}%`, backgroundColor: COLORS[key] },
                    ]}
                  />
                </View>
                {isExpanded && (
                  <>
                    <View style={styles.tileStatsRow}>
                      <View style={styles.tileStatCard}>
                        <Text style={styles.tileStatNumber}>{bucket.tasks}</Text>
                        <Text style={styles.tileStatLabel}>Tareas</Text>
                      </View>
                      <View style={styles.tileStatCard}>
                        <Text style={styles.tileStatNumber}>{bucket.habits}</Text>
                        <Text style={styles.tileStatLabel}>H?bitos</Text>
                      </View>
                    </View>
                    <View style={styles.tileAdvice}>
                      <Text style={styles.tileAdviceLabel}>Consejo alqu?mico</Text>
                      <Text style={styles.tileAdviceText}>
                        {capitalizeFirst(complementSuggestion(key))}
                      </Text>
                    </View>
                  </>
                )}
              </LinearGradient>
            </Pressable>
          );
        })}
      </View>
      <Text style={styles.legendText}>
        Consejo: mant?n cada elemento cerca de 25% para evitar penalizaciones.
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
  summaryEssenceLabel: {
    ...Typography.caption,
    color: withAlpha(Colors.textMuted, 0.9),
    letterSpacing: 1,
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
  syncRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  syncBar: {
    flex: 1,
    height: 8,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.text, 0.12),
    overflow: "hidden",
  },
  syncFill: {
    height: "100%",
    borderRadius: Radii.pill,
    backgroundColor: Colors.primaryLight,
  },
  syncMetaRow: {
    flexDirection: "row",
    alignItems: "stretch",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  syncMetaTile: {
    flex: 1,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: withAlpha(Colors.text, 0.08),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.25),
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
    gap: Spacing.tiny / 2,
  },
  syncMetaLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
    fontSize: 10,
  },
  syncMetaValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
    fontSize: 18,
  },
  syncStatusTile: {
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.35),
  },
  syncStatusValue: {
    ...Typography.body,
    fontWeight: "700",
  },
  grid: {
    gap: Spacing.base,
  },
  tileWrapper: {
    width: "100%",
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
  tileCollapsed: {
    paddingBottom: Spacing.small,
    gap: Spacing.tiny,
  },
  tileTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  tilePercent: {
    ...Typography.body,
    fontWeight: "700",
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
  tileStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  tileStatCard: {
    flex: 1,
    borderRadius: Radii.lg,
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.3),
    paddingVertical: Spacing.small,
    alignItems: "center",
    borderWidth: 1,
    borderColor: withAlpha(Colors.text, 0.08),
  },
  tileStatNumber: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "800",
  },
  tileStatLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  tileAdvice: {
    marginTop: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: withAlpha(Colors.text, 0.08),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.25),
    padding: Spacing.small,
    gap: Spacing.tiny / 2,
  },
  tileAdviceLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    fontSize: 10,
  },
  tileAdviceText: {
    ...Typography.body,
    color: Colors.text,
    fontSize: 12,
  },
  legendText: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: "center",
  },
});














function statusCopy(status) {
  switch (status) {
    case "Alto":
      return "Necesita balance";
    case "Bajo":
      return "Activa más acciones";
    default:
      return "Estable";
  }
}

function capitalizeFirst(text = "") {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
}
