// [MB] Módulo: Tasks / Sección: Barra de filtros
// Afecta: FilterBar (tabs principales)
// Propósito: Tabs accesibles alineadas al tema
// Puntos de edición futura: animaciones y desplazamiento
// Autor: Codex - Fecha: 2025-08-13

import React from "react";
import { View, ScrollView, Pressable, Text } from "react-native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
// Los estilos de la barra de filtros residen en FilterBar.styles.js
import styles from "./FilterBar.styles";
import { Colors } from "../../theme";

export default function FilterBar({ filters, active, onSelect }) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.glassBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {filters.map((f) => {
            const Icon = ["single", "completed", "deleted"].includes(f.key)
              ? FontAwesome
              : FontAwesome5;
            const isActive = active === f.key;
            return (
              <Pressable
                key={f.key}
                style={[styles.tab, isActive && styles.tabActive]}
                onPress={() => onSelect(f.key)}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Icon
                  name={f.icon}
                  size={14}
                  color={isActive ? Colors.text : Colors.textMuted}
                  style={styles.icon}
                />
                <Text
                  style={[
                    styles.tabLabel,
                    !isActive && styles.tabLabelMuted,
                  ]}
                >
                  {f.label}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
