import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii } from "../theme";

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#171027",
    borderTopWidth: 1,
    borderColor: Colors.border,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.small,
  },
  touchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.small,
    gap: Spacing.tiny,
  },
  activeGlow: {
    alignItems: "center",
    justifyContent: "center",
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    backgroundColor: "rgba(31, 20, 48, 0.8)",
    borderColor: "rgba(255,255,255,0.15)",
    shadowColor: Colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },
  activeLabel: {
    marginTop: Spacing.tiny,
    fontSize: 12,
    color: Colors.text,
    fontWeight: "600",
  },
});
