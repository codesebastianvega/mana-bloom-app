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
} from "react-native";
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
} = {}) {

  const pan = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const threshold = 80;
  const isDeletedView = activeFilter === "deleted";

  const [showSubtasks, setShowSubtasks] = useState(false);
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
          styles.card,
            {
              transform: [{ translateX: pan }, { scale }],
              opacity: task.completed || task.isDeleted ? 0.5 : 1,
              borderLeftColor: difficultyAccent,
              shadowColor: withAlpha(difficultyAccent, 0.6),
            },
          ]}
        {...panResponder.panHandlers}
        onTouchStart={handlePressIn}
        onTouchEnd={handlePressOut}
      >
        <View style={styles.mainColumn}>
          <TouchableOpacity
            style={styles.contentRow}
            onPress={() => onEditTask(task)}
          >
            <View style={styles.textContainer}>
              <View style={styles.titleRow}>
                <Text
                  style={[styles.title, task.completed && styles.textCompleted]}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {task.title}
                </Text>
              </View>
              <Text
                style={[styles.note, task.completed && styles.textCompleted]}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {task.note}
              </Text>
            </View>
          </TouchableOpacity>

          {totalSubtasks > 0 && (
            <>
              <View style={styles.subtaskHeader}>
                <TouchableOpacity
                  style={styles.subtaskToggle}
                  onPress={() => setShowSubtasks(!showSubtasks)}
                >
                  <FontAwesome5
                    name={showSubtasks ? "chevron-up" : "chevron-down"}
                    size={12}
                    color={Colors.textMuted}
                  />
                  <Text style={styles.subtaskToggleText}>
                    {`Subtareas \u00B7 ${completedSubtasks}/${totalSubtasks}`}
                  </Text>
                </TouchableOpacity>
              </View>
              {showSubtasks && (
                <View style={styles.subtaskList}>
                  {task.subtasks.length > 5 ? (
                    <View style={styles.subtaskColumns}>
                      <View
                        style={[
                          styles.subtaskColumn,
                          { marginRight: Spacing.small },
                        ]}
                      >
                        {(task.subtasks || []).slice(0, 5).map((st) => (
                          <TouchableOpacity
                            key={st.id}
                            style={styles.subtaskItem}
                            onPress={() => onToggleSubtask(task.id, st.id)}
                          >
                            <View style={styles.checkbox}>
                              {st.completed && (
                                <FontAwesome5
                                  name="check"
                                  size={10}
                                  color={Colors.text}
                                />
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
                      <View style={styles.subtaskColumn}>
                        {(task.subtasks || []).slice(5, 10).map((st) => (
                          <TouchableOpacity
                            key={st.id}
                            style={styles.subtaskItem}
                            onPress={() => onToggleSubtask(task.id, st.id)}
                          >
                            <View style={styles.checkbox}>
                              {st.completed && (
                                <FontAwesome5
                                  name="check"
                                  size={10}
                                  color={Colors.text}
                                />
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
                    </View>
                  ) : (
                    (task.subtasks || []).map((st) => (
                      <TouchableOpacity
                        key={st.id}
                        style={styles.subtaskItem}
                        onPress={() => onToggleSubtask(task.id, st.id)}
                      >
                        <View style={styles.checkbox}>
                          {st.completed && (
                            <FontAwesome5
                              name="check"
                              size={10}
                              color={Colors.text}
                            />
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
                    ))
                  )}
                </View>
              )}
            </>
          )}

          <View style={styles.metaRow}>
            <View
              style={[
                styles.priorityChip,
                {
                  borderColor: withAlpha(priorityAccent, 0.55),
                  backgroundColor: withAlpha(Colors.surfaceAlt, 0.45),
                },
              ]}
              accessibilityRole="text"
            >
              <FontAwesome5
                name={priorityIcon}
                size={9}
                color={priorityTone}
              />
              <Text
                style={[
                  styles.priorityChipText,
                  { color: priorityTone },
                ]}
              >
                {`Prioridad ${priorityLabel}`}
              </Text>
            </View>
          </View>
          <View style={styles.rewardRow} accessibilityRole="text">
            <Text style={[styles.rewardLabel, { color: rewardTone }]}>
              Recompensas:
            </Text>
            <FontAwesome5 name="bolt" size={11} color={rewardTone} />
            <Text style={[styles.rewardText, { color: rewardTone }]}>{`+${xp} XP`}</Text>
            <Text style={[styles.rewardSeparator, { color: rewardTone }]}>/</Text>
            <FontAwesome5 name="tint" size={11} color={rewardTone} />
            <Text style={[styles.rewardText, { color: rewardTone }]}>{`+${mana} Mana`}</Text>
          </View>

          {task.tags?.length > 0 && (
            <View style={styles.tagsRow}>
              {(task.tags || []).map((tag) => (
                <View key={tag} style={styles.tagChip} accessibilityRole="text">
                  <Text
                    style={styles.tagText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          )}
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.typeAndElementRow}>
            <View style={styles.typeChip} accessibilityRole="text">
              <Text style={styles.typeChipText}>{typeLabel}</Text>
            </View>
            <TouchableOpacity
              style={styles.elementButton}
              onPress={() => onEditTask(task)}
              accessibilityRole="button"
              accessibilityLabel={`Editar tarea (Elemento: ${elementInfo.label})`}
              hitSlop={HIT_SLOP}
            >
              <FontAwesome5
                name={elementInfo.name}
                size={14}
                color={elementInfo.color}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}
