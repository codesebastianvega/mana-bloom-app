// [MB] Módulo: Home / Sección: HomeHeader
// Afecta: HomeScreen
// Propósito: Encabezado con top bar, chips y popovers informativos
// Puntos de edición futura: conectar datos reales y estilos responsivos
// Autor: Codex - Fecha: 2025-08-16

import React, {
  useState,
  useRef,
  useImperativeHandle,
  forwardRef,
  useEffect,
} from "react";
import {
  View,
  Text,
  Pressable,
  Animated,
  AccessibilityInfo,
  findNodeHandle,
  Platform,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import styles from "./HomeHeader.styles";
import { Gradients, Spacing } from "../../theme";
import {
  useAppState,
  useWallet,
  useProgress,
  useActiveBuffs,
} from "../../state/AppContext";

const chipHitSlop = {
  top: Spacing.small,
  bottom: Spacing.small,
  left: Spacing.small,
  right: Spacing.small,
};


function HomeHeader(
  {
    onPressNotifications = () => {},
    onHeaderLayout,
    onChipPopoverToggle,
  },
  ref
) {
  const { plantState, streak, mana } = useAppState();
  const { coin, gem } = useWallet();
  const { level, progress } = useProgress();
  const buffs = useActiveBuffs();
  const navigation = useNavigation();

  const [activeChip, setActiveChip] = useState(null);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const anim = useRef(new Animated.Value(0)).current;
  const contentOpacity = useRef(new Animated.Value(1)).current;
  const popoverTitleRef = useRef(null);

  const fadeOutContent = (cb) => {
    Animated.timing(contentOpacity, {
      toValue: 0,
      duration: 120,
      useNativeDriver: true,
    }).start(() => cb && cb());
  };

  const fadeInContent = () => {
    Animated.timing(contentOpacity, {
      toValue: 1,
      duration: 120,
      useNativeDriver: true,
    }).start();
  };

  const closePopover = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => {
      setIsPopoverOpen(false);
      setActiveChip(null);
      onChipPopoverToggle?.(false);
    });
  };

  const onPressChip = (type) => {
    if (activeChip === type) {
      closePopover();
    } else {
      if (!isPopoverOpen) {
        setIsPopoverOpen(true);
        onChipPopoverToggle?.(true);
        Animated.timing(anim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }).start();
      }
      fadeOutContent(() => {
        setActiveChip(type);
        fadeInContent();
      });
    }
  };

  const chipConfig = {
    plant: {
      key: "plant",
      label: plantState || "Floreciendo",
      title: "Planta",
      desc: `Estado actual: ${plantState || "Floreciendo"}.`,
      a11y: "Estado de planta",
    },
    mana: {
      key: "mana",
      label: "Maná",
      title: "Maná",
      desc: `Tienes ${mana} de maná disponible.`,
      a11y: "Maná",
    },
    coins: {
      key: "coins",
      label: "Monedas",
      title: "Monedas",
      desc: `Tienes ${coin} monedas.`,
      a11y: "Monedas",
    },
    diamonds: {
      key: "diamonds",
      label: "Diamantes",
      title: "Diamantes",
      desc: `Tienes ${gem} diamantes.`,
      a11y: "Diamantes",
    },
    streak: {
      key: "streak",
      label: "Racha",
      title: "Racha",
      desc: `Racha activa de ${streak} días.`,
      a11y: "Racha activa",
    },
    buffs: {
      key: "buffs",
      label: "Buffs",
      title: "Buffs",
      desc: buffs.length
        ? `${buffs.length} buffs activos.`
        : "Sin buffs activos.",
      a11y: "Buffs activos",
    },
    rewards: {
      key: "rewards",
      label: "Recompensas",
      title: "Recompensas",
      desc: "Explora recompensas disponibles.",
      a11y: "Recompensas",
      accent: true,
      onPress: () => {
        closePopover();
        navigation.navigate("Rewards");
      },
    },
  };

  const rowChips = [
    "mana",
    "coins",
    "diamonds",
    "streak",
    "buffs",
    "rewards",
  ];

  useEffect(() => {
    if (activeChip) {
      const titleText = chipConfig[activeChip]?.title;
      const node = findNodeHandle(popoverTitleRef.current);
      const setAF = AccessibilityInfo?.setAccessibilityFocus;
      if (node && typeof setAF === "function" && Platform.OS !== "web") {
        setAF(node);
      } else {
        AccessibilityInfo?.announceForAccessibility?.(titleText || "Detalles");
      }
    }
  }, [activeChip]);

  useImperativeHandle(ref, () => ({ closePopover }));

  const animatedStyle = {
    opacity: anim,
    transform: [
      {
        translateY: anim.interpolate({
          inputRange: [0, 1],
          outputRange: [8, 0],
        }),
      },
    ],
  };

  return (
    <View
      style={styles.container}
      onLayout={onHeaderLayout}
      accessibilityRole="header"
      accessibilityLabel="Encabezado: Mana Bloom"
    >
      <View style={styles.topBar}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Mana Bloom</Text>
          <Pressable
            onPress={() => onPressChip("plant")}
            style={styles.plantChip}
            accessibilityRole="button"
            accessibilityLabel={chipConfig.plant.a11y}
            accessibilityState={
              activeChip === "plant" ? { expanded: true } : undefined
            }
            hitSlop={chipHitSlop}
          >
            <View style={styles.chipContent}>
              <Text
                style={styles.chipText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {chipConfig.plant.label}
              </Text>
            </View>
          </Pressable>
        </View>
        <Pressable
          onPress={onPressNotifications}
          style={styles.notificationsButton}
          accessibilityRole="button"
          accessibilityLabel="Abrir notificaciones"
        >
          <Text style={styles.notificationsText}>Notificaciones</Text>
        </Pressable>
      </View>

      <View style={styles.chipBlock}>
        <View style={styles.chipRow}>
          {rowChips.map((key) => {
            const c = chipConfig[key];
            return (
              <Pressable
                key={c.key}
                onPress={c.onPress ? c.onPress : () => onPressChip(c.key)}
                style={[styles.chip, c.accent && styles.chipAccent]}
                accessibilityRole="button"
                accessibilityLabel={c.a11y}
                accessibilityState={
                  activeChip === c.key ? { expanded: true } : undefined
                }
                hitSlop={chipHitSlop}
              >
            <View style={styles.chipContent}>
              <Text
                style={c.accent ? styles.chipTextOnAccent : styles.chipText}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {c.label}
              </Text>
            </View>
          </Pressable>
            );
          })}
        </View>
        {isPopoverOpen && (
          <Animated.View
            style={[styles.popoverContainer, animatedStyle]}
            accessibilityViewIsModal={true}
          >
            <Animated.View style={{ opacity: contentOpacity }}>
              {activeChip && (
                <>
                  <Text ref={popoverTitleRef} style={styles.popoverTitle}>
                    {chipConfig[activeChip].title}
                  </Text>
                  <Text style={styles.popoverDesc}>
                    {chipConfig[activeChip].desc}
                  </Text>
                </>
              )}
            </Animated.View>
          </Animated.View>
        )}
      </View>

      <View style={styles.levelRow}>
        <View
          style={styles.levelContainer}
          accessibilityRole="text"
          accessibilityLabel={`Nivel ${level}`}
        >
          <Text style={styles.levelText}>{`Nivel ${level}`}</Text>
          <View style={styles.xpBar}>
            <LinearGradient
              colors={Gradients.xp}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[styles.xpFill, { width: `${progress * 100}%` }]}
            />
          </View>
        </View>
        <View style={styles.buffRow}>
          {buffs.map((b) => (
            <View
              key={b.id || b.type}
              style={styles.buffBadge}
              accessibilityRole="text"
              accessibilityLabel={b.type}
            >
              <Text style={styles.buffText} numberOfLines={1}>
                {b.type === "xp_double" ? "XP" : "FX"}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

export default forwardRef(HomeHeader);
