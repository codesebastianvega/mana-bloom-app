// [MB] Módulo: Home / Sección: HomeWelcomeCard
// Afecta: HomeScreen
// Propósito: Tarjeta de bienvenida con degradé, saludo y chips de progreso
// Puntos de edición futura: animar badge o añadir nuevos chips
// Autor: Codex - Fecha: 2025-02-14

import React, { useEffect, useRef } from "react";
import { View, Text, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import styles from "./HomeWelcomeCard.styles";
import {
  useAppState,
  useProgress,
  useHydrationStatus,
  useXpMultiplier,
} from "../../state/AppContext";
import SectionPlaceholder from "../common/SectionPlaceholder";
import { Colors } from "../../theme";

function HomeWelcomeCard() {
  const { plantState, streak, mana, displayName } = useAppState();
  const { level } = useProgress();
  const { modules } = useHydrationStatus();
  const { multiplier } = useXpMultiplier();
  const hasXpBuff = multiplier === 2;
  const chipsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(chipsAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [chipsAnim]);

  if (modules.wallet || modules.progress) {
    return <SectionPlaceholder height={110} />;
  }

  return (
    <LinearGradient
      colors={[Colors.primary, Colors.secondary]}
      start={{ x: 0, y: 0 }}
      end={{ x: 2, y: 2 }}
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
        <Animated.View
          style={[
            styles.chipRow,
            {
              opacity: chipsAnim,
              transform: [{ translateY: chipsAnim.interpolate({ inputRange: [0, 1], outputRange: [8, 0] }) }],
            },
          ]}
        >
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
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

export default React.memo(HomeWelcomeCard);
