// [MB] Módulo: Tasks / Sección: Pantalla de tareas
// Afecta: TasksScreen
// Propósito: Estilos base alineados al home
// Puntos de edición futura: ajustes de layout y modales
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii } from "../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
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
});
