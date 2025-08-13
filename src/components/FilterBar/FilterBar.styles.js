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
    minHeight: 40,
    borderWidth: 1,
    borderColor: Colors.separator,
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
    height: 36,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.separator,
    backgroundColor: Colors.surfaceElevated,
    marginRight: Spacing.small,
  },
  tabActive: {
    backgroundColor: Colors.accent,
    borderColor: Colors.accent,
  },
  icon: {
    marginRight: Spacing.small,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.background,
    textAlign: "center",
  },
  tabLabelInactive: {
    color: Colors.textMuted,
  },
});
