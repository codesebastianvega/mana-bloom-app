// src/components/AdvancedFilters/AdvancedFilters.styles.js

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
  row: {
    flexDirection: "row",
    marginBottom: Spacing.large,
  },
  elementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: Spacing.large,
  },
  elementGridBtn: {
    ...baseBtn,
    width: "48%",
    justifyContent: "center",
    marginRight: 0,
    marginBottom: Spacing.small,
  },
  priorityBtn: {
    ...baseBtn,
  },
  difficultyBtn: {
    ...baseBtn,
  },
  tagBtn: {
    ...baseBtn,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.tiny,
    marginRight: Spacing.base,
    marginBottom: Spacing.small,
  },
  tagSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 0.5,
    borderColor: Colors.text,
    borderRadius: 8,
    padding: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    marginBottom: Spacing.large,
    backgroundColor: Colors.surface,
  },
  tagSearchContainerFocused: {
    borderColor: Colors.accent,
  },
  tagSearchInput: {
    flex: 1,
    color: Colors.text,
  },
  clearBtn: {
    marginLeft: Spacing.small,
    padding: Spacing.tiny,
  },
  text: {
    color: Colors.text,
    fontSize: 14,
    marginLeft: Spacing.small,
  },
  tagText: {
    color: Colors.text,
    fontSize: 12,
    marginLeft: Spacing.small,
  },
});
