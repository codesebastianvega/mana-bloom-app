// [MB] Modulo: Home / Seccion: DailyChallenges
// Afecta: HomeScreen
// Proposito: Mostrar desafios diarios en estilo compacto (mock)
// Puntos de edicion futura: integrar estados reales y timers
// Autor: Codex - Fecha: 2025-10-07 (V3)

import React, { useCallback } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useDailyChallenges, useAppDispatch } from "../../state/AppContext";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const ICONS = ["moon-waning-crescent", "target", "water"];
const FALLBACK_CHALLENGES = [
  {
    id: "mock-1",
    title: "Meditar bajo la luna",
    progress: 1,
    goal: 1,
    reward: { xp: 50 },
  },
  {
    id: "mock-2",
    title: "Completar 3 Tareas de Enfoque",
    progress: 2,
    goal: 3,
    reward: { mana: 20 },
  },
  {
    id: "mock-3",
    title: "Regar a Ernesto",
    progress: 0,
    goal: 1,
    reward: { gem: 1 },
  },
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
      dispatch({
        type: "ACHIEVEMENT_EVENT",
        payload: { type: "challenge_claimed" },
      });
    },
    [dispatch]
  );

  return (
    <View style={styles.container} accessibilityRole="list">
      <View style={styles.header}>
        <View style={styles.titleStack}>
          <Text style={styles.title}>Desafios diarios</Text>
          <Text style={styles.subtitle}>
            Completa retos cortos y gana recompensas.
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Pressable
            style={styles.viewAllButton}
            accessibilityRole="button"
            accessibilityLabel="Ver todos los desafios"
          >
            <Text style={styles.viewAllText}>Ver todos los desafios</Text>
          </Pressable>
        </View>
      </View>

      {challenges.map((item, idx) => {
        const { xp = 0, mana = 0, gem = 0 } = item.reward;
        const canClaim = item.progress >= item.goal && !item.claimed;
        const progressPct = Math.min(
          100,
          Math.round((item.progress / item.goal) * 100)
        );
        const iconName = ICONS[idx % ICONS.length];
        const rewardLabel = xp
          ? `${xp} XP`
          : mana
          ? `${mana} Mana`
          : `${gem} Gema`;
        const rewardColor = xp ? "#7dd1ff" : mana ? "#4bd3a5" : "#6fe0ff";
        const progressLabel = `${item.progress} / ${item.goal}`;
        const statusLabel = canClaim ? "Completada" : "En progreso";

        return (
          <View key={item.id} style={styles.card}>
            <View style={styles.cardTop}>
              <View style={styles.iconCircle}>
                <MaterialCommunityIcons
                  name={iconName}
                  size={18}
                  color="#c59bff"
                />
              </View>
              <View style={styles.textBlock}>
                <View style={styles.rowBetween}>
                  <Text style={styles.challengeTitle}>{item.title}</Text>
                  <Text style={[styles.rewardText, { color: rewardColor }]}>
                    {rewardLabel}
                  </Text>
                </View>
                <View style={styles.rowBetween}>
                  <Text style={styles.progressLabel}>{statusLabel}</Text>
                  <Text style={styles.progressNumbers}>{progressLabel}</Text>
                </View>
              </View>
            </View>

            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${progressPct}%` }]}
              />
            </View>

            {canClaim && (
              <Pressable
                onPress={() => handleClaim(item.id)}
                style={({ pressed }) => [
                  styles.claimButtonWrapper,
                  pressed ? styles.claimButtonPressed : null,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`Reclamar desafio ${item.title}`}
              >
                <LinearGradient
                  colors={["rgba(60,38,110,0.9)", "rgba(32,22,70,0.95)"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.claimGradient}
                >
                  <Text style={styles.claimButtonText}>Reclamar</Text>
                </LinearGradient>
              </Pressable>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingTop: Spacing.large,
    paddingBottom: Spacing.small,
    gap: Spacing.small,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
  },
  titleStack: {
    flex: 1,
    gap: Spacing.tiny / 2,
    paddingBottom: Spacing.small,
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
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
  claimButtonWrapper: {
    alignSelf: "stretch",
    width: "100%",
    marginTop: Spacing.small,
    borderRadius: Radii.md,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(80,50,140,0.8)",
  },
  claimButtonPressed: {
    opacity: 0.9,
  },
  claimGradient: {
    width: "100%",
    minHeight: 28,
    paddingVertical: Spacing.tiny + 1,
    paddingHorizontal: Spacing.base,
    borderRadius: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  claimButtonText: {
    ...Typography.button,
    color: Colors.text,
    fontWeight: "700",
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.tiny,
  },
  viewAllText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: "700",
  },
});
