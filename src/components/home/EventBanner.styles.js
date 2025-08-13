// [MB] Módulo: Home / Estilos: EventBanner
// Afecta: HomeScreen
// Propósito: Estilos para banner de evento con chip de días restantes
// Puntos de edición futura: agregar imágenes, enlaces y fecha dinámica
// Autor: Codex - Fecha: 2025-08-12

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation, Typography } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: Radii.md,
    marginBottom: Spacing.tiny,
    ...Elevation.card,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  chip: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.base,
    height: 28,
    justifyContent: "center",
    marginTop: Spacing.small,
    alignSelf: "flex-start",
  },
  chipText: {
    ...Typography.caption,
    color: Colors.text,
  },
});
