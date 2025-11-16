
// [MB] Módulo: Planta / Sección: Ritual Notas/Journal
// Afecta: PlantScreen (rituales de bienestar)
// Propósito: Registrar notas rápidas para luego mostrarlas en el Perfil
// Puntos de edición futura: Persistencia real y listados
// Autor: Codex - Fecha: 2025-11-13

import React, { useState, useEffect } from "react";
import { Modal, View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default function JournalModal({
  visible,
  onClose,
  onSave,
  initialValue = "",
  placeholder = "¿Qué aprendiste hoy?",
  onDraftChange,
}) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState(initialValue);

  useEffect(() => {
    if (visible) {
      setTitle("");
      setNote(initialValue);
      onDraftChange?.(initialValue || "");
    }
  }, [visible, initialValue, onDraftChange]);

  const handleSave = () => {
    if (!note.trim()) return;
    onSave?.({
      title: title.trim(),
      note: note.trim(),
      createdAt: new Date().toISOString(),
    });
    onDraftChange?.("");
    setTitle("");
    setNote("");
  };

  const handleClose = () => {
    onDraftChange?.(note);
    onClose?.();
  };

  const handleChangeNote = (value) => {
    setNote(value);
    onDraftChange?.(value);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={handleClose}>
      <View style={styles.backdrop}>
        <LinearGradient colors={["#120717", "#08030b"]} style={styles.card}>
          <Text style={styles.title}>Diario íntimo</Text>
          <Text style={styles.quote}>“Lo que sientes hoy enraíza la luz de mañana.”</Text>
          <Text style={styles.subtitle}>
            Escribe sin filtros; la planta resguarda lo que el corazón no siempre dice.
          </Text>
          <TextInput
            style={styles.inputTitle}
            placeholder="Título opcional"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.inputNote}
            placeholder={placeholder}
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={note}
            onChangeText={handleChangeNote}
            multiline
          />
          <Pressable style={[styles.primaryButton, !note.trim() && styles.primaryButtonDisabled]} onPress={handleSave} disabled={!note.trim()}>
            <Text style={styles.primaryText}>Guardar nota</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={handleClose}>
            <Text style={styles.secondaryText}>Cerrar</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.8)",
    justifyContent: "flex-end",
  },
  card: {
    borderTopLeftRadius: Radii.xl,
    borderTopRightRadius: Radii.xl,
    padding: Spacing.large,
    gap: Spacing.base,
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  quote: {
    ...Typography.caption,
    color: Colors.text,
    opacity: 0.8,
    fontStyle: "italic",
  },
  subtitle: {
    ...Typography.body,
    color: Colors.text,
    opacity: 0.85,
  },
  inputTitle: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    padding: Spacing.base,
    color: Colors.text,
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  inputNote: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
    padding: Spacing.base,
    minHeight: 140,
    textAlignVertical: "top",
    color: Colors.text,
    backgroundColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  primaryButton: {
    borderRadius: Radii.pill,
    paddingVertical: Spacing.small,
    alignItems: "center",
    backgroundColor: Colors.ritualJournal,
    shadowColor: Colors.ritualJournal,
    shadowOpacity: 0.4,
    shadowRadius: 12,
  },
  primaryButtonDisabled: {
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  primaryText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  secondaryButton: {
    alignItems: "center",
    paddingVertical: Spacing.small,
  },
  secondaryText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});
