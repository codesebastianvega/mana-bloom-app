// [MB] Módulo: UI / Sección: Wrappers
// Afecta: PlantScreen (secciones)
// Propósito: contenedor de sección con fondo elevado y padding
// Puntos de edición futura: mover a styles si crece
// Autor: Codex - Fecha: 2025-08-16

import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation } from "../../theme";

export default function ScreenSection({ children, style }) {
  return <View style={[styles.section, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  section: {
    backgroundColor: Colors.surfaceElevated,
    padding: Spacing.large,
    borderRadius: Radii.xl,
    ...Elevation.card,
    alignSelf: "stretch",
  },
});
