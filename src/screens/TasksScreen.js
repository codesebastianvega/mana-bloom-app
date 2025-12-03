// [MB] Modulo: Tasks / Seccion: Pantalla de tareas
// Afecta: TasksScreen (listado y gestion de tareas)
// Proposito: Listar, filtrar y guiar el uso de colores y recompensas
// Puntos de edicion futura: filtros avanzados y ayudas contextuales
// Autor: Codex - Fecha: 2025-10-20

import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Modal, View, Text, StatusBar, TouchableOpacity, Pressable, ScrollView, SectionList } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getTasks as getStoredTasks, setTasks as setStoredTasks } from "../storage";
import { supabase } from "../lib/supabase";
import { fetchUserData, pushTask } from "../lib/sync";
import { normalizeTasks } from "../utils/taskHelpers";

import TaskFilters from "../components/TaskFilters";
import TaskCard from "../components/TaskCard/TaskCard";
import SearchBar from "../components/SearchBar/SearchBar";
import styles from "./TasksScreen.styles";
import { Colors, Spacing, Gradients, ElementAccents } from "../theme";
import CreateTaskModal from "../components/CreateTaskModal/CreateTaskModal";
import { useAppDispatch } from "../state/AppContext";
import { XP_REWARD_BY_PRIORITY } from "../constants/rewards";
import { canCompleteTask, calculateFinalReward } from "../constants/taskIntegrity";
import { calculateTaskReward } from "../constants/economyConfig";
import { useHaptics } from "../hooks/useHaptics";

// â€”â€”â€” 1) ConfiguraciÃ³n de filtros â€”â€”â€”
const mainFilters = [
  { key: "all", label: "Todos", icon: "star", color: Colors.text },
  { key: "single", label: "Tareas", icon: "calendar", color: Colors.text },
  {
    key: "habit",
    label: "HÃ¡bitos",
    icon: "check-square",
    color: Colors.text,
  },
];

const MISSION_TABS = [
  { key: "all", label: "Todos" },
  { key: "single", label: "Tareas" },
  { key: "habit", label: "Hábitos" },
  { key: "quest", label: "Misiones" },
  { key: "ritual", label: "Rituales" },
  { key: "trash", label: "Papelera" },
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
    title: "Fuego ðŸ”¥ (Poder y PasiÃ³n)",
    description:
      "Se usa para tareas que requieren alta energÃ­a, urgencia o creatividad espontÃ¡nea.",
    examples: [
      "Enviar propuesta con deadline hoy",
      "Pitch rÃ¡pido/brainstorm",
      "Entrenamiento intenso",
      "Resolver bug crÃ­tico",
      "Grabar video/toma creativa",
      "Lanzar campaÃ±a",
      "Limpiar backlog urgente",
    ],
    purpose:
      'PropÃ³sito: "Inyecta poder y acelera el crecimiento de la planta."',
  },
  water: {
    title: "Agua ðŸ’§ (Calma y Flujo)",
    description:
      "Se usa para tareas que necesitan atenciÃ³n continua, concentraciÃ³n o un estado de calma.",
    examples: [
      "Planificar semana",
      "Leer/estudiar 30â€“60 min",
      "Redactar documento largo",
      "Procesar correos",
      "MeditaciÃ³n/respiraciÃ³n",
      "Refinar notas",
      "RevisiÃ³n tranquila de PRs",
    ],
    purpose:
      'PropÃ³sito: "Mantiene la planta hidratada y en un crecimiento estable."',
  },
  earth: {
    title: "Tierra ðŸŒ± (Estabilidad y Crecimiento)",
    description:
      "Se usa para tareas fundamentales, repetitivas o que construyen un hÃ¡bito.",
    examples: [
      "Rutina de ejercicio",
      "Ordenar escritorio",
      "Lavar/organizar",
      "Contabilidad/domÃ©sticos",
      "Repasar vocabulario",
      "Backup/limpieza sistema",
      "HÃ¡bitos diarios",
    ],
    purpose:
      'PropÃ³sito: "Proporciona una base sÃ³lida y nutrientes para un crecimiento sostenible."',
  },
  air: {
    title: "Aire ðŸŒ¬ï¸ (Libertad y Movimiento)",
    description:
      "Se usa para tareas que requieren claridad mental, comunicaciÃ³n o flexibilidad.",
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
      'PropÃ³sito: "Le da a la planta el espacio para respirar y expandirse."',
  },
};

export default function TasksScreen() {
  const dispatch = useAppDispatch();
  const haptics = useHaptics();
  const insets = useSafeAreaInsets();
  const tabBarHeight = useBottomTabBarHeight?.() ?? 56;
  const fabOffset = tabBarHeight + insets.bottom + Spacing.large;
  // â€”â€”â€” 2) Estados â€”â€”â€”
  const [tasks, setTasks] = useState([]);
  const uniqueTags = Array.from(new Set(tasks.flatMap((t) => t.tags || [])));
  const [typeFilter, setTypeFilter] = useState("all");
  const [elementFilter, setElementFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [activeFilter, setActiveFilter] = useState("pending");
  const [filtersVisible, setFiltersVisible] = useState(false); // BottomSheet de filtros
  const [showAddModal, setShowAddModal] = useState(false); // Para el botÃ³n de aÃ±adir tarea
  const [editingTask, setEditingTask] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const filtersApplied = useMemo(() => {
    return (
      typeFilter !== "all" ||
      elementFilter !== "all" ||
      priorityFilter !== "all" ||
      tagFilter !== "all" ||
      difficultyFilter !== "all" ||
      (searchQuery || "").trim().length > 0
    );
  }, [
    typeFilter,
    elementFilter,
    priorityFilter,
    tagFilter,
    difficultyFilter,
    searchQuery,
  ]);

  const resetFilters = useCallback(() => {
    setTypeFilter("all");
    setElementFilter("all");
    setPriorityFilter("all");
    setTagFilter("all");
    setDifficultyFilter("all");
    setSearchQuery("");
    setActiveFilter("pending");
    setFiltersVisible(false);
  }, []);

  const renderEmptyState = useCallback(() => {
    const title = filtersApplied
      ? "Sin tareas con estos filtros"
      : "Aún no tienes tareas";
    const subtitle = filtersApplied
      ? "Ajusta los filtros o limpia la búsqueda para ver más tareas."
      : "Crea tu primera tarea para empezar a cultivar tu jardín productivo.";
    const ctaLabel = filtersApplied ? "Limpiar filtros" : "Crear tarea";
    const onPress =
      filtersApplied ? resetFilters : () => setShowAddModal(true);
    return (
      <View style={styles.emptyState}>
        <View style={styles.emptyCard}>
          <Text style={styles.emptyTitle}>{title}</Text>
          <Text style={styles.emptySubtitle}>{subtitle}</Text>
          <TouchableOpacity
            style={styles.emptyButton}
            onPress={onPress}
            accessibilityRole="button"
          >
            <Text style={styles.emptyButtonText}>{ctaLabel}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }, [filtersApplied, resetFilters]);

  // Habits: actualizar racha/missed al hidratar
  const refreshHabitStates = useCallback((list = []) => {
    const todayMidnight = new Date();
    todayMidnight.setHours(0, 0, 0, 0);
    return list.map((t) => {
      if (t.type !== "habit") return t;
      const lastDone = t.lastDoneDate ? new Date(t.lastDoneDate) : null;
      const lastRef = lastDone || (t.createdAt ? new Date(t.createdAt) : todayMidnight);
      lastRef.setHours(0, 0, 0, 0);
      const diffDays = Math.floor((todayMidnight - lastRef) / (1000 * 60 * 60 * 24));
      let missed = t.missedDaysInARow || 0;
      if (diffDays > 0 && !t.completed) {
        missed = missed + diffDays;
      }
      const isDead = missed >= 3 || t.isDead;
      return {
        ...t,
        missedDaysInARow: missed,
        isDead,
      };
    });
  }, []);

  useEffect(() => {
    const hydrate = async () => {
      const stored = await getStoredTasks();
      const normalized = normalizeTasks(
        stored.map((t) => ({
          ...t,
          note: t.note ?? t.description ?? "",
          completed: t.done,
        }))
      );
      
      // [MB] Cloud Sync
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const cloudData = await fetchUserData(session.user.id);
        if (Array.isArray(cloudData?.tasks)) {
          // Merge cloud tasks
          const merged = [...normalized];
          cloudData.tasks.forEach((cloudTask) => {
            const idx = merged.findIndex((t) => t.id === cloudTask.id);
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
          setTasks(normalizeTasks(merged));
          return;
        }
      }
      setTasks(refreshHabitStates(purgeCemetery(normalizeTasks(normalized))));
    };
    hydrate();
  }, []);

  useEffect(() => {
    setStoredTasks(tasks);
  }, [tasks]);

  const difficultyOptions = [
    { key: "easy", label: "FÃ¡cil", color: Colors.secondary },
    { key: "medium", label: "Medio", color: Colors.accent },
    { key: "hard", label: "DifÃ­cil", color: Colors.danger },
  ];

  const activeMissionsCount = useMemo(
    () => tasks.filter((t) => !t.done && !t.isDeleted).length,
    [tasks]
  );

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
      
      // Si estÃ¡ marcando como completada
      if (newDone) {
        // Verificar si puede completar (cooldown)
        const completionCheck = canCompleteTask(target);
        
        if (completionCheck.penalty) {
          // Mostrar advertencia de penalizaciÃ³n
          alert(`âš ï¸ ${completionCheck.reason}\n\nÂ¿EstÃ¡s seguro de que quieres completarla ahora?`);
        }
        
        // Calcular cuÃ¡ntas tareas se completaron hoy
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
        const habitFields =
          target.type === "habit"
            ? {
                currentStreak: (target.currentStreak || target.streak || 0) + 1,
                missedDaysInARow: 0,
                lastDoneDate: new Date().toISOString(),
                isDead: false,
              }
            : {};

        const updated = {
          ...target,
          done: newDone,
          completed: newDone,
          completedAt: new Date().toISOString(),
          isDeleted: false,
          ...habitFields,
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
        
        // Si ganÃ³ monedas, agregarlas
        if (finalReward.coin > 0) {
          dispatch({
            type: "ADD_COIN",
            payload: finalReward.coin,
          });
        }
        
        // Si ganÃ³ gemas, agregarlas
        if (finalReward.gem > 0) {
          dispatch({
            type: "ADD_GEM",
            payload: finalReward.gem,
          });
        }
        
        // Actualizar desafÃ­os
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
        haptics.success();

        // Mostrar mensaje de recompensas
        if (completionCheck.penalty) {
          console.log(`âš ï¸ Tarea completada antes de tiempo. Recompensas reducidas: +${finalReward.xp} XP`);
        } else {
          const rewardMsg = [];
          if (finalReward.mana > 0) rewardMsg.push(`+${finalReward.mana} ManÃ¡`);
          if (finalReward.coin > 0) rewardMsg.push(`+${finalReward.coin} Monedas`);
          if (finalReward.gem > 0) rewardMsg.push(`+${finalReward.gem} Gemas`);
          if (finalReward.xp > 0) rewardMsg.push(`+${finalReward.xp} XP`);
          
          if (rewardMsg.length > 0) {
            console.log(`âœ… Tarea completada! ${rewardMsg.join(', ')}`);
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
      prev.map((t) => {
        if (t.id !== id) return t;
        if (t.type === "habit" && t.isDead) {
          return {
            ...t,
            isDead: false,
            currentStreak: 0,
            missedDaysInARow: 0,
            done: false,
            completed: false,
            completedAt: null,
            isDeleted: false,
          };
        }
        return { ...t, isDeleted: false, done: false, completed: false, completedAt: null };
      })
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

  const purgeCemetery = (list = []) => {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 7);
    return list.filter((t) => {
      const completedAt = t.completedAt ? new Date(t.completedAt) : null;
      const deletedAt = t.deletedAt ? new Date(t.deletedAt) : null;
      const deathDate = completedAt || deletedAt;
      if (!deathDate) return true;
      return deathDate >= cutoff;
    });
  };

  const handleStartFocus = (task) => {
    // TODO: Navegar a pantalla de foco real
    console.log("Iniciar foco para:", task.title);
  };

  const handleTagPress = (tag) => {
    setTagFilter(tag === tagFilter ? "all" : tag);
  };

  const handleAddSubtask = (taskId, subtaskText) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id !== taskId) return t;
        const newSubtask = {
          id: Date.now().toString(),
          text: subtaskText,
          completed: false,
        };
        return {
          ...t,
          subtasks: [...(t.subtasks || []), newSubtask],
        };
      })
    );
  };

  // â€”â€”â€” 4) Filtrado combinado â€”â€”â€”
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
      const typeOK =
        typeFilter === "all" ||
        typeFilter === "trash" ||
        task.type === typeFilter;
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

  const filteredTaskStats = useMemo(() => {
    const typeFiltered = tasks.filter((t) => {
      const matchesType =
        typeFilter === "all" ||
        (typeFilter === "trash" ? t.isDeleted : t.type === typeFilter);
      const notDeleted = typeFilter === "trash" ? t.isDeleted : !t.isDeleted;
      return matchesType && notDeleted;
    });
    const total = typeFiltered.length;
    const completed = typeFiltered.filter((t) => t.completed).length;
    return { total, completed };
  }, [tasks, typeFilter]);

  const dailyProgress =
    filteredTaskStats.total > 0
      ? Math.min(filteredTaskStats.completed / filteredTaskStats.total, 1)
      : 0;

  // 4.1 Mapa vivo (secciones calculadas)
  const parseDueDays = useCallback((due) => {
    if (!due) return null;
    const map = {
      "Hoy": 0,
      "Manana": 1,
      "En 3 dias": 3,
      "En 5 dias": 5,
      "En 10 dias": 10,
      "En 15 dias": 15,
      "En 20 dias": 20,
      "En 30 dias": 30,
      "Fin de semana": 2,
      "Prox. Semana": 7,
    };
    return map[due] ?? null;
  }, []);

  const daysSince = (dateStr) => {
    if (!dateStr) return 0;
    const created = new Date(dateStr);
    const now = new Date();
    return Math.floor((now - created) / (1000 * 60 * 60 * 24));
  };

  const groupedSections = useMemo(() => {
    const q = (searchQuery || "").toLowerCase().trim();
    const keywords = q.split(/\s+/).filter(Boolean);
    let derivedType = typeFilter;
    let derivedPriority = priorityFilter;
    let derivedDifficulty = difficultyFilter;

    keywords.forEach((word) => {
      if (["habito", "habito", "hábito", "habit", "habitos"].includes(word)) {
        derivedType = "habit";
      }
      if (["tarea", "tareas", "task"].includes(word)) {
        derivedType = "single";
      }
      if (["urgente", "alta"].includes(word)) {
        derivedPriority = "hard";
      }
      if (["media", "normal"].includes(word)) {
        derivedPriority = "medium";
      }
      if (["baja", "easy", "facil", "fácil"].includes(word)) {
        derivedPriority = "easy";
      }
      if (["facil", "fácil", "easy"].includes(word)) {
        derivedDifficulty = "easy";
      }
      if (["medio", "media", "normal"].includes(word)) {
        derivedDifficulty = "medium";
      }
      if (["dificil", "difícil", "hard"].includes(word)) {
        derivedDifficulty = "hard";
      }
      if (["epico", "épico", "legendary"].includes(word)) {
        derivedDifficulty = "legendary";
      }
      if (["agua", "water"].includes(word)) elementFilter === "all" && (derivedType = derivedType); // no-op to appease linter
    });

    const effectiveType = derivedType;
    const effectivePriority = derivedPriority;
    const effectiveDifficulty = derivedDifficulty;

    const filtered = tasks.filter((task) => {
      const txt = `${task.title || ""} ${task.note || ""}`.toLowerCase();
      const textOK = !q || txt.includes(q);
      const typeOK =
        effectiveType === "all" ||
        (effectiveType === "trash" ? task.isDeleted : task.type === effectiveType);
      const elementOK = elementFilter === "all" || task.element === elementFilter;
      const prioOK = effectivePriority === "all" || task.priority === effectivePriority;
      const diffOK = effectiveDifficulty === "all" || task.difficulty === effectiveDifficulty;
      const tagOK = tagFilter === "all" || (task.tags || []).includes(tagFilter);

      return textOK && typeOK && elementOK && prioOK && diffOK && tagOK;
    });

    const bosses = [];
    const calm = [];
    const secondary = [];
    const habits = [];
    const cemetery = [];

    (filtered || []).forEach((task) => {
      const type = task.type || "single";
      const isCompleted = task.completed || task.done;
      const isDeleted = task.isDeleted;
      const isHabitDead = type === "habit" && task.isDead;

      if (isCompleted || isDeleted || isHabitDead) {
        cemetery.push(task);
        return;
      }

      if (type === "habit") {
        habits.push(task);
        return;
      }

      const dueDays = parseDueDays(task.dueDate);
      const age = daysSince(task.createdAt);
      const priority = task.priority || "medium";
      const difficulty = task.difficulty || "medium";

      const isBoss =
        (dueDays !== null && dueDays <= 0) ||
        age >= 7 ||
        priority === "hard" ||
        difficulty === "hard" ||
        difficulty === "legendary";

      const isSecondary =
        priority === "easy" ||
        (dueDays === null && (difficulty === "easy" || difficulty === "low"));

      if (isBoss) {
        bosses.push(task);
      } else if (isSecondary) {
        secondary.push(task);
      } else {
        calm.push(task);
      }
    });

    const sections = [
      { key: "bosses", title: "Jefes de Mazmorra", helper: "Vencidas, viejas o muy urgentes/difíciles.", data: bosses },
      { key: "calm", title: "Misiones Tranquilas", helper: "Backlog sano con fechas futuras o reciente.", data: calm },
      { key: "secondary", title: "Tareas Secundarias", helper: "Opcionales o prioridad baja.", data: secondary },
      { key: "habits", title: "Hábitos Activos", helper: "Compromisos recurrentes en curso.", data: habits },
      { key: "cemetery", title: "Cementerio", helper: "Completadas, eliminadas o hábitos muertos.", data: cemetery },
    ];

    return sections.filter((s) => s.data.length > 0);
  }, [tasks, parseDueDays]);

  const activeTabLabel =
    MISSION_TABS.find((tab) => tab.key === typeFilter)?.label?.toLowerCase() ||
    "misiones";

  const applyAlpha = (hex = "", alpha = 0.2) => {
    if (!hex || typeof hex !== "string" || !hex.startsWith("#")) return hex;
    const base = hex.replace("#", "");
    if (base.length !== 6) return hex;
    const a = Math.round(alpha * 255)
      .toString(16)
      .padStart(2, "0");
    return `#${base}${a}`;
  };

  const SECTION_META = {
    bosses: { icon: "fire", color: Colors.elementFire, title: "Jefes de Zona" },
    calm: { icon: "leaf", color: Colors.elementWater, title: "Misiones Tranquilas" },
    secondary: { icon: "tag", color: Colors.textMuted, title: "Tareas Secundarias" },
    habits: { icon: "refresh", color: Colors.elementAir, title: "Hábitos Activos" },
    cemetery: { icon: "trash", color: Colors.danger, title: "Cementerio" },
  };

  // â€”â€”â€” 5) Render â€”â€”â€”
  const safeTopInset = Math.max(insets.top - Spacing.xlarge, 0);

  return (
    <SafeAreaView style={[styles.container, { paddingTop: safeTopInset }]}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />

      <View style={styles.missionHeaderWrapper}>
        <View style={styles.missionHeaderTop}>
          <View>
            <Text style={styles.missionTitle}>Libro de Misiones</Text>
            <Text style={styles.missionSubtitle}>
              {activeMissionsCount} encargos activos
            </Text>
          </View>
          <View style={styles.missionHeaderActions}>
            <TouchableOpacity
              style={styles.missionActionButton}
              accessibilityRole="button"
              accessibilityLabel="Abrir ajustes de misiones"
            >
              <MaterialCommunityIcons
                name="cog-outline"
                size={16}
                color={Colors.text}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.missionActionButton}
              accessibilityRole="button"
              accessibilityLabel="Más opciones"
            >
              <MaterialCommunityIcons
                name="dots-horizontal"
                size={18}
                color={Colors.text}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchRow}>
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
            onToggleAdvanced={() => setFiltersVisible(true)}
            placeholder="Buscar encantamientos..."
          />
        </View>
        <LinearGradient
          colors={["rgba(54,58,77,0.85)", "rgba(29,31,44,0.85)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.progressCard}
        >
          <View style={styles.progressCardInner}>
            <View style={styles.progressHeader}>
              <Text style={styles.progressLabel}>Progreso diario</Text>
              <Text style={styles.progressPercent}>
                {Math.round(dailyProgress * 100)}%
              </Text>
            </View>
            <View style={styles.progressBar}>
              <LinearGradient
                colors={[Colors.secondary, Colors.elementWater]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={[
                  styles.progressFill,
                  { width: `${dailyProgress * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressFootnote}>
              {filteredTaskStats.total > 0
                ? `${filteredTaskStats.completed} de ${filteredTaskStats.total} ${activeTabLabel} completadas`
                : `Sin ${activeTabLabel} en este filtro`}
            </Text>
          </View>
        </LinearGradient>
      </View>

      <SectionList
        sections={groupedSections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onToggleComplete={toggleTaskDone}
            onSoftDeleteTask={onSoftDeleteTask}
            onRestoreTask={onRestoreTask}
            onPermanentDeleteTask={onPermanentDeleteTask}
            onEditTask={onEditTask}
            onToggleSubtask={onToggleSubtask}
            activeFilter={activeFilter}
            onStartFocus={handleStartFocus}
            onTagPress={handleTagPress}
            onAddSubtask={handleAddSubtask}
          />
        )}
        renderSectionHeader={({ section }) => {
          const meta = SECTION_META[section.key] || {};
          return (
            <View style={styles.sectionHeader}>
              <View
                style={[
                  styles.sectionIconWrap,
                  {
                    backgroundColor: applyAlpha(meta.color || Colors.primary, 0.16),
                    borderColor: applyAlpha(meta.color || Colors.primary, 0.45),
                  },
                ]}
              >
                <FontAwesome
                  name={meta.icon || "bookmark"}
                  size={12}
                  color={meta.color || Colors.text}
                />
              </View>
              <View style={styles.sectionHeaderTextWrap}>
                <Text style={styles.sectionTitle}>
                  {meta.title || section.title}
                </Text>
                {section.helper ? (
                  <Text style={styles.sectionSubtitle}>{section.helper}</Text>
                ) : null}
              </View>
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeText}>{section.data.length}</Text>
              </View>
            </View>
          );
        }}
        contentContainerStyle={[styles.content, { paddingBottom: fabOffset }]}
        ItemSeparatorComponent={() => (
          <View style={{ height: Spacing.small - Spacing.tiny / 2 }} />
        )}
        SectionSeparatorComponent={() => <View style={{ height: Spacing.base }} />}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false}
        initialNumToRender={8}
        windowSize={11}
        ListEmptyComponent={renderEmptyState}
        contentInsetAdjustmentBehavior="automatic"
        extraData={{ tasks, groupedSections }}
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
                setActiveFilter(active === "trash" ? "deleted" : "pending");
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








