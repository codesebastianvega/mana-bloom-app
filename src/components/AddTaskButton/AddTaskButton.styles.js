// src/components/AddTaskButton/AddTaskButton.styles.js

import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme";

export default StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 100,
    right: Spacing.large,
    width: 60,
    height: 60,
    borderRadius: 30,
    overflow: "hidden", // Importante para que el degradado no se salga del borde redondeado
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  fabShadowPressed: {
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 12,
  },
  // ¡Aquí es donde debes asegurarte de que estén estas propiedades!
  gradient: {
    flex: 1, // Esto asegura que el degradado ocupe todo el espacio del botón.
    justifyContent: "center", // Centra el contenido (el icono) verticalmente.
    alignItems: "center", // Centra el contenido (el icono) horizontalmente.
  },
});
