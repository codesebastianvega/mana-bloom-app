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
import { Colors, Spacing } from "../../theme";
import styles from "./CreateTaskModal.styles";

const typeOptions = [
  { key: "single", label: "Tarea", activeColor: Colors.primaryLight },
  { key: "habit", label: "Hábito", activeColor: Colors.secondaryLight },
];

const elementInfo = {
  fire: {
    title: "Fuego 🔥 (Poder y Pasión)",
    description:
      "Se usa para tareas que requieren alta energía, urgencia o creatividad espontánea.",
    examples:
      "Ejemplos: Terminar un proyecto con fecha límite, una sesión de brainstorming intensa, o una tarea que te apasiona y quieres completar rápidamente.",
    purpose:
      'Propósito: "Inyecta poder y acelera el crecimiento de la planta."',
  },
  water: {
    title: "Agua 💧 (Calma y Flujo)",
    description:
      "Se usa para tareas que necesitan atención continua, concentración o un estado de calma.",
    examples:
      "Ejemplos: Planificar tu semana, leer un documento largo, o meditar.",
    purpose:
      'Propósito: "Mantiene la planta hidratada y en un crecimiento estable."',
  },
  earth: {
    title: "Tierra 🌱 (Estabilidad y Crecimiento)",
    description:
      "Se usa para tareas fundamentales, repetitivas o que construyen un hábito.",
    examples:
      "Ejemplos: Limpiar tu espacio de trabajo, hacer ejercicio, o realizar una tarea diaria de tu rutina.",
    purpose:
      'Propósito: "Proporciona una base sólida y nutrientes para un crecimiento sostenible."',
  },
  air: {
    title: "Aire 🌬️ (Libertad y Movimiento)",
    description:
      "Se usa para tareas que requieren claridad mental, comunicación o flexibilidad.",
    examples:
      "Ejemplos: Escribir un correo importante, organizar ideas, o aprender algo nuevo.",
    purpose:
      'Propósito: "Le da a la planta el espacio para respirar y expandirse."',
  },
};

const ELEMENT_ACCENTS = {
  water: {
    border: Colors.elementWater,
    bg: Colors.surface,
    pill: Colors.elementWaterLight,
    emoji: "💧",
    label: "Agua",
  },
  fire: {
    border: Colors.elementFire,
    bg: Colors.surface,
    pill: Colors.elementFireLight,
    emoji: "🔥",
    label: "Fuego",
  },
  earth: {
    border: Colors.elementEarth,
    bg: Colors.surface,
    pill: Colors.elementEarthLight,
    emoji: "🌱",
    label: "Tierra",
  },
  air: {
    border: Colors.elementAir,
    bg: Colors.surface,
    pill: Colors.elementAirLight,
    emoji: "💨",
    label: "Aire",
  },
};

const ELEMENTS = ["water", "fire", "earth", "air"];

const PRIORITY_ACCENTS = {
  easy: { label: "Baja", border: Colors.elementAir, fill: Colors.elementAirLight },
  medium: { label: "Media", border: Colors.elementEarth, fill: Colors.elementEarthLight },
  hard: { label: "Urgente", border: Colors.elementFire, fill: Colors.elementFireLight },
};

const PRIORITIES = ["easy", "medium", "hard"];

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
      <View style={styles.background}>
        <View
          style={styles.container}
          accessible={true}
          accessibilityViewIsModal={true}
          accessibilityLabel="Crear tarea"
        >
          {alert && (
            <View
              style={[
                styles.alertContainer,
                alert.type === "error"
                  ? styles.alertError
                  : styles.alertSuccess,
              ]}
            >
              <Text style={styles.alertText}>{alert.message}</Text>
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
              style={[
                styles.input,
                {
                  marginTop: Spacing.small,
                  height: 120,
                  textAlignVertical: "top",
                },
              ]}
              placeholder="Detalle o nota (opcional)"
              placeholderTextColor={Colors.textMuted}
              value={newNote}
              onChangeText={setNewNote}
              multiline
            />

            <Text style={styles.label}>Tipo</Text>
            <View style={styles.row}>
              {typeOptions.map((opt, index) => {
                const active = newType === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    accessibilityRole="button"
                    style={[
                      styles.typeOptionBtn,
                      index === typeOptions.length - 1 && { marginRight: 0 },
                      active && {
                        backgroundColor: opt.activeColor,
                        borderColor:
                          opt.key === "single"
                            ? Colors.primary
                            : Colors.secondary,
                      },
                    ]}
                    onPress={() => setNewType(opt.key)}
                  >
                    <Text
                      style={[
                        styles.typeOptionText,
                        active && { color: Colors.text },
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Elemento</Text>
            <View style={styles.elementGrid}>
              {ELEMENTS.map((key) => {
                const accent = ELEMENT_ACCENTS[key];
                const selected = newElement === key;
                return (
                  <Pressable
                    key={key}
                    onPress={() => setNewElement(key)}
                    style={[
                      styles.elementCard,
                      { borderColor: accent.border },
                      selected && styles.elementCardActive,
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`Seleccionar elemento ${accent.label}`}
                  >
                    <Text style={styles.elementEmoji}>{accent.emoji}</Text>
                    <Text style={styles.elementTitle}>{accent.label}</Text>
                    <Text style={styles.elementCaption}>
                      {key === "water"
                        ? "Fluye y enfoca"
                        : key === "fire"
                        ? "Energía y empuje"
                        : key === "earth"
                        ? "Constancia y base"
                        : "Ligereza y ritmo"}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            {newElement !== "all" && (
              <View style={styles.elementInfoBox}>
                <Text style={styles.elementInfoTitle}>
                  {elementInfo[newElement].title}
                </Text>
                <Text style={styles.elementInfoDescription}>
                  {elementInfo[newElement].description}
                </Text>
                <Text style={styles.elementInfoExamples}>
                  {elementInfo[newElement].examples}
                </Text>
                <Text style={styles.elementInfoPurpose}>
                  {elementInfo[newElement].purpose}
                </Text>
              </View>
            )}

            <Text style={styles.label}>
              Subtareas{" "}
              <Text style={styles.subtaskHint}>
                (Agrega tareas más pequeñas para facilitar tu trabajo)
              </Text>
            </Text>
            <View style={styles.subtaskInputRow}>
              <TextInput
                style={styles.subtaskInput}
                placeholder="Nueva subtarea"
                placeholderTextColor={Colors.textMuted}
                value={newSubtaskInput}
                onChangeText={setNewSubtaskInput}
              />
              <TouchableOpacity
                accessibilityRole="button"
                style={styles.addSubtaskButton}
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
              <View style={styles.subtaskList}>
                {newSubtasks.map((st, idx) => (
                  <View key={st.id || idx} style={styles.subtaskItem}>
                    <Text style={styles.subtaskText}>{st.text}</Text>
                    <TouchableOpacity
                      accessibilityRole="button"
                      onPress={() =>
                        setNewSubtasks((prev) => prev.filter((_, i) => i !== idx))
                      }
                      style={styles.removeIcon}
                    >
                      <FontAwesome5 name="times" size={12} color={Colors.text} />
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}

            <Text style={styles.label}>Prioridad</Text>
            <View style={styles.priorityList}>
              {PRIORITIES.map((p) => {
                const selected = newPriority === p;
                const accent = PRIORITY_ACCENTS[p];
                return (
                  <Pressable
                    key={p}
                    onPress={() => setNewPriority(p)}
                    style={[
                      styles.priorityRow,
                      {
                        borderColor: accent.border,
                        backgroundColor: selected
                          ? Colors.surfaceElevated || Colors.surface
                          : Colors.surface,
                      },
                    ]}
                    accessibilityRole="button"
                    accessibilityState={{ selected }}
                    accessibilityLabel={`Prioridad ${accent.label}`}
                  >
                    <Text style={styles.priorityTitle}>{accent.label}</Text>
                    <Text style={styles.priorityCaption}>
                      {p === "easy"
                        ? "Tranquila, sin apuro"
                        : p === "medium"
                        ? "Importante esta semana"
                        : "Hazlo hoy"}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <Text style={styles.label}>Dificultad</Text>
            <View style={styles.row}>
              {difficultyOptions.map((opt, index) => {
                const active = newDifficulty === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    accessibilityRole="button"
                    style={[
                      styles.difficultyOptionBtn,
                      index === difficultyOptions.length - 1 && {
                        marginRight: 0,
                      },
                      active && {
                        backgroundColor: opt.color + "33",
                        borderColor: opt.color,
                      },
                    ]}
                    onPress={() => setNewDifficulty(opt.key)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        { marginLeft: 0 },
                        active && { color: Colors.text },
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Etiquetas</Text>
            <View style={styles.tagInputRow}>
              <TextInput
                style={styles.tagInput}
                placeholder="Nueva etiqueta"
                placeholderTextColor={Colors.textMuted}
                value={newTagInput}
                onChangeText={setNewTagInput}
              />
              <TouchableOpacity
                accessibilityRole="button"
                style={styles.addTagButton}
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
              <Text style={styles.label}>Mis Etiquetas</Text>
            )}
            {uniqueTags.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.row}
                contentContainerStyle={{ alignItems: "center" }}
              >
                {uniqueTags.map((tagKey) => {
                  const active = newTags.includes(tagKey);
                  return (
                    <TouchableOpacity
                      key={tagKey}
                      accessibilityRole="button"
                      style={[
                        styles.optionBtn,
                        active && {
                          backgroundColor: Colors.accent,
                          borderColor: Colors.accent,
                        },
                      ]}
                      onPress={() => {
                        setNewTags((prev) =>
                          prev.includes(tagKey)
                            ? prev.filter((t) => t !== tagKey)
                            : [...prev, tagKey]
                        );
                      }}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          active && { color: Colors.background },
                        ]}
                      >
                        {tagKey}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}

            {newTags.length > 0 && (
              <>
                <Text style={styles.selectedTagsLabel}>Etiquetas seleccionadas</Text>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.row}
                  contentContainerStyle={{ alignItems: "center" }}
                >
                  {newTags.map((tag) => (
                    <View key={tag} style={styles.tagChip}>
                      <Text style={styles.tagText}>{tag}</Text>
                      <TouchableOpacity
                        accessibilityRole="button"
                        onPress={() =>
                          setNewTags((prev) => prev.filter((t) => t !== tag))
                        }
                        style={styles.removeIcon}
                      >
                        <FontAwesome5
                          name="times"
                          size={12}
                          color={Colors.text}
                        />
                      </TouchableOpacity>
                    </View>
                  ))}
                </ScrollView>
              </>
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: Spacing.base,
              }}
            >
              <TouchableOpacity
                accessibilityRole="button"
                style={[styles.button, styles.buttonSecondary, { marginRight: Spacing.small }]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityRole="button"
                style={[styles.button, styles.buttonPrimary]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>{task ? "Guardar" : "Crear"}</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
