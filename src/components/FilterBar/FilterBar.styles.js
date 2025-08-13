// [MB] Módulo: Tasks / Sección: Barra de filtros
// Afecta: FilterBar (tabs principales)
// Propósito: Estilos de control segmentado para estado de tareas
// Puntos de edición futura: animaciones y accesibilidad
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Spacing.tiny,
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.tiny,
    backgroundColor: Colors.surface,
    zIndex: 50,
    elevation: 4,
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
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.separator,
  },
  textActive: {
    ...Typography.caption,
    color: Colors.onAccent,
    fontWeight: "600",
  },
  textInactive: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});
