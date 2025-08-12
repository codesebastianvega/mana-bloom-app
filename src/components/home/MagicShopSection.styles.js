// [MB] Módulo: Home / Estilos: MagicShopSection
// Afecta: HomeScreen
// Propósito: Estilos para sección de tienda mágica con tabs y cards
// Puntos de edición futura: diferenciar categorías y tarjetas
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
    borderRadius: Radii.md,
    marginBottom: Spacing.large,
    ...Elevation.card,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  tabsRow: {
    flexDirection: "row",
    marginTop: Spacing.base,
  },
  tabButton: {
    flex: 1,
    height: 40,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.small,
  },
  tabText: {
    ...Typography.body,
    color: Colors.text,
  },
  itemWrapper: {
    marginTop: Spacing.base,
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
});
