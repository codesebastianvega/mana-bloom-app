// [MB] Modulo: Home / Seccion: HomeHeader
// Afecta: HomeScreen
// Proposito: Encabezado con titulo principal y chip de estado de planta
// Puntos de edicion futura: integrar acciones rapidas o barras secundarias
// Autor: Codex - Fecha: 2025-10-07

import React, { forwardRef, useEffect, useImperativeHandle } from "react";
import { View, Text, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import styles from "./HomeHeader.styles";
import { Colors } from "../../theme";
import { useAppState } from "../../state/AppContext";

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
  const navigation = useNavigation();
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
    navigation.navigate("ProfileScreen");
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={["top"]}
      onLayout={onHeaderLayout}
      accessibilityRole="header"
      accessibilityLabel="Encabezado: Mana Bloom"
    >
        <View style={styles.container}>
          <Pressable
            onPress={handleMenuPress}
            style={styles.menuButton}
            accessibilityRole="button"
            accessibilityLabel="Abrir menú"
            hitSlop={12}
          >
            <MaterialCommunityIcons
              name="menu"
              size={24}
              color={Colors.text}
            />
          </Pressable>
          <Text style={styles.title}>Mana Bloom</Text>
          <View style={chipStyle} accessibilityRole="text">
            {statusIndicator}
            <View style={styles.plantTexts}>
              <Text style={styles.plantLabel}>{plantDisplayName}</Text>
              <Text style={stateStyle}>{`esta ${variant.label.toLowerCase()}`}</Text>
            </View>
          </View>
        </View>
    </SafeAreaView>
  );
}

export default forwardRef(HomeHeader);
