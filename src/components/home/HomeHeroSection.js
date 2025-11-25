// [MB] Modulo: Home / Seccion: HomeHero
// Afecta: HomeScreen
// Proposito: Bloque expandido con barra de nivel y estadisticas clave
// Puntos de edicion futura: mover estilos a .styles.js y conectar datos reales
// Autor: Codex - Fecha: 2025-10-07 (V4)

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  Gradients,
  Spacing,
  Colors,
  Typography,
  Radii,
  ElementAccents,
} from "../../theme";
import {
  useWallet,
  useProgress,
  useActiveBuffs,
  useAppState,
} from "../../state/AppContext";

const BUFF_COPY = {
  xp_double: {
    title: "Sabiduria activa",
    description: "XP doble en tareas completadas",
  },
  streak_shield: {
    title: "Escudo de racha",
    description: "Protege tu racha si fallas un dia",
  },
  mana_trickle: {
    title: "Manantial arcano",
    description: "Mana pasivo durante el dia",
  },
};

const BUFF_EMPTY_HINT =
  "Activa una pocion desde la tienda para impulsar a tu planta.";

function withAlpha(hex = "", alpha = 1) {
  const cleaned = hex.replace("#", "");
  if (cleaned.length !== 6) {
    return hex;
  }
  const value = parseInt(cleaned, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

const GLASS_BACKGROUND = withAlpha(Colors.surfaceElevated, 0.45);
const GLASS_BORDER = withAlpha(Colors.primaryLight, 0.35);
const GLASS_SHADOW = withAlpha(Colors.primary, 0.25);

const BUFF_GRADIENT_LOOKUP = {
  xp_double: ElementAccents.gradients.xp?.high,
  streak_shield: ElementAccents.gradients.tools,
  mana_trickle: ElementAccents.gradients.potions,
};

function resolveXpGradient({ buffs, inventory, wallet }) {
  const activeBuff = (buffs || []).find((buff) => buff?.type);
  if (activeBuff) {
    const preset = BUFF_GRADIENT_LOOKUP[activeBuff.type];
    if (preset?.colors) {
      return { colors: preset.colors, locations: preset.locations };
    }
    const fallback = ElementAccents.gradients.xp?.high;
    if (fallback?.colors) {
      return { colors: fallback.colors, locations: fallback.locations };
    }
  }

  const items = inventory || [];
  const hasQuantity = (category) =>
    items.some((item) => item?.category === category && item?.quantity > 0);

  if (hasQuantity("potions")) {
    const preset = ElementAccents.gradients.potions;
    if (preset?.colors) {
      return { colors: preset.colors, locations: preset.locations };
    }
  }

  if (hasQuantity("tools")) {
    const preset = ElementAccents.gradients.tools;
    if (preset?.colors) {
      return { colors: preset.colors, locations: preset.locations };
    }
  }

  if (hasQuantity("cosmetics")) {
    const preset = ElementAccents.gradients.cosmetics;
    if (preset?.colors) {
      return { colors: preset.colors, locations: preset.locations };
    }
  }

  if ((wallet?.gem || 0) > 0) {
    const preset = ElementAccents.gradients.gem;
    if (preset?.colors) {
      return { colors: preset.colors, locations: preset.locations };
    }
  }

  const defaultPreset = ElementAccents.gradients.xp?.med;
  if (defaultPreset?.colors) {
    return { colors: defaultPreset.colors, locations: defaultPreset.locations };
  }
  return { colors: Gradients.xp };
}

function formatRemainingTime(ms) {
  if (typeof ms !== "number" || ms <= 0) {
    return null;
  }
  const totalMinutes = Math.max(1, Math.round(ms / 60000));
  const minutesInDay = 60 * 24;
  if (totalMinutes >= minutesInDay) {
    const days = Math.floor(totalMinutes / minutesInDay);
    const hours = Math.floor((totalMinutes % minutesInDay) / 60);
    if (hours > 0) {
      return `${days}d ${hours}h`;
    }
    return `${days}d`;
  }
  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (minutes > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${hours}h`;
  }
  return `${totalMinutes}m`;
}

const ResourceCard = ({ icon, title, value, accent }) => (
  <View
    style={[
      styles.resourceCard,
      {
        backgroundColor: accent.bg,
        borderColor: accent.border,
      },
    ]}
  >
    <View style={styles.resourceLabelRow}>
      <MaterialCommunityIcons
        name={icon}
        size={16}
        color={accent.iconColor}
        style={styles.resourceIcon}
      />
      <Text style={styles.resourceLabel}>{title}</Text>
    </View>
    <Text style={styles.resourceValue}>{value}</Text>
  </View>
);

export default function HomeHeroSection() {
  const { mana, inventory } = useAppState();
  const wallet = useWallet();
  const { coin, gem } = wallet;
  const { level, progress, xp, xpGoal } = useProgress();
  const buffs = useActiveBuffs();

  const clampedProgress = Math.max(0, Math.min(progress, 1));
  const progressPercent = Math.round(clampedProgress * 100);
  const xpGradient = resolveXpGradient({
    buffs,
    inventory,
    wallet,
  });

  const buffsActive = buffs.filter(Boolean);
  const nowMs = Date.now();
  const buffDetails = buffsActive.map((buff) => {
    const meta = BUFF_COPY[buff.type] || {};
    const base =
      meta.description ||
      meta.title ||
      buff.title ||
      buff.name ||
      buff.type ||
      "Buff activo";
    const remaining = formatRemainingTime((buff.expiresAt || 0) - nowMs);
    return remaining ? `${base} - ${remaining} restantes` : base;
  });
  const buffSummary =
    buffDetails.length > 0 ? buffDetails.join("   ") : BUFF_EMPTY_HINT;

  const xpLabel = `${Math.max(0, xp ?? 0)} XP`;
  const xpGoalLabel = `${Math.max(0, xpGoal ?? 0)} XP`;

  const resourceCards = [
    {
      key: "mana",
      icon: "lightning-bolt",
      title: "Mana",
      value: mana,
      accent: {
        bg: "rgba(46,73,144,0.18)",
        border: "rgba(118,167,255,0.18)",
        iconBg: "rgba(118,167,255,0.08)",
        iconColor: "#78C2FF",
      },
    },
    {
      key: "coins",
      icon: "cash-multiple",
      title: "Coins",
      value: coin,
      accent: {
        bg: "rgba(120,78,12,0.18)",
        border: "rgba(255,206,134,0.2)",
        iconBg: "rgba(255,206,134,0.08)",
        iconColor: "#FFCE86",
      },
    },
    {
      key: "gems",
      icon: "diamond-stone",
      title: "Gems",
      value: gem,
      accent: {
        bg: "rgba(103,36,116,0.18)",
        border: "rgba(255,163,245,0.2)",
        iconBg: "rgba(255,163,245,0.08)",
        iconColor: "#FFACF5",
      },
    },
  ];

  return (
    <>
      <LinearGradient
        colors={["#3a1675", "#172044"]}
        start={{ x: 0, y: 0.5 }}
        end={{ x: 1, y: 0.5 }}
        style={styles.buffTile}
      >
        <View style={styles.buffRow}>
          <View style={styles.buffHeader}>
            <MaterialCommunityIcons
              name="clock-outline"
              size={18}
              color="#c59bff"
            />
            <Text style={styles.buffTitle}>Rituales listos en 15 min</Text>
          </View>
          <View style={styles.buffBonus}>
            <Text style={styles.buffBonusText}>+5% Bonus</Text>
          </View>
        </View>
        <Text style={styles.buffDescription}>{buffSummary}</Text>
      </LinearGradient>

      <View style={styles.gridContainer}>
        <LinearGradient
          colors={["#1e1533", "#110c21"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.levelCard}
        >
          <View style={styles.levelHeader}>
            <Text style={styles.levelLabel}>Nivel</Text>
            <Text style={styles.levelValue}>{level}</Text>
          </View>

          <View style={styles.xpNumbers}>
            <Text style={styles.xpValue}>{xpLabel}</Text>
            <Text style={styles.xpMax}>{xpGoalLabel}</Text>
          </View>

          <View style={styles.progressTrack}>
            <LinearGradient
              colors={xpGradient.colors}
              locations={xpGradient.locations}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[styles.progressFill, { width: `${progressPercent}%` }]}
            />
          </View>
        </LinearGradient>

        <View style={styles.resourceColumn}>
          {resourceCards.map((card) => (
            <ResourceCard
              key={card.key}
              icon={card.icon}
              title={card.title}
              value={card.value}
              accent={card.accent}
            />
          ))}
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: -Spacing.base,
    paddingHorizontal: Spacing.base * 1.5,
    paddingVertical: Spacing.large,
    gap: Spacing.large,
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "flex-start",
    gap: Spacing.base,
  },
  levelCard: {
    flex: 1,
    minWidth: 0,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    paddingHorizontal: Spacing.large - 4,
    paddingTop: Spacing.large - 10,
    paddingBottom: Spacing.large - 4,
    justifyContent: "flex-start",
    shadowColor: GLASS_SHADOW,
    shadowOpacity: 0.35,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    gap: Spacing.small,
  },
  levelHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.small - 4,
  },
  levelLabel: {
    ...Typography.caption,
    textTransform: "uppercase",
    letterSpacing: 1,
    color: Colors.textMuted,
  },
  levelValue: {
    ...Typography.h1,
    color: Colors.accent,
    fontSize: 36,
    lineHeight: 40,
  },
  xpNumbers: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 2,
    marginTop: Spacing.small / 2,
  },
  xpValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  xpMax: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  progressTrack: {
    height: 8,
    borderRadius: 999,
    backgroundColor: withAlpha(Colors.textMuted, 0.25),
    overflow: "hidden",
    marginTop: 0,
  },
  progressFill: {
    height: "100%",
    borderRadius: 999,
  },
  resourceColumn: {
    width: 135,
    flexShrink: 0,
    flexGrow: 0,
    alignSelf: "flex-start",
    gap: Spacing.small,
  },
  resourceCard: {
    width: "100%",
    borderRadius: Radii.md,
    borderWidth: 1,
    paddingHorizontal: Spacing.base - 2,
    paddingVertical: Spacing.tiny + 4,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  resourceLabelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  resourceIcon: {
    marginRight: Spacing.tiny,
    marginLeft: -Spacing.tiny,
  },
  resourceLabel: {
    ...Typography.caption,
    color: Colors.text,
    letterSpacing: 0.6,
  },
  resourceValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "800",
    letterSpacing: 0.2,
    paddingLeft: Spacing.tiny - 2,
  },
  buffTile: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: "rgba(155, 106, 255, 0.45)",
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.small,
    paddingBottom: Spacing.small + 4,
    gap: Spacing.tiny,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.24,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
    marginBottom: Spacing.base * 1.5,
  },
  buffRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  buffHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  buffBonus: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  buffBonusText: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.text,
    letterSpacing: 0.3,
  },
  buffTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  buffDescription: {
    ...Typography.caption,
    color: Colors.text,
    flex: 1,
    paddingTop: Spacing.tiny,
  },
});
