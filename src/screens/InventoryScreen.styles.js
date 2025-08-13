// [MB] Módulo: Inventario / Pantalla: InventoryScreen (Estilos)
// Afecta: pantalla modal de inventario
// Propósito: Estilos para la lista completa de inventario
// Puntos de edición futura: colores por categoría y layout responsivo
// Autor: Codex - Fecha: 2025-08-18

import { StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Typography,
  Elevation,
} from "../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  resultText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
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
  tabsRow: {
    flexDirection: "row",
    marginTop: Spacing.base,
  },
  tabButton: {
    flex: 1,
    paddingVertical: Spacing.small,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.md,
    alignItems: "center",
    marginRight: Spacing.small,
  },
  tabButtonActive: {
    backgroundColor: Colors.primary,
  },
  tabButtonText: {
    ...Typography.body,
    color: Colors.text,
  },
  tabButtonTextActive: {
    color: Colors.textInverse,
  },
  searchInput: {
    marginTop: Spacing.base,
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    color: Colors.text,
  },
  itemRow: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    marginBottom: Spacing.small,
    ...Elevation.card,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.small,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    ...Typography.body,
    color: Colors.text,
  },
  itemSku: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  itemQty: {
    ...Typography.body,
    color: Colors.text,
    marginLeft: Spacing.small,
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  useButton: {
    backgroundColor: Colors.buttonBg,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.sm,
    marginRight: Spacing.small,
  },
  useButtonText: {
    ...Typography.caption,
    color: Colors.textInverse,
  },
  discardButton: {
    backgroundColor: Colors.danger,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.sm,
  },
  discardButtonText: {
    ...Typography.caption,
    color: Colors.textInverse,
  },
});

