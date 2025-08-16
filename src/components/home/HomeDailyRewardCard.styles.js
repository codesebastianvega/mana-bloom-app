// [MB] Módulo: Home / Estilos: HomeDailyRewardCard
// Afecta: HomeDailyRewardCard
// Propósito: Estilos para tarjeta de recompensa diaria unificada
// Puntos de edición futura: animaciones y temporizador en espera
// Autor: Codex - Fecha: 2025-02-15

import { StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Typography,
  Elevation,
  ElementAccents,
  Opacity,
} from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    padding: Spacing.base,
    gap: Spacing.base,
    ...Elevation.card,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...Typography.title,
    color: Colors.onCard,
  },
  rewardPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: ElementAccents.accentCta,
    paddingHorizontal: Spacing.small,
    height: 28,
    borderRadius: Radii.lg,
    ...Elevation.raised,
  },
  rewardIcon: {
    marginRight: Spacing.tiny,
  },
  rewardText: {
    ...Typography.caption,
    color: Colors.onAccent,
  },
  claimButton: {
    width: "100%",
    height: 36,
    borderRadius: Radii.lg,
    backgroundColor: ElementAccents.accentCta,
    justifyContent: "center",
    alignItems: "center",
    ...Elevation.raised,
  },
  claimButtonDisabled: {
    opacity: Opacity.disabled,
  },
  claimText: {
    ...Typography.body,
    fontWeight: "600",
    color: Colors.onAccent,
  },
  cooldownInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  cooldownText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  streakPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.small,
    height: 28,
    borderRadius: Radii.lg,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Elevation.raised,
  },
  streakText: {
    ...Typography.caption,
    color: Colors.onCard,
  },
  claimedRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  claimedBadge: {
    backgroundColor: ElementAccents.accentCta,
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.small,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
    ...Elevation.raised,
  },
  claimedBadgeText: {
    ...Typography.caption,
    color: Colors.onAccent,
  },
});

