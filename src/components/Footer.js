// [MB] Módulo: Navegación / Sección: Footer
// Afecta: navegación global
// Propósito: barra de navegación inferior
// Puntos de edición futura: rutas y estilos del footer
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./Footer.styles";

const NAV_ITEMS = [
  { route: "HomeScreen", label: "Inicio", icon: "home" },
  { route: "TasksScreen", label: "Tareas", icon: "tasks" },
  { route: "PlantScreen", label: "Mi Planta", icon: "leaf" },
  { route: "ProfileScreen", label: "Perfil", icon: "user" },
];

export default function Footer({ state, navigation }) {
  return (
    <View style={styles.container}>
      {NAV_ITEMS.map((item, index) => {
        const isActive = state.index === index;

        return (
          <TouchableOpacity
            key={item.route}
            style={styles.touchable}
            onPress={() => navigation.navigate(item.route)}
          >
            {isActive ? (
              <>
                <LinearGradient
                  colors={["#6d56d3ff", "#0ca790ff"]}
                  style={styles.activeIcon}
                >
                  <FontAwesome5 name={item.icon} size={18} color="#FFF" />
                </LinearGradient>
                <Text style={styles.activeLabel}>{item.label}</Text>
              </>
            ) : (
              <FontAwesome5 name={item.icon} size={20} color="#A9A9A9" />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

