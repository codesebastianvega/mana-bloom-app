// [MB] Module: Planta / Section: ActionInfoModal
// Purpose: Mostrar ficha detallada de mecanicas para cada accion rapida
// Author: Codex - Date: 2025-10-30

import React from "react";
import { Modal, View, Text, ScrollView, Pressable, StyleSheet } from "react-native";
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
  formatList(
    buffs.map((b) => `${b.label} +${b.durationMin}m`)
  );

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

  const categoryLabel =
    category === "core"
      ? "Cuidado de la planta"
      : category === "ritual"
      ? "Ritual personal"
      : "Accion";

  return (
    <Modal transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View>
              <Text style={styles.category}>{categoryLabel}</Text>
              <Text style={styles.title}>{title}</Text>
            </View>
            <Pressable onPress={onClose} hitSlop={12}>
              <Text style={styles.close}>x</Text>
            </Pressable>
          </View>

          <ScrollView
            style={styles.scroll}
            contentContainerStyle={{ paddingBottom: Spacing.base }}
            showsVerticalScrollIndicator={false}
          >
            {headline && <Text style={styles.headline}>{headline}</Text>}
            {summary && <Text style={styles.summary}>{summary}</Text>}

            <View style={styles.tagRow}>
              <Tag label="Costo" value={formatCost(cost)} />
              <Tag label="Beneficio" value={formatRewards(rewards)} />
            </View>
            <View style={styles.tagRow}>
              <Tag label="Buffs" value={formatBuffs(buffs)} />
              <Tag
                label="Cooldown"
                value={cooldownMin != null ? `${cooldownMin} min` : ""}
              />
              {cadence ? <Tag label="Cadencia sugerida" value={cadence} /> : null}
            </View>

            {cues.length > 0 && (
              <InfoList title="Cuando usarla" items={cues} />
            )}
            {routine.length > 0 && (
              <InfoList title="Ritual sugerido" items={routine} />
            )}
            {tips.length > 0 && (
              <InfoList title="Consejos" items={tips} />
            )}
            {stack.length > 0 && (
              <InfoList title="Combinalo con" items={stack} />
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function Tag({ label, value }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagLabel}>{label}</Text>
      <Text style={styles.tagValue}>
        {Array.isArray(value) ? value.join(" | ") : value}
      </Text>
    </View>
  );
}

function InfoList({ title, items }) {
  return (
    <View style={styles.listSection}>
      <Text style={styles.listTitle}>{title}</Text>
      {items.map((item, index) => (
        <Text key={`${title}-${index}`} style={styles.listItem}>
          {`- ${item}`}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.55)",
    justifyContent: "center",
    padding: Spacing.base,
  },
  sheet: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: Spacing.base,
    maxHeight: "85%",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.small,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
  },
  category: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  close: {
    ...Typography.title,
    color: Colors.text,
  },
  scroll: {
    maxHeight: "100%",
  },
  headline: {
    ...Typography.body,
    color: Colors.accent,
    fontWeight: "700",
    marginBottom: Spacing.tiny,
  },
  summary: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: Spacing.base,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
    marginBottom: Spacing.small,
  },
  tag: {
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
  },
  tagLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  tagValue: {
    ...Typography.body,
    color: Colors.text,
  },
  listSection: {
    marginTop: Spacing.small,
    gap: 4,
  },
  listTitle: {
    ...Typography.caption,
    color: Colors.text,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  listItem: {
    ...Typography.body,
    color: Colors.text,
  },
});


