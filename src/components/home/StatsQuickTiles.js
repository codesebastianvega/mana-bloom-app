// [MB] Módulo: Home / Componente: StatsQuickTiles
// Afecta: HomeScreen
// Propósito: Contenedor placeholder para estadísticas rápidas
// Puntos de edición futura: mostrar valores reales y gráficos
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text } from "react-native";
import styles from "./StatsQuickTiles.styles";

export default function StatsQuickTiles() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estadísticas</Text>
      <View style={styles.tiles}>
        <View style={styles.tile}>
          <Text style={styles.tileText}>Maná</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.tileText}>XP</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.tileText}>Racha</Text>
        </View>
      </View>
    </View>
  );
}
