// src/components/SwipeableTaskItem/SwipeableTaskItem.js

import React, { useRef } from "react";
import {
  Animated,
  View,
  TouchableOpacity,
  Text,
  PanResponder,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./SwipeableTaskItem.styles";
import { Colors } from "../../theme";

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
    case "urgent":
      return Colors.danger;
    case "pending":
      return Colors.primary;
    case "relevant":
      return Colors.secondary;
    default:
      return Colors.textMuted;
  }
};

const getDifficultyColor = (d) => {
  switch (d) {
    case "easy":
      return Colors.secondary;
    case "medium":
      return Colors.accent;
    case "hard":
      return Colors.danger;
    default:
      return Colors.text;
  }
};

export default function SwipeableTaskItem({
  task,
  onToggleComplete,
  onSoftDeleteTask,
  onRestoreTask,
  onPermanentDeleteTask,
  activeFilter,
  onEditTask,
  onToggleSubtask,
}) {
  if (!task) return null;

  const pan = useRef(new Animated.Value(0)).current;
  const threshold = 80;
  const isDeletedView = activeFilter === "deleted";
  const isCompletedView = activeFilter === "completed";

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
  // Información del elemento (icono y color)
  // se usa una función para evitar lógica compleja en el render
  const elementInfo = getElementColor(task.element);

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
                ? "#87a4edff" // Restaurar: azul pastel
                : isCompletedView
                ? "#92de71ff" // Completar: verde pastel
                : "#92de71ff", // Completar: verde pastel (default)
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
                ? "#FF8A80" // Borrar permanente: rojo pastel
                : "#be6a69ff", // Borrar (soft): amarillo pastel
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
          styles.taskItem,
          {
            transform: [{ translateX: pan }],
            opacity: task.completed || task.isDeleted ? 0.5 : 1,
            borderLeftColor: getDifficultyColor(task.difficulty),
          },
        ]}
        {...panResponder.panHandlers}
      >
        <TouchableOpacity
          style={styles.contentRow}
          onPress={() => onEditTask(task)}
        >
          {/* textos */}

          <View style={styles.textContainer}>
            <Text
              style={[styles.title, task.completed && styles.textCompleted]}
            >
              {task.title}
            </Text>
            <Text style={[styles.note, task.completed && styles.textCompleted]}>
              {task.note}
            </Text>
          </View>
        </TouchableOpacity>

        {/* ——— Badges de Elemento y Dificultad ——— */}
        <View style={styles.badgeRow}>
          {/* Elemento (solo icono) */}
          <View
            style={[
              styles.elementBadge,
              { backgroundColor: elementInfo.color },
            ]}
            accessible
            accessibilityLabel={`Elemento ${elementInfo.label}`}
          >
            <FontAwesome5
              name={elementInfo.name}
              size={12}
              color={Colors.background}
            />
          </View>
          {/* Dificultad */}
          <View
            style={[
              styles.badge,
              { backgroundColor: getDifficultyColor(task.difficulty) },
            ]}
          >
            <FontAwesome5
              name="lightbulb"
              size={12}
              color={Colors.background}
              style={styles.badgeIcon}
            />
            <Text style={[styles.badgeText, { color: Colors.background }]}>
              {task.difficulty}
            </Text>
          </View>
          {/* Prioridad (chip con borde) */}
          <View
            style={[
              styles.priorityChip,
              { borderColor: getPriorityColor(task.priority) },
            ]}
          >
            <Text
              style={[
                styles.priorityChipText,
                { color: getPriorityColor(task.priority) },
              ]}
            >
              {task.priority}
            </Text>
          </View>
        </View>

        {/* Etiquetas de la tarea */}
        {task.tags?.length > 0 && (
          <View style={styles.tagContainer}>
            {task.tags.map((tag) => (
              <View key={tag} style={styles.tagChip}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Subtareas (si existen) */}
        {task.subtasks?.length > 0 && (
          <View style={styles.subtaskList}>
            {task.subtasks.map((st) => (
              <View key={st.id} style={styles.subtaskItem}>
                <TouchableOpacity
                  style={styles.checkbox}
                  onPress={() => onToggleSubtask(task.id, st.id)}
                >
                  {st.completed && (
                    <FontAwesome5
                      name="check"
                      size={10}
                      color={Colors.surface}
                    />
                  )}
                </TouchableOpacity>
                <Text
                  style={[
                    styles.subtaskText,
                    st.completed && styles.subtaskTextCompleted,
                  ]}
                >
                  {st.text}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Animated.View>
    </View>
  );
}
