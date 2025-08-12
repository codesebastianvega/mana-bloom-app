// [MB] Módulo: Home / Sección: HomeWelcomeCard
// Afecta: HomeScreen
// Propósito: Tarjeta de bienvenida con saludo y resumen dinámico
// Puntos de edición futura: reemplazar placeholder de nombre
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text } from "react-native";
import styles from "./HomeWelcomeCard.styles";
import { useAppState, useProgress } from "../../state/AppContext";

export default function HomeWelcomeCard() {
  const { plantState, streak, mana } = useAppState();
  const { level } = useProgress();

  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        ¡Hola, Jugador!
      </Text>
      <Text style={styles.subtitle}>
        Planta: {plantState} · Nivel {level} · Racha {streak} · Maná {mana}
      </Text>
    </View>
  );
}
