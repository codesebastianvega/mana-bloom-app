// [MB] Módulo: Home / Componente: NewsFeedSection
// Afecta: HomeScreen
// Propósito: Mostrar noticias con marca de leído y persistencia
// Puntos de edición futura: conectar con feed real y ajustar estilos
// Autor: Codex - Fecha: 2025-08-13

import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "../../theme";
import styles from "./NewsFeedSection.styles";
import { useNewsFeed, useHydrationStatus } from "../../state/AppContext";
import { timeAgo } from "../../utils/time";
import SectionPlaceholder from "./SectionPlaceholder";

export default function NewsFeedSection() {
  const { items } = useNewsFeed();
  const navigation = useNavigation();
  const hydration = useHydrationStatus();

  if (hydration.news) {
    return <SectionPlaceholder height={220} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title} accessibilityRole="header">
          Noticias
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("NewsInboxModal")}
          accessibilityRole="button"
          accessibilityLabel="Ver todas las noticias"
        >
          <Text style={styles.viewAll}>Ver todo</Text>
        </TouchableOpacity>
      </View>
      {items.length === 0 ? (
        <Text style={styles.emptyText}>No hay noticias por ahora</Text>
      ) : (
        items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.row}
            onPress={() =>
              navigation.navigate("NewsInboxModal", { initialId: item.id })
            }
            accessibilityRole="button"
            accessibilityLabel={`Abrir noticia: ${item.title}`}
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
