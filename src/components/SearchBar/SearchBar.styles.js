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
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii.lg,
    marginTop: Spacing.small,
    marginBottom: Spacing.small,
    justifyContent: "space-between",
    minHeight: 44,
    borderWidth: 1,
    borderColor: Colors.textMuted + "40",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
    padding: 0,
  },
  button: {
    // Botón para filtros avanzados
    marginLeft: Spacing.base,
    opacity: 0.9,
  },
});
