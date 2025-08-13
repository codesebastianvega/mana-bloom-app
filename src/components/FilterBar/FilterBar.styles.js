// [MB] Módulo: Tasks / Sección: Barra de filtros
// Afecta: FilterBar (tabs principales)
// Propósito: Estilos de control segmentado para estado de tareas
// Puntos de edición futura: animaciones y accesibilidad
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.lg,
    padding: Spacing.tiny,
    gap: Spacing.tiny,
    marginVertical: Spacing.small,
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: Radii.lg,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonActive: {
    backgroundColor: Colors.accent,
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
