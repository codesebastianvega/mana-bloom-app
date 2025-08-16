// [MB] Módulo: Tasks / Sección: CreateTaskModal
// Afecta: CreateTaskModal
// Propósito: Modal para crear y editar tareas
// Puntos de edición futura: estilos en CreateTaskModal.styles.js
// Autor: Codex - Fecha: 2025-08-16

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
import { XP_REWARD_BY_PRIORITY as PRIORITY_REWARDS } from "../../constants/rewards";

import ElementGrid from "./ElementGrid";
import ElementInfoSheet from "./ElementInfoSheet";
import styles from "./CreateTaskModal.styles";

const PRIORITIES = ["Baja", "Media", "Urgente"];
const PRIORITY_VALUES = { Baja: "easy", Media: "medium", Urgente: "hard" };
const PriorityAccents = {
  easy: Colors.info,
  medium: Colors.warning,
  hard: Colors.danger,
};

const withAlpha = (hex, alpha) => {
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
};

const ELEMENT_INFO = {
  fire: {
    title: "Fuego 🔥 (Poder y Pasión)",
    description:
      "Se usa para tareas que requieren alta energía, urgencia o creatividad espontánea.",
    examples: [
      "Enviar propuesta con deadline hoy",
      "Pitch rápido/brainstorm",
      "Entrenamiento intenso",
      "Resolver bug crítico",
      "Grabar video/toma creativa",
      "Lanzar campaña",
      "Limpiar backlog urgente",
    ],
    purpose:
      'Propósito: "Inyecta poder y acelera el crecimiento de la planta."',
  },
  water: {
    title: "Agua 💧 (Calma y Flujo)",
    description:
      "Se usa para tareas que necesitan atención continua, concentración o un estado de calma.",
    examples: [
      "Planificar semana",
      "Leer/estudiar 30–60 min",
      "Redactar documento largo",
      "Procesar correos",
      "Meditación/respiración",
      "Refinar notas",
      "Revisión tranquila de PRs",
    ],
    purpose:
      'Propósito: "Mantiene la planta hidratada y en un crecimiento estable."',
  },
  earth: {
    title: "Tierra 🌱 (Estabilidad y Crecimiento)",
    description:
      "Se usa para tareas fundamentales, repetitivas o que construyen un hábito.",
    examples: [
      "Rutina de ejercicio",
      "Ordenar escritorio",
      "Lavar/organizar",
      "Contabilidad/domésticos",
      "Repasar vocabulario",
      "Backup/limpieza sistema",
      "Hábitos diarios",
    ],
    purpose:
      'Propósito: "Proporciona una base sólida y nutrientes para un crecimiento sostenible."',
  },
  air: {
    title: "Aire 🌬️ (Libertad y Movimiento)",
    description:
      "Se usa para tareas que requieren claridad mental, comunicación o flexibilidad.",
    examples: [
      "Escribir correo importante",
      "Organizar ideas/Mindmap",
      "Aprender concepto nuevo",
      "Llamada breve/agenda",
      "Revisar roadmap",
      "Plan de estudio",
      "Documentar decisiones",
    ],
    purpose:
      'Propósito: "Le da a la planta el espacio para respirar y expandirse."',
  },
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
  const [infoElement, setInfoElement] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);

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
    <>
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
            <ElementGrid
              value={newElement}
              onChange={setNewElement}
              tileAspect={0.78}
              onLongPress={(el) => {
                setInfoElement(el);
                setInfoVisible(true);
              }}
            />
            <View style={styles.whichBlock}>
              <Text style={styles.whichQuestion}>¿Cuál elijo?</Text>
              <View style={styles.whichRow}>
                <Text style={styles.whichSnippet} numberOfLines={1}>
                  {ELEMENT_INFO[newElement]?.description}
                </Text>
                <TouchableOpacity
                  accessibilityRole="button"
                  onPress={() => {
                    setInfoElement(newElement);
                    setInfoVisible(true);
                  }}
                >
                  <Text style={styles.whichMore}>Ver más</Text>
                </TouchableOpacity>
              </View>
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
                const level = PRIORITY_VALUES[p];
                const isActive = newPriority === level;
                const rw = PRIORITY_REWARDS[p] || { xp: 0, mana: 0 };
                const accent = PriorityAccents[level];
                return (
                  <Pressable
                    key={p}
                    onPress={() => setNewPriority(level)}
                    style={[
                      styles.priorityRow,
                      isActive && {
                        borderColor: accent,
                        backgroundColor: withAlpha(accent, 0.14),
                        ...(Elevation.raised || {}),
                        shadowColor: accent,
                      },
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isActive }}
                    accessibilityLabel={`Prioridad ${p}`}
                  >
                    <View style={styles.priorityLeft}>
                      <Text
                        style={[
                          styles.priorityTitle,
                          isActive && { color: accent },
                        ]}
                      >
                        {p}
                      </Text>
                      <Text
                        style={[
                          styles.priorityCaption,
                          isActive && { color: accent },
                        ]}
                        numberOfLines={1}
                      >
                        {p === "Baja"
                          ? "Tranquila, sin apuro"
                          : p === "Media"
                          ? "Importante esta semana"
                          : "Hazlo hoy"}
                      </Text>
                    </View>
                    <View style={styles.priorityRewards}>
                      <View style={styles.rewardPill}>
                        <Text style={styles.rewardText}>+{rw.xp} XP</Text>
                      </View>
                      <View style={styles.rewardPill}>
                        <Text style={styles.rewardText}>+{rw.mana} Maná</Text>
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
    <ElementInfoSheet
      visible={infoVisible}
      element={infoElement}
      info={ELEMENT_INFO}
      onClose={() => setInfoVisible(false)}
    />
  </>
  );
}
