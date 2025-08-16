// [MB] Módulo: Planta / Sección: Pantalla principal
// Afecta: PlantScreen
// Propósito: demo del hero de planta con métricas y acciones rápidas
// Puntos de edición futura: añadir header real y contenidos extra
// Autor: Codex - Fecha: 2025-08-16

import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import PlantHero from "../components/plant/PlantHero";
import CareMetrics from "../components/plant/CareMetrics";
import QuickActions from "../components/plant/QuickActions";
import GrowthProgress from "../components/plant/GrowthProgress";
import BuffsBar from "../components/plant/BuffsBar";
import { Colors, Spacing } from "../theme";

export default function PlantScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* [MB] Contenido scrollable para evitar notch y reservar espacio para FAB */}
      <ScrollView contentContainerStyle={styles.content}>
        {/* [MB] Hero de planta */}
        <PlantHero health={0.95} mood="floreciente" stage="brote" />
        {/* [MB] Métricas de cuidado */}
        <CareMetrics
          water={0.62}
          light={0.48}
          nutrients={0.3}
          mood={0.95}
          style={{ alignSelf: "stretch", marginTop: Spacing.large }}
        />
        {/* [MB] Acciones rápidas de cuidado */}
        <QuickActions
          canWater
          canFeed
          canClean
          canMeditate
          cooldowns={{ water: 0, feed: 0, clean: 0, meditate: 0 }}
          onAction={(key) => console.log("[MB] acción", key)}
        />
        {/* [MB] Progreso de crecimiento */}
        <GrowthProgress
          stage="brote"
          progress={0.62}
          etaText="faltan ~3 tareas"
          milestones={[
            { id: "m1", icon: "💧", title: "Regaste", delta: "+15 Agua", timestamp: Date.now() - 1000 * 60 * 20 },
            { id: "m2", icon: "🍃", title: "Aplicaste nutrientes", delta: "+10 Nutrientes", timestamp: Date.now() - 1000 * 60 * 90 },
            { id: "m3", icon: "🧘", title: "Meditaste", delta: "+10 Ánimo", timestamp: Date.now() - 1000 * 60 * 200 },
          ]}
          style={{ alignSelf: "stretch", marginTop: Spacing.large }}
        />
        {/* [MB] Barra de buffs activos (mock) */}
        <BuffsBar
          buffs={[
            { id: "b1", title: "XP", icon: "✨", multiplier: 1.2, timeRemainingMs: 120000, accentKey: "xp" },
            { id: "b2", title: "Maná", icon: "🔮", multiplier: 1.1, timeRemainingMs: 45000, accentKey: "mana" },
            { id: "b3", title: "Protección", icon: "🛡️", multiplier: 1.0, timeRemainingMs: 300000, accentKey: "shield" },
          ]}
          onExpire={(id) => console.log("[MB] buff expirado:", id)}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.large,
    paddingBottom: Spacing.large * 3,
    alignItems: "center",
  },
});

