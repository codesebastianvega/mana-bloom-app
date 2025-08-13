// [MB] Módulo: Home / Sección: Tienda Mágica (Estilos)
// Afecta: HomeScreen
// Propósito: Estilos para sección de tienda mágica con tabs y cards
// Puntos de edición futura: diferenciar categorías y tarjetas, retirar debug
// Autor: Codex - Fecha: 2025-08-12

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation, Typography } from "../../theme";

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
  subtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
  },
  manaRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Spacing.small,
    paddingVertical: Spacing.small,
    marginBottom: Spacing.tiny,
  },
  manaLabel: {
    ...Typography.caption,
    color: Colors.text,
  },
  manaPill: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.base,
    height: 28,
  },
  manaIcon: {
    marginRight: Spacing.small,
  },
  manaValue: {
    ...Typography.body,
    color: Colors.text,
  },
  tabsRow: {
    flexDirection: "row",
  },
  tabButton: {
    flex: 1,
    height: 40,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.small,
  },
  tabText: {
    // Texto de la pestaña
    ...Typography.body,
    color: Colors.text,
    fontSize: 12,
  },
  itemWrapper: {
    marginTop: Spacing.base,
  },
  viewAllButton: {
    marginTop: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.md,
    paddingVertical: Spacing.small,
    alignItems: "center",
  },
  viewAllText: {
    ...Typography.body,
    color: Colors.text,
  },
  debugButton: {
    alignSelf: "flex-end",
    marginBottom: Spacing.small,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  debugButtonText: {
    ...Typography.caption,
    color: Colors.text,
  },
});
