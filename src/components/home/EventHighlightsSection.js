// [MB] Modulo: Home / Seccion: Event Highlights
// Afecta: HomeScreen
// Proposito: Mostrar calendario cercano y promo de tienda vinculada a eventos
// Puntos de edicion futura: conectar con API de eventos y promociones dinamicas
// Autor: Codex - Fecha: 2025-10-15

import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import styles from "./EventHighlightsSection.styles";
import { useHydrationStatus } from "../../state/AppContext";
import SectionPlaceholder from "../common/SectionPlaceholder";
import { Colors, CategoryAccents } from "../../theme";

const withAlpha = (hex = "", alpha = 1) => {
  if (!hex) return hex;
  const cleaned = `${hex}`.replace("#", "").trim();
  const base = cleaned.length === 8 ? cleaned.slice(0, 6) : cleaned;
  if (base.length !== 6) {
    return hex;
  }
  const value = parseInt(base, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const getAccent = (key) => CategoryAccents[key] || Colors.accent;

const TIMELINE = [
  {
    key: "moon",
    title: "Luna Llena: XP Doble",
    date: "Viernes",
    accentKey: "potions",
    badge: null,
  },
  {
    key: "alchemy",
    title: "Torneo de Alquimia",
    date: "Sábado",
    accentKey: "cosmetics",
    badge: null,
  },
  {
    key: "season",
    title: "Temporada de Escarcha",
    date: "En 3 días",
    accentKey: "tools",
    badge: "Temporada",
  },
];

function EventHighlightsSection() {
  const { modules } = useHydrationStatus();
  const navigation = useNavigation();

  // Temporarily disabled hydration check
  // if (modules.news) {
  //   return <SectionPlaceholder height={220} />;
  // }

  const handleViewCalendar = () => {
    const state = navigation.getState?.();
    const routeNames = state?.routeNames || [];
    if (routeNames.includes("EventsCalendarModal")) {
      navigation.navigate("EventsCalendarModal");
      return;
    }
    navigation.navigate("NewsInboxModal");
  };

  return (
    <LinearGradient
      colors={["rgba(64,93,179,0.35)", "rgba(16,25,54,0.9)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.titleBlock}>
            <View style={styles.titleIconRow}>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={16}
                color={Colors.text}
              />
              <Text style={styles.title} accessibilityRole="header">
                Eventos Misticos
              </Text>
            </View>
            <Text style={styles.subtitle}>Se reinician en 4h</Text>
          </View>
        </View>

        <View style={styles.timeline} accessibilityRole="list">
          {TIMELINE.map((item, idx) => {
            const accentColor = getAccent(item.accentKey);
            const connectorColor = withAlpha(accentColor, 0.35);
            const isLast = idx === TIMELINE.length - 1;
            return (
              <View key={item.key} style={styles.timelineRow}>
                <View style={styles.dotColumn}>
                  <View style={[styles.dot, { backgroundColor: accentColor }]} />
                  {!isLast ? (
                    <View
                      style={[styles.connector, { backgroundColor: connectorColor }]}
                    />
                  ) : null}
                </View>
                <View style={styles.timelineText}>
                  <View style={styles.rowBetween}>
                    <Text style={styles.timelineTitle}>{item.title}</Text>
                    {item.badge ? (
                      <View style={[styles.badge, styles.seasonBadge]}>
                        <Text style={[styles.badgeText, styles.seasonBadgeText]}>
                          {item.badge}
                        </Text>
                      </View>
                    ) : null}
                  </View>
                  <Text style={styles.timelineDate}>{item.date}</Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.divider} />

        <Pressable
          onPress={handleViewCalendar}
          style={({ pressed }) => [
            styles.viewAllButton,
            pressed && styles.pressed,
          ]}
          accessibilityRole="button"
          accessibilityLabel="Explorar calendario"
        >
          <Text style={styles.viewAllText}>Explorar Calendario</Text>
          <Ionicons name="arrow-forward" size={14} color={Colors.textMuted} />
        </Pressable>
      </View>
    </LinearGradient>
  );
}

export default React.memo(EventHighlightsSection);
