// [MB] Módulo: Tasks / Sección: Barra de filtros modal
// Afecta: TaskFilters (modal de filtros)
// Propósito: Estilos para tabs compactas
// Puntos de edición futura: animaciones y estados
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.tiny,
    paddingVertical: Spacing.tiny,
    gap: Spacing.tiny,
    zIndex: 50,
    ...Elevation.raised,
  },
  button: {
    flex: 0.5,
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

