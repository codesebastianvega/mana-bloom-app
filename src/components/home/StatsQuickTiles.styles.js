// [MB] Módulo: Home / Estilos: StatsQuickTiles
// Afecta: HomeScreen
// Propósito: Estilos para racha, nivel y maná en mosaicos
// Puntos de edición futura: ajustar layout o añadir animaciones
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
  tiles: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.base,
  },
  tile: {
    flex: 1,
    backgroundColor: Colors.surfaceElevated,
    padding: Spacing.small,
    borderRadius: Radii.sm,
    marginHorizontal: Spacing.tiny,
    alignItems: "center",
    justifyContent: "center",
  },
  tileSmall: {
    flex: 0,
    width: Spacing.xlarge * 2,
    marginHorizontal: 0,
    marginLeft: Spacing.tiny,
  },
  tileValue: {
    ...Typography.h2,
    color: Colors.text,
  },
  tileLabel: {
    ...Typography.caption,
    color: Colors.text,
  },
});
