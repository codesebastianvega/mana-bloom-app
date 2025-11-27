// [MB] Modulo: Profile / Seccion: ProfileScreen (estilos)
// Afecta: ProfileScreen
// Proposito: Estilos para layout visual de perfil
// Puntos de edicion futura: responsivo tablet y animaciones
// Autor: Codex - Fecha: 2025-10-21

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../theme";

const withAlpha = (hex = "", alpha = 1) => {
  if (!hex) return hex;
  const cleaned = `${hex}`.replace("#", "").trim();
  if (cleaned.length !== 6 && cleaned.length !== 8) {
    return hex;
  }
  const value = parseInt(cleaned.slice(0, 6), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: Spacing.base,
    gap: Spacing.large,
  },
  contentInner: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
    gap: Spacing.large,
  },
  stickyHeaderWrap: {
    marginHorizontal: -Spacing.base,
    paddingHorizontal: Spacing.base,
  },
  heroCard: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.25),
    backgroundColor: withAlpha(Colors.surface, 0.55),
    padding: Spacing.base + Spacing.small,
    gap: Spacing.large,
  },
  heroHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.base,
  },
  avatarGradient: {
    borderRadius: 40,
    padding: 2,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarGlyph: {
    fontSize: 32,
  },
  heroInfo: {
    flex: 1,
    gap: Spacing.tiny,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  heroName: {
    ...Typography.h1,
    fontSize: 28,
    color: Colors.text,
    flexShrink: 1,
  },
  rankRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  heroRank: {
    ...Typography.caption,
    fontSize: Typography.caption.fontSize + 1,
    color: withAlpha(Colors.secondaryLight || Colors.info, 0.9),
    letterSpacing: 0.3,
    fontWeight: "600",
  },
  heroSub: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  multiProgressCard: {
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.45),
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.2),
    padding: Spacing.base,
    gap: Spacing.large,
  },
  multiProgressRow: {
    gap: Spacing.tiny,
  },
  multiProgressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  multiProgressLabel: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  multiProgressHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  progressBar: {
    height: 8,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surface, 0.3),
    overflow: "hidden",
  },
  progressFillLevel: {
    height: "100%",
    borderRadius: Radii.pill,
    backgroundColor: Colors.secondary || Colors.primary,
  },
  progressFillPlant: {
    height: "100%",
    borderRadius: Radii.pill,
    backgroundColor: Colors.success,
  },
  progressFillPhase: {
    height: "100%",
    borderRadius: Radii.pill,
    backgroundColor: Colors.accent,
  },
  statsRow: {
    flexDirection: "row",
    gap: Spacing.small,
    flexWrap: "wrap",
  },
  statCard: {
    flexBasis: "30%",
    flexGrow: 1,
    minWidth: 110,
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.45),
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.2),
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    gap: Spacing.tiny,
  },
  statValue: {
    ...Typography.title,
    color: Colors.text,
  },
  statLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  sectionCard: {
    backgroundColor: withAlpha(Colors.surfaceAlt, 0.6),
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.18),
    padding: Spacing.base,
    gap: Spacing.small,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionLink: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
  },
  sectionLinkText: {
    ...Typography.caption,
    color: Colors.accent,
    fontWeight: "600",
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  sectionCounter: {
    ...Typography.caption,
    color: Colors.textMuted,
    backgroundColor: withAlpha(Colors.surface, 0.4),
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
  },
  achievementHighlight: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.35),
    borderRadius: Radii.lg,
    borderStyle: "dashed",
    borderWidth: 1,
    borderColor: withAlpha(Colors.secondaryLight, 0.5),
    padding: Spacing.small,
    gap: Spacing.small,
  },
  achievementBadge: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: withAlpha(Colors.secondary, 0.28),
    alignItems: "center",
    justifyContent: "center",
  },
  achievementText: {
    flex: 1,
  },
  achievementTitle: {
    ...Typography.body,
    fontWeight: "700",
    color: Colors.text,
  },
  achievementSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  achievementTag: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.accent, 0.2),
  },
  achievementTagText: {
    ...Typography.caption,
    color: Colors.accent,
    fontWeight: "600",
  },
  chipRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
  },
  chip: {
    flexGrow: 1,
    minWidth: 120,
    borderRadius: Radii.lg,
    borderWidth: 1,
    padding: Spacing.small,
    backgroundColor: withAlpha(Colors.surface, 0.35),
  },
  chipLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  chipValue: {
    ...Typography.title,
    fontSize: 22,
  },
  bannerGrid: {
    gap: Spacing.small,
  },
  bannerCard: {
    borderRadius: Radii.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.25),
  },
  bannerImage: {
    width: "100%",
    height: 140,
  },
  bannerOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.45)",
  },
  bannerContent: {
    flex: 1,
    justifyContent: "space-between",
    padding: Spacing.base,
  },
  bannerTitle: {
    ...Typography.title,
    color: Colors.text,
  },
  bannerSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  bannerCta: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: Spacing.small,
  },
  bannerCtaText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.small,
    gap: Spacing.small,
  },
  progressIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.4),
    alignItems: "center",
    justifyContent: "center",
  },
  progressText: {
    flex: 1,
    gap: Spacing.tiny / 2,
  },
  progressLabel: {
    ...Typography.body,
    color: Colors.text,
  },
  progressHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  progressValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.small,
    borderBottomWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.15),
    gap: Spacing.small,
  },
  actionIcon: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: withAlpha(Colors.surface, 0.4),
    alignItems: "center",
    justifyContent: "center",
  },
  actionLabel: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  levelCallout: {
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.45),
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: withAlpha(Colors.accent, 0.25),
    padding: Spacing.base,
    gap: Spacing.small,
  },
  levelCalloutHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  levelCalloutTitle: {
    ...Typography.body,
    fontWeight: "700",
    color: Colors.text,
  },
  levelCalloutMessage: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  levelCalloutBar: {
    height: 6,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surface, 0.3),
    overflow: "hidden",
  },
  levelCalloutFill: {
    height: "100%",
    borderRadius: Radii.pill,
    backgroundColor: Colors.accent,
  },
  diaryEmpty: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  diaryEntry: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.15),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.4),
    padding: Spacing.base,
    gap: Spacing.tiny,
    marginTop: Spacing.small,
  },
  diaryTag: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.ritualJournal, 0.25),
  },
  diaryTagVision: {
    backgroundColor: withAlpha(Colors.ritualFocus, 0.25),
  },
  diaryTagText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  diaryTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  diaryBody: {
    ...Typography.body,
    color: Colors.text,
  },
  diaryDate: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
  },
});





