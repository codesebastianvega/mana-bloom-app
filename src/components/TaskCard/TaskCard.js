// [MB] TaskCard — micro-chips informativos y jerarquía de Subtareas
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

const CHIP_GAP = Spacing.small - Spacing.tiny / 2;

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

const getTypeLabel = (type) => {
  switch (type) {
    case "habit":
      return "Hábito";
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
  // Información del elemento (icono y color)
  // se usa una función para evitar lógica compleja en el render
  const elementInfo = getElementColor(task.element);
  const typeLabel = getTypeLabel(task.type);
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
                <Text style={styles.subtaskToggleText}>Subtareas</Text>
              </TouchableOpacity>
              <View style={styles.subtaskCountChip}>
                <Text style={styles.subtaskCountText}>{`${completedSubtasks}/${totalSubtasks}`}</Text>
              </View>
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

        {/* ——— Chips de metadatos, etiquetas y recompensas ——— */}
        <View style={styles.metaRow}>
          <View style={styles.chip} accessibilityRole="text">
            <Text style={styles.chipText}>{typeLabel}</Text>
          </View>
          <View style={styles.chip} accessibilityRole="text">
            <Text style={styles.chipText}>{getPriorityLabel(task.priority)}</Text>
          </View>
          {task.tags?.length > 0 && (
            <View style={styles.tagsContainer}>
              {task.tags.map((tag) => (
                <View key={tag} style={styles.tagChip} accessibilityRole="text">
                  <Text
                    style={styles.chipText}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    {tag}
                  </Text>
                </View>
              ))}
            </View>
          )}
          <Text
            style={[
              styles.rewardInlineText,
              {
                color: getPriorityColor(task.priority),
                marginLeft: task.tags?.length ? CHIP_GAP : "auto",
              },
            ]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >{`+${xp} XP · +${mana} ⚡`}</Text>
        </View>
        </View>
        <View style={styles.rightColumn}>
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
      </Animated.View>
    </View>
  );
}
