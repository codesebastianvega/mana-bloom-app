// [MB] Módulo: Home / Sección: HomeHeader
// Afecta: HomeHeader
// Propósito: Estilos para top bar, chips y popovers del encabezado
// Puntos de edición futura: ajustar tamaños de chip y responsividad
// Autor: Codex - Fecha: 2025-08-14

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Elevation } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.small,
    ...Elevation.raised,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
  },
  plantChip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.small,
    height: 28,
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
  chipBlock: {
    marginTop: Spacing.small,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.small,
    height: 28,
  },
  chipIcon: {
    marginRight: Spacing.tiny,
  },
  chipText: {
    ...Typography.caption,
    color: Colors.text,
  },
  popoverContainer: {
    marginTop: Spacing.small,
    width: "100%",
    backgroundColor: Colors.surfaceElevated,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    ...Elevation.raised,
  },
  popoverTitle: {
    ...Typography.body,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: Spacing.tiny,
  },
  popoverDesc: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  levelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.small,
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
  buffRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
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
