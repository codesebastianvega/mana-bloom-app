// [MB] Modulo: Tasks / Seccion: CreateTaskModal
// Afecta: CreateTaskModal
// Proposito: Modal para crear y editar tareas
// Puntos de edicion futura: estilos en CreateTaskModal.styles.js
// Autor: Codex - Fecha: 2025-10-20


import React, { useState, useEffect, useMemo } from "react";
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
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing, Radii, Typography, PriorityAccents } from "../../theme";
import { XP_REWARD_BY_PRIORITY as PRIORITY_REWARDS } from "../../constants/rewards";
import { ELEMENT_INFO } from "../../constants/elements";
import { TIME_ESTIMATES } from "../../constants/taskIntegrity";

import ElementGrid from "./ElementGrid";
import ElementInfoSheet from "./ElementInfoSheet";
import styles from "./CreateTaskModal.styles";

const PRIORITIES = ["Baja", "Media", "Urgente"];
const PRIORITY_VALUES = { Baja: "easy", Media: "medium", Urgente: "hard" };
const DifficultyAccents = {
  easy: Colors.info,
  medium: Colors.warning,
  hard: Colors.danger,
  legendary: Colors.accent,
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
const ELEMENT_COLORS = {
  fire: Colors.elementFire,
  water: Colors.elementWater,
  earth: Colors.elementEarth,
  air: Colors.elementAir,
};

const DIFFS = ["Facil", "Medio", "Dificil", "Epico"];
const DIFF_VALUES = {
  Facil: "easy",
  Medio: "medium",
  Dificil: "hard",
  Epico: "legendary",
};

const DATE_OPTIONS = [
  "Hoy",
  "Manana",
  "En 3 dias",
  "En 5 dias",
  "En 10 dias",
  "En 15 dias",
  "En 20 dias",
  "En 30 dias",
];

const HABIT_FREQUENCIES = [
  { id: "daily", label: "Diario" },
  { id: "alternate", label: "Dias alternos" },
  { id: "weekly", label: "3 veces/sem" },
];

const HABIT_DURATION = [
  { id: "30", label: "30 dias" },
  { id: "60", label: "60 dias" },
  { id: "90", label: "90 dias" },
  { id: "indef", label: "Indefinido" },
];

const HABIT_DURATION_MAP = {
  "30": 30,
  "60": 60,
  "90": 90,
  indef: null,
};

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
  const [isTitleFocused, setIsTitleFocused] = useState(false);
  const [isNoteFocused, setIsNoteFocused] = useState(false);
  const [newType, setNewType] = useState("single");
  const [newElement, setNewElement] = useState("all");
  const [newPriority, setNewPriority] = useState("easy");
  const [newDifficulty, setNewDifficulty] = useState("easy");
  const [newTimeEstimate, setNewTimeEstimate] = useState("medium"); // 1-2 horas por defecto
  const [newTagInput, setNewTagInput] = useState("");
  const [newTags, setNewTags] = useState([]);
  const [newSubtaskInput, setNewSubtaskInput] = useState("");
  const [newSubtasks, setNewSubtasks] = useState([]); // [{id,text,completed}]
  const [newDeadline, setNewDeadline] = useState(""); // Dias desde hoy
  const [newGemReward, setNewGemReward] = useState("5");
  const [duration, setDuration] = useState(30); // minutes: 15, 30, 60, 120
  const [dueDate, setDueDate] = useState('Hoy'); // For Misiones
  const [habitFrequency, setHabitFrequency] = useState("daily");
  const [habitDuration, setHabitDuration] = useState("30");
  const [estimatedXp, setEstimatedXp] = useState(0);
  const [estimatedMana, setEstimatedMana] = useState(0);
  const [alert, setAlert] = useState(null); // { message, type }
  const [infoElement, setInfoElement] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);
  const [durationPickerOpen, setDurationPickerOpen] = useState(false);
  const [datePickerOpen, setDatePickerOpen] = useState(false);

  const durationLabel = useMemo(() => {
    const found = TIME_ESTIMATES.find((estimate) => estimate.id === newTimeEstimate);
    return found ? found.label : "Selecciona";
  }, [newTimeEstimate]);

  const dateLabel = useMemo(() => dueDate || "Selecciona", [dueDate]);

  const elementHelperText = useMemo(() => {
    if (newElement === "all") {
      return "Selecciona un elemento para ver como aprovechar su energia.";
    }
    const info = ELEMENT_INFO[newElement];
    if (!info) return "Energia equilibrada para cualquier tipo de tarea.";
    const base = info.description || info.tagline;
    const examples = Array.isArray(info.examples)
      ? info.examples.slice(0, 2).join(", ")
      : "";
    if (examples) {
      return `${base} Ej: ${examples}.`;
    }
    return base || "Energia equilibrada para cualquier tipo de tarea.";
  }, [newElement]);

  // Calculate rewards in real-time
  useEffect(() => {
    let baseXp = 10;
    let baseMana = 5;

    // Priority multiplier (only for Tarea/Mision)
    if (newType !== 'habit' && newType !== 'ritual') {
      if (newPriority === 'medium') { baseXp += 10; baseMana += 5; }
      if (newPriority === 'hard') { baseXp += 30; baseMana += 15; }
    }

    // Type multiplier
    if (newType === 'quest') { baseXp *= 2; baseMana *= 2; }
    if (newType === 'ritual') { baseXp *= 1.5; baseMana *= 1.2; }

    // Difficulty multiplier
    const diffMultipliers = { easy: 1, medium: 1.5, hard: 2.5, legendary: 5 };
    const mult = diffMultipliers[newDifficulty] || 1;

    setEstimatedXp(Math.floor(baseXp * mult));
    setEstimatedMana(Math.floor(baseMana * mult));
  }, [newType, newPriority, newDifficulty]);

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
      // Calcular dias restantes si existe deadline
      if (task.deadline) {
        const diff = new Date(task.deadline) - new Date();
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        setNewDeadline(days > 0 ? days.toString() : "");
      } else {
        setNewDeadline("");
      }
      setNewGemReward(task.gemReward ? task.gemReward.toString() : "5");
      setDuration(task.duration || 30);
      setDueDate(task.dueDate || 'Hoy');
      setHabitFrequency(task.frequency || "daily");
      setHabitDuration(() => {
        if (task.goalStreakDays == null) return "indef";
        const asString = `${task.goalStreakDays}`;
        return HABIT_DURATION_MAP[asString] ? asString : "indef";
      });
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
    setNewDeadline("");
    setNewGemReward("5");
    setDuration(30);
    setDueDate('Hoy');
    setHabitFrequency("daily");
    setHabitDuration("30");
  };

  const showAlert = (message, type = "info") => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleSave = () => {
    if (!newTitle.trim()) {
      showAlert("Debes ingresar un titulo para la tarea.", "error");
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
      deadline: null,
      gemReward: null,
      duration,
      dueDate: null,
      frequency: newType === "habit" ? habitFrequency : null,
      goalStreakDays:
        newType === "habit"
          ? HABIT_DURATION_MAP[habitDuration] ?? null
          : null,
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
          <LinearGradient
            colors={[
              withAlpha(Colors.primary, 0.35),
              withAlpha(Colors.surface, 0.95),
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 0.85, y: 1 }}
            style={styles.root}
          >
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
            <View style={styles.heroRow}>
              <View>
                <Text style={styles.heroTitle}>Forjar Mision</Text>
                <Text style={styles.heroSubtitle}>NUEVA TAREA</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <FontAwesome5 name="times" size={16} color={Colors.textMuted} />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={{ width: "100%" }}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                style={[styles.input, isTitleFocused && styles.inputActive]}
                placeholder="Crear Mision..."
                placeholderTextColor={Colors.textMuted}
                value={newTitle}
                onChangeText={setNewTitle}
                onFocus={() => setIsTitleFocused(true)}
                onBlur={() => setIsTitleFocused(false)}
              />

              <TextInput
                style={[
                  styles.inputMultiline,
                  { marginTop: Spacing.small },
                  isNoteFocused && styles.inputMultilineActive,
                ]}
                placeholder="Detalle o nota (opcional)"
                placeholderTextColor={Colors.textMuted}
                value={newNote}
                onChangeText={setNewNote}
                multiline
                onFocus={() => setIsNoteFocused(true)}
                onBlur={() => setIsNoteFocused(false)}
              />

              <Text style={styles.sectionLabel}>Tipo</Text>
              <Text style={styles.helperText}>
                Selecciona si es una tarea unica o un habito recurrente.
              </Text>
              <View style={styles.segmentContainer}>
                {[
                  { id: "single", label: "Tarea" },
                  { id: "habit", label: "Habito" },
                ].map((type) => (
                  <Pressable
                    key={type.id}
                    onPress={() => setNewType(type.id)}
                    style={[
                      styles.segmentButton,
                      newType === type.id && styles.segmentButtonActive,
                    ]}
                  >
                    <Text
                      style={[
                        styles.segmentLabel,
                        newType === type.id && styles.segmentLabelActive,
                      ]}
                    >
                      {type.label}
                    </Text>
                  </Pressable>
                ))}
              </View>

              {newType === "single" && (
                <>
                  <Text style={styles.sectionLabel}>
                    Lista de pasos (Subtareas)
                  </Text>
                  <Text style={styles.helperText}>
                    Descompone la mision en mini objetivos para avanzar sin
                    perderte.
                  </Text>
                  <View style={styles.subtaskCard}>
                    {newSubtasks.length === 0 ? (
                      <Text style={styles.subtaskEmpty}>
                        No has agregado pasos todavia.
                      </Text>
                    ) : (
                      newSubtasks.map((st, idx) => (
                        <View
                          key={st.id || idx}
                          style={[
                            styles.subtaskRowLine,
                            idx === newSubtasks.length - 1 &&
                              styles.subtaskRowLineLast,
                          ]}
                        >
                          <View style={styles.subtaskCheckbox} />
                          <Text style={styles.subtaskText}>{st.text}</Text>
                          <TouchableOpacity
                            style={styles.subtaskRemove}
                            accessibilityRole="button"
                            onPress={() =>
                              setNewSubtasks((prev) =>
                                prev.filter((_, i) => i !== idx)
                              )
                            }
                          >
                            <FontAwesome5
                              name="times"
                              size={14}
                              color={Colors.textMuted}
                            />
                          </TouchableOpacity>
                        </View>
                      ))
                    )}
                    <View style={styles.subtaskInputRow}>
                      <TextInput
                        style={styles.subtaskInlineInput}
                        placeholder="Añadir paso..."
                        placeholderTextColor={Colors.textMuted}
                        value={newSubtaskInput}
                        onChangeText={setNewSubtaskInput}
                        onSubmitEditing={() => {
                          const st = newSubtaskInput.trim();
                          if (!st) return;
                          setNewSubtasks((prev) => [
                            ...prev,
                            { id: Date.now(), text: st, completed: false },
                          ]);
                          setNewSubtaskInput("");
                        }}
                        returnKeyType="done"
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
                          name="paper-plane"
                          size={12}
                          color={Colors.text}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}

              {newType === "quest" && (
                <View style={{ marginTop: Spacing.small }}>
                  <Text style={styles.sectionLabel}>Plazo (Dias)</Text>
                  <Text style={styles.helperText}>Dias a partir de hoy para completar la mision.</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: 3"
                    placeholderTextColor={Colors.textMuted}
                    keyboardType="numeric"
                    value={newDeadline}
                    onChangeText={setNewDeadline}
                  />
                </View>
              )}

              {newType === "ritual" && (
                <View style={{ marginTop: Spacing.small }}>
                  <Text style={styles.sectionLabel}>Recompensa (Gemas)</Text>
                  <Text style={styles.helperText}>Gemas a ganar por completar el ritual.</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="Ej: 5"
                    placeholderTextColor={Colors.textMuted}
                    keyboardType="numeric"
                    value={newGemReward}
                    onChangeText={setNewGemReward}
                  />
                </View>
              )}



              {/* Duration Selector - For all types */}
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
              {newElement !== "all" && (
                <View
                  style={[
                    styles.sectionHelperCard,
                    styles.elementHelperCard,
                    {
                      backgroundColor: withAlpha(
                        ELEMENT_COLORS[newElement] || Colors.primary,
                        0.18
                      ),
                      borderLeftColor: ELEMENT_COLORS[newElement] || Colors.primary,
                    },
                  ]}
                >
                  <Text style={styles.elementHelperTitle}>
                    {ELEMENT_LABELS[newElement] || "Afinidad"}
                  </Text>
                  <Text style={styles.elementDescriptor}>{elementHelperText}</Text>
                </View>
              )}

              {newType === "single" && (
                <View style={styles.selectorColumn}>
                  <Text style={styles.sectionLabel}>Prioridad</Text>
                  <Text style={styles.helperText}>
                    Ajusta la urgencia segun tu energia y los compromisos que ya tienes.
                  </Text>
                  <View style={styles.priorityGrid}>
                    {PRIORITIES.map((p) => {
                      const level = PRIORITY_VALUES[p];
                      const isActive = newPriority === level;
                      const accent = PriorityAccents[level];
                      return (
                        <Pressable
                          key={p}
                          onPress={() => setNewPriority(level)}
                          style={[
                            styles.priorityTile,
                            isActive && {
                              borderColor: withAlpha(accent, 0.75),
                              backgroundColor: withAlpha(accent, 0.18),
                              shadowColor: accent,
                              shadowOpacity: 0.25,
                              shadowRadius: 8,
                              shadowOffset: { width: 0, height: 4 },
                            },
                          ]}
                          accessibilityRole="button"
                          accessibilityState={{ selected: isActive }}
                          accessibilityLabel={`Prioridad ${p}`}
                        >
                          <Text
                            style={[
                              styles.priorityTileLabel,
                              isActive && { color: accent },
                            ]}
                          >
                            {p}
                          </Text>
                        </Pressable>
                      );
                    })}
                    {PRIORITIES.length % 2 !== 0 && (
                      <View style={styles.priorityTilePlaceholder} />
                    )}
                  </View>
                </View>
              )}

              <View style={[styles.selectorColumn, { marginTop: Spacing.base }]}>
                <Text style={styles.sectionLabel}>Dificultad</Text>
                <Text style={styles.helperText}>
                  Piensa cuanto te costara realmente: algo facil como cepillar dientes o algo retador como preparar una presentacion.
                </Text>
                <View style={styles.difficultyGrid}>
                  {DIFFS.map((d) => {
                    const val = DIFF_VALUES[d];
                    const selected = newDifficulty === val;
                    const accent = DifficultyAccents[val];
                    return (
                      <Pressable
                        key={d}
                        onPress={() => setNewDifficulty(val)}
                        style={[
                          styles.difficultyTile,
                          selected && {
                            borderColor: withAlpha(accent, 0.7),
                            backgroundColor: withAlpha(accent, 0.18),
                            shadowColor: accent,
                            shadowOpacity: 0.2,
                            shadowRadius: 8,
                            shadowOffset: { width: 0, height: 4 },
                          },
                        ]}
                        accessibilityRole="button"
                        accessibilityState={{ selected }}
                        accessibilityLabel={`Dificultad ${d}`}
                      >
                        <Text
                          style={[
                            styles.difficultyTileLabel,
                            selected && { color: accent },
                          ]}
                        >
                          {d}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>

              {newType !== "habit" && (
                <View style={styles.selectorRow}>
                  <View style={styles.selectorColumn}>
                    <Text style={styles.sectionLabel}>Tiempo Estimado</Text>
                    <TouchableOpacity
                      style={styles.selectionControl}
                      onPress={() => {
                        setDatePickerOpen(false);
                        setDurationPickerOpen((prev) => !prev);
                      }}
                    >
                      <Text style={styles.selectionValue}>{durationLabel}</Text>
                      <FontAwesome5
                        name={durationPickerOpen ? "chevron-up" : "chevron-down"}
                        size={10}
                        color={Colors.textMuted}
                      />
                    </TouchableOpacity>
                    {durationPickerOpen && (
                      <View
                        style={[
                          styles.dropdownOverlay,
                          { top: 0, left: 0, right: 0, bottom: 0 },
                        ]}
                      >
                        <View style={styles.selectionMenuFloating}>
                          <ScrollView>
                            {TIME_ESTIMATES.map((estimate) => (
                              <Pressable
                                key={estimate.id}
                                style={[
                                  styles.selectionOption,
                                  newTimeEstimate === estimate.id &&
                                    styles.selectionOptionActive,
                                ]}
                                onPress={() => {
                                  setNewTimeEstimate(estimate.id);
                                  setDuration(estimate.maxMinutes || 30);
                                  setDurationPickerOpen(false);
                                }}
                              >
                                <Text style={styles.selectionOptionLabel}>
                                  {estimate.label}
                                </Text>
                              </Pressable>
                            ))}
                          </ScrollView>
                        </View>
                      </View>
                    )}
                  </View>
                  <View style={styles.selectorColumn}>
                    <Text style={styles.sectionLabel}>Fecha Limite</Text>
                    <TouchableOpacity
                      style={styles.selectionControl}
                      onPress={() => {
                        setDurationPickerOpen(false);
                        setDatePickerOpen((prev) => !prev);
                      }}
                    >
                      <Text style={styles.selectionValue}>{dateLabel}</Text>
                      <FontAwesome5
                        name={datePickerOpen ? "chevron-up" : "chevron-down"}
                        size={10}
                        color={Colors.textMuted}
                      />
                    </TouchableOpacity>
                    {datePickerOpen && (
                      <View
                        style={[
                          styles.dropdownOverlay,
                          { top: 0, left: 0, right: 0, bottom: 0 },
                        ]}
                      >
                        <View style={styles.selectionMenuFloating}>
                          <ScrollView>
                            {DATE_OPTIONS.map((option) => (
                              <Pressable
                                key={option}
                                style={[
                                  styles.selectionOption,
                                  dueDate === option &&
                                    styles.selectionOptionActive,
                                ]}
                                onPress={() => {
                                  setDueDate(option);
                                  setDatePickerOpen(false);
                                }}
                              >
                                <Text style={styles.selectionOptionLabel}>
                                  {option}
                                </Text>
                              </Pressable>
                            ))}
                          </ScrollView>
                        </View>
                      </View>
                    )}
                  </View>
                </View>
              )}
              {newType !== "habit" && newTimeEstimate && (
                <View style={styles.tipCard}>
                  <Text style={styles.tipTitle}>
                    Tip: Cooldown minimo:{" "}
                    {(() => {
                      const estimate = TIME_ESTIMATES.find(
                        (e) => e.id === newTimeEstimate
                      );
                      if (!estimate) return "0m";
                      const hours = Math.floor(
                        estimate.cooldownMs / (60 * 60 * 1000)
                      );
                      const minutes = Math.floor(
                        (estimate.cooldownMs % (60 * 60 * 1000)) / (60 * 1000)
                      );
                      if (hours > 0) {
                        return `${hours}h ${minutes > 0 ? minutes + "m" : ""}`;
                      }
                      return `${minutes}m`;
                    })()}
                  </Text>
                  <Text style={styles.tipBody}>
                    Podras completar la tarea despues de este tiempo.
                  </Text>
                </View>
              )}

              {newType === "habit" && (
                <>
                  <View style={styles.selectorColumn}>
                    <Text style={styles.sectionLabel}>Frecuencia</Text>
                    <Text style={styles.helperText}>
                      Define cuantas veces quieres repetir el habito durante la semana.
                    </Text>
                    <View style={styles.frequencyGrid}>
                      {HABIT_FREQUENCIES.map((freq) => (
                        <Pressable
                          key={freq.id}
                          onPress={() => setHabitFrequency(freq.id)}
                          style={[
                            styles.frequencyTile,
                            habitFrequency === freq.id && styles.frequencyTileActive,
                          ]}
                        >
                          <Text
                            style={[
                              styles.frequencyLabel,
                              habitFrequency === freq.id && styles.frequencyLabelActive,
                            ]}
                          >
                            {freq.label}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                  <View style={[styles.selectorColumn, { marginTop: Spacing.base }]}>
                    <Text style={styles.sectionLabel}>Duracion</Text>
                    <Text style={styles.helperText}>
                      Establece por cuanto tiempo mantendras este habito activo.
                    </Text>
                    <View style={styles.frequencyGrid}>
                      {HABIT_DURATION.map((dur) => (
                        <Pressable
                          key={dur.id}
                          onPress={() => setHabitDuration(dur.id)}
                          style={[
                            styles.frequencyTile,
                            habitDuration === dur.id && styles.frequencyTileActive,
                          ]}
                        >
                          <Text
                            style={[
                              styles.frequencyLabel,
                              habitDuration === dur.id && styles.frequencyLabelActive,
                            ]}
                          >
                            {dur.label}
                          </Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                </>
              )}
              <Text style={styles.sectionLabel}>Etiquetas</Text>
              <Text style={styles.helperText}>
                Usa etiquetas para agrupar tareas y encontrarlas mas rapido.
              </Text>
              <View style={styles.tagCard}>
                {newTags.length === 0 ? (
                  <Text style={styles.tagEmpty}>
                    Aun no has agregado etiquetas.
                  </Text>
                ) : (
                  newTags.map((tag, idx) => (
                    <View
                      key={tag}
                      style={[
                        styles.tagRowLine,
                        idx === newTags.length - 1 && styles.tagRowLineLast,
                      ]}
                    >
                      <Text style={styles.tagRowText}>#{tag}</Text>
                      <TouchableOpacity
                        style={styles.tagRowAction}
                        accessibilityRole="button"
                        onPress={() =>
                          setNewTags((prev) => prev.filter((t) => t !== tag))
                        }
                      >
                        <FontAwesome5
                          name="times"
                          size={12}
                          color={Colors.text}
                        />
                      </TouchableOpacity>
                    </View>
                  ))
                )}
                <View style={styles.tagInputRow}>
                  <TextInput
                    style={styles.tagInputField}
                    placeholder="+ etiqueta..."
                    placeholderTextColor={Colors.textMuted}
                    value={newTagInput}
                    onChangeText={setNewTagInput}
                    onSubmitEditing={() => {
                      const tag = newTagInput.trim();
                      if (!tag) return;
                      setNewTags((prev) => [...new Set([...prev, tag])]);
                      setNewTagInput("");
                      showAlert("Etiqueta creada", "success");
                    }}
                    returnKeyType="done"
                  />
                  <TouchableOpacity
                    style={styles.tagAddBtn}
                    onPress={() => {
                      const tag = newTagInput.trim();
                      if (!tag) return;
                      setNewTags((prev) => [...new Set([...prev, tag])]);
                      setNewTagInput("");
                      showAlert("Etiqueta creada", "success");
                    }}
                  >
                    <FontAwesome5
                      name="paper-plane"
                      size={12}
                      color={Colors.text}
                    />
                  </TouchableOpacity>
                </View>
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

            </ScrollView>

            <View style={styles.footerSection}>
              <View style={styles.rewardBanner}>
                <LinearGradient
                  colors={[withAlpha(Colors.primary, 0.8), withAlpha(Colors.accent, 0.8)]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.rewardIcon}
                >
                  <Text style={styles.rewardIconEmoji}>?</Text>
                </LinearGradient>
                <View style={{ flex: 1 }}>
                  <Text style={styles.rewardLabel}>RECOMPENSAS</Text>
                  <View style={styles.rewardValues}>
                    <Text style={styles.rewardXp}>+{estimatedXp} XP</Text>
                    <Text style={styles.rewardMana}>+{estimatedMana} Mana</Text>
                    {newType === 'ritual' && (
                      <Text style={styles.rewardGems}>+{newGemReward} Gemas</Text>
                    )}
                  </View>
                </View>
              </View>

              <View style={styles.actions}>
                <TouchableOpacity
                  style={styles.secondaryButton}
                  onPress={onClose}
                >
                  <Text style={styles.secondaryButtonLabel}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.primaryButton}
                  onPress={handleSave}
                >
                  <LinearGradient
                    colors={[Colors.primary, Colors.accent]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.primaryButtonGradient}
                  >
                    <FontAwesome5
                      name="hammer"
                      size={14}
                      color={Colors.text}
                      style={{ marginRight: Spacing.small }}
                    />
                    <Text style={styles.primaryButtonLabel}>
                      {task ? "Guardar Cambios" : "Crear Mision"}
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </View>
          </LinearGradient>
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











