// [MB] Módulo: Common / Estilos: AchievementToast
// Afecta: AchievementToast
// Propósito: Estilos para toast de logro desbloqueado
// Puntos de edición futura: animaciones y paleta
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Elevation } from "../../theme";

export default StyleSheet.create({
  container: {
    position: "absolute",
    left: Spacing.base,
    right: Spacing.base,
    padding: Spacing.base,
    borderRadius: Radii.lg,
    backgroundColor: Colors.surfaceElevated,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    ...Elevation.card,
  },
  icon: {
    fontSize: 20,
  },
  text: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  closeButton: {
    padding: Spacing.tiny,
  },
  closeText: {
    ...Typography.body,
    color: Colors.text,
  },
});

