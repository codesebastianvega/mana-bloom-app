// [MB] Modulo: Home / Seccion: DailyChallenges
// Afecta: HomeScreen
// Proposito: Mostrar desafios diarios en estilo compacto (mock)
// Puntos de edicion futura: integrar estados reales y timers
// Autor: Codex - Fecha: 2025-10-07 (V3)

import React, { useCallback } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDailyChallenges, useAppDispatch } from "../../state/AppContext";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const ICONS = ["moon-waning-crescent", "target", "water"];
const FALLBACK_CHALLENGES = [
  { id: "mock-1", title: "Meditar bajo la luna", progress: 1, goal: 1, reward: { xp: 50 } },
  { id: "mock-2", title: "Completar 3 Tareas de Enfoque", progress: 2, goal: 3, reward: { mana: 20 } },
  { id: "mock-3", title: "Regar a Ernesto", progress: 0, goal: 1, reward: { gem: 1 } },
];

export default function DailyChallengesSection() {
  const dispatch = useAppDispatch();
  const { items } = useDailyChallenges();

  const challenges = (items && items.length ? items : FALLBACK_CHALLENGES).map(
    (ch) => ({ ...ch, reward: ch.reward || {} })
  );

  const handleClaim = useCallback(
    (id) => {
      dispatch({ type: "CLAIM_DAILY_CHALLENGE", payload: { id } });
      dispatch({ type: "ACHIEVEMENT_EVENT", payload: { type: "challenge_claimed" } });
    },
    [dispatch]
  );

  return (
    <View style={styles.container} accessibilityRole="list">
      <View style={styles.header}>
        <Text style={styles.title}>Desafios diarios</Text>
        <Text style={styles.subtitle}>Se reinician en 4h</Text>
      </View>

      {challenges.map((item, idx) => {
        const { xp = 0, mana = 0, gem = 0 } = item.reward;
        const canClaim = item.progress >= item.goal && !item.claimed;
        const progressPct = Math.min(100, Math.round((item.progress / item.goal) * 100));
        const iconName = ICONS[idx % ICONS.length];
        const rewardLabel = xp ? `${xp} XP` : mana ? `${mana} Mana` : `${gem} Gema`;
        const rewardColor = xp ? "#7dd1ff" : mana ? "#4bd3a5" : "#6fe0ff";
        const progressLabel = `${item.progress} / ${item.goal}`;

        return (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons name={iconName} size={18} color="#c59bff" />
              </View>
              <View style={styles.textBlock}>
                <View style={styles.rowBetween}>
                  <Text style={styles.challengeTitle}>{item.title}</Text>
                  <Text style={[styles.rewardText, { color: rewardColor }]}>{rewardLabel}</Text>
                </View>
                <View style={styles.rowBetween}>
                  <Text style={styles.progressLabel}>Progreso</Text>
                  <Text style={styles.progressNumbers}>{progressLabel}</Text>
                </View>
              </View>
            </View>

            <View style={styles.progressBar}>
              <View style={[styles.progressFill, { width: `${progressPct}%` }]} />
            </View>

            {canClaim && (
              <Pressable
                onPress={() => handleClaim(item.id)}
                style={({ pressed }) => [
                  styles.claimButton,
                  pressed ? styles.claimButtonPressed : null,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Reclamar desafio ${item.title}`}
              >
                <Text style={styles.claimButtonText}>Reclamar</Text>
              </Pressable>
            )}
          </View>
        );
      })}

      <Pressable
        style={styles.viewAllButton}
        accessibilityRole="button"
        accessibilityLabel="Ver todos los desafios"
      >
        <Text style={styles.viewAllText}>Ver todos los desafios</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: -Spacing.base,
    paddingHorizontal: Spacing.base * 1.5,
    paddingVertical: Spacing.large,
    gap: Spacing.small,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: Spacing.small,
  },
  title: {
    ...Typography.sectionTitle,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  card: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.small,
  },
  cardTop: {
    flexDirection: "row",
    gap: Spacing.small,
    alignItems: "center",
  },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(197,155,255,0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  textBlock: {
    flex: 1,
    gap: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  challengeTitle: {
    ...Typography.cardTitle,
    color: Colors.text,
  },
  rewardText: {
    ...Typography.caption,
    fontWeight: "700",
  },
  progressLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  progressNumbers: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  progressBar: {
    height: 8,
    borderRadius: Radii.pill,
    backgroundColor: Colors.border,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: Radii.pill,
    backgroundColor: "#b06bff",
  },
  claimButton: {
    alignSelf: "center",
    marginTop: Spacing.small,
    paddingHorizontal: Spacing.base * 1.4,
    paddingVertical: Spacing.tiny + 2,
    borderRadius: Radii.md,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  claimButtonPressed: {
    transform: [{ scale: 0.98 }],
  },
  claimButtonText: {
    ...Typography.button,
    color: Colors.text,
  },
  viewAllButton: {
    marginTop: Spacing.base,
    alignItems: "center",
    paddingVertical: Spacing.tiny + 2,
  },
  viewAllText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});
