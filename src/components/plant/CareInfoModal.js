// [MB] Modulo: Planta / Seccion: CareInfoModal
// Afecta: PlantScreen
// Proposito: Modal con resumen dinamico del estado y sugerencias de cuidado
// Puntos de edicion futura: enlazar con misiones y registro historico
// Autor: Codex - Fecha: 2025-10-30

import React, { useMemo } from "react";
import { Modal, View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";
import { ACTION_MECHANICS } from "./actionMechanics";

const METRIC_ACTION_MAP = [
  { key: "water", label: "Agua", actionKey: "water", ideal: "60-80%" },
  { key: "light", label: "Luz", actionKey: "sunlight", ideal: "45-70%" },
  { key: "nutrients", label: "Nutrientes", actionKey: "feed", ideal: "55-75%" },
  { key: "mood", label: "Animo", actionKey: "meditate", ideal: "65-90%" },
];

const formatPercent = (value) => `${Math.round(value * 100)}%`;

const formatDuration = (ms) => {
  if (!ms || ms <= 0) return "Listo";
  const totalMinutes = Math.ceil(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) {
    return `${hours}h ${minutes > 0 ? `${minutes}m` : ""}`.trim();
  }
  return `${minutes}m`;
};

const formatClock = (ms) => {
  if (!ms || ms <= 0) return "00:00";
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (totalSeconds % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

export default function CareInfoModal({
  visible,
  onClose,
  xpSummary,
  metrics,
  buffs = [],
  cooldowns = {},
  growthStage,
  etaText,
}) {
  if (!visible) return null;

  const xpData = xpSummary || {};
  const xpPercent = Math.round((xpData.percent ?? 0) * 100);
  const xpRemaining = Math.max(0, (xpData.target ?? 0) - (xpData.current ?? 0));

  const metricInsights = useMemo(() => {
    return METRIC_ACTION_MAP.map((metric) => {
      const value = typeof metrics?.[metric.key] === "number" ? metrics[metric.key] : null;
      if (value === null) return null;
      const mechanic = ACTION_MECHANICS[metric.actionKey] || {};
      const status =
        value < 0.35 ? "Critico" : value < 0.55 ? "Bajo" : value < 0.75 ? "Estable" : "Optimo";
      const priorityScore = value;
      const summary =
        mechanic.headline ||
        mechanic.summary ||
        `Usa ${mechanic.title || "esta accion"} para mantener ${metric.label.toLowerCase()}.`;
      return {
        ...metric,
        title: mechanic.title || metric.label,
        summary,
        status,
        value,
        percentLabel: formatPercent(value),
        priorityScore,
      };
    })
      .filter(Boolean)
      .sort((a, b) => a.priorityScore - b.priorityScore);
  }, [metrics]);

  const suggestion = metricInsights[0];

  const cooldownList = useMemo(() => {
    return Object.entries(cooldowns || {})
      .filter(([, ms]) => ms > 0)
      .map(([key, ms]) => {
        const mechanic = ACTION_MECHANICS[key] || {};
        return {
          key,
          title: mechanic.title || key,
          remaining: formatDuration(ms),
          remainingClock: formatClock(ms),
          ms,
        };
      })
      .sort((a, b) => a.ms - b.ms);
  }, [cooldowns]);

  const buffList = (buffs || []).map((buff) => ({
    id: buff.id,
    title: buff.title,
    remaining: formatDuration(buff.timeRemainingMs),
  }));

  return (
    <Modal visible transparent animationType="fade" onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <View>
              <Text style={styles.title}>Cuidado de la planta</Text>
              <Text style={styles.subtitle}>
                Nivel {xpData.level ?? "-"} - Etapa {growthStage || "-"}
              </Text>
            </View>
            <Pressable onPress={onClose} hitSlop={12}>
              <Text style={styles.close}>x</Text>
            </Pressable>
          </View>
          <ScrollView
            style={styles.scroll}
            contentContainerStyle={{ paddingBottom: Spacing.small }}
            showsVerticalScrollIndicator={false}
          >
            <Section title="Objetivo actual">
              <Text style={styles.body}>
                Faltan <Text style={styles.emphasis}>{xpRemaining} XP</Text> ({xpPercent}% del
                objetivo) para evolucionar. {etaText ? `ETA: ${etaText}. ` : ""}
                Prioriza acciones que eleven tus indicadores por debajo del ideal.
              </Text>
            </Section>

            {suggestion && (
              <Section title="Accion recomendada ahora">
                <InsightCard
                  title={suggestion.title}
                  status={suggestion.status}
                  metricLabel={`${suggestion.label}: ${suggestion.percentLabel}`}
                  ideal={`Ideal: ${suggestion.ideal}`}
                  description={suggestion.summary}
                />
              </Section>
            )}

            {metricInsights.length > 1 && (
              <Section title="Estado de indicadores">
                <View style={styles.metricList}>
                  {metricInsights.map((insight) => (
                    <View key={insight.key} style={styles.metricRow}>
                      <View style={styles.metricRowHeader}>
                        <Text style={styles.metricTitle}>{insight.title}</Text>
                        <Text style={styles.metricValue}>{insight.percentLabel}</Text>
                      </View>
                      <Text style={styles.metricMeta}>
                        {insight.status}  Ideal {insight.ideal}
                      </Text>
                      <Text style={styles.metricSummary}>{insight.summary}</Text>
                    </View>
                  ))}
                </View>
              </Section>
            )}

            <Section title="Buffs activos">
              {buffList.length > 0 ? (
                <View style={styles.tagList}>
                  {buffList.map((buff) => (
                    <View key={buff.id} style={styles.tag}>
                      <Text style={styles.tagTitle}>{buff.title}</Text>
                      <Text style={styles.tagMeta}>{buff.remaining}</Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.bodyMuted}>Sin buffs activos por ahora.</Text>
              )}
            </Section>

            <Section title="Cooldowns en progreso">
              {cooldownList.length > 0 ? (
                <View style={styles.cooldownList}>
                  {cooldownList.map((item) => (
                    <View key={item.key} style={styles.cooldownRow}>
                      <Text style={styles.cooldownTitle}>{item.title}</Text>
                      <Text style={styles.cooldownMeta}>
                        {item.remaining} ({item.remainingClock})
                      </Text>
                    </View>
                  ))}
                </View>
              ) : (
                <Text style={styles.bodyMuted}>Todas las acciones estan disponibles.</Text>
              )}
            </Section>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

function Section({ title, children }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function InsightCard({ title, status, metricLabel, ideal, description }) {
  return (
    <View style={styles.insightCard}>
      <View style={styles.insightHeader}>
        <Text style={styles.insightTitle}>{title}</Text>
        <Text style={styles.insightStatus}>{status}</Text>
      </View>
      <Text style={styles.insightMeta}>{metricLabel}</Text>
      <Text style={styles.insightMeta}>{ideal}</Text>
      <Text style={styles.body}>{description}</Text>
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
  subtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: 2,
  },
  close: {
    ...Typography.title,
    color: Colors.text,
  },
  scroll: {
    maxHeight: "100%",
  },
  section: {
    marginBottom: Spacing.base,
    gap: Spacing.tiny,
  },
  sectionTitle: {
    ...Typography.caption,
    color: Colors.text,
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  body: {
    ...Typography.body,
    color: Colors.text,
  },
  bodyMuted: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  emphasis: {
    fontWeight: "700",
    color: Colors.accent,
  },
  insightCard: {
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.surface,
    padding: Spacing.small,
    gap: 4,
  },
  insightHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  insightTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  insightStatus: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  insightMeta: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  metricList: {
    gap: Spacing.small,
  },
  metricRow: {
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: Spacing.small,
    backgroundColor: Colors.surface,
    gap: 2,
  },
  metricRowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
  },
  metricTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  metricValue: {
    ...Typography.caption,
    color: Colors.text,
  },
  metricMeta: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  metricSummary: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  tagList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
  },
  tag: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    backgroundColor: Colors.surface,
  },
  tagTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  tagMeta: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  cooldownList: {
    gap: Spacing.small,
  },
  cooldownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cooldownTitle: {
    ...Typography.body,
    color: Colors.text,
  },
  cooldownMeta: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});


