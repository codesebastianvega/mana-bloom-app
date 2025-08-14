// [MB] Módulo: Home / Sección: HomeHeader
// Afecta: HomeHeader
// Propósito: Estilos para encabezado principal en dos filas
// Puntos de edición futura: ajustar layout responsivo
// Autor: Codex - Fecha: 2025-02-15

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Elevation } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.small,
    gap: Spacing.small,
    ...Elevation.raised,
  },
  row1: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
  },
  row1Right: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: Spacing.tiny,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.small,
    height: 28,
  },
  pillIcon: {
    marginRight: Spacing.tiny,
  },
  pillText: {
    ...Typography.caption,
    color: Colors.text,
  },
  iconButton: {
    padding: Spacing.tiny,
    height: 28,
    width: 28,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Radii.md,
    backgroundColor: Colors.surface,
  },
  row2: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  levelContainer: {
    flex: 1,
    marginRight: Spacing.small,
  },
  levelText: {
    ...Typography.caption,
    color: Colors.text,
    marginBottom: Spacing.tiny,
  },
  xpBar: {
    height: 6,
    backgroundColor: Colors.surfaceAlt,
    borderRadius: 3,
    overflow: "hidden",
  },
  xpFill: {
    height: "100%",
    borderRadius: 3,
  },
  row2Right: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  rewardPill: {
    paddingHorizontal: Spacing.small,
    height: 28,
    borderRadius: Radii.md,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  rewardText: {
    ...Typography.caption,
    color: Colors.text,
  },
  buffIcon: {
    height: 28,
    width: 28,
    borderRadius: Radii.md,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
});

