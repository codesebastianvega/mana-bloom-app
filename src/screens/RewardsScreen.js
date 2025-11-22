// [MB] Modulo: Home / Seccion: RewardsScreen
// Afecta: flujo de Recompensas
// Proposito: Modal social con calendario/promo y acciones recompensadas
// Puntos de edicion futura: conectar con API social y deep links reales
// Autor: Codex - Fecha: 2025-10-15

import React, { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./RewardsScreen.styles";
import { Colors } from "../theme";

const SECTIONS = [
  {
    key: "social",
    title: "Social",
    accent: "#B542F6",
    items: [
      {
        title: "Seguir en Instagram",
        reward: "+10 gemas",
        icon: "logo-instagram",
        frequency: "Diario",
        isNew: true,
      },
      {
        title: "Unirte a Discord",
        reward: "+1 buff (24h)",
        icon: "logo-discord",
        frequency: "Mensual",
      },
      {
        title: "Compartir tu story con #ManaBloom",
        reward: "+15 XP",
        icon: "share-social",
        frequency: "Semanal",
      },
      {
        title: "Enviar un tip de productividad",
        reward: "Skin exclusiva",
        icon: "megaphone",
        frequency: "Mensual",
      },
      {
        title: "Participar en la quedada semanal",
        reward: "+20 mana",
        icon: "calendar",
        frequency: "Semanal",
        isNew: true,
      },
    ],
  },
  {
    key: "share",
    title: "Compartir & Referidos",
    accent: "#1cd47b",
    items: [
      {
        title: "Compartir tu link",
        reward: "+15 mana",
        icon: "share-social",
        frequency: "Diario",
      },
      {
        title: "Invitar a un amigo (1a misión)",
        reward: "+20 XP",
        icon: "gift",
        frequency: "Semanal",
      },
      {
        title: "Invitar a 3 amigos (completan 1 misión)",
        reward: "+30 gemas",
        icon: "people",
        frequency: "Mensual",
      },
      {
        title: "Publicar reseña en App Store/Play",
        reward: "Maceta exclusiva",
        icon: "star",
        frequency: "Mensual",
      },
      {
        title: "Co-crear un post en Discord",
        reward: "+1 buff social",
        icon: "chatbubble-ellipses",
        frequency: "Semanal",
        isNew: true,
      },
    ],
  },
  {
    key: "progress",
    title: "Progresión",
    accent: "#FFD54F",
    items: [
      {
        title: "Completar 5 tareas hoy",
        reward: "+50 XP",
        icon: "checkmark-done",
        frequency: "Diario",
        isNew: true,
      },
      {
        title: "Racha de 7 días",
        reward: "+100 XP",
        icon: "flame",
        frequency: "Semanal",
      },
      {
        title: "Ayudar a un amigo con su plan",
        reward: "+25 mana",
        icon: "hand-left",
        frequency: "Semanal",
      },
      {
        title: "Reportar un bug o idea",
        reward: "+10 gemas",
        icon: "bug",
        frequency: "Mensual",
        isNew: true,
      },
      {
        title: "Completar 3 misiones sociales",
        reward: "+1 buff legendario",
        icon: "trophy",
        frequency: "Mensual",
      },
    ],
  },
];

const PROMO = {
  title: "Promo del Festival",
  description: "Durante el Festival Solar, herramientas -10% mana.",
  icon: "sparkles",
  accent: "#1cd47b",
  targetTab: "tools",
};

const FREQUENCY_COLORS = {
  Diario: "#66F2D7",
  Semanal: "#FFD36F",
  Mensual: "#C38BFF",
};

const getFrequencyColor = (frequency) =>
  FREQUENCY_COLORS[frequency] || "#B4C5FF";

function hexToRgba(hex = "", alpha = 1) {
  if (!hex) return undefined;
  let cleaned = hex.replace("#", "");
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split("")
      .map((char) => `${char}${char}`)
      .join("");
  }
  if (cleaned.length !== 6) return undefined;
  const intVal = parseInt(cleaned, 16);
  const r = (intVal >> 16) & 255;
  const g = (intVal >> 8) & 255;
  const b = intVal & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function RewardsScreen() {
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState(SECTIONS[0].key);
  const activeSection = useMemo(
    () => SECTIONS.find((section) => section.key === activeCategory),
    [activeCategory]
  );
  const timelineItems = useMemo(
    () =>
      SECTIONS.flatMap((section) =>
        section.items.map((item) => ({
          ...item,
          accent: section.accent,
        }))
      ),
    []
  );

  const handleClose = () => navigation.goBack();
  const handleOpenPromo = () =>
    navigation.navigate("ShopScreen", { initialTab: PROMO.targetTab });

  return (
    <SafeAreaView style={styles.backdrop}>
      <Pressable
        style={styles.backdropDismiss}
        onPress={handleClose}
        accessibilityRole="button"
        accessibilityLabel="Cerrar modal"
      />
      <View style={styles.sheet}>
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title} accessibilityRole="header">
              Misiones sociales
            </Text>
            <Text style={styles.subtitle}>
              Completa acciones comunitarias para desbloquear recompensas.
            </Text>
          </View>
          <Pressable
            onPress={handleClose}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Cerrar"
          >
            <Ionicons name="close" size={18} color={Colors.text} />
          </Pressable>
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryChips}
          >
            {SECTIONS.map((section) => {
              const isActive = section.key === activeCategory;
              return (
                <Pressable
                  key={section.key}
                  onPress={() => setActiveCategory(section.key)}
                  style={[
                    styles.categoryChip,
                    isActive && {
                      backgroundColor: hexToRgba(section.accent, 0.18),
                      borderColor: hexToRgba(section.accent, 0.6),
                    },
                  ]}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: isActive }}
                  accessibilityLabel={`Ver ${section.title}`}
                >
                  <Ionicons
                    name="sparkles"
                    size={14}
                    color={isActive ? section.accent : Colors.textMuted}
                  />
                  <Text
                    style={[
                      styles.categoryChipText,
                      {
                        color: isActive
                          ? section.accent
                          : Colors.textMuted,
                      },
                    ]}
                  >
                    {section.title}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carousel}
          >
            {(activeSection?.items || []).map((item) => {
              const frequencyColor = getFrequencyColor(item.frequency);
              return (
                <LinearGradient
                  key={item.title}
                  colors={[
                    hexToRgba(activeSection.accent, 0.35),
                    hexToRgba(activeSection.accent, 0.12),
                  ]}
                  start={{ x: 0, y: 0.1 }}
                  end={{ x: 1, y: 1 }}
                  style={[
                    styles.carouselCard,
                    { borderColor: hexToRgba(activeSection.accent, 0.4) },
                  ]}
                  accessibilityRole="summary"
                >
                  <View style={styles.carouselHeader}>
                    <View
                      style={[
                        styles.carouselIcon,
                        { backgroundColor: hexToRgba(activeSection.accent, 0.75) },
                      ]}
                    >
                      <Ionicons name={item.icon} size={20} color={Colors.onAccent} />
                    </View>
                    <View style={styles.badgeRow}>
                      {item.frequency && (
                        <View
                          style={[
                            styles.badge,
                            {
                              borderColor: hexToRgba(frequencyColor, 0.6),
                              backgroundColor: hexToRgba(frequencyColor, 0.18),
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.badgeText,
                              { color: hexToRgba(frequencyColor, 0.95) },
                            ]}
                          >
                            {item.frequency}
                          </Text>
                        </View>
                      )}
                      {item.isNew && (
                        <View style={styles.newBadge}>
                          <Text style={styles.newBadgeText}>Nuevo</Text>
                        </View>
                      )}
                    </View>
                  </View>
                  <Text style={styles.carouselTitle}>{item.title}</Text>
                  <View
                    style={[
                      styles.carouselChip,
                      { backgroundColor: hexToRgba(activeSection.accent, 0.25) },
                    ]}
                  >
                    <Text style={styles.carouselChipText}>{item.reward}</Text>
                  </View>
                </LinearGradient>
              );
            })}
          </ScrollView>

          <View style={styles.timeline}>
            {timelineItems.map((item, index) => {
              const frequencyColor = getFrequencyColor(item.frequency);
              return (
                <View key={`${item.title}-${index}`} style={styles.timelineRow}>
                  <View style={styles.timelineMarkerWrap}>
                    <View
                      style={[
                        styles.timelineMarker,
                        { borderColor: hexToRgba(item.accent, 0.6) },
                      ]}
                    >
                      <Ionicons
                        name={item.icon}
                        size={12}
                        color={hexToRgba(item.accent, 0.9)}
                      />
                    </View>
                    {index < timelineItems.length - 1 && (
                      <View style={styles.timelineConnector} />
                    )}
                  </View>
                  <View style={styles.timelineText}>
                    <Text style={styles.timelineTitle}>{item.title}</Text>
                    <Text
                      style={[
                        styles.timelineReward,
                        { color: hexToRgba(item.accent, 0.9) },
                      ]}
                    >
                      {item.reward}
                    </Text>
                    <View style={styles.timelineBadges}>
                      {item.frequency && (
                        <View
                          style={[
                            styles.badge,
                            {
                              borderColor: hexToRgba(frequencyColor, 0.6),
                              backgroundColor: hexToRgba(frequencyColor, 0.18),
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.badgeText,
                              { color: hexToRgba(frequencyColor, 0.95) },
                            ]}
                          >
                            {item.frequency}
                          </Text>
                        </View>
                      )}
                      {item.isNew && (
                        <View style={styles.newBadge}>
                          <Text style={styles.newBadgeText}>Nuevo</Text>
                        </View>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          <LinearGradient
            onPress={handleOpenPromo}
            colors={[
              hexToRgba(PROMO.accent, 0.35),
              hexToRgba(PROMO.accent, 0.12),
            ]}
            start={{ x: 0, y: 0.1 }}
            end={{ x: 1, y: 1 }}
            style={[styles.promoCard, { borderColor: hexToRgba(PROMO.accent, 0.4) }]}
            accessibilityRole="button"
            accessibilityLabel="Abrir tienda del festival"
          >
            <View
              style={[
                styles.promoIcon,
                { backgroundColor: hexToRgba(PROMO.accent, 0.85) },
              ]}
            >
              <Ionicons name={PROMO.icon} size={18} color={Colors.onAccent} />
            </View>
            <View style={styles.promoText}>
              <Text style={styles.promoTitle}>{PROMO.title}</Text>
              <Text style={styles.promoDescription}>{PROMO.description}</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color={Colors.textMuted} />
          </LinearGradient>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

