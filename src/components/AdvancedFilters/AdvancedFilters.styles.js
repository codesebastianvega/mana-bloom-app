// [MB] Módulo: Tasks / Sección: Filtros avanzados
// Afecta: TaskFilters (modal de filtros)
// Propósito: Tokens y estilos alineados al tema
// Puntos de edición futura: tipografías y variantes de elevación
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation, Typography } from "../../theme";

// Un solo estilo base para todos los botones.
// Esto evita la repetición de código.
const baseBtn = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: Spacing.tiny,
  paddingHorizontal: Spacing.base,
  minHeight: 36,
  borderRadius: Radii.pill,
  borderWidth: 1,
  borderColor: Colors.border,
  marginRight: Spacing.small,
  backgroundColor: "transparent",
};

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceElevated || Colors.surface,
    borderRadius: Radii.xl,
    padding: Spacing.large,
    ...(Elevation?.modal || {}),
  },
  row: {
    flexDirection: "row",
    marginBottom: Spacing.base,
  },
  elementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: Spacing.base,
  },
  elementGridBtn: {
    ...baseBtn,
    width: "48%",
    justifyContent: "center",
    marginRight: 0,
    marginBottom: Spacing.small,
  },
  priorityBtn: {
    ...baseBtn,
    justifyContent: "center",
  },
  difficultyBtn: {
    ...baseBtn,
    justifyContent: "center",
  },
  tagBtn: {
    ...baseBtn,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    marginRight: Spacing.tiny,
  },
  // Texto dentro de cada etiqueta del filtro
  tagText: {
    ...Typography.body,
    color: Colors.text,
  },
  // Contenedor del campo de búsqueda de etiquetas
  tagSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.background,
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
    marginBottom: Spacing.base,
  },
  tagSearchContainerFocused: {
    borderColor: Colors.accent,
    borderWidth: 1,
  },
  // Campo de texto para buscar etiquetas
  tagSearchInput: {
    flex: 1,
    color: Colors.text,
    ...Typography.body,
    paddingVertical: 0,
  },
  // Botón que limpia el texto del buscador
  clearBtn: {
    marginLeft: Spacing.small,
  },
  sectionTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
    marginTop: Spacing.small,
    marginBottom: Spacing.tiny,
  },
  text: {
    ...Typography.body,
    color: Colors.text,
    marginLeft: Spacing.small,
  },
  centerText: {
    marginLeft: 0,
    textAlign: "center",
    flex: 1,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
});
