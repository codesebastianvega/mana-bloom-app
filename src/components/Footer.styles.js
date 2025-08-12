import { StyleSheet } from "react-native";
import { Spacing } from "../theme";

export default StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    backgroundColor: "#1b1231",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  touchable: {
    flex: 1,
  },
  activeButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.small,
    borderRadius: 20,
  },
  inactiveButton: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.small,
  },
  label: {
    marginTop: Spacing.tiny,
    fontSize: 12,
    color: "#A9A9A9",
  },
  activeLabel: {
    marginTop: Spacing.tiny,
    fontSize: 12,
    color: "#FFF",
    fontWeight: "bold",
  },
});

