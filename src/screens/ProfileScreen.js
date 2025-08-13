// [MB] Módulo: Profile / Sección: ProfileScreen
// Afecta: ProfileScreen (pantalla de perfil)
// Propósito: Mostrar información del perfil y panel de logros
// Puntos de edición futura: agregar más secciones y navegación
// Autor: Codex - Fecha: 2025-08-13

import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing, Typography } from "../theme";
import AchievementsPanel from "../components/profile/AchievementsPanel";
import AchievementToast from "../components/common/AchievementToast";
import { useAchievementToast, useAppDispatch } from "../state/AppContext";

export default function ProfileScreen() {
  const achievementToast = useAchievementToast();
  const dispatch = useAppDispatch();

  return (
    <SafeAreaView style={styles.container}>
      {achievementToast && (
        <AchievementToast
          visible
          title={achievementToast.title}
          onClose={() => dispatch({ type: "CLEAR_ACHIEVEMENT_TOAST" })}
        />
      )}
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header} accessibilityRole="header">
          Perfil
        </Text>
        <AchievementsPanel />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.base,
    gap: Spacing.large,
  },
  header: {
    ...Typography.h1,
    color: Colors.text,
  },
});
