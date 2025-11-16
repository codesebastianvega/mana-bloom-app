// [MB] M�dulo: Planta / Secci�n: Pantalla principal
// Afecta: PlantScreen
// Prop�sito: orquestar header mejorado, hero y tarjetas de balance
// Puntos de edici�n futura: enlazar datos reales y persistencia global
// Autor: Codex - Fecha: 2025-11-13

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ScrollView, AccessibilityInfo, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import PlantHero from "../components/plant/PlantHero";
import PlantSectionCard from "../components/plant/PlantSectionCard";
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
import PlantProgressCard from "../components/plant/PlantProgressCard";
import { Colors, Spacing } from "../theme";
import { ACTION_MECHANICS } from "../components/plant/actionMechanics";
import styles from "./PlantScreen.styles";

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
  hydrate: "Hidrat�ndome",
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
};

const HERO_SPRITE = require("../../assets/matureplant.png");

const ElementAccents = {
  neutral: Colors.surfaceAlt,
  water: Colors.elementWater,
  spirit: Colors.secondaryFantasy,
  mana: Colors.primaryFantasy,
};

const PLANT_ACTION_LABELS = {
  water: "Regar",
  feed: "Alimentar",
  clean: "Limpiar",
  prune: "Podar",
  light: "Luz directa",
  mist: "Neblina",
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
};

// [MB] TODO: Al conectar datos reales, ajustar estos umbrales y origen para que provengan de AppContext/backend.
const CARE_SUGGESTION_RULES = [
  { key: "water", metric: "water", threshold: 0.6, label: PLANT_ACTION_LABELS.water },
  { key: "feed", metric: "nutrients", threshold: 0.65, label: PLANT_ACTION_LABELS.feed },
  { key: "clean", metric: "purity", threshold: 0.85, label: PLANT_ACTION_LABELS.clean },
];

export default function PlantScreen() {
  const [plantName, setPlantName] = useState("Mi Planta");
  const [invOpen, setInvOpen] = useState(false);
  const [equippedSkinId, setEquippedSkinId] = useState();
  const [selectedSkinId, setSelectedSkinId] = useState();
  const [economy, setEconomy] = useState({ mana: 140, coins: 850, gems: 12 });
  const [streakDays, setStreakDays] = useState(3);
  const [txn, setTxn] = useState(null);
  const [insufficient, setInsufficient] = useState(null);
  const [skins, setSkins] = useState([
    { id: "s1", name: "Maceta R�stica", rarity: "common", owned: true, equipped: true, accentKey: "neutral", thumb: "??" },
    { id: "s2", name: "Arcana Azul", rarity: "rare", owned: true, accentKey: "water", thumb: "??" },
    { id: "s3", name: "Esencia Et�rea", rarity: "epic", owned: false, accentKey: "spirit", cost: { currency: "diamonds", amount: 120 }, thumb: "??" },
    { id: "s4", name: "Coraz�n de Man�", rarity: "legendary", owned: false, accentKey: "mana", cost: { currency: "coins", amount: 2400 }, thumb: "??" },
  ]);
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
const HYDRATE_GOAL = 8;

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
const getTodayKey = () => new Date().toISOString().split("T")[0];

  const equippedSkin = skins.find((s) => s.id === equippedSkinId);
  const skinAccent = equippedSkin ? ElementAccents[equippedSkin.accentKey] : undefined;

  const etaText = "faltan ~3 tareas";
  const missionText = "Hoy fortalecemos ra�ces y descanso";
  const xpProgress = 0.62; // Por ahora fijo para maqueta
  const climateInfo = { location: "Zipaquir�, COL", tempC: 24 };
  const agendaItems = [
    { id: "ag1", timeLabel: "08:00", label: "Regar ligero", impact: "+10% hidrataci�n" },
    { id: "ag2", timeLabel: "14:00", label: "Revisar luz", impact: "Mant�n 20 min de sol" },
    { id: "ag3", timeLabel: "21:00", label: "Respirar profundo", impact: "Activa rituales" },
  ];
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [taskModalElement, setTaskModalElement] = useState("all");
  const activeRitualKeys = RITUAL_ACTIONS.filter((key) => ritualStatus[key]);
  const ritualActiveCount = activeRitualKeys.length;
  const ritualCompletion = ritualActiveCount / RITUAL_ACTIONS.length;
  const ritualTags = activeRitualKeys.map((key) => RITUAL_LABELS[key] || key);
  // [MB] M�tricas mock: hasta conectar AppContext + clima usamos datos ficticios
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
  const wellbeingMetricChips = useMemo(
    () => [
      { key: "mood", label: "�nimo", value: careMetrics.mood },
      { key: "temperature", label: "Temperatura", value: careMetrics.temperature },
      { key: "rituals", label: "Rituales", value: ritualCompletion },
      { key: "focus", label: "Focus", value: careMetrics.focus },
    ],
    [careMetrics, ritualCompletion]
  );
  const handleSelectElement = (key) => {
    const mapped = ELEMENT_FILTER_MAP[key] || "all";
    setTaskModalElement(mapped);
    setTaskModalVisible(true);
  };

  useEffect(() => {
    const loadTasksAndTags = async () => {
      try {
        const stored = await getTasks();
        const safeTasks = stored || [];
        setElementStats(computeElementStatsFromTasks(safeTasks));
        const tagSet = new Set();
        safeTasks.forEach((task) => (task.tags || []).forEach((tag) => tagSet.add(tag)));
        setAvailableTags(Array.from(tagSet));
      } catch (e) {
        console.warn("[MB] No se pudieron cargar tareas para PlantScreen", e);
      }
    };
    loadTasksAndTags();
  }, []);

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

  // Auto-ocultar toasts breves
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
  const suggestionLabel = careSuggestion?.label || PLANT_ACTION_LABELS.clean;
  const suggestionCooldownMs = suggestionKey ? actionCooldowns[suggestionKey] || 0 : 0;
  const suggestionCompleted =
    Boolean(snoozedSuggestionKey === suggestionKey) || suggestionCooldownMs > 0;

  useEffect(() => {
    if (snoozedSuggestionKey && snoozedSuggestionKey !== suggestionKey) {
      setSnoozedSuggestionKey(null);
    }
  }, [snoozedSuggestionKey, suggestionKey]);

  // [MB] Costos mock por acci�n (solo UI)
  const ACTION_COSTS = {
    water: { mana: 20 },
    feed: { coins: 120 },
    clean: { coins: 0 },
    prune: {},
    light: {},
    mist: {},
    meditate: { mana: 10 },
  };
  const formatResourceLabel = (resource) =>
    resource === "mana" ? "Man�" : resource === "coins" ? "Monedas" : "Diamantes";

  // [MB] Handler central de acciones
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
      const next = { ...economy };
      Object.entries(costs).forEach(([res, amt]) => {
        next[res] -= amt || 0;
      });
      setEconomy(next);
      const resKey = Object.keys(costs)[0];
      setTxn({ id: String(Date.now()), resource: resKey, amount: -1 * (costs[resKey] || 0) });
      AccessibilityInfo.announceForAccessibility?.(
        `Gastaste ${costs[resKey]} ${formatResourceLabel(resKey)}, saldo ${next[resKey]}`
      );
    }
    if (RITUAL_ACTION_SET.has(key)) {
      setRitualStatus((prev) => {
        if (prev[key]) return prev;
        return { ...prev, [key]: true };
      });
    }
    const cooldownMs = registerActionCooldown(key);
    if (suggestionKey === key && cooldownMs > 0) {
      setSnoozedSuggestionKey(key);
    }
    applyMetricEffects(key);
    const actionLabel = PLANT_ACTION_LABELS[key] || ACTION_MECHANICS[key]?.title || "Acci�n";
    const statusMessage =
      cooldownMs > 0
        ? `${actionLabel} activada, quedan ${formatCooldownLabel(cooldownMs)}`
        : `${actionLabel} activada`;
    setActionStatus({ id: String(Date.now()), message: statusMessage });
    return true;
  }

  const launchBreathModal = () => {
    setPendingBreathAction("meditate");
    setBreathModalVisible(true);
  };

  const handleSuggestedAction = () => {
    if (!suggestionKey || suggestionCompleted) return;
    if (suggestionKey === "meditate") {
      launchBreathModal();
      return;
    }
    if (suggestionKey === "hydrate") {
      launchHydrateModal();
      return;
    }
    if (suggestionKey === "stretch") {
      launchStretchModal();
      return;
    }
    if (suggestionKey === "sunlight") {
      launchSunlightModal();
      return;
    }
    if (suggestionKey === "visualize") {
      launchVisualizeModal();
      return;
    }
    if (suggestionKey === "journal") {
      launchJournalModal();
      return;
    }
    if (suggestionKey === "gratitude") {
      launchGratitudeModal();
      return;
    }
    if (suggestionKey === "restEyes") {
      launchRestEyesModal();
      return;
    }
    handleAction(suggestionKey);
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
    addVisualizeEntry({ id: Date.now().toString(), text, createdAt: new Date().toISOString() });
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
    addJournalEntry({ ...data });
    setJournalDraft("");
    persistJournalDraft("");
    setJournalModalVisible(false);
  };
  const handleJournalDraftChange = (value) => {
    setJournalDraft(value);
    persistJournalDraft(value || "");
  };
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
      >
        <PlantHeader
          name={plantName}
          onRename={(next) => setPlantName(next)}
          streakDays={streakDays}
          mission={missionText}
          stageLabel={`Etapa: Brote � ${etaText}`}
          ritualTargets={`${ritualActiveCount} / ${RITUAL_ACTIONS.length} rituales`}
          agendaItems={agendaItems}
          climateInfo={{ ...climateInfo, hint: "Clima templado, aprovecha para tareas de luz" }}
        />
        <PlantProgressCard
          stage="brote"
          progress={xpProgress}
          etaText={etaText}
          suggestedAction={suggestionLabel}
          onPressAction={handleSuggestedAction}
          actionCtaLabel="Activar"
          actionCompleted={suggestionCompleted}
          actionCompletedLabel={
            suggestionCompleted
              ? `En cooldown (${formatCooldownLabel(suggestionCooldownMs)})`
              : undefined
          }
        />
        <PlantSectionCard style={{ gap: Spacing.base }}>
          <Text style={styles.heroSectionTitle}>Cuidado activo de la planta</Text>
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
            ritualSummary={{ active: ritualActiveCount, total: RITUAL_ACTIONS.length, tags: ritualTags }}
            climateInfo={climateInfo}
          />
          <QuickActions
            canWater
            canFeed
            canClean
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
              if (key === "clean") {
                setSelectedSkinId(equippedSkinId);
                setInvOpen(true);
              }
              return true;
            }}
          />
        </PlantSectionCard>
        <ScreenSection>
          <SectionHeader title="Balance elemental" />
          <ElementBalance
            values={elementStats}
            onSelectElement={handleSelectElement}
          />
        </ScreenSection>
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
  const counts = { fire: 0, water: 0, earth: 0, wind: 0 };
  tasks.forEach((task) => {
    const mapped = ELEMENT_KEY_MAP[task?.element];
    if (mapped && counts[mapped] !== undefined) {
      counts[mapped] += 1;
    }
  });
  const total = Object.values(counts).reduce((sum, val) => sum + val, 0);
  if (!total) {
    return { ...DEFAULT_ELEMENT_STATS };
  }
  const stats = {};
  Object.keys(counts).forEach((key) => {
    stats[key] = counts[key] / total;
  });
  return stats;
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

const DEFAULT_ELEMENT_STATS = {
  fire: 0.25,
  water: 0.25,
  earth: 0.25,
  wind: 0.25,
};

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
