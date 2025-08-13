// [MB] Módulo: Home / Estilos: HomeWelcomeCard
// Afecta: HomeScreen
// Propósito: Estilos para saludo y resumen de estado
// Puntos de edición futura: ajustar layout o añadir gráficos
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
    marginTop: Spacing.small,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text,
    marginTop: Spacing.tiny,
  },
});
