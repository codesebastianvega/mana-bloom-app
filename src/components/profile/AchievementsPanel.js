// [MB] Módulo: Profile / Sección: AchievementsPanel
// Afecta: ProfileScreen
// Propósito: Mostrar logros listos para reclamar y en progreso en el perfil
// Puntos de edición futura: navegación a listado completo y estilos adicionales
// Autor: Codex - Fecha: 2025-08-13

import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./AchievementsPanel.styles";
import { useAppState, useAppDispatch, useHydrationStatus } from "../../state/AppContext";
import { ACHIEVEMENTS } from "../../constants/achievements";
import SectionPlaceholder from "../common/SectionPlaceholder";

export default function AchievementsPanel() {
  const { achievements, level, streak } = useAppState();
  const dispatch = useAppDispatch();
  const { isHydratingGlobal } = useHydrationStatus();

  if (isHydratingGlobal) {
    return <SectionPlaceholder height={220} />;
  }

  const list = ACHIEVEMENTS.map((a) => {
    let progress = 0;
    if (a.type === "count_event") {
      progress = achievements.progress[a.id]?.count || 0;
    } else if (a.type === "window_count") {
      progress = achievements.progress[a.id]?.timestamps?.length || 0;
    } else if (a.type === "reach_value") {
      progress = a.metric === "level" ? level : streak;
    }
    const unlocked = !!achievements.unlocked[a.id];
    const claimed = achievements.unlocked[a.id]?.claimed;
    return { ...a, progress, unlocked, claimed };
  });

  const unclaimed = list.filter((a) => a.unlocked && !a.claimed);
  const inProgress = list
    .filter((a) => !a.unlocked)
    .sort((a, b) => b.progress / b.goal - a.progress / a.goal);
  const claimed = list.filter((a) => a.claimed);
  const combined = [...unclaimed, ...inProgress, ...claimed];

  const handleClaim = (id) => {
    dispatch({ type: "CLAIM_ACHIEVEMENT", payload: { id } });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">Logros</Text>
      {combined.map((ach) => {
        const progressPct = Math.min(1, ach.progress / ach.goal);
        const progressText = `${Math.min(ach.progress, ach.goal)}/${ach.goal}`;
        const canClaim = ach.unlocked && !ach.claimed;
        const status = canClaim
          ? "Listo para reclamar"
          : ach.claimed
          ? "Reclamado"
          : "En progreso";
        return (
          <View key={ach.id} style={styles.card}>
            <Text style={styles.achievementTitle}>{ach.title}</Text>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${progressPct * 100}%` }]}
              />
            </View>
            <Text style={styles.progressText}>{progressText}</Text>
            {canClaim && (
              <Pressable
                onPress={() => handleClaim(ach.id)}
                style={styles.claimButton}
                accessibilityRole="button"
                accessibilityLabel={`Reclamar logro ${ach.title}`}
              >
                <Text style={styles.claimButtonText}>Reclamar</Text>
              </Pressable>
            )}
            <Text style={styles.statusText}>{status}</Text>
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
