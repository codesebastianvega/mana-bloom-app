// [MB] Módulo: Tasks / Sección: Encabezado de estadísticas
// Afecta: TasksScreen (encabezado con nivel y recursos)
// Propósito: Mostrar nivel, XP actual y maná con barra estilizada
// Puntos de edición futura: ajustes de gradientes y tipografías
// Autor: Codex - Fecha: 2025-10-16

import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import {
  Colors,
  Spacing,
  Radii,
  Typography,
  ElementAccents,
  Gradients,
} from "../theme";
import {
  useProgress,
  useAppState,
  useXpMultiplier,
  useWallet,
  useActiveBuffs,
} from "../state/AppContext";

export default function StatsHeader() {
  const { level, xp, xpGoal, progress } = useProgress();
  const { mana, inventory } = useAppState();
  const wallet = useWallet();
  const buffs = useActiveBuffs();
  const { multiplier, expiresAt } = useXpMultiplier();

  const remainingMs = expiresAt ? Math.max(expiresAt - Date.now(), 0) : 0;
  const remainingText = formatRemaining(remainingMs);

  const glassBackground = withAlpha(Colors.surfaceElevated, 0.42);
  const glassBorder = withAlpha(Colors.primaryLight, 0.26);
  const xpGradient = resolveXpGradient({ buffs, inventory, wallet });
  const buffAccent = xpGradient.colors?.[1] || xpGradient.colors?.[0] || Colors.accent;
  const percent = Math.min(Math.max(progress * 100, 0), 100);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: glassBackground, borderColor: glassBorder },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.levelBlock}>
          <View style={styles.levelHeaderRow}>
            <Text style={styles.blockLabel}>Nivel</Text>
            <Text style={styles.levelValue}>{level}</Text>
          </View>
          <Text style={styles.xpSummary}>{`${xp}/${xpGoal} XP`}</Text>
        </View>
        <View style={styles.manaBlock}>
          <Text style={styles.blockLabel}>Maná</Text>
          <Text style={styles.manaValue}>{mana}</Text>
        </View>
      </View>

      <View style={styles.progressWrapper}>
        <View
          style={[
            styles.progressBackground,
            { backgroundColor: withAlpha(Colors.background, 0.4) },
          ]}
        >
          <LinearGradient
            colors={xpGradient.colors}
            locations={xpGradient.locations}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[styles.progressFill, { width: `${percent}%` }]}
          />
        </View>
      </View>

      <View style={styles.bottomRow}>
        {multiplier === 2 && (
          <View style={styles.buffRow}>
            <View
              style={[
                styles.buffChip,
                {
                  backgroundColor: withAlpha(buffAccent, 0.22),
                  borderColor: withAlpha(buffAccent, 0.6),
                },
              ]}
            >
              <Text style={styles.buffChipText}>XP x2</Text>
            </View>
            {remainingText ? (
              <Text style={styles.buffTime}>{remainingText}</Text>
            ) : null}
          </View>
        )}
        <Text
          style={[
            styles.secondaryHint,
            multiplier === 2 && styles.secondaryHintIndented,
          ]}
        >
          Reclama recompensas para mantener tu racha
        </Text>
      </View>
    </View>
  );
}

function formatRemaining(ms) {
  if (!ms) return null;
  const totalMinutes = Math.floor(ms / 60000);
  if (totalMinutes <= 0) return null;
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) {
    return `${minutes}m`;
  }
  if (minutes === 0) {
    return `${hours}h`;
  }
  return `${hours}h ${minutes}m`;
}

function resolveXpGradient({ buffs, inventory, wallet }) {
  const activeBuff = (buffs || []).find((buff) => buff?.type);
  if (activeBuff) {
    const map = {
      xp_double: ElementAccents.gradients.xp?.high,
      streak_shield: ElementAccents.gradients.tools,
      mana_trickle: ElementAccents.gradients.potions,
    };
    const preset = map[activeBuff.type];
    if (preset?.colors) {
      return preset;
    }
  }

  const items = inventory || [];
  const has = (category) =>
    items.some((item) => item?.category === category && item?.quantity > 0);

  if (has("potions") && ElementAccents.gradients.potions) {
    return ElementAccents.gradients.potions;
  }
  if (has("tools") && ElementAccents.gradients.tools) {
    return ElementAccents.gradients.tools;
  }
  if (has("cosmetics") && ElementAccents.gradients.cosmetics) {
    return ElementAccents.gradients.cosmetics;
  }
  if ((wallet?.gem || 0) > 0 && ElementAccents.gradients.gem) {
    return ElementAccents.gradients.gem;
  }
  return (
    ElementAccents.gradients.xp?.med || {
      colors: Gradients.xp,
      locations: undefined,
    }
  );
}

function withAlpha(hex = "", alpha = 1) {
  if (!hex) return hex;
  let cleaned = `${hex}`.replace("#", "").trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split("")
      .map((c) => `${c}${c}`)
      .join("");
  }
  if (cleaned.length === 8) {
    cleaned = cleaned.slice(0, 6);
  }
  if (cleaned.length !== 6) {
    return hex;
  }
  const value = parseInt(cleaned, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

const styles = StyleSheet.create({
  container: {
    marginTop:
      Platform.OS === "android" ? (StatusBar.currentHeight || 0) / 4 : Spacing.tiny,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii.xl,
    borderWidth: 1,
    marginBottom: Spacing.small,
    ...Platform.select({
      ios: {
        shadowColor: Colors.background,
        shadowOpacity: 0.25,
        shadowRadius: 12,
        shadowOffset: { width: 0, height: 6 },
      },
      android: {
        elevation: 4,
      },
    }),
  },
  topRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Spacing.base,
  },
  levelBlock: {
    flex: 1,
    gap: Spacing.tiny,
  },
  levelHeaderRow: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: Spacing.small,
  },
  blockLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    letterSpacing: 0.6,
  },
  levelValue: {
    ...Typography.title,
    color: Colors.text,
    fontSize: 22,
  },
  xpSummary: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  manaBlock: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.35),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.25),
    alignItems: "flex-end",
    gap: Spacing.tiny / 2,
  },
  manaValue: {
    ...Typography.title,
    color: Colors.text,
  },
  progressWrapper: {
    marginTop: Spacing.small,
    gap: Spacing.tiny,
  },
  progressBackground: {
    width: "100%",
    height: Spacing.small + Spacing.tiny,
    borderRadius: Radii.pill,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: Radii.pill,
  },
  bottomRow: {
    marginTop: Spacing.small,
    gap: Spacing.tiny,
  },
  buffRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  buffChip: {
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    height: 24,
    justifyContent: "center",
    borderWidth: 1,
  },
  buffChipText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  buffTime: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  secondaryHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  secondaryHintIndented: {
    marginLeft: Spacing.small + Spacing.tiny,
  },
});
