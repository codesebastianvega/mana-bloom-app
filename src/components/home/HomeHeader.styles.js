// [MB] Modulo: Home / Seccion: HomeHeader
// Afecta: HomeHeader
// Proposito: Estilos para titulo superior y chip de estado de planta
// Puntos de edicion futura: agregar responsive y acciones secundarias
// Autor: Codex - Fecha: 2025-10-07

import { StyleSheet } from "react-native";
import { Colors, Spacing, Typography, Radii } from "../../theme";

export default StyleSheet.create({
  gradient: {
    paddingTop: 0,
  },
  safeArea: {
    paddingTop: Spacing.small,
  },
  container: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.small,
    gap: Spacing.small,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandBlock: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  lotusIcon: {
    width: 32,
    height: 32,
  },
  title: {
    ...Typography.h2,
    fontSize: 22,
    lineHeight: 28,
    color: Colors.text,
    letterSpacing: 0.5,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  iconButtonBare: {
    padding: Spacing.small,
    position: "relative",
  },
  badgeDot: {
    position: "absolute",
    top: Spacing.tiny / 2,
    right: Spacing.tiny / 2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  plantChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny + 2,
    gap: Spacing.small,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  plantDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  plantTextBlock: {
    flex: 1,
    gap: 2,
  },
  plantName: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  plantState: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  plantNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  plantLevel: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  healthBadge: {
    minWidth: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radii.pill,
    borderWidth: 1,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny / 2,
    backgroundColor: "rgba(255,255,255,0.05)",
  },
  healthText: {
    ...Typography.caption,
    fontWeight: "700",
  },
});
