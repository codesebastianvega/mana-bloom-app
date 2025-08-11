// src/components/CreateTaskModal/CreateTaskModal.js

import React, { useState } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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

export default function CreateTaskModal({
  visible,
  onClose,
  onSave,
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
  const [newSubtasks, setNewSubtasks] = useState([]);

  const handleSave = () => {
    if (!newTitle.trim()) return;
    onSave({
      title: newTitle,
      note: newNote,
      type: newType,
      element: newElement,
      priority: newPriority,
      tags: newTags.length > 0 ? newTags : [],
      difficulty: newDifficulty,
      subtasks: newSubtasks.map((text, index) => ({
        id: index + 1,
        text,
        completed: false,
      })),
    });
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
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.background}>
        <View style={styles.container}>
          <ScrollView
            style={{ width: "100%" }}
            contentContainerStyle={{ paddingBottom: Spacing.large }}
            showsVerticalScrollIndicator={false}
          >
            <Text style={styles.title}>Crear Nueva Tarea</Text>

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
                  paddingBottom: 40,
                  textAlignVertical: "top",
                },
              ]}
              placeholder="Detalle o nota (opcional)"
              placeholderTextColor={Colors.textMuted}
              value={newNote}
              onChangeText={setNewNote}
            />

            <Text style={styles.label}>Tipo</Text>
            <View style={styles.row}>
              {typeOptions.map((opt, index) => {
                const active = newType === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    style={[
                      styles.typeOptionBtn,
                      index === typeOptions.length - 1 && { marginRight: 0 },
                      active && { backgroundColor: opt.activeColor },
                    ]}
                    onPress={() => setNewType(opt.key)}
                  >
                    <Text
                      style={[
                        styles.typeOptionText,
                        active && { color: Colors.background },
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
              {elementOptions.map((el) => {
                const active = newElement === el.key;
                return (
                  <TouchableOpacity
                    key={el.key}
                    style={styles.elementBtn}
                    onPress={() => setNewElement(el.key)}
                  >
                    <LinearGradient
                      colors={
                        active
                          ? el.gradient
                          : [Colors.filterBtnBg, Colors.filterBtnBg]
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.elementBtnInner}
                    >
                      <FontAwesome5
                        name={el.icon}
                        size={16}
                        color={active ? Colors.background : Colors.text}
                      />
                      <Text
                        style={[
                          styles.optionText,
                          { color: active ? Colors.background : Colors.text },
                        ]}
                      >
                        {el.label}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
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
                style={styles.addSubtaskButton}
                onPress={() => {
                  const st = newSubtaskInput.trim();
                  if (!st) return;
                  setNewSubtasks((prev) => [...prev, st]);
                  setNewSubtaskInput("");
                }}
              >
                <FontAwesome5 name="plus" size={12} color={Colors.background} />
              </TouchableOpacity>
            </View>
            {newSubtasks.length > 0 && (
              <View style={styles.subtaskList}>
                {newSubtasks.map((st, idx) => (
                  <View key={idx} style={styles.subtaskItem}>
                    <Text style={styles.subtaskText}>{st}</Text>
                  </View>
                ))}
              </View>
            )}

            <Text style={styles.label}>Prioridad</Text>
            <View style={styles.priorityContainer}>
              {priorityOptions.map((pr) => {
                const active = newPriority === pr.key;
                return (
                  <TouchableOpacity
                    key={pr.key}
                    style={[
                      styles.priorityBtn,
                      { borderRightColor: pr.color },
                      active && {
                        backgroundColor: pr.color,
                      },
                    ]}
                    onPress={() => setNewPriority(pr.key)}
                  >
                    <Text
                      style={[
                        styles.priorityTitle,
                        active && { color: Colors.background },
                      ]}
                    >
                      {pr.label}
                    </Text>
                    <Text
                      style={[
                        styles.prioritySubtitle,
                        active && { color: Colors.background },
                      ]}
                    >
                      {`+${pr.xp} XP • +${pr.mana} Maná`}
                    </Text>
                  </TouchableOpacity>
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
                    style={[
                      styles.difficultyOptionBtn,
                      index === difficultyOptions.length - 1 && {
                        marginRight: 0,
                      },
                      active && {
                        backgroundColor: opt.color,
                        borderColor: opt.color,
                      },
                    ]}
                    onPress={() => setNewDifficulty(opt.key)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        { marginLeft: 0 },
                        active && { color: Colors.background },
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
                style={styles.addTagButton}
                onPress={() => {
                  const tag = newTagInput.trim();
                  if (!tag) return;
                  setNewTags((prev) => [...new Set([...prev, tag])]);
                  setNewTagInput("");
                }}
              >
                <FontAwesome5 name="plus" size={12} color={Colors.background} />
              </TouchableOpacity>
            </View>
            {uniqueTags.length > 0 && (
              <Text style={styles.label}>Selecciona etiquetas</Text>
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
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.row}
                contentContainerStyle={{ alignItems: "center" }}
              >
                {newTags.map((tag) => (
                  <View key={tag} style={styles.tagChip}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </ScrollView>
            )}

            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: Spacing.base,
              }}
            >
              <TouchableOpacity
                style={[
                  styles.button,
                  {
                    backgroundColor: Colors.danger,
                    marginRight: Spacing.small,
                  },
                ]}
                onPress={onClose}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: Colors.primary }]}
                onPress={handleSave}
              >
                <Text style={styles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
