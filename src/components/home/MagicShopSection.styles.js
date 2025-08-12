// [MB] Módulo: Home / Estilos: MagicShopSection
// Afecta: HomeScreen
// Propósito: Estilos placeholder para sección de tienda
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
});
