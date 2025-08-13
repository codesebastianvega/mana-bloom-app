// [MB] Módulo: Tasks / Sección: Barra de búsqueda
// Afecta: SearchBar
// Propósito: Estilo alineado al tema
// Puntos de edición futura: focos y estados deshabilitados
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii.lg,
    marginVertical: Spacing.small,
    justifyContent: "space-between",
    minHeight: 48,
    borderWidth: 1,
    borderColor: Colors.separator,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: Spacing.small,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
    padding: 0,
  },
  button: {
    // Botón para filtros avanzados
    marginLeft: Spacing.small,
    opacity: 0.9,
  },
});
