// [MB] Modulo: Home / Seccion: Tienda Magica (Estilos)
// Afecta: HomeScreen
// Proposito: Estilos para seccion de tienda con tabs y badges vidriados
// Puntos de edicion futura: ajustar glass, sombras y responsivo
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Opacity } from "../../theme";

const BADGE_GLASS_ALPHA = Math.min(0.24, Opacity.overlay * 4);
const BADGE_BORDER_ALPHA = Math.min(0.32, BADGE_GLASS_ALPHA + 0.08);
const BADGE_BACKGROUND = `rgba(255,255,255,${BADGE_GLASS_ALPHA})`;
const BADGE_BORDER = `rgba(255,255,255,${BADGE_BORDER_ALPHA})`;

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    gap: Spacing.base,
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
  walletCard: {
    backgroundColor: Colors.surfaceAlt,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    flexDirection: "row",
    gap: Spacing.small,
  },
  walletStat: {
    flex: 1,
    gap: Spacing.tiny / 2,
  },
  walletHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  walletTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  walletSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  walletValue: {
    ...Typography.title,
    color: Colors.text,
  },
  tabsRow: {
    flexDirection: "row",
    gap: Spacing.small,
  },
  tabButton: {
    flex: 1,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.tiny,
  },
  tabText: {
    ...Typography.body,
    color: Colors.text,
    fontSize: 12,
    fontWeight: "600",
  },
  tabIcon: {
    marginRight: Spacing.tiny,
  },
  badgeGrid: {
    gap: Spacing.small,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: BADGE_BORDER,
    backgroundColor: BADGE_BACKGROUND,
    gap: Spacing.small,
  },
  badgePressed: {
    opacity: 0.9,
  },
  badgeLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    flexShrink: 1,
  },
  badgeIcon: {
    width: 32,
    height: 32,
    borderRadius: Radii.md,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: BADGE_BORDER,
    backgroundColor: BADGE_BACKGROUND,
  },
  badgeEmoji: {
    fontSize: 18,
    lineHeight: 20,
  },
  badgeTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
    flexShrink: 1,
  },
  badgeRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  badgePrice: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  badgePriceValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  viewAllButton: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.small,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  viewAllText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  debugButton: {
    alignSelf: "flex-end",
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
