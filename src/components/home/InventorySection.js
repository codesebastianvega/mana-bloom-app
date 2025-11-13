// [MB] Modulo: Home / Seccion: Inventario
// Afecta: HomeScreen
// Proposito: Resumen compacto de inventario con accesos rapidos
// Puntos de edicion futura: enlazar inventario completo y estilos responsivos
// Autor: Codex - Fecha: 2025-10-15

import React, { useMemo } from "react";
import { View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./InventorySection.styles";
import {
  useAppState,
  useInventoryCounts,
  useHydrationStatus,
} from "../../state/AppContext";
import SectionPlaceholder from "../common/SectionPlaceholder";

const BUTTON_ACCENTS = {
  potions: "#B542F6",
  tools: "#1cd47b",
  cosmetics: "#FFD700",
  all: "#8E9AC6",
};

const LABELS = {
  potions: "Pociones",
  tools: "Herramientas",
  cosmetics: "Cosmeticos",
  all: "Ver todo",
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

function buildButtonConfig(counts, navigation, onGoToShop) {
  return [
    {
      key: "potions",
      label: LABELS.potions,
      value: counts.potions,
      accent: BUTTON_ACCENTS.potions,
      background: hexToRgba(BUTTON_ACCENTS.potions, 0.18),
      onPress: onGoToShop,
    },
    {
      key: "tools",
      label: LABELS.tools,
      value: counts.tools,
      accent: BUTTON_ACCENTS.tools,
      background: hexToRgba(BUTTON_ACCENTS.tools, 0.18),
      onPress: onGoToShop,
    },
    {
      key: "cosmetics",
      label: LABELS.cosmetics,
      value: counts.cosmetics,
      accent: BUTTON_ACCENTS.cosmetics,
      background: hexToRgba(BUTTON_ACCENTS.cosmetics, 0.18),
      onPress: onGoToShop,
    },
    {
      key: "all",
      label: LABELS.all,
      value: null,
      accent: BUTTON_ACCENTS.all,
      background: hexToRgba(BUTTON_ACCENTS.all, 0.18),
      onPress: () => navigation.navigate("InventoryModal"),
    },
  ];
}

function InventorySection({ onGoToShop }) {
  const { inventory } = useAppState();
  const counts = useInventoryCounts();
  const { modules } = useHydrationStatus();
  const navigation = useNavigation();

  const totalItems = useMemo(() => inventory.length, [inventory]);

  if (modules.inventory) {
    return <SectionPlaceholder height={140} />;
  }

  if (totalItems === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.titleRow}>
          <Text style={styles.title} accessibilityRole="header">
            Inventario
          </Text>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>Tu inventario esta vacio</Text>
          <Pressable
            onPress={() => onGoToShop?.()}
            style={styles.emptyLink}
            accessibilityRole="button"
            accessibilityLabel="Ir a la tienda"
          >
            <Text style={styles.emptyLinkText}>Ir a la tienda</Text>
            <Text style={styles.emptyLinkIcon}>-></Text>
          </Pressable>
        </View>
      </View>
    );
  }

  const buttons = buildButtonConfig(counts, navigation, onGoToShop);

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <View>
          <Text style={styles.title} accessibilityRole="header">
            Inventario
          </Text>
          <Text style={styles.subtitle}>Tus articulos favoritos, clasificados</Text>
        </View>
      </View>

      <View style={styles.grid} accessibilityRole="grid">
        {buttons.map((button) => (
          <Pressable
            key={button.key}
            accessibilityRole="button"
            accessibilityLabel={
              button.value !== null
                ? `${button.label} ${button.value}`
                : "Ver inventario completo"
            }
            onPress={button.onPress}
            style={({ pressed }) => [
              styles.pressableTile,
              pressed && styles.tilePressed,
            ]}
          >
            <View
              style={[
                styles.tile,
                {
                  borderColor: button.accent,
                  backgroundColor: button.background,
                },
              ]}
            >
              <Text style={styles.tileLabel}>{button.label}</Text>
              {button.value !== null ? (
                <Text style={[styles.tileValue, { color: button.accent }]}>
                  {button.value}
                </Text>
              ) : (
                <Text style={styles.tileCta}>Abrir</Text>
              )}
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

export default React.memo(InventorySection);


