// [MB] TasksScreen.styles — ajustes de layout y FAB
// [MB] Módulo: Tasks / Sección: Pantalla de tareas
// Afecta: TasksScreen
// Propósito: Estilos base alineados al home
// Puntos de edición futura: ajustes de layout y modales
// Autor: Codex - Fecha: 2025-08-14

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
  fabContainer: {
    position: "absolute",
    right: Spacing.large,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    overflow: "hidden",
    zIndex: 60,
    ...Elevation.raised,
  },
  fabGradient: {
    flex: 1,
    borderRadius: FAB_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
