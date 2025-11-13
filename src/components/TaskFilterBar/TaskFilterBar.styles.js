// [MB] TaskFilterBar — highlight per-tab + badge z-order

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const withAlpha = (hex = "", alpha = 1) => {
  const cleaned = `${hex}`.replace("#", "");
  if (cleaned.length !== 6) {
    return hex;
  }
  const value = parseInt(cleaned, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const BADGE_BG = withAlpha(Colors.primaryLight, 0.18);
const BADGE_BORDER = withAlpha(Colors.primaryLight, 0.4);

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: Spacing.small,
    position: "relative",
  },
  button: {
    flex: 1,
    borderRadius: Radii.lg,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small,
  },
  highlight: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Radii.lg,
    borderWidth: 1,
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
    textTransform: "capitalize",
  },
  badge: {
    position: "absolute",
    top: -Spacing.tiny,
    right: -Spacing.tiny * 1.5,
    backgroundColor: BADGE_BG,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.tiny,
    paddingVertical: Spacing.tiny / 2,
    zIndex: 2,
    borderWidth: 1,
    borderColor: BADGE_BORDER,
    pointerEvents: "none",
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
});
