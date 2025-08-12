import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./Footer.styles";

const NAV_ITEMS = [
  { route: "HomeScreen", label: "Inicio", icon: "home" },
  { route: "TasksScreen", label: "Tareas", icon: "tasks" },
  { route: "MiPlantaScreen", label: "Mi Planta", icon: "leaf" },
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
              <LinearGradient
                colors={["#1E90FF", "#9932CC"]}
                style={styles.activeButton}
              >
                <FontAwesome5 name={item.icon} size={20} color="#FFF" />
                <Text style={styles.activeLabel}>{item.label}</Text>
              </LinearGradient>
            ) : (
              <View style={styles.inactiveButton}>
                <FontAwesome5 name={item.icon} size={20} color="#A9A9A9" />
                <Text style={styles.label}>{item.label}</Text>
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

