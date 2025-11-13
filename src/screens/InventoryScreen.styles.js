import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Opacity } from "../theme";

const SHEET_BG = "rgba(20, 14, 35, 0.92)";
const SHEET_BORDER = "rgba(255,255,255,0.12)";
const CARD_BG = "rgba(28, 20, 45, 0.78)";

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(6, 4, 14, 0.75)",
  },
  backdropDismiss: {
    ...StyleSheet.absoluteFillObject,
  },
  sheet: {
    flex: 1,
    margin: Spacing.base,
    marginTop: Spacing.large,
    backgroundColor: SHEET_BG,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: SHEET_BORDER,
    padding: Spacing.base,
    gap: Spacing.base,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.28,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  titleBlock: {
    flex: 1,
    gap: Spacing.tiny,
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
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: SHEET_BORDER,
    backgroundColor: "rgba(20, 14, 35, 0.6)",
    alignItems: "center",
    justifyContent: "center",
  },
  chipsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.tiny,
  },
  chip: {
    borderRadius: Radii.pill,
    borderWidth: 1,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
  },
  chipText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  tabsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.small,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  tabButtonText: {
    ...Typography.body,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  searchInput: {
    marginTop: Spacing.small,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    backgroundColor: "rgba(20, 14, 35, 0.6)",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    color: Colors.text,
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingBottom: Spacing.xlarge,
    gap: Spacing.small,
  },
  emptyState: {
    alignItems: "center",
    paddingVertical: Spacing.large,
    gap: Spacing.tiny,
  },
  emptyText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  itemRow: {
    padding: Spacing.base,
    borderRadius: Radii.lg,
    borderWidth: 1,
    backgroundColor: CARD_BG,
    gap: Spacing.small,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  itemMain: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    flex: 1,
  },
  itemIconBubble: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  itemIcon: {
    fontSize: 20,
  },
  itemInfo: {
    flex: 1,
    gap: Spacing.tiny / 2,
  },
  itemTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  itemSku: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  itemQty: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  actionsRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: Spacing.tiny,
  },
  primaryAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny / 2,
    borderRadius: Radii.pill,
    borderWidth: 1,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
  },
  primaryActionText: {
    ...Typography.caption,
    fontWeight: "700",
  },
  secondaryAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny / 2,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.06)",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
  },
  secondaryActionText: {
    ...Typography.caption,
    color: Colors.text,
  },
  disabledAction: {
    opacity: Opacity.disabled,
  },
});
