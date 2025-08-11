import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../theme";

export default StyleSheet.create({
  closeBtn: {
    alignSelf: "flex-end",
    padding: Spacing.tiny,
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: Spacing.small,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.base,
  },
  button: {
    flex: 1,
    padding: Spacing.small,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: Spacing.tiny,
  },
  apply: {
    backgroundColor: Colors.primary,
  },
  reset: {
    backgroundColor: Colors.danger,
  },
  buttonText: {
    color: Colors.background,
    fontWeight: "600",
  },
});
