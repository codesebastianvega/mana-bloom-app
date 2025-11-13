// [MB] Modulo: Tasks / Seccion: Pantalla de tareas
// Afecta: TasksScreen
// Proposito: Estilos base de listado, fab y modales
// Puntos de edicion futura: layout y overlays
// Autor: Codex - Fecha: 2025-10-20

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation } from "../theme";
import { FAB_SIZE } from "../components/AddTaskButton/AddTaskButton.styles";

const glassOverlay = (alpha) => `rgba(22, 16, 41, ${alpha})`;
const withAlpha = (hex = "", alpha = 1) => {
  if (!hex) return hex;
  let cleaned = `${hex}`.replace("#", "").trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split("")
      .map((c) => `${c}${c}`)
      .join("");
  }
  if (cleaned.length === 8) {
    cleaned = cleaned.slice(0, 6);
  }
  if (cleaned.length !== 6) {
    return hex;
  }
  const value = parseInt(cleaned, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

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
    backgroundColor: glassOverlay(0.55),
    justifyContent: "center",
    alignItems: "center",
  },
  filterModalContainer: {
    width: "90%",
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.92),
    borderRadius: Radii.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.25),
    maxHeight: "90%",
    ...Elevation.card,
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


