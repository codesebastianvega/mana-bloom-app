// [MB] Módulo: Home / Componente: StatsQuickTiles
// Afecta: HomeScreen
// Propósito: Mostrar racha, nivel y maná desde el contexto
// Puntos de edición futura: añadir más estadísticas o gráficos
// Autor: Codex - Fecha: 2025-08-17

import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./StatsQuickTiles.styles";
import {
  useAppState,
  useProgress,
  useHydrationStatus,
  useAppDispatch,
} from "../../state/AppContext";
import SectionPlaceholder from "../common/SectionPlaceholder";

function StatsQuickTiles() {
  const { streak, mana } = useAppState();
  const { level } = useProgress();
  const { modules } = useHydrationStatus();
  const dispatch = useAppDispatch();

  if (modules.wallet || modules.progress) {
    return <SectionPlaceholder height={84} />;
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
      {__DEV__ && (
        <Pressable
          onPress={() =>
            dispatch({
              type: "ACHIEVEMENT_EVENT",
              payload: { type: "tool_usage", payload: { toolId: "pomodoro" } },
            })
          }
          style={styles.debugButton}
          accessibilityRole="button"
          accessibilityLabel="Disparar uso de pomodoro"
        >
          <Text style={styles.debugButtonText}>Debug Pomodoro</Text>
        </Pressable>
      )}
    </View>
  );
}

export default React.memo(StatsQuickTiles);
