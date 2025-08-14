// [MB] SearchBar — buscador cómodo con botón de filtros
// [MB] Módulo: Tasks / Sección: Barra de búsqueda
// Afecta: SearchBar
// Propósito: Campo de búsqueda con acceso a filtros avanzados
// Puntos de edición futura: estados de focus y validaciones
// Autor: Codex - Fecha: 2025-08-14

import React from "react";
import { View, TextInput, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./SearchBar.styles";
import { Colors } from "../../theme";

export default function SearchBar({ value, onChange, onToggleAdvanced }) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBox}>
        <FontAwesome5 name="search" size={16} color={Colors.textMuted} />
        <TextInput
          style={styles.input}
          placeholder="Buscar tareas..."
          placeholderTextColor={Colors.textMuted}
          value={value}
          onChangeText={onChange}
          accessibilityRole="search"
          accessibilityLabel="Buscar tareas"
        />
      </View>
      <TouchableOpacity
        onPress={onToggleAdvanced}
        style={styles.filterButton}
        accessibilityRole="button"
        accessibilityLabel="Abrir filtros"
      >
        <FontAwesome5 name="sliders-h" size={17} color={Colors.textMuted} />
      </TouchableOpacity>
    </View>
  );
}
