// [MB] Módulo: Navegación / Sección: Footer
// Afecta: navegación global
// Propósito: barra de navegación inferior
// Puntos de edición futura: rutas y estilos del footer
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import styles from "./TabBar.styles";
import { Colors } from "../theme";

const NAV_ITEMS = [
  { route: "HomeScreen", label: "Inicio", icon: "home", accent: "#B542F6" },
  { route: "TasksScreen", label: "Tareas", icon: "tasks", accent: "#1cd47b" },
  { route: "PlantScreen", label: "Mi Planta", icon: "leaf", accent: "#FFD54F" },
  { route: "ProfileScreen", label: "Perfil", icon: "user", accent: "#8E9AC6" },
];

function hexToRgba(hex = "", alpha = 1) {
  if (!hex) return undefined;
  let cleaned = hex.replace("#", "");
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split("")
      .map((c) => `${c}${c}`)
      .join("");
  }
  if (cleaned.length !== 6) return undefined;
  const intVal = parseInt(cleaned, 16);
  const r = (intVal >> 16) & 255;
  const g = (intVal >> 8) & 255;
  const b = intVal & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function Footer({ state, navigation }) {
  return (
    <View style={styles.container}>
      {NAV_ITEMS.map((item, index) => {
        const isActive = state.index === index;
        const iconColor = isActive ? item.accent : Colors.textMuted;
        const glowColor = hexToRgba(item.accent, 0.16);
        const glowBorder = hexToRgba(item.accent, 0.28);

        return (
          <Pressable
            key={item.route}
            style={styles.touchable}
            onPress={() => navigation.navigate(item.route)}
          >
            {isActive ? (
              <>
                <View
                  style={[
                    styles.activeGlow,
                    {
                      backgroundColor: glowColor,
                      borderColor: glowBorder,
                    },
                  ]}
                >
                  <FontAwesome5 name={item.icon} size={18} color={item.accent} />
                </View>
                <Text style={styles.activeLabel}>{item.label}</Text>
              </>
            ) : (
              <FontAwesome5 name={item.icon} size={18} color={iconColor} />
            )}
          </Pressable>
        );
      })}
    </View>
  );
}



