// [MB] Módulo: Planta / Sección: Pantalla principal
// Afecta: PlantScreen
// Propósito: demo del hero de planta con métricas y acciones rápidas
// Puntos de edición futura: añadir header real y contenidos extra
// Autor: Codex - Fecha: 2025-08-16

import React, { useEffect, useRef, useState } from "react";
import { SafeAreaView, ScrollView, AccessibilityInfo, View, Text, TextInput, Pressable, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import PlantHero from "../components/plant/PlantHero";
import PlantSectionCard from "../components/plant/PlantSectionCard";
import CareMetrics from "../components/plant/CareMetrics";
import QuickActions from "../components/plant/QuickActions";
import GrowthProgress from "../components/plant/GrowthProgress";
import BuffsBar from "../components/plant/BuffsBar";
import InventorySheet from "../components/plant/InventorySheet";
// import PlantHeader from "../components/plant/PlantHeader";
import ScreenSection from "../components/ui/ScreenSection";
import SectionHeader from "../components/ui/SectionHeader";
import { Colors, Spacing, Radii, Gradients } from "../theme";
import styles from "./PlantScreen.styles";

// Ensure header component is defined before use to avoid ReferenceError
function PlantStatusHeader({ name, onRename, economy, streakDays, progress = 0, stage = "semilla", etaText }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  useEffect(() => setDraft(name), [name]);

  const percent = Math.min(100, Math.max(0, Math.round(progress * 100)));
  const shimmer = useRef(new Animated.Value(0)).current;
  const prev = useRef(progress);
  useEffect(() => {
    if (progress > (prev.current ?? 0)) {
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 0.3, duration: 180, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 420, useNativeDriver: true }),
      ]).start();
    }
    prev.current = progress;
  }, [progress, shimmer]);

  const stages = [
    { key: "semilla", label: "Semilla", icon: "egg" },
    { key: "brote", label: "Brote", icon: "seedling" },
    { key: "joven", label: "Joven", icon: "leaf" },
    { key: "madura", label: "Madura", icon: "tree" },
  ];

  return (
    <View style={headerStyles.card}>
      <View style={headerStyles.topRow}>
        <View style={headerStyles.nameRow}>
          {isEditing ? (
            <TextInput
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={() => { setIsEditing(false); onRename?.(draft.trim()); }}
              onBlur={() => { setIsEditing(false); onRename?.(draft.trim()); }}
              style={headerStyles.nameInput}
              maxLength={40}
              autoFocus
              placeholder="Nombre de la planta"
              placeholderTextColor={Colors.textMuted}
            />
          ) : (
            <>
              <Text style={headerStyles.name} numberOfLines={1}>{name}</Text>
              <Pressable onPress={() => { setDraft(name); setIsEditing(true); }} hitSlop={12}>
                <FontAwesome5 name="pen" size={14} color={Colors.textMuted} />
              </Pressable>
            </>
          )}
        </View>
        <View style={headerStyles.rightRow}>
          <Pressable hitSlop={12} accessibilityRole="button" accessibilityLabel="Notificaciones" style={headerStyles.bellWrap}>
            <FontAwesome5 name="bell" size={14} color={Colors.textMuted} />
            <View style={headerStyles.bellDot} />
          </Pressable>
        </View>
      </View>

      {/* Mini economía */}
      <View style={headerStyles.economyRow}>
        <View style={[headerStyles.economyItem, headerStyles.economyMana]}>
          <FontAwesome5 name="bolt" size={10} color={Colors.text} style={{ opacity: 0.9 }} />
          <Text style={headerStyles.economyText}>{formatShort(economy?.mana)}</Text>
        </View>
        <View style={[headerStyles.economyItem, headerStyles.economyCoins]}>
          <FontAwesome5 name="coins" size={10} color={Colors.text} style={{ opacity: 0.9 }} />
          <Text style={headerStyles.economyText}>{formatShort(economy?.coins)}</Text>
        </View>
        <View style={[headerStyles.economyItem, headerStyles.economyGems]}>
          <FontAwesome5 name="gem" size={10} color={Colors.text} style={{ opacity: 0.9 }} />
          <Text style={headerStyles.economyText}>{formatShort(economy?.gems)}</Text>
        </View>
      </View>

      <Text style={headerStyles.sectionLabel}>Progreso de crecimiento</Text>

      {/* Etapas encima de la barra */}
      <View style={headerStyles.stagesRow}>
        {stages.map((s) => {
          const active = s.label.toLowerCase() === String(stage).toLowerCase();
          return (
            <View key={s.key} style={headerStyles.stageItem}>
              <FontAwesome5 name={s.icon} size={14} color={active ? Colors.success : Colors.textMuted} />
              <Text style={[headerStyles.stageText, active && { color: Colors.success }]}>{s.label}</Text>
            </View>
          );
        })}
      </View>

      {/* Barra XP con shimmer y porcentaje dentro */}
      <View style={headerStyles.xpBar} accessibilityRole="progressbar" accessibilityValue={{ now: percent, min: 0, max: 100 }}>
        <View style={[headerStyles.xpFill, { width: `${percent}%` }]}> 
          <LinearGradient colors={[Colors.primary, Colors.primaryLight]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={{ flex: 1 }} />
        </View>
        <Animated.View pointerEvents="none" style={[headerStyles.xpShimmer, { opacity: shimmer }]}>
          <LinearGradient colors={["rgba(255,255,255,0.18)", "rgba(255,255,255,0.07)", "rgba(255,255,255,0)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }} />
        </Animated.View>
        <Text style={headerStyles.xpPercent}>{`${percent}%`}</Text>
      </View>

      {/* Sugerido + Buffs mini */}
      <View style={headerStyles.suggestRow}>
        <Text style={headerStyles.suggestLabel}>Sugerido:</Text>
        <Text style={headerStyles.suggestValue}>Limpiar</Text>
        <Pressable hitSlop={12}><Text style={headerStyles.suggestCta}>Abrir</Text></Pressable>
      </View>
      <View style={headerStyles.buffRow}>
        <View style={headerStyles.buffTag}><Text style={headerStyles.buffText}>XP x2 - 01:45</Text></View>
        <View style={headerStyles.buffTag}><Text style={headerStyles.buffText}>Mana +10% - 00:45</Text></View>
      </View>
    </View>
  );
}

const ElementAccents = {
  neutral: Colors.surfaceAlt,
  water: Colors.elementWater,
  spirit: Colors.secondaryFantasy,
  mana: Colors.primaryFantasy,
};

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
    { id: "s1", name: "Maceta Rústica", rarity: "common", owned: true, equipped: true, accentKey: "neutral", thumb: "🎍" },
    { id: "s2", name: "Arcana Azul", rarity: "rare", owned: true, accentKey: "water", thumb: "🔵" },
    { id: "s3", name: "Esencia Etérea", rarity: "epic", owned: false, accentKey: "spirit", cost: { currency: "diamonds", amount: 120 }, thumb: "💠" },
    { id: "s4", name: "Corazón de Maná", rarity: "legendary", owned: false, accentKey: "mana", cost: { currency: "coins", amount: 2400 }, thumb: "💎" },
  ]);

  const equippedSkin = skins.find((s) => s.id === equippedSkinId);
  const skinAccent = equippedSkin ? ElementAccents[equippedSkin.accentKey] : undefined;

  const etaText = "faltan ~3 tareas";

  // [MB] Costos mock por acción (solo UI)
  const ACTION_COSTS = {
    water: { mana: 20 },
    feed: { coins: 120 },
    clean: { coins: 0 },
    meditate: { mana: 10 },
  };

  // [MB] Handler central de acciones
  function handleAction(key) {
    const costs = ACTION_COSTS[key] || {};
    const lacks = Object.entries(costs).find(
      ([res, amt]) => (economy[res] ?? 0) < amt
    );
    if (lacks) {
      const [res] = lacks;
      setInsufficient({ id: String(Date.now()), resource: res });
      AccessibilityInfo.announceForAccessibility?.(
        "Saldo insuficiente de " +
          (res === "mana"
            ? "Maná"
            : res === "coins"
            ? "Monedas"
            : "Diamantes")
      );
      return;
    }
    const next = { ...economy };
    Object.entries(costs).forEach(([res, amt]) => {
      next[res] -= amt || 0;
    });
    setEconomy(next);
    const resKey = Object.keys(costs)[0];
    setTxn({ id: String(Date.now()), resource: resKey, amount: -1 * (costs[resKey] || 0) });
    AccessibilityInfo.announceForAccessibility?.(
      `Gastaste ${costs[resKey]} ${
        resKey === "mana"
          ? "Maná"
          : resKey === "coins"
          ? "Monedas"
          : "Diamantes"
      }, saldo ${next[resKey]}`
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.content}
        importantForAccessibility={invOpen ? "no-hide-descendants" : "auto"}
      >
        <PlantStatusHeader
          name={plantName}
          onRename={(next) => setPlantName(next)}
          economy={economy}
          streakDays={streakDays}
          progress={0.62}
          stage={"brote"}
          etaText={etaText}
        />
        <PlantSectionCard style={{ gap: Spacing.base }}>
          <PlantHero
          source={require("../../assets/matureplant.png")}
          health={0.95}
          mood="floreciente"
          stage="brote"
          skinAccent={skinAccent}
          auraIntensity="none"
          size="lg"
          />
          <View style={heroCardStyles.xpWrapper}>
            <LinearGradient
              colors={Gradients.xp}
              start={{ x: 0, y: 0.5 }}
              end={{ x: 1, y: 0.5 }}
              style={[heroCardStyles.xpFill, { width: `62%` }]}
            />
          </View>
          <View style={{ gap: 2 }}>
            <Text style={{ color: Colors.text, fontWeight: "700" }}>Cuidado de la planta</Text>
            <Text style={{ color: Colors.textMuted }}>Acciones base para mantener agua, nutrientes y pureza.</Text>
          </View>
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
        </PlantSectionCard>
        {/* BuffsBar omitido en esta tarjeta para asemejar captura base
        <BuffsBar 
          buffs={[
            { id: "b1", title: "XP", icon: "✨", multiplier: 1.2, timeRemainingMs: 120000, accentKey: "xp" },
            { id: "b2", title: "Maná", icon: "🔮", multiplier: 1.1, timeRemainingMs: 45000, accentKey: "mana" },
            { id: "b3", title: "Protección", icon: "🛡️", multiplier: 1.0, timeRemainingMs: 300000, accentKey: "shield" },
          ]}
          onExpire={(id) => console.log("[MB] buff expirado:", id)}
          contentContainerStyle={{ gap: Spacing.base }}
        />
        */}
        <ScreenSection>
          <SectionHeader title="Métricas de cuidado" />
          <CareMetrics
            water={0.62}
            light={0.48}
            nutrients={0.3}
            mood={0.95}
          />
        </ScreenSection>
        {/*<ScreenSection>
          <SectionHeader title="Acciones rápidas" />
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
        <ScreenSection>
          <SectionHeader title="Progreso de crecimiento" caption={etaText} />
          <GrowthProgress
            stage="brote"
            progress={0.62}
            milestones={[
              { id: "m1", icon: "💧", title: "Regaste", delta: "+15 Agua", timestamp: Date.now() - 1000 * 60 * 20 },
              { id: "m2", icon: "🍃", title: "Aplicaste nutrientes", delta: "+10 Nutrientes", timestamp: Date.now() - 1000 * 60 * 90 },
              { id: "m3", icon: "🧘", title: "Meditaste", delta: "+10 Ánimo", timestamp: Date.now() - 1000 * 60 * 200 },
            ]}
            limitLog={3}
          />
        </ScreenSection>
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
    </SafeAreaView>
  );
}

function PlantStatusHeaderLegacy({ name, onRename, economy, streakDays, progress = 0, stage = "semilla", etaText }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  useEffect(() => setDraft(name), [name]);

  const percent = Math.min(100, Math.max(0, Math.round(progress * 100)));
  const shimmer = useRef(new Animated.Value(0)).current;
  const prev = useRef(progress);
  useEffect(() => {
    if (progress > (prev.current ?? 0)) {
      Animated.sequence([
        Animated.timing(shimmer, { toValue: 0.3, duration: 180, useNativeDriver: true }),
        Animated.timing(shimmer, { toValue: 0, duration: 420, useNativeDriver: true }),
      ]).start();
    }
    prev.current = progress;
  }, [progress, shimmer]);

  const stages = [
    { key: "semilla", label: "Semilla", icon: "egg" },
    { key: "brote", label: "Brote", icon: "seedling" },
    { key: "joven", label: "Joven", icon: "leaf" },
    { key: "madura", label: "Madura", icon: "tree" },
  ];

  return (
    <View style={headerStyles.card}>
      <View style={headerStyles.topRow}>
        <View style={headerStyles.nameRow}>
          {isEditing ? (
            <TextInput
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={() => { setIsEditing(false); onRename?.(draft.trim()); }}
              onBlur={() => { setIsEditing(false); onRename?.(draft.trim()); }}
              style={headerStyles.nameInput}
              maxLength={40}
              autoFocus
              placeholder="Nombre de la planta"
              placeholderTextColor={Colors.textMuted}
            />
          ) : (
            <>
              <Text style={headerStyles.name} numberOfLines={1}>{name}</Text>
              <Pressable onPress={() => { setDraft(name); setIsEditing(true); }} hitSlop={12}>
                <FontAwesome5 name="pen" size={14} color={Colors.textMuted} />
              </Pressable>
            </>
          )}
        </View>
        <View style={headerStyles.rightRow}>
          <Pressable hitSlop={12} accessibilityRole="button" accessibilityLabel="Notificaciones" style={headerStyles.bellWrap}>
            <FontAwesome5 name="bell" size={14} color={Colors.textMuted} />
            <View style={headerStyles.bellDot} />
          </Pressable>
        </View>
      </View>

      {/* Mini economía */}
      <View style={headerStyles.economyRow}>
        <View style={[headerStyles.economyItem, headerStyles.economyMana]}>
          <FontAwesome5 name="bolt" size={10} color={Colors.text} style={{ opacity: 0.9 }} />
          <Text style={headerStyles.economyText}>{formatShort(economy?.mana)}</Text>
        </View>
        <View style={[headerStyles.economyItem, headerStyles.economyCoins]}>
          <FontAwesome5 name="coins" size={10} color={Colors.text} style={{ opacity: 0.9 }} />
          <Text style={headerStyles.economyText}>{formatShort(economy?.coins)}</Text>
        </View>
        <View style={[headerStyles.economyItem, headerStyles.economyGems]}>
          <FontAwesome5 name="gem" size={10} color={Colors.text} style={{ opacity: 0.9 }} />
          <Text style={headerStyles.economyText}>{formatShort(economy?.gems)}</Text>
        </View>
      </View>

      <Text style={headerStyles.sectionLabel}>Progreso de crecimiento</Text>

      {/* Etapas encima de la barra */}
      <View style={headerStyles.stagesRow}>
        {stages.map((s) => {
          const active = s.label.toLowerCase() === String(stage).toLowerCase();
          return (
            <View key={s.key} style={headerStyles.stageItem}>
              <FontAwesome5 name={s.icon} size={14} color={active ? Colors.success : Colors.textMuted} />
              <Text style={[headerStyles.stageText, active && { color: Colors.success }]}>{s.label}</Text>
            </View>
          );
        })}
      </View>

      {/* Barra XP con shimmer y porcentaje dentro */}
      <View style={headerStyles.xpBar} accessibilityRole="progressbar" accessibilityValue={{ now: percent, min: 0, max: 100 }}>
        <View style={[headerStyles.xpFill, { width: `${percent}%` }]}> 
          <LinearGradient colors={[Colors.primary, Colors.primaryLight]} start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={{ flex: 1 }} />
        </View>
        <Animated.View pointerEvents="none" style={[headerStyles.xpShimmer, { opacity: shimmer }]}>
          <LinearGradient colors={["rgba(255,255,255,0.18)", "rgba(255,255,255,0.07)", "rgba(255,255,255,0)"]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ flex: 1 }} />
        </Animated.View>
        <Text style={headerStyles.xpPercent}>{`${percent}%`}</Text>
      </View>

      {/* Sugerido + Buffs mini */}
      <View style={headerStyles.suggestRow}>
        <Text style={headerStyles.suggestLabel}>Sugerido:</Text>
        <Text style={headerStyles.suggestValue}>Limpiar</Text>
        <Pressable hitSlop={12}><Text style={headerStyles.suggestCta}>Abrir</Text></Pressable>
      </View>
      <View style={headerStyles.buffRow}>
        <View style={headerStyles.buffTag}><Text style={headerStyles.buffText}>XP x2 - 01:45</Text></View>
        <View style={headerStyles.buffTag}><Text style={headerStyles.buffText}>Mana +10% - 00:45</Text></View>
      </View>
    </View>
  );
}

function formatShort(n) {
  const v = typeof n === 'number' ? n : parseFloat(n || 0);
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  return `${Math.floor(v)}`;
}

const headerStyles = StyleSheet.create({
  card: { borderRadius: Spacing.small, padding: Spacing.base, borderWidth: 1, borderColor: Colors.surfaceAlt, backgroundColor: Colors.surface },
  topRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 },
  name: { color: Colors.text, fontSize: 20, fontWeight: '700', flexShrink: 1 },
  nameInput: { color: Colors.text, borderBottomWidth: 1, borderColor: Colors.surfaceAlt, paddingVertical: 2, flex: 1 },
  rightRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  bellWrap: { position: 'relative', padding: 2 },
  bellDot: { position: 'absolute', top: 0, right: 0, width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.accent },
  economyRow: { flexDirection: 'row', gap: 8, marginTop: 6 },
  economyItem: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 999, borderWidth: 1 },
  economyMana: { borderColor: Colors.secondary, backgroundColor: 'rgba(28,212,123,0.15)' },
  economyCoins: { borderColor: Colors.accent, backgroundColor: 'rgba(255,202,40,0.15)' },
  economyGems: { borderColor: Colors.secondaryLight, backgroundColor: 'rgba(128,222,234,0.18)' },
  economyText: { color: Colors.text, fontWeight: '600' },
  sectionLabel: { color: Colors.textMuted, marginTop: 8 },
  stagesRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
  stageItem: { alignItems: 'center', flex: 1 },
  stageText: { color: Colors.textMuted },
  xpBar: { height: 14, borderRadius: 999, backgroundColor: Colors.surfaceAlt, overflow: 'hidden', marginTop: 8, position: 'relative' },
  xpFill: { height: '100%', borderRadius: 999 },
  xpShimmer: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 },
  xpPercent: { position: 'absolute', right: 8, top: 0, lineHeight: 14, color: Colors.text, fontWeight: '700', fontSize: 12 },
  suggestRow: { flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 8 },
  suggestLabel: { color: Colors.textMuted },
  suggestValue: { color: Colors.text, fontWeight: '700' },
  suggestCta: { color: Colors.primary, fontWeight: '700' },
  buffRow: { flexDirection: 'row', gap: 6, flexWrap: 'wrap', marginTop: 6 },
  buffTag: { borderRadius: 999, borderWidth: 1, borderColor: 'rgba(156,136,255,0.35)', backgroundColor: 'rgba(37,26,63,0.35)', paddingHorizontal: 10, paddingVertical: 4 },
  buffText: { color: Colors.text, fontWeight: '600' },
});


const heroCardStyles = StyleSheet.create({
  xpWrapper: {
    height: 12,
    borderRadius: 999,
    backgroundColor: Colors.surfaceAlt,
    overflow: 'hidden',
  },
  xpFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: 999,
  },
});



