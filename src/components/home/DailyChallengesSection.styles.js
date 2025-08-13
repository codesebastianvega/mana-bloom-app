// [MB] Módulo: Home / Estilos: DailyChallengesSection
// Afecta: HomeScreen
// Propósito: Estilos para desafíos diarios con progreso y botones
// Puntos de edición futura: ajustar barra de progreso y botones
// Autor: Codex - Fecha: 2025-08-12

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation, Typography } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: Radii.md,
    marginBottom: Spacing.tiny,
    ...Elevation.card,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  card: {
    backgroundColor: Colors.surfaceAlt,
    padding: Spacing.base,
    borderRadius: Radii.md,
    marginTop: Spacing.tiny,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.small,
  },
  challengeTitle: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
    marginRight: Spacing.small,
  },
  rewardPill: {
    backgroundColor: Colors.filterBtnBg,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
  },
  rewardText: {
    ...Typography.caption,
    color: Colors.text,
  },
  progressBar: {
    height: 6,
    backgroundColor: Colors.border,
    borderRadius: Radii.pill,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: Colors.secondary,
    borderRadius: Radii.pill,
  },
  progressText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
  },
  claimButton: {
    marginTop: Spacing.small,
    paddingVertical: Spacing.small,
    borderRadius: Radii.md,
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
  },
  claimButtonTextDisabled: {
    color: Colors.textMuted,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.base,
  },
});
