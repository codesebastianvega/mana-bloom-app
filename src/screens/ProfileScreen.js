// [MB] Modulo: Profile / Seccion: ProfileScreen
// Afecta: ProfileScreen
// Proposito: Layout visual del perfil con secciones jerarquizadas
// Puntos de edicion futura: conectar con contexto real y navegacion
// Autor: Codex - Fecha: 2025-10-21

import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  Switch,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import AchievementToast from "../components/common/AchievementToast";
import { useAchievementToast, useAppDispatch, useAppState } from "../state/AppContext";
import useProfileMock from "./profile/useProfileMock";
import styles from "./ProfileScreen.styles";
import AchievementsPanel from "../components/profile/AchievementsPanel";
import AchievementsModal from "../components/profile/AchievementsModal";
import { ACHIEVEMENTS } from "../constants/achievements";

export default function ProfileScreen() {
  const achievementToast = useAchievementToast();
  const dispatch = useAppDispatch();
  const { achievements: achievementState, level, streak } = useAppState();
  const { profile, stats, progress, settings, actions, levelHint } =
    useProfileMock();

  const xpPercent = Math.min(
    1,
    profile.xpTarget ? profile.xpCurrent / profile.xpTarget : 0
  );
  const [modalVisible, setModalVisible] = useState(false);

  const achievementsFull = useMemo(() => {
    if (!achievementState) return [];
    const list = ACHIEVEMENTS.map((achievement) => {
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
                {profile.daysInAcademy} d�as en la academia m�gica
              </Text>
            </View>
          </View>

          <View style={styles.heroProgressCard}>
            <View style={styles.levelRow}>
              <View style={styles.levelChip}>
                <Text style={styles.levelChipText}>Nivel {profile.level}</Text>
              </View>
              <Text style={styles.progressValue}>
                {profile.xpCurrent}/{profile.xpTarget} XP
              </Text>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[styles.progressFill, { width: `${xpPercent * 100}%` }]}
              />
            </View>
          </View>
        </View>

        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <View key={stat.id} style={styles.statCard}>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Logros m�gicos</Text>
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
              <Text style={styles.achievementTagText}>Pr�ximo</Text>
            </View>
          </View>
          <AchievementsPanel limit={3} />
        </View>

        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Progreso personal</Text>
          </View>
          {progress.map((item) => (
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
            <Text style={styles.sectionTitle}>Configuraci�n m�gica</Text>
          </View>
          {settings.map((item) => (
            <View key={item.id} style={styles.settingRow}>
              <View style={styles.settingText}>
                <Text style={styles.settingLabel}>{item.label}</Text>
                <Text style={styles.settingHint}>{item.description}</Text>
              </View>
              <Switch
                value={item.value}
                onValueChange={item.onChange}
                trackColor={{ false: "rgba(255,255,255,0.15)", true: "#7e57c2" }}
                thumbColor={item.value ? "#ffffff" : "#b0bec5"}
              />
            </View>
          ))}
        </View>

        <View style={styles.sectionCard}>
          {actions.map((action) => (
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
      </ScrollView>
      <AchievementsModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        achievements={achievementsFull}
      />
    </SafeAreaView>
  );
}





