// [MB] Module: Shop / Styles: ShopScreen (Modal)
// Affects: full shop modal layout
// Purpose: Styling for fullscreen shop experience
// Future edits: responsive columns, tablet layout tweaks
// Author: Codex - Date: 2025-10-07

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
  },
  modalTitle: {
    ...Typography.h2,
    color: Colors.text,
    fontSize: 26,
    lineHeight: 32,
  },
  modalSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.small * 0.75,
    marginBottom: Spacing.tiny,
  },
  closeButton: {
    padding: Spacing.small,
    borderRadius: Radii.lg,
    backgroundColor: Colors.surfaceAlt,
  },
  closeButtonPressed: {
    opacity: 0.8,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: Spacing.large * 2,
    gap: Spacing.base,
  },
  headerLeft: {
    flex: 1,
    gap: Spacing.small * 0.75,
  },
  headerTagRow: {
    marginTop: Spacing.small * 0.5,
    flexDirection: "row",
    alignItems: "center",
  },
  headerCategoryTag: {
    ...Typography.caption,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny / 2,
    fontWeight: "700",
    letterSpacing: 0.4,
    textTransform: "uppercase",
    borderWidth: 1,
  },
  walletChipsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    flexWrap: "nowrap",
    overflow: "hidden",
    marginTop: Spacing.tiny,
    marginBottom: Spacing.small * 0.4,
    paddingBottom: Spacing.tiny / 2,
  },
  walletChip: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radii.pill,
    borderWidth: 1,
    paddingHorizontal: Spacing.small * 0.7,
    paddingVertical: Spacing.tiny / 2,
    gap: Spacing.tiny,
    flexShrink: 0,
  },
  walletChipIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surfaceAlt,
  },
  walletChipText: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: Spacing.tiny / 2,
    paddingHorizontal: Spacing.tiny,
  },
  walletChipValue: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  tabSlider: {
    marginHorizontal: -Spacing.base,
  },
  tabSliderContent: {
    paddingHorizontal: Spacing.base,
    gap: Spacing.small,
  },
  tabChipPressable: {
    borderRadius: Radii.xl,
    marginRight: Spacing.small,
  },
  tabChip: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    paddingVertical: Spacing.small * 0.9,
    paddingHorizontal: Spacing.base,
  },
  tabChipActive: {
    borderColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 12,
    elevation: 5,
  },
  tabChipInactive: {
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceAlt,
  },
  tabChipContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    minWidth: 170,
  },
  tabChipIconWrap: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  tabChipTextStack: {
    flex: 1,
    gap: 2,
  },
  tabText: {
    ...Typography.body,
    fontWeight: "700",
    letterSpacing: 0.2,
  },
  tabCaption: {
    ...Typography.caption,
    fontSize: 11,
  },
  tabChipBadge: {
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.text,
    paddingHorizontal: Spacing.small * 0.7,
    paddingVertical: Spacing.tiny / 2,
    backgroundColor: Colors.overlay,
  },
  tabChipBadgeText: {
    ...Typography.caption,
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    color: Colors.text,
  },
  tabChipPressed: {
    opacity: 0.9,
  },
  debugButton: {
    alignSelf: "flex-end",
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.base,
  },
  debugButtonText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  subsCTAWrapper: {
    borderRadius: Radii.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: Colors.border,
  },
  subsCTAWrapperActive: {
    borderColor: Colors.accent,
  },
  subsCTAWrapperPressed: {
    opacity: 0.92,
  },
  subsCTA: {
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii.xl,
  },
  subsCTAContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  subsCTAHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    flex: 1,
  },
  subsCTAIconPill: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.5)",
  },
  subsCTATextStack: {
    flex: 1,
  },
  subsCTATitle: {
    ...Typography.body,
    fontSize: 16,
    color: Colors.text,
    fontWeight: "700",
  },
  subsCTASubtitle: {
    ...Typography.caption,
    color: Colors.text,
    opacity: 0.85,
  },
  subsCTAButton: {
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.8)",
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.base,
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  subsCTAButtonText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  subsList: {
    flexDirection: "column",
    gap: Spacing.small,
  },
  cardStack: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    rowGap: Spacing.base,
    columnGap: Spacing.small,
  },
  cardStackItem: {
    width: "48%",
  },
  footerNote: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.base,
  },
});
