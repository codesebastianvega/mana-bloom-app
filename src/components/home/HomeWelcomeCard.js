// [MB] Módulo: Home / Sección: HomeWelcomeCard
// Afecta: HomeScreen
// Propósito: Tarjeta de bienvenida con degradé, saludo y chips de progreso
// Puntos de edición futura: animar badge o añadir nuevos chips
// Autor: Codex - Fecha: 2025-02-14

import React from "react";
import { View, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import styles from "./HomeWelcomeCard.styles";
import {
  useAppState,
  useProgress,
  useHydrationStatus,
  useXpMultiplier,
} from "../../state/AppContext";
import SectionPlaceholder from "./SectionPlaceholder";
import { Colors } from "../../theme";

export default function HomeWelcomeCard() {
  const { plantState, streak, mana, displayName } = useAppState();
  const { level } = useProgress();
  const hydration = useHydrationStatus();
  const { multiplier } = useXpMultiplier();
  const hasXpBuff = multiplier === 2;

  if (hydration.mana || hydration.progress) {
    return <SectionPlaceholder height={120} />;
  }

  return (
    <LinearGradient
      colors={[Colors.primaryFantasy, Colors.secondaryFantasy]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <View style={styles.badge}>
        <Ionicons name="leaf" size={28} color={Colors.secondary} />
      </View>
      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>
          ¡Hola, {displayName || "Jugador"}!
        </Text>
        <Text style={styles.subtitle}>
          Planta: {plantState} · Nivel {level} · Racha {streak}
        </Text>
        <View style={styles.chipRow}>
          <View accessibilityRole="text" style={styles.chip}>
            <Text style={styles.chipText}>Nivel {level}</Text>
          </View>
          <View accessibilityRole="text" style={styles.chip}>
            <Text style={styles.chipText}>Racha {streak}</Text>
          </View>
          {mana !== undefined && (
            <View accessibilityRole="text" style={styles.chip}>
              <Text style={styles.chipText}>Maná {mana}</Text>
            </View>
          )}
          {hasXpBuff && (
            <View accessibilityRole="text" style={styles.chip}>
              <Text style={styles.chipText}>XP×2 activo</Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}
