// [MB] TaskCard — chips ajustados y columna derecha
// [MB] Módulo: Tasks / Sección: Tarjeta de tarea
// Afecta: TasksScreen (interacción de completar y eliminar tareas)
// Propósito: Item de tarea deslizable con acciones y recompensas
// Puntos de edición futura: animaciones y estilos en TaskCard
// Autor: Codex - Fecha: 2025-08-14

import React, { useRef, useState } from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  PanResponder,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./TaskCardStyles";

import { Colors, Spacing } from "../../theme";

const getElementColor = (element) => {
  switch (element) {
    case "water":
      return { name: "tint", color: Colors.elementWater, label: "agua" };
    case "earth":
      return { name: "pagelines", color: Colors.elementEarth, label: "earth" };
    case "fire":
      return { name: "fire", color: Colors.elementFire, label: "fire" };
    case "air":
      return { name: "wind", color: Colors.elementAir, label: "air" };
    default:
      return { name: "star", color: Colors.text, label: "all" };
  }
};

const getPriorityColor = (p) => {
  switch (p) {
    case "easy":
      return Colors.secondary;
    case "medium":
      return Colors.accent;
    case "hard":
      return Colors.danger;
    default:
      return Colors.textMuted;
  }
};

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

const getTypeConfig = (type) => {
  switch (type) {
    case "habit":
      return { label: "Hábito", color: Colors.buttonBg };
    case "single":
      return { label: "Tarea", color: Colors.primaryLight };

    default:
      return { label: "Tarea", color: Colors.primaryLight };
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
}) {
  if (!task) return null;

  const pan = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;
  const threshold = 80;
  const isDeletedView = activeFilter === "deleted";
  const isCompletedView = activeFilter === "completed";
  const xp = xpReward[task.difficulty] || 0;
  const mana = manaReward[task.priority] || 0;
  const totalSubtasks = task.subtasks?.length || 0;
  const completedSubtasks = task.subtasks?.filter((st) => st.completed).length || 0;
  const reminderCount = task.reminders?.length || 0;

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
  const handleQuickComplete = () => {
    if (!task.completed && onTaskCompleted) {
      onTaskCompleted(task);
    }
    onToggleComplete(task.id);
  };
  // Información del elemento (icono y color)
  // se usa una función para evitar lógica compleja en el render
  const elementInfo = getElementColor(task.element);
  const typeConfig = getTypeConfig(task.type);
  const [showSubtasks, setShowSubtasks] = useState(false);

  // Estilos de acción al deslizar
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
            borderLeftColor: getDifficultyColor(task.difficulty),
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
            <Text
              style={[styles.title, task.completed && styles.textCompleted]}
            >
              {task.title}
            </Text>
            <Text
              style={[styles.note, task.completed && styles.textCompleted]}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {task.note}
            </Text>
          </View>
        </TouchableOpacity>

        {task.subtasks?.length > 0 && (
          <>
            <TouchableOpacity
              style={styles.subtaskToggle}
              onPress={() => setShowSubtasks(!showSubtasks)}
            >
              <FontAwesome5
                name={showSubtasks ? "chevron-up" : "chevron-down"}
                size={12}
                color={Colors.textMuted}
              />
              <Text style={styles.subtaskToggleText}>Subtareas</Text>
            </TouchableOpacity>
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
                      {task.subtasks.slice(0, 5).map((st) => (
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
                      {task.subtasks.slice(5, 10).map((st) => (
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
                  task.subtasks.map((st) => (
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

        {/* ——— Chips de metadatos ——— */}
        <View style={styles.metaRow}>
          <View
            style={[styles.elementChip, { backgroundColor: elementInfo.color }]}
            accessible
            accessibilityLabel={`Elemento ${elementInfo.label}`}
          >
            <FontAwesome5
              name={elementInfo.name}
              size={14}
              color={Colors.background}
            />
          </View>
          <View style={[styles.chip, { backgroundColor: typeConfig.color }]}>
            <Text style={styles.chipText}>{typeConfig.label}</Text>
          </View>
          <View
            style={[
              styles.chip,
              styles.priorityChip,
              { borderColor: getPriorityColor(task.priority) },
            ]}
          >
            <Text
              style={[
                styles.chipText,
                styles.priorityChipText,
                { color: getPriorityColor(task.priority) },
              ]}
            >
              {getPriorityLabel(task.priority)}
            </Text>
          </View>
        </View>
        {task.tags?.length > 0 && (
          <View style={[styles.metaRow, styles.labelRow]}>
            {task.tags.map((tag) => (
              <View key={tag} style={[styles.chip, styles.tagChip]}>
                <Text style={styles.chipText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
        </View>
        <View style={styles.rightColumn}>
          <View style={styles.rewardBox}>
            <Text style={styles.rewardText}>{`+${xp} XP`}</Text>
            <Text style={styles.rewardText}>{`+${mana} ⚡`}</Text>
          </View>
          {totalSubtasks > 0 && (
            <Text style={styles.progressText}>{`${completedSubtasks}/${totalSubtasks}`}</Text>
          )}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onEditTask(task)}
            accessibilityRole="button"
            accessibilityLabel={`Recordatorios ${reminderCount}`}
            hitSlop={HIT_SLOP}
          >
            <FontAwesome5 name="bell" size={14} color={Colors.text} />
            {reminderCount > 0 && (
              <Text style={styles.iconBadge}>{reminderCount}</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onEditTask(task)}
            accessibilityRole="button"
            accessibilityLabel="Editar tarea"
            hitSlop={HIT_SLOP}
          >
            <FontAwesome5 name="pen" size={14} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={handleQuickComplete}
            accessibilityRole="button"
            accessibilityLabel={task.completed ? "Marcar incompleta" : "Completar tarea"}
            hitSlop={HIT_SLOP}
          >
            <FontAwesome5 name="check" size={14} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
}
