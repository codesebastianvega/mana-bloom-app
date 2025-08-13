// [MB] Módulo: Noticias / Estilos: NewsDetailModal
// Afecta: NewsDetailModal
// Propósito: Estilos para overlay de detalle de noticia
// Puntos de edición futura: animaciones y tamaños responsivos
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Elevation } from "../../theme";

export default StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing.base,
  },
  content: {
    width: "100%",
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    gap: Spacing.small,
    ...Elevation.card,
  },
  icon: {
    alignSelf: "center",
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    textAlign: "center",
  },
  date: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: "center",
  },
  body: {
    ...Typography.body,
    color: Colors.text,
    marginTop: Spacing.small,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.large,
    gap: Spacing.base,
  },
  actionText: {
    ...Typography.body,
    color: Colors.accent,
  },
});
