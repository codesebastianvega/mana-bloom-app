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

const DIFFS = ["Facil", "Medio", "Dificil"];
const DIFF_VALUES = { Facil: "easy", Medio: "medium", Dificil: "hard" };

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
  const [newDeadline, setNewDeadline] = useState(""); // Dias desde hoy
  const [newGemReward, setNewGemReward] = useState("5");
  const [duration, setDuration] = useState(30); // minutes: 15, 30, 60, 120
  const [dueDate, setDueDate] = useState('Hoy'); // For Misiones
  const [estimatedXp, setEstimatedXp] = useState(0);
  const [estimatedMana, setEstimatedMana] = useState(0);
  const [alert, setAlert] = useState(null); // { message, type }
  const [infoElement, setInfoElement] = useState(null);
  const [infoVisible, setInfoVisible] = useState(false);

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

    // Validate Misiones must have at least 1 subtask
    if (newType === 'quest' && newSubtasks.length === 0) {
      showAlert("Las Misiones requieren al menos 1 subtarea.", "error");
      return;
    }

    // Validate Ritual gems are between 5-20
    if (newType === 'ritual') {
      const gems = parseInt(newGemReward) || 5;
      if (gems < 5 || gems > 20) {
        showAlert("Las gemas deben estar entre 5 y 20.", "error");
        return;
      }
    }

    // Convert dueDate to actual deadline for Misiones
    let calculatedDeadline = null;
    if (newType === 'quest' && dueDate) {
      const now = new Date();
      switch(dueDate) {
        case 'Hoy':
          calculatedDeadline = new Date(now.setHours(23, 59, 59, 999)).toISOString();
          break;
        case 'Manana':
          calculatedDeadline = new Date(now.setDate(now.getDate() + 1)).toISOString();
          break;
        case 'Fin de semana':
          // Proximo sabado
          const daysUntilSaturday = (6 - now.getDay() + 7) % 7 || 7;
          calculatedDeadline = new Date(now.setDate(now.getDate() + daysUntilSaturday)).toISOString();
          break;
        case 'Prox. Semana':
          calculatedDeadline = new Date(now.setDate(now.getDate() + 7)).toISOString();
          break;
        default:
          calculatedDeadline = new Date(now.setDate(now.getDate() + 1)).toISOString();
      }
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
      deadline: calculatedDeadline,
      gemReward: newType === 'ritual' ? Math.min(Math.max(parseInt(newGemReward) || 5, 5), 20) : null,
      duration: duration,
      dueDate: newType === 'quest' ? dueDate : null,
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
            <LinearGradient
              colors={[withAlpha(Colors.primary, 0.65), withAlpha(Colors.surfaceAlt, 0.9)]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0.8 }}
              style={styles.heroRow}
            >
              <View>
                <Text style={styles.heroTitle}>Forjar Mision</Text>
                <Text style={styles.heroSubtitle}>NUEVA TAREA</Text>
              </View>
              <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                <FontAwesome5 name="times" size={16} color={Colors.textMuted} />
              </TouchableOpacity>
            </LinearGradient>

            <ScrollView
              style={{ width: "100%" }}
              contentContainerStyle={styles.contentContainer}
              showsVerticalScrollIndicator={false}
              keyboardShouldPersistTaps="handled"
            >
              <TextInput
                style={styles.input}
                placeholder="Titulo"
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

              {/* Date Selector - Always Visible */}
              <View style={{ marginTop: Spacing.base }}>
                <Text style={styles.sectionLabel}>FECHA LIMITE</Text>
                <View style={styles.chipRow}>
                  {['Hoy', 'Manana', 'Fin de semana', 'Prox. Semana'].map(date => (
                    <Pressable
                      key={date}
                      onPress={() => setDueDate(date)}
                      style={[
                        styles.dateChip,
                        dueDate === date && styles.dateChipActive
                      ]}
                    >
                      <Text style={[
                        styles.dateChipText,
                        dueDate === date && styles.dateChipTextActive
                      ]}>
                        {date}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>

              <Text style={styles.sectionLabel}>Tipo</Text>
              <Text style={styles.helperText}>
                Selecciona si es una tarea unica o un habito recurrente.
              </Text>
              <View style={styles.segmentContainer}>
                {[
                  { id: "single", label: "Tarea" },
                  { id: "habit", label: "Habito" },
                  { id: "quest", label: "Mision" },
                  { id: "ritual", label: "Ritual" },
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
              <View style={{ marginTop: Spacing.base }}>
                <Text style={styles.sectionLabel}>Duracion Estimada</Text>
                <View style={styles.chipRow}>
                  {[15, 30, 60, 120].map(mins => (
                    <Pressable
                      key={mins}
                      onPress={() => setDuration(mins)}
                      style={[
                        styles.durationChip,
                        duration === mins && styles.durationChipActive
                      ]}
                    >
                      <Text style={[
                        styles.chipLabel,
                        duration === mins && styles.chipLabelActive
                      ]}>
                        {mins < 60 ? `${mins}m` : `${mins/60}h`}
                      </Text>
                    </Pressable>
                  ))}
                </View>
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
                accessibilityHint="Toca un elemento o manten presionado para ver mas informacion"
              >
                <Text style={styles.whichQuestion}>Cual elijo?</Text>
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
                      accessibilityLabel={`Ver mas sobre ${
                        ELEMENT_LABELS[newElement] || ""
                      }`}
                      onPress={() => {
                        setInfoElement(newElement);
                        setInfoVisible(true);
                      }}
                    >
                      <Text style={styles.whichMore}>Ver mas</Text>
                    </TouchableOpacity>
                  </>
                )}
              </View>

              {/* Subtasks - Only for Misiones */}
              {newType === "quest" && (
                <>
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
                </>
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
                            +{rw.xp} XP / +{rw.mana} Mana
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
                Cuanto tiempo crees que tomara? Esto ayuda a mantener expectativas realistas.
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
                    Tip: Cooldown minimo: {(() => {
                      const estimate = TIME_ESTIMATES.find(e => e.id === newTimeEstimate);
                      const hours = Math.floor(estimate.cooldownMs / (60 * 60 * 1000));
                      const minutes = Math.floor((estimate.cooldownMs % (60 * 60 * 1000)) / (60 * 1000));
                      if (hours > 0) return `${hours}h ${minutes > 0 ? minutes + 'm' : ''}`;
                      return `${minutes}m`;
                    })()}
                  </Text>
                  <Text style={{ color: Colors.textMuted, fontSize: 11, marginTop: 2 }}>
                    Podras completar la tarea despues de este tiempo
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

            </ScrollView>

            <View style={styles.footerSection}>
              <View style={styles.rewardBanner}>
                <LinearGradient
                  colors={[withAlpha(Colors.primary, 0.8), withAlpha(Colors.accent, 0.8)]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.rewardIcon}
                >
                  <Text style={styles.rewardIconEmoji}>✨</Text>
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
                      color={Colors.onAccent}
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











