// [MB] Módulo: Home / Componente: DailyChallengesSection
// Afecta: HomeScreen
// Propósito: Mostrar desafíos diarios con progreso y reclamo de recompensas
// Puntos de edición futura: animaciones y estados avanzados
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

  const allClaimed = items.every((item) => item.claimed);

  const handleClaim = useCallback(
    (id) => {
      dispatch({ type: "CLAIM_DAILY_CHALLENGE", payload: { id } });
      dispatch({ type: "ACHIEVEMENT_EVENT", payload: { type: "challenge_claimed" } });
    },
    [dispatch]
  );

  if (modules.challenges) {
    return <SectionPlaceholder height={200} />;
  }

  return (
    <View style={styles.container} accessibilityRole="list">
      <Text style={styles.title} accessibilityRole="header">
        Desafíos Diarios
      </Text>
      {allClaimed ? (
        <Text style={styles.emptyText}>¡Todo al día! Vuelve mañana</Text>
      ) : (
        items.map((item) => {
          const { xp, mana } = item.reward;
          const canClaim = item.progress >= item.goal && !item.claimed;
          const buttonLabel = canClaim
            ? "Reclamar"
            : item.claimed
            ? "Reclamado"
            : "En progreso";
          return (
            <View key={item.id} style={styles.card} accessibilityRole="listitem">
              <View style={styles.headerRow}>
                <Text style={styles.challengeTitle}>{item.title}</Text>
                <View style={styles.rewardPill}>
                  <Text style={styles.rewardText}>{`+${xp} XP / +${mana} Maná`}</Text>
                </View>
              </View>
              <View style={styles.progressBar}>
                <View
                  style={[
                    styles.progressFill,
                    { width: `${(item.progress / item.goal) * 100}%` },
                  ]}
                />
              </View>
              <Text style={styles.progressText}>{`${item.progress}/${item.goal}`}</Text>
              <Pressable
                onPress={() => handleClaim(item.id)}
                disabled={!canClaim}
                style={({ pressed }) => [
                  styles.claimButton,
                  canClaim ? styles.claimButtonEnabled : styles.claimButtonDisabled,
                  pressed && { transform: [{ scale: 0.98 }] },
                ]}
                accessibilityRole="button"
                accessibilityState={{ disabled: !canClaim }}
                accessibilityLabel={
                  canClaim
                    ? `Reclamar desafío ${item.title}`
                    : item.claimed
                    ? `Desafío ${item.title} reclamado`
                    : `Progreso desafío ${item.title}`
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
