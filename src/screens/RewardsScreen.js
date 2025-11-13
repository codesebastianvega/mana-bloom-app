// [MB] Modulo: Home / Seccion: RewardsScreen
// Afecta: flujo de Recompensas
// Proposito: Modal social con calendario/promo y acciones recompensadas
// Puntos de edicion futura: conectar con API social y deep links reales
// Autor: Codex - Fecha: 2025-10-15

import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, ScrollView, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
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
      },
      {
        title: "Unirte a Discord",
        reward: "+1 buff (24h)",
        icon: "logo-discord",
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
      },
      {
        title: "Invitar a un amigo (1a mision)",
        reward: "+20 XP",
        icon: "gift",
      },
    ],
  },
  {
    key: "progress",
    title: "Progresion",
    accent: "#FFD54F",
    items: [
      {
        title: "Completar 5 tareas hoy",
        reward: "+50 XP",
        icon: "checkmark-done",
      },
      {
        title: "Racha de 7 dias",
        reward: "+100 XP",
        icon: "flame",
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

export default function RewardsScreen() {
  const navigation = useNavigation();

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
          {SECTIONS.map((section) => (
            <View key={section.key} style={styles.section}>
              <Text style={styles.sectionTitle}>{section.title}</Text>
              <View style={styles.sectionList}>
                {section.items.map((item) => (
                  <View
                    key={item.title}
                    style={[styles.card, { borderColor: section.accent }]}
                    accessibilityRole="summary"
                  >
                    <View
                      style={[styles.cardIcon, { backgroundColor: section.accent }]}
                    >
                      <Ionicons name={item.icon} size={16} color={Colors.onAccent} />
                    </View>
                    <View style={styles.cardText}>
                      <Text style={styles.cardTitle}>{item.title}</Text>
                      <View style={styles.chip}>
                        <Text style={styles.chipText}>{item.reward}</Text>
                      </View>
                    </View>
                    <Ionicons name="chevron-forward" size={16} color={Colors.textMuted} />
                  </View>
                ))}
              </View>
            </View>
          ))}

          <Pressable
            onPress={handleOpenPromo}
            style={[styles.promoCard, { borderColor: PROMO.accent }]}
            accessibilityRole="button"
            accessibilityLabel="Abrir tienda del festival"
          >
            <View style={[styles.promoIcon, { backgroundColor: PROMO.accent }]}> 
              <Ionicons name={PROMO.icon} size={18} color={Colors.onAccent} />
            </View>
            <View style={styles.promoText}>
              <Text style={styles.promoTitle}>{PROMO.title}</Text>
              <Text style={styles.promoDescription}>{PROMO.description}</Text>
            </View>
            <Ionicons name="arrow-forward" size={18} color={Colors.textMuted} />
          </Pressable>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

