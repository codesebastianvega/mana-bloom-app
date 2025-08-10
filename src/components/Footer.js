import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./Footer.styles";
import { Colors } from "../theme";

export default function Footer({ activeScreen, onNavigate }) {
  const buttons = [
    { key: "tasks", label: "Tareas", icon: "list-ul" },
    { key: "plant", label: "Planta", icon: "leaf" },
    { key: "stats", label: "Estadísticas", icon: "chart-bar" },
    { key: "profile", label: "Perfil", icon: "user-circle" },
  ];

  return (
    <View style={styles.container}>
      {buttons.map((btn) => {
        const isActive = activeScreen === btn.key;
        return (
          <TouchableOpacity
            key={btn.key}
            style={styles.button}
            onPress={() => onNavigate(btn.key)}
          >
            <View
              style={
                isActive ? styles.activeIconWrapper : styles.iconWrapper
              }
            >
              <FontAwesome5
                name={btn.icon}
                size={isActive ? 24 : 20}
                color={isActive ? Colors.text : Colors.textMuted}
              />
            </View>
            {isActive && <Text style={styles.label}>{btn.label}</Text>}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
