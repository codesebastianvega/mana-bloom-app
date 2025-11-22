// [MB] Módulo: Home / Sección: Recompensa Diaria
// Afecta: HomeScreen
// Propósito: Mostrar recompensa diaria y permitir su reclamo
// Puntos de edición futura: integrar animaciones y estados visuales
// Autor: Codex - Fecha: 2025-08-17

import React, { useCallback } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./DailyRewardSection.styles";
import {
  useAppDispatch,
  useAppState,
  useDailyReward,
  useHydrationStatus,
} from "../../state/AppContext";
import { Colors, Opacity } from "../../theme";
import SectionPlaceholder from "../common/SectionPlaceholder";

function DailyRewardSection() {
  const dispatch = useAppDispatch();
  const { streak } = useAppState();
  const dailyReward = useDailyReward();
  const { modules } = useHydrationStatus();

  const handleClaim = useCallback(() => {
    dispatch({ type: "CLAIM_TODAY_REWARD" });
  }, [dispatch]);

  if (modules.wallet) {
    return <SectionPlaceholder height={72} />;
  }

  const { claimed, reward } = dailyReward;
  const iconName =
    reward?.kind === "mana"
      ? "star"
      : reward?.kind === "coin"
      ? "pricetag"
      : reward?.kind === "gem"
      ? "diamond"
      : reward?.kind === "item" && reward?.sku?.includes("potions")
      ? "flask"
      : "cube";

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        Recompensa diaria
      </Text>
      {reward && (
        <View style={styles.rewardPill} accessible accessibilityLabel={reward.title}>
          <Ionicons
            name={iconName}
            size={16}
            color={Colors.text}
            style={styles.rewardIcon}
          />
          <Text style={styles.rewardText}>{reward.title}</Text>
        </View>
      )}
      <Pressable
        onPress={handleClaim}
        disabled={claimed}
        style={({ pressed }) => [
          styles.claimButton,
          claimed && { opacity: Opacity.disabled },
          pressed && { transform: [{ scale: 0.98 }] },
        ]}
        accessibilityRole="button"
        accessibilityState={{ disabled: claimed }}
        accessibilityLabel={
          claimed ? "Recompensa diaria reclamada" : "Reclamar recompensa diaria"
        }
      >
        <Text style={styles.claimButtonText}>
          {claimed ? "Reclamado" : "Reclamar"}
        </Text>
      </Pressable>
      {claimed && (
        <Text style={styles.streakText}>{`Racha: ${streak} días`}</Text>
      )}
    </View>
  );
}

export default DailyRewardSection;
