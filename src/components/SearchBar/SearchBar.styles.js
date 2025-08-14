// [MB] SearchBar.styles — ajusta buscador full-width
// [MB] Módulo: Tasks / Sección: Barra de búsqueda
// Afecta: SearchBar
// Propósito: Estilo alineado al tema
// Puntos de edición futura: focos y estados deshabilitados
// Autor: Codex - Fecha: 2025-08-14

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: Spacing.small,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.base - Spacing.tiny,
    paddingVertical: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.separator,
    minHeight: Spacing.large + Spacing.base + Spacing.tiny,
    gap: Spacing.small,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
    padding: 0,
  },
  filterButton: {
    width: Spacing.base * 2,
    height: Spacing.base * 2,
    borderRadius: Radii.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.separator,
  },
});
