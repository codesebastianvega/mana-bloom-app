import React, { useState } from "react";
import { SafeAreaView, FlatList } from "react-native";

import StatsHeader from "../components/StatsHeader";
import SearchBar from "../components/SearchBar/SearchBar";
import TaskFilters from "../components/TaskFilters";
import SwipeableTaskItem from "../components/SwipeableTaskItem/SwipeableTaskItem";
import AddTaskButton from "../components/AddTaskButton/AddTaskButton";
import FilterBar from "../components/FilterBar/FilterBar";
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
import { LinearGradient } from "expo-linear-gradient";

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
    label: "Fácil",
    color: Colors.secondary,
    xp: 10,
    mana: 5,
  },
  {
    key: "medium",
    label: "Medio",
    color: Colors.accent,
    xp: 25,
    mana: 12,
  },
  {
    key: "hard",
    label: "Difícil",
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
    purpose: 'Propósito: "Inyecta poder y acelera el crecimiento de la planta."',

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

  // Estados para la nueva tarea
  const [newTitle, setNewTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  // Estados extra en el modal de creación
  const [newType, setNewType] = useState("single"); // 'single' | 'habit'
  const [newElement, setNewElement] = useState("all"); // 'all' | 'water' | 'earth' | ...
  const [newPriority, setNewPriority] = useState("easy"); // 'easy' | 'medium' | 'hard'
  // ➕ Estados para etiquetas en modal
  const [newTagInput, setNewTagInput] = useState("");
  const [newTags, setNewTags] = useState([]);
  const [newSubtaskInput, setNewSubtaskInput] = useState("");
  const [newSubtasks, setNewSubtasks] = useState([]);
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
      subtasks: newSubtasks.map((text, index) => ({
        id: index + 1,
        text,
        completed: false,
      })),
    };
    // Añadimos la nueva tarea al estado
    setTasks((prev) => [newTask, ...prev]);
    // reset campos y cerramos modal
    setNewDifficulty("easy");
    setNewTitle("");
    setNewNote("");
    setNewType("single");
    setNewElement("all");
    setNewPriority("easy");
    setNewSubtaskInput("");
    setNewSubtasks([]);
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
      stateOK &&
      typeOK &&
      elementOK &&
      searchOK &&
      prioOK &&
      tagOK &&
      diffOK
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
        animationType="slide"
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
      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={modalStyles.background}>
          <View style={modalStyles.container}>
            <ScrollView
              style={{ width: "100%" }}
              contentContainerStyle={{ paddingBottom: Spacing.large }}
              showsVerticalScrollIndicator={false}
            >
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
            <View style={modalStyles.elementGrid}>
              {elementOptions.map((el) => {
                const active = newElement === el.key;
                return (
                  <TouchableOpacity
                    key={el.key}
                    style={modalStyles.elementBtn}
                    onPress={() => setNewElement(el.key)}
                  >
                    <LinearGradient
                      colors={
                        active
                          ? el.gradient
                          : [Colors.filterBtnBg, Colors.filterBtnBg]
                      }
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={modalStyles.elementBtnInner}
                    >
                      <FontAwesome5
                        name={el.icon}
                        size={16}
                        color={active ? Colors.background : Colors.text}
                      />
                      <Text
                        style={[
                          modalStyles.optionText,
                          { color: active ? Colors.background : Colors.text },
                        ]}
                      >
                        {el.label}
                      </Text>
                    </LinearGradient>
                  </TouchableOpacity>
                );
              })}
            </View>

            {newElement !== "all" && (
              <View style={modalStyles.elementInfoBox}>
                <Text style={modalStyles.elementInfoTitle}>
                  {elementInfo[newElement].title}
                </Text>
                <Text style={modalStyles.elementInfoDescription}>
                  {elementInfo[newElement].description}
                </Text>
                <Text style={modalStyles.elementInfoExamples}>
                  {elementInfo[newElement].examples}
                </Text>
                <Text style={modalStyles.elementInfoPurpose}>

                  {elementInfo[newElement].purpose}
                </Text>
              </View>
            )}

            {/* Subtareas */}
            <Text style={modalStyles.label}>Subtareas</Text>
            <View style={modalStyles.subtaskInputRow}>
              <TextInput
                style={modalStyles.subtaskInput}
                placeholder="Nueva subtarea"
                placeholderTextColor={Colors.textMuted}
                value={newSubtaskInput}
                onChangeText={setNewSubtaskInput}
              />
              <TouchableOpacity
                style={modalStyles.addSubtaskButton}
                onPress={() => {
                  const st = newSubtaskInput.trim();
                  if (!st) return;
                  setNewSubtasks((prev) => [...prev, st]);
                  setNewSubtaskInput("");
                }}
              >
                <FontAwesome5 name="plus" size={16} color={Colors.background} />
              </TouchableOpacity>
            </View>
            {newSubtasks.length > 0 && (
              <View style={modalStyles.subtaskList}>
                {newSubtasks.map((st, idx) => (
                  <View key={idx} style={modalStyles.subtaskItem}>
                    <Text style={modalStyles.subtaskText}>{st}</Text>
                  </View>
                ))}
              </View>
            )}

            {/* Prioridad */}
            <Text style={modalStyles.label}>Prioridad</Text>
            <View style={modalStyles.priorityContainer}>
              {priorityOptions.map((pr) => {
                const active = newPriority === pr.key;
                return (
                  <TouchableOpacity
                    key={pr.key}
                    style={[
                      modalStyles.priorityBtn,
                      { borderRightColor: pr.color },
                      active && {
                        backgroundColor: pr.color,
                      },
                    ]}
                    onPress={() => setNewPriority(pr.key)}
                  >
                    <Text
                      style={[
                        modalStyles.priorityTitle,
                        active && { color: Colors.background },
                      ]}
                    >
                      {pr.label}
                    </Text>
                    <Text
                      style={[
                        modalStyles.prioritySubtitle,
                        active && { color: Colors.background },
                      ]}
                    >
                      {`+${pr.xp} XP • +${pr.mana} Maná`}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Dificultad */}
            <Text style={modalStyles.label}>Dificultad</Text>
            <View style={modalStyles.row}>
              {difficultyOptions.map((opt, index) => {
                const active = newDifficulty === opt.key;
                return (
                  <TouchableOpacity
                    key={opt.key}
                    style={[
                      modalStyles.difficultyOptionBtn,
                      index === difficultyOptions.length - 1 && { marginRight: 0 },
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
                        { marginLeft: 0 },
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
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
