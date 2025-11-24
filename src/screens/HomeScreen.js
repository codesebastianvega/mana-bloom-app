// [MB] Modulo: Home / Seccion: HomeScreen
// Afecta: HomeScreen (layout principal)
// Proposito: Renderizar secciones de inicio y mostrar estado global
// Puntos de edicion futura: conectar datos reales y navegacion
// Autor: Codex - Fecha: 2025-02-15

import React, { useRef, useState, useCallback } from "react";
import { StyleSheet, ScrollView, View, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors, Spacing } from "../theme";
import HomeHeader from "../components/home/HomeHeader";
import HomeWelcomeCard from "../components/home/HomeWelcomeCard";
import PromoBannerSlider from "../components/home/PromoBannerSlider";
import DailyChallengesSection from "../components/home/DailyChallengesSection";
import MagicShopSection from "../components/home/MagicShopSection";
import InventorySection from "../components/home/InventorySection";
import EventHighlightsSection from "../components/home/EventHighlightsSection";
import AchievementToast from "../components/common/AchievementToast";
import HomeHeroSection from "../components/home/HomeHeroSection";
import HomeRewardsSection from "../components/home/HomeRewardsSection";
import {
  useAppDispatch,
  useAchievementToast,
  useAppState,
  useDailyReward,
  useHydrationStatus,
} from "../state/AppContext";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const achievementToast = useAchievementToast();
  const dispatch = useAppDispatch();
  const { streak } = useAppState();
  const dailyReward = useDailyReward();
  const { modules } = useHydrationStatus();
  const scrollRef = useRef(null);
  const headerRef = useRef(null);
  const [anchors, setAnchors] = useState({});
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
    navigation.navigate("TasksScreen");
  }, [navigation]);

  const handleClaimReward = useCallback(() => {
    dispatch({ type: "CLAIM_TODAY_REWARD" });
  }, [dispatch]);

  const handleOpenSocialRewards = useCallback(() => {
    navigation.navigate("Rewards");
  }, [navigation]);

  const rewardState = dailyReward.claimed ? "claimed" : "available";
  const rewardLabel = dailyReward.reward?.title || "";
  const isRewardsHydrating = modules.wallet;

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
        onChipPopoverToggle={setChipPopoverOpen}
      />
      <View style={styles.contentWrapper}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          importantForAccessibility={
            isChipPopoverOpen ? "no-hide-descendants" : "auto"
          }
          accessibilityElementsHidden={isChipPopoverOpen}
        >
          <View onLayout={setAnchor("welcome")}>
            <HomeWelcomeCard onNext={goToTasks} />
          </View>
          <PromoBannerSlider />
          <View onLayout={setAnchor("hero")}>
            <HomeHeroSection />
          </View>
          <View onLayout={setAnchor("rewards")}>
            <HomeRewardsSection
              rewardState={rewardState}
              streakCount={streak}
              rewardLabel={rewardLabel}
              onClaimReward={handleClaimReward}
              onPressSocial={handleOpenSocialRewards}
              isHydrating={isRewardsHydrating}
            />
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
          <View onLayout={setAnchor("event")}>
            <EventHighlightsSection />
          </View>
        </ScrollView>
        {isChipPopoverOpen && (
          <Pressable
            accessible={false}
            pointerEvents="auto"
            style={[StyleSheet.absoluteFillObject, styles.overlay]}
            onPress={() => headerRef.current?.closePopover()}
          />
        )}
      </View>
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
  contentWrapper: {
    flex: 1,
    position: "relative",
  },
  overlay: {
    backgroundColor: Colors.overlay,
    zIndex: 1,
  },
});


