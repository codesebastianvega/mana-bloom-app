// [MB] Módulo: Noticias / Pantalla: NewsInboxScreen
// Afecta: NewsInboxModal
// Propósito: Bandeja de noticias con filtros y detalle
// Puntos de edición futura: conectar con feed real y paginación
// Autor: Codex - Fecha: 2025-08-13

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";
import { useNewsFeed, useAppDispatch } from "../state/AppContext";
import { Colors, Spacing } from "../theme";
import { timeAgo } from "../utils/time";
import styles from "./NewsInboxScreen.styles";
import NewsDetailModal from "../components/news/NewsDetailModal";

export default function NewsInboxScreen() {
  const { items } = useNewsFeed();
  const dispatch = useAppDispatch();
  const route = useRoute();
  const [filter, setFilter] = useState("all");
  const [selectedId, setSelectedId] = useState(null);

  const filteredItems =
    filter === "unread" ? items.filter((i) => !i.read) : items;

  const markAll = () => dispatch({ type: "MARK_ALL_NEWS_READ" });

  useEffect(() => {
    const initialId = route.params?.initialId;
    if (initialId) setSelectedId(initialId);
  }, [route.params]);

  const onPressItem = (id) => {
    const item = items.find((n) => n.id === id);
    if (!item) return; // evita crash
    setSelectedId(id);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.row}
      onPress={() => onPressItem(item.id)}
      accessibilityRole="button"
      accessibilityLabel={`Abrir noticia: ${item.title}`}
    >
      <Ionicons name={item.iconName} size={24} color={Colors.text} />
      <View style={styles.rowText}>
        <Text style={styles.rowTitle}>{item.title}</Text>
        <Text style={styles.time}>{timeAgo(item.timestamp)}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={filteredItems}
        keyExtractor={(it) => it.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: Spacing.base, paddingBottom: 96 }}
        ListHeaderComponent={
          <View style={styles.headerWrapper}>
            <View style={styles.headerRow}>
              <Text style={styles.title} accessibilityRole="header">
                Bandeja de noticias
              </Text>
              <TouchableOpacity
                onPress={markAll}
                accessibilityRole="button"
                accessibilityLabel="Marcar todas las noticias como leídas"
              >
                <Text style={styles.markAll}>Marcar todo leído</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.filterRow}>
              <TouchableOpacity
                onPress={() => setFilter("all")}
                accessibilityRole="button"
                accessibilityLabel="Mostrar todas las noticias"
              >
                <Text
                  style={filter === "all" ? styles.filterActive : styles.filter}
                >
                  Todos
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFilter("unread")}
                accessibilityRole="button"
                accessibilityLabel="Mostrar noticias no leídas"
              >
                <Text
                  style={filter === "unread" ? styles.filterActive : styles.filter}
                >
                  No leídos
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        }
        accessibilityRole="list"
      />
      {selectedId && (
        <NewsDetailModal
          visible={!!selectedId}
          news={items.find((n) => n.id === selectedId)}
          onClose={() => setSelectedId(null)}
          onMarkRead={(id) =>
            dispatch({ type: "MARK_NEWS_READ", payload: { id } })
          }
        />
      )}
    </SafeAreaView>
  );
}
