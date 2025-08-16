// [MB] Módulo: Home / Sección: HomeDailyRewardCard
// Afecta: HomeScreen
// Propósito: Tarjeta para mostrar y reclamar la recompensa diaria
// Puntos de edición futura: conectar countdown real y estado global
// Autor: Codex - Fecha: 2025-02-15

import React, { useRef } from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  AccessibilityInfo,
} from "react-native";

import styles from "./HomeDailyRewardCard.styles";

export default function HomeDailyRewardCard({
  state = "available",
  streakCount = 0,
  rewardLabel = "",
  cooldownLabel = "00:00",
  onClaim,
}) {
  const scale = useRef(new Animated.Value(1)).current;
  const opacity = useRef(new Animated.Value(1)).current;

  const handleClaim = () => {
    if (state !== "available") return;
    onClaim?.();
    scale.setValue(0.96);
    opacity.setValue(0.8);
    Animated.parallel([
      Animated.timing(scale, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start(() => {
      AccessibilityInfo?.announceForAccessibility?.("Recompensa reclamada");
    });
  };

  const a11yLabel =
    state === "available"
      ? "Recompensa diaria disponible. Reclamar."
      : state === "cooldown"
      ? `Recompensa diaria en espera. Disponible en ${cooldownLabel}.`
      : "Recompensa diaria ya reclamada.";

  return (
    <Animated.View
      style={[styles.container, { transform: [{ scale }], opacity }]}
      accessible
      accessibilityLabel={a11yLabel}
    >
      <View style={styles.headerRow}>
        <Text style={styles.title} accessibilityRole="header">
          Recompensa diaria
        </Text>
        {rewardLabel ? (
          <View
            style={styles.rewardPill}
            accessibilityRole="text"
            accessibilityLabel={rewardLabel}
          >
            <Text style={styles.rewardIcon}>✨</Text>
            <Text style={styles.rewardText}>{rewardLabel}</Text>
          </View>
        ) : null}
      </View>

      {state === "available" && (
        <Pressable
          onPress={handleClaim}
          style={styles.claimButton}
          accessibilityRole="button"
          accessibilityLabel="Reclamar recompensa diaria"
        >
          <Text style={styles.claimText}>Reclamar</Text>
        </Pressable>
      )}

      {state === "cooldown" && (
        <>
          <View
            style={[styles.claimButton, styles.claimButtonDisabled]}
            accessibilityRole="button"
            accessibilityState={{ disabled: true }}
            accessibilityLabel={`Recompensa diaria en espera. Disponible en ${cooldownLabel}.`}
          >
            <Text style={styles.claimText}>Reclamar</Text>
          </View>
          <View style={styles.cooldownInfo}>
            <Text style={styles.cooldownText}>{cooldownLabel}</Text>
            <View
              style={styles.streakPill}
              accessibilityRole="text"
              accessibilityLabel={`Racha: ${streakCount}`}
            >
              <Text style={styles.streakText}>{`🔥 ${streakCount}`}</Text>
            </View>
          </View>
        </>
      )}

      {state === "claimed" && (
        <View style={styles.claimedRow}>
          <View
            style={styles.claimedBadge}
            accessibilityRole="text"
            accessibilityLabel="Recompensa reclamada"
          >
            <Text style={styles.claimedBadgeText}>Reclamado</Text>
          </View>
          <View
            style={styles.streakPill}
            accessibilityRole="text"
            accessibilityLabel={`Racha: ${streakCount}`}
          >
            <Text style={styles.streakText}>{`🔥 ${streakCount}`}</Text>
          </View>
        </View>
      )}
    </Animated.View>
  );
}

