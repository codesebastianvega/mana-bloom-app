// [MB] Módulo: Home / Sección: Inventario (Estilos)
// Afecta: HomeScreen
// Propósito: Estilos para resumen de inventario
// Puntos de edición futura: colores por categoría y lista completa
// Autor: Codex - Fecha: 2025-08-12

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Elevation } from "../../theme";

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
  chipsRow: {
    flexDirection: "row",
    marginTop: Spacing.small,
  },
  chip: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.base,
    height: 28,
    justifyContent: "center",
    marginRight: Spacing.small,
  },
  chipText: {
    ...Typography.caption,
    color: Colors.text,
  },
  list: {
    marginTop: Spacing.base,
  },
  itemRow: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    marginBottom: Spacing.small,
    flexDirection: "row",
    alignItems: "center",
    ...Elevation.card,
  },
  itemIcon: {
    marginRight: Spacing.small,
    fontSize: 18,
  },
  itemTitle: {
    flex: 1,
    ...Typography.body,
    color: Colors.text,
  },
  itemQty: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  viewAllButton: {
    marginTop: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.md,
    paddingVertical: Spacing.small,
    alignItems: "center",
  },
  viewAllText: {
    ...Typography.body,
    color: Colors.text,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.base,
  },
});
