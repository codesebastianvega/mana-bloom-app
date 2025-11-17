// [MB] Modulo: Planta / Seccion: Acciones rapidas
// Afecta: PlantScreen (botones pill reutilizables)
// Proposito: boton con acento y CTA secundarios
// Puntos de edicion futura: mover estilos a .styles.js cuando crezca
// Autor: Codex - Fecha: 2025-10-30

import React, { useEffect, useMemo, useState } from "react";
import { Pressable, Text, View, StyleSheet, Image } from "react-native";
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
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  if (hours > 0) {
    const minutesPadded = minutes.toString().padStart(2, "0");
    const secondsPadded = seconds.toString().padStart(2, "0");
    return `${hours}h ${minutesPadded}m ${secondsPadded}s`;
  }
  if (minutes > 0) {
    const secondsPadded = seconds.toString().padStart(2, "0");
    return `${minutes}m ${secondsPadded}s`;
  }
  return `${seconds}s`;
};

export default function ActionButton({
  title,
  icon,
  accentKey,
  helper,
  illustration,
  statusText,
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
  const cardTint =
    variant === "dual" ? withAlpha(accent, 0.16) : backgroundColor;
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
        primaryLabel = `Úsalo en ${formatted}`;
      } else {
        if (accentKey === "water") primaryLabel = "Falta mana";
        else if (accentKey === "nutrients") primaryLabel = "Faltan monedas";
        else primaryLabel = "No disponible";
      }
    }
    const a11yLabel = primaryLabel;
    const copyText = helper || statusText;

    return (
      <View
        style={[
          styles.card,
          styles.dualCard,
          styles.dualCompact,
          {
            backgroundColor: cardTint,
            borderColor,
            borderLeftWidth: 3,
            borderLeftColor: accent,
          },
        ]}
      >
        {onInfoPress ? (
          <Pressable
            onPress={onInfoPress}
            hitSlop={Spacing.base}
            accessibilityRole="button"
            accessibilityLabel={infoAccessibilityLabel}
            style={[
              styles.careInfoFloating,
              {
                backgroundColor: withAlpha(accent, 0.2),
                borderColor: withAlpha(accent, 0.65),
              },
            ]}
          >
            <FontAwesome5 name="info-circle" size={14} color={accent} />
          </Pressable>
        ) : null}
        <View style={styles.careRow}>
          <View style={styles.careImageColumn}>
            {illustration ? (
              <Image
                source={illustration}
                style={styles.careIllustration}
                resizeMode="contain"
              />
            ) : icon ? (
              <View style={styles.iconWrap}>{icon}</View>
            ) : null}
          </View>
          <View style={styles.careInfoColumn}>
            <Text style={styles.careTitle} numberOfLines={1}>
              {title}
            </Text>
            {copyText ? (
              <Text style={styles.careCopy} numberOfLines={3}>
                {copyText}
              </Text>
            ) : null}
            <Pressable
              onPress={emitPress}
              style={[
                styles.careCTA,
                {
                  backgroundColor: inactive ? withAlpha(accent, 0.25) : accent,
                },
              ]}
              accessibilityRole="button"
              accessibilityLabel={a11yLabel}
              accessibilityHint={inactive ? undefined : accessibilityHint}
              accessibilityState={{ disabled: inactive }}
            >
              <Text
                style={[
                  styles.careCTAText,
                  {
                    color: inactive
                      ? withAlpha(Colors.text, 0.7)
                      : Colors.background,
                  },
                ]}
                numberOfLines={1}
                adjustsFontSizeToFit
                ellipsizeMode="tail"
              >
                {primaryLabel}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    );
  }

  // Variant: ritual card
  if (variant === "ritual") {
    const tint = withAlpha(accent, 0.25);
    return (
      <Pressable
        onPress={emitPress}
        style={[
          styles.card,
          styles.ritualCard,
          { backgroundColor: tint, borderColor: withAlpha(accent, 0.5) },
          inactive && { opacity: Opacity.disabled },
        ]}
        accessibilityRole="button"
        accessibilityLabel={title}
        accessibilityHint={accessibilityHint}
        accessibilityState={{ disabled: inactive }}
      >
        <View style={styles.ritualContent}>
          <View style={styles.ritualText}>
            <Text style={styles.ritualTitle} numberOfLines={1}>
              {title}
            </Text>
            {helper ? (
              <Text style={styles.ritualSubtitle} numberOfLines={2}>
                {helper}
              </Text>
            ) : null}
          </View>
          {illustration ? (
            <Image
              source={illustration}
              style={styles.ritualIllustration}
              resizeMode="contain"
            />
          ) : icon ? (
            <View style={styles.iconWrap}>{icon}</View>
          ) : null}
        </View>
      </Pressable>
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
    backgroundColor: Colors.surface,
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
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small * 0.75,
    gap: Spacing.small,
    minHeight: 120,
  },
  careInfoFloating: {
    position: "absolute",
    top: Spacing.small,
    right: Spacing.small,
    borderRadius: Radii.pill,
    borderWidth: 1,
    padding: Spacing.small * 0.6,
    zIndex: 2,
    elevation: 2,
    shadowColor: Colors.background,
    shadowOpacity: 0.3,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  careRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.medium,
  },
  careInfoColumn: {
    flex: 0.55,
    gap: Spacing.small,
    paddingVertical: Spacing.small * 0.7,
    paddingRight: Spacing.small * 0.7,
    paddingLeft: Spacing.small,
  },
  careHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  careTitle: {
    ...Typography.subheader,
    fontWeight: "800",
    color: Colors.text,
  },
  careCopy: {
    ...Typography.caption,
    color: Colors.text,
    lineHeight: 18,
  },
  careCTA: {
    borderRadius: Radii.pill,
    paddingVertical: Spacing.small * 0.75,
    paddingHorizontal: Spacing.medium,
    alignItems: "center",
    justifyContent: "center",
    marginTop: Spacing.small,
    alignSelf: "stretch",
    marginBottom: Spacing.tiny,
  },
  careCTAText: {
    ...Typography.caption,
    fontWeight: "700",
  },
  careImageColumn: {
    flex: 0.45,
    alignItems: "flex-start",
    justifyContent: "center",
    paddingLeft: 0,
  },
  careIllustration: {
    width: 115,
    height: 115,
    marginLeft: -Spacing.small,
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
  dualCopy: {
    ...Typography.caption,
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.small,
  },
  splitHelperRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Spacing.small,
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
  ritualCard: {
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii.lg,
    borderWidth: 1,
    overflow: "visible",
    minHeight: 65,
    justifyContent: "center",
  },
  ritualContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    overflow: "visible",
  },
  ritualText: {
    flex: 1,
    gap: Spacing.tiny,
    paddingRight: Spacing.large * 0.9,
  },
  ritualTitle: {
    ...Typography.body,
    fontWeight: "800",
    color: Colors.text,
  },
  ritualSubtitle: {
    ...Typography.caption,
    color: Colors.text,
    opacity: 0.9,
  },
  ritualIllustration: {
    width: 65,
    height: 65,
    position: "absolute",
    right: -Spacing.base * 1.4,
    top: -Spacing.base * 0.4,
  },
});
