// [MB] Módulo: Home / Sección: HomeWelcomeCard
// Afecta: HomeScreen
// Propósito: Tarjeta de bienvenida con saludo y resumen dinámico
// Puntos de edición futura: reemplazar placeholder de nombre
// Autor: Codex - Fecha: 2025-08-13

import React from "react";
import { View, Text } from "react-native";
import styles from "./HomeWelcomeCard.styles";
import {
  useAppState,
  useProgress,
  useHydrationStatus,
} from "../../state/AppContext";
import SectionPlaceholder from "./SectionPlaceholder";

export default function HomeWelcomeCard() {
  const { plantState, streak, mana } = useAppState();
  const { level } = useProgress();
  const hydration = useHydrationStatus();

  if (hydration.mana || hydration.progress) {
    return <SectionPlaceholder height={80} />;
  }

  return (
    <View style={styles.container}>
      <Text accessibilityRole="header" style={styles.title}>
        ¡Hola, Sebas!
      </Text>
      <Text style={styles.subtitle}>
        Planta: {plantState} · Nivel {level} · Racha {streak} · Maná {mana}
      </Text>
    </View>
  );
}
