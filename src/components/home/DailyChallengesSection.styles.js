// [MB] Módulo: Home / Estilos: DailyChallengesSection
// Afecta: HomeScreen
// Propósito: Estilos placeholder para la sección de desafíos diarios
// Puntos de edición futura: manejar lista dinámica y estados
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
