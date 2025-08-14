// [MB] Módulo: Tasks / Sección: Barra de filtros
// Afecta: TaskFilterBar (tabs principales)
// Propósito: Estilos de control segmentado para estado de tareas
// Puntos de edición futura: animaciones y accesibilidad
// Autor: Codex - Fecha: 2025-02-14

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Spacing.small,
  },
  button: {
    flex: 1,
    height: Spacing.xlarge + Spacing.tiny,
    borderRadius: Radii.md,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    position: "relative",
  },
  buttonActive: {},
  buttonInactive: {},
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  underline: {
    position: "absolute",
    left: Spacing.small,
    right: Spacing.small,
    bottom: 0,
    height: 2,
    backgroundColor: Colors.secondary,
    borderRadius: 1,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
  },
  labelActive: {
    color: Colors.text,
  },
  labelInactive: {
    color: Colors.textMuted,
  },
});
