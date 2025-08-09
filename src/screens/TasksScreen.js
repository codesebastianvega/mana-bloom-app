import React, { useState } from "react";
import { SafeAreaView, FlatList } from "react-native";

import StatsHeader from "../components/StatsHeader";
import FilterBar from "../components/FilterBar/FilterBar";
import SearchBar from "../components/SearchBar/SearchBar";
import AdvancedFilters from "../components/AdvancedFilters/AdvancedFilters";
import SwipeableTaskItem from "../components/SwipeableTaskItem/SwipeableTaskItem";
import AddTaskButton from "../components/AddTaskButton/AddTaskButton";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import styles, { modalStyles } from "./TasksScreen.styles";
import { Colors, Spacing } from "../theme";
import { FontAwesome5 } from "@expo/vector-icons";

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
  {
    key: "completed",
    label: "Completadas",
    icon: "check-circle",
    color: Colors.secondary,
  },
  { key: "deleted", label: "Eliminadas", icon: "trash", color: Colors.danger },
];

const priorityOptions = [
  { key: "urgent", label: "Urgentes", color: Colors.danger },
  { key: "pending", label: "Pendientes", color: Colors.primary },
  { key: "relevant", label: "Relevantes", color: Colors.secondary },
];

const elementOptions = [
  { key: "water", label: "Agua", color: Colors.elementWater, icon: "tint" },
  {
    key: "earth",
    label: "Tierra",
    color: Colors.elementEarth,
    icon: "pagelines",
  },
  { key: "fire", label: "Fuego", color: Colors.elementFire, icon: "fire" },
  { key: "air", label: "Aire", color: Colors.elementAir, icon: "wind" },
];

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
      priority: "pending",
      tags: ["personal"],
      difficulty: "hard",
    },
    {
      id: 2,
      title: "Hacer ejercicio",
      note: "30 min de cardio",
      completed: false,
      isDeleted: false,
      type: "habit",
      element: "water",
      priority: "urgent",
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
  const [showAdvanced, setShowAdvanced] = useState(false); // Para mostrar/ocultar filtros avanzados
  const [showAddModal, setShowAddModal] = useState(false); // Para el botón de añadir tarea

  // Estados para la nueva tarea
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  // Estados extra en el modal de creación
  const [newType, setNewType] = useState("single"); // 'single' | 'habit'
  const [newElement, setNewElement] = useState("all"); // 'all' | 'water' | 'earth' | ...
  const [newPriority, setNewPriority] = useState("all"); // 'all' | 'urgent' | 'pending' | 'relevant'
  // ➕ Estados para etiquetas en modal
  const [newTagInput, setNewTagInput] = useState("");
  const [newTags, setNewTags] = useState([]);
  // Opciones del tipo de tarea
  const typeOptions = [
    { key: "single", label: "Tarea", activeColor: Colors.primaryLight },
    { key: "habit", label: "Hábito", activeColor: Colors.secondaryLight },
  ];
  // Opciones de dificultad
  const difficultyOptions = [
    { key: "easy", label: "Fácil", color: Colors.secondary },
    { key: "medium", label: "Medio", color: Colors.accent },
    { key: "hard", label: "Difícil", color: Colors.danger },
  ];
  // filtro avanzado
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  // en el modal (nueva tarea)
  const [newDifficulty, setNewDifficulty] = useState("easy");

  // Handler que crea y añade la nueva tarea
  const onSaveTask = () => {
    if (!newTitle.trim()) return; // no dejamos guardar sin título
    const nextId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
    const newTask = {
      id: nextId,
      title: newTitle,
      note: newNote,
      completed: false,
      isDeleted: false,
      type: newType, // ✔️ usamos el estado
      element: newElement,
      priority: newPriority,
      tags: newTags.length > 0 ? newTags : [], // si hay etiquetas, las usamos
      difficulty: newDifficulty, // dificultad por defecto
    };
    // Añadimos la nueva tarea al estado
    setTasks((prev) => [newTask, ...prev]);
    // reset campos y cerramos modal
    setNewDifficulty("easy");
    setNewTitle("");
    setNewNote("");
    setNewType("single");
    setNewElement("all");
    setNewPriority("all");
    setShowAddModal(false);
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
    // TODO: abrir modal o navegar
    console.log("Editar tarea", task);
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
    switch (activeFilter) {
      case "single":
        stateOK = !task.isDeleted && !task.completed && task.type === "single";
        break;
      case "habit":
        stateOK = !task.isDeleted && !task.completed && task.type === "habit";
        break;
      case "completed":
        stateOK = task.completed && !task.isDeleted;
        break;
      case "deleted":
        stateOK = task.isDeleted;
        break;
      default:
        stateOK = !task.isDeleted && !task.completed;
    }
    const elementOK = elementFilter === "all" || task.element === elementFilter;
    const q = searchQuery.toLowerCase();
    const searchOK =
      task.title.toLowerCase().includes(q) ||
      task.note.toLowerCase().includes(q);
    const prioOK = priorityFilter === "all" || task.priority === priorityFilter;
    const tagOK = tagFilter === "all" || (task.tags || []).includes(tagFilter);
    const diffOK =
      difficultyFilter === "all" || task.difficulty === difficultyFilter;

    return stateOK && elementOK && searchOK && prioOK && tagOK && diffOK;
  });

  // ——— 5) Render ———
  return (
    <SafeAreaView style={styles.container}>
      <StatsHeader level={1} xp={25} mana={40} />

      <FilterBar
        filters={mainFilters}
        active={activeFilter}
        onSelect={setActiveFilter}
      />

      <SearchBar
        value={searchQuery}
        onChange={setSearchQuery}
        onToggleAdvanced={() => setShowAdvanced(!showAdvanced)}
      />

      {showAdvanced && (
        <AdvancedFilters
          elementOptions={elementOptions}
          elementFilter={elementFilter}
          setElementFilter={setElementFilter}
          priorityOptions={priorityOptions}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          difficultyOptions={difficultyOptions}
          difficultyFilter={difficultyFilter}
          setDifficultyFilter={setDifficultyFilter}
          tags={uniqueTags}
          tagFilter={tagFilter}
          setTagFilter={setTagFilter}
        />
      )}

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
            activeFilter={activeFilter}
          />
        )}
        style={styles.list}
      />

      <AddTaskButton onPress={onAddTask} />
      {/* Modal de Nueva Tarea */}
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={modalStyles.background}>
          <View style={modalStyles.container}>
            {/* Título del modal */}
            <Text style={modalStyles.title}>Crear Nueva Tarea</Text>

            {/* Input Título */}
            <TextInput
              style={modalStyles.input}
              placeholder="Título"
              placeholderTextColor={Colors.textMuted}
              value={newTitle}
              onChangeText={setNewTitle}
            />

            {/* Input Nota */}
            <TextInput
              style={[modalStyles.input, { marginTop: Spacing.small }]}
              placeholder="Detalle o nota (opcional)"
              placeholderTextColor={Colors.textMuted}
              value={newNote}
              onChangeText={setNewNote}
            />
            {/* Tipo de tarea */}
            <Text style={modalStyles.label}>Tipo</Text>
            <View style={modalStyles.row}>
              {typeOptions.map((opt, index) => {
                const active = newType === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    style={[
                      modalStyles.typeOptionBtn,
                      index === typeOptions.length - 1 && { marginRight: 0 },
                      active && { backgroundColor: opt.activeColor },
                    ]}
                    onPress={() => setNewType(opt.key)}
                  >
                    <Text
                      style={[
                        modalStyles.typeOptionText,
                        active && { color: Colors.background },
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Elemento */}
            <Text style={modalStyles.label}>Elemento</Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={modalStyles.row}
            >
              {elementOptions.map((el) => {
                const active = newElement === el.key;
                return (
                  <TouchableOpacity
                    key={el.key}
                    style={[
                      modalStyles.optionBtn,
                      active && { backgroundColor: el.color },
                    ]}
                    onPress={() => setNewElement(el.key)}
                  >
                    <FontAwesome5
                      name={el.icon}
                      size={16}
                      color={active ? Colors.background : el.color}
                    />
                    <Text
                      style={[
                        modalStyles.optionText,
                        active && { color: Colors.background },
                      ]}
                    >
                      {el.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Prioridad */}
            <Text style={modalStyles.label}>Prioridad</Text>
            <View style={modalStyles.row}>
              {priorityOptions.map((pr) => {
                const active = newPriority === pr.key;
                return (
                  <TouchableOpacity
                    key={pr.key}
                    style={[
                      modalStyles.optionBtn,
                      active && {
                        backgroundColor: pr.color,
                        borderColor: pr.color, // ← borde a color activo
                      },
                    ]}
                    onPress={() => setNewPriority(pr.key)}
                  >
                    <Text
                      style={[
                        modalStyles.optionText,
                        active && { color: Colors.background },
                      ]}
                    >
                      {pr.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Dificultad */}
            <Text style={modalStyles.label}>Dificultad</Text>
            <View style={modalStyles.row}>
              {difficultyOptions.map((opt) => {
                const active = newDifficulty === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    style={[
                      modalStyles.optionBtn,
                      active && {
                        backgroundColor: opt.color,
                        borderColor: opt.color,
                      },
                    ]}
                    onPress={() => setNewDifficulty(opt.key)}
                  >
                    <Text
                      style={[
                        modalStyles.optionText,
                        active && { color: Colors.background },
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Etiquetas dinámicas */}
            <Text style={modalStyles.label}>Etiquetas</Text>
            <View style={modalStyles.tagInputRow}>
              <TextInput
                style={modalStyles.tagInput}
                placeholder="Nueva etiqueta"
                placeholderTextColor={Colors.textMuted}
                value={newTagInput}
                onChangeText={setNewTagInput}
              />
              <TouchableOpacity
                style={modalStyles.addTagButton}
                onPress={() => {
                  const tag = newTagInput.trim();
                  if (!tag) return;
                  setNewTags((prev) => [...new Set([...prev, tag])]);
                  setNewTagInput("");
                }}
              >
                <FontAwesome5 name="plus" size={16} color={Colors.background} />
              </TouchableOpacity>
            </View>
            {/* Etiquetas existentes */}
            {uniqueTags.length > 0 && (
              <Text style={modalStyles.label}>Selecciona etiquetas</Text>
            )}
            {uniqueTags.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={modalStyles.row}
                contentContainerStyle={{ alignItems: "center" }}
              >
                {uniqueTags.map((tagKey) => {
                  const active = newTags.includes(tagKey);
                  return (
                    <TouchableOpacity
                      key={tagKey}
                      style={[
                        modalStyles.optionBtn,
                        active && {
                          backgroundColor: Colors.accent,
                          borderColor: Colors.accent,
                        },
                      ]}
                      onPress={() => {
                        // alterna selección
                        setNewTags((prev) =>
                          prev.includes(tagKey)
                            ? prev.filter((t) => t !== tagKey)
                            : [...prev, tagKey]
                        );
                      }}
                    >
                      <Text
                        style={[
                          modalStyles.optionText,
                          active && { color: Colors.background },
                        ]}
                      >
                        {tagKey}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>
            )}

            {newTags.length > 0 && (
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={modalStyles.row}
                contentContainerStyle={{ alignItems: "center" }}
              >
                {newTags.map((tag) => (
                  <View key={tag} style={modalStyles.tagChip}>
                    <Text style={modalStyles.tagText}>{tag}</Text>
                  </View>
                ))}
              </ScrollView>
            )}

            {/* Botones */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                marginTop: Spacing.base,
              }}
            >
              <TouchableOpacity
                style={[
                  modalStyles.button,
                  {
                    backgroundColor: Colors.danger,
                    marginRight: Spacing.small,
                  },
                ]}
                onPress={() => setShowAddModal(false)}
              >
                <Text style={modalStyles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  modalStyles.button,
                  { backgroundColor: Colors.primary },
                ]}
                onPress={onSaveTask}
              >
                <Text style={modalStyles.buttonText}>Guardar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
