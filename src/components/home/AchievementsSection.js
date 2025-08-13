// [MB] Módulo: Home / Sección: AchievementsSection
// Afecta: HomeScreen
// Propósito: Mostrar logros desbloqueados y próximos a completar
// Puntos de edición futura: navegación a listado completo y mejoras visuales
// Autor: Codex - Fecha: 2025-08-17

import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./AchievementsSection.styles";
import {
  useTopAchievements,
  useAppDispatch,
  useHydrationStatus,
} from "../../state/AppContext";
import SectionPlaceholder from "./SectionPlaceholder";

export default function AchievementsSection() {
  const dispatch = useAppDispatch();
  const achievements = useTopAchievements();
  const hydration = useHydrationStatus();

  if (hydration.achievements) {
    return <SectionPlaceholder height={220} />;
  }

  const handleClaim = (id) => {
    dispatch({ type: "CLAIM_ACHIEVEMENT", payload: { id } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        Logros
      </Text>
      {achievements.map((ach) => {
        const progressPct = Math.min(1, ach.progress / ach.goal);
        const canClaim = ach.unlocked && !ach.claimed;
        const progressText = `${Math.min(ach.progress, ach.goal)}/${ach.goal}`;
        return (
          <View key={ach.id} style={styles.card}>
            <Text style={styles.achievementTitle}>{ach.title}</Text>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${progressPct * 100}%` }]}
              />
            </View>
            <Text style={styles.progressText}>{progressText}</Text>
            {canClaim ? (
              <Pressable
                onPress={() => handleClaim(ach.id)}
                style={styles.claimButton}
                accessibilityRole="button"
                accessibilityLabel={`Reclamar logro ${ach.title}`}
              >
                <Text style={styles.claimButtonText}>Reclamar</Text>
              </Pressable>
            ) : ach.unlocked ? (
              <Text style={styles.readyText}>Listo para reclamar</Text>
            ) : null}
          </View>
        );
      })}
      <Pressable
        onPress={() => {}}
        style={styles.viewAllButton}
        accessibilityRole="button"
        accessibilityLabel="Ver todos los logros"
      >
        <Text style={styles.viewAllText}>Ver todos</Text>
      </Pressable>
    </View>
  );
}
