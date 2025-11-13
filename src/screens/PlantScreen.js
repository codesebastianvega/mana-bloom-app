// [MB] Módulo: Planta / Sección: Pantalla principal
// Afecta: PlantScreen
// Propósito: demo del hero de planta con métricas y acciones rápidas
// Puntos de edición futura: añadir header real y contenidos extra
// Autor: Codex - Fecha: 2025-08-16

import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, AccessibilityInfo, View, Text, TextInput, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import PlantHero from "../components/plant/PlantHero";
import PlantSectionCard from "../components/plant/PlantSectionCard";
import CareMetrics from "../components/plant/CareMetrics";
import QuickActions from "../components/plant/QuickActions";
import BuffsBar from "../components/plant/BuffsBar";
import InventorySheet from "../components/plant/InventorySheet";
// import PlantHeader from "../components/plant/PlantHeader";
import ScreenSection from "../components/ui/ScreenSection";
import SectionHeader from "../components/ui/SectionHeader";
import ElementBalance from "../components/plant/ElementBalance";
import PlantProgressCard from "../components/plant/PlantProgressCard";
import { Colors, Spacing, Radii, Gradients } from "../theme";
import styles from "./PlantScreen.styles";

// Ensure header component is defined before use to avoid ReferenceError
function PlantStatusHeader({ name, onRename, economy }) {
  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(name);
  useEffect(() => setDraft(name), [name]);

  return (
    <View style={headerStyles.card}>
      <View style={headerStyles.topRow}>
        <View style={headerStyles.nameRow}>
          {isEditing ? (
            <TextInput
              value={draft}
              onChangeText={setDraft}
              onSubmitEditing={() => {
                setIsEditing(false);
                onRename?.(draft.trim());
              }}
              onBlur={() => {
                setIsEditing(false);
                onRename?.(draft.trim());
              }}
              style={headerStyles.nameInput}
              maxLength={40}
              autoFocus
              placeholder="Nombre de la planta"
              placeholderTextColor={Colors.textMuted}
            />
          ) : (
            <>
              <Text style={headerStyles.name} numberOfLines={1}>
                {name}
              </Text>
              <Pressable
                onPress={() => {
                  setDraft(name);
                  setIsEditing(true);
                }}
                hitSlop={12}
              >
                <FontAwesome5 name="pen" size={14} color={Colors.textMuted} />
              </Pressable>
            </>
          )}
        </View>
        <Pressable
          hitSlop={12}
          accessibilityRole="button"
          accessibilityLabel="Notificaciones"
          style={headerStyles.bellWrap}
        >
          <FontAwesome5 name="bell" size={14} color={Colors.textMuted} />
          <View style={headerStyles.bellDot} />
        </Pressable>
      </View>

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
  const xpProgress = 0.62; // Por ahora fijo para maqueta

  // Auto-ocultar toasts breves
  useEffect(() => {
    if (txn || insufficient) {
      const id = setTimeout(() => {
        setTxn(null);
        setInsufficient(null);
      }, 1800);
      return () => clearTimeout(id);
    }
  }, [txn, insufficient]);

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
      {(txn || insufficient) ? (
        <View style={[styles.actionToastContainer, { top: Spacing.base }]}>
          <View style={styles.actionToastCard} accessibilityLiveRegion="polite">
            <View style={styles.actionToastContent}>
              <View style={styles.actionToastDot} />
              <Text style={styles.actionToastText}>
                {txn
                  ? `Gasto: ${txn.amount < 0 ? Math.abs(txn.amount) : txn.amount} ${txn.resource === 'mana' ? 'Maná' : txn.resource === 'coins' ? 'Monedas' : 'Diamantes'}`
                  : `Saldo insuficiente de ${insufficient?.resource === 'mana' ? 'Maná' : insufficient?.resource === 'coins' ? 'Monedas' : 'Diamantes'}`}
              </Text>
            </View>
          </View>
        </View>
      ) : null}
      <ScrollView
        contentContainerStyle={styles.content}
        importantForAccessibility={invOpen ? "no-hide-descendants" : "auto"}
      >
        <PlantStatusHeader
          name={plantName}
          onRename={(next) => setPlantName(next)}
          economy={economy}
        />
        <PlantProgressCard
          stage="brote"
          progress={xpProgress}
          etaText={etaText}
          suggestedAction="Limpiar"
          onPressAction={() => {
            setSelectedSkinId(equippedSkinId);
            setInvOpen(true);
          }}
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
              style={[heroCardStyles.xpFill, { width: `${Math.round(xpProgress * 100)}%` }]}
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
            economy={economy}
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
        <ScreenSection>
          <SectionHeader title="Balance elemental" />
          <ElementBalance
            values={{
              fire: 0.55,
              water: 0.62,
              earth: 0.48,
              wind: 0.66,
            }}
          />
        </ScreenSection>
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

function formatShort(n) {
  const v = typeof n === 'number' ? n : parseFloat(n || 0);
  if (v >= 1_000_000) return `${(v / 1_000_000).toFixed(1)}M`;
  if (v >= 1_000) return `${(v / 1_000).toFixed(1)}K`;
  return `${Math.floor(v)}`;
}

const headerStyles = StyleSheet.create({
  card: {
    borderRadius: Spacing.small,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.surfaceAlt,
    backgroundColor: Colors.surface,
    gap: Spacing.small,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.small,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.small,
    flex: 1,
  },
  name: {
    color: Colors.text,
    fontSize: 20,
    fontWeight: '700',
    flexShrink: 1,
  },
  nameInput: {
    color: Colors.text,
    borderBottomWidth: 1,
    borderColor: Colors.surfaceAlt,
    paddingVertical: 2,
    flex: 1,
  },
  bellWrap: {
    position: 'relative',
    padding: 2,
  },
  bellDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  economyRow: {
    flexDirection: 'row',
    gap: Spacing.small,
    flexWrap: 'wrap',
  },
  economyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.small / 2,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    borderWidth: 1,
  },
  economyMana: {
    borderColor: Colors.secondary,
    backgroundColor: 'rgba(28,212,123,0.15)',
  },
  economyCoins: {
    borderColor: Colors.accent,
    backgroundColor: 'rgba(255,202,40,0.15)',
  },
  economyGems: {
    borderColor: Colors.secondaryLight,
    backgroundColor: 'rgba(128,222,234,0.18)',
  },
  economyText: {
    color: Colors.text,
    fontWeight: '600',
  },
});


const heroCardStyles = StyleSheet.create({
  xpWrapper: {
    height: 14,
    borderRadius: 999,
    backgroundColor: Colors.surfaceAlt,
    overflow: 'hidden',
    marginTop: Spacing.small,
    marginBottom: Spacing.small,
  },
  xpFill: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: 999,
  },
});


