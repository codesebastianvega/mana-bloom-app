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
  // bajo modalStyles…
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
  },
  optionBtn: {
    padding: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: Colors.text,
    marginRight: Spacing.small,
    flexDirection: "row",
    alignItems: "center",
  },
  optionText: {
    color: Colors.text,
    fontSize: 14,
    marginLeft: 6,
  },
  // dentro de export const modalStyles = StyleSheet.create({ … })
  //estilos de los chips
  label: {
    color: Colors.text,
    fontSize: 14,
    fontWeight: "600",
    marginTop: Spacing.base,
    marginBottom: Spacing.small,
  },
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
