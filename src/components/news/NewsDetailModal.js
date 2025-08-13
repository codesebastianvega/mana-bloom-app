// [MB] Módulo: Noticias / Componente: NewsDetailModal
// Afecta: NewsInboxScreen
// Propósito: Mostrar detalle de una noticia con acciones de lectura
// Puntos de edición futura: conectar cuerpo real y animaciones
// Autor: Codex - Fecha: 2025-08-13

import React, { useEffect, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  AccessibilityInfo,
  findNodeHandle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "../../theme";
import { timeAgo } from "../../utils/time";
import styles from "./NewsDetailModal.styles";

export default function NewsDetailModal({ visible, news, onClose, onMarkRead }) {
  const titleRef = useRef(null);

  useEffect(() => {
    const node = findNodeHandle(titleRef.current);
    if (node) {
      AccessibilityInfo.setAccessibilityFocus(node);
    }
  }, [news]);

  if (!news) {
    return (
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={onClose}
      >
        <View style={styles.overlay}>
          <View style={styles.content} accessibilityRole="dialog">
            <TouchableOpacity
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Cerrar detalle de noticia"
            >
              <Text style={styles.actionText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  }

  const handleMark = () => {
    onMarkRead(news.id);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.content} accessibilityRole="dialog">
          <Ionicons
            name={news.iconName}
            size={48}
            color={Colors.text}
            style={styles.icon}
          />
          <Text ref={titleRef} style={styles.title} accessibilityRole="header">
            {news.title}
          </Text>
          <Text style={styles.date}>{timeAgo(news.timestamp)}</Text>
          <Text style={styles.body} accessibilityRole="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vestibulum id ligula porta felis euismod semper. Donec id elit
            non mi porta gravida at eget metus.

            Sed posuere consectetur est at lobortis. Maecenas faucibus mollis
            interdum. Integer posuere erat a ante venenatis dapibus.

            Cras mattis consectetur purus sit amet fermentum. Praesent commodo
            cursus magna, vel scelerisque nisl consectetur et.
          </Text>
          <View style={styles.actions}>
            {!news.read && (
              <TouchableOpacity
                onPress={handleMark}
                accessibilityRole="button"
                accessibilityLabel="Marcar noticia como leída"
              >
                <Text style={styles.actionText}>Marcar leído</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Cerrar detalle de noticia"
            >
              <Text style={styles.actionText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
