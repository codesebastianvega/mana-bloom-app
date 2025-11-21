// [MB] Modulo: Tasks / Seccion: Pantalla de tareas
// Afecta: TasksScreen (listado y gestion de tareas)
// Proposito: Listar, filtrar y guiar el uso de colores y recompensas
// Puntos de edicion futura: filtros avanzados y ayudas contextuales
// Autor: Codex - Fecha: 2025-10-20

import React, { useState, useEffect, useMemo } from "react";
import { FlatList, Modal, View, StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getTasks as getStoredTasks, setTasks as setStoredTasks } from "../storage";
import { supabase } from "../lib/supabase";
import { fetchUserData, pushTask } from "../lib/sync";

import StatsHeader from "../components/StatsHeader";
import TaskFilters from "../components/TaskFilters";
import TaskCard from "../components/TaskCard/TaskCard";
import FiltersHeader from "../components/FilterBar/FiltersHeader";
import styles from "./TasksScreen.styles";
import { Colors, Spacing, Gradients, ElementAccents } from "../theme";
import CreateTaskModal from "../components/CreateTaskModal/CreateTaskModal";
import { useAppDispatch } from "../state/AppContext";
import { XP_REWARD_BY_PRIORITY } from "../constants/rewards";
import { canCompleteTask, calculateFinalReward } from "../constants/taskIntegrity";
import { calculateTaskReward } from "../constants/economyConfig";

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

const STATUS_FILTER_CONFIG = [
  {
    key: "pending",
    label: "Pendientes",
    icon: "clock",
    accent: Colors.accent,
  },
  {
    key: "completed",
    label: "Completadas",
    icon: "check-circle",
    accent: Colors.success,
  },
  {
    key: "deleted",
    label: "Eliminadas",
    icon: "trash",
    accent: Colors.danger,
  },
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
    examples: [
      "Enviar propuesta con deadline hoy",
      "Pitch rápido/brainstorm",
      "Entrenamiento intenso",
      "Resolver bug crítico",
      "Grabar video/toma creativa",
      "Lanzar campaña",
      "Limpiar backlog urgente",
    ],
    purpose:
      'Propósito: "Inyecta poder y acelera el crecimiento de la planta."',
  },
  water: {
    title: "Agua 💧 (Calma y Flujo)",
    description:
      "Se usa para tareas que necesitan atención continua, concentración o un estado de calma.",
    examples: [
      "Planificar semana",
      "Leer/estudiar 30–60 min",
      "Redactar documento largo",
      "Procesar correos",
      "Meditación/respiración",
      "Refinar notas",
      "Revisión tranquila de PRs",
    ],
    purpose:
      'Propósito: "Mantiene la planta hidratada y en un crecimiento estable."',
  },
  earth: {
    title: "Tierra 🌱 (Estabilidad y Crecimiento)",
    description:
      "Se usa para tareas fundamentales, repetitivas o que construyen un hábito.",
    examples: [
      "Rutina de ejercicio",
      "Ordenar escritorio",
      "Lavar/organizar",
      "Contabilidad/domésticos",
      "Repasar vocabulario",
      "Backup/limpieza sistema",
      "Hábitos diarios",
    ],
    purpose:
      'Propósito: "Proporciona una base sólida y nutrientes para un crecimiento sostenible."',
  },
  air: {
    title: "Aire 🌬️ (Libertad y Movimiento)",
    description:
      "Se usa para tareas que requieren claridad mental, comunicación o flexibilidad.",
    examples: [
      "Escribir correo importante",
      "Organizar ideas/Mindmap",
      "Aprender concepto nuevo",
      "Llamada breve/agenda",
      "Revisar roadmap",
      "Plan de estudio",
      "Documentar decisiones",
    ],
    purpose:
      'Propósito: "Le da a la planta el espacio para respirar y expandirse."',
  },
};

export default function TasksScreen() {
  const dispatch = useAppDispatch();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight?.() ?? 56;
  const fabOffset = tabBarHeight + insets.bottom + Spacing.large;
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

  const statusFilters = useMemo(() => {
    const counts = {
      pending: tasks.filter((t) => !t.completed && !t.isDeleted).length,
      completed: tasks.filter((t) => t.completed && !t.isDeleted).length,
      deleted: tasks.filter((t) => t.isDeleted).length,
    };
    return STATUS_FILTER_CONFIG.map((item) => ({
      ...item,
      count: counts[item.key] || 0,
    }));
  }, [tasks]);

  useEffect(() => {
    const hydrate = async () => {
      const stored = await getStoredTasks();
      const normalized = stored.map((t) => ({
        ...t,
        note: t.note ?? t.description ?? "",
        completed: t.done,
      }));
      
      // [MB] Cloud Sync
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const cloudData = await fetchUserData(session.user.id);
        if (cloudData?.tasks) {
          // Merge cloud tasks
          const merged = [...normalized];
          cloudData.tasks.forEach(cloudTask => {
             const idx = merged.findIndex(t => t.id === cloudTask.id);
             const localTask = {
                 ...cloudTask,
                 done: cloudTask.is_completed,
                 completed: cloudTask.is_completed,
                 completedAt: cloudTask.completed_at,
                 isDeleted: cloudTask.is_deleted,
                 note: cloudTask.description || "",
             };
             if (idx >= 0) {
                 merged[idx] = { ...merged[idx], ...localTask };
             } else {
                 merged.push(localTask);
             }
          });
          setTasks(merged);
          return;
        }
      }
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

  const fabGradientPreset = useMemo(() => {
    if (activeFilter === "completed") {
      return ElementAccents.gradients.gem;
    }
    if (activeFilter === "deleted") {
      return ElementAccents.gradients.tools;
    }
    switch (typeFilter) {
      case "habit":
        return ElementAccents.gradients.potions;
      case "single":
        return ElementAccents.gradients.tools;
      case "all":
      default:
        return ElementAccents.gradients.xp?.med;
    }
  }, [activeFilter, typeFilter]);

  const fabGradientColors = useMemo(() => {
    const base = fabGradientPreset?.colors;
    if (base && base.length >= 2) {
      return base;
    }
    return [Colors.primaryFantasy, Colors.secondary, Colors.accent];
  }, [fabGradientPreset]);
  const fabGradientLocations = fabGradientPreset?.locations;

  const syncTaskToCloud = async (task) => {
    console.log('[TasksScreen] syncTaskToCloud called for task:', task.id, task.title);
    const { data } = await supabase.auth.getUser();
    console.log('[TasksScreen] User from auth:', data?.user?.id);
    if (data?.user) {
      const newId = await pushTask(data.user.id, task);
      console.log('[TasksScreen] pushTask returned:', newId);
      // If pushTask returns a new UUID (different from task.id), update local state
      if (newId && newId !== task.id) {
        console.log('[TasksScreen] Updating task ID from', task.id, 'to', newId);
        setTasks((prev) => prev.map((t) => (t.id === task.id ? { ...t, id: newId } : t)));
      }
    }
  };

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
      timeEstimate: draft.timeEstimate || "medium", // Default: 1-2 horas
      subtasks: draft.subtasks || [],
      done: false,
      completed: false,
      isDeleted: false,
      createdAt: new Date().toISOString(),
      completedAt: null,
      // [MB] Ensure arrays are initialized
    };
    setTasks((prev) => [newTask, ...prev]);
    syncTaskToCloud(newTask);
  };

  const updateTask = (updated) => {
    const toSave = { 
      ...updated,
      tags: updated.tags || [],
      subtasks: updated.subtasks || [],
    };
    if (updated.note !== undefined) {
      toSave.description = updated.note;
    }
    setTasks((prev) =>
      prev.map((t) => (t.id === toSave.id ? { ...t, ...toSave } : t))
    );
    syncTaskToCloud(toSave);
  };

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTaskDone = (id) => {
    try {
      const target = tasks.find((t) => t.id === id);
      if (!target) {
        console.warn('[TasksScreen] toggleTaskDone: Task not found', id);
        return;
      }
      
      const newDone = !target.done;
      
      // Si está marcando como completada
      if (newDone) {
        // Verificar si puede completar (cooldown)
        const completionCheck = canCompleteTask(target);
        
        if (completionCheck.penalty) {
          // Mostrar advertencia de penalización
          alert(`⚠️ ${completionCheck.reason}\n\n¿Estás seguro de que quieres completarla ahora?`);
        }
        
        // Calcular cuántas tareas se completaron hoy
        const today = new Date().toISOString().split('T')[0];
        const tasksCompletedToday = (tasks || []).filter(t => 
          t && 
          t.completed && 
          t.completedAt && 
          typeof t.completedAt === 'string' &&
          t.completedAt.startsWith(today)
        ).length;
        
        // Calcular recompensas con el nuevo sistema
        const baseReward = calculateTaskReward(
          target,
          null, // plantElement - TODO: obtener del contexto
          false // isPro - TODO: obtener del contexto
        );
        
        const finalReward = calculateFinalReward(baseReward, {
          earlyCompletion: completionCheck.penalty || false,
          tasksCompletedToday: tasksCompletedToday,
          trustScore: 75, // TODO: obtener del contexto
          isPro: false, // TODO: obtener del contexto
        });
        
        // Actualizar tarea
        const updated = {
          ...target,
          done: newDone,
          completed: newDone,
          completedAt: new Date().toISOString(),
          isDeleted: false,
        };
        
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
        syncTaskToCloud(updated);
        
        // Aplicar recompensas
        dispatch({
          type: "APPLY_TASK_REWARD",
          payload: { 
            xpDelta: finalReward.xp || 0, 
            manaDelta: finalReward.mana || 0
          },
        });
        
        // Si ganó monedas, agregarlas
        if (finalReward.coin > 0) {
          dispatch({
            type: "ADD_COIN",
            payload: finalReward.coin,
          });
        }
        
        // Si ganó gemas, agregarlas
        if (finalReward.gem > 0) {
          dispatch({
            type: "ADD_GEM",
            payload: finalReward.gem,
          });
        }
        
        // Actualizar desafíos
        const priorityLabel =
          priorityOptions.find((p) => p.key === target.priority)?.label || "";
        dispatch({
          type: "UPDATE_DAILY_CHALLENGES_ON_TASK_DONE",
          payload: { priority: priorityLabel },
        });
        
        // Logro
        dispatch({
          type: "ACHIEVEMENT_EVENT",
          payload: { type: "task_done", payload: { priority: priorityLabel } },
        });
        
        // Mostrar mensaje de recompensas
        if (completionCheck.penalty) {
          console.log(`⚠️ Tarea completada antes de tiempo. Recompensas reducidas: +${finalReward.xp} XP`);
        } else {
          const rewardMsg = [];
          if (finalReward.mana > 0) rewardMsg.push(`+${finalReward.mana} Maná`);
          if (finalReward.coin > 0) rewardMsg.push(`+${finalReward.coin} Monedas`);
          if (finalReward.gem > 0) rewardMsg.push(`+${finalReward.gem} Gemas`);
          if (finalReward.xp > 0) rewardMsg.push(`+${finalReward.xp} XP`);
          
          if (rewardMsg.length > 0) {
            console.log(`✅ Tarea completada! ${rewardMsg.join(', ')}`);
          }
        }
      } else {
        // Desmarcar como completada
        const updated = {
          ...target,
          done: newDone,
          completed: newDone,
          completedAt: null,
          isDeleted: false,
        };
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
        syncTaskToCloud(updated);
      }
    } catch (error) {
      console.error('[TasksScreen] Error in toggleTaskDone:', error);
      console.error('[TasksScreen] Error stack:', error.stack);
      console.error('[TasksScreen] Task ID:', id);
      console.error('[TasksScreen] Tasks array length:', tasks?.length);
      alert(`Error al completar tarea: ${error.message}`);
    }
  };

  const onSoftDeleteTask = (id) => {
    const task = tasks.find(t => t.id === id);
    if (task) syncTaskToCloud({ ...task, isDeleted: true });
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, isDeleted: true } : t)));
  };

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
    () => [{ type: "filters", key: "filters" }, ...filteredTasks],
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
        keyExtractor={(item) => item.id || item.key}
        renderItem={({ item }) =>
          item.type === "filters" ? (
            <FiltersHeader
              statusFilters={statusFilters}
              activeFilter={activeFilter}
              onSelectFilter={setActiveFilter}
              searchQuery={searchQuery}
              onChangeSearch={setSearchQuery}
              onToggleAdvanced={() => setFiltersVisible(true)}
            />
          ) : (
            <TaskCard
              task={item}
              onToggleComplete={toggleTaskDone}
              onSoftDeleteTask={onSoftDeleteTask}
              onRestoreTask={onRestoreTask}
              onPermanentDeleteTask={onPermanentDeleteTask}
              onEditTask={onEditTask}
              onToggleSubtask={onToggleSubtask}
              activeFilter={activeFilter}
            />
          )
        }
        ListHeaderComponent={() => (
          <View style={{ marginBottom: Spacing.small }}>
            <StatsHeader />
          </View>
        )}
        stickyHeaderIndices={[1]}
        contentContainerStyle={[styles.content, { paddingBottom: fabOffset }]}
        ItemSeparatorComponent={() => (
          <View style={{ height: Spacing.small - Spacing.tiny / 2 }} />
        )}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        initialNumToRender={8}
        windowSize={11}
        contentInsetAdjustmentBehavior="automatic"
        extraData={{ tasks, activeFilter, searchQuery }}
        accessibilityRole="list"
      />

      <TouchableOpacity
        style={[styles.fabContainer, { bottom: fabOffset }]}
        onPress={onAddTask}
        accessibilityRole="button"
        accessibilityLabel="Agregar tarea"
      >
        <LinearGradient
          colors={fabGradientColors}
          locations={fabGradientLocations}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.fabGradient}
        >
          <FontAwesome name="plus" size={20} color={Colors.onAccent} />
        </LinearGradient>
      </TouchableOpacity>

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
