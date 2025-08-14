// [MB] FiltersHeader.styles — bloque de filtros sticky
// [MB] Módulo: Tasks / Sección: Encabezado de filtros
// Afecta: FiltersHeader
// Propósito: Espaciado y fondo del bloque sticky
// Puntos de edición futura: elevación y animaciones
// Autor: Codex - Fecha: 2025-08-14

import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    paddingVertical: Spacing.small,
    gap: Spacing.small,
  },
});
