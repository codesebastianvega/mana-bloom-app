// [MB] Modulo: Tasks / Seccion: CreateTaskModal
// Afecta: CreateTaskModal
// Proposito: Modal para crear y editar tareas
// Puntos de edicion futura: estilos en CreateTaskModal.styles.js
// Autor: Codex - Fecha: 2025-10-20


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
  ToastAndroid,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Spacing, Radii, Typography, PriorityAccents } from "../../theme";
import { XP_REWARD_BY_PRIORITY as PRIORITY_REWARDS } from "../../constants/rewards";
import { ELEMENT_INFO } from "../../constants/elements";
import { TIME_ESTIMATES } from "../../constants/taskIntegrity";

import ElementGrid from "./ElementGrid";
import StarfieldOverlay from "./StarfieldOverlay";
import ElementInfoSheet from "./ElementInfoSheet";
import styles from "./CreateTaskModal.styles";

const PRIORITIES = ["Baja", "Media", "Urgente"];
const PRIORITY_VALUES = { Baja: "easy", Media: "medium", Urgente: "hard" };
const DifficultyAccents = {
  easy: Colors.info,
  medium: Colors.warning,
  hard: Colors.danger,
};

const withAlpha = (hex = "", alpha = 1) => {
  if (!hex) return hex;
  const cleaned = `${hex}`.replace("#", "").trim();
  const base = cleaned.length === 8 ? cleaned.slice(0, 6) : cleaned;
  if (base.length !== 6) return hex;
  const value = parseInt(base, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const ELEMENT_LABELS = {
  fire: "Fuego",
  water: "Agua",
  earth: "Tierra",
  air: "Aire",
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
  initialElement = "all",
}) {
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [newType, setNewType] = useState("single");
  const [newElement, setNewElement] = useState("all");
  const [newPriority, setNewPriority] = useState("easy");
  const [newDifficulty, setNewDifficulty] = useState("easy");
  const [newTimeEstimate, setNewTimeEstimate] = useState("medium"); // 1-2 horas por defecto
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
      setNewTimeEstimate(task.timeEstimate || "medium");
      setNewTags(task.tags || []);
      setNewSubtasks(
        task.subtasks ? task.subtasks.map((st) => ({ ...st })) : []
      );
      setNewTagInput("");
      setNewSubtaskInput("");
    } else if (visible) {
      resetForm();
    }
  }, [task, visible, initialElement]);

  const resetForm = () => {
    setNewTitle("");
    setNewNote("");
    setNewType("single");
    setNewElement(initialElement || "all");
    setNewPriority("easy");
    setNewDifficulty("easy");
    setNewTimeEstimate("medium");
    setNewTagInput("");
    setNewTags([]);
    setNewSubtaskInput("");
    setNewSubtasks([]);
  };

  const showAlert = (message, type = "info") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSave = () => {
    if (!newTitle.trim()) {
      showAlert("Debes ingresar un título para la tarea.", "error");
      return;
    }

    const taskData = {
      title: newTitle,
      note: newNote,
      type: newType,
      element: newElement,
      priority: newPriority,
      tags: newTags,
      difficulty: newDifficulty,
      timeEstimate: newTimeEstimate,
      subtasks: newSubtasks.map((st, index) => ({
        id: st.id ?? index + 1,
        text: st.text,
        completed: st.completed || false,
      })),
    };

    if (task) {
      onUpdate && onUpdate({ ...task, ...taskData });
    } else {
      onSave && onSave(taskData);
    }

    resetForm();
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
        <View style={styles.modalOverlay}>
          <StarfieldOverlay />
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
                  style={{
                    color: Colors.text,
                    fontSize: 14,
                    fontWeight: "600",
                  }}
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
              <Text style={styles.helperText}>
                Selecciona si es una tarea unica o un habito recurrente.
              </Text>
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
              <Text style={styles.helperText}>
                Asigna el elemento que mejor refleja la energia de esta tarea.
              </Text>
              <ElementGrid
                value={newElement}
                onChange={setNewElement}
                tileAspect={0.78}
                onLongPress={(el) => {
                  setInfoElement(el);
                  setInfoVisible(true);
                }}
              />
              <View
                style={styles.whichBlock}
                accessibilityHint="Toca un elemento o mantén presionado para ver más información"
              >
                <Text style={styles.whichQuestion}>¿Cuál elijo?</Text>
                {newElement === "all" ? (
                  <Text style={styles.whichSnippet}>
                    Selecciona un elemento
                  </Text>
                ) : (
                  <>
                    <Text style={styles.whichSnippet} numberOfLines={1}>
                      {ELEMENT_INFO[newElement]?.description}
                    </Text>
                    <TouchableOpacity
                      accessibilityRole="button"
                      accessibilityLabel={`Ver más sobre ${
                        ELEMENT_LABELS[newElement] || ""
                      }`}
                      onPress={() => {
                        setInfoElement(newElement);
                        setInfoVisible(true);
                      }}
                    >
                      <Text style={styles.whichMore}>Ver más</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              <Text style={styles.sectionLabel}>Subtareas</Text>
              <Text style={styles.helperText}>
                Agrega pasos mas pequenos para facilitar tu trabajo.
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
                    <FontAwesome5
                      name="plus"
                      size={12}
                      color={Colors.text}
                    />
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
                          setNewSubtasks((prev) =>
                            prev.filter((_, i) => i !== idx)
                          )
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
              )}

              <Text style={styles.sectionLabel}>Prioridad</Text>
              <Text style={styles.helperText}>
                Ajusta la urgencia segun tu energia y los compromisos que ya tienes.
              </Text>
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
                          borderColor: withAlpha(accent, 0.7),
                          backgroundColor: withAlpha(accent, 0.15),
                        },
                      ]}
                      accessibilityRole="button"
                      accessibilityState={{ selected: isActive }}
                      accessibilityLabel={`Prioridad ${p}`}
                    >
                      <View style={styles.priorityLeft}>
                        <Text style={styles.priorityTitle}>
                          {p}
                        </Text>
                        <Text style={styles.priorityCaption} numberOfLines={1}>
                          {p === "Baja"
                            ? "Ritmo suave, agenda flexible"
                            : p === "Media"
                            ? "Requiere atencion esta semana"
                            : "Hazlo pronto, en no mas de dos dias"}
                        </Text>
                      </View>
                      <View style={styles.priorityRewards}>
                        <View
                          style={[
                            styles.rewardPill,
                            isActive && {
                              borderColor: withAlpha(accent, 0.55),
                              backgroundColor: withAlpha(accent, 0.18),
                            },
                          ]}
                        >
                          <Text
                            style={[
                              styles.rewardText,
                              isActive && { color: accent },
                            ]}
                            numberOfLines={1}
                          >
                            +{rw.xp} XP · +{rw.mana} Mana
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
              </View>

              <Text style={styles.sectionLabel}>Dificultad</Text>
              <Text style={styles.helperText}>
                Piensa cuanto te costara realmente: algo facil como cepillar dientes o algo retador como preparar una presentacion.
              </Text>
              <View style={styles.difficultyRow}>
                {DIFFS.map((d) => {
                  const val = DIFF_VALUES[d];
                  const selected = newDifficulty === val;
                  const accent = DifficultyAccents[val];
                  return (
                    <Pressable
                      key={d}
                      onPress={() => setNewDifficulty(val)}
                      style={[
                        styles.difficultyChip,
                        selected && [
                          styles.chipActive,
                          {
                            borderColor: withAlpha(accent, 0.7),
                            backgroundColor: withAlpha(accent, 0.22),
                            shadowColor: accent,
                          },
                        ],
                      ]}
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

              <Text style={styles.sectionLabel}>Tiempo Estimado</Text>
              <Text style={styles.helperText}>
                ¿Cuánto tiempo crees que tomará? Esto ayuda a mantener expectativas realistas.
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingVertical: Spacing.small }}
              >
                {TIME_ESTIMATES.map((estimate) => {
                  const selected = newTimeEstimate === estimate.id;
                  const accent = Colors.info;
                  return (
                    <Pressable
                      key={estimate.id}
                      onPress={() => setNewTimeEstimate(estimate.id)}
                      style={[
                        styles.difficultyChip,
                        { marginRight: Spacing.small },
                        selected && [
                          styles.chipActive,
                          {
                            borderColor: withAlpha(accent, 0.7),
                            backgroundColor: withAlpha(accent, 0.22),
                            shadowColor: accent,
                          },
                        ],
                      ]}
                      accessibilityRole="button"
                      accessibilityState={{ selected }}
                      accessibilityLabel={`Tiempo estimado: ${estimate.label}`}
                    >
                      <Text
                        style={[
                          styles.chipLabel,
                          selected && styles.chipLabelActive,
                        ]}
                      >
                        {estimate.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </ScrollView>
              {newTimeEstimate && (
                <View style={{ 
                  marginTop: Spacing.tiny,
                  padding: Spacing.small,
                  backgroundColor: withAlpha(Colors.info, 0.1),
                  borderRadius: Radii.md,
                  borderLeftWidth: 3,
                  borderLeftColor: Colors.info,
                }}>
                  <Text style={{ color: Colors.textMuted, fontSize: 12 }}>
                    💡 Cooldown mínimo: {(() => {
                      const estimate = TIME_ESTIMATES.find(e => e.id === newTimeEstimate);
                      const hours = Math.floor(estimate.cooldownMs / (60 * 60 * 1000));
                      const minutes = Math.floor((estimate.cooldownMs % (60 * 60 * 1000)) / (60 * 1000));
                      if (hours > 0) return `${hours}h ${minutes > 0 ? minutes + 'm' : ''}`;
                      return `${minutes}m`;
                    })()}
                  </Text>
                  <Text style={{ color: Colors.textMuted, fontSize: 11, marginTop: 2 }}>
                    Podrás completar la tarea después de este tiempo
                  </Text>
                </View>
              )}

              <Text style={styles.sectionLabel}>Etiquetas</Text>
              <Text style={styles.helperText}>
                Usa etiquetas para agrupar tareas y encontrarlas mas rapido.
              </Text>
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
                  <FontAwesome5
                    name="plus"
                    size={12}
                    color={Colors.text}
                  />
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
                        style={[styles.tagChip, active && styles.chipActive]}
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
                  <Text style={styles.sectionLabel}>
                    Etiquetas seleccionadas
                  </Text>
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
                  style={[
                    styles.secondaryButton,
                    { borderColor: Colors.danger },
                  ]}
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






