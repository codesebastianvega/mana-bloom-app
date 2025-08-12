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
    paddingVertical: Spacing.tiny,
  },
  touchable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.small,
    paddingBottom: 10,
  },
  activeIcon: {
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.small,
    borderRadius: 8,
  },
  activeLabel: {
    marginTop: Spacing.tiny,
    fontSize: 12,
    color: "#FFF",
    fontWeight: "bold",
  },
});
