// [MB] Modulo: Home / Seccion: Inventario
// Afecta: HomeScreen
// Proposito: Resumen compacto de inventario (mock-style)
// Puntos de edicion futura: enlazar counts reales y modal de inventario
// Autor: Codex - Fecha: 2025-10-15 (V2)

import React, { useMemo } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import styles from "./InventorySection.styles";
import { useInventoryCounts } from "../../state/AppContext";
import { CategoryAccents, Colors } from "../../theme";

const LABELS = {
  potions: "Pociones",
  tools: "Herram.",
  cosmetics: "Cosméticos",
  plants: "Plantas",
  pets: "Mascotas",
};

const FALLBACK_COUNTS = {
  potions: 12,
  tools: 5,
  cosmetics: 3,
  plants: 4,
  pets: 2,
};

function hexToRgba(hex = "", alpha = 1) {
  if (!hex) return undefined;
  let cleaned = hex.replace("#", "");
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split("")
      .map((c) => `${c}${c}`)
      .join("");
  }
  if (cleaned.length !== 6) return undefined;
  const intVal = parseInt(cleaned, 16);
  const r = (intVal >> 16) & 255;
  const g = (intVal >> 8) & 255;
  const b = intVal & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

function getAccent(key) {
  return CategoryAccents[key] || Colors.accent;
}

export default function InventorySection({ onGoToShop }) {
  const counts = useInventoryCounts();
  const navigation = useNavigation();

  const safeCounts = useMemo(() => {
    const mapped = {};
    Object.keys(FALLBACK_COUNTS).forEach((key) => {
      const raw = counts?.[key];
      mapped[key] = typeof raw === "number" ? raw : FALLBACK_COUNTS[key];
    });
    return mapped;
  }, [counts]);

  const buttons = [
    {
      key: "potions",
      label: LABELS.potions,
      value: safeCounts.potions,
      accent: getAccent("potions"),
      background: "rgba(255,255,255,0.08)",
      borderColor: "rgba(255,255,255,0.22)",
      icon: "flask-outline",
      onPress: onGoToShop,
    },
    {
      key: "tools",
      label: LABELS.tools,
      value: safeCounts.tools,
      accent: "#2dc9ff",
      background: "rgba(255,255,255,0.08)",
      borderColor: "rgba(255,255,255,0.22)",
      icon: "wrench",
      onPress: onGoToShop,
    },
    {
      key: "cosmetics",
      label: LABELS.cosmetics,
      value: safeCounts.cosmetics,
      accent: Colors.secondaryFantasy,
      background: "rgba(255,255,255,0.08)",
      borderColor: "rgba(255,255,255,0.22)",
      icon: "brush",
      onPress: onGoToShop,
    },
    {
      key: "plants",
      label: LABELS.plants,
      value: safeCounts.plants,
      accent: Colors.success,
      background: "rgba(255,255,255,0.08)",
      borderColor: "rgba(255,255,255,0.22)",
      icon: "leaf",
      onPress: onGoToShop,
    },
    {
      key: "pets",
      label: LABELS.pets,
      value: safeCounts.pets,
      accent: Colors.warning,
      background: "rgba(255,255,255,0.08)",
      borderColor: "rgba(255,255,255,0.22)",
      icon: "paw",
      onPress: onGoToShop,
    },
  ];
  return (
    <>
      <View style={styles.titleRow}>
        <View style={styles.titleLeft}>
          <View style={styles.titleLeftRow}>
            <MaterialCommunityIcons
              name="lock"
              size={16}
              color={Colors.text}
              style={styles.titleIcon}
            />
            <Text style={styles.title} accessibilityRole="header">
              Inventario
            </Text>
          </View>
          <Text style={styles.subtitle}>Visión rápida de tus recursos.</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("InventoryModal")}
          accessibilityRole="button"
          accessibilityLabel="Abrir inventario completo"
        >
          <Text style={styles.openCta}>Abrir</Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.sliderContent}
        accessibilityRole="list"
      >
        {buttons.map((button) => (
          <Pressable
            key={button.key}
            accessibilityRole="button"
            accessibilityLabel={`${button.label} ${button.value}`}
            onPress={button.onPress}
            style={({ pressed }) => [
              styles.tile,
              {
                borderColor: button.borderColor || button.accent,
                backgroundColor: button.background,
              },
              pressed && styles.tilePressed,
            ]}
          >
            <View style={styles.tileValueRow}>
              {button.icon ? (
                <MaterialCommunityIcons
                  name={button.icon}
                  size={18}
                  color={Colors.text}
                  style={styles.tileIcon}
                />
              ) : null}
              <Text style={[styles.tileValue, { color: Colors.text }]}>
                {button.value}
              </Text>
            </View>
            <Text style={styles.tileLabel}>{button.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </>
  );
}
