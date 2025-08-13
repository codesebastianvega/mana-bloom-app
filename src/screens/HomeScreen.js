// [MB] Módulo: Home / Sección: HomeScreen
// Afecta: HomeScreen (layout principal)
// Propósito: Renderizar secciones de inicio y mostrar estado global
// Puntos de edición futura: conectar datos reales y navegación
// Autor: Codex - Fecha: 2025-08-13

import React, { useRef, useState, useCallback } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing } from "../theme";
import HomeScreenHeader from "../components/HomeScreenHeader";
import HomeWelcomeCard from "../components/home/HomeWelcomeCard";
import DailyRewardSection from "../components/home/DailyRewardSection";
import DailyChallengesSection from "../components/home/DailyChallengesSection";
import MagicShopSection from "../components/home/MagicShopSection";
import InventorySection from "../components/home/InventorySection";
import NewsFeedSection from "../components/home/NewsFeedSection";
import StatsQuickTiles from "../components/home/StatsQuickTiles";
import EventBanner from "../components/home/EventBanner";
import AchievementToast from "../components/common/AchievementToast";
import { useAppDispatch, useAchievementToast } from "../state/AppContext";

export default function HomeScreen() {
  const achievementToast = useAchievementToast();
  const dispatch = useAppDispatch();
  const scrollRef = useRef(null);
  const [anchors, setAnchors] = useState({});

  const setAnchor = useCallback(
    (key) => (e) => setAnchors((a) => ({ ...a, [key]: e.nativeEvent.layout.y })),
    []
  );
  const scrollToShop = useCallback(() => {
    scrollRef.current?.scrollTo({ y: anchors.shop, animated: true });
  }, [anchors.shop]);

  return (
    <SafeAreaView style={styles.container}>
      {achievementToast && (
        <AchievementToast
          visible
          title={achievementToast.title}
          onClose={() => dispatch({ type: "CLEAR_ACHIEVEMENT_TOAST" })}
        />
      )}
      <HomeScreenHeader />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View onLayout={setAnchor("welcome")}>
          <HomeWelcomeCard />
        </View>
        <View onLayout={setAnchor("reward")}>
          <DailyRewardSection />
        </View>
        <View onLayout={setAnchor("challenges")}>
          <DailyChallengesSection />
        </View>
        <View onLayout={setAnchor("shop")}>
          <MagicShopSection />
        </View>
        <View onLayout={setAnchor("inventory")}>
          <InventorySection onGoToShop={scrollToShop} />
        </View>
        <View onLayout={setAnchor("news")}>
          <NewsFeedSection />
        </View>
        <View onLayout={setAnchor("stats")}>
          <StatsQuickTiles />
        </View>
        <View onLayout={setAnchor("event")}>
          <EventBanner />
        </View>
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
  content: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    paddingBottom: 96,
    gap: Spacing.large,
  },
});
