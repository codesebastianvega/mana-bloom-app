// [MB] Módulo: Tasks / Sección: Barra de filtros
// Afecta: TaskFilterBar (tabs principales)
// Propósito: Tabs accesibles alineadas al tema
// Puntos de edición futura: animaciones y desplazamiento
// Autor: Codex - Fecha: 2025-08-13

import React from "react";
import { View, Pressable, Text } from "react-native";
import styles from "./TaskFilterBar.styles";

export default function TaskFilterBar({ filters, active, onSelect }) {
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
            <Text
              style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}
            >
              {f.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
