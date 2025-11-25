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
  },
  container: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.tiny / 2,
    paddingBottom: Spacing.small,
    gap: Spacing.small,
  },
  menuButton: {
    alignSelf: "flex-start",
    padding: Spacing.tiny,
    marginLeft: -Spacing.tiny,
  },
  title: {
    ...Typography.h1,
    fontSize: 32,
    lineHeight: 38,
    color: Colors.text,
  },
  plantChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    gap: Spacing.small,
    backgroundColor: Colors.surface,
  },
  plantDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  plantTexts: {
    flexDirection: "column",
    gap: Spacing.tiny / 2,
  },
  plantLabel: {
    ...Typography.title,
    fontSize: 18,
    fontWeight: "700",
    color: Colors.text,
  },
  plantState: {
    ...Typography.caption,
    fontSize: 12,
    color: Colors.textMuted,
  },
  plantIconWrapper: {
    width: 18,
    height: 18,
    justifyContent: "center",
    alignItems: "center",
  },
});
