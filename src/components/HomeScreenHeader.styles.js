import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: Colors.text,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusItem: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: Spacing.base,
  },
  iconBackground: {
    padding: Spacing.tiny,
    borderRadius: 12,
    marginRight: Spacing.tiny,
  },
  statusText: {
    color: Colors.text,
    fontSize: 16,
  },
});
