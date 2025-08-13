// [MB] Módulo: Shop / Estilos: ShopScreen
// Afecta: Tienda completa
// Propósito: Estilos para pantalla dedicada de la tienda
// Puntos de edición futura: optimizar disposición y theming
// Autor: Codex - Fecha: 2025-08-24

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    padding: Spacing.base,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.surface,
  },
  closeButton: {
    position: "absolute",
    top: Spacing.base,
    right: Spacing.base,
    padding: Spacing.small,
    borderRadius: Radii.md,
  },
  headerTitle: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.small,
  },
  walletRow: {
    flexDirection: "row",
    alignItems: "center",
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
  currencyPill: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    height: 24,
    marginLeft: Spacing.small,
  },
  currencyIcon: {
    marginRight: Spacing.tiny,
  },
  currencyValue: {
    ...Typography.caption,
    color: Colors.text,
  },
  tabsRow: {
    flexDirection: "row",
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
  },
  tabButton: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.lg,
    justifyContent: "center",
    alignItems: "center",
    marginRight: Spacing.small,
  },
  tabText: {
    ...Typography.body,
    color: Colors.text,
    fontSize: 12,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.base,
  },
  footer: {
    padding: Spacing.base,
    alignItems: "center",
  },
  footerText: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: "center",
    marginBottom: Spacing.small,
  },
  supportButton: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Radii.md,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
  },
  supportButtonText: {
    ...Typography.body,
    color: Colors.text,
  },
});
