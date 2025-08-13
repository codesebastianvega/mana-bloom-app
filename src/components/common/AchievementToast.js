// [MB] Módulo: Common / Sección: AchievementToast
// Afecta: HomeScreen, ProfileScreen
// Propósito: Mostrar toast cuando se desbloquea un logro
// Puntos de edición futura: animaciones, temas y posicionamiento
// Autor: Codex - Fecha: 2025-08-13

import React, { useEffect } from "react";
import { View, Text, Pressable } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./AchievementToast.styles";

export default function AchievementToast({ visible, title, onClose }) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      const t = setTimeout(onClose, 5000);
      return () => clearTimeout(t);
    }
  }, [visible, onClose]);

  if (!visible) return null;

  return (
    <View
      style={[styles.container, { top: insets.top + 8 }]}
      accessibilityRole="alert"
    >
      <Text style={styles.icon}>🏆</Text>
      <Text style={styles.text}>¡Logro desbloqueado! {title}</Text>
      <Pressable
        onPress={onClose}
        style={styles.closeButton}
        accessibilityRole="button"
        accessibilityLabel="Cerrar notificación de logro"
      >
        <Text style={styles.closeText}>✕</Text>
      </Pressable>
    </View>
  );
}

