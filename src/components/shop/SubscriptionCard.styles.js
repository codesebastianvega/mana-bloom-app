// [MB] Módulo: Shop / Estilos: SubscriptionCard
// Afecta: ShopScreen
// Propósito: Estilos para tarjetas de suscripción
// Puntos de edición futura: agregar variantes y animaciones
// Autor: Codex - Fecha: 2025-08-24

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Elevation } from "../../theme";
import { ShopColors } from "../../constants/shopCatalog";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    marginBottom: Spacing.base,
    width: "100%",
  },
  card: {
    borderRadius: Radii.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: ShopColors.subs.border,
    ...Elevation.card,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...Typography.title,
    color: Colors.text,
    textTransform: "capitalize",
  },
  badge: {
    backgroundColor: ShopColors.subs.pill,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.textInverse,
  },
  price: {
    ...Typography.h2,
    color: Colors.text,
    marginTop: Spacing.small,
  },
  desc: {
    ...Typography.body,
    color: Colors.textMuted,
    marginTop: Spacing.small,
    marginBottom: Spacing.base,
  },
  cta: {
    backgroundColor: ShopColors.subs.pill,
    borderRadius: Radii.pill,
    paddingVertical: Spacing.small,
    alignItems: "center",
    ...Elevation.raised,
  },
  ctaText: {
    ...Typography.body,
    color: Colors.textInverse,
    fontWeight: "700",
  },
});
