// [MB] Módulo: Planta / Sección: Pantalla principal
// Afecta: PlantScreen
// Propósito: demo del hero de planta con safe area
// Puntos de edición futura: añadir header real y contenidos extra
// Autor: Codex - Fecha: 2025-08-15

import React from "react";
import { SafeAreaView, ScrollView, StyleSheet } from "react-native";
import PlantHero from "../components/plant/PlantHero";
import CareMetrics from "../components/plant/CareMetrics";
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

