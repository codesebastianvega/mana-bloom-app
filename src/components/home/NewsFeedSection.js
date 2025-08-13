// [MB] Módulo: Home / Componente: NewsFeedSection
// Afecta: HomeScreen
// Propósito: Mostrar noticias con marca de leído y persistencia
// Puntos de edición futura: conectar con feed real y ajustar estilos
// Autor: Codex - Fecha: 2025-08-13

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../theme";
import styles from "./NewsFeedSection.styles";
import {
  useNewsFeed,
  useAppDispatch,
  useHydrationStatus,
} from "../../state/AppContext";
import SectionPlaceholder from "./SectionPlaceholder";

function timeAgo(iso) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const m = Math.floor(diffMs / 60000);
  const h = Math.floor(m / 60);
  const d = Math.floor(h / 24);
  if (m < 60) return `hace ${m} min`;
  if (h < 24) return `hace ${h} h`;
  if (d === 1) return "ayer";
  return `hace ${d} días`;
}

export default function NewsFeedSection() {
  const { items } = useNewsFeed();
  const dispatch = useAppDispatch();
  const hydration = useHydrationStatus();

  const markAll = () => dispatch({ type: "MARK_ALL_NEWS_READ" });
  const handlePress = (id) => {
    dispatch({ type: "MARK_NEWS_READ", payload: { id } });
  };

  if (hydration.news) {
    return <SectionPlaceholder height={220} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Noticias</Text>
        <TouchableOpacity onPress={markAll}>
          <Text style={styles.markAll}>Marcar todo como leído</Text>
        </TouchableOpacity>
      </View>
      {items.length === 0 ? (
        <Text style={styles.emptyText}>No hay noticias por ahora</Text>
      ) : (
        items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.row}
            onPress={() => handlePress(item.id)}
          >
            <Ionicons name={item.iconName} size={20} color={Colors.text} />
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{item.title}</Text>
              <Text style={styles.time}>{timeAgo(item.timestamp)}</Text>
            </View>
            {!item.read && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        ))
      )}
    </View>
  );
}
