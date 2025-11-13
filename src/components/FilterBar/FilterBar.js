// [MB] Módulo: Tasks / Sección: Barra de filtros modal
// Afecta: TaskFilters (modal de filtros)
// Propósito: Tabs compactas para filtro rápido
// Puntos de edición futura: animaciones y accesibilidad
// Autor: Codex - Fecha: 2025-10-20

import React from "react";
import { View, Pressable, Text } from "react-native";
import styles from "./FilterBar.styles";

export default function FilterBar({ filters, active, onSelect, styleOverride }) {
  return (
    <View style={[styles.container, styleOverride]}>
      {filters.map((f) => {
        const isActive = active === f.key;
        return (
          <Pressable
            key={f.key}
            style={[
              styles.button,
              isActive ? styles.buttonActive : styles.buttonInactive,
            ]}
            onPress={() => onSelect(f.key)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
          >
            <Text
              style={[
                styles.label,
                isActive ? styles.labelActive : styles.labelInactive,
              ]}
            >
              {f.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

