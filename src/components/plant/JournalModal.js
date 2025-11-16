// [MB] Modulo: Planta / Seccion: Ritual Notas/Journal
// Afecta: PlantScreen (rituales de bienestar)
// Proposito: Registrar notas rapidas para luego mostrarlas en el Perfil
// Puntos de edicion futura: Persistencia real y listados
// Autor: Codex - Fecha: 2025-11-13

import React, { useState, useEffect, useMemo } from "react";
import { View, Text, Pressable, StyleSheet, TextInput, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Spacing, Radii, Typography } from "../../theme";
import RitualModalLayout from "./RitualModalLayout";
import { ACTION_MECHANICS } from "./actionMechanics";

const JOURNAL_MECHANIC = ACTION_MECHANICS.journal || {};
const MAX_NOTE_CHARS = 400;

export default function JournalModal({
  visible,
  onClose,
  onSave,
  initialValue = "",
  placeholder = "Que aprendiste hoy?",
  onDraftChange,
}) {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState(initialValue);
  const [guideExpanded, setGuideExpanded] = useState(false);

  useEffect(() => {
    if (visible) {
      setTitle("");
      setNote(initialValue);
      onDraftChange?.(initialValue || "");
    } else {
      setGuideExpanded(false);
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

  const cadenceCopy = JOURNAL_MECHANIC.cadence || "1 entrada al dia";
  const summaryCopy =
    JOURNAL_MECHANIC.summary || "Escribir antes de dormir limpia tu mente y calma la planta.";
  const cues = useMemo(
    () => (Array.isArray(JOURNAL_MECHANIC.cues) ? JOURNAL_MECHANIC.cues.slice(0, 2) : []),
    []
  );
  const tips = useMemo(
    () => (Array.isArray(JOURNAL_MECHANIC.tips) ? JOURNAL_MECHANIC.tips.slice(0, 2) : []),
    []
  );
  const stackCopy = Array.isArray(JOURNAL_MECHANIC.stack) ? JOURNAL_MECHANIC.stack[0] : null;
  const hasExtendedGuide = cues.length || tips.length || stackCopy;
  const metaEntries = [
    { icon: "book", text: "Diario intimo", color: Colors.ritualJournal },
    cadenceCopy ? { icon: "redo-alt", text: cadenceCopy, color: Colors.ritualStretch } : null,
    JOURNAL_MECHANIC.cooldownMin
      ? { icon: "history", text: `${JOURNAL_MECHANIC.cooldownMin} min cooldown`, color: Colors.ritualHydrate }
      : null,
  ].filter(Boolean);

  const remainingChars = Math.max(0, MAX_NOTE_CHARS - note.length);

  const metaTrack =
    metaEntries.length > 0 ? (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.metaInlineTrack}
      >
        {metaEntries.map((entry, index) => (
          <React.Fragment key={`${entry.icon}-${entry.text}-${index}`}>
            <View style={styles.metaInlineItem}>
              <FontAwesome5 name={entry.icon} size={12} color={entry.color} />
              <Text style={[styles.metaInlineText, { color: entry.color }]}>{entry.text}</Text>
            </View>
            {index < metaEntries.length - 1 ? (
              <Text style={styles.metaInlineDivider}>|</Text>
            ) : null}
          </React.Fragment>
        ))}
      </ScrollView>
    ) : null;

  const guidanceBlock =
    summaryCopy || hasExtendedGuide ? (
      <View style={[styles.guidance, !guideExpanded && !hasExtendedGuide && styles.guidanceTight]}>
        <Text style={styles.guidanceTitle}>Momento de registro</Text>
        {summaryCopy ? <Text style={styles.guidanceCopy}>{summaryCopy}</Text> : null}
        {guideExpanded && hasExtendedGuide ? (
          <View style={styles.guidanceGroup}>
            {cues.map((cue) => (
              <View key={cue} style={styles.groupItem}>
                <View style={styles.groupBullet} />
                <Text style={styles.groupText}>{cue}</Text>
              </View>
            ))}
            {tips.map((tip) => (
              <View key={tip} style={styles.groupItem}>
                <View style={styles.groupBullet} />
                <Text style={styles.groupText}>{tip}</Text>
              </View>
            ))}
            {stackCopy ? (
              <View style={styles.groupItem}>
                <View style={styles.groupBullet} />
                <Text style={styles.groupText}>{stackCopy}</Text>
              </View>
            ) : null}
          </View>
        ) : null}
        {hasExtendedGuide ? (
          <Pressable style={styles.linkButton} onPress={() => setGuideExpanded((prev) => !prev)}>
            <Text style={styles.linkButtonText}>
              {guideExpanded ? "Ocultar guia completa" : "Ver guia completa"}
            </Text>
          </Pressable>
        ) : null}
      </View>
    ) : null;

  return (
    <RitualModalLayout
      visible={visible}
      onClose={handleClose}
      title="Diario intimo"
      subtitle="Lo que sientes hoy enraiza la luz de manana."
      footer={
        <View style={styles.footerStack}>
          <Pressable
            style={[styles.primaryButton, !note.trim() && styles.primaryButtonDisabled]}
            onPress={handleSave}
            disabled={!note.trim()}
          >
            <Text style={styles.primaryText}>Guardar nota</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={handleClose}>
            <Text style={styles.secondaryText}>Cerrar</Text>
          </Pressable>
        </View>
      }
    >
      {metaTrack}
      {guidanceBlock}
      <LinearGradient colors={["#120717", "#08030b"]} style={styles.panel}>
        <Text style={styles.quote}>"Lo que escondes en tinta florece en calma."</Text>
        <Text style={styles.helper}>
          Escribe sin filtros; la planta resguarda lo que el corazon no siempre dice.
        </Text>
        <View style={styles.fieldBlock}>
          <Text style={styles.fieldLabel}>Titulo</Text>
          <Text style={styles.fieldHint}>Ayuda a reconocer la nota despues.</Text>
          <TextInput
            style={styles.inputTitle}
            placeholder="Titulo opcional"
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.fieldBlock}>
          <View style={styles.noteHeader}>
            <Text style={styles.fieldLabel}>Contenido</Text>
            <Text style={styles.counter}>Quedan {remainingChars}</Text>
          </View>
          <TextInput
            style={styles.inputNote}
            placeholder={placeholder}
            placeholderTextColor="rgba(255,255,255,0.4)"
            value={note}
            onChangeText={handleChangeNote}
            multiline
            maxLength={MAX_NOTE_CHARS}
          />
        </View>
      </LinearGradient>
    </RitualModalLayout>
  );
}

const styles = StyleSheet.create({
  metaInlineTrack: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.small,
  },
  metaInlineItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  metaInlineText: {
    ...Typography.caption,
    color: Colors.text,
  },
  metaInlineDivider: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginHorizontal: Spacing.small,
  },
  guidance: {
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    backgroundColor: "rgba(242,141,178,0.12)",
    borderWidth: 1,
    borderColor: "rgba(242,141,178,0.35)",
    gap: Spacing.small,
    marginBottom: Spacing.small,
  },
  guidanceTight: {
    paddingVertical: Spacing.tiny,
  },
  guidanceTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  guidanceCopy: {
    ...Typography.body,
    color: Colors.text,
  },
  guidanceGroup: {
    gap: Spacing.tiny,
  },
  groupItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.tiny,
  },
  groupBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.ritualJournal,
    marginTop: 6,
  },
  groupText: {
    ...Typography.caption,
    color: Colors.textMuted,
    flex: 1,
  },
  linkButton: {
    paddingVertical: Spacing.tiny,
  },
  linkButtonText: {
    ...Typography.caption,
    color: Colors.ritualJournal,
    fontWeight: "700",
  },
  panel: {
    borderRadius: Radii.xl,
    padding: Spacing.large,
    gap: Spacing.base,
  },
  fieldBlock: {
    gap: Spacing.tiny / 2,
  },
  fieldLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  fieldHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  noteHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  counter: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  footerStack: {
    gap: Spacing.small,
  },
  quote: {
    ...Typography.caption,
    color: Colors.text,
    opacity: 0.8,
    fontStyle: "italic",
  },
  helper: {
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
    shadowOpacity: 0,
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
