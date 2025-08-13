// [MB] Módulo: Noticias / Estilos: NewsInboxScreen
// Afecta: NewsInboxModal
// Propósito: Estilos para bandeja de noticias con filtros y detalle
// Puntos de edición futura: variaciones de layout y colores
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Elevation } from "../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerWrapper: {
    marginBottom: Spacing.small,
    gap: Spacing.small,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
  },
  markAll: {
    ...Typography.caption,
    color: Colors.accent,
  },
  filterRow: {
    flexDirection: "row",
    gap: Spacing.base,
  },
  filter: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  filterActive: {
    ...Typography.body,
    color: Colors.text,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: Radii.lg,
    marginBottom: Spacing.small,
    ...Elevation.card,
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
});
