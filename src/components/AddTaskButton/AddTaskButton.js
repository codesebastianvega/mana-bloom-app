// [MB] Módulo: Tasks / Sección: AddTaskButton
// Afecta: creación de tareas (botón flotante)
// Propósito: Botón flotante para agregar tareas nuevas
// Puntos de edición futura: animaciones y estilos de gradiente
// Autor: Codex - Fecha: 2025-08-13

import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./AddTaskButton.styles";
import { Colors, Gradients } from "../../theme";

export default function AddTaskButton({ onPress }) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.fab, isPressed && styles.fabShadowPressed]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      accessibilityRole="button"
      accessibilityLabel="Añadir tarea"
    >
      <LinearGradient colors={Gradients.mana} style={styles.gradient}>
        <FontAwesome name="plus" size={20} color={Colors.text} />
      </LinearGradient>
    </TouchableOpacity>
  );
}
