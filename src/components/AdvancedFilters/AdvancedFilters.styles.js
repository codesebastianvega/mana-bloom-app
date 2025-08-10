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
  },
  difficultyBtn: {
    ...baseBtn,
  },
  tagBtn: {
    ...baseBtn,
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
});
