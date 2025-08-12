// [MB] Módulo: Home / Componente: NewsFeedSection
// Afecta: HomeScreen
// Propósito: Sección placeholder para noticias
// Puntos de edición futura: conectar con feed real
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text } from "react-native";
import styles from "./NewsFeedSection.styles";

export default function NewsFeedSection() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Noticias</Text>
    </View>
  );
}
