// src/components/AddTaskButton/AddTaskButton.styles.js

import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme";

export default StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: Spacing.large,
    right: Spacing.large,
    width: 60,
    height: 60,
      borderRadius: 30,
      backgroundColor: Colors.buttonBg, // Celeste vibrante moderno
      justifyContent: "center",
      alignItems: "center",
      shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
});
