// [MB] Módulo: Home / Sección: Inventario
// Afecta: HomeScreen
// Propósito: Resumen de inventario con conteos y lista corta
// Puntos de edición futura: navegación a inventario completo
// Autor: Codex - Fecha: 2025-08-13

import React, { useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { useNavigation } from "@react-navigation/native";
import styles from "./InventorySection.styles";
import {
  useAppState,
  useInventoryCounts,
  useHydrationStatus,
} from "../../state/AppContext";
import SectionPlaceholder from "../common/SectionPlaceholder";

const CATEGORY_EMOJI = { potions: "🧪", tools: "🛠️", cosmetics: "🎩" };

function InventorySection({ onGoToShop }) {
  const { inventory } = useAppState();
  const counts = useInventoryCounts();
  const { modules } = useHydrationStatus();
  const navigation = useNavigation();
  const scale = useRef(new Animated.Value(1)).current;

  const itemsSorted = [...inventory].sort((a, b) => {
    if (b.quantity !== a.quantity) {
      return b.quantity - a.quantity;
    }
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  const preview = itemsSorted.slice(0, 3);

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  if (modules.inventory) {
    return <SectionPlaceholder height={160} />;
  }

  if (counts.total === 0) {
    return (
      <View style={styles.container}>
        <Text style={styles.title} accessibilityRole="header">
          Inventario
        </Text>
        <Text style={styles.emptyText}>Tu inventario está vacío</Text>
        <Pressable
          onPress={() => onGoToShop?.()}
          style={({ pressed }) => [
            styles.viewAllButton,
            pressed && { transform: [{ scale: 0.98 }] },
          ]}
          accessibilityRole="button"
          accessibilityLabel="Ir a la Tienda"
        >
          <Text style={styles.viewAllText}>Ir a la Tienda</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        Inventario
      </Text>

      <View style={styles.chipsRow}>
        <View style={styles.chip}>
          <Text style={styles.chipText}>Pociones {counts.potions}</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>Herramientas {counts.tools}</Text>
        </View>
        <View style={styles.chip}>
          <Text style={styles.chipText}>Cosméticos {counts.cosmetics}</Text>
        </View>
      </View>

      <View style={styles.list} accessibilityRole="list">
        {preview.map((item) => (
          <View key={item.id} style={styles.itemRow}>
            <Text style={styles.itemIcon}>
              {CATEGORY_EMOJI[item.category] || "📦"}
            </Text>
            <Text style={styles.itemTitle}>{item.title}</Text>
            <Text style={styles.itemQty}>{`× ${item.quantity}`}</Text>
          </View>
        ))}
      </View>

      <Animated.View style={{ transform: [{ scale }] }}>
        <Pressable
          onPress={() => navigation.navigate("InventoryModal")}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.viewAllButton}
          accessibilityRole="button"
          accessibilityLabel="Abrir inventario completo"
        >
          <Text style={styles.viewAllText}>Ver todo</Text>
        </Pressable>
      </Animated.View>
    </View>
  );
}

export default React.memo(InventorySection);
