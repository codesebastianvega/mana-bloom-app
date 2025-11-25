// [MB] Modulo: Home / Seccion: Tienda Magica (Estilos)
// Afecta: HomeScreen
// Proposito: Estilos para seccion de tienda con tabs y badges vidriados
// Puntos de edicion futura: ajustar glass, sombras y responsivo
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Opacity } from "../../theme";

export default StyleSheet.create({
  section: {
    marginHorizontal: 0,
    paddingHorizontal: 0,
    paddingTop: Spacing.small,
    paddingBottom: Spacing.large,
    gap: Spacing.base,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: Spacing.large,
  },
  titleStack: {
    flex: 1,
    gap: Spacing.xxxs,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  tabsScroll: {
    marginTop: Spacing.tiny,
  },
  tabsRow: {
    flexDirection: "row",
    gap: Spacing.small,
    paddingRight: Spacing.base,
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    gap: Spacing.tiny,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  tabText: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "700",
    letterSpacing: 0.5,
    textTransform: "uppercase",
  },
  tabIcon: {
    marginRight: Spacing.tiny,
  },
  badgeGrid: {
    gap: Spacing.small,
  },
  cardList: {
    gap: Spacing.small,
    width: "100%",
    marginTop: Spacing.small,
  },
  previewCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    width: "100%",
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    backgroundColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  previewCardPressed: {
    opacity: 0.9,
  },
  previewImageWrapper: {
    width: 48,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  previewImage: {
    position: "absolute",
    top: -24,
    bottom: -12,
    left: -18,
    right: -18,
    width: "auto",
    height: "auto",
  },
  previewEmoji: {
    width: 48,
    height: 48,
    textAlign: "center",
    textAlignVertical: "center",
    fontSize: 24,
  },
  previewDetails: {
    flex: 1,
    gap: Spacing.xxxs,
    paddingLeft: Spacing.base,
  },
  badgeTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  badgePrice: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  badgeMeta: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  badgeEmoji: {
    fontSize: 20,
  },
  viewAllButton: {
    alignSelf: "stretch",
    width: "100%",
    marginTop: Spacing.small,
    borderRadius: Radii.md,
    overflow: "hidden",
    borderWidth: 1,
  },
  viewAllInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.tiny,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base * 1.25,
    borderRadius: Radii.md,
    width: "100%",
  },
  viewAllText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
    letterSpacing: 0.5,
  },
  debugButton: {
    alignSelf: "flex-start",
    marginTop: Spacing.small,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  debugButtonText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});
