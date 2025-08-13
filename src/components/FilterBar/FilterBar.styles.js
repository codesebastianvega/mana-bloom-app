// [MB] Módulo: Tasks / Sección: Barra de filtros
// Afecta: FilterBar (tabs principales)
// Propósito: Estilos de tabs y contenedor
// Puntos de edición futura: scroll y variantes
// Autor: Codex - Fecha: 2025-08-13
import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii } from "../../theme";

export default StyleSheet.create({
  // wrapper externo para margen
  wrapper: {
    marginVertical: Spacing.small,
  },

  // barra contenedora
  glassBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.base,
    minHeight: 44,
    borderWidth: 1,
    borderColor: Colors.textMuted + "40",
  },

  // Scroll horizontal
  container: {
    flexGrow: 0,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // tab individual
  tab: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.base,
    minHeight: 36,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    backgroundColor: Colors.surface,
    marginRight: Spacing.small,
  },
  tabActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surfaceElevated || Colors.surface,
  },
  icon: {
    marginRight: 6,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },
  tabLabelMuted: {
    color: Colors.textMuted,
    fontWeight: "500",
  },
});
