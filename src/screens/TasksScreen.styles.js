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
});

export const modalStyles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    backgroundColor: Colors.surface,
    borderRadius: 12,
    padding: Spacing.base,
    maxHeight: "90%",
  },
  title: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "600",
    marginBottom: Spacing.small,
  },
  input: {
    backgroundColor: Colors.background,
    color: Colors.text,
    borderRadius: 8,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
    fontSize: 14,
  },
  button: {
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    borderRadius: 8,
  },
  buttonText: {
    color: Colors.background,
    fontWeight: "600",
  },
  label: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "600",
    marginTop: Spacing.base,
    marginBottom: Spacing.small,
  },
  row: {
    flexDirection: "row",
    marginBottom: Spacing.base,
    width: "100%",
  },
  optionBtn: {
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.tiny,
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: Colors.text,
    marginRight: Spacing.tiny,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    color: Colors.text,
    fontSize: 12,
    marginLeft: 4,
  },
  difficultyOptionBtn: {
    flex: 1,
    paddingVertical: Spacing.small,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.text,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.small,
  },
  priorityContainer: {
    width: "100%",
    marginBottom: Spacing.base,
  },
  priorityBtn: {
    width: "100%",
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.text,
    marginBottom: Spacing.small,
    alignItems: "flex-start",
    borderRightWidth: 4,
  },
  priorityTitle: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
  prioritySubtitle: {
    color: Colors.textMuted,
    fontSize: 12,
    marginTop: 2,
  },
  // estilos específicos para los botones de tipo de tarea
  typeOptionBtn: {
    flex: 1,
    paddingVertical: Spacing.small,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.text,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.small,
  },
  typeOptionText: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "600",
  },
  // botones de elemento en cuadrícula
  elementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: Spacing.base,
  },
  elementBtn: {
    width: "48%",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.text,
    marginBottom: Spacing.small,
    overflow: "hidden",
  },
  elementBtnInner: {
    paddingVertical: Spacing.small,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  elementInfoBox: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 8,
    padding: Spacing.small,
    marginBottom: Spacing.base,
    alignItems: "center",
  },
  elementInfoTitle: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: Spacing.small,
  },
  elementInfoDescription: {
    color: Colors.text,
    fontSize: 13,
    textAlign: "center",
    marginBottom: 4,
  },
  elementInfoExamples: {
    color: Colors.textMuted,
    fontSize: 12,
    textAlign: "center",
    marginBottom: 4,
  },
  elementInfoPurpose: {
    color: Colors.text,
    fontSize: 13,
    textAlign: "center",
  },
  // estilos de los chips
  tagInputRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: Spacing.base,
  },
  tagInput: {
    flex: 1,
    backgroundColor: Colors.background,
    color: Colors.text,
    borderRadius: 8,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
    fontSize: 14,
  },
  addTagButton: {
    marginLeft: Spacing.small,
    backgroundColor: Colors.primary,
    padding: Spacing.small,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  tagChip: {
    backgroundColor: Colors.surface,
    borderRadius: 12,
    borderWidth: 0.5,
    borderColor: Colors.textMuted,
    paddingHorizontal: Spacing.small,
    paddingVertical: 4,
    marginRight: Spacing.small,
  },
  tagText: {
    color: Colors.text,
    fontSize: 12,
  },
});
