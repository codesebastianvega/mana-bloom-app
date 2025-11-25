// [MB] Modulo: Home / Seccion: Event Highlights
// Afecta: HomeScreen
// Proposito: Mostrar calendario cercano y promo de tienda vinculada a eventos
// Puntos de edicion futura: conectar con API de eventos y promociones dinamicas
// Autor: Codex - Fecha: 2025-10-15

import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./EventHighlightsSection.styles";
import { useHydrationStatus } from "../../state/AppContext";
import SectionPlaceholder from "../common/SectionPlaceholder";
import { Colors } from "../../theme";

const TIMELINE = [
  {
    key: "upcoming",
    emoji: "\u{1F31E}",
    title: "Festival Solar",
    date: "24 oct - 30 oct",
    description: "XP doble y tareas radiantes.",
    accent: "#FFD54F",
  },
  {
    key: "recent",
    emoji: "\u{1F319}",
    title: "Noche de Mana",
    date: "Finalizado 12 oct",
    description: "Bonos de mana nocturnos y cosmeticos lunares.",
    accent: "#B542F6",
  },
  {
    key: "rumor",
    emoji: "\u{1F342}",
    title: "Equinoccio Umbral",
    date: "Rumor: noviembre",
    description: "Se habla de herramientas con descuento y buffs de foco.",
    accent: "#8BC34A",
  },
];

const PROMO = {
  title: "Promo del Festival",
  description: "Durante el Festival Solar, las herramientas tienen 10% menos mana.",
  icon: "hammer-outline",
  accent: "#1cd47b",
  targetTab: "tools",
};

function EventHighlightsSection() {
  const { modules } = useHydrationStatus();
  const navigation = useNavigation();

  // Temporarily disabled hydration check
  // if (modules.news) {
  //   return <SectionPlaceholder height={260} />;
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

  const handleOpenPromo = () => {
    navigation.navigate("ShopScreen", { initialTab: PROMO.targetTab });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleBlock}>
          <Text style={styles.title} accessibilityRole="header">
            Calendario Arcano
          </Text>
          <Text style={styles.subtitle}>
            Mantente al dia del ciclo de eventos y promociones
          </Text>
        </View>
        <Pressable
          onPress={handleViewCalendar}
          style={({ pressed }) => [styles.viewAllButton, pressed && styles.pressed]}
          accessibilityRole="button"
          accessibilityLabel="Abrir calendario completo de eventos"
        >
          <Text style={styles.viewAllText}>Ver calendario</Text>
          <Ionicons name="arrow-forward" size={14} color={Colors.textMuted} />
        </Pressable>
      </View>

      <View style={styles.timeline} accessibilityRole="list">
        {TIMELINE.map((item) => (
          <View key={item.key} style={styles.timelineItem}>
            <View style={[styles.timelineIcon, { borderColor: item.accent }]}
            >
              <Text style={styles.timelineEmoji}>{item.emoji}</Text>
            </View>
            <View style={styles.timelineText}>
              <Text style={styles.timelineTitle}>{item.title}</Text>
              <Text style={styles.timelineDate}>{item.date}</Text>
              <Text style={styles.timelineDescription}>{item.description}</Text>
            </View>
          </View>
        ))}
      </View>

      <Pressable
        onPress={handleOpenPromo}
        style={({ pressed }) => [styles.promoCard, pressed && styles.pressed]}
        accessibilityRole="button"
        accessibilityLabel="Abrir tienda con la promo del festival"
      >
        <View style={[styles.promoIcon, { borderColor: PROMO.accent }]}
        >
          <Ionicons name={PROMO.icon} size={18} color={PROMO.accent} />
        </View>
        <View style={styles.promoText}>
          <Text style={styles.promoTitle}>{PROMO.title}</Text>
          <Text style={styles.promoDescription}>{PROMO.description}</Text>
        </View>
        <Ionicons name="arrow-forward" size={18} color={Colors.textMuted} />
      </Pressable>
    </View>
  );
}

export default React.memo(EventHighlightsSection);
