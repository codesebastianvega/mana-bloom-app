// src/screens/TasksScreen.styles.js

import { StyleSheet, Platform, StatusBar } from "react-native";
import { Colors, Spacing } from "../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: Spacing.base,
    paddingTop:
      Platform.OS === "android"
        ? StatusBar.currentHeight + Spacing.small
        : Spacing.small,
  },
  list: {
    marginTop: Spacing.small,
  },
  filterModalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  filterModalContainer: {
    width: "90%",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.base,
    maxHeight: "90%",
  },
});
