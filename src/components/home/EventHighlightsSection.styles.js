// [MB] Modulo: Home / Estilos: EventHighlightsSection
// Afecta: HomeScreen
// Proposito: Estilos para calendario de eventos y promo de tienda
// Puntos de edicion futura: integrar fondos ilustrados y variantes por temporada
// Autor: Codex - Fecha: 2025-10-15

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: Radii.xl,
    padding: Spacing.base,
    gap: Spacing.base,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleBlock: {
    gap: Spacing.tiny / 2,
    flex: 1,
    paddingRight: Spacing.small,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  viewAllButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceAlt,
  },
  viewAllText: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  timeline: {
    gap: Spacing.small,
  },
  timelineItem: {
    flexDirection: "row",
    gap: Spacing.small,
    alignItems: "flex-start",
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceAlt,
    padding: Spacing.small,
  },
  timelineIcon: {
    width: 40,
    height: 40,
    borderRadius: Radii.lg,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
  timelineEmoji: {
    fontSize: 20,
  },
  timelineText: {
    flex: 1,
    gap: Spacing.tiny / 2,
  },
  timelineTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  timelineDate: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  timelineDescription: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  promoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceAlt,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small,
  },
  promoIcon: {
    width: 40,
    height: 40,
    borderRadius: Radii.lg,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
  promoText: {
    flex: 1,
    gap: Spacing.tiny / 2,
  },
  promoTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  promoDescription: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  pressed: {
    opacity: 0.85,
  },
});
