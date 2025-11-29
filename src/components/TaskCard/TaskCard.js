// [MB] Modulo: Tasks / Seccion: Tarjeta de tarea
// Afecta: TasksScreen (listado y acciones de tareas)
// Proposito: Item deslizable con claras senales de dificultad y prioridad
// Puntos de edicion futura: animaciones y microinteracciones en TaskCard
// Autor: Codex - Fecha: 2025-10-20

import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  PanResponder,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./TaskCardStyles";

import { Colors, Spacing, PriorityAccents } from "../../theme";

const ElementAccents = {
  water: Colors.elementWater,
  earth: Colors.elementEarth,
  fire: Colors.elementFire,
  air: Colors.elementAir,
};

const getElementColor = (element) => {
  switch (element) {
    case "water":
      return { name: "tint", color: ElementAccents.water, label: "Agua" };
    case "earth":
      return { name: "pagelines", color: ElementAccents.earth, label: "Tierra" };
    case "fire":
      return { name: "fire", color: ElementAccents.fire, label: "Fuego" };
    case "air":
      return { name: "wind", color: ElementAccents.air, label: "Aire" };
    default:
      return { name: "star", color: Colors.text, label: "Elemento" };
  }
};

const getPriorityColor = (p) => PriorityAccents[p] || Colors.textMuted;

const getPriorityLabel = (p) => {
  switch (p) {
    case "easy":
      return "Baja";
    case "medium":
      return "Media";
    case "hard":
      return "Urgente";
    default:
      return p;
  }
};

const getPriorityIcon = (p) => {
  switch (p) {
    case "hard":
      return "exclamation-circle";
    case "medium":
      return "hourglass-half";
    default:
      return "leaf";
  }
};

const getTypeLabel = (type) => {
  switch (type) {
    case "habit":
      return "Habito";
    case "single":
      return "Tarea";
    default:
      return "Tarea";
  }
};

const getDifficultyColor = (d) => {
  switch (d) {
    case "easy":
      return Colors.info;
    case "medium":
      return Colors.warning;
    case "hard":
      return Colors.danger;
    default:
      return Colors.separator;
  }
};

const xpReward = { easy: 5, medium: 10, hard: 20 };
const manaReward = { easy: 1, medium: 2, hard: 3 };

const withAlpha = (hex = "", alpha = 1) => {
  if (!hex) return hex;
  let cleaned = `${hex}`.replace("#", "").trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split("")
      .map((c) => `${c}${c}`)
      .join("");
  }
  if (cleaned.length === 8) {
    cleaned = cleaned.slice(0, 6);
  }
  if (cleaned.length !== 6) {
    return hex;
  }
  const value = parseInt(cleaned, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const HIT_SLOP = {
  top: Spacing.tiny,
  bottom: Spacing.tiny,
  left: Spacing.tiny,
  right: Spacing.tiny,
};

export default function TaskCard({
  task,
  onToggleComplete,
  onSoftDeleteTask,
  onRestoreTask,
  onPermanentDeleteTask,
  activeFilter,
  onEditTask,
  onToggleSubtask,
  onTaskCompleted,
  onStartFocus,
  onTagPress,
  onAddSubtask,
} = {}) {

  const pan = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const threshold = 80;
  const isDeletedView = activeFilter === "deleted";

  const [isExpanded, setIsExpanded] = useState(false);
  const [showSubtaskInput, setShowSubtaskInput] = useState(false);
  const [newSubtaskText, setNewSubtaskText] = useState("");
  const [showCelebration, setShowCelebration] = useState(false);
  const celebrationScale = useRef(new Animated.Value(0)).current;
  const taskId = task?.id;

  useEffect(() => {
    pan.setValue(0);
    scale.setValue(1);
  }, [taskId, pan, scale]);

  if (!task) {
    return null;
  }

  const isCompletedView = activeFilter === "completed";
  const xp = xpReward[task.difficulty] || 0;
  const mana = manaReward[task.priority] || 0;
  const priorityAccent = getPriorityColor(task.priority);
  const priorityLabel = getPriorityLabel(task.priority);
  const priorityIcon = getPriorityIcon(task.priority);
  const priorityTone = withAlpha(priorityAccent, 0.75);
  const difficultyAccent = getDifficultyColor(task.difficulty);
  const rewardTone = withAlpha(difficultyAccent, 0.85);

  const totalSubtasks = task.subtasks?.length || 0;
  const completedSubtasks = task.subtasks?.filter((st) => st.completed).length || 0;

  // PanResponder para manejar el swipe
  // se usa useRef para evitar recrear el objeto en cada render
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: (_, gs) =>
        Math.abs(gs.dx) > Math.abs(gs.dy) && Math.abs(gs.dx) > 5,
      onPanResponderMove: Animated.event([null, { dx: pan }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gs) => {
        if (gs.dx > threshold) {
          if (!task.completed && onTaskCompleted) {
            onTaskCompleted(task);
          }
          isDeletedView || isCompletedView
            ? onRestoreTask(task.id)
            : onToggleComplete(task.id);
        } else if (gs.dx < -threshold) {
          isDeletedView
            ? onPermanentDeleteTask(task.id)
            : onSoftDeleteTask(task.id);
        }
        Animated.spring(pan, { toValue: 0, useNativeDriver: true }).start();
      },
    })
  ).current;
  const handlePressIn = () => {
    Animated.spring(scale, { toValue: 0.98, useNativeDriver: true }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start();
  };
  // InformaciÃ³n del elemento (icono y color)
  // se usa una funciÃ³n para evitar lÃ³gica compleja en el render
  const elementInfo = getElementColor(task.element);
  const typeLabel = getTypeLabel(task.type);

  // Estilos de acciÃ³n al deslizar
  return (
    <View style={styles.container}>
      {/* swipe actions */}
      <View style={styles.actionsOverlay} pointerEvents="box-none">
        <Animated.View
          style={[
            styles.rightAction,
            {
              width: threshold,
              opacity: pan.interpolate({
                inputRange: [0, threshold],
                outputRange: [0, 1],
                extrapolate: "clamp",
              }),
              backgroundColor: isDeletedView
                ? Colors.elementWater // Restaurar: azul pastel
                : isCompletedView
                ? Colors.secondary // Completar: verde pastel
                : Colors.secondary, // Completar: verde pastel (default)
            },
          ]}
        >
          <FontAwesome5
            name={isDeletedView || isCompletedView ? "undo" : "check-circle"}
            size={20}
            color={Colors.background}
          />
          <Text style={styles.actionText}>
            {isDeletedView || isCompletedView ? "Restaurar" : "Completar"}
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            styles.leftAction,
            {
              width: threshold,
              opacity: pan.interpolate({
                inputRange: [-threshold, 0],
                outputRange: [1, 0],
                extrapolate: "clamp",
              }),
              backgroundColor: isDeletedView
                ? Colors.danger // Borrar permanente: rojo pastel
                : Colors.accent, // Borrar (soft): amarillo pastel
            },
          ]}
        >
          <FontAwesome5 name="trash" size={20} color={Colors.background} />
          <Text style={styles.actionText}>
            {isDeletedView ? "Borrar permanente" : "Eliminar"}
          </Text>
        </Animated.View>
      </View>

      {/* task content */}
      <Animated.View
        style={[
          {
            transform: [{ translateX: pan }, { scale }],
            opacity: task.completed || task.isDeleted ? 0.5 : 1,
          },
        ]}
        {...panResponder.panHandlers}
        onTouchStart={handlePressIn}
        onTouchEnd={handlePressOut}
      >
        <LinearGradient
          colors={['#1f1b2d', '#252035', '#1f1b2d']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={[
            styles.card,
            {
              borderLeftColor: withAlpha(difficultyAccent, 0.5),
              shadowColor: withAlpha(difficultyAccent, 0.5),
            },
          ]}
        >
        <View style={styles.mainColumn}>
          <View style={styles.cardTopRow}>
            <TouchableOpacity
              style={[styles.checkCircle, task.completed && styles.checkCircleDone]}
              onPress={() => onToggleComplete(task.id)}
              accessibilityRole="checkbox"
              accessibilityLabel={task.completed ? "Marcar como pendiente" : "Marcar como completada"}
              accessibilityState={{ checked: task.completed }}
            >
              {task.completed && (
                <FontAwesome5 name="check" size={12} color={Colors.background} />
              )}
            </TouchableOpacity>

            <View style={styles.titleBlock}>
              <Text style={[styles.title, task.completed && styles.textCompleted]} numberOfLines={2}>
                {task.title}
              </Text>
              {!isExpanded && task.note && task.note.trim().length > 0 && (
                <Text style={styles.notePreview} numberOfLines={2}>
                  {task.note}
                </Text>
              )}
            </View>
          </View>

          {task.tags?.length > 0 && (
            <View style={styles.tagsRow}>
              {(task.tags || []).map((tag) => (
                <TouchableOpacity
                  key={tag}
                  style={styles.tagChip}
                  onPress={() => onTagPress?.(tag)}
                  accessibilityRole="button"
                  accessibilityLabel={`Filtrar por etiqueta ${tag}`}
                >
                  <Text style={styles.tagText} numberOfLines={1}>
                    {`#${tag}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}

          <View style={styles.rewardRow}>
            <Text style={[styles.rewardText, { color: Colors.primary }]}>⚡ +{xp} XP</Text>
            <Text style={styles.separatorBar}>|</Text>
            <Text style={[styles.rewardText, { color: Colors.elementWater }]}>💧 +{mana} Mana</Text>
            {totalSubtasks > 0 && (
              <>
                <Text style={styles.separatorBar}>|</Text>
                <Text style={[styles.rewardText, styles.rewardTextMuted]}>
                  🗒️ {completedSubtasks}/{totalSubtasks}
                </Text>
              </>
            )}
            <TouchableOpacity style={styles.chevronHit} onPress={() => setIsExpanded(!isExpanded)}>
              <FontAwesome5
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={14}
                color={Colors.textMuted}
              />
            </TouchableOpacity>
          </View>

          {totalSubtasks > 0 && (
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { 
                      width: `${(completedSubtasks / totalSubtasks) * 100}%`,
                      backgroundColor: difficultyAccent 
                    }
                  ]} 
                />
              </View>
            </View>
          )}

          {isExpanded && (
            <View style={styles.expandBlock}>
              <View style={styles.headerTile}>
                <View style={styles.headerTileColumn}>
                  <Text style={styles.headerTileLabel}>ELEMENTO</Text>
                  <View style={styles.headerTileValueRow}>
                    <FontAwesome5 name={elementInfo.name} size={10} color={elementInfo.color} />
                    <Text style={styles.headerTileValue}>{elementInfo.label}</Text>
                  </View>
                </View>
                <View style={styles.tileDivider} />
                <View style={styles.headerTileColumn}>
                  <Text style={styles.headerTileLabel}>TIPO</Text>
                  <Text style={styles.headerTileValue}>{typeLabel}</Text>
                </View>
                <View style={styles.tileDivider} />
                <View style={styles.headerTileColumn}>
                  <Text style={styles.headerTileLabel}>PRIORIDAD</Text>
                  <Text style={[styles.headerTileValue, { color: priorityTone }]}>
                    {priorityLabel.charAt(0).toUpperCase() + priorityLabel.slice(1)}
                  </Text>
                </View>
                <View style={styles.tileDivider} />
                <View style={styles.headerTileColumn}>
                  <Text style={styles.headerTileLabel}>DIFICULTAD</Text>
                  <Text style={[styles.headerTileValue, { color: difficultyAccent }]}>
                    {task.difficulty
                      ? task.difficulty.charAt(0).toUpperCase() + task.difficulty.slice(1)
                      : ""}
                  </Text>
                </View>
              </View>

              <TouchableOpacity 
                style={styles.focusButton} 
                onPress={() => onStartFocus?.(task)}
                accessibilityRole="button"
                accessibilityLabel="Iniciar modo de enfoque para esta tarea"
              >
                <FontAwesome5 name="play" size={12} color={Colors.text} />
                <Text style={styles.focusButtonText}>Iniciar foco</Text>
              </TouchableOpacity>

              {task.note ? <Text style={styles.descriptionText}>{task.note}</Text> : null}

              {totalSubtasks > 0 && (
                <>
                  <Text style={styles.subtaskSubtitle}>SUBTAREAS</Text>
                  <View style={styles.subtaskList}>
                    {(task.subtasks || []).map((st) => (
                      <TouchableOpacity
                        key={st.id}
                        style={styles.subtaskItem}
                        onPress={() => onToggleSubtask(task.id, st.id)}
                      >
                        <View style={styles.checkbox}>
                          {st.completed && (
                            <FontAwesome5 name="check" size={10} color={Colors.text} />
                          )}
                        </View>
                        <Text
                          style={[
                            styles.subtaskText,
                            st.completed && styles.subtaskTextCompleted,
                          ]}
                        >
                          {st.text}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                  {!showSubtaskInput ? (
                    <View style={styles.subtaskAddRow}>
                      <TouchableOpacity 
                        onPress={() => setShowSubtaskInput(true)}
                        accessibilityRole="button"
                        accessibilityLabel="Añadir nueva subtarea"
                      >
                        <Text style={styles.subtaskAddText}>+ Añadir paso...</Text>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View style={styles.subtaskAddRow}>
                      <TextInput
                        style={styles.subtaskInput}
                        value={newSubtaskText}
                        onChangeText={setNewSubtaskText}
                        placeholder="Escribe el paso..."
                        placeholderTextColor={Colors.textMuted}
                        autoFocus
                        onSubmitEditing={() => {
                          if (newSubtaskText.trim()) {
                            onAddSubtask?.(task.id, newSubtaskText.trim());
                            setNewSubtaskText("");
                            setShowSubtaskInput(false);
                          }
                        }}
                        onBlur={() => {
                          if (!newSubtaskText.trim()) {
                            setShowSubtaskInput(false);
                          }
                        }}
                      />
                    </View>
                  )}
                </>
              )}
            </View>
          )}
        </View>
        </LinearGradient>
      </Animated.View>
    </View>
  );
}
