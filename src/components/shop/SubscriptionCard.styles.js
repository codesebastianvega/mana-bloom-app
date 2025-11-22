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
    borderRadius: Radii.xl,
    padding: Spacing.base * 1.1,
    borderWidth: 1,
    borderColor: ShopColors.subs.border,
    ...Elevation.card,
    gap: Spacing.small,
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
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.textInverse,
    fontWeight: "700",
  },
  price: {
    ...Typography.h2,
    color: Colors.text,
  },
  desc: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  perksList: {
    gap: Spacing.tiny,
    marginBottom: Spacing.small,
  },
  perkRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  perkDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    opacity: 0.9,
  },
  perkText: {
    ...Typography.caption,
    color: Colors.text,
    flex: 1,
  },
  cta: {
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
