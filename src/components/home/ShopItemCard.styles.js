// [MB] Modulo: Home / Estilos: ShopItemCard (Tienda Magica)
// Afecta: HomeScreen (layout principal)
// Proposito: Estilos para card de item de la tienda
// Puntos de edicion futura: ajustar tipografia y sombras
// Autor: Codex - Fecha: 2025-08-12

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default StyleSheet.create({
  card: {
    borderWidth: 1,
    borderRadius: Radii.xl,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    gap: Spacing.small,
    backgroundColor: "rgba(255,255,255,0.18)",
    borderColor: "rgba(255,255,255,0.28)",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  emojiBubble: {
    width: 32,
    height: 32,
    borderRadius: Radii.lg,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.overlay,
  },
  emojiText: {
    fontSize: 18,
  },
  headerContent: {
    flex: 1,
    gap: Spacing.tiny / 2,
  },
  title: {
    ...Typography.title,
    fontSize: 17,
    color: Colors.text,
  },
  headline: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  pricePill: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny / 2,
    borderRadius: Radii.pill,
    borderWidth: 1,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
  },
  priceText: {
    ...Typography.caption,
    color: Colors.onAccent,
    fontWeight: "700",
  },
  highlights: {
    gap: Spacing.tiny,
  },
  highlightRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  highlightIcon: {
    marginTop: 1,
  },
  highlightText: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  ctaRow: {
    marginTop: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  ctaLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  ctaValueWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  ctaIcon: {
    marginRight: 2,
  },
  ctaValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
});
