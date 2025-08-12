// [MB] Módulo: Home / Pantalla: HomeScreen
// Afecta: HomeScreen (layout principal)
// Propósito: Renderizar secciones de inicio y mostrar estado global
// Puntos de edición futura: conectar datos reales y navegación
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { StyleSheet, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing } from "../theme";
import HomeScreenHeader from "../components/HomeScreenHeader";
import HomeWelcomeCard from "../components/home/HomeWelcomeCard";
import DailyChallengesSection from "../components/home/DailyChallengesSection";
import MagicShopSection from "../components/home/MagicShopSection";
import NewsFeedSection from "../components/home/NewsFeedSection";
import StatsQuickTiles from "../components/home/StatsQuickTiles";
import EventBanner from "../components/home/EventBanner";
import { useAppState } from "../state/AppContext";

export default function HomeScreen() {
  const { mana, plantState } = useAppState();

  return (
    <SafeAreaView style={styles.container}>
      <HomeScreenHeader userName="Jugador" manaCount={mana} plantState={plantState} />
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: Spacing.base,
          paddingBottom: 96,
        }}
      >
        <HomeWelcomeCard />
        <DailyChallengesSection />
        <MagicShopSection />
        <NewsFeedSection />
        <StatsQuickTiles />
        <EventBanner />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: Colors.background,
  },
});
