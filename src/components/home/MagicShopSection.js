// [MB] Módulo: Home / Sección: Tienda Mágica (Pestañas)
// Afecta: HomeScreen
// Propósito: Sección de tienda mágica con tabs y maná disponible
// Puntos de edición futura: integrar productos, navegación y retirar debug
// Autor: Codex - Fecha: 2025-08-12

import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./MagicShopSection.styles";
import ShopItemCard from "./ShopItemCard";
import { ShopColors } from "../../theme";
import { useAppState, useAppDispatch } from "../../state/AppContext";

const TABS = [
  { key: "potions", label: "Pociones" },
  { key: "tools", label: "Herramientas" },
  { key: "cosmetics", label: "Cosméticos" },
];

const SHOP_ITEMS = {
  potions: [
    { id: "p1", title: "Poción de Sabiduría", description: "Duplica XP por 2 horas", price: 50, iconName: "flask" },
    { id: "p2", title: "Cristal de Maná", description: "+100 maná instantáneo", price: 30, iconName: "diamond" },
  ],
  tools: [
    { id: "t1", title: "Varita Élfica", description: "Reduce dificultad por 1 día", price: 120, iconName: "construct" },
    { id: "t2", title: "Escudo Temporal", description: "Protege racha por 1 día", price: 80, iconName: "shield" },
  ],
  cosmetics: [
    { id: "c1", title: "Maceta Dorada", description: "Mejora visual de la planta", price: 200, iconName: "color-palette" },
  ],
};

export default function MagicShopSection() {
  const [activeTab, setActiveTab] = useState("potions");
  const { mana } = useAppState();
  const dispatch = useAppDispatch();

  const addDebugMana = () =>
    dispatch({ type: "SET_MANA", payload: mana + 5 });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tienda Mágica</Text>

      <View style={styles.manaRow}>
        <Text style={styles.manaLabel} accessibilityRole="text">
          Maná disponible
        </Text>
        <View
          accessible
          accessibilityLabel={`Maná disponible: ${mana}`}
          style={[styles.manaPill, { borderColor: ShopColors[activeTab].pill }]}
        >
          <Ionicons
            name="sparkles"
            size={16}
            color={ShopColors[activeTab].pill}
            style={styles.manaIcon}
          />
          <Text style={styles.manaValue}>{mana}</Text>
        </View>
      </View>

      {__DEV__ && (
        <Pressable
          onPress={addDebugMana}
          style={styles.debugButton}
          accessibilityRole="button"
          accessibilityLabel="Agregar 5 maná"
        >
          <Text style={styles.debugButtonText}>+5</Text>
        </Pressable>
      )}

      <View style={styles.tabsRow}>
        {TABS.map((tab, index) => {
          const isActive = tab.key === activeTab;
          const accent = ShopColors[tab.key];
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[
                styles.tabButton,
                index === TABS.length - 1 && { marginRight: 0 },
                isActive && { backgroundColor: accent.bg, borderColor: accent.border },
              ]}
              accessibilityRole="button"
              accessibilityLabel={`Mostrar ${tab.label}`}
            >
              <Text style={styles.tabText}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>

      {SHOP_ITEMS[activeTab].map((item) => (
        <View key={item.id} style={styles.itemWrapper}>
          <ShopItemCard
            title={item.title}
            description={item.description}
            price={item.price}
            iconName={item.iconName}
            accent={ShopColors[activeTab]}
            accessibilityLabel={`Comprar ${item.title} por ${item.price} maná`}
          />
        </View>
      ))}

      <Pressable
        style={styles.viewAllButton}
        accessibilityRole="button"
        accessibilityLabel="Ver todos los artículos"
      >
        <Text style={styles.viewAllText}>Ver todos los artículos</Text>
      </Pressable>
    </View>
  );
}
