// [MB] Módulo: Home / Estilos: HomeWelcomeCard
// Afecta: HomeScreen
// Propósito: Estilos para tarjeta de bienvenida tipo hero card
// Puntos de edición futura: ajustar sombras o tamaños de chips
// Autor: Codex - Fecha: 2025-02-14

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation, Typography } from "../../theme";

export default StyleSheet.create({
  container: {
    borderRadius: Radii.xl,
    padding: Spacing.large,
    minHeight: 120,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.large,
    ...Elevation.card,
  },
  badge: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surfaceElevated + "cc",
    borderWidth: 2,
    borderColor: Colors.secondary,
  },
  content: {
    flex: 1,
    gap: Spacing.small,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: Spacing.small,
    rowGap: Spacing.tiny,
  },
  chip: {
    height: 30,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.base,
    justifyContent: "center",
    backgroundColor: Colors.surface + "b3",
    borderWidth: 1,
    borderColor: Colors.textMuted + "40",
  },
  chipText: {
    ...Typography.caption,
    color: Colors.text,
  },
});
