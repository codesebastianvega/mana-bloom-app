// [MB] Módulo: Tasks / Sección: AddTaskButton
// Afecta: creación de tareas (botón flotante)
// Propósito: Botón flotante para agregar tareas nuevas
// Puntos de edición futura: animaciones y estado presionado
// Autor: Codex - Fecha: 2025-08-13

import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles, { FAB_SIZE } from "./AddTaskButton.styles";
import { Colors } from "../../theme";

export { FAB_SIZE };

export default function AddTaskButton({ onPress }) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.fab, isPressed && styles.fabPressed]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="button"
      accessibilityLabel="Añadir tarea"
    >
      <FontAwesome name="plus" size={20} color={Colors.onAccent} />
    </TouchableOpacity>
  );
}
