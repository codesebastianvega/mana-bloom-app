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
  },
  modalSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
    marginBottom: Spacing.small,
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
  walletSummary: {
    flexDirection: "row",
    flexWrap: "wrap",
    columnGap: Spacing.small,
    rowGap: Spacing.small,
    justifyContent: "space-between",
  },
  walletStat: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: "30%",
    minWidth: 96,
    borderRadius: Radii.pill,
    borderWidth: 1,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.small,
    backgroundColor: Colors.surfaceAlt,
  },
  walletStatTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  walletStatSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  walletStatValue: {
    ...Typography.title,
    color: Colors.text,
    marginLeft: 0,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  walletIconPill: {
    borderRadius: Radii.pill,
    borderWidth: 1,
    paddingVertical: Spacing.tiny / 2,
    paddingHorizontal: Spacing.tiny,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  tabsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    columnGap: Spacing.small,
    rowGap: Spacing.small,
  },
  tabButton: {
    width: "48%",
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.tiny,
    backgroundColor: Colors.surfaceAlt,
  },
  tabIcon: {
    marginRight: Spacing.tiny,
  },
  tabText: {
    ...Typography.body,
    color: Colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
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
  subsList: {
    flexDirection: "column",
    gap: Spacing.small,
  },
  cardStack: {
    flexDirection: "column",
    gap: Spacing.small,
  },
  cardStackItem: {
    width: "100%",
  },
  footerNote: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.base,
  },
});
