// [MB] Módulo: Tasks / Sección: CreateTaskModal - ElementInfoSheet
// Afecta: CreateTaskModal (sheet informativa de elementos)
// Propósito: Mostrar información detallada del elemento seleccionado
// Puntos de edición futura: contenido y accesibilidad
// Autor: Codex - Fecha: 2025-08-22

import React, { useEffect, useRef } from "react";
import {
  Modal,
  Text,
  TouchableWithoutFeedback,
  Animated,
  Pressable,
  StyleSheet,
} from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default function ElementInfoSheet({ visible, element, info, onClose }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.timing(anim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(anim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [visible, anim]);

  const translateY = anim.interpolate({ inputRange: [0, 1], outputRange: [300, 0] });
  const opacity = anim;

  const data = element ? info[element] || {} : {};

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <Animated.View style={[styles.backdrop, { opacity }]} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.sheet, { transform: [{ translateY }] }]}>
        <Text accessibilityRole="header" style={styles.title}>
          {data.title}
        </Text>
        <Text style={styles.text}>{data.description}</Text>
        <Text style={styles.text}>{data.examples}</Text>
        <Text style={styles.text}>{data.purpose}</Text>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Cerrar información de elemento"
          onPress={onClose}
          style={styles.close}
        >
          <Text style={styles.closeLabel}>Cerrar</Text>
        </Pressable>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Radii.lg,
    borderTopRightRadius: Radii.lg,
    padding: Spacing.large,
  },
  title: { ...Typography.h2, color: Colors.text, marginBottom: Spacing.small },
  text: { ...Typography.body, color: Colors.text, marginBottom: Spacing.small },
  close: { marginTop: Spacing.small, alignSelf: "flex-end" },
  closeLabel: { ...Typography.body, color: Colors.info },
});

