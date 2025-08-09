// src/components/AdvancedFilters/AdvancedFilters.styles.js

import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.base,
    marginTop: 0,
    marginBottom: Spacing.small,
  },
  title: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "600",
    marginBottom: Spacing.small,
  },
  row: {
    flexDirection: "row",
    marginBottom: Spacing.base,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    padding: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.text,
    marginRight: Spacing.small,
    backgroundColor: "#222a36", // Color base para todos los botones
  },
  text: {
    color: Colors.text,
    fontSize: 14,
    marginLeft: Spacing.small,
  },
});
