// src/components/SearchBar/SearchBar.styles.js

import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme";

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    borderRadius: 15,
    marginTop: Spacing.small,
    marginBottom: Spacing.small,
    shadowColor: Colors.text,
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: "space-between",
    minHeight: 50,
    maxHeight: 50,
    borderWidth: 0,
    borderColor: Colors.textMuted,
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
    padding: 0,
  },
  button: {
    // Botón para filtros avanzados
    marginLeft: Spacing.base,
    opacity: 0.9,
  },
});
