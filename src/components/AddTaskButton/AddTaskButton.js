// src/components/AddTaskButton/AddTaskButton.js

import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./AddTaskButton.styles";
import { Colors } from "../../theme";

export default function AddTaskButton({ onPress }) {
  const [isPressed, setIsPressed] = useState(false);
  return (
    <TouchableOpacity
      style={[styles.fab, isPressed && styles.fabShadowPressed]}
      onPress={onPress}
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
    >
      {" "}
      <LinearGradient
        colors={["#6d56d3ff", "#0ca790ff"]} // Nueva paleta de colores para el degradado
        style={styles.gradient}
      >
        <FontAwesome name="plus" size={20} color={Colors.text} />{" "}
      </LinearGradient>{" "}
    </TouchableOpacity>
  );
}
