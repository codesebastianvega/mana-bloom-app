// [MB] Módulo: Home / Sección: Recompensa Diaria
// Afecta: HomeScreen
// Propósito: Mostrar botón para reclamar recompensa diaria
// Puntos de edición futura: integrar animaciones y estados visuales
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./DailyRewardSection.styles";
import {
  useAppDispatch,
  useAppState,
  useCanClaimToday,
  DAILY_REWARD_MANA,
} from "../../state/AppContext";

export default function DailyRewardSection() {
  const dispatch = useAppDispatch();
  const { streak } = useAppState();
  const canClaimToday = useCanClaimToday();

  const handleClaim = () => {
    dispatch({ type: "CLAIM_DAILY_REWARD" });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recompensa diaria</Text>
      {canClaimToday ? (
        <Pressable
          onPress={handleClaim}
          style={styles.claimButton}
          accessibilityRole="button"
          accessibilityLabel="Reclamar recompensa diaria"
        >
          <Text style={styles.claimButtonText}>
            {`Reclamar recompensa diaria (+${DAILY_REWARD_MANA})`}
          </Text>
        </Pressable>
      ) : (
        <View>
          <Text style={styles.claimedText}>Ya reclamaste hoy</Text>
          <Text style={styles.streakText}>{`Racha: ${streak} días`}</Text>
        </View>
      )}
    </View>
  );
}
