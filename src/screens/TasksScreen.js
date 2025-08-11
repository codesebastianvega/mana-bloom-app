import React, { useState } from "react";
import { SafeAreaView, FlatList, Modal, View } from "react-native";

import StatsHeader from "../components/StatsHeader";
import SearchBar from "../components/SearchBar/SearchBar";
import TaskFilters from "../components/TaskFilters";
import SwipeableTaskItem from "../components/SwipeableTaskItem/SwipeableTaskItem";
import AddTaskButton from "../components/AddTaskButton/AddTaskButton";
import FilterBar from "../components/FilterBar/FilterBar";
import styles from "./TasksScreen.styles";
import { Colors } from "../theme";
import CreateTaskModal from "../components/CreateTaskModal/CreateTaskModal";

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
  // ——— 2) Estados ———
  const [tasks, setTasks] = useState([
    // Ejemplo de tareas; reemplaza/inyecta tus datos reales
    {
      id: 1,
      title: "Comprar insumo X",
      note: "Detalle breve de la tarea",
      completed: false,
      isDeleted: false,
      type: "single",
      element: "fire",
      priority: "medium",
      tags: ["personal"],
      difficulty: "hard",
      subtasks: [
        { id: 1, text: "Revisar opciones", completed: false },
        { id: 2, text: "Hacer pedido", completed: false },
      ],
    },
    {
      id: 2,
      title: "Hacer ejercicio",
      note: "30 min de cardio",
      completed: false,
      isDeleted: false,
      type: "habit",
      element: "water",
      priority: "hard",
      tags: ["salud"],
      difficulty: "medium",
    },
  ]);
  const uniqueTags = Array.from(new Set(tasks.flatMap((t) => t.tags || [])));
  // useState para manejar el estado de los filtros
  const [activeFilter, setActiveFilter] = useState("all");
  const [elementFilter, setElementFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("pending");
  const [filtersVisible, setFiltersVisible] = useState(false); // BottomSheet de filtros
  const [showAddModal, setShowAddModal] = useState(false); // Para el botón de añadir tarea
  const [editingTask, setEditingTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const difficultyOptions = [
    { key: "easy", label: "Fácil", color: Colors.secondary },
    { key: "medium", label: "Medio", color: Colors.accent },
    { key: "hard", label: "Difícil", color: Colors.danger },
  ];
  // filtro avanzado
  const [difficultyFilter, setDifficultyFilter] = useState("all");

  const handleSaveTask = (data) => {
    const nextId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask = {
      id: nextId,
      completed: false,
      isDeleted: false,
      ...data,
    };
    setTasks((prev) => [newTask, ...prev]);
  };
  // ——— 3) Handlers ———
  const onToggleComplete = (id) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, completed: !t.completed, isDeleted: false } : t
      )
    );
  const onSoftDeleteTask = (id) =>
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isDeleted: true } : t))
    );
  const onRestoreTask = (id) =>
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, isDeleted: false, completed: false } : t
      )
    );
  const onPermanentDeleteTask = (id) =>
    setTasks((prev) => prev.filter((t) => t.id !== id));
  const onEditTask = (task) => {
    setEditingTask(task);
    setShowEditModal(true);
  };
  const handleUpdateTask = (updatedTask) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
    );
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
  //boton para añadir tarea
  const onAddTask = () => {
    setShowAddModal(true);
  };

  // ——— 4) Filtrado combinado ———
  const filteredTasks = tasks.filter((task) => {
    let stateOK;
    switch (statusFilter) {
      case "completed":
        stateOK = task.completed && !task.isDeleted;
        break;
      case "deleted":
        stateOK = task.isDeleted;
        break;
      default:
        stateOK = !task.completed && !task.isDeleted;
    }
    const typeOK = activeFilter === "all" || task.type === activeFilter;
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

  // ——— 5) Render ———
  return (
    <SafeAreaView style={styles.container}>
      <StatsHeader level={1} xp={25} mana={40} />

      <FilterBar
        filters={statusFilters}
        active={statusFilter}
        onSelect={setStatusFilter}
      />

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onToggleAdvanced={() => setFiltersVisible(true)}
      />

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <SwipeableTaskItem
            task={item}
            onToggleComplete={onToggleComplete}
            onSoftDeleteTask={onSoftDeleteTask}
            onRestoreTask={onRestoreTask}
            onPermanentDeleteTask={onPermanentDeleteTask}
            onEditTask={onEditTask}
            onToggleSubtask={onToggleSubtask}
            activeFilter={statusFilter}
          />
        )}
        style={styles.list}
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
                setActiveFilter(active);
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
