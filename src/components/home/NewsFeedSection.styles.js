// [MB] Módulo: Home / Estilos: NewsFeedSection
// Afecta: HomeScreen
// Propósito: Estilos para feed de noticias con marcas de leído
// Puntos de edición futura: ajustar layout y variantes de ítems
// Autor: Codex - Fecha: 2025-08-12

import { StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Elevation,
  Typography,
} from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: Radii.lg,
    marginBottom: Spacing.large,
    ...Elevation.card,
    gap: Spacing.small,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  markAll: {
    ...Typography.caption,
    color: Colors.accent,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    paddingVertical: Spacing.small,
  },
  rowText: { flex: 1 },
  rowTitle: {
    ...Typography.body,
    color: Colors.text,
  },
  time: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: Radii.pill,
    backgroundColor: Colors.accent,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.base,
  },
});
