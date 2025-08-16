// [MB] TaskFilterBar.styles — tabs con chip trasero
// [MB] Módulo: Tasks / Sección: Barra de filtros
// Afecta: TaskFilterBar (tabs principales)
// Propósito: Estilos para chip animado en tabs de estado
// Puntos de edición futura: mejoras de contraste y foco
// Autor: Codex - Fecha: 2025-08-22

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Spacing.small,
    position: "relative",
    height: Spacing.xlarge + Spacing.tiny,
  },
  button: {
    flex: 1,
    borderRadius: Radii.md,
    alignItems: "center",
    justifyContent: "center",
  },
  chip: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    borderRadius: Radii.md,
    backgroundColor: Colors.accent,
    zIndex: -1,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  labelActive: {
    color: Colors.onAccent,
  },
  labelInactive: {
    color: Colors.textMuted,
  },
});
