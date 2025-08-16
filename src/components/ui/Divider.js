// [MB] Módulo: UI / Sección: Wrappers
// Afecta: PlantScreen (divisiones)
// Propósito: separar contenido con una línea sutil
// Puntos de edición futura: grosor y orientación
// Autor: Codex - Fecha: 2025-08-16

import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors, Opacity, Spacing } from "../../theme";

export default function Divider({ style }) {
  return <View style={[styles.divider, style]} />;
}

const styles = StyleSheet.create({
  divider: {
    height: Spacing.tiny / 2,
    backgroundColor: Colors.text,
    opacity: Opacity.muted,
    alignSelf: "stretch",
  },
});
