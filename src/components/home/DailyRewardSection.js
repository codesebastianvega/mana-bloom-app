// [MB] Módulo: Home / Sección: Recompensa Diaria
// Afecta: HomeScreen
// Propósito: Mostrar botón para reclamar recompensa diaria
// Puntos de edición futura: integrar animaciones y estados visuales
// Autor: Codex - Fecha: 2025-08-13

import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./DailyRewardSection.styles";
import {
  useAppDispatch,
  useAppState,
  useCanClaimToday,
  DAILY_REWARD_MANA,
  useHydrationStatus,
} from "../../state/AppContext";
import SectionPlaceholder from "./SectionPlaceholder";

export default function DailyRewardSection() {
  const dispatch = useAppDispatch();
  const { streak } = useAppState();
  const canClaimToday = useCanClaimToday();
  const hydration = useHydrationStatus();

  const handleClaim = () => {
    dispatch({ type: "CLAIM_DAILY_REWARD" });
  };

  if (hydration.progress) {
    return <SectionPlaceholder height={110} />;
  }

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
