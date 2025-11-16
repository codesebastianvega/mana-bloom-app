// [MB] Módulo: Planta / Sección: RitualModalLayout
// Afecta: modales de rituales
// Propósito: Unificar la apariencia y estructura base de los modales
// Puntos de edición futura: añadir variantes para full-screen o warnings
// Autor: Codex - Fecha: 2025-11-14

import React from "react";
import { Modal, View, Text, Pressable, StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default function RitualModalLayout({
  visible,
  onClose,
  title,
  subtitle,
  children,
  footer,
  showCloseButton = false,
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <View style={styles.header}>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{title}</Text>
              {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
            </View>
            {showCloseButton ? (
              <Pressable hitSlop={8} onPress={onClose} accessibilityLabel="Cerrar modal">
                <Text style={styles.closeText}>✕</Text>
              </Pressable>
            ) : null}
          </View>
          <View style={styles.content}>{children}</View>
          {footer}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "flex-end",
  },
  card: {
    backgroundColor: Colors.surfaceElevated,
    borderTopLeftRadius: Radii.xl,
    borderTopRightRadius: Radii.xl,
    padding: Spacing.large,
    gap: Spacing.base,
  },
  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.small,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
    marginTop: Spacing.tiny / 2,
  },
  closeText: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  content: {
    gap: Spacing.base,
  },
});
