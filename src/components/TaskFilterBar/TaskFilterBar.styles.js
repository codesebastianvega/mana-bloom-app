// [MB] Módulo: Tasks / Sección: Barra de filtros
// Afecta: TaskFilterBar (tabs principales)
// Propósito: Estilos de control segmentado para estado de tareas
// Puntos de edición futura: animaciones y accesibilidad
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: Radii.sm,
    paddingHorizontal: Spacing.tiny,
    paddingVertical: Spacing.tiny,
    gap: Spacing.tiny,
    zIndex: 50,
    ...Elevation.raised,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: Radii.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: Colors.secondary,
  },
  buttonInactive: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.separator,
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
