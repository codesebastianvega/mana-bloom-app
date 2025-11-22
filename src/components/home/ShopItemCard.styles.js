// [MB] Modulo: Home / Estilos: ShopItemCard (Tienda Magica)
// Afecta: ShopScreen (grid productos)
// Propósito: Estilos para cards con imagen hero, rareza y CTA
// Puntos de edición futura: soporte para estados de stock y wishlist
// Autor: Codex - Fecha: 2025-11-21

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radii.xl,
    padding: Spacing.small,
    backgroundColor: Colors.surfaceAlt,
    gap: Spacing.small,
  },
  media: {
    height: 150,
    borderRadius: Radii.lg,
    backgroundColor: Colors.surface,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  mediaImage: {
    width: "100%",
    height: "100%",
  },
  mediaEmoji: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  mediaEmojiText: {
    fontSize: 64,
  },
  rarityBadge: {
    position: "absolute",
    top: Spacing.tiny,
    right: Spacing.tiny,
    borderRadius: Radii.pill,
    borderWidth: 1,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny / 1.5,
  },
  rarityText: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.text,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  body: {
    gap: Spacing.tiny,
  },
  title: {
    ...Typography.title,
    fontSize: 16,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  costRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.tiny,
    marginTop: Spacing.tiny,
  },
  pricePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny / 2,
    borderRadius: Radii.pill,
    borderWidth: 1,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny / 1.5,
  },
  priceAmount: {
    ...Typography.caption,
    fontWeight: "700",
  },
  highlights: {
    gap: Spacing.tiny,
    marginTop: Spacing.small / 2,
  },
  highlightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  highlightText: {
    ...Typography.caption,
    color: Colors.text,
    flex: 1,
  },
  ctaRow: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small * 0.75,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  ctaLabel: {
    ...Typography.body,
    fontWeight: "700",
  },
  helperText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
  },
});
