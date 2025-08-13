// [MB] Módulo: Inventario / Pantalla: InventoryScreen
// Afecta: navegación modal de inventario
// Propósito: Mostrar inventario completo con filtros y acciones
// Puntos de edición futura: integrar nuevos ítems y paginación
// Autor: Codex - Fecha: 2025-08-18

import React, { useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  TextInput,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./InventoryScreen.styles";
import {
  useAppState,
  useAppDispatch,
  useInventoryCounts,
  canUseItem,
} from "../state/AppContext";
import { Opacity, Colors, Spacing } from "../theme";

const TABS = [
  { key: "potions", label: "Pociones" },
  { key: "tools", label: "Herramientas" },
  { key: "cosmetics", label: "Cosméticos" },
  { key: "all", label: "Todos" },
];

const CATEGORY_EMOJI = { potions: "🧪", tools: "🛠️", cosmetics: "🎩" };

export default function InventoryScreen() {
  const { inventory } = useAppState();
  const dispatch = useAppDispatch();
  const counts = useInventoryCounts();
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");

  const sorted = useMemo(() => {
    return [...inventory].sort((a, b) => {
      if (b.quantity !== a.quantity) {
        return b.quantity - a.quantity;
      }
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [inventory]);

  const filtered = useMemo(() => {
    return sorted.filter((it) => {
      const byTab = tab === "all" || it.category === tab;
      const bySearch = it.title.toLowerCase().includes(query.toLowerCase());
      return byTab && bySearch;
    });
  }, [sorted, tab, query]);

  const handleUse = (item) => {
    const current = inventory.find((it) => it.sku === item.sku);
    if (!current || current.quantity <= 0) return;
    dispatch({ type: "CONSUME_ITEM", payload: { sku: item.sku } });
    if (item.sku === "shop/potions/p1") {
      dispatch({
        type: "ACTIVATE_BUFF",
        payload: { type: "xp_double", durationMs: 2 * 60 * 60 * 1000 },
      });
      Alert.alert(
        "Poción usada",
        "Sabiduría activa: XP x2 por 2 horas"
      );
    } else if (item.sku === "shop/potions/p2") {
      Alert.alert("Poción usada", "Cristal de Maná +100");
    }
  };

  const handleDiscard = (item) => {
    Alert.alert("Descartar", "¿Eliminar 1 unidad?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "OK",
        onPress: () =>
          dispatch({ type: "DISCARD_ITEM", payload: { sku: item.sku } }),
      },
    ]);
  };

  const renderItem = ({ item }) => {
    const isUsable = canUseItem(item.sku) && item.quantity > 0;

    return (
      <View style={styles.itemRow} accessibilityRole="listitem">
        <View style={styles.itemHeader}>
          <View style={styles.itemMain}>
            <Text style={styles.itemIcon}>{
              CATEGORY_EMOJI[item.category] || "📦"
            }</Text>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSku}>{item.sku}</Text>
            </View>
          </View>
          <Text style={styles.itemQty}>{`× ${item.quantity}`}</Text>
        </View>
        <View style={styles.actionsRow}>
          <Pressable
            onPress={() => handleUse(item)}
            disabled={!isUsable}
            style={[styles.useButton, !isUsable && { opacity: Opacity.disabled }]}
            accessibilityRole="button"
            accessibilityLabel={`Usar ${item.title}`}
          >
            <Text style={styles.useButtonText}>
              {isUsable ? "Usar" : "Próximamente"}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => handleDiscard(item)}
            disabled={item.quantity <= 0}
            style={[
              styles.discardButton,
              item.quantity <= 0 && { opacity: Opacity.disabled },
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Descartar ${item.title}`}
          >
            <Text style={styles.discardButtonText}>Descartar</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        accessibilityRole="list"
        ListHeaderComponent={
          <View>
            <Text style={styles.title} accessibilityRole="header">
              Inventario {counts.total}
            </Text>
            <Text style={styles.resultText}>{`Resultados: ${filtered.length}`}</Text>
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
            <View style={styles.tabsRow}>
              {TABS.map((t) => (
                <Pressable
                  key={t.key}
                  onPress={() => setTab(t.key)}
                  style={[
                    styles.tabButton,
                    tab === t.key && styles.tabButtonActive,
                  ]}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: tab === t.key }}
                >
                  <Text
                    style={[
                      styles.tabButtonText,
                      tab === t.key && styles.tabButtonTextActive,
                    ]}
                  >
                    {t.label}
                  </Text>
                </Pressable>
              ))}
            </View>
            <TextInput
              style={styles.searchInput}
              placeholder="Buscar"
              placeholderTextColor={Colors.textMuted}
              value={query}
              onChangeText={setQuery}
            />
          </View>
        }
        contentContainerStyle={{ padding: Spacing.base, paddingBottom: 96 }}
      />
    </SafeAreaView>
  );
}

