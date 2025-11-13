// [MB] Modulo: Plant / Seccion: QuickActions
// Afecta: PlantScreen (acciones rapidas)
// Proposito: Reorganizar acciones de cuidado y rituales con CTA dual/link
// Puntos de edicion futura: mover estilos a .styles.js al crecer
// Autor: Codex - Fecha: 2025-10-31

import React, { useMemo, useState, useCallback, useRef } from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import ActionButton from "./ActionButton";
import ActionInfoModal from "./ActionInfoModal";
import { ACTION_MECHANICS } from "./actionMechanics";
import { Colors, Spacing, Typography } from "../../theme";

const CARE_KEYS = ["water", "feed", "clean", "prune"];
const RITUAL_KEYS = [
  "meditate",
  "hydrate",
  "stretch",
  "sunlight",
  "visualize",
  "journal",
  "gratitude",
  "restEyes",
];

const ACTION_LABELS = {
  water: "Regar",
  feed: "Nutrir",
  clean: "Limpiar",
  prune: "Podar",
  meditate: "Meditar",
  hydrate: "Hidratar",
  stretch: "Estirar",
  sunlight: "Luz",
  visualize: "Visualizar",
  journal: "Notas",
  gratitude: "Gratitud",
  restEyes: "Descanso",
};

const ACTION_ACCENTS = {
  water: "water",
  feed: "nutrients",
  clean: "clean",
  prune: "vitality",
  meditate: "ritualCalm",
  hydrate: "ritualHydrate",
  stretch: "ritualStretch",
  sunlight: "ritualSun",
  visualize: "ritualFocus",
  journal: "ritualJournal",
  gratitude: "ritualGratitude",
  restEyes: "ritualCalm",
};

const ICON_MAP = {
  water: "tint",
  feed: "seedling",
  clean: "broom",
  prune: "cut",
  meditate: "om",
  hydrate: "glass-whiskey",
  stretch: "running",
  sunlight: "sun",
  visualize: "eye",
  journal: "pen-fancy",
  gratitude: "heart",
  restEyes: "spa",
};

// Frases cortas para rituales (helper compacto)
const RITUAL_SHORT_HELPERS = {
  meditate: "Respirar",
  hydrate: "Tomar agua",
  stretch: "Estirar",
  sunlight: "Luz natural",
  visualize: "Visualizar",
  journal: "Notas rapidas",
  gratitude: "Dar gracias",
  restEyes: "Descansar ojos",
};

const ACCENT_COLORS = {
  water: Colors.elementWater,
  nutrients: Colors.elementEarth,
  clean: Colors.primary,
  ritualCalm: Colors.ritualCalm,
  ritualHydrate: Colors.ritualHydrate,
  ritualStretch: Colors.ritualStretch,
  ritualSun: Colors.ritualSun,
  ritualFocus: Colors.ritualFocus,
  ritualJournal: Colors.ritualJournal,
  ritualGratitude: Colors.ritualGratitude,
  clarity: Colors.elementAir,
  reflection: Colors.elementEarthLight,
};

const AVAILABILITY_PROPS = {
  water: "canWater",
  feed: "canFeed",
  clean: "canClean",
  meditate: "canMeditate",
  hydrate: "canHydrate",
  stretch: "canStretch",
  sunlight: "canSunlight",
  visualize: "canVisualize",
  journal: "canJournal",
  gratitude: "canGratitude",
  restEyes: "canRestEyes",
};

const buildActionConfig = (keys, props, variant) =>
  keys.map((key) => {
    const mechanic = ACTION_MECHANICS[key] || {};
    const accentKey = ACTION_ACCENTS[key] || "clean";
    const iconName = ICON_MAP[key];
    const label = ACTION_LABELS[key] || mechanic.title || key;
    const cooldownMs = props.cooldowns?.[key] || props.localCooldowns?.[key] || 0; // define antes de usar
    const availabilityProp = AVAILABILITY_PROPS[key];
    const isAvailable =
      availabilityProp && Object.prototype.hasOwnProperty.call(props, availabilityProp)
        ? props[availabilityProp]
        : true;
    // Recursos suficientes segun economy y costos del actionMechanic
    let hasResources = true;
    if (props.economy && Array.isArray(mechanic.cost) && mechanic.cost.length > 0) {
      const map = { mana: 'mana', coin: 'coins', coins: 'coins', diamond: 'gems', diamonds: 'gems', gem: 'gems', gems: 'gems' };
      hasResources = mechanic.cost.every((c) => {
        const keyMap = map[String(c?.type || '').toLowerCase()] || String(c?.type || '').toLowerCase();
        const balance = Number(props.economy?.[keyMap] ?? 0);
        const needed = Number(c?.amount ?? 0);
        return balance >= needed;
      });
    }
    let helper;
    if (variant === "dual") {
      helper = mechanic.headline || mechanic.summary;
    } else {
      const shortText = RITUAL_SHORT_HELPERS[key] || mechanic.summary || mechanic.headline;
      helper = cooldownMs > 0 ? null : shortText;
    }

    const iconColor = ACCENT_COLORS[accentKey] || Colors.icon;
    const icon = iconName ? <FontAwesome5 name={iconName} size={16} color={iconColor} /> : null;

    return {
      key,
      title: label,
      helper,
      accentKey,
      icon,
      cooldownMs,
      disabled: !isAvailable || !hasResources,
      variant,
    };
  });

export default function QuickActions({ cooldowns = {}, onAction, healthPercent, economy, ...availability }) {
  const [infoKey, setInfoKey] = useState(null);
  const [localCooldowns, setLocalCooldowns] = useState({});
  const activatingRef = useRef({});

  const careActions = useMemo(
    () =>
      buildActionConfig(CARE_KEYS, { ...availability, cooldowns, localCooldowns, economy }, "dual"),
    [availability, cooldowns, localCooldowns, economy]
  );

  const ritualActions = useMemo(
    () =>
      buildActionConfig(RITUAL_KEYS, { ...availability, cooldowns, localCooldowns, economy }, "link"),
    [availability, cooldowns, localCooldowns, economy]
  );

  const handlePress = useCallback(
    (key) => (payload) => {
      if (activatingRef.current[key]) return; // anti-double-tap
      activatingRef.current[key] = true;
      setTimeout(() => { delete activatingRef.current[key]; }, 300);
      const cdMin = ACTION_MECHANICS[key]?.cooldownMin;
      const isInactive = Boolean(payload?.inactive);
      const isCooldown = (payload?.cooldownMs ?? 0) > 0;
      // Si no está inactiva y tiene cooldown definido, inicia cooldown local
      if (!isInactive && cdMin && cdMin > 0 && (!cooldowns[key] || cooldowns[key] <= 0)) {
        const ms = Math.max(0, Math.floor(cdMin * 60 * 1000));
        setLocalCooldowns((prev) => ({ ...prev, [key]: ms }));
        setTimeout(() => {
          setLocalCooldowns((prev) => ({ ...prev, [key]: 0 }));
        }, ms);
      }
      // Si está en cooldown, no consumas recursos ni propagues acción
      if (isCooldown) return;
      onAction?.(key, payload);
    },
    [onAction, cooldowns]
  );

  const handleInfo = useCallback((key) => {
    setInfoKey(key);
  }, []);

  const closeInfo = useCallback(() => {
    setInfoKey(null);
  }, []);

  const infoMechanics = infoKey ? ACTION_MECHANICS[infoKey] : null;

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuidado de la planta</Text>
        <Text style={styles.sectionCaption}>
          Acciones base para mantener agua, nutrientes y pureza.
        </Text>
        <View style={styles.careGrid}>
          <View style={styles.careRow}>
            {(() => {
              const item = careActions.find((a) => a.key === "water");
              return item ? (
                <View style={styles.careCol}>
                  <ActionButton
                    key={item.key}
                    title={item.title}
                    helper={item.helper}
                    accentKey={item.accentKey}
                    icon={item.icon}
                    cooldownMs={item.cooldownMs}
                    disabled={item.disabled}
                    variant={item.variant}
                    onPress={handlePress(item.key)}
                    onInfoPress={() => handleInfo(item.key)}
                    infoAccessibilityLabel={`Abrir detalles de ${item.title}`}
                  />
                </View>
              ) : null;
            })()}
            {(() => {
              const item = careActions.find((a) => a.key === "feed");
              return item ? (
                <View style={styles.careCol}>
                  <ActionButton
                    key={item.key}
                    title={item.title}
                    helper={item.helper}
                    accentKey={item.accentKey}
                    icon={item.icon}
                    cooldownMs={item.cooldownMs}
                    disabled={item.disabled}
                    variant={item.variant}
                    onPress={handlePress(item.key)}
                    onInfoPress={() => handleInfo(item.key)}
                    infoAccessibilityLabel={`Abrir detalles de ${item.title}`}
                  />
                </View>
              ) : null;
            })()}
          </View>
          <View style={styles.careRow}>
            {(() => {
              const item = careActions.find((a) => a.key === "clean");
              return item ? (
                <View style={styles.careCol}>
                  <ActionButton
                    key={item.key}
                    title={item.title}
                    helper={item.helper}
                    accentKey={item.accentKey}
                    icon={item.icon}
                    cooldownMs={item.cooldownMs}
                    disabled={item.disabled}
                    variant={item.variant}
                    onPress={handlePress(item.key)}
                    onInfoPress={() => handleInfo(item.key)}
                    infoAccessibilityLabel={`Abrir detalles de ${item.title}`}
                  />
                </View>
              ) : null;
            })()}
            {(() => {
              const item = careActions.find((a) => a.key === "prune");
              return item ? (
                <View style={styles.careCol}>
                  <ActionButton
                    key={item.key}
                    title={item.title}
                    helper={item.helper}
                    accentKey={item.accentKey}
                    icon={item.icon}
                    cooldownMs={item.cooldownMs}
                    disabled={item.disabled}
                    variant={item.variant}
                    onPress={handlePress(item.key)}
                    onInfoPress={() => handleInfo(item.key)}
                    infoAccessibilityLabel={`Abrir detalles de ${item.title}`}
                  />
                </View>
              ) : null;
            })()}
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Rituales de bienestar</Text>
          {typeof healthPercent === 'number' ? (
            <Text style={styles.sectionTag}>{`Salud ${healthPercent}%`}</Text>
          ) : null}
        </View>
        <Text style={styles.sectionCaption}>Micro pausas para recargar energia junto a la planta.</Text>
        <View style={styles.ritualGrid}>
          {(() => {
            const rows = [];
            for (let i = 0; i < ritualActions.length; i += 2) {
              rows.push(ritualActions.slice(i, i + 2));
            }
            return rows.map((row, idx) => (
              <View key={`ritual-row-${idx}`} style={styles.ritualRow}>
                {row.map((item) => (
                  <View key={item.key} style={styles.ritualCol}>
                    <ActionButton
                      title={item.title}
                      helper={item.helper}
                      accentKey={item.accentKey}
                      icon={item.icon}
                      cooldownMs={item.cooldownMs}
                      disabled={item.disabled}
                      variant={item.variant}
                      onPress={handlePress(item.key)}
                      onInfoPress={() => handleInfo(item.key)}
                      infoAccessibilityLabel={`Ver guia de ${item.title}`}
                    />
                  </View>
                ))}
                {row.length < 2
                  ? Array.from({ length: 2 - row.length }).map((_, i) => (
                      <View key={`spacer-${i}`} style={styles.ritualCol} />
                    ))
                  : null}
              </View>
            ));
          })()}
        </View>
      </View>

      <ActionInfoModal visible={Boolean(infoKey)} onClose={closeInfo} mechanics={infoMechanics} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.large,
  },
  section: {
    gap: Spacing.small,
    paddingVertical: Spacing.small,
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sectionTag: {
    ...Typography.caption,
    color: Colors.text,
    opacity: 0.85,
  },
  sectionTitle: {
    ...Typography.body,
    fontWeight: "700",
    color: Colors.text,
  },
  sectionCaption: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  stack: {
    gap: Spacing.small,
  },
  careGrid: {
    gap: Spacing.small,
  },
  careRow: {
    flexDirection: "row",
    gap: Spacing.small,
  },
  careCol: {
    flex: 1,
  },
  careFull: {
    marginTop: Spacing.small,
  },
  ritualGrid: {
    gap: Spacing.small,
  },
  ritualRow: {
    flexDirection: "row",
    gap: Spacing.small,
    alignItems: "stretch",
  },
  ritualCol: {
    flexGrow: 1,
    flexBasis: "48%",
    minWidth: 0,
  },
});
