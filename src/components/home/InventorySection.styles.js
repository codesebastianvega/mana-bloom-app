import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default StyleSheet.create({
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.small / 2,
  },
  titleLeft: {
    flex: 1,
    gap: Spacing.tiny / 2,
    paddingBottom: Spacing.tiny,
  },
  titleLeftRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  titleIcon: {
    marginRight: Spacing.tiny,
  },
  title: {
    ...Typography.sectionTitle,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  openCta: {
    ...Typography.caption,
    color: "#7b7bff",
    fontWeight: "700",
  },
  sliderContent: {
    flexDirection: "row",
    gap: Spacing.small,
    paddingHorizontal: 0,
    paddingVertical: Spacing.tiny,
  },
  tile: {
    width: 104,
    height: 64,
    borderRadius: Radii.md,
    borderWidth: 1,
    paddingVertical: Spacing.tiny + 2,
    paddingHorizontal: Spacing.base,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.tiny,
  },
  tilePressed: {
    opacity: 0.85,
  },
  tileGrow: {
    flexBasis: "49.5%",
    maxWidth: "49.5%",
    aspectRatio: 1,
  },
  tileValue: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  tileLabel: {
    ...Typography.caption,
    fontWeight: "700",
    letterSpacing: 0.2,
    textTransform: "none",
    color: Colors.text,
  },
  tileIcon: {
    marginRight: Spacing.tiny / 2,
  },
  tileValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  tileLabelRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
