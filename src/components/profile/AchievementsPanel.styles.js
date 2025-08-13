// [MB] Módulo: Profile / Estilos: AchievementsPanel
// Afecta: AchievementsPanel
// Propósito: Estilos para panel de logros en perfil
// Puntos de edición futura: ajuste de colores y disposición
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Elevation } from "../../theme";

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
  achievementTitle: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: Spacing.small,
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
    backgroundColor: Colors.buttonBg,
  },
  claimButtonText: {
    ...Typography.body,
    color: Colors.textInverse,
  },
  statusText: {
    ...Typography.caption,
    color: Colors.text,
    marginTop: Spacing.small,
  },
  viewAllButton: {
    marginTop: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.md,
    paddingVertical: Spacing.small,
    alignItems: "center",
  },
  viewAllText: {
    ...Typography.body,
    color: Colors.text,
  },
});

