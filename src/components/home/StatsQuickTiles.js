// [MB] Módulo: Home / Componente: StatsQuickTiles
// Afecta: HomeScreen
// Propósito: Mostrar racha, nivel y maná desde el contexto
// Puntos de edición futura: añadir más estadísticas o gráficos
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text } from "react-native";
import styles from "./StatsQuickTiles.styles";
import { useAppState, useProgress } from "../../state/AppContext";

export default function StatsQuickTiles() {
  const { streak, mana } = useAppState();
  const { level } = useProgress();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estadísticas</Text>
      <View style={styles.tiles}>
        <View style={styles.tile}>
          <Text style={styles.tileValue}>{streak}</Text>
          <Text style={styles.tileLabel}>Días de racha</Text>
        </View>
        <View style={styles.tile}>
          <Text style={styles.tileValue}>{level}</Text>
          <Text style={styles.tileLabel}>Nivel</Text>
        </View>
        <View style={[styles.tile, styles.tileSmall]}>
          <Text style={styles.tileValue}>{mana}</Text>
          <Text style={styles.tileLabel}>Maná</Text>
        </View>
      </View>
    </View>
  );
}
