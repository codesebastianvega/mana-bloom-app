// src/components/AddTaskButton/AddTaskButton.js

import React from "react";
import { TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import styles from "./AddTaskButton.styles";
import { Colors } from "../../theme";

export default function AddTaskButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.fab} onPress={onPress}>
      <FontAwesome name="plus" size={24} color={Colors.background} />
    </TouchableOpacity>
  );
}
