// src/components/Footer/Footer.styles.js

import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../theme";

export default StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "rgba(34, 35, 54, 1)",
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    borderTopWidth: 2,
    borderTopColor: "rgba(255, 255, 255, 0.1)",
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 10,
    paddingTop: Spacing.tiny,
    paddingBottom: 15,
  },
  button: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.small,
  },
  activeButton: {
    transform: [{ scale: 1.2 }], // Escala sutilmente el botón activo
    transition: "transform 0.3s ease-in-out", // Animación de escala
  },
  iconWrapper: {
    padding: Spacing.small,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    // Ya no hay un estilo de fondo para el estado activo aquí.
  },
  // El estilo activeIconWrapper ha sido eliminado.
  label: {
    marginTop: Spacing.tiny,
    fontSize: 12,
    fontWeight: "600",
    color: Colors.text,
    opacity: 0.8,
  },
  activeLabel: {
    color: Colors.text,
    fontWeight: "bold",
    opacity: 1,
  },
});
