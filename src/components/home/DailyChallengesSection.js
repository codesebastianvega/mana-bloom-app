// [MB] Módulo: Home / Componente: DailyChallengesSection
// Afecta: HomeScreen
// Propósito: Mostrar desafíos diarios con progreso y reclamo de recompensas
// Puntos de edición futura: animaciones y estados avanzados
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./DailyChallengesSection.styles";
import { useDailyChallenges, useAppDispatch } from "../../state/AppContext";

export default function DailyChallengesSection() {
  const dispatch = useAppDispatch();
  const { items } = useDailyChallenges();

  const allClaimed = items.every((item) => item.claimed);

  const handleClaim = (id) => {
    dispatch({ type: "CLAIM_DAILY_CHALLENGE", payload: { id } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Desafíos Diarios</Text>
      {allClaimed ? (
        <Text style={styles.emptyText}>¡Todo al día! Vuelve mañana</Text>
      ) : (
        items.map((item) => {
          const canClaim = item.progress >= item.goal && !item.claimed;
          const buttonLabel = canClaim
            ? "Reclamar"
            : item.claimed
            ? "Reclamado"
            : "En progreso";
          return (
            <View key={item.id} style={styles.card}>
              <View style={styles.headerRow}>
                <Text style={styles.challengeTitle}>{item.title}</Text>
                <View style={styles.rewardPill}>
                  <Text style={styles.rewardText}>{`+${item.reward.xp} XP / +${item.reward.mana} Maná`}</Text>
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
                style={[
                  styles.claimButton,
                  canClaim ? styles.claimButtonEnabled : styles.claimButtonDisabled,
                ]}
                accessibilityRole="button"
                accessibilityLabel={`${buttonLabel} desafío ${item.title}`}
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
