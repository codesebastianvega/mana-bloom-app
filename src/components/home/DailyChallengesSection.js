// [MB] Modulo: Home / Componente: DailyChallengesSection
// Afecta: HomeScreen
// Proposito: Mostrar desafios diarios con progreso y reclamo de recompensas
// Puntos de edicion futura: animaciones y estados avanzados
// Autor: Codex - Fecha: 2025-08-17

import React, { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./DailyChallengesSection.styles";
import {
  useDailyChallenges,
  useAppDispatch,
  useHydrationStatus,
} from "../../state/AppContext";
import SectionPlaceholder from "../common/SectionPlaceholder";

function DailyChallengesSection() {
  const dispatch = useAppDispatch();
  const { items } = useDailyChallenges();
  const { modules } = useHydrationStatus();

  const activeChallenges = (items || []).filter((item) => !item.claimed);
  const allClaimed = activeChallenges.length === 0;

  const handleClaim = useCallback(
    (id) => {
      dispatch({ type: "CLAIM_DAILY_CHALLENGE", payload: { id } });
      dispatch({ type: "ACHIEVEMENT_EVENT", payload: { type: "challenge_claimed" } });
    },
    [dispatch]
  );

  if (modules.challenges) {
    return <SectionPlaceholder height={220} />;
  }

  return (
    <View style={styles.container} accessibilityRole="list">
      <Text style={styles.title} accessibilityRole="header">
        Desafios diarios
      </Text>
      {allClaimed ? (
        <Text style={styles.emptyText}>Todo al dia. Vuelve mañana.</Text>
      ) : (
        activeChallenges.map((item) => {
          const { xp, mana } = item.reward;
          const canClaim = item.progress >= item.goal && !item.claimed;
          const buttonLabel = canClaim ? "Reclamar" : "En progreso";
          const progressPct = Math.min(
            100,
            Math.round((item.progress / item.goal) * 100)
          );

          return (
            <View key={item.id} style={styles.card}>
              <View style={styles.headerRow}>
                <Text style={styles.challengeTitle}>{item.title}</Text>
                <View style={styles.rewardPill}>
                  <Text
                    style={styles.rewardText}
                  >{`+${xp} XP / +${mana} Mana`}</Text>
                </View>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[styles.progressFill, { width: `${progressPct}%` }]}
                />
              </View>
              <Text
                style={styles.progressText}
              >{`${item.progress}/${item.goal}`}</Text>
              <Pressable
                onPress={() => handleClaim(item.id)}
                disabled={!canClaim}
                style={({ pressed }) => [
                  styles.claimButton,
                  canClaim ? styles.claimButtonEnabled : styles.claimButtonDisabled,
                  pressed && canClaim ? { transform: [{ scale: 0.98 }] } : null,
                ]}
                accessibilityRole="button"
                accessibilityState={{ disabled: !canClaim }}
                accessibilityLabel={
                  canClaim
                    ? `Reclamar desafio ${item.title}`
                    : `Progreso desafio ${item.title}`
                }
              >
                <Text
                  style={[
                    styles.claimButtonText,
                    !canClaim && styles.claimButtonTextDisabled,
                  ]}
                >
                  {buttonLabel}
                </Text>
              </Pressable>
            </View>
          );
        })
      )}
    </View>
  );
}

export default DailyChallengesSection;
