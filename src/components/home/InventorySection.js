// [MB] Módulo: Home / Sección: Inventario
// Afecta: HomeScreen
// Propósito: Resumen de inventario con conteos y lista corta
// Puntos de edición futura: navegación a inventario completo
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text, Pressable, Alert } from "react-native";
import styles from "./InventorySection.styles";
import {
  useAppState,
  useAppDispatch,
  useInventoryCounts,
} from "../../state/AppContext";
import { Opacity } from "../../theme";

export default function InventorySection() {
  const { inventory } = useAppState();
  const dispatch = useAppDispatch();
  const counts = useInventoryCounts();
  const topItems = inventory.slice(0, 3);

  const handleUse = (item) => {
    dispatch({ type: "CONSUME_ITEM", payload: { sku: item.sku } });
    Alert.alert("Poción usada", "Cristal de Maná +100");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inventario</Text>

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

      <View style={styles.list}>
        {topItems.map((item) => {
          const isUsable =
            item.category === "potions" &&
            item.quantity > 0 &&
            item.sku === "shop/potions/p2";
          return (
            <View key={item.id} style={styles.itemCard}>
              <Text style={styles.itemText}>{`${item.title} × ${item.quantity}`}</Text>
              <Pressable
                onPress={() => handleUse(item)}
                disabled={!isUsable}
                style={[
                  styles.useButton,
                  !isUsable && { opacity: Opacity.disabled },
                ]}
                accessibilityRole="button"
                accessibilityLabel={`${isUsable ? "Usar" : "No usable"} ${item.title}`}
              >
                <Text style={styles.useButtonText}>
                  {isUsable ? "Usar" : "No usable"}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>

      <Pressable
        style={styles.viewAllButton}
        accessibilityRole="button"
        accessibilityLabel="Ver inventario completo"
      >
        <Text style={styles.viewAllText}>Ver todo</Text>
      </Pressable>
    </View>
  );
}
