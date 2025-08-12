// [MB] Módulo: Home / Componente: HomeWelcomeCard
// Afecta: HomeScreen
// Propósito: Tarjeta de bienvenida placeholder para el usuario
// Puntos de edición futura: reemplazar por contenido dinámico
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text } from "react-native";
import styles from "./HomeWelcomeCard.styles";

export default function HomeWelcomeCard() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido de vuelta</Text>
    </View>
  );
}
