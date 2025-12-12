// [MB] M�dulo: Planta / Secci�n: Pantalla principal
// Afecta: PlantScreen
// Prop�sito: orquestar header mejorado, hero y tarjetas de balance
// Puntos de edici�n futura: enlazar datos reales y persistencia global
// Autor: Codex - Fecha: 2025-11-13

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { ScrollView, AccessibilityInfo, View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import PlantHero from "../components/plant/PlantHero";
import PlantHeader from "../components/plant/PlantHeader";
import QuickActions from "../components/plant/QuickActions";
import BuffsBar from "../components/plant/BuffsBar";
import InventorySheet from "../components/plant/InventorySheet";
import CreateTaskModal from "../components/CreateTaskModal/CreateTaskModal";
import GuidedBreathModal from "../components/plant/GuidedBreathModal";
import HydrateModal from "../components/plant/HydrateModal";
import StretchModal from "../components/plant/StretchModal";
import SunlightModal from "../components/plant/SunlightModal";
import VisualizeModal from "../components/plant/VisualizeModal";
import JournalModal from "../components/plant/JournalModal";
import GratitudeModal from "../components/plant/GratitudeModal";
import RestEyesModal from "../components/plant/RestEyesModal";
import {
  getTasks,
  setTasks,
  getHydrationState,
  setHydrationState,
  getVisualizeDraft as loadVisualizeDraft,
  setVisualizeDraft as persistVisualizeDraft,
  getJournalDraft as loadJournalDraft,
  setJournalDraft as persistJournalDraft,
  addJournalEntry,
  addVisualizeEntry,
} from "../storage";
// import PlantHeader from "../components/plant/PlantHeader";
import ScreenSection from "../components/ui/ScreenSection";
import SectionHeader from "../components/ui/SectionHeader";
import ElementBalance from "../components/plant/ElementBalance";
import { Colors, Spacing } from "../theme";
import { ACTION_MECHANICS } from "../components/plant/actionMechanics";
import styles from "./PlantScreen.styles";
import { useActiveBuffs, useAppState, useAppDispatch } from "../state/AppContext";
import { supabase } from "../lib/supabase";
import { pushJournalEntry, updateDailyMetrics } from "../lib/sync";
import StickyHeader from "../components/navigation/StickyHeader";

const RITUAL_ACTIONS = [
  "meditate",
  "hydrate",
  "stretch",
  "sunlight",
  "visualize",
  "journal",
  "gratitude",
  "restEyes",
];
const RITUAL_ACTION_SET = new Set(RITUAL_ACTIONS);
const RITUAL_LABELS = {
  meditate: "Meditando",
  hydrate: "Hidratándome",
  stretch: "Estirando",
  sunlight: "Cargando luz",
  visualize: "Visualizando",
  journal: "Escribiendo",
  gratitude: "Agradeciendo",
  restEyes: "Descansando ojos",
};

const ELEMENT_KEY_MAP = {
  fire: "fire",
  water: "water",
  earth: "earth",
  air: "wind",
  wind: "wind",
};

const HERO_SPRITE = require("../../assets/plants/bonsai.png");

const ElementAccents = {
  neutral: Colors.surfaceAlt,
  water: Colors.elementWater,
  spirit: Colors.secondaryFantasy,
  mana: Colors.primaryFantasy,
};

const BUFF_PRESETS = {
  xp_double: { title: "Poción Sabiduría", emoji: "🧪" },
  default: { title: "Potenciador activo", emoji: "✨" },
};

function formatDurationShort(ms = 0) {
  if (!ms) return "En curso";
  const minutes = Math.max(1, Math.round(ms / 60000));
  if (minutes >= 60) {
    const hours = Math.floor(minutes / 60);
    const rem = minutes % 60;
    if (rem === 0) return `${hours}h`;
    return `${hours}h ${rem}m`;
  }
  return `${minutes}m`;
}

const PLANT_ACTION_LABELS = {
  water: "Regar",
  feed: "Alimentar",
  clean: "Limpiar",
  prune: "Podar",
  light: "Luz directa",
  mist: "Neblina",
  search: "Buscar plagas",
};

const PLANT_ACTION_ICONS = {
  water: "tint",
  feed: "seedling",
  clean: "broom",
  prune: "cut",
  light: "sun",
  mist: "cloud",
  search: "bug",
};

const PLANT_ACTION_ACCENTS = {
  water: Colors.elementWater,
  feed: Colors.elementEarth,
  clean: Colors.primary,
  prune: Colors.secondary,
  light: Colors.elementFire,
  mist: Colors.elementAir,
  search: Colors.ritualJournal,
};

const INITIAL_CARE_METRICS = {
  water: 0.82,
  light: 0.64,
  nutrients: 0.7,
  mood: 0.9,
  purity: 0.76,
  temperature: 0.58,
  focus: 0.88,
};

const METRIC_EFFECT_MAP = {
  hydrate: { water: 0.08, mood: 0.02 },
  stretch: { focus: 0.05, temperature: 0.02 },
  sunlight: { light: 0.08, mood: 0.01 },
  visualize: { focus: 0.03, mood: 0.02 },
  journal: { focus: 0.02, mood: 0.03 },
  gratitude: { mood: 0.04, purity: 0.02 },
  restEyes: { focus: 0.04 },
  meditate: { mood: 0.05, purity: 0.03 },
  water: { water: 0.12 },
  feed: { nutrients: 0.1 },
  clean: { purity: 0.08 },
  prune: { purity: 0.05, focus: 0.02 },
  light: { light: 0.1 },
  mist: { temperature: 0.04, purity: 0.03 },
  search: { purity: 0.06, focus: 0.01 },
};

// [MB] TODO: Al conectar datos reales, ajustar estos umbrales y origen para que provengan de AppContext/backend.
const CARE_SUGGESTION_RULES = [
  { key: "water", metric: "water", threshold: 0.65, label: PLANT_ACTION_LABELS.water },
  { key: "feed", metric: "nutrients", threshold: 0.7, label: PLANT_ACTION_LABELS.feed },
  { key: "clean", metric: "purity", threshold: 0.85, label: PLANT_ACTION_LABELS.clean },
  { key: "light", metric: "light", threshold: 0.7, label: PLANT_ACTION_LABELS.light },
  { key: "mist", metric: "temperature", threshold: 0.65, label: PLANT_ACTION_LABELS.mist },
  { key: "prune", metric: "focus", threshold: 0.8, label: PLANT_ACTION_LABELS.prune },
  { key: "search", metric: "purity", threshold: 0.7, label: PLANT_ACTION_LABELS.search },
];

const GARDENER_ICONS = {
  water: "💧",
  feed: "🌱",
  clean: "🧹",
  prune: "✂️",
  light: "☀️",
  mist: "💨",
  search: "🔍",
  meditate: "🧘",
  hydrate: "💦",
  stretch: "🌀",
  sunlight: "🌞",
  visualize: "🌈",
  journal: "📝",
  gratitude: "💛",
  restEyes: "😴",
  default: "✨",
};

export default function PlantScreen() {
  const { mana, wallet, inventory } = useAppState();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  
  const [plantName, setPlantName] = useState("Mi Planta");
  const [invOpen, setInvOpen] = useState(false);
  const [equippedSkinId, setEquippedSkinId] = useState("s1"); // Default
  const [selectedSkinId, setSelectedSkinId] = useState();
  const [gardenerExpanded, setGardenerExpanded] = useState(false);
  
  // [MB] Derived Economy from AppContext
  const economy = { mana, coins: wallet.coin, gems: wallet.gem };

  const [streakDays, setStreakDays] = useState(3);
  const [txn, setTxn] = useState(null);
  const [insufficient, setInsufficient] = useState(null);
  
  // [MB] Skins from Inventory (Mock + Real)
  // We merge default skins with inventory items of category 'skin'
  const defaultSkins = [
    { id: "s1", name: "Maceta Rústica", rarity: "common", owned: true, equipped: true, accentKey: "neutral", thumb: "??" },
    { id: "s2", name: "Arcana Azul", rarity: "rare", owned: true, accentKey: "water", thumb: "??" },
  ];
  // TODO: Map inventory items to skins if we have them. For now using defaults + inventory check?
  // For Phase 3, we stick to defaults until Shop is ready.
  const skins = defaultSkins; 

  const [ritualStatus, setRitualStatus] = useState(() =>
    RITUAL_ACTIONS.reduce((acc, key) => {
      acc[key] = false;
      return acc;
    }, {})
  );
  const [availableTags, setAvailableTags] = useState([]);
  const [elementStats, setElementStats] = useState(DEFAULT_ELEMENT_STATS);
  const [actionCooldowns, setActionCooldowns] = useState({});
  const cooldownTimersRef = useRef({});
  const [snoozedSuggestionKey, setSnoozedSuggestionKey] = useState(null);
  const [actionStatus, setActionStatus] = useState(null);
  const [breathModalVisible, setBreathModalVisible] = useState(false);
  const [pendingBreathAction, setPendingBreathAction] = useState(null);
  const [hydrateModalVisible, setHydrateModalVisible] = useState(false);
  const [hydrateCount, setHydrateCount] = useState(0);
  const [stretchModalVisible, setStretchModalVisible] = useState(false);
  const [sunlightModalVisible, setSunlightModalVisible] = useState(false);
  const [visualizeModalVisible, setVisualizeModalVisible] = useState(false);
  const [visualizeDraft, setVisualizeDraft] = useState("");
  const [journalModalVisible, setJournalModalVisible] = useState(false);
  const [journalDraft, setJournalDraft] = useState("");
  const [gratitudeModalVisible, setGratitudeModalVisible] = useState(false);
  const [restEyesModalVisible, setRestEyesModalVisible] = useState(false);
  const [careMetrics, setCareMetrics] = useState({ ...INITIAL_CARE_METRICS });
  const activeBuffs = useActiveBuffs();
const HYDRATE_GOAL = 8;
  const launchGratitudeModal = () => setGratitudeModalVisible(true);
  const closeGratitudeModal = () => setGratitudeModalVisible(false);
  const handleGratitudeComplete = () => {
    const executed = handleAction("gratitude");
    if (!executed) return;
    setGratitudeModalVisible(false);
  };
  const launchRestEyesModal = () => setRestEyesModalVisible(true);
  const closeRestEyesModal = () => setRestEyesModalVisible(false);
  const handleRestEyesComplete = () => {
    const executed = handleAction("restEyes");
    if (!executed) return;
    setRestEyesModalVisible(false);
  };

  // [MB] Mock data for PlantHeader
  const etaText = "faltan ~3 tareas";
  const missionText = "";
  const xpProgress = 0.62;
  const climateInfo = { location: "Zipaquira, COL", tempC: 24, status: "Soleado" };
  const agendaItems = [
    { id: "ag1", timeLabel: "08:00", label: "Regar ligero", impact: "+10% hidratación" },
    { id: "ag2", timeLabel: "14:00", label: "Revisar luz", impact: "Mantén 20 min de sol" },
    { id: "ag3", timeLabel: "21:00", label: "Respirar profundo", impact: "Activa rituales" },
  ];
  
  const activeRitualKeys = RITUAL_ACTIONS.filter((key) => ritualStatus[key]);
  const ritualActiveCount = activeRitualKeys.length;
  const ritualCompletion = ritualActiveCount / RITUAL_ACTIONS.length;
  const ritualTags = activeRitualKeys.map((key) => ({
    key,
    label: RITUAL_LABELS[key] || key,
  }));
  
  const careMetricChips = useMemo(
    () => [
      { key: "water", label: "Humedad", value: careMetrics.water },
      { key: "light", label: "Luz", value: careMetrics.light },
      { key: "nutrients", label: "Nutrientes", value: careMetrics.nutrients },
      { key: "purity", label: "Pureza", value: careMetrics.purity },
    ],
    [careMetrics]
  );
  
  const plantHealth =
    Object.values(careMetrics).reduce((sum, value) => sum + (value ?? 0), 0) /
    Object.keys(careMetrics).length;
  const plantHealthPercent = Math.round(Math.max(0, Math.min(1, plantHealth)) * 100);
  const stageLabel = "Floreciente";
  const wellbeingMetricChips = useMemo(
    () => [
      { key: "mood", label: "Ánimo", value: careMetrics.mood },
      { key: "temperature", label: "Temperatura", value: careMetrics.temperature },
      { key: "rituals", label: "Rituales", value: ritualCompletion },
      { key: "focus", label: "Focus", value: careMetrics.focus },
    ],
    [careMetrics, ritualCompletion]
  );

  // [MB] Helper functions
  const getTodayKey = () => new Date().toISOString().split("T")[0];
  
  const equippedSkin = skins.find((s) => s.id === equippedSkinId);
  const skinAccent = equippedSkin ? ElementAccents[equippedSkin.accentKey] : undefined;

  const applyMetricEffects = React.useCallback((actionKey) => {
    const deltas = METRIC_EFFECT_MAP[actionKey];
    if (!deltas) return;
    setCareMetrics((prev) => {
      const next = { ...prev };
      Object.entries(deltas).forEach(([metric, delta]) => {
        if (typeof delta !== "number") return;
        const current = next[metric] ?? 0;
        next[metric] = Math.max(0, Math.min(1, current + delta));
      });
      return next;
    });
  }, []);

  const registerActionCooldown = (key) => {
    const mechanic = ACTION_MECHANICS[key];
    const cooldownMin = mechanic?.cooldownMin;
    if (!cooldownMin || cooldownMin <= 0) {
      setActionCooldowns((prev) => {
        if (prev[key]) {
          const next = { ...prev };
          next[key] = 0;
          return next;
        }
        return prev;
      });
      return 0;
    }
    const ms = Math.max(0, Math.floor(cooldownMin * 60 * 1000));
    setActionCooldowns((prev) => ({ ...prev, [key]: ms }));
    if (cooldownTimersRef.current[key]) {
      clearTimeout(cooldownTimersRef.current[key]);
    }
    cooldownTimersRef.current[key] = setTimeout(() => {
      setActionCooldowns((prev) => ({ ...prev, [key]: 0 }));
      cooldownTimersRef.current[key] = null;
      setSnoozedSuggestionKey((prev) => (prev === key ? null : prev));
    }, ms);
    return ms;
  };

  const ACTION_COSTS = {
    water: { mana: 20 },
    feed: { coins: 120 },
    clean: { coins: 0 },
    prune: {},
    light: {},
    mist: {},
    search: {},
    meditate: { mana: 10 },
  };

  const formatResourceLabel = (resource) =>
    resource === "mana" ? "Maná" : resource === "coins" ? "Monedas" : "Diamantes";

  function handleAction(key) {
    const costs = ACTION_COSTS[key] || {};
    const hasCost = Object.keys(costs).length > 0;
    if (hasCost) {
      const lacks = Object.entries(costs).find(
        ([res, amt]) => (economy[res] ?? 0) < amt
      );
      if (lacks) {
        const [res] = lacks;
        setInsufficient({ id: String(Date.now()), resource: res });
        AccessibilityInfo.announceForAccessibility?.(
          "Saldo insuficiente de " + formatResourceLabel(res)
        );
        return false;
      }
      Object.entries(costs).forEach(([res, amt]) => {
        if (amt > 0) {
          if (res === 'mana') dispatch({ type: "PURCHASE_WITH_MANA", payload: amt });
          if (res === 'coins') dispatch({ type: "SPEND_COIN", payload: amt });
          if (res === 'gems') dispatch({ type: "SPEND_GEM", payload: amt });
        }
      });
      const resKey = Object.keys(costs)[0];
      setTxn({ id: String(Date.now()), resource: resKey, amount: -1 * (costs[resKey] || 0) });
      AccessibilityInfo.announceForAccessibility?.(
        `Gastaste ${costs[resKey]} ${formatResourceLabel(resKey)}, saldo ${economy[resKey] - costs[resKey]}`
      );
    }
    if (RITUAL_ACTION_SET.has(key)) {
      setRitualStatus((prev) => {
        if (prev[key]) return prev;
        return { ...prev, [key]: true };
      });
    }
    const cooldownMs = registerActionCooldown(key);
    const suggestionKey = careSuggestion?.key;
    if (suggestionKey === key && cooldownMs > 0) {
      setSnoozedSuggestionKey(key);
    }
    applyMetricEffects(key);
    const actionLabel = PLANT_ACTION_LABELS[key] || ACTION_MECHANICS[key]?.title || "Acción";
    const statusMessage =
      cooldownMs > 0
        ? `${actionLabel} activada, quedan ${formatCooldownLabel(cooldownMs)}`
        : `${actionLabel} activada`;
    setActionStatus({ id: String(Date.now()), message: statusMessage });
    return true;
  }

  // [MB] useEffects for hydration and cleanup
  // Reload tasks whenever the screen is focused
  useFocusEffect(
    useCallback(() => {
      const loadTasksAndTags = async () => {
        try {
          const stored = await getTasks();
          const safeTasks = stored || [];
          setElementStats(computeElementStatsFromTasks(safeTasks));
          const tagSet = new Set();
          safeTasks.forEach((task) => {
            if (task && Array.isArray(task.tags)) {
              task.tags.forEach((tag) => tagSet.add(tag));
            }
          });
          setAvailableTags(Array.from(tagSet));
        } catch (e) {
          console.warn("[MB] No se pudieron cargar tareas para PlantScreen", e);
          console.error("[MB] Error details:", e.message, e.stack);
        }
      };
      loadTasksAndTags();
    }, [])
  );

  useEffect(() => {
    const loadRitualPersistence = async () => {
      try {
        const today = getTodayKey();
        const hydration = await getHydrationState();
        if (hydration?.date === today) {
          setHydrateCount(Number(hydration.count) || 0);
        } else {
          await setHydrationState({ date: today, count: 0 });
          setHydrateCount(0);
        }
        const vizDraft = await loadVisualizeDraft();
        if (typeof vizDraft === "string") {
          setVisualizeDraft(vizDraft);
        }
        const journalDraftValue = await loadJournalDraft();
        if (typeof journalDraftValue === "string") {
          setJournalDraft(journalDraftValue);
        }
      } catch (error) {
        console.warn("[MB] No se pudieron cargar estados de rituales", error);
      }
    };
    loadRitualPersistence();
  }, []);

  useEffect(() => {
    return () => {
      Object.values(cooldownTimersRef.current).forEach((timer) => {
        if (timer) {
          clearTimeout(timer);
        }
      });
    };
  }, []);

  useEffect(() => {
    if (txn || insufficient || actionStatus) {
      const id = setTimeout(() => {
        setTxn(null);
        setInsufficient(null);
        setActionStatus(null);
      }, 1800);
      return () => clearTimeout(id);
    }
  }, [txn, insufficient, actionStatus]);

  const careSuggestion = useMemo(() => deriveCareSuggestion(careMetrics), [careMetrics]);
  const suggestionKey = careSuggestion?.key;
  const gardenerHeadline = careSuggestion
    ? `Sugerencia: ${
        PLANT_ACTION_LABELS[careSuggestion.key] ||
        careSuggestion.label ||
        "acciones clave"
      }`
    : "Todo equilibrado, sigue cuidando tu jardin.";
  const gardenTips = useMemo(() => {
    const tips = [];
    if (careSuggestion) {
      const label =
        PLANT_ACTION_LABELS[careSuggestion.key] || careSuggestion.label || "Accion sugerida";
      tips.push({
        id: "care",
        icon: GARDENER_ICONS[careSuggestion.key] || GARDENER_ICONS.default,
        title: label,
        detail: "Activa esta accion para estabilizar tus metricas.",
      });
    }
    if (hydrateCount < HYDRATE_GOAL) {
      tips.push({
        id: "hydrate",
        icon: "💧",
        title: "Riego pendiente",
        detail: `Te faltan ${HYDRATE_GOAL - hydrateCount} vasos para completar el ritual.`,
      });
    }
    if (ritualActiveCount === 0) {
      tips.push({
        id: "rituals",
        icon: "🧘",
        title: "Ritual veloz",
        detail: "Activa un ritual ligero para animar a tu planta.",
      });
    }
    if (climateInfo?.status || climateInfo?.tempC) {
      tips.push({
        id: "climate",
        icon: "☀️",
        title: climateInfo?.status ? `Clima ${climateInfo.status}` : "Clima estable",
        detail: `${climateInfo?.tempC ?? "--"} C en ${climateInfo?.location || "tu zona"}`,
      });
    }
    return tips.slice(0, 3);
  }, [careSuggestion, hydrateCount, ritualActiveCount, climateInfo]);

  useEffect(() => {
    if (snoozedSuggestionKey && snoozedSuggestionKey !== suggestionKey) {
      setSnoozedSuggestionKey(null);
    }
  }, [snoozedSuggestionKey, suggestionKey]);

  // [MB] Modal handlers
  const handleSaveTaskFromPlant = async (draft) => {
    try {
      const stored = await getTasks();
      const newTask = {
        id: Date.now().toString(),
        title: draft.title,
        description: draft.note || "",
        note: draft.note || "",
        priority: draft.priority || "easy",
        type: draft.type || "single",
        element: draft.element || "all",
        tags: draft.tags || [],
        difficulty: draft.difficulty || "easy",
        subtasks: (draft.subtasks || []).map((st, index) => ({
          id: st.id ?? index + 1,
          text: st.text,
          completed: st.completed || false,
        })),
        done: false,
        completed: false,
        isDeleted: false,
        createdAt: new Date().toISOString(),
        completedAt: null,
      };
      const updatedTasks = [newTask, ...(stored || [])];
      await setTasks(updatedTasks);
      setElementStats(computeElementStatsFromTasks(updatedTasks));
      setAvailableTags((prev) => {
        const tagSet = new Set(prev);
        (draft.tags || []).forEach((tag) => tagSet.add(tag));
        return Array.from(tagSet);
      });
      setTaskModalVisible(false);
      AccessibilityInfo.announceForAccessibility?.("Tarea guardada en tu lista");
    } catch (error) {
      console.warn("[MB] Error guardando tarea desde PlantScreen", error);
      AccessibilityInfo.announceForAccessibility?.("No se pudo guardar la tarea");
    }
  };

  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [taskModalElement, setTaskModalElement] = useState("all");

  const handleSelectElement = (key) => {
    const mapped = ELEMENT_FILTER_MAP[key] || "all";
    setTaskModalElement(mapped);
    setTaskModalVisible(true);
  };

  const triggerActionKey = (targetKey) => {
    if (!targetKey) return;
    if (targetKey === "meditate") {
      launchBreathModal();
      return;
    }
    if (targetKey === "hydrate") {
      launchHydrateModal();
      return;
    }
    if (targetKey === "stretch") {
      launchStretchModal();
      return;
    }
    if (targetKey === "sunlight") {
      launchSunlightModal();
      return;
    }
    if (targetKey === "visualize") {
      launchVisualizeModal();
      return;
    }
    if (targetKey === "journal") {
      launchJournalModal();
      return;
    }
    if (targetKey === "gratitude") {
      launchGratitudeModal();
      return;
    }
    if (targetKey === "restEyes") {
      launchRestEyesModal();
      return;
    }
    handleAction(targetKey);
  };

  const handleOpenInventoryFromHero = () => {
    setSelectedSkinId(equippedSkinId);
    setInvOpen(true);
  };
  const handleOpenMagicShop = useCallback(() => {
    navigation.navigate("ShopScreen", { initialTab: "pets" });
  }, [navigation]);

  const launchBreathModal = () => {
    setPendingBreathAction("meditate");
    setBreathModalVisible(true);
  };

  const closeBreathModal = () => {
    setBreathModalVisible(false);
    setPendingBreathAction(null);
  };

  const handleBreathComplete = () => {
    if (pendingBreathAction) {
      const executed = handleAction(pendingBreathAction);
      if (!executed) {
        return;
      }
    }
    setPendingBreathAction(null);
    setBreathModalVisible(false);
  };

  const launchHydrateModal = () => setHydrateModalVisible(true);
  const closeHydrateModal = () => setHydrateModalVisible(false);
  
  const handleHydrateIncrement = () => {
    setHydrateCount((prev) => {
      const next = Math.min(HYDRATE_GOAL, prev + 1);
      setHydrationState({ date: getTodayKey(), count: next });
      
      // [MB] Cloud Sync
      supabase.auth.getUser().then(({ data }) => {
         if (data?.user) updateDailyMetrics(data.user.id, { hydration_count: next });
      });
      
      return next;
    });
  };

  const handleHydrateComplete = () => {
    if (hydrateCount < HYDRATE_GOAL) return;
    const executed = handleAction("hydrate");
    if (!executed) return;
    setHydrateCount(0);
    setHydrateModalVisible(false);
    setHydrationState({ date: getTodayKey(), count: 0, completedAt: new Date().toISOString() });
  };

  const launchStretchModal = () => setStretchModalVisible(true);
  const closeStretchModal = () => setStretchModalVisible(false);
  const handleStretchComplete = () => {
    const executed = handleAction("stretch");
    if (!executed) return;
    setStretchModalVisible(false);
  };

  const launchSunlightModal = () => setSunlightModalVisible(true);
  const closeSunlightModal = () => setSunlightModalVisible(false);
  const handleSunlightComplete = () => {
    const executed = handleAction("sunlight");
    if (!executed) return;
    setSunlightModalVisible(false);
  };

  const launchVisualizeModal = () => setVisualizeModalVisible(true);
  const closeVisualizeModal = () => setVisualizeModalVisible(false);
  
  const handleVisualizeComplete = (text) => {
    const executed = handleAction("visualize");
    if (!executed) return;
    setVisualizeDraft("");
    persistVisualizeDraft("");
    const entry = { id: Date.now().toString(), text, createdAt: new Date().toISOString() };
    addVisualizeEntry(entry);
    
    // [MB] Cloud Sync
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) pushJournalEntry(data.user.id, { ...entry, type: 'visualize' });
    });
    
    setVisualizeModalVisible(false);
  };

  const handleSaveVisualizeDraft = (draft) => {
    setVisualizeDraft(draft);
    persistVisualizeDraft(draft || "");
  };

  const launchJournalModal = () => setJournalModalVisible(true);
  const closeJournalModal = () => setJournalModalVisible(false);
  
  const handleJournalComplete = (data) => {
    const executed = handleAction("journal");
    if (!executed) return;
    const entry = { ...data, id: Date.now().toString(), createdAt: new Date().toISOString() };
    addJournalEntry(entry);
    setJournalDraft("");
    persistJournalDraft("");
    
    // [MB] Cloud Sync
    supabase.auth.getUser().then(({ data }) => {
      if (data?.user) pushJournalEntry(data.user.id, { ...entry, type: 'journal' });
    });
    
    setJournalModalVisible(false);
  };

  const handleJournalDraftChange = (value) => {
    setJournalDraft(value);
    persistJournalDraft(value || "");
  };

  const toastMessage = insufficient
    ? `Saldo insuficiente de ${formatResourceLabel(insufficient?.resource)}`
    : actionStatus?.message
    ? actionStatus.message
    : txn
    ? `Gasto: ${txn.amount < 0 ? Math.abs(txn.amount) : txn.amount} ${formatResourceLabel(
        txn.resource
      )}`
    : null;

  return (
    <SafeAreaView style={styles.container}>
      {toastMessage ? (
        <View style={[styles.actionToastContainer, { top: Spacing.base }]}>
          <View style={styles.actionToastCard} accessibilityLiveRegion="polite">
            <View style={styles.actionToastContent}>
              <View style={styles.actionToastDot} />
              <Text style={styles.actionToastText}>{toastMessage}</Text>
            </View>
          </View>
        </View>
      ) : null}
      <ScrollView
        contentContainerStyle={styles.content}
        importantForAccessibility={invOpen ? "no-hide-descendants" : "auto"}
        stickyHeaderIndices={[0]}
      >
        <StickyHeader />
        <View style={styles.contentInner}>
        <View style={styles.plantCard}>
          <LinearGradient
            colors={["rgba(42,33,64,0.95)", "rgba(19,15,32,0.9)"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.plantCardInner}
          >
            <View style={styles.plantCardTop}>
              <View style={styles.plantCardTitleRow}>
                <View style={styles.plantTitleGroup}>
                  <Text style={styles.plantName}>{plantName || "Ernesto"}</Text>
                  <Text style={styles.plantStage}>
                    Etapa <Text style={styles.plantStageAccent}>{stageLabel}</Text>
                  </Text>
                </View>
              </View>
              <Text style={styles.plantStreakChip}>🔥 Racha {streakDays} dias</Text>
            </View>

            <View style={styles.plantInfoRow}>
              <View style={styles.plantInfoTile}>
                <Text style={styles.plantInfoLabel}>☀️ Clima actual</Text>
                <Text style={styles.plantInfoValue}>{climateInfo?.tempC ?? "--"} C</Text>
                <Text style={styles.plantInfoCaption}>
                  {climateInfo?.status || "Clima estable"}
                </Text>
                <Text style={styles.plantInfoMeta}>{climateInfo?.location || "Sin ubicacion"}</Text>
              </View>
              <View style={styles.plantInfoTile}>
                <Text style={styles.plantInfoLabel}>🌿 Vitalidad</Text>
                <Text style={styles.plantInfoValue}>{plantHealthPercent}%</Text>
                <Text style={styles.plantInfoCaption}>Salud general</Text>
                <Text style={styles.plantInfoMeta}>Actualiza tus cuidados</Text>
              </View>
            </View>

            <View style={styles.gardenIntroRow}>
              <View style={styles.gardenTitleGroup}>
                <Text style={styles.gardenTitle}>Consejos del jardinero</Text>
                <Text style={styles.gardenSubtitle}>{gardenerHeadline}</Text>
              </View>
              <View style={styles.gardenProChip}>
                <Text style={styles.gardenProText}>PRO</Text>
              </View>
            </View>
            <View style={styles.gardenCard}>
              <View style={styles.gardenHeaderRow}>
                <View style={styles.gardenTitleGroup}>
                  <Text style={styles.gardenTitle}>Plan del dia</Text>
                  <Text style={styles.gardenSubtitle}>Tips generados por IA</Text>
                </View>
                <View style={styles.gardenHeaderRight}>
                  <Pressable
                    style={styles.gardenToggleWrap}
                    onPress={() => setGardenerExpanded((prev) => !prev)}
                    accessibilityRole="button"
                    accessibilityLabel={
                      gardenerExpanded
                        ? "Ocultar consejos del jardinero"
                        : "Mostrar consejos del jardinero"
                    }
                  >
                    <Text style={styles.gardenToggleLabel}>
                      {gardenerExpanded ? "Ocultar" : "Ver tips"}
                    </Text>
                    <Text style={styles.gardenToggleIcon}>{gardenerExpanded ? "▴" : "▾"}</Text>
                  </Pressable>
                </View>
              </View>
              {gardenerExpanded ? (
                <View style={styles.gardenTips}>
                  {gardenTips.map((tip) => (
                    <View key={tip.id} style={styles.gardenTipRow}>
                      <Text style={styles.gardenTipIcon}>{tip.icon}</Text>
                      <View style={styles.gardenTipCopy}>
                        <Text style={styles.gardenItemTextStrong}>{tip.title}</Text>
                        {tip.detail ? (
                          <Text style={styles.gardenItemTextMuted}>{tip.detail}</Text>
                        ) : null}
                      </View>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          </LinearGradient>
        </View>

        <View style={styles.heroEdgeSection}>
          <View style={styles.heroHeaderRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroSectionTitle}>Signos</Text>
              <Text style={styles.heroSectionCopy}>
                Monitorea humedad, luz, nutrientes y pureza para mantenerla estable.
              </Text>
            </View>
          </View>
          <PlantHero
            source={HERO_SPRITE}
            health={plantHealth}
            mood="floreciente"
            stage="brote"
            skinAccent={skinAccent}
            showAura={false}
            size="lg"
            careMetrics={careMetricChips}
            wellbeingMetrics={wellbeingMetricChips}
            climateInfo={climateInfo}
            stageProgress={{ stage: "brote", progress: xpProgress, etaText }}
          />
        </View>
        <QuickActions
          canWater
          canFeed
          canClean
          canPrune
          canLight
          canMist
          canSearch
          canMeditate
          economy={economy}
          cooldowns={actionCooldowns}
          onAction={(key) => {
            if (key === "meditate") {
              launchBreathModal();
              return false;
            }
            if (key === "hydrate") {
              launchHydrateModal();
              return false;
            }
            if (key === "stretch") {
              launchStretchModal();
              return false;
            }
            if (key === "sunlight") {
              launchSunlightModal();
              return false;
            }
            if (key === "visualize") {
              launchVisualizeModal();
              return false;
            }
            if (key === "journal") {
              launchJournalModal();
              return false;
            }
            if (key === "gratitude") {
              launchGratitudeModal();
              return false;
            }
            if (key === "restEyes") {
              launchRestEyesModal();
              return false;
            }
            const executed = handleAction(key);
            if (!executed) return false;
            return true;
          }}
        />
        <View style={styles.elementBalanceSection}>
          <SectionHeader title="Balance elemental" />
          <ElementBalance values={elementStats} onSelectElement={handleSelectElement} />
        </View>
        {/* BuffsBar omitido en esta tarjeta para asemejar captura base
        <BuffsBar 
          buffs={[
            { id: "b1", title: "XP", icon: "?", multiplier: 1.2, timeRemainingMs: 120000, accentKey: "xp" },
            { id: "b2", title: "Man�", icon: "??", multiplier: 1.1, timeRemainingMs: 45000, accentKey: "mana" },
            { id: "b3", title: "Protecci�n", icon: "???", multiplier: 1.0, timeRemainingMs: 300000, accentKey: "shield" },
          ]}
          onExpire={(id) => console.log("[MB] buff expirado:", id)}
          contentContainerStyle={{ gap: Spacing.base }}
        />
        */}
        {/*<ScreenSection>
          <SectionHeader title="Acciones r�pidas" />
          <QuickActions
            canWater
            canFeed
            canClean
            canMeditate
            cooldowns={{ water: 0, feed: 0, clean: 0, meditate: 0 }}
            onAction={(key) => {
              if (key === "clean") {
                setSelectedSkinId(equippedSkinId);
                setInvOpen(true);
                return;
              }
              handleAction(key);
            }}
          />
        </ScreenSection>*/}
        </View>
      </ScrollView>
      <InventorySheet
        visible={invOpen}
        skins={skins.map((s) => ({ ...s, equipped: s.id === equippedSkinId }))}
        selectedId={selectedSkinId}
        equippedId={equippedSkinId}
        onClose={() => setInvOpen(false)}
        onSelect={(id) => setSelectedSkinId(id)}
        onEquip={(id) => {
          setEquippedSkinId(id);
          setSkins((prev) => prev.map((s) => ({ ...s, equipped: s.id === id })));
          setInvOpen(false);
        }}
        onBuy={(id) => console.log("[MB] compra mock", id)}
      />
      <CreateTaskModal
        visible={taskModalVisible}
        onClose={() => setTaskModalVisible(false)}
        onSave={handleSaveTaskFromPlant}
        uniqueTags={availableTags}
        priorityOptions={PRIORITY_OPTIONS}
        elementOptions={ELEMENT_OPTIONS}
        difficultyOptions={DIFFICULTY_OPTIONS}
        initialElement={taskModalElement}
      />
      <GuidedBreathModal
        visible={breathModalVisible}
        onClose={closeBreathModal}
        onComplete={handleBreathComplete}
      />
      <HydrateModal
        visible={hydrateModalVisible}
        goal={HYDRATE_GOAL}
        count={hydrateCount}
        onIncrement={handleHydrateIncrement}
        onComplete={handleHydrateComplete}
        onClose={closeHydrateModal}
      />
      <StretchModal
        visible={stretchModalVisible}
        onClose={closeStretchModal}
        onComplete={handleStretchComplete}
      />
      <SunlightModal
        visible={sunlightModalVisible}
        onClose={closeSunlightModal}
        onComplete={handleSunlightComplete}
        climateHint={climateInfo?.hint}
      />
      <VisualizeModal
        visible={visualizeModalVisible}
        onClose={closeVisualizeModal}
        onComplete={handleVisualizeComplete}
        onSaveDraft={handleSaveVisualizeDraft}
        initialDraft={visualizeDraft}
      />
      <JournalModal
        visible={journalModalVisible}
        onClose={closeJournalModal}
        onSave={handleJournalComplete}
        initialValue={journalDraft}
        onDraftChange={handleJournalDraftChange}
      />
      <GratitudeModal
        visible={gratitudeModalVisible}
        onClose={closeGratitudeModal}
        onComplete={handleGratitudeComplete}
      />
      <RestEyesModal
        visible={restEyesModalVisible}
        onClose={closeRestEyesModal}
        onComplete={handleRestEyesComplete}
      />
    </SafeAreaView>
  );
}

function computeElementStatsFromTasks(tasks = []) {
  const counts = createEmptyElementCounts();
  (tasks || []).forEach((task) => {
    if (!task || task.isDeleted) {
      return;
    }
    const mapped = ELEMENT_KEY_MAP[task.element];
    if (!mapped || !counts[mapped]) {
      return;
    }
    const isHabit = (task.type || "single") === "habit";
    const bucket = counts[mapped];
    bucket[isHabit ? "habits" : "tasks"] += 1;
  });
  const total = Object.values(counts).reduce(
    (sum, bucket) => sum + bucket.tasks + bucket.habits,
    0
  );
  if (!total) {
    const defaults = createDefaultElementStats();
    defaults.counts = counts;
    return defaults;
  }
  const stats = { counts };
  Object.entries(counts).forEach(([key, bucket]) => {
    const bucketTotal = bucket.tasks + bucket.habits;
    stats[key] = bucketTotal / total;
  });
  return stats;
}

function createEmptyElementCounts() {
  return {
    fire: { tasks: 0, habits: 0 },
    water: { tasks: 0, habits: 0 },
    earth: { tasks: 0, habits: 0 },
    wind: { tasks: 0, habits: 0 },
  };
}

function createDefaultElementStats() {
  return {
    fire: 0.25,
    water: 0.25,
    earth: 0.25,
    wind: 0.25,
    counts: createEmptyElementCounts(),
  };
}

function formatCooldownLabel(ms = 0) {
  if (!ms) {
    return "Listo";
  }
  const totalMinutes = Math.max(1, Math.round(ms / 60000));
  if (totalMinutes >= 60) {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    if (minutes === 0) {
      return `${hours}h`;
    }
    return `${hours}h ${minutes}m`;
  }
  return `${totalMinutes}m`;
}

function deriveCareSuggestion(metrics = {}) {
  for (const rule of CARE_SUGGESTION_RULES) {
    const value = metrics[rule.metric];
    if (typeof value === "number" && value < rule.threshold) {
      return rule;
    }
  }
  return CARE_SUGGESTION_RULES[CARE_SUGGESTION_RULES.length - 1];
}

const ELEMENT_FILTER_MAP = {
  fire: "fire",
  water: "water",
  earth: "earth",
  wind: "air",
};

const DEFAULT_ELEMENT_STATS = createDefaultElementStats();

const ELEMENT_OPTIONS = [
  { key: "water", label: "Agua", color: Colors.elementWater },
  { key: "fire", label: "Fuego", color: Colors.elementFire },
  { key: "earth", label: "Tierra", color: Colors.elementEarth },
  { key: "air", label: "Aire", color: Colors.elementAir },
];

const PRIORITY_OPTIONS = [
  { key: "easy", label: "Tranquila", color: Colors.secondary },
  { key: "medium", label: "Normal", color: Colors.accent },
  { key: "hard", label: "Urgente", color: Colors.danger },
];

const DIFFICULTY_OPTIONS = [
  { key: "easy", label: "F�cil" },
  { key: "medium", label: "Media" },
  { key: "hard", label: "Dif�cil" },
];



