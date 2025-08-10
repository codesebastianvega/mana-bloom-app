import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../theme";

export default StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    paddingVertical: Spacing.small,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.2)",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  iconWrapper: {
    padding: Spacing.small,
    borderRadius: 20,
  },
  activeIconWrapper: {
    padding: Spacing.small,
    borderRadius: 20,
    backgroundColor: Colors.accent,
  },
  label: {
    marginTop: Spacing.tiny,
    fontSize: 12,
    color: Colors.text,
  },
});
