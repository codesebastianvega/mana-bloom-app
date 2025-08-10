// src/components/AdvancedFilters/AdvancedFilters.styles.js

import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme";

// Un solo estilo base para todos los botones.
// Esto evita la repetición de código.
const baseBtn = {
  flexDirection: "row",
  alignItems: "center",
  padding: Spacing.tiny,
  paddingHorizontal: Spacing.small,
  borderRadius: 8,
  borderWidth: 0.5,
  borderColor: Colors.text,
  marginRight: Spacing.small,
  backgroundColor: "transparent", // Botones transparentes por defecto
};

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.base,
    marginTop: 0,
    marginBottom: Spacing.small,
  },
  row: {
    flexDirection: "row",
    marginBottom: Spacing.base,
  },
  elementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: Spacing.base,
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
    justifyContent: "center",
  },
  difficultyBtn: {
    ...baseBtn,
    justifyContent: "center",
  },
  tagBtn: {
    ...baseBtn,
    paddingVertical: 2,
    paddingHorizontal: Spacing.tiny,
    borderRadius: 6,
    marginRight: Spacing.tiny,
  },
  tagText: {
    color: Colors.text,
    fontSize: 12,
  },
  tagSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.filterBtnBg,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.text,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    marginBottom: Spacing.base,
  },
  tagSearchContainerFocused: {
    borderColor: Colors.accent,
  },
  tagSearchInput: {
    flex: 1,
    color: Colors.text,
    paddingVertical: Spacing.tiny,
  },
  clearBtn: {
    marginLeft: Spacing.small,
  },
  tagText: {
    color: Colors.text,
    fontSize: 14,
  },
  tagSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.filterBtnBg,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.text,
    paddingHorizontal: Spacing.small,
    marginBottom: Spacing.base,
  },
  tagSearchContainerFocused: {
    borderColor: Colors.accent,
  },
  tagSearchInput: {
    flex: 1,
    color: Colors.text,
    paddingVertical: 0,
  },
  clearBtn: {
    marginLeft: Spacing.small,
  },
  sectionTitle: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "600",
    marginTop: Spacing.small,
    marginBottom: Spacing.tiny,
  },
  text: {
    color: Colors.text,
    fontSize: 14,
    marginLeft: Spacing.small,
  },
  centerText: {
    marginLeft: 0,
    textAlign: "center",
    flex: 1,
  },
});
