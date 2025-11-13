// [MB] Módulo: Planta / Sección: Balance elemental
// Afecta: PlantScreen (sección de elementos)
// Propósito: donut superior + grid 2×2 (Fuego, Agua, Tierra, Viento)
// Puntos de edición futura: conectar con métricas y buffs elementales
// Autor: Codex - Fecha: 2025-11-13

import React, { useMemo } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
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

export default function ElementBalance({ values = {}, style }) {
  const data = {
    fire: clamp01(values.fire ?? 0.5),
    water: clamp01(values.water ?? 0.5),
    earth: clamp01(values.earth ?? 0.5),
    wind: clamp01(values.wind ?? 0.5),
  };

  const avg = useMemo(() => {
    const arr = Object.values(data);
    return arr.reduce((a, b) => a + b, 0) / (arr.length || 1);
  }, [data.fire, data.water, data.earth, data.wind]);

  const percent = Math.round(avg * 100);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.topRow}>
        <View style={styles.donut}>
          <View style={styles.donutInner}>
            <Text style={styles.donutValue}>{percent}%</Text>
            <Text style={styles.donutLabel}>Balance</Text>
            <Text style={styles.donutSubLabel}>elemental</Text>
          </View>
        </View>
        <View style={styles.legend}>
          {Object.entries(data).map(([key, val]) => (
            <View key={key} style={styles.legendRow}>
              <View style={[styles.legendDot, { backgroundColor: COLORS[key] }]} />
              <Text style={styles.legendText}>{labelFor(key)}</Text>
              <Text style={styles.legendPerc}>{Math.round(val * 100)}%</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.grid}>
        {(["fire", "water", "earth", "wind"]).map((key) => (
          <View key={key} style={styles.tile}>
            <View style={styles.tileHeader}>
              <Image source={ICONS[key]} style={styles.tileIcon} />
              <View style={styles.tileInfo}>
                <Text style={styles.tileTitle}>{labelFor(key)}</Text>
                <Text style={styles.tileValue}>{Math.round(data[key] * 100)}%</Text>
              </View>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${Math.round(data[key] * 100)}%`, backgroundColor: COLORS[key] }]} />
            </View>
          </View>
        ))}
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

const DONUT_SIZE = 92;

const styles = StyleSheet.create({
  container: {
    gap: Spacing.base,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.base,
  },
  donut: {
    width: DONUT_SIZE,
    height: DONUT_SIZE,
    borderRadius: DONUT_SIZE / 2,
    backgroundColor: withAlpha(Colors.surface, 0.82),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.35),
    overflow: "hidden",
  },
  donutInner: {
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.tiny / 2,
  },
  donutValue: {
    ...Typography.h1,
    fontSize: 28,
    color: Colors.text,
  },
  donutLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  donutSubLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 11,
  },
  legend: {
    flex: 1,
    gap: Spacing.tiny,
  },
  legendRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendText: {
    ...Typography.caption,
    color: Colors.text,
    flex: 1,
  },
  legendPerc: {
    ...Typography.caption,
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
  tileHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
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
