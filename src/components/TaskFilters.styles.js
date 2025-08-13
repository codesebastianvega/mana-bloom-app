// [MB] Módulo: Tasks / Sección: Filtros avanzados
// Afecta: TaskFilters (modal de filtros)
// Propósito: Botones y layout alineados al tema
// Puntos de edición futura: variantes deshabilitadas
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation } from "../theme";

export default StyleSheet.create({
  closeBtn: {
    alignSelf: "flex-end",
    padding: Spacing.tiny,
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: Spacing.small,
  },
  actions: {
    flexDirection: "row",
    gap: Spacing.small,
    marginTop: Spacing.large,
  },
  primaryButton: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: Spacing.large,
    borderRadius: Radii.pill,
    backgroundColor: Colors.primary,
    alignItems: "center",
    justifyContent: "center",
    ...(Elevation?.card || {}),
  },
  primaryButtonLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: Spacing.large,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
});
