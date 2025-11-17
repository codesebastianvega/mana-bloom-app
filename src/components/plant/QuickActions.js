// [MB] Modulo: Plant / Seccion: QuickActions
// Afecta: PlantScreen (acciones rapidas)
// Proposito: Reorganizar acciones de cuidado y rituales con CTA dual/link
// Puntos de edicion futura: mover estilos a .styles.js al crecer
// Autor: Codex - Fecha: 2025-10-31

import React, {
  useMemo,
  useState,
  useCallback,
  useRef,
  useEffect,
} from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

import ActionButton from "./ActionButton";
import ActionInfoModal from "./ActionInfoModal";
import { ACTION_MECHANICS } from "./actionMechanics";
import { Colors, Spacing, Typography } from "../../theme";

const CARE_KEYS = [
  "water",
  "feed",
  "clean",
  "prune",
  "light",
  "mist",
  "search",
];
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
  light: "Luz directa",
  mist: "Neblina",
  search: "Buscar plagas",
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
  light: "clarity",
  mist: "reflection",
  search: "ritualJournal",
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
  light: "sun",
  mist: "cloud",
  search: "bug",
  meditate: "om",
  hydrate: "glass-whiskey",
  stretch: "running",
  sunlight: "sun",
  visualize: "eye",
  journal: "pen-fancy",
  gratitude: "heart",
  restEyes: "spa",
};

const CARE_ILLUSTRATIONS = {
  water: require("../../../assets/care/regar.png"),
  feed: require("../../../assets/care/nutrir.png"),
  clean: require("../../../assets/care/limpiar.png"),
  prune: require("../../../assets/care/podar.png"),
  light: require("../../../assets/care/iluminar.png"),
  mist: require("../../../assets/care/neblina.png"),
  search: require("../../../assets/care/buscar.png"),
};
const RITUAL_ILLUSTRATIONS = {
  meditate: require("../../../assets/ritualicons/meditar.png"),
  hydrate: require("../../../assets/ritualicons/hidratar.png"),
  stretch: require("../../../assets/ritualicons/estirar.png"),
  sunlight: require("../../../assets/ritualicons/luz.png"),
  visualize: require("../../../assets/ritualicons/visualizar.png"),
  journal: require("../../../assets/ritualicons/notas.png"),
  gratitude: require("../../../assets/ritualicons/gratitud.png"),
  restEyes: require("../../../assets/ritualicons/descanso.png"),
};

// Frases cortas para rituales (helper compacto)
const RITUAL_SHORT_HELPERS = {
  meditate: "Respira 3 ciclos profundos.",
  hydrate: "Toma un vaso de agua ahora.",
  stretch: "Suelta la tensión en 60 segundos.",
  sunlight: "Busca luz suave y recárgate.",
  visualize: "Enfoca tu meta          del día.",
  journal: "Escribe una línea honesta.",
  gratitude: "Envía un mensaje lleno de gratitud.",
  restEyes: "Cierra los ojos durante 20s.",
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
  prune: "canPrune",
  light: "canLight",
  mist: "canMist",
  search: "canSearch",
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
    const cooldownMs =
      props.cooldowns?.[key] || props.localCooldowns?.[key] || 0;
    const availabilityProp = AVAILABILITY_PROPS[key];
    const isAvailable =
      availabilityProp &&
      Object.prototype.hasOwnProperty.call(props, availabilityProp)
        ? props[availabilityProp]
        : true;

    // Recursos suficientes segun economy y costos del actionMechanic
    let hasResources = true;
    if (
      props.economy &&
      Array.isArray(mechanic.cost) &&
      mechanic.cost.length > 0
    ) {
      const map = {
        mana: "mana",
        coin: "coins",
        coins: "coins",
        diamond: "gems",
        diamonds: "gems",
        gem: "gems",
        gems: "gems",
      };
      hasResources = mechanic.cost.every((c) => {
        const keyMap =
          map[String(c?.type || "").toLowerCase()] ||
          String(c?.type || "").toLowerCase();
        const balance = Number(props.economy?.[keyMap] ?? 0);
        const needed = Number(c?.amount ?? 0);
        return balance >= needed;
      });
    }

    let helper;
    if (variant === "dual") {
      helper = mechanic.summary || mechanic.headline;
    } else {
      const shortText =
        RITUAL_SHORT_HELPERS[key] || mechanic.summary || mechanic.headline;
      helper =
        variant === "ritual" ? shortText : cooldownMs > 0 ? null : shortText;
    }

    const iconColor = ACCENT_COLORS[accentKey] || Colors.icon;
    const icon = iconName ? (
      <FontAwesome5 name={iconName} size={16} color={iconColor} />
    ) : null;
    const illustration =
      variant === "dual"
        ? CARE_ILLUSTRATIONS[key]
        : variant === "ritual"
        ? RITUAL_ILLUSTRATIONS[key]
        : null;
    const statusText = mechanic.statusLabel || mechanic.headline;

    return {
      key,
      title: label,
      helper,
      accentKey,
      icon,
      illustration,
      statusText,
      cooldownMs,
      disabled: !isAvailable || !hasResources,
      variant,
    };
  });

export default function QuickActions({
  cooldowns = {},
  onAction,
  healthPercent,
  economy,
  ...availability
}) {
  const [infoKey, setInfoKey] = useState(null);
  const [localCooldowns, setLocalCooldowns] = useState({});
  const activatingRef = useRef({});
  const [careIndex, setCareIndex] = useState(0);
  const { width: screenWidth } = useWindowDimensions();
  const careScrollRef = useRef(null);

  const careActions = useMemo(
    () =>
      buildActionConfig(
        CARE_KEYS,
        { ...availability, cooldowns, localCooldowns, economy },
        "dual"
      ),
    [availability, cooldowns, localCooldowns, economy]
  );

  const ritualActions = useMemo(
    () =>
      buildActionConfig(
        RITUAL_KEYS,
        { ...availability, cooldowns, localCooldowns, economy },
        "ritual"
      ),
    [availability, cooldowns, localCooldowns, economy]
  );

  const handlePress = useCallback(
    (key) => (payload) => {
      if (activatingRef.current[key]) return; // anti-double-tap
      activatingRef.current[key] = true;
      setTimeout(() => {
        delete activatingRef.current[key];
      }, 300);

      const cdMin = ACTION_MECHANICS[key]?.cooldownMin;
      const isInactive = Boolean(payload?.inactive);
      const isCooldown = (payload?.cooldownMs ?? 0) > 0;

      // Si está en cooldown, no consumas recursos ni abras modales
      if (isCooldown) return;

      const result = onAction?.(key, payload);
      // onAction puede devolver false para indicar "solo abrí un modal, no ejecutes aún"
      if (result === false) return;

      // Si la acción realmente se ejecutó y no está inactiva, inicia cooldown local
      if (
        !isInactive &&
        cdMin &&
        cdMin > 0 &&
        (!cooldowns[key] || cooldowns[key] <= 0)
      ) {
        const ms = Math.max(0, Math.floor(cdMin * 60 * 1000));
        setLocalCooldowns((prev) => ({ ...prev, [key]: ms }));
        setTimeout(() => {
          setLocalCooldowns((prev) => ({ ...prev, [key]: 0 }));
        }, ms);
      }
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
  const careCardWidth = screenWidth;
  const sideInset = Math.max(screenWidth * 0.12, Spacing.base * 0.8);
  const careSlideWidth = Math.max(220, screenWidth - sideInset * 2);
  const slideGap = Spacing.small * 0.4;
  const careSlideStride = careSlideWidth + slideGap * 2;
  const loopedCareActions = useMemo(() => {
    if (!careActions.length) return [];
    return [
      careActions[careActions.length - 1],
      ...careActions,
      careActions[0],
    ];
  }, [careActions]);

  useEffect(() => {
    if (loopedCareActions.length && careScrollRef.current) {
      requestAnimationFrame(() => {
        careScrollRef.current.scrollTo({ x: careSlideStride, animated: false });
      });
    }
  }, [loopedCareActions.length, careSlideStride]);

  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuidado de la planta</Text>
        <Text style={styles.sectionCaption}>
          Acciones base para mantener agua, nutrientes y pureza.
        </Text>
        <View style={styles.careSliderWrapper}>
          <ScrollView
            ref={careScrollRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ width: careCardWidth }}
            decelerationRate="fast"
            snapToInterval={careSlideStride}
            snapToAlignment="start"
            contentContainerStyle={[
              styles.careSliderContent,
              { paddingHorizontal: Math.max(0, sideInset - slideGap) },
            ]}
            onMomentumScrollEnd={(evt) => {
              if (!loopedCareActions.length) return;
              const offsetX = evt.nativeEvent.contentOffset.x;
              const page = Math.round(offsetX / careSlideStride);
              const lastPage = loopedCareActions.length - 1;
              if (page === 0) {
                careScrollRef.current?.scrollTo({
                  x: careSlideStride * (lastPage - 1),
                  animated: false,
                });
                setCareIndex(careActions.length - 1);
                return;
              }
              if (page === lastPage) {
                careScrollRef.current?.scrollTo({
                  x: careSlideStride,
                  animated: false,
                });
                setCareIndex(0);
                return;
              }
              setCareIndex(page - 1);
            }}
          >
            {loopedCareActions.map((item, idx) => (
              <View
                key={`${item.key ?? idx}-${idx}`}
                style={[
                  styles.careSlide,
                  {
                    width: careSlideWidth,
                    marginHorizontal:
                      idx === 0 || idx === loopedCareActions.length - 1
                        ? 0
                        : slideGap,
                  },
                ]}
              >
                <ActionButton
                  title={item.title}
                  helper={item.helper}
                  accentKey={item.accentKey}
                  icon={item.icon}
                  illustration={item.illustration}
                  statusText={item.statusText}
                  cooldownMs={item.cooldownMs}
                  disabled={item.disabled}
                  variant={item.variant}
                  onPress={handlePress(item.key)}
                  onInfoPress={() => handleInfo(item.key)}
                  infoAccessibilityLabel={`Abrir detalles de ${item.title}`}
                />
              </View>
            ))}
          </ScrollView>
        </View>
        <View style={styles.carePagination}>
          {careActions.map((action, idx) => (
            <View
              key={`${action.key}-dot`}
              style={[
                styles.careDot,
                idx === careIndex && styles.careDotActive,
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Rituales de bienestar</Text>
          {typeof healthPercent === "number" ? (
            <Text style={styles.sectionTag}>{`Salud ${healthPercent}%`}</Text>
          ) : null}
        </View>
        <Text style={styles.sectionCaption}>
          Micro pausas para recargar energia junto a la planta.
        </Text>
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
                      illustration={item.illustration}
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

      <ActionInfoModal
        visible={Boolean(infoKey)}
        onClose={closeInfo}
        mechanics={infoMechanics}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.base * 1.5,
  },
  section: {
    gap: Spacing.small,
    paddingTop: Spacing.small,
    paddingBottom: Spacing.small,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sectionTag: {
    ...Typography.caption,
    color: Colors.text,
    opacity: 0.85,
  },
  sectionTitle: {
    ...Typography.title,
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
  careSliderContent: {
    paddingHorizontal: 0,
  },
  careSlide: {
    paddingHorizontal: Spacing.tiny,
    paddingVertical: Spacing.tiny,
    alignSelf: "center",
  },
  careSliderWrapper: {
    marginHorizontal: -Spacing.base,
    alignItems: "center",
  },
  carePagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  careDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.textMuted,
    opacity: 0.35,
  },
  careDotActive: {
    backgroundColor: Colors.text,
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
