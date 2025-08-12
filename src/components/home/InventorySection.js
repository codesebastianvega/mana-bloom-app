// [MB] Módulo: Home / Sección: Inventario
// Afecta: HomeScreen
// Propósito: Resumen de inventario con conteos y lista corta
// Puntos de edición futura: navegación a inventario completo
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text, Pressable } from "react-native";
import styles from "./InventorySection.styles";
import { useAppState, useInventoryCounts } from "../../state/AppContext";

export default function InventorySection() {
  const { inventory } = useAppState();
  const counts = useInventoryCounts();
  const topItems = inventory.slice(0, 3);

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
        {topItems.map((item) => (
          <View key={item.id} style={styles.itemCard}>
            <Text style={styles.itemText}>{`${item.title} × ${item.quantity}`}</Text>
          </View>
        ))}
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
