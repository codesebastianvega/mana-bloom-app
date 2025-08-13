// [MB] Módulo: Home / Estilos: ShopItemCard (Tienda Mágica)
// Afecta: HomeScreen (layout principal)
// Propósito: Estilos para card de item de la tienda
// Puntos de edición futura: ajustar tipografía y sombras
// Autor: Codex - Fecha: 2025-08-12

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation, Typography } from "../../theme";

export default StyleSheet.create({
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...Elevation.card,
  },
  info: {
    flex: 1,
    marginRight: Spacing.small,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
  },
  description: {
    ...Typography.body,
    color: Colors.textMuted,
    marginTop: Spacing.small,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    height: 32,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii.pill,
  },
  pillText: {
    ...Typography.body,
    color: Colors.textInverse,
    marginLeft: Spacing.small,
  },
});
