// [MB] Módulo: Home / Sección: Encabezado
// Afecta: HomeScreen (encabezado principal)
// Propósito: Mostrar saludo, estado de planta y recursos
// Puntos de edición futura: estilos y hooks en HomeScreenHeader.styles.js
// Autor: Codex - Fecha: 2025-08-13

import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./HomeScreenHeader.styles";
import { Colors } from "../theme";
import { useAppState, useWallet } from "../state/AppContext";

export default function HomeScreenHeader({ userName }) {
  const { mana, plantState } = useAppState();
  const { coin, gem } = useWallet();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting} accessibilityRole="header">
          ¡Hola, {userName}!
        </Text>
        <View style={styles.plantStatus}>
          <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            style={styles.iconBackground}
          >
            <FontAwesome5 name="leaf" size={14} color={Colors.text} />
          </LinearGradient>
          <Text style={styles.statusText}>{plantState}</Text>
        </View>
      </View>
      <View style={styles.statusContainer}>
        <View
          style={styles.pill}
          accessibilityRole="text"
          accessibilityLabel={`Maná disponible: ${mana}`}
        >
          <Ionicons name="sparkles" size={14} color={Colors.text} />
          <Text style={styles.pillText}>{mana}</Text>
        </View>
        <View
          style={styles.pill}
          accessibilityRole="text"
          accessibilityLabel={`Monedas disponibles: ${coin}`}
        >
          <Ionicons name="pricetag" size={14} color={Colors.text} />
          <Text style={styles.pillText}>{coin}</Text>
        </View>
        <View
          style={styles.pill}
          accessibilityRole="text"
          accessibilityLabel={`Diamantes disponibles: ${gem}`}
        >
          <Ionicons name="diamond" size={14} color={Colors.text} />
          <Text style={styles.pillText}>{gem}</Text>
        </View>
      </View>
    </View>
  );
}
