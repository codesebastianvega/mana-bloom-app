// [MB] Módulo: Tasks / Sección: CreateTaskModal
// Afecta: CreateTaskModal
// Propósito: Modal para crear y editar tareas
// Puntos de edición futura: estilos en CreateTaskModal.styles.js
// Autor: Codex - Fecha: 2025-08-13

import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
  Platform,
  ToastAndroid,

} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Spacing, Radii, Elevation, Typography } from "../../theme";
import { LinearGradient } from "expo-linear-gradient";
import { XP_REWARD_BY_PRIORITY as PRIORITY_REWARDS } from "../../constants/rewards";

import styles from "./CreateTaskModal.styles";

const ELEMENT_ACCENTS = {
  Agua: {
    border: Colors.elementWater,
    pill: Colors.elementWaterLight,
    emoji: "💧",
    grad: ["#143a52", "#0e2a3a"],
    value: "water",
  },
  Fuego: {
    border: Colors.elementFire,
    pill: Colors.elementFireLight,
    emoji: "🔥",
    grad: ["#5a1f0d", "#3a1308"],
    value: "fire",
  },
  Tierra: {
    border: Colors.elementEarth,
    pill: Colors.elementEarthLight,
    emoji: "🌱",
    grad: ["#3d2c28", "#2a1e1b"],
    value: "earth",
  },
  Aire: {
    border: Colors.elementAir,
    pill: Colors.elementAirLight,
    emoji: "💨",
    grad: ["#2d3438", "#202629"],
    value: "air",
  },
};
const ELEMENTS = ["Agua", "Fuego", "Tierra", "Aire"];

const PRIORITIES = ["Baja", "Media", "Urgente"];
const PRIORITY_VALUES = { Baja: "easy", Media: "medium", Urgente: "hard" };
const PRIORITY_ACCENTS = {
  easy: Colors.info,
  medium: Colors.warning,
  hard: Colors.danger,
};

const applyAlpha = (hex, alpha) => {
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
};

const DIFFS = ["Fácil", "Medio", "Difícil"];
const DIFF_VALUES = { Fácil: "easy", Medio: "medium", Difícil: "hard" };

export default function CreateTaskModal({
  visible,
  onClose,
  onSave,
  onUpdate,
  task,
  uniqueTags,
  priorityOptions,
  elementOptions,
  difficultyOptions,
}) {
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newType, setNewType] = useState("single");
  const [newElement, setNewElement] = useState("all");
  const [newPriority, setNewPriority] = useState("easy");
  const [newDifficulty, setNewDifficulty] = useState("easy");
  const [newTagInput, setNewTagInput] = useState("");
  const [newTags, setNewTags] = useState([]);
  const [newSubtaskInput, setNewSubtaskInput] = useState("");
  const [newSubtasks, setNewSubtasks] = useState([]); // [{id,text,completed}]
  const [alert, setAlert] = useState(null); // { message, type }
  const [gridWidth, setGridWidth] = useState(0);

  useEffect(() => {
    if (task) {
      setNewTitle(task.title || "");
      setNewNote(task.note || "");
      setNewType(task.type || "single");
      setNewElement(task.element || "all");
      setNewPriority(task.priority || "easy");
      setNewDifficulty(task.difficulty || "easy");
      setNewTags(task.tags || []);
      setNewSubtasks(task.subtasks ? task.subtasks.map((st) => ({ ...st })) : []);
      setNewTagInput("");
      setNewSubtaskInput("");
    } else {
      setNewTitle("");
      setNewNote("");
      setNewType("single");
      setNewElement("all");
      setNewPriority("easy");
      setNewDifficulty("easy");
      setNewTagInput("");
      setNewTags([]);
      setNewSubtaskInput("");
      setNewSubtasks([]);
    }
  }, [task, visible]);

  const showAlert = (message, type = "info") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);

  };

  const handleSave = () => {
    if (!newTitle.trim()) {
      showAlert("Debes ingresar un título para la tarea.", "error");
      return;
    }
    const subtasks = newSubtasks.map((st, index) => ({
      id: st.id ?? index + 1,
      text: st.text,
      completed: st.completed || false,
    }));
    if (task) {
      onUpdate &&
        onUpdate({
          ...task,
          title: newTitle,
          note: newNote,
          type: newType,
          element: newElement,
          priority: newPriority,
          tags: newTags.length > 0 ? newTags : [],
          difficulty: newDifficulty,
          subtasks,
        });
    } else {
      onSave &&
        onSave({
          title: newTitle,
          note: newNote,
          type: newType,
          element: newElement,
          priority: newPriority,
          tags: newTags.length > 0 ? newTags : [],
          difficulty: newDifficulty,
          subtasks,
        });
    }
    setNewDifficulty("easy");
    setNewTitle("");
    setNewNote("");
    setNewType("single");
    setNewElement("all");
    setNewPriority("easy");
    setNewTagInput("");
    setNewTags([]);
    setNewSubtaskInput("");
    setNewSubtasks([]);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.overlay,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={styles.root}>


          {alert && (
            <View
              style={{
                position: "absolute",
                bottom: Spacing.xlarge,
                left: Spacing.base,
                right: Spacing.base,
                paddingVertical: Spacing.small,
                paddingHorizontal: Spacing.base,
                borderRadius: Radii.lg,
                zIndex: 2,
                alignItems: "center",
                backgroundColor:
                  alert.type === "error" ? Colors.danger : Colors.secondary,
              }}
            >
              <Text
                style={{ color: Colors.text, fontSize: 14, fontWeight: "600" }}
              >
                {alert.message}
              </Text>
            </View>
          )}
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{ paddingBottom: Spacing.large }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <Text style={styles.title}>
              {task ? "Editar Tarea" : "Crear Nueva Tarea"}
            </Text>

            <TextInput
              style={styles.input}
              placeholder="Título"
              placeholderTextColor={Colors.textMuted}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            <TextInput
              style={[styles.inputMultiline, { marginTop: Spacing.small }]}

              placeholder="Detalle o nota (opcional)"
              placeholderTextColor={Colors.textMuted}
              value={newNote}
              onChangeText={setNewNote}
              multiline
            />

            <Text style={styles.sectionLabel}>Tipo</Text>
            <View style={styles.segmentContainer}>
              <Pressable
                onPress={() => setNewType("single")}
                style={[
                  styles.segmentButton,
                  newType === "single" && styles.segmentButtonActive,
                ]}
                accessibilityRole="tab"
                accessibilityState={{ selected: newType === "single" }}
              >
                <Text
                  style={[
                    styles.segmentLabel,
                    newType === "single" && styles.segmentLabelActive,
                  ]}
                >
                  Tarea
                </Text>
              </Pressable>

              <Pressable
                onPress={() => setNewType("habit")}
                style={[
                  styles.segmentButton,
                  newType === "habit" && styles.segmentButtonActive,
                ]}
                accessibilityRole="tab"
                accessibilityState={{ selected: newType === "habit" }}
              >
                <Text
                  style={[
                    styles.segmentLabel,
                    newType === "habit" && styles.segmentLabelActive,
                  ]}
                >
                  Hábito
                </Text>
              </Pressable>
            </View>

            <Text style={styles.sectionLabel}>Elemento</Text>
            <View
              style={styles.elementGrid}
              onLayout={(e) => setGridWidth(e.nativeEvent.layout.width)}
            >
              {ELEMENTS.map((name, idx) => {
                const accent = ELEMENT_ACCENTS[name];
                const selected = newElement === accent.value;
                const cardSize = gridWidth
                  ? (gridWidth - Spacing.base) / 2
                  : 0;
                return (
                  <Pressable
                    key={name}
                    onPress={() => setNewElement(accent.value)}
                    style={[
                      styles.elementCard,
                      {
                        borderColor: accent.border,
                        width: cardSize,
                        height: cardSize,
                        marginRight: idx % 2 === 0 ? Spacing.base : 0,
                      },
                      selected && [
                        styles.elementCardActive,
                        { shadowColor: accent.border },
                      ],
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`Seleccionar elemento ${name}`}
                  >
                    {selected ? (
                      <LinearGradient
                        colors={accent.grad}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.elementGradient}
                      />
                    ) : null}
                    <Text style={styles.elementEmoji}>{accent.emoji}</Text>
                    <Text style={styles.elementTitle}>{name}</Text>
                    <Text style={styles.elementCaption}>
                      {name === "Agua"
                        ? "Fluye y enfoca"
                        : name === "Fuego"
                        ? "Energía y empuje"
                        : name === "Tierra"
                        ? "Constancia y base"
                        : "Ligereza y ritmo"}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

              <Text style={styles.sectionLabel}>
                Subtareas{" "}
                <Text style={styles.helperText}>
                  (Agrega tareas más pequeñas para facilitar tu trabajo)
                </Text>
              </Text>
            <View style={styles.subtaskRow}>
              <TextInput
                style={styles.subtaskInput}
                placeholder="Nueva subtarea"
                placeholderTextColor={Colors.textMuted}
                value={newSubtaskInput}
                onChangeText={setNewSubtaskInput}
              />
              <TouchableOpacity
                style={styles.subtaskAddBtn}

                onPress={() => {
                  const st = newSubtaskInput.trim();
                  if (!st) return;
                  setNewSubtasks((prev) => [
                    ...prev,
                    { id: Date.now(), text: st, completed: false },
                  ]);
                  setNewSubtaskInput("");
                }}
              >
                <FontAwesome5 name="plus" size={12} color={Colors.background} />
              </TouchableOpacity>
            </View>
            {newSubtasks.length > 0 && (
              <View style={styles.subtasksChips}>
                {newSubtasks.map((st, idx) => (
                  <View key={st.id || idx} style={styles.chip}>
                    <Text style={styles.chipLabel}>{st.text}</Text>
                    <TouchableOpacity
                      accessibilityRole="button"
                      onPress={() =>
                        setNewSubtasks((prev) => prev.filter((_, i) => i !== idx))
                      }
                      style={{ marginLeft: Spacing.tiny }}
                    >
                      <FontAwesome5 name="times" size={12} color={Colors.text} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            <Text style={styles.sectionLabel}>Prioridad</Text>
            <View style={styles.priorityList}>
              {PRIORITIES.map((p) => {
                const keyVal = PRIORITY_VALUES[p];
                const selected = newPriority === keyVal;
                const rw = PRIORITY_REWARDS[p] || { xp: 0, mana: 0 };
                const accent = PRIORITY_ACCENTS[keyVal];
                return (
                  <Pressable
                    key={p}
                    onPress={() => setNewPriority(keyVal)}
                    style={[
                      styles.priorityRow,
                      selected && {
                        borderColor: accent,
                        backgroundColor: applyAlpha(accent, 0.15),
                      },
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`Prioridad ${p}`}
                  >
                    <View style={styles.priorityLeft}>
                      <Text
                        style={[
                          styles.priorityTitle,
                          selected && { color: accent },
                        ]}
                      >
                        {p}
                      </Text>
                      <Text style={styles.priorityCaption}>
                        {p === "Baja"
                          ? "Tranquila, sin apuro"
                          : p === "Media"
                          ? "Importante esta semana"
                          : "Hazlo hoy"}
                      </Text>
                    </View>
                    <View style={styles.priorityRewards}>
                      <View
                        style={[
                          styles.rewardPill,
                          selected && { borderColor: accent },
                        ]}
                      >
                        <Text
                          style={[
                            styles.rewardText,
                            selected && { color: accent },
                          ]}
                        >
                          +{rw.xp} XP
                        </Text>
                      </View>
                      <View
                        style={[
                          styles.rewardPill,
                          selected && { borderColor: accent },
                        ]}
                      >
                        <Text
                          style={[
                            styles.rewardText,
                            selected && { color: accent },
                          ]}
                        >
                          +{rw.mana} Maná
                        </Text>
                      </View>
                    </View>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.sectionLabel}>Dificultad</Text>
            <View style={styles.chipsContainer}>
              {DIFFS.map((d) => {
                const val = DIFF_VALUES[d];
                const selected = newDifficulty === val;
                return (
                  <Pressable
                    key={d}
                    onPress={() => setNewDifficulty(val)}
                    style={[styles.chip, selected && styles.chipActive]}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`Dificultad ${d}`}
                  >
                    <Text
                      style={[
                        styles.chipLabel,
                        selected && styles.chipLabelActive,
                      ]}
                    >
                      {d}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.sectionLabel}>Etiquetas</Text>
            <View style={styles.subtaskRow}>
              <TextInput
                style={styles.subtaskInput}
                placeholder="Nueva etiqueta"
                placeholderTextColor={Colors.textMuted}
                value={newTagInput}
                onChangeText={setNewTagInput}
              />
              <TouchableOpacity
                style={styles.subtaskAddBtn}

                onPress={() => {
                  const tag = newTagInput.trim();
                  if (!tag) return;
                  setNewTags((prev) => [...new Set([...prev, tag])]);
                  setNewTagInput("");
                  showAlert("Etiqueta creada", "success");
                }}
              >
                <FontAwesome5 name="plus" size={12} color={Colors.background} />
              </TouchableOpacity>
            </View>
            {uniqueTags.length > 0 && (
              <Text style={styles.sectionLabel}>Mis Etiquetas</Text>
            )}
            {uniqueTags.length > 0 && (
              <View style={styles.tagsList}>
                {uniqueTags.map((tagKey) => {
                  const active = newTags.includes(tagKey);
                  return (
                    <Pressable
                      key={tagKey}
                      accessibilityRole="button"
                      onPress={() => {
                        setNewTags((prev) =>
                          prev.includes(tagKey)
                            ? prev.filter((t) => t !== tagKey)
                            : [...prev, tagKey]
                        );
                      }}
                      style={[
                        styles.tagChip,
                        active && styles.chipActive,
                      ]}
                    >
                      <Text
                        style={[
                          styles.tagText,
                          active && styles.chipLabelActive,
                        ]}
                      >
                        {tagKey}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            )}

            {newTags.length > 0 && (
              <>
                <Text style={styles.sectionLabel}>Etiquetas seleccionadas</Text>
                <View style={styles.tagsList}>
                  {newTags.map((tag) => (
                    <View key={tag} style={styles.tagChip}>
                      <Text style={styles.tagText}>{tag}</Text>
                      <TouchableOpacity
                        accessibilityRole="button"
                        onPress={() =>
                          setNewTags((prev) => prev.filter((t) => t !== tag))
                        }
                        style={{ marginLeft: Spacing.tiny }}
                      >
                        <FontAwesome5
                          name="times"
                          size={12}
                          color={Colors.text}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </View>
              </>
            )}

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.secondaryButton, { borderColor: Colors.danger }]}

                onPress={onClose}
              >
                <Text style={styles.secondaryButtonLabel}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.primaryButton}
                onPress={handleSave}
              >
                <Text style={styles.primaryButtonLabel}>Guardar</Text>

              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
