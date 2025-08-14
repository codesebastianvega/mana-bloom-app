// [MB] Módulo: Tasks / Sección: Barra de filtros
// Afecta: TaskFilterBar (tabs principales)
// Propósito: Tabs accesibles alineadas al tema
// Puntos de edición futura: animaciones y desplazamiento
// Autor: Codex - Fecha: 2025-02-14

import React from "react";
import { View, Pressable, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./TaskFilterBar.styles";
import { Colors } from "../../theme";

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
            <View style={styles.tabContent}>
              {f.icon && (
                <FontAwesome5
                  name={f.icon}
                  size={14}
                  color={isActive ? Colors.text : Colors.textMuted}
                />
              )}
              <Text
                style={[styles.label, isActive ? styles.labelActive : styles.labelInactive]}
              >
                {f.label}
              </Text>
            </View>
            {isActive && <View style={styles.underline} />}
          </Pressable>
        );
      })}
    </View>
  );
}
