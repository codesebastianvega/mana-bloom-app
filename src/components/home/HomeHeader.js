// [MB] Modulo: Home / Seccion: HomeHeader
// Afecta: HomeScreen
// Proposito: Encabezado con titulo principal y chip de estado de planta
// Puntos de edicion futura: integrar acciones rapidas o barras secundarias
// Autor: Codex - Fecha: 2025-10-07

import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { View, Text, Pressable, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./HomeHeader.styles";
import { Colors } from "../../theme";
import { useAppState, useDrawer } from "../../state/AppContext";

const PLANT_STATE_VARIANTS = {
  floreciendo: {
    label: "Floreciendo",
    accent: Colors.secondary,
    text: Colors.text,
  },
  brote: {
    label: "Brote",
    accent: Colors.primary,
    text: Colors.text,
  },
  germinando: {
    label: "Germinando",
    accent: Colors.primaryLight,
    text: Colors.text,
  },
  dormida: {
    label: "Dormida",
    accent: Colors.info,
    text: Colors.text,
  },
  marchita: {
    label: "Marchita",
    accent: Colors.warning,
    text: Colors.text,
  },
  seca: {
    label: "Sedienta",
    accent: Colors.danger,
    text: Colors.text,
  },
};

const stripAccents = (value) => {
  if (typeof value !== "string") return value;
  if (typeof value.normalize === "function") {
    return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }
  return value;
};

const normaliseStateKey = (raw) =>
  stripAccents((raw || "").toString())
    .toLowerCase()
    .replace(/\s+/g, "")
    .trim();

function resolvePlantState(rawState) {
  const key = normaliseStateKey(rawState);
  if (key && PLANT_STATE_VARIANTS[key]) {
    return PLANT_STATE_VARIANTS[key];
  }
  return PLANT_STATE_VARIANTS.floreciendo;
}

function HomeHeader({ onHeaderLayout, onChipPopoverToggle }, ref) {
  const { plantState, plantName, news, mana, streak, level } = useAppState();
  const { openDrawer } = useDrawer();
  const variant = resolvePlantState(plantState);
  const healthPercent = Math.min(100, Math.max(0, Math.round((plantState?.metric || 0) * 100)))||80;
  const plantDisplayName = plantName?.trim() || "Ernesto Perez";
  const hasUnreadNews = news?.items?.some((item) => !item.read);

  useEffect(() => {
    onChipPopoverToggle?.(false);
  }, [onChipPopoverToggle]);

  useImperativeHandle(ref, () => ({
    closePopover: () => {
      onChipPopoverToggle?.(false);
    },
  }));

  const handleMenuPress = () => {
    openDrawer();
  };

  const handleNotifications = () => {
    // Placeholder para futuras notificaciones
  };

  return (
    <LinearGradient
      colors={["rgba(20,12,35,0.95)", "rgba(12,8,24,0.85)"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradient}
    >
      <View
        style={styles.safeArea}
        onLayout={onHeaderLayout}
        accessibilityRole="header"
        accessibilityLabel="Encabezado: Mana Bloom"
      >
        <View style={styles.container}>
          <View style={styles.brandRow}>
            <View style={styles.brandBlock}>
              <Image
                source={require("../../../assets/plants/loto.png")}
                style={styles.lotusIcon}
                resizeMode="contain"
                accessibilityIgnoresInvertColors
              />
              <Text style={styles.title}>Mana Bloom</Text>
            </View>
            <View style={styles.actionRow}>
              <Pressable
                onPress={handleNotifications}
                accessibilityRole="button"
                accessibilityLabel="Abrir notificaciones"
                style={styles.iconButtonBare}
                hitSlop={12}
              >
                <MaterialCommunityIcons
                  name="bell-outline"
                  size={22}
                  color={Colors.text}
                />
                {hasUnreadNews ? <View style={styles.badgeDot} /> : null}
              </Pressable>
              <Pressable
                onPress={handleMenuPress}
                style={styles.iconButtonBare}
                accessibilityRole="button"
                accessibilityLabel="Abrir menú"
                hitSlop={12}
              >
                <MaterialCommunityIcons name="menu" size={24} color={Colors.text} />
              </Pressable>
            </View>
          </View>
          <View style={styles.plantChip} accessibilityRole="text">
            <View style={styles.plantTextBlock}>
              <View style={styles.plantNameRow}>
                <Text style={styles.plantName} numberOfLines={1}>
                  {plantDisplayName}
                </Text>
                <Text style={styles.plantLevel}>Lv {level || 0}</Text>
              </View>
              <Text
                style={[styles.plantState, { color: variant.text }]}
                numberOfLines={1}
              >
                {variant.label} • Mana {mana ?? 0} • Racha {streak ?? 0}d
              </Text>
            </View>
            <View
              style={[styles.healthBadge, { borderColor: variant.accent }]}
            >
              <Text style={[styles.healthText, { color: variant.accent }]}>
                {healthPercent}%
              </Text>
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

export default forwardRef(HomeHeader);








