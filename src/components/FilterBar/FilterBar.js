// [MB] Módulo: Tasks / Sección: Barra de filtros
// Afecta: FilterBar (tabs principales)
// Propósito: Tabs accesibles alineadas al tema
// Puntos de edición futura: animaciones y desplazamiento
// Autor: Codex - Fecha: 2025-08-13

import React from "react";
import { View, Pressable, Text } from "react-native";
import styles from "./FilterBar.styles";

export default function FilterBar({ filters, active, onSelect }) {
  return (
    <View style={styles.container}>
      {filters.map((f) => {
        const isActive = active === f.key;
        return (
          <Pressable
            key={f.key}
            style={[styles.button, isActive ? styles.buttonActive : styles.buttonInactive]}
            onPress={() => onSelect(f.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text style={isActive ? styles.textActive : styles.textInactive}>
              {f.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
