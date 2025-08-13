// [MB] Módulo: Shop / Estilos: ShopGridItem
// Afecta: ShopScreen
// Propósito: Estilos para card de producto en grid
// Puntos de edición futura: ajustar sombras y responsive
// Autor: Codex - Fecha: 2025-08-24

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Elevation } from "../../theme";

export default StyleSheet.create({
  card: {
    flex: 1,
    justifyContent: "space-between",
    minHeight: Spacing.xlarge * 5,
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    ...Elevation.card,
  },
  emoji: {
    fontSize: 48,
    marginBottom: Spacing.small,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
  },
  desc: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
    marginBottom: Spacing.small,
  },
  pricePill: {
    alignSelf: "flex-end",
    minWidth: Spacing.xlarge * 2,
    alignItems: "center",
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
  },
  priceText: {
    ...Typography.body,
    color: Colors.textInverse,
  },
});
