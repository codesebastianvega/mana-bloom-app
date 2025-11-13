// [MB] Modulo: Home / Seccion: HomeHero
// Afecta: HomeScreen
// Proposito: Bloque expandido con barra de nivel y estadisticas clave
// Puntos de edicion futura: mover estilos a .styles.js y conectar datos reales
// Autor: Codex - Fecha: 2025-10-07 (V3)

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

const TILE_STYLES = {
  mana: {
    background: "rgba(126, 87, 194, 0.16)",
    border: Colors.primary,
  },
  streak: {
    background: "rgba(255, 112, 67, 0.16)",
    border: Colors.warning,
  },
  coins: {
    background: "rgba(255, 202, 40, 0.14)",
    border: Colors.accent,
  },
  gems: {
    background: "rgba(128, 222, 234, 0.14)",
    border: Colors.secondaryLight,
  },
  buffs: {
    background: "rgba(144, 238, 144, 0.14)",
    border: Colors.success,
  },
};

const BUFF_COPY = {
  xp_double: {
    title: "SabidurÃ­a activa",
    description: "XP doble en tareas completadas",
  },
  streak_shield: {
    title: "Escudo de racha",
    description: "Protege tu racha si fallas un dÃ­a",
  },
  mana_trickle: {
    title: "Manantial arcano",
    description: "ManÃ¡ pasivo durante el dÃ­a",
  },
};

const BUFF_EMPTY_HINT =
  "Activa una pociÃ³n desde la tienda para impulsar a tu planta.";

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

const StatTile = ({ icon, title, subtitle, value, styleKey }) => {
  const palette = TILE_STYLES[styleKey] || {};
  return (
    <View
      style={[
        styles.tile,
        palette.background && { backgroundColor: palette.background },
        palette.border && { borderColor: palette.border },
      ]}
    >
      <View style={styles.tileTextBlock}>
        <View style={styles.titleRow}>
          <MaterialCommunityIcons
            name={icon}
            size={18}
            color={palette.border || Colors.text}
          />
          <Text style={styles.tileTitle}>{title}</Text>
        </View>
        {subtitle ? <Text style={styles.tileSubtitle}>{subtitle}</Text> : null}
      </View>
      <Text style={styles.tileValue}>{value}</Text>
    </View>
  );
};

export default function HomeHeroSection() {
  const { mana, streak, inventory } = useAppState();
  const wallet = useWallet();
  const { coin, gem } = wallet;
  const { level, progress } = useProgress();
  const buffs = useActiveBuffs();

  const clampedProgress = Math.max(0, Math.min(progress, 1));
  const progressPercent = Math.round(clampedProgress * 100);
  const xpGradient = resolveXpGradient({
    buffs,
    inventory,
    wallet,
  });

  const manaTile = {
    key: "mana",
    icon: "water-outline",
    title: "Mana",
    subtitle: "Reservorio",
    value: String(mana),
  };

  const streakTile = {
    key: "streak",
    icon: "fire",
    title: "Racha",
    subtitle: "Dias activos",
    value: `${streak} dias`,
  };

  const coinsTile = {
    key: "coins",
    icon: "circle-multiple-outline",
    title: "Coins",
    subtitle: "Monedas magicas",
    value: String(coin),
  };

  const gemsTile = {
    key: "gems",
    icon: "diamond-stone",
    title: "Gems",
    subtitle: "Rareza arcana",
    value: String(gem),
  };

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
    return remaining ? `${base} Â· ${remaining} restantes` : base;
  });
  const buffSummary =
    buffDetails.length > 0 ? buffDetails.join("   ") : BUFF_EMPTY_HINT;

  const topRow = [
    {
      key: "mana",
      ...manaTile,
      styleKey: "mana",
    },
    {
      key: "streak",
      ...streakTile,
      styleKey: "streak",
    },
  ];

  const bottomRow = [
    {
      key: "coins",
      ...coinsTile,
      styleKey: "coins",
    },
    {
      key: "gems",
      ...gemsTile,
      styleKey: "gems",
    },
  ];

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Estado general</Text>
      <View style={styles.xpWrapper}>
        {/* [MB] Modulo: Home / Seccion: Barra de nivel
            Afecta: HomeHeroSection
            Proposito: Gradiente dinamico segun buffs y efecto glass
            Puntos de edicion futura: tokens en theme.js (ElementAccents.gradients)
            Autor: Codex - Fecha: 2025-10-16 */}
        <LinearGradient
          colors={xpGradient.colors}
          locations={xpGradient.locations}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 1, y: 0.5 }}
          style={[styles.xpProgress, { width: `${progressPercent}%` }]}
        />
        <View style={styles.xpContent}>
          <Text style={styles.levelLabel}>Nivel {level}</Text>
          <Text style={styles.levelValue}>{progressPercent}%</Text>
        </View>
      </View>

      <View style={styles.gridContainer}>
        <View style={styles.row}>
          {topRow.map(({ key, styleKey, ...tileProps }) => (
            <StatTile key={key} styleKey={styleKey} {...tileProps} />
          ))}
        </View>
        <View style={styles.row}>
          {bottomRow.map(({ key, styleKey, ...tileProps }) => (
            <StatTile key={key} styleKey={styleKey} {...tileProps} />
          ))}
        </View>
        <View style={styles.buffTile}>
          <View style={styles.buffHeader}>
            <MaterialCommunityIcons
              name="star-circle"
              size={20}
              color={TILE_STYLES.buffs.border}
            />
            <Text style={styles.buffTitle}>
              {`Buffs activos (${buffsActive.length})`}
            </Text>
          </View>
          <Text style={styles.buffDescription}>{buffSummary}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    gap: Spacing.base,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  xpWrapper: {
    backgroundColor: GLASS_BACKGROUND,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: GLASS_BORDER,
    overflow: "hidden",
    height: Spacing.large + Spacing.small,
    justifyContent: "center",
    shadowColor: GLASS_SHADOW,
    shadowOpacity: 0.28,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  xpProgress: {
    position: "absolute",
    top: 1, // evita que el borde superior robe 1px del gradiente
    bottom: 1, // igual abajo para simetria
    left: 1, // respeta el trazo del borde izquierdo
    right: undefined,
    borderRadius: Radii.md,
  },
  xpContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.base,
  },
  levelLabel: {
    ...Typography.body,
    color: Colors.text,
  },
  levelValue: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  gridContainer: {
    gap: Spacing.small,
  },
  row: {
    flexDirection: "row",
    gap: Spacing.small,
  },
  tile: {
    flex: 1,
    minWidth: 0,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small + 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  tileTextBlock: {
    flex: 1,
    gap: 2,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  tileTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  tileSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  tileValue: {
    ...Typography.title,
    color: Colors.text,
    fontSize: 18,
  },
  buffTile: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: TILE_STYLES.buffs.border,
    backgroundColor: TILE_STYLES.buffs.background,
    padding: Spacing.base,
    gap: Spacing.tiny,
  },
  buffHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small / 2,
  },
  buffTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  buffDescription: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});







