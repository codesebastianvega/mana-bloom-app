// [MB] Modulo: Home / Estilos: EventHighlightsSection
// Afecta: HomeScreen
// Proposito: Estilos para calendario de eventos y promo de tienda
// Puntos de edicion futura: integrar fondos ilustrados y variantes por temporada
// Autor: Codex - Fecha: 2025-10-15

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default StyleSheet.create({
  gradient: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(120, 170, 255, 0.35)",
    marginHorizontal: Spacing.base,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
    overflow: "hidden",
  },
  container: {
    borderRadius: Radii.lg,
    gap: Spacing.base,
    padding: 0,
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
  },
  titleIconRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  title: {
    ...Typography.sectionTitle,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  timeline: {
    gap: Spacing.small,
    paddingVertical: Spacing.tiny,
  },
  timelineRow: {
    flexDirection: "row",
    gap: Spacing.small,
    alignItems: "flex-start",
  },
  dotColumn: {
    width: 14,
    alignItems: "center",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  connector: {
    flex: 1,
    width: 2,
    marginTop: Spacing.tiny,
    borderRadius: 4,
  },
  timelineText: {
    flex: 1,
    gap: 2,
  },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.small,
  },
  timelineTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  timelineDate: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  badge: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    borderWidth: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  badgeText: {
    ...Typography.caption,
    fontWeight: "700",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(255,255,255,0.08)",
    marginTop: Spacing.small,
  },
  viewAllButton: {
    marginTop: Spacing.small,
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    paddingVertical: Spacing.tiny + 2,
    paddingHorizontal: Spacing.base,
  },
  viewAllText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  pressed: {
    opacity: 0.85,
  },
});
