// [MB] Modulo: Planta / Seccion: Acciones rapidas
// Afecta: PlantScreen (botones pill reutilizables)
// Proposito: boton con acento y CTA secundarios
// Puntos de edicion futura: mover estilos a .styles.js cuando crezca
// Autor: Codex - Fecha: 2025-10-30

import React, { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import { Colors, Spacing, Radii, Typography, Opacity } from "../../theme";

const ACCENTS = {
  water: Colors.elementWater,
  nutrients: Colors.elementEarth,
  clean: Colors.primary,
  spirit: Colors.secondaryFantasy,
  vitality: Colors.secondary,
  sunlight: Colors.elementFire,
  focus: Colors.primaryLight,
  gratitude: Colors.success,
  clarity: Colors.elementAir,
  reflection: Colors.elementEarthLight,
  ritualCalm: Colors.ritualCalm,
  ritualHydrate: Colors.ritualHydrate,
  ritualStretch: Colors.ritualStretch,
  ritualSun: Colors.ritualSun,
  ritualFocus: Colors.ritualFocus,
  ritualJournal: Colors.ritualJournal,
  ritualGratitude: Colors.ritualGratitude,
};

const DEFAULT_ACCENT = Colors.primary;

const withAlpha = (color = "#000000", alpha = 1) => {
  if (!color || typeof color !== "string") return color;
  if (!color.startsWith("#")) return color;
  let hex = color.replace("#", "");
  // Expand shorthand #RGB to #RRGGBB
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((ch) => `${ch}${ch}`)
      .join("");
  }
  // Support #RRGGBBAA by ignoring the AA part and applying provided alpha
  if (hex.length === 8) {
    hex = hex.substring(0, 6);
  }
  if (hex.length !== 6) return color;
  const value = parseInt(hex, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const formatMs = (ms = 0) => {
  const totalSeconds = Math.max(0, Math.floor(ms / 1000));
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export default function ActionButton({
  title,
  icon,
  accentKey,
  helper,
  disabled,
  cooldownMs = 0,
  onPress,
  onInfoPress,
  infoAccessibilityLabel = "Ver detalles",
  accessibilityHint,
  variant = "link", // 'dual' | 'link'
}) {
  const accent = ACCENTS[accentKey] || DEFAULT_ACCENT;
  const [remainingMs, setRemainingMs] = useState(cooldownMs || 0);

  useEffect(() => {
    setRemainingMs(cooldownMs || 0);
    if (cooldownMs > 0) {
      const target = Date.now() + cooldownMs;
      const id = setInterval(() => {
        const next = Math.max(0, target - Date.now());
        setRemainingMs(next);
        if (next === 0) clearInterval(id);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [cooldownMs]);

  const formatted = useMemo(() => formatMs(remainingMs), [remainingMs]);
  const inactive = disabled || remainingMs > 0;

  const backgroundColor = withAlpha(accent, 0.18);
  const borderColor = withAlpha(accent, 0.4);

  const emitPress = () => {
    onPress?.({
      inactive,
      cooldownMs: remainingMs,
      cooldownLabel: formatted,
    });
  };

  const titleLines = variant === "dual" ? 2 : 1;
  const Header = (
    <View style={styles.header}>
      {icon ? <View style={styles.iconWrap}>{icon}</View> : null}
      <Text style={styles.title} numberOfLines={titleLines}>
        {title}
      </Text>
      {onInfoPress ? (
        <Pressable
          onPress={onInfoPress}
          hitSlop={Spacing.base}
          accessibilityRole="button"
          accessibilityLabel={infoAccessibilityLabel}
          style={styles.infoIconButton}
        >
          <FontAwesome5 name="info-circle" size={14} color={accent} />
        </Pressable>
      ) : null}
    </View>
  );

  if (variant === "dual") {
    let primaryLabel = "Activar";
    if (inactive) {
      if (remainingMs > 0) {
        primaryLabel = `Disponible en ${formatted}`;
      } else {
        // Mensajes mas intuitivos para recursos insuficientes
        if (accentKey === "water") primaryLabel = "Falta mana";
        else if (accentKey === "nutrients") primaryLabel = "Faltan monedas";
        else primaryLabel = "No disponible";
      }
    }
    const showIconOnly = false; // Mostrar texto "Activar" incluso cuando esta disponible
    const a11yLabel = primaryLabel;
    return (
      <View
        style={[
          styles.card,
          styles.dualCard,
          styles.dualCompact,
          { backgroundColor, borderColor, borderLeftWidth: 3, borderLeftColor: accent },
        ]}
      >
        <View style={styles.header}>
          {icon ? <View style={styles.iconWrap}>{icon}</View> : null}
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          {onInfoPress ? (
            <Pressable
              onPress={onInfoPress}
              hitSlop={Spacing.base}
              accessibilityRole="button"
              accessibilityLabel={infoAccessibilityLabel}
              style={styles.infoIconButton}
            >
              <FontAwesome5 name="info-circle" size={14} color={accent} />
            </Pressable>
          ) : null}
        </View>
        {helper ? (
          <Text style={[styles.helper, styles.helperMuted]} numberOfLines={1}>
            {helper}
          </Text>
        ) : null}
        <View style={styles.dualRow}>
          <Pressable
            onPress={emitPress}
            style={[
              styles.dualPrimary,
              { backgroundColor: inactive ? withAlpha(accent, 0.25) : accent },
            ]}
            accessibilityRole="button"
            accessibilityLabel={a11yLabel}
            accessibilityHint={inactive ? undefined : accessibilityHint}
            accessibilityState={{ disabled: inactive }}
          >
            <Text
              style={[
                styles.dualPrimaryTextSmall,
                { color: inactive ? withAlpha(Colors.text, 0.7) : Colors.background },
              ]}
            >
              {primaryLabel}
            </Text>
          </Pressable>
        </View>
      </View>
    );
  }

  // Variant: ritual/link (compact tile)
  // Show helper only when available; show countdown when inactive
  return (
    <Pressable
      onPress={emitPress}
      style={[
        styles.card,
        styles.tileCard,
        { backgroundColor, borderColor },
        inactive && { opacity: Opacity.disabled },
      ]}
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={accessibilityHint}
      accessibilityState={{ disabled: inactive }}
    >
      {Header}
      {inactive ? (
        <Text style={styles.status}>{`Disponible en ${formatted}`}</Text>
      ) : helper ? (
        <Text style={[styles.helper, styles.helperCompact]} numberOfLines={1}>
          {helper}
        </Text>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    padding: Spacing.base,
    gap: Spacing.small,
  },
  tileCard: {
    paddingVertical: Spacing.tiny,
    paddingBottom: Spacing.small,
    gap: 0,
  },
  dualCard: {
    gap: Spacing.small,
  },
  dualCompact: {
    padding: Spacing.small,
    gap: Spacing.tiny,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  iconWrap: {
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
    flex: 1,
  },
  helper: {
    ...Typography.caption,
    color: Colors.text,
    opacity: 0.9,
  },
  helperTimer: {
    color: Colors.textMuted,
    fontWeight: "700",
  },
  status: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
  },
  helperMuted: {
    color: Colors.textMuted,
  },
  helperCompact: {
    marginTop: 2,
    marginBottom: Spacing.tiny,
  },
  linkRow: {
    alignItems: "flex-end",
  },
  linkButton: {
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.4),
  },
  linkText: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  dualRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    justifyContent: "flex-end",
    marginTop: Spacing.small,
  },
  infoTopRight: {
    position: "absolute",
    top: Spacing.small,
    right: Spacing.small,
    padding: Spacing.tiny,
  },
  dualPrimary: {
    borderRadius: Radii.pill,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "auto",
  },
  dualPrimaryText: {
    ...Typography.body,
    fontWeight: "700",
  },
  dualPrimaryTextSmall: {
    ...Typography.caption,
    fontWeight: "700",
  },
  dualSecondary: {
    borderRadius: Radii.pill,
    borderWidth: 1,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.small,
  },
  dualSecondaryText: {
    ...Typography.caption,
    fontWeight: "700",
  },
  infoPill: {
    borderRadius: Radii.pill,
    borderWidth: 1,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.small,
  },
  infoPillText: {
    ...Typography.caption,
    fontWeight: "700",
  },
  infoIconButton: {
    padding: Spacing.tiny,
  },
});
