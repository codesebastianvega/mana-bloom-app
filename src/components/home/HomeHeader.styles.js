// [MB] Módulo: Home / Sección: HomeHeader
// Afecta: HomeHeader
// Propósito: Estilos para top bar, chips y popovers del encabezado
// Puntos de edición futura: ajustar tamaños de chip y responsividad
// Autor: Codex - Fecha: 2025-08-16

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Elevation } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.small,
    ...Elevation.raised,
    zIndex: 2,
    position: "relative",
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
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationsButton: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    width: Spacing.base * 2,
    height: Spacing.base * 2,
    justifyContent: "center",
    alignItems: "center",
  },
  chipBlock: {
    marginTop: Spacing.small,
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignSelf: "stretch",
    width: "100%",
    alignItems: "center",
    gap: Spacing.small,
    position: "relative",
    zIndex: 2,
  },
  chip: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    height: 30,
    flexBasis: "31%",
    maxWidth: "31%",
    flexGrow: 0,
    marginBottom: Spacing.small,
    justifyContent: "center",
    alignItems: "center",
  },
  chipAccent: {
    backgroundColor: Colors.accent,
  },
  chipContent: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  chipText: {
    ...Typography.caption,
    fontWeight: "600",
    color: Colors.text,
  },
  chipTextOnAccent: {
    ...Typography.caption,
    fontWeight: "600",
    color: Colors.onAccent,
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
    position: "relative",
    zIndex: 3,
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
  buffBadge: {
    height: 28,
    width: 28,
    borderRadius: Radii.md,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  buffText: {
    ...Typography.caption,
    fontWeight: "600",
    color: Colors.accent,
  },
});
