// [MB] Modulo: Profile / Seccion: ProfileScreen
// Afecta: ProfileScreen
// Proposito: Layout visual del perfil con secciones jerarquizadas
// Puntos de edicion futura: conectar con contexto real y navegacion
// Autor: Codex - Fecha: 2025-10-21

import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  ImageBackground,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AchievementToast from "../components/common/AchievementToast";
import {
  useAchievementToast,
  useAppDispatch,
  useAppState,
  useInventoryCounts,
} from "../state/AppContext";
import useProfileMock from "./profile/useProfileMock";
import styles from "./ProfileScreen.styles";
import AchievementsPanel from "../components/profile/AchievementsPanel";
import AchievementsModal from "../components/profile/AchievementsModal";
import { getAllAchievements } from "../constants/achievements";
import { getJournalEntries, getVisualizeEntries } from "../storage";

export default function ProfileScreen() {
  const navigation = useNavigation();
  const achievementToast = useAchievementToast();
  const dispatch = useAppDispatch();
  const { achievements: achievementState, level, streak } = useAppState();
  const { profile, stats, progress, actions, levelHint } = useProfileMock();

  const xpPercent = Math.min(
    1,
    profile.xpTarget ? profile.xpCurrent / profile.xpTarget : 0
  );
  const [modalVisible, setModalVisible] = useState(false);
  const [visualizeEntries, setVisualizeEntries] = useState([]);
  const [journalLogEntries, setJournalLogEntries] = useState([]);
  const counts = useInventoryCounts();

  useEffect(() => {
    let mounted = true;
    const loadEntries = async () => {
      try {
        const [viz, journalLog] = await Promise.all([
          getVisualizeEntries(),
          getJournalEntries(),
        ]);
        if (!mounted) return;
        setVisualizeEntries(viz || []);
        setJournalLogEntries(journalLog || []);
      } catch (error) {
        console.warn("[MB] No se pudieron cargar entradas de diario", error);
      }
    };
    loadEntries();
    return () => {
      mounted = false;
    };
  }, []);

  const resourceChips = useMemo(
    () => [
      {
        id: "pets",
        label: "Mascotas",
        value: counts.pets,
        accent: "#FFB347",
      },
      {
        id: "seeds",
        label: "Plantas",
        value: counts.seeds,
        accent: "#80deea",
      },
      {
        id: "potions",
        label: "Pociones",
        value: counts.potions,
        accent: "#B542F6",
      },
      {
        id: "tools",
        label: "Herramientas",
        value: counts.tools,
        accent: "#1cd47b",
      },
    ],
    [counts]
  );

  const plantHealth = progress.find((item) => item.id === "health");
  const efficiencyMetric = progress.find((item) => item.id === "efficiency");

  const percentFromLabel = useCallback((value, fallback = 0.5) => {
    if (typeof value === "number") {
      return Math.max(0, Math.min(1, value));
    }
    if (typeof value === "string") {
      const match = value.match(/(\d+)/);
      if (match) {
        return Math.max(0, Math.min(1, Number(match[1]) / 100));
      }
    }
    return fallback;
  }, []);

  const plantHealthPct = percentFromLabel(plantHealth?.value, 0.85);
  const gardenPhasePct = percentFromLabel(levelHint?.progress ?? 0.6);
  const ritualMomentumPct = percentFromLabel(efficiencyMetric?.value, 0.45);

  const handleGoToGarden = useCallback(() => {
    navigation.navigate("Garden");
  }, [navigation]);

  const handleOpenInventory = useCallback(() => {
    navigation.navigate("InventoryModal");
  }, [navigation]);

  const handleOpenSubs = useCallback(() => {
    navigation.navigate("ShopScreen", { initialTab: "subs" });
  }, [navigation]);

  const bannerCards = useMemo(
    () => [
      {
        id: "garden",
        title: "Jardín Místico",
        subtitle: "Cocoa te espera entre las flores",
        image: require("../../assets/banners/daycocoa.png"),
        cta: "Ir al jardín",
        onPress: handleGoToGarden,
      },
      {
        id: "inventory",
        title: "Inventario vivo",
        subtitle: "Revisa tus tesoros mágicos",
        image: require("../../assets/banners/bannerinventory.png"),
        cta: "Abrir inventario",
        onPress: handleOpenInventory,
      },
      {
        id: "passes",
        title: "Pases y suscripciones",
        subtitle: "Impulsa tu progresión",
        image: require("../../assets/banners/bannerpasessubs.png"),
        cta: "Ver pases",
        onPress: handleOpenSubs,
      },
    ],
    [handleGoToGarden, handleOpenInventory, handleOpenSubs]
  );

  const achievementsFull = useMemo(() => {
    if (!achievementState) return [];
    const allAchievements = getAllAchievements() || [];
    const list = allAchievements.map((achievement) => {
      let progressValue = 0;
      if (achievement.type === "count_event") {
        progressValue =
          achievementState.progress[achievement.id]?.count || 0;
      } else if (achievement.type === "window_count") {
        progressValue =
          achievementState.progress[achievement.id]?.timestamps?.length || 0;
      } else if (achievement.type === "reach_value") {
        progressValue =
          achievement.metric === "level" ? level : streak;
      }
      const unlocked = !!achievementState.unlocked[achievement.id];
      const claimed = achievementState.unlocked[achievement.id]?.claimed;
      return {
        ...achievement,
        progress: progressValue,
        unlocked,
        claimed,
      };
    });
    const unclaimed = list.filter((a) => a.unlocked && !a.claimed);
    const inProgress = list
      .filter((a) => !a.unlocked)
      .sort(
        (a, b) => b.progress / b.goal - a.progress / a.goal
      );
    const claimed = list.filter((a) => a.claimed);
    return [...unclaimed, ...inProgress, ...claimed];
  }, [achievementState, level, streak]);

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
        <View style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <LinearGradient
              colors={["#B542F6", "#1cd47bff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.avatarGradient}
            >
              <View style={styles.avatar}>
                <Text style={styles.avatarGlyph}>{profile.avatarEmoji}</Text>
              </View>
            </LinearGradient>
            <View style={styles.heroInfo}>
              <View style={styles.nameRow}>
                <Text style={styles.heroName}>{profile.name}</Text>
                <Pressable hitSlop={12}>
                  <FontAwesome5
                    name="pen"
                    size={14}
                    color={styles.heroRank.color}
                  />
                </Pressable>
              </View>
              <View style={styles.rankRow}>
                <FontAwesome5
                  name="crown"
                  size={12}
                  color={styles.heroRank.color}
                  solid
                />
                <Text style={styles.heroRank}>{profile.rank}</Text>
              </View>
              <Text style={styles.heroSub}>
                {profile.daysInAcademy} días en la academia mágica
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.multiProgressCard}>
          <Text style={styles.sectionTitle}>Progreso global</Text>
          <View style={styles.multiProgressRow}>
            <View style={styles.multiProgressHeader}>
              <Text style={styles.multiProgressLabel}>Nivel {profile.level}</Text>
              <Text style={styles.multiProgressHint}>
                {profile.xpCurrent}/{profile.xpTarget} XP
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFillLevel, { width: `${xpPercent * 100}%` }]}
              />
            </View>
          </View>
          <View style={styles.multiProgressRow}>
            <View style={styles.multiProgressHeader}>
              <Text style={styles.multiProgressLabel}>Salud de la planta</Text>
              <Text style={styles.multiProgressHint}>
                {plantHealth?.hint || "Floreciente"}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFillPlant, { width: `${plantHealthPct * 100}%` }]}
              />
            </View>
          </View>
          <View style={styles.multiProgressRow}>
            <View style={styles.multiProgressHeader}>
              <Text style={styles.multiProgressLabel}>Rituales y jardín</Text>
              <Text style={styles.multiProgressHint}>
                {efficiencyMetric?.hint || "En marcha"}
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFillPhase,
                  {
                    width: `${
                      Math.max(gardenPhasePct, ritualMomentumPct) * 100
                    }%`,
                  },
                ]}
              />
            </View>
          </View>
          <View style={styles.levelCallout}>
            <View style={styles.levelCalloutHeader}>
              <FontAwesome5 name="bolt" size={14} color="#ffca28" />
              <Text style={styles.levelCalloutTitle}>{levelHint.title}</Text>
            </View>
            <Text style={styles.levelCalloutMessage}>{levelHint.message}</Text>
            <View style={styles.levelCalloutBar}>
              <View
                style={[
                  styles.levelCalloutFill,
                  { width: `${Math.min(1, levelHint.progress) * 100}%` },
                ]}
              />
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          {(stats || []).map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Jardín y colecciones</Text>
            <Text style={styles.sectionCounter}>Inventario vivo</Text>
          </View>
          <View style={styles.chipRow}>
            {resourceChips.map((chip) => (
              <View
                key={chip.id}
                style={[styles.chip, { borderColor: chip.accent }]}
              >
                <Text style={styles.chipLabel}>{chip.label}</Text>
                <Text style={[styles.chipValue, { color: chip.accent }]}>
                  {chip.value}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.bannerGrid}>
            {bannerCards.map((banner) => (
              <Pressable
                key={banner.id}
                onPress={banner.onPress}
                style={styles.bannerCard}
              >
                <ImageBackground
                  source={banner.image}
                  imageStyle={styles.bannerImage}
                  style={styles.bannerImage}
                >
                  <View style={styles.bannerOverlay} />
                  <View style={styles.bannerContent}>
                    <View>
                      <Text style={styles.bannerTitle}>{banner.title}</Text>
                      <Text style={styles.bannerSubtitle}>{banner.subtitle}</Text>
                    </View>
                    <View style={styles.bannerCta}>
                      <Text style={styles.bannerCtaText}>{banner.cta}</Text>
                      <FontAwesome5 name="arrow-right" size={12} color="#ffffff" />
                    </View>
                  </View>
                </ImageBackground>
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Logros mágicos</Text>
            <Pressable
              onPress={() => setModalVisible(true)}
              style={styles.sectionLink}
            >
              <Text style={styles.sectionLinkText}>Ver todos</Text>
            </Pressable>
          </View>
          <View style={styles.achievementHighlight}>
            <View style={styles.achievementBadge}>
              <FontAwesome5
                name="star"
                size={14}
                color={styles.achievementTitle.color}
              />
            </View>
            <View style={styles.achievementText}>
              <Text style={styles.achievementTitle}>Maestro de Tareas</Text>
              <Text style={styles.achievementSubtitle}>
                Completa 50 tareas
              </Text>
            </View>
            <View style={styles.achievementTag}>
              <Text style={styles.achievementTagText}>Próximo</Text>
            </View>
          </View>
          <AchievementsPanel limit={3} />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Progreso personal</Text>
          </View>
          {(progress || []).map((item) => (
            <View key={item.id} style={styles.progressRow}>
              <View style={styles.progressIcon}>
                <FontAwesome5
                  name={item.icon}
                  size={14}
                  color={styles.progressLabel.color}
                />
              </View>
              <View style={styles.progressText}>
                <Text style={styles.progressLabel}>{item.label}</Text>
                <Text style={styles.progressHint}>{item.hint}</Text>
              </View>
              <Text style={styles.progressValue}>{item.value}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Diario personal</Text>
          </View>
          {journalLogEntries.length === 0 && visualizeEntries.length === 0 ? (
            <Text style={styles.diaryEmpty}>
              Aún no registras notas ni visiones. Empieza un ritual para
              desbloquear este espacio.
            </Text>
          ) : (
            <>
              {journalLogEntries.slice(0, 2).map((entry) => (
                <View key={entry.createdAt} style={styles.diaryEntry}>
                  <View style={styles.diaryTag}>
                    <Text style={styles.diaryTagText}>Nota</Text>
                  </View>
                  <Text style={styles.diaryTitle}>
                    {entry.title || "Entrada sin título"}
                  </Text>
                  <Text style={styles.diaryBody}>{entry.note}</Text>
                  <Text style={styles.diaryDate}>
                    {formatDate(entry.createdAt)}
                  </Text>
                </View>
              ))}
              {visualizeEntries.slice(0, 2).map((entry) => (
                <View key={entry.createdAt || entry.id} style={styles.diaryEntry}>
                  <View style={[styles.diaryTag, styles.diaryTagVision]}>
                    <Text style={styles.diaryTagText}>Visión</Text>
                  </View>
                  <Text style={styles.diaryBody}>{entry.text}</Text>
                  <Text style={styles.diaryDate}>
                    {formatDate(entry.createdAt)}
                  </Text>
                </View>
              ))}
            </>
          )}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Acciones suaves</Text>
          </View>
          {(actions || []).map((action) => (
            <Pressable key={action.id} style={styles.actionRow}>
              <View style={styles.actionIcon}>
                <FontAwesome5 name={action.icon} size={14} color="#80deea" />
              </View>
              <Text style={styles.actionLabel}>{action.label}</Text>
              <FontAwesome5
                name="chevron-right"
                size={12}
                color={styles.actionLabel.color}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
      <AchievementsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        achievements={achievementsFull}
      />
    </SafeAreaView>
  );
}

function formatDate(value) {
  if (!value) return "Reciente";
  try {
    const date = new Date(value);
    return date.toLocaleDateString("es-CO", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "Reciente";
  }
}
