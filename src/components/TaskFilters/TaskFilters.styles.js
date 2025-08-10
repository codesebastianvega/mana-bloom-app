// src/components/TaskFilters/TaskFilters.styles.js

import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme";

const baseBtn = {
  flexDirection: "row",
  alignItems: "center",
  padding: Spacing.tiny,
  paddingHorizontal: Spacing.small,
  borderRadius: 8,
  borderWidth: 0.5,
  borderColor: Colors.text,
  marginRight: Spacing.small,
  backgroundColor: Colors.filterBtnBg,
};

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
  section: {
    marginBottom: Spacing.base,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.tiny,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
  },
  elementBtn: {
    ...baseBtn,
  },
  priorityBtn: {
    ...baseBtn,
  },
  difficultyBtn: {
    ...baseBtn,
  },
  tagBtn: {
    ...baseBtn,
  },
  text: {
    color: Colors.text,
    fontSize: 14,
    marginLeft: Spacing.small,
  },
});
