// [MB] Módulo: Home / Estilos: Recompensa Diaria
// Afecta: HomeScreen
// Propósito: Estilos para sección de recompensa diaria
// Puntos de edición futura: ajustar colores y diseño del botón
// Autor: Codex - Fecha: 2025-08-12

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation, Typography } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: Radii.lg,
    marginBottom: Spacing.tiny,
    ...Elevation.card,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
    marginBottom: Spacing.small,
  },
  claimButton: {
    backgroundColor: Colors.buttonBg,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii.md,
    alignItems: "center",
  },
  claimButtonText: {
    ...Typography.body,
    color: Colors.textInverse,
  },
  rewardPill: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
    alignSelf: "flex-start",
    marginBottom: Spacing.small,
  },
  rewardIcon: {
    marginRight: Spacing.tiny,
  },
  rewardText: {
    ...Typography.body,
    color: Colors.text,
  },
  streakText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});
