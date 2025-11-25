// [MB] Modulo: Home / Seccion: HomeRewards
// Afecta: HomeScreen
// Proposito: Bloque de racha + reclamo + enlace social
// Puntos de edicion futura: reintroducir confetti/haptics y logros extra
// Autor: Codex - Fecha: 2025-10-07 (V5)

import React, { useCallback, useMemo } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, Spacing, Radii, Typography } from "../../theme";
import SectionPlaceholder from "../common/SectionPlaceholder";

export default function HomeRewardsSection({
  rewardState,
  streakCount,
  rewardLabel,
  onClaimReward,
  onPressSocial,
  isHydrating = false,
}) {
  const isAvailable = rewardState === "available";
  const isClaimed = rewardState === "claimed";
  const rewardText = rewardLabel?.trim() || "+50 Mana";
  const streakSubtitle = isAvailable ? "Sigue asi!" : "Regresa manana";
  const streakTitle = useMemo(
    () => `Racha de ${streakCount || 0} dias`,
    [streakCount]
  );

  const handleClaim = useCallback(() => {
    if (!isAvailable) return;
    onClaimReward?.();
  }, [isAvailable, onClaimReward]);

  if (isHydrating) {
    return <SectionPlaceholder height={200} />;
  }

  return (
    <LinearGradient
      colors={["#3c2020", "#251018"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.card}
    >
      <View style={styles.row}>
        <View style={styles.iconCircle}>
          <MaterialCommunityIcons name="fire" size={20} color={Colors.accent} />
        </View>
          <View style={styles.texts}>
            <Text style={styles.streakTitle}>{streakTitle}</Text>
            <View style={styles.subtitleRow}>
              <Text style={styles.streakSubtitle}>{streakSubtitle}</Text>
              <Text style={styles.rewardText}>{rewardText}</Text>
            </View>
          </View>
          {isClaimed ? (
            <View style={styles.claimBadge}>
              <MaterialCommunityIcons
                name="check-decagram"
                size={16}
                color={Colors.onAccent}
              />
              <Text style={styles.claimBadgeText}>Reclamado</Text>
            </View>
          ) : (
            <Pressable
              style={({ pressed }) => [
                styles.claimButton,
                !isAvailable && styles.claimButtonDisabled,
                pressed && isAvailable && styles.claimButtonPressed,
              ]}
              onPress={handleClaim}
              disabled={!isAvailable}
              accessibilityRole="button"
              accessibilityState={{ disabled: !isAvailable }}
              accessibilityLabel={
                isAvailable
                  ? `Reclamar recompensa diaria ${rewardText}`
                  : "Recompensa diaria en espera"
              }
            >
              {isAvailable ? (
                <LinearGradient
                  colors={["#ff9a2f", "#f85749"]}
                  start={{ x: 0, y: 0.5 }}
                  end={{ x: 1, y: 0.5 }}
                  style={styles.claimGradient}
                >
                  <MaterialCommunityIcons
                    name="gift"
                    size={16}
                    color={"#FFFFFF"}
                  />
                  <Text style={styles.claimButtonText}>Reclamar</Text>
                </LinearGradient>
              ) : (
                <View style={[styles.claimGradient, styles.claimGradientDisabled]}>
                  <MaterialCommunityIcons
                    name="gift-off"
                    size={16}
                    color={Colors.textMuted}
                  />
                  <Text style={styles.claimButtonDisabledText}>Pendiente</Text>
                </View>
              )}
            </Pressable>
          )}
        </View>

      <View style={styles.divider} />

      <Pressable
        style={({ pressed }) => [
          styles.socialLink,
          pressed && styles.socialLinkPressed,
        ]}
        onPress={onPressSocial}
        accessibilityRole="button"
        accessibilityLabel="Ver recompensas sociales"
      >
        <MaterialCommunityIcons
          name="account-group-outline"
          size={18}
          color={Colors.text}
        />
        <Text style={styles.socialLinkText}>Ver recompensas sociales</Text>
        <MaterialCommunityIcons
          name="chevron-right"
          size={18}
          color={Colors.textMuted}
        />
      </Pressable>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: -Spacing.base,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
  },
  card: {
    borderRadius: Radii.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: "rgba(255, 140, 94, 0.4)",
    gap: Spacing.small,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255, 128, 58, 0.2)",
  },
  texts: {
    flex: 1,
    gap: 4,
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  streakTitle: {
    ...Typography.cardTitle,
    color: Colors.text,
  },
  streakSubtitle: {
    ...Typography.cardSubtitle,
    color: Colors.text,
    opacity: 0.8,
  },
  rewardText: {
    ...Typography.caption,
    color: "#ffae70",
    fontWeight: "700",
  },
  claimButton: {
    borderRadius: Radii.lg,
    shadowColor: "rgba(255,120,80,0.5)",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  claimGradient: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    paddingHorizontal: Spacing.base + 4,
    paddingVertical: Spacing.small + 2,
    borderRadius: Radii.md,
    minWidth: 120,
    justifyContent: "center",
  },
  claimGradientDisabled: {
    backgroundColor: Colors.border,
  },
  claimButtonDisabled: {
    shadowOpacity: 0,
    elevation: 0,
  },
  claimButtonPressed: {
    opacity: 0.9,
  },
  claimButtonText: {
    ...Typography.button,
    fontWeight: "800",
    letterSpacing: 0.4,
    color: "#FFFFFF",
  },
  claimButtonDisabledText: {
    ...Typography.button,
    color: Colors.textMuted,
  },
  claimBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    paddingHorizontal: Spacing.base - 4,
    paddingVertical: Spacing.tiny + 2,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  claimBadgeText: {
    ...Typography.button,
    color: Colors.onAccent,
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginTop: Spacing.small,
  },
  socialLink: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.tiny + 2,
    paddingHorizontal: Spacing.small,
  },
  socialLinkPressed: {
    opacity: 0.85,
  },
  socialLinkText: {
    ...Typography.cardSubtitle,
    color: Colors.text,
    flex: 1,
    marginHorizontal: Spacing.small,
  },
});
