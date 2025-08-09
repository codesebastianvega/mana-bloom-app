// src/components/SearchBar/SearchBar.js

import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./SearchBar.styles";
import { Colors, Spacing } from "../../theme";

export default function SearchBar({ value, onChange, onToggleAdvanced }) {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <FontAwesome5
          name="search"
          size={16}
          color={Colors.textMuted}
          style={{ marginRight: Spacing.small }}
        />
        <TextInput
          style={styles.input}
          placeholder="Buscar tareas..."
          placeholderTextColor={Colors.textMuted}
          value={value}
          onChangeText={onChange}
        />
      </View>
      <TouchableOpacity onPress={onToggleAdvanced} style={styles.button}>
        <FontAwesome5 name="sliders-h" size={17} color={Colors.textMuted} />
      </TouchableOpacity>
    </View>
  );
}
