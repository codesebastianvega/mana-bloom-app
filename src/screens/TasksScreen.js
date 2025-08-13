// [MB] Módulo: Tasks / Sección: Pantalla de tareas
// Afecta: TasksScreen (listado y gestión de tareas)
// Propósito: Listar, filtrar y persistir tareas con recompensas seguras
// Puntos de edición futura: manejo remoto y estilos de filtros
// Autor: Codex - Fecha: 2025-08-13

import React, { useState, useEffect, useMemo } from "react";
import { SafeAreaView, FlatList, Modal, View, StatusBar } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getTasks as getStoredTasks, setTasks as setStoredTasks } from "../storage";

import StatsHeader from "../components/StatsHeader";
import SearchBar from "../components/SearchBar/SearchBar";
import TaskFilters from "../components/TaskFilters";
import SwipeableTaskItem from "../components/SwipeableTaskItem/SwipeableTaskItem";
import AddTaskButton, { FAB_SIZE } from "../components/AddTaskButton/AddTaskButton";
import FilterBar from "../components/FilterBar/FilterBar";
import styles from "./TasksScreen.styles";
import { Colors, Spacing } from "../theme";
import CreateTaskModal from "../components/CreateTaskModal/CreateTaskModal";
import { useAppDispatch } from "../state/AppContext";
import { XP_REWARD_BY_PRIORITY } from "../constants/rewards";

// ——— 1) Configuración de filtros ———
const mainFilters = [
  { key: "all", label: "Todos", icon: "star", color: Colors.text },
  { key: "single", label: "Tareas", icon: "calendar", color: Colors.text },
  {
    key: "habit",
    label: "Hábitos",
    icon: "check-square",
    color: Colors.text,
  },
];

const statusFilters = [
  { key: "pending", label: "Pendientes", icon: "clock", color: Colors.text },
  {
    key: "completed",
    label: "Completadas",
    icon: "check-circle",
    color: Colors.secondary,
  },
  { key: "deleted", label: "Eliminadas", icon: "trash", color: Colors.danger },
];

const priorityOptions = [
  {
    key: "easy",
    label: "Baja",
    color: Colors.secondary,
    xp: 10,
    mana: 5,
  },
  {
    key: "medium",
    label: "Media",
    color: Colors.accent,
    xp: 25,
    mana: 12,
  },
  {
    key: "hard",
    label: "Urgente",
    color: Colors.danger,
    xp: 50,
    mana: 25,
  },
];

const elementOptions = [
  {
    key: "water",
    label: "Agua",
    color: Colors.elementWater,
    gradient: [Colors.elementWaterLight, Colors.elementWater],
    icon: "tint",
  },
  {
    key: "fire",
    label: "Fuego",
    color: Colors.elementFire,
    gradient: [Colors.elementFireLight, Colors.elementFire],
    icon: "fire",
  },
  {
    key: "earth",
    label: "Tierra",
    color: Colors.elementEarth,
    gradient: [Colors.elementEarthLight, Colors.elementEarth],
    icon: "pagelines",
  },
  {
    key: "air",
    label: "Aire",
    color: Colors.elementAir,
    gradient: [Colors.elementAirLight, Colors.elementAir],
    icon: "wind",
  },
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

export default function TasksScreen() {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  // ——— 2) Estados ———
  const [tasks, setTasks] = useState([]);
  const uniqueTags = Array.from(new Set(tasks.flatMap((t) => t.tags || [])));
  const [typeFilter, setTypeFilter] = useState("all");
  const [elementFilter, setElementFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("pending");
  const [filtersVisible, setFiltersVisible] = useState(false); // BottomSheet de filtros
  const [showAddModal, setShowAddModal] = useState(false); // Para el botón de añadir tarea
  const [editingTask, setEditingTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const hydrate = async () => {
      const stored = await getStoredTasks();
      const normalized = stored.map((t) => ({
        ...t,
        note: t.note ?? t.description ?? "",
        completed: t.done,
      }));
      setTasks(normalized);
    };
    hydrate();
  }, []);

  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks]);

  const difficultyOptions = [
    { key: "easy", label: "Fácil", color: Colors.secondary },
    { key: "medium", label: "Medio", color: Colors.accent },
    { key: "hard", label: "Difícil", color: Colors.danger },
  ];
  // filtro avanzado
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const addTask = (draft) => {
    const newTask = {
      id: Date.now().toString(),
      title: draft.title,
      description: draft.description || draft.note || "",
      note: draft.note || "",
      priority: draft.priority,
      type: draft.type,
      element: draft.element,
      tags: draft.tags || [],
      difficulty: draft.difficulty,
      subtasks: draft.subtasks || [],
      done: false,
      completed: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
    };
    setTasks((prev) => [newTask, ...prev]);
  };

  const updateTask = (updated) => {
    const toSave = { ...updated };
    if (updated.note !== undefined) {
      toSave.description = updated.note;
    }
    setTasks((prev) =>
      prev.map((t) => (t.id === toSave.id ? { ...t, ...toSave } : t))
    );
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTaskDone = (id) => {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;
    const newDone = !target.done;
    const updated = {
      ...target,
      done: newDone,
      completed: newDone,
      completedAt: newDone ? new Date().toISOString() : null,
      isDeleted: false,
    };
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    if (newDone) {
      const priorityLabel =
        priorityOptions.find((p) => p.key === target.priority)?.label || "";
      const { xp = 0, mana = 0 } =
        XP_REWARD_BY_PRIORITY[priorityLabel] || { xp: 0, mana: 0 };
      dispatch({
        type: "APPLY_TASK_REWARD",
        payload: { xpDelta: xp, manaDelta: mana },
      });
        dispatch({
          type: "UPDATE_DAILY_CHALLENGES_ON_TASK_DONE",
          payload: { priority: priorityLabel },
        });
        dispatch({
          type: "ACHIEVEMENT_EVENT",
          payload: { type: "task_done", payload: { priority: priorityLabel } },
        });
      }
    };

  const onSoftDeleteTask = (id) =>
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, isDeleted: true } : t)));

  const onRestoreTask = (id) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, isDeleted: false, done: false, completed: false, completedAt: null }
          : t
      )
    );

  const onPermanentDeleteTask = (id) => deleteTask(id);

  const onEditTask = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };

  const handleSaveTask = (data) => {
    addTask(data);
    setShowAddModal(false);
  };

  const handleUpdateTask = (updatedData) => {
    updateTask(updatedData);
    setShowEditModal(false);
    setEditingTask(null);
  };

  const onToggleSubtask = (taskId, subId) =>
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId || !t.subtasks) return t;
        return {
          ...t,
          subtasks: t.subtasks.map((st) =>
            st.id === subId ? { ...st, completed: !st.completed } : st
          ),
        };
      })
    );

  const onAddTask = () => {
    setShowAddModal(true);
  };

  // ——— 4) Filtrado combinado ———
  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      let stateOK;
      switch (activeFilter) {
        case "completed":
          stateOK = task.done && !task.isDeleted;
          break;
        case "deleted":
          stateOK = task.isDeleted;
          break;
        default:
          stateOK = !task.done && !task.isDeleted;
      }
      const typeOK = typeFilter === "all" || task.type === typeFilter;
      const elementOK = elementFilter === "all" || task.element === elementFilter;
      const q = searchQuery.toLowerCase();
      const searchOK =
        task.title.toLowerCase().includes(q) ||
        task.note.toLowerCase().includes(q);
      const prioOK = priorityFilter === "all" || task.priority === priorityFilter;
      const tagOK = tagFilter === "all" || (task.tags || []).includes(tagFilter);
      const diffOK =
        difficultyFilter === "all" || task.difficulty === difficultyFilter;

      return (
        stateOK && typeOK && elementOK && searchOK && prioOK && tagOK && diffOK
      );
    });
  }, [
    tasks,
    activeFilter,
    typeFilter,
    elementFilter,
    searchQuery,
    priorityFilter,
    tagFilter,
    difficultyFilter,
  ]);

  // ——— 5) Render ———
  const listData = useMemo(
    () => [
      { renderType: "filters" },
      { renderType: "search" },
      ...filteredTasks,
    ],

    [filteredTasks]
  );

  return (
    <SafeAreaView style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <FlatList
        data={listData}
        keyExtractor={(item) => item.id || item.renderType}
        renderItem={({ item }) => {
          if (item.renderType === "filters") {
            return (
              <FilterBar
                filters={statusFilters}
                active={activeFilter}
                onSelect={setActiveFilter}
              />
            );
          }
          if (item.renderType === "search") {
            return (
              <View style={{ marginVertical: Spacing.small }}>
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onToggleAdvanced={() => setFiltersVisible(true)}
                />
              </View>
            );
          }
          return (

            <SwipeableTaskItem
              task={item}
              onToggleComplete={toggleTaskDone}
              onSoftDeleteTask={onSoftDeleteTask}
              onRestoreTask={onRestoreTask}
              onPermanentDeleteTask={onPermanentDeleteTask}
              onEditTask={onEditTask}
              onToggleSubtask={onToggleSubtask}
              activeFilter={activeFilter}
            />
          );
        }}
        ListHeaderComponent={
          <View style={{ marginVertical: Spacing.small }}>
            <StatsHeader />
          </View>
        }
        stickyHeaderIndices={[1]}

        contentContainerStyle={{
          paddingHorizontal: Spacing.large,
          paddingTop: Spacing.base,
        }}
        ListFooterComponent={
          <View
            style={{ height: FAB_SIZE + insets.bottom + Spacing.large }}
          />
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        initialNumToRender={8}
        windowSize={11}
        contentInsetAdjustmentBehavior="automatic"
        extraData={{ tasks, activeFilter, searchQuery }}
        accessibilityRole="list"
      />

      <AddTaskButton onPress={onAddTask} />

      <Modal
        visible={filtersVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setFiltersVisible(false)}
      >
        <View style={styles.filterModalBackground}>
          <View style={styles.filterModalContainer}>
            <TaskFilters
              filters={mainFilters}
              elementOptions={elementOptions}
              priorityOptions={priorityOptions}
              difficultyOptions={difficultyOptions}
              tags={uniqueTags}
              onSelect={({
                active,
                elementFilter,
                priorityFilter,
                difficultyFilter,
                tagFilter,
              }) => {
                setTypeFilter(active);
                setElementFilter(elementFilter);
                setPriorityFilter(priorityFilter);
                setDifficultyFilter(difficultyFilter);
                setTagFilter(tagFilter);
                setFiltersVisible(false);
              }}
              onClose={() => setFiltersVisible(false)}
            />
          </View>
        </View>
      </Modal>

      {/* Modal de Nueva Tarea */}
      <CreateTaskModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleSaveTask}
        uniqueTags={uniqueTags}
        priorityOptions={priorityOptions}
        elementOptions={elementOptions}
        difficultyOptions={difficultyOptions}
      />
      <CreateTaskModal
        visible={showEditModal}
        onClose={() => {
          setShowEditModal(false);
          setEditingTask(null);
        }}
        onUpdate={handleUpdateTask}
        task={editingTask}
        uniqueTags={uniqueTags}
        priorityOptions={priorityOptions}
        elementOptions={elementOptions}
        difficultyOptions={difficultyOptions}
      />
    </SafeAreaView>
  );
}
