// src/components/FilterBar/FilterBar.js

import React from "react";
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
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
              <TouchableOpacity
                key={f.key}
                style={styles.btn}
                onPress={() => onSelect(f.key)}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
              >
                <Icon
                  name={f.icon}
                  size={14}
                  color={isActive ? f.color : Colors.textMuted}
                  style={styles.icon}
                />
                <View>
                  <Text
                    style={[
                      styles.text,
                      isActive && styles.textActive,
                      isActive
                        ? { color: f.color }
                        : { color: Colors.textMuted },
                    ]}
                  >
                    {f.label}
                  </Text>
                  <View
                    style={[
                      styles.underline,
                      { backgroundColor: isActive ? f.color : "transparent" },
                    ]}
                  />
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
}
