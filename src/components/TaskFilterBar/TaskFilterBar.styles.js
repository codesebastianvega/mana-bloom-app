// [MB] TaskFilterBar.styles — tabs con chip trasero
// [MB] Módulo: Tasks / Sección: Barra de filtros
// Afecta: TaskFilterBar (tabs principales)
// Propósito: Estilos para chip animado en tabs de estado
// Puntos de edición futura: mejoras de contraste y foco
// Autor: Codex - Fecha: 2025-08-16

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Spacing.small,
    position: "relative",
    height: Spacing.xlarge + Spacing.tiny,
    paddingHorizontal: Spacing.small,
    borderRadius: Radii.md,
    overflow: "hidden",
  },
  button: {
    flex: 1,
    borderRadius: Radii.md,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 1,
    elevation: 1,
  },
  chip: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: Radii.md,
    backgroundColor: Colors.accent,
    zIndex: 0,
    elevation: 0,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    zIndex: 1,
    elevation: 1,
  },
  label: {
    ...Typography.body,
    fontWeight: "600",
  },
  badge: {
    position: "absolute",
    top: -Spacing.tiny,
    right: -Spacing.tiny * 1.5,
    backgroundColor: Colors.attention || Colors.warning || Colors.accent,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.tiny,
    paddingVertical: Spacing.tiny / 2,
    zIndex: 2,
    pointerEvents: "none",
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.onAttention || Colors.onAccent || Colors.text,
    fontWeight: "700",
  },
});
