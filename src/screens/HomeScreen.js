// [MB] Módulo: Home / Sección: HomeScreen
// Afecta: HomeScreen (layout principal)
// Propósito: Renderizar secciones de inicio y mostrar estado global
// Puntos de edición futura: conectar datos reales y navegación
// Autor: Codex - Fecha: 2025-08-14

import React, { useRef, useState, useCallback } from "react";
import { StyleSheet, ScrollView, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing } from "../theme";
import HomeHeader from "../components/home/HomeHeader";
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
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const achievementToast = useAchievementToast();
  const dispatch = useAppDispatch();
  const scrollRef = useRef(null);
  const headerRef = useRef(null);
  const [anchors, setAnchors] = useState({});
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isChipPopoverOpen, setChipPopoverOpen] = useState(false);
  const navigation = useNavigation();

  const setAnchor = useCallback(
    (key) => (e) => {
      const y = e?.nativeEvent?.layout?.y;
      if (typeof y === "number") {
        setAnchors((a) => ({ ...a, [key]: y }));
      }
    },
    []
  );
  const scrollToShop = useCallback(() => {
    scrollRef.current?.scrollTo({ y: anchors.shop, animated: true });
  }, [anchors.shop]);

  const goToTasks = useCallback(() => {
    navigation.navigate("Tasks");
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      {achievementToast && (
        <AchievementToast
          visible
          title={achievementToast.title}
          onClose={() => dispatch({ type: "CLEAR_ACHIEVEMENT_TOAST" })}
        />
      )}
      <HomeHeader
        ref={headerRef}
        onHeaderLayout={(e) =>
          setHeaderHeight(e?.nativeEvent?.layout?.height || 0)
        }
        onChipPopoverToggle={setChipPopoverOpen}
      />
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
      >
        <View onLayout={setAnchor("welcome")}>
          <HomeWelcomeCard onNext={goToTasks} />
        </View>
        <View>
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
      {isChipPopoverOpen && (
        <Pressable
          style={[styles.overlay, { top: headerHeight }]}
          onPress={() => headerRef.current?.closePopover()}
          accessibilityRole="button"
          accessibilityLabel="Capa de fondo: toque para cerrar popover"
        />
      )}
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
  overlay: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.overlay,
  },
});
