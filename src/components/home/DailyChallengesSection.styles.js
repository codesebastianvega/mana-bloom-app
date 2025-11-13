// [MB] Modulo: Home / Estilos: DailyChallengesSection
// Afecta: HomeScreen
// Proposito: Estilos para desafios diarios con progreso y botones
// Puntos de edicion futura: ajustar barra de progreso y botones
// Autor: Codex - Fecha: 2025-08-12

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.small,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  card: {
    backgroundColor: Colors.surfaceAlt,
    padding: Spacing.base,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: Spacing.small,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.small,
  },
  challengeTitle: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  rewardPill: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: "rgba(255, 202, 40, 0.16)",
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  rewardText: {
    ...Typography.caption,
    color: Colors.accent,
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
    backgroundColor: Colors.secondary,
  },
  progressText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  claimButton: {
    marginTop: Spacing.small,
    paddingVertical: Spacing.small,
    borderRadius: Radii.lg,
    alignItems: "center",
  },
  claimButtonEnabled: {
    backgroundColor: Colors.buttonBg,
  },
  claimButtonDisabled: {
    backgroundColor: Colors.filterBtnBg,
  },
  claimButtonText: {
    ...Typography.body,
    color: Colors.textInverse,
    fontWeight: "600",
  },
  claimButtonTextDisabled: {
    color: Colors.textMuted,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.small,
  },
});
