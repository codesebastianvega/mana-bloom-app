// [MB] Módulo: Shop / Pantalla: ShopScreen
// Afecta: Tienda completa
// Propósito: Pantalla dedicada de tienda con grid y suscripciones
// Puntos de edición futura: conectar IAP y expandir catálogo
// Autor: Codex - Fecha: 2025-08-13

import React, { useState, useCallback, useMemo } from "react";
import { View, Text, FlatList, Pressable, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import styles from "./ShopScreen.styles";
import ShopGridItem from "../components/shop/ShopGridItem";
import SubscriptionCard from "../components/shop/SubscriptionCard";
import {
  SHOP_CATALOG,
  ShopColors,
  CURRENCIES,
} from "../constants/shopCatalog";
import { Spacing, Colors } from "../theme";
import {
  useAppState,
  useAppDispatch,
  useCanAfford,
  useWallet,
  useHydrationStatus,
} from "../state/AppContext";
import SectionPlaceholder from "../components/home/SectionPlaceholder";

const TABS = [
  { key: "potions", label: "Pociones" },
  { key: "tools", label: "Herramientas" },
  { key: "cosmetics", label: "Cosméticos" },
  { key: "subs", label: "Suscripciones" },
];

const SUBSCRIPTION_PLANS = [
  {
    id: "sub_monthly",
    tier: "mensual",
    priceLabel: "$2.99/mes",
    desc: "Acceso premium mensual",
  },
  {
    id: "sub_yearly",
    tier: "anual",
    priceLabel: "$24.99/año",
    badge: "Ahorra 30%",
    desc: "Acceso premium anual",
  },
  {
    id: "sub_lifetime",
    tier: "de por vida",
    priceLabel: "$49.99 una sola vez",
    desc: "Acceso premium permanente",
  },
];

export default function ShopScreen() {
  const route = useRoute();
  const initialTab = route.params?.initialTab || "potions";
  const [activeTab, setActiveTab] = useState(initialTab);
  const { mana } = useAppState();
  const wallet = useWallet();
  const dispatch = useAppDispatch();
  const canAffordMana = useCanAfford();
  const hydration = useHydrationStatus();

  const canAffordCurrency = useCallback(
    (currency, amount) => wallet[currency] >= amount,
    [wallet]
  );

  const columnStyle = useMemo(() => ({ gap: Spacing.base }), []);
  const contentStyle = useMemo(
    () => ({ padding: Spacing.base, paddingBottom: 120 }),
    []
  );

  const handleBuy = useCallback(
    (item) => {
      if (item.currency === CURRENCIES.MANA) {
        if (canAffordMana(item.price)) {
          dispatch({ type: "PURCHASE_WITH_MANA", payload: item.price });
        } else {
          Alert.alert("Sin maná", "Maná insuficiente");
          return;
        }
      } else if (item.currency === CURRENCIES.COIN) {
        if (canAffordCurrency("coin", item.price)) {
          dispatch({ type: "SPEND_COIN", payload: item.price });
        } else {
          Alert.alert("Sin monedas", "Monedas insuficientes");
          return;
        }
      } else if (item.currency === CURRENCIES.GEM) {
        Alert.alert(
          "Próximamente",
          "Las compras con diamantes requieren IAP"
        );
        return;
      }

      dispatch({
        type: "ADD_TO_INVENTORY",
        payload: { sku: item.sku, title: item.title, category: activeTab },
      });
      dispatch({
        type: "ACHIEVEMENT_EVENT",
        payload: { type: "purchase", payload: { sku: item.sku, category: activeTab } },
      });
      Alert.alert("Compra exitosa — añadido al inventario");
    },
    [activeTab, canAffordCurrency, canAffordMana, dispatch]
  );

  const renderItem = useCallback(
    ({ item }) => {
      if (activeTab === "subs") {
        return (
          <SubscriptionCard
            tier={item.tier}
            priceLabel={item.priceLabel}
            badge={item.badge}
            desc={item.desc}
            onPress={() =>
              Alert.alert(
                "Próximamente",
                "Las suscripciones requerirán pasarela de pago/IAP"
              )
            }
          />
        );
      }
      const disabled =
        item.currency === CURRENCIES.MANA
          ? !canAffordMana(item.price)
          : item.currency === CURRENCIES.COIN
          ? !canAffordCurrency("coin", item.price)
          : false;
      const label = `Comprar ${item.title} por ${item.price} ${
        item.currency === CURRENCIES.MANA
          ? "maná"
          : item.currency === CURRENCIES.COIN
          ? "monedas"
          : "diamantes"
      }`;
      return (
        <ShopGridItem
          {...item}
          accent={ShopColors[activeTab]}
          disabled={disabled}
          onPress={() => handleBuy(item)}
          accessibilityLabel={label}
        />
      );
    },
    [activeTab, canAffordCurrency, canAffordMana, handleBuy]
  );

  const data = activeTab === "subs" ? SUBSCRIPTION_PLANS : SHOP_CATALOG[activeTab];

  if (hydration.mana || hydration.wallet) {
    return (
      <SafeAreaView style={styles.container}>
        <SectionPlaceholder height={300} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={styles.header}
        accessible
        accessibilityLabel={`Saldo: ${mana} maná, ${wallet.coin} monedas, ${wallet.gem} diamantes`}
      >
        <Text style={styles.headerTitle}>Tienda Mágica</Text>
        <View style={styles.walletRow}>
          <View
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
          <View style={styles.currencyPill}>
            <Ionicons
              name="logo-bitcoin"
              size={14}
              color={Colors.text}
              style={styles.currencyIcon}
            />
            <Text style={styles.currencyValue}>{wallet.coin}</Text>
          </View>
          <View style={styles.currencyPill}>
            <Ionicons
              name="diamond"
              size={14}
              color={Colors.text}
              style={styles.currencyIcon}
            />
            <Text style={styles.currencyValue}>{wallet.gem}</Text>
          </View>
        </View>
      </View>
      <View style={styles.tabsRow}>
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          const accent = ShopColors[tab.key];
          return (
            <Pressable
              key={tab.key}
              onPress={() => setActiveTab(tab.key)}
              style={[
                styles.tabButton,
                isActive && {
                  backgroundColor: accent.bg,
                  borderColor: accent.border,
                },
              ]}
              accessibilityRole="tab"
              accessibilityState={{ selected: isActive }}
              accessibilityLabel={`Mostrar ${tab.label}`}
            >
              <Text style={styles.tabText}>{tab.label}</Text>
            </Pressable>
          );
        })}
      </View>
      <FlatList
        key={activeTab === "subs" ? "subs" : "grid"}
        data={data}
        keyExtractor={(item) => item.sku || item.id}
        renderItem={renderItem}
        numColumns={activeTab === "subs" ? 1 : 2}
        columnWrapperStyle={activeTab === "subs" ? undefined : columnStyle}
        contentContainerStyle={contentStyle}
        initialNumToRender={6}
        removeClippedSubviews
        windowSize={5}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Sin artículos</Text>
        }
        ListFooterComponent={
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Las compras son finales. ¿Necesitas ayuda?
            </Text>
            <Pressable
              onPress={() => Alert.alert("Soporte", "Próximamente")}
              style={styles.supportButton}
              accessibilityRole="button"
            >
              <Text style={styles.supportButtonText}>Soporte</Text>
            </Pressable>
          </View>
        }
        accessibilityRole="list"
      />
    </SafeAreaView>
  );
}
