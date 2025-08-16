// [MB] TaskFilterBar — highlight per-tab + badge z-order

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Spacing.small,
    position: "relative",
    height: Spacing.xlarge + Spacing.tiny,
    paddingHorizontal: Spacing.small,
  },
  button: {
    flex: 1,
    borderRadius: Radii.lg,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  highlight: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Radii.lg,
    zIndex: 0,
  },
  tabContent: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    zIndex: 1,
  },
  label: {
    ...Typography.body,
    fontWeight: "600",
  },
  badge: {
    position: "absolute",
    top: -Spacing.tiny,
    right: -Spacing.tiny * 1.5,
    backgroundColor: Colors.attention || Colors.warning || Colors.accent,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.tiny,
    paddingVertical: Spacing.tiny / 2,
    zIndex: 2,
    pointerEvents: "none",
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.onAttention || Colors.onAccent || Colors.text,
    fontWeight: "700",
  },
});
