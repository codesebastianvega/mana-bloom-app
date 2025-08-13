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
import { useAppDispatch } from "../../state/AppContext";
import { Colors } from "../../theme";
import styles from "./NewsDetailModal.styles";

export default function NewsDetailModal({ news, onClose }) {
  const dispatch = useAppDispatch();
  const titleRef = useRef(null);

  useEffect(() => {
    if (!news.read) {
      dispatch({ type: "MARK_NEWS_READ", payload: { id: news.id } });
    }
    const node = findNodeHandle(titleRef.current);
    if (node) {
      AccessibilityInfo.setAccessibilityFocus(node);
    }
  }, [news, dispatch]);

  const handleMark = () => {
    dispatch({ type: "MARK_NEWS_READ", payload: { id: news.id } });
    onClose();
  };

  const formattedDate = new Date(news.timestamp).toLocaleDateString("es-ES");

  return (
    <Modal
      visible
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
          <Text style={styles.date}>{formattedDate}</Text>
          <Text style={styles.body} accessibilityRole="text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Vestibulum id ligula porta felis euismod semper.
            Donec id elit non mi porta gravida at eget metus.

            Sed posuere consectetur est at lobortis. Maecenas faucibus
            mollis interdum. Integer posuere erat a ante venenatis dapibus.

            Cras mattis consectetur purus sit amet fermentum. Praesent
            commodo cursus magna, vel scelerisque nisl consectetur et.
          </Text>
          <View style={styles.actions}>
            <TouchableOpacity
              onPress={onClose}
              accessibilityRole="button"
              accessibilityLabel="Cerrar detalle de noticia"
            >
              <Text style={styles.actionText}>Cerrar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleMark}
              accessibilityRole="button"
              accessibilityLabel="Marcar noticia como leída"
            >
              <Text style={styles.actionText}>Marcar leído</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
