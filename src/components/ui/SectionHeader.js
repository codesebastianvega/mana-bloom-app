// [MB] Módulo: UI / Sección: Wrappers
// Afecta: PlantScreen (encabezados de sección)
// Propósito: título y caption opcional para secciones
// Puntos de edición futura: variantes de tipografía
// Autor: Codex - Fecha: 2025-08-16

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Typography, Colors, Spacing, Opacity } from "../../theme";

export default function SectionHeader({ title, caption }) {
  return (
    <View accessibilityRole="header" style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {caption ? <Text style={styles.caption}>{caption}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.base,
    gap: Spacing.tiny,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "600",
  },
  caption: {
    ...Typography.caption,
    color: Colors.text,
    opacity: Opacity.muted,
  },
});
