// [MB] Módulo: Home / Componente: EventBanner
// Afecta: HomeScreen
// Propósito: Banner placeholder para eventos
// Puntos de edición futura: reemplazar por promoción dinámica
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text } from "react-native";
import styles from "./EventBanner.styles";

export default function EventBanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Próximo Evento</Text>
    </View>
  );
}
