// [MB] Modulo: Home / Seccion: HomeHeader
// Afecta: HomeHeader
// Proposito: Estilos para titulo superior y chip de estado de planta
// Puntos de edicion futura: agregar responsive y acciones secundarias
// Autor: Codex - Fecha: 2025-10-07

import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography, Radii } from "../../theme";

export default StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
    paddingTop: 0,
  },
  container: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.tiny / 4,
    paddingBottom: Spacing.small,
    gap: Spacing.small / 2,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.base,
  },
  logoBadge: {
    width: 36,
    height: 36,
    borderRadius: Radii.lg,
    backgroundColor: Colors.surfaceAlt,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  title: {
    ...Typography.h2,
    fontSize: 24,
    lineHeight: 28,
    color: Colors.text,
    letterSpacing: 0.5,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  iconButton: {
    padding: Spacing.small,
    borderRadius: Radii.lg,
    backgroundColor: Colors.surfaceAlt,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  plantChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
    gap: Spacing.small,
    backgroundColor: Colors.surfaceAlt,
  },
  plantDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  plantTexts: {},
  plantLabel: {},
  plantState: {},
  plantCopy: {
    ...Typography.caption,
    fontSize: 12,
    letterSpacing: 0.3,
    color: Colors.text,
    fontWeight: "600",
  },
  plantIconWrapper: {
    width: 16,
    height: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
