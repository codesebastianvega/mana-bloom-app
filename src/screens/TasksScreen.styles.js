// [MB] Módulo: Tasks / Sección: Pantalla de tareas
// Afecta: TasksScreen
// Propósito: Estilos base alineados al home
// Puntos de edición futura: ajustes de layout y modales
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation } from "../theme";
import { FAB_SIZE } from "../components/AddTaskButton/AddTaskButton.styles";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    gap: Spacing.large,
    paddingBottom: FAB_SIZE + Spacing.large * 2,
  },
  filterModalBackground: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: "center",
    alignItems: "center",
  },
  filterModalContainer: {
    width: "90%",
    backgroundColor: Colors.surface,
    borderRadius: Radii.md,
    padding: Spacing.base,
    maxHeight: "90%",
  },
  fab: {
    position: "absolute",
    right: Spacing.large,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.accent,
    zIndex: 60,
    ...Elevation.card,
    elevation: 8,
  },
});
