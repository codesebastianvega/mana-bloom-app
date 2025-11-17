// [MB] Modulo: Planta / Seccion: ActionInfoModal
// Afecta: PlantScreen (helper ? de cuidado y rituales)
// Proposito: Mostrar ficha alineada con los nuevos modales unificados
// Puntos de edicion futura: migrar a bottom sheet nativo si escala el contenido
// Autor: Codex - Fecha: 2025-11-15

import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import RitualModalLayout from "./RitualModalLayout";
import { Colors, Typography, Spacing, Radii } from "../../theme";

const formatList = (items = [], fallback = "") => {
  if (!items || items.length === 0) return fallback;
  return items;
};

const formatCost = (cost = []) =>
  formatList(
    cost.map((c) => {
      const amount = c.amount != null ? `${c.amount} ` : "";
      const label =
        c.type === "mana"
          ? "Mana"
          : c.type === "coin"
          ? "Monedas"
          : c.type === "gem"
          ? "Gemas"
          : c.type === "time"
          ? "Tiempo"
          : c.type;
      return `${amount}${label}`;
    })
  );

const formatRewards = (rewards = []) =>
  formatList(
    rewards.map((r) => {
      const label = r.label || r.type;
      const amount = r.amount != null ? ` ${r.amount}` : "";
      const condition = r.condition ? ` (${r.condition})` : "";
      return `${label}${amount}${condition}`;
    })
  );

const formatBuffs = (buffs = []) =>
  formatList(buffs.map((b) => `${b.label} +${b.durationMin}m`));

const categoryLabels = {
  core: "Cuidado de la planta",
  ritual: "Ritual personal",
};

const categoryAccents = {
  core: Colors.primary,
  ritual: Colors.ritualCalm,
};

const iconPalette = [
  Colors.elementWater,
  Colors.accent,
  Colors.elementFire,
  Colors.secondary,
  Colors.elementAir,
];

const withAlpha = (color = "#000000", alpha = 1) => {
  if (!color || typeof color !== "string" || !color.startsWith("#")) return color;
  let hex = color.replace("#", "");
  if (hex.length === 3) {
    hex = hex
      .split("")
      .map((ch) => `${ch}${ch}`)
      .join("");
  }
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

export default function ActionInfoModal({ visible, onClose, mechanics }) {
  if (!visible || !mechanics) return null;

  const {
    title,
    category,
    summary,
    headline,
    cost,
    rewards,
    buffs,
    cooldownMin,
    cadence,
    cues = [],
    tips = [],
    stack = [],
    routine = [],
  } = mechanics;

  const categoryLabel = categoryLabels[category] || "Accion";
  const accent = categoryAccents[category] || Colors.accent;
  const guideTitle =
    category === "core" ? "Guia de cuidado" : "Guia del ritual";

  const metaLine = [
    { icon: "coins", label: "Costo", value: formatCost(cost) },
    { icon: "star", label: "Beneficio", value: formatRewards(rewards) },
    { icon: "fire-alt", label: "Buff", value: formatBuffs(buffs) },
    {
      icon: "stopwatch",
      label: "Cooldown",
      value: cooldownMin != null ? `${cooldownMin} min` : "",
    },
    cadence
      ? {
          icon: "redo-alt",
          label: "Cadencia",
          value: cadence,
        }
      : null,
  ].filter((item) => item && item.value && item.value.length > 0);

  return (
    <RitualModalLayout
      visible={visible}
      onClose={onClose}
      title={title}
      subtitle={categoryLabel}
      showCloseButton
    >
      <View
        style={[
          styles.guideCard,
          {
            borderColor: withAlpha(accent, 0.4),
            backgroundColor: withAlpha(accent, 0.12),
          },
        ]}
      >
        <Text style={styles.guideTitle}>{guideTitle}</Text>
        {headline ? <Text style={styles.guideHeadline}>{headline}</Text> : null}
        {summary ? <Text style={styles.guideCopy}>{summary}</Text> : null}
      </View>

      {metaLine.length > 0 ? (
        <View style={styles.metaWrap}>
          {metaLine.map((item, index) => (
            <MetaItem
              key={`${item.label}-${index}`}
              icon={item.icon}
              label={item.label}
              value={item.value}
              color={iconPalette[index % iconPalette.length]}
            />
          ))}
        </View>
      ) : null}

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={{ gap: Spacing.small, paddingBottom: Spacing.large }}
        showsVerticalScrollIndicator={false}
      >
        {cues.length > 0 && (
          <InfoList title="Cuando usarla" items={cues} />
        )}
        {routine.length > 0 && (
          <InfoList title="Ritual sugerido" items={routine} />
        )}
        {tips.length > 0 && <InfoList title="Consejos" items={tips} />}
        {stack.length > 0 && (
          <InfoList title="Combinaciones" items={stack} />
        )}
      </ScrollView>
    </RitualModalLayout>
  );
}

function MetaItem({ icon, label, value, color }) {
  if (!value) return null;
  const textValue = Array.isArray(value) ? value.join(" · ") : value;
  return (
    <View style={styles.metaItem}>
      <View style={[styles.metaIcon, { backgroundColor: withAlpha(color, 0.18) }]}>
        <FontAwesome5 name={icon} size={12} color={color} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.metaLabel}>{label}</Text>
        <Text style={styles.metaValue}>{textValue}</Text>
      </View>
    </View>
  );
}

function InfoList({ title, items }) {
  return (
    <View style={styles.listSection}>
      <Text style={styles.listTitle}>{title}</Text>
      <View style={styles.listCard}>
        {items.map((item, index) => (
          <View key={`${title}-${index}`} style={styles.listItemRow}>
            <View style={styles.listBullet} />
            <Text style={styles.listItem}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  guideCard: {
    borderRadius: Radii.lg,
    borderLeftWidth: 3,
    padding: Spacing.base,
    gap: Spacing.tiny,
  },
  guideTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  guideHeadline: {
    ...Typography.h4,
    color: Colors.text,
  },
  guideCopy: {
    ...Typography.body,
    color: Colors.text,
    opacity: 0.85,
  },
  metaWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: Spacing.small,
    flexBasis: "48%",
    flexGrow: 1,
  },
  metaIcon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  metaLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  metaValue: {
    ...Typography.body,
    color: Colors.text,
  },
  scroll: {
    maxHeight: 280,
  },
  listSection: {
    gap: Spacing.tiny,
  },
  listTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  listCard: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    gap: Spacing.small,
  },
  listItemRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.small,
  },
  listBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.accent,
    marginTop: 6,
  },
  listItem: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
});

