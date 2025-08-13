// [MB] Módulo: Home / Componente: StatsQuickTiles
// Afecta: HomeScreen
// Propósito: Mostrar racha, nivel y maná desde el contexto
// Puntos de edición futura: añadir más estadísticas o gráficos
// Autor: Codex - Fecha: 2025-08-13

import React from "react";
import { View, Text } from "react-native";
import styles from "./StatsQuickTiles.styles";
import {
  useAppState,
  useProgress,
  useHydrationStatus,
} from "../../state/AppContext";
import SectionPlaceholder from "./SectionPlaceholder";

export default function StatsQuickTiles() {
  const { streak, mana } = useAppState();
  const { level } = useProgress();
  const hydration = useHydrationStatus();

  if (hydration.mana || hydration.progress) {
    return <SectionPlaceholder height={140} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        Estadísticas
      </Text>
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
