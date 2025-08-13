// [MB] Módulo: Tasks / Sección: AddTaskButton estilos
// Afecta: AddTaskButton
// Propósito: Estilos del botón flotante de nueva tarea
// Puntos de edición futura: animaciones y posicionamiento
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Elevation } from "../../theme";

export const FAB_SIZE = 60;

export default StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: Spacing.large,
    right: Spacing.large,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.accent,
    ...Elevation.raised,
  },
  fabPressed: {
    opacity: 0.85,
  },
});
