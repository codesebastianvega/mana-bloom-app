// [MB] Módulo: Planta / Sección: Balance elemental
// Afecta: PlantScreen (sección de elementos)
// Propósito: donut superior + grid 2×2 (Fuego, Agua, Tierra, Viento)
// Puntos de edición futura: conectar con métricas y buffs elementales
// Autor: Codex - Fecha: 2025-11-13

import React, { useMemo } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
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

export default function ElementBalance({ values = {}, style, onSelectElement }) {
  const data = {
    fire: clamp01(values.fire ?? 0.5),
    water: clamp01(values.water ?? 0.5),
    earth: clamp01(values.earth ?? 0.5),
    wind: clamp01(values.wind ?? 0.5),
  };

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

  const summaryHint = persona.description;

  const averagePercent = useMemo(() => {
    const valuesArr = Object.values(data);
    if (!valuesArr.length) return 0;
    const sum = valuesArr.reduce((acc, val) => acc + val, 0);
    return Math.round((sum / valuesArr.length) * 100);
  }, [data.fire, data.water, data.earth, data.wind]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.summaryCard}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryText}>
            <Text style={styles.summaryLabel}>Balance elemental</Text>
            <Text style={[styles.summaryPersona, { color: persona.color }]}>
              {persona.label}
            </Text>
            <Text style={styles.summaryHint}>{summaryHint}</Text>
          </View>
          <Text style={styles.summaryPercent}>{averagePercent}%</Text>
        </View>
      </View>

      <View style={styles.grid}>
        {order.map((key) => {
          const percent = Math.round(data[key] * 100);
          const status = statusLabel(data[key]);
          const statusStyle =
            status === "Alto"
              ? styles.statusHigh
              : status === "Bajo"
              ? styles.statusLow
              : styles.statusNeutral;
          const counts = values?.counts?.[key] || { tasks: 0, habits: 0 };

          return (
            <Pressable
              key={key}
              style={styles.tile}
              onPress={() => onSelectElement?.(key)}
              accessibilityRole="button"
              accessibilityLabel={`Mostrar tareas de ${labelFor(key)}`}
            >
              <View style={styles.tileRow}>
                <View style={styles.tileLeft}>
                  <View style={styles.tileHeader}>
                    <Image source={ICONS[key]} style={styles.tileIcon} />
                    <Text style={styles.tileTitle}>{labelFor(key)}</Text>
                  </View>
                  <Text style={styles.tileValue}>{percent}%</Text>
                </View>
                <View style={styles.tileRight}>
                  <Text style={[styles.tileStatus, statusStyle]}>{status}</Text>
                  <Text style={styles.tileTip}>
                    {counts.tasks} tareas · {counts.habits} hábitos
                  </Text>
                  <View style={styles.track}>
                    <View
                      style={[
                        styles.fill,
                        { width: `${percent}%`, backgroundColor: COLORS[key] },
                      ]}
                    />
                  </View>
                </View>
              </View>
            </Pressable>
          );
        })}
      </View>
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
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  summaryText: {
    flex: 1,
    gap: Spacing.tiny / 2,
  },
  summaryLabel: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  summaryPersona: {
    ...Typography.caption,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  summaryHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  summaryPercent: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "700",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
  },
  tile: {
    flexGrow: 1,
    minWidth: 148,
    backgroundColor: withAlpha(Colors.surface, 0.5),
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.22),
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small + Spacing.tiny,
    gap: Spacing.small,
  },
  tileRow: {
    flexDirection: "row",
    gap: Spacing.large,
    alignItems: "center",
  },
  tileLeft: {
    flex: 0.35,
    gap: Spacing.tiny,
    alignItems: "center",
  },
  tileRight: {
    flex: 0.65,
    gap: Spacing.tiny,
  },
  tileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  tileIcon: {
    width: 32,
    height: 32,
    resizeMode: "contain",
  },
  tileInfo: {
    flex: 1,
  },
  tileTitle: {
    ...Typography.caption,
    color: Colors.text,
  },
  tileValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
    textAlign: "center",
  },
  tileStatus: {
    ...Typography.caption,
    fontWeight: "700",
  },
  statusHigh: {
    color: Colors.warning,
  },
  statusLow: {
    color: Colors.secondary,
  },
  statusNeutral: {
    color: Colors.textMuted,
  },
  tileTip: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 11,
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
});
