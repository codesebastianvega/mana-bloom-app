// [MB] Modulo: Home / Seccion: HomeHeader
// Afecta: HomeScreen
// Proposito: Encabezado con titulo principal y chip de estado de planta
// Puntos de edicion futura: integrar acciones rapidas o barras secundarias
// Autor: Codex - Fecha: 2025-10-07

import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./HomeHeader.styles";
import { Colors } from "../../theme";
import { useAppState, useDrawer } from "../../state/AppContext";

const PLANT_STATE_VARIANTS = {
  floreciendo: {
    label: "Floreciendo",
    accent: Colors.secondary,
    text: Colors.text,
    icon: "flower",
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
  stripAccents((raw || "").toString()).toLowerCase().replace(/\s+/g, "").trim();

function resolvePlantState(rawState) {
  const key = normaliseStateKey(rawState);
  if (key && PLANT_STATE_VARIANTS[key]) {
    return PLANT_STATE_VARIANTS[key];
  }
  return PLANT_STATE_VARIANTS.floreciendo;
}

function HomeHeader({ onHeaderLayout, onChipPopoverToggle }, ref) {
  const { plantState, plantName } = useAppState();
  const { openDrawer } = useDrawer();
  const variant = resolvePlantState(plantState);
  const plantDisplayName = plantName?.trim() || "Ernesto Perez";

  useEffect(() => {
    onChipPopoverToggle?.(false);
  }, [onChipPopoverToggle]);

  useImperativeHandle(ref, () => ({
    closePopover: () => {
      onChipPopoverToggle?.(false);
    },
  }));

  const chipStyle = styles.plantChip;
  const dotStyle = [styles.plantDot, { backgroundColor: variant.accent }];
  const stateStyle = [styles.plantState, { color: variant.text }];

  const statusIndicator = variant.icon ? (
    <View style={styles.plantIconWrapper}>
      <MaterialCommunityIcons
        name={variant.icon}
        size={18}
        color={variant.accent}
      />
    </View>
  ) : (
    <View style={dotStyle} />
  );

  const handleMenuPress = () => {
    openDrawer();
  };

  const handleNotifications = () => {
    // Placeholder para futuras notificaciones
  };

  return (
    <View
      style={styles.safeArea}
      onLayout={onHeaderLayout}
      accessibilityRole="header"
      accessibilityLabel="Encabezado: Mana Bloom"
    >
      <View style={styles.container}>
        <View style={styles.brandRow}>
          <View style={styles.brandBlock}>
            <View style={styles.logoBadge}>
              <MaterialCommunityIcons
                name="layers-triple"
                size={20}
                color={Colors.text}
              />
            </View>
            <Text style={styles.title}>Mana Bloom</Text>
          </View>
          <View style={styles.actionRow}>
            <Pressable
              onPress={handleNotifications}
              accessibilityRole="button"
              accessibilityLabel="Abrir notificaciones"
              style={styles.iconButton}
              hitSlop={12}
            >
              <MaterialCommunityIcons
                name="bell-outline"
                size={20}
                color={Colors.text}
              />
            </Pressable>
            <Pressable
              onPress={handleMenuPress}
              style={styles.iconButton}
              accessibilityRole="button"
              accessibilityLabel="Abrir menú"
              hitSlop={12}
            >
              <MaterialCommunityIcons name="menu" size={22} color={Colors.text} />
            </Pressable>
          </View>
        </View>
        <View style={styles.plantChip} accessibilityRole="text">
          {statusIndicator}
          <Text
            style={styles.plantCopy}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {`${plantDisplayName} · ${variant.label}`}
          </Text>
        </View>
      </View>
    </View>
  );
}

export default forwardRef(HomeHeader);
