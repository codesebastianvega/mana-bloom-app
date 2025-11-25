// [MB] Modulo: Inventario / Pantalla: InventoryScreen
// Afecta: navegacion modal de inventario
// Proposito: Mostrar inventario completo con filtros y acciones
// Puntos de edicion futura: integrar nuevos items y paginacion
// Autor: Codex - Fecha: 2025-10-15

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
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./InventoryScreen.styles";
import {
  useAppState,
  useAppDispatch,
  useInventoryCounts,
  canUseItem,
} from "../state/AppContext";
import { Colors, Opacity, CategoryAccents } from "../theme";

const TABS = [
  { key: "potions", label: "Pociones" },
  { key: "seeds", label: "Semillas" },
  { key: "tools", label: "Herramientas" },
  { key: "cosmetics", label: "Cosmeticos" },
  { key: "pets", label: "Mascotas" },
  { key: "all", label: "Todos" },
];

const CATEGORY_EMOJI = { potions: "??", seeds: "??", tools: "???", cosmetics: "??", pets: "??" };
const CHIP_ACCENTS = {
  ...CategoryAccents,
  all: Colors.textMuted,
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
  const value = parseInt(cleaned, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

export default function InventoryScreen() {
  const navigation = useNavigation();
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
      Alert.alert("Pocion usada", "Sabiduria activa: XP x2 por 2 horas");
    } else if (item.sku === "shop/potions/p2") {
      Alert.alert("Pocion usada", "Cristal de Mana +100");
    }
  };

  const handleDiscard = (item) => {
    Alert.alert("Descartar", "Eliminar 1 unidad?", [
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
    const accent = CHIP_ACCENTS[item.category] || Colors.accent;
    const iconBg = hexToRgba(accent, 0.16);

    return (
      <View
        style={[
          styles.itemRow,
          { borderColor: hexToRgba(accent, 0.35), shadowColor: accent },
        ]}
      >
        <View style={styles.itemHeader}>
          <View style={styles.itemMain}>
            <View
              style={[styles.itemIconBubble, { borderColor: accent, backgroundColor: iconBg }]}
            >
              <Text style={styles.itemIcon}>
                {CATEGORY_EMOJI[item.category] || "?"}
              </Text>
            </View>
            <View style={styles.itemInfo}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSku}>{item.sku}</Text>
            </View>
          </View>
          <Text style={styles.itemQty}>{`x${item.quantity}`}</Text>
        </View>
        <View style={styles.actionsRow}>
          <Pressable
            onPress={() => handleUse(item)}
            disabled={!isUsable}
            style={[
              styles.primaryAction,
              {
                borderColor: hexToRgba(accent, 0.4),
                backgroundColor: hexToRgba(accent, 0.2),
              },
              !isUsable && styles.disabledAction,
            ]}
            accessibilityRole="button"
            accessibilityLabel={`Usar ${item.title}`}
          >
            <Text style={[styles.primaryActionText, { color: accent }] }>
              {isUsable ? "Usar" : "Bloqueado"}
            </Text>
          </Pressable>
          <Pressable
            onPress={() => handleDiscard(item)}
            disabled={item.quantity <= 0}
            style={[styles.secondaryAction, item.quantity <= 0 && styles.disabledAction]}
            accessibilityRole="button"
            accessibilityLabel={`Descartar ${item.title}`}
          >
            <Ionicons name="trash" size={14} color={Colors.text} />
            <Text style={styles.secondaryActionText}>Descartar</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const chips = [
    { key: "potions", label: "Pociones", value: counts.potions },
    { key: "seeds", label: "Semillas", value: counts.seeds },
    { key: "tools", label: "Herramientas", value: counts.tools },
    { key: "cosmetics", label: "Cosmeticos", value: counts.cosmetics },
    { key: "pets", label: "Mascotas", value: counts.pets },
  ];

  return (
    <SafeAreaView style={styles.backdrop}>
      <Pressable
        style={styles.backdropDismiss}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Cerrar inventario"
      />
      <View style={styles.sheet}>
        <View style={styles.header}>
          <View style={styles.titleBlock}>
            <Text style={styles.title} accessibilityRole="header">
              Inventario
            </Text>
            <Text style={styles.subtitle}>{`Total: ${counts.total} | Resultados: ${filtered.length}`}</Text>
          </View>
          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.closeButton}
            accessibilityRole="button"
            accessibilityLabel="Cerrar"
          >
            <Ionicons name="close" size={18} color={Colors.text} />
          </Pressable>
        </View>

        <View style={styles.chipsRow}>
          {chips.map((chip) => {
            const accent = CHIP_ACCENTS[chip.key];
            return (
              <View
                key={chip.key}
                style={[
                  styles.chip,
                  {
                    borderColor: accent,
                    backgroundColor: hexToRgba(accent, 0.18),
                  },
                ]}
              >
                <Text style={styles.chipText}>{`${chip.label} ${chip.value}`}</Text>
              </View>
            );
          })}
        </View>

        <View style={styles.tabsRow}>
          {TABS.map((t) => {
            const accent = CHIP_ACCENTS[t.key] || CHIP_ACCENTS.all;
            const isActive = tab === t.key;
            return (
              <Pressable
                key={t.key}
                onPress={() => setTab(t.key)}
                style={[
                  styles.tabButton,
                  isActive && {
                    borderColor: accent,
                    backgroundColor: hexToRgba(accent, 0.16),
                  },
                ]}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
              >
                <Text
                  style={[
                    styles.tabButtonText,
                    isActive && { color: accent },
                  ]}
                >
                  {t.label}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          style={styles.searchInput}
          placeholder="Buscar"
          placeholderTextColor={Colors.textMuted}
          value={query}
          onChangeText={setQuery}
        />

        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          style={styles.list}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>No hay items en esta categoria.</Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
}


