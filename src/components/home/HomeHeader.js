// [MB] Módulo: Home / Sección: HomeHeader
// Afecta: HomeScreen
// Propósito: Encabezado con top bar, chips y popovers informativos
// Puntos de edición futura: conectar datos reales y estilos responsivos
// Autor: Codex - Fecha: 2025-08-30

import React, { useState, useRef } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";

import styles from "./HomeHeader.styles";
import { Colors, Gradients } from "../../theme";
import { useAppState, useWallet, useProgress, useActiveBuffs } from "../../state/AppContext";

export default function HomeHeader({ onPressNotifications, onPressSettings }) {
  const { plantState, streak, mana } = useAppState();
  const { coin, gem } = useWallet();
  const { level, progress } = useProgress();
  const buffs = useActiveBuffs();
  const navigation = useNavigation();

  const [activeChip, setActiveChip] = useState(null);
  const anim = useRef(new Animated.Value(0)).current;

  const openChip = (key) => {
    setActiveChip(key);
    Animated.timing(anim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeChip = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration: 180,
      useNativeDriver: true,
    }).start(() => setActiveChip(null));
  };

  const goToRewards = () => {
    closeChip();
    navigation.navigate("Rewards");
  };

  const chips = [
    {
      key: "plant",
      icon: <Ionicons name="leaf" size={14} color={Colors.text} style={styles.chipIcon} />, // plant icon
      label: plantState || "--",
      title: "Planta",
      desc: `Estado actual: ${plantState || "--"}.`,
      a11y: "Estado de planta",
    },
    {
      key: "streak",
      icon: <FontAwesome5 name="fire" size={12} color={Colors.text} style={styles.chipIcon} />, // streak icon
      label: String(streak),
      title: "Racha",
      desc: `Racha activa de ${streak} días.`,
      a11y: "Racha activa",
    },
    {
      key: "resources",
      icon: <Ionicons name="sparkles" size={14} color={Colors.text} style={styles.chipIcon} />, // resources icon
      label: `${mana}/${coin}/${gem}`,
      title: "Recursos",
      desc: `Maná ${mana}, monedas ${coin}, diamantes ${gem}.`,
      a11y: "Recursos",
    },
    {
      key: "buffs",
      icon: <Ionicons name="flask" size={14} color={Colors.text} style={styles.chipIcon} />, // buffs icon
      label: String(buffs.length),
      title: "Buffs",
      desc: buffs.length ? `${buffs.length} buffs activos.` : "Sin buffs activos.",
      a11y: "Buffs activos",
    },
    {
      key: "rewards",
      icon: <Ionicons name="gift" size={14} color={Colors.text} style={styles.chipIcon} />, // rewards icon
      label: "Ver",
      title: "Recompensas",
      desc: "Explora recompensas disponibles.",
      a11y: "Recompensas",
      onPress: goToRewards,
    },
  ];

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
      accessibilityRole="header"
      accessibilityLabel="Encabezado de inicio: Mana Bloom"
    >
      <View style={styles.topBar}>
        <Text style={styles.title}>Mana Bloom</Text>
        <View style={styles.topBarRight}>
          <Pressable
            onPress={onPressNotifications}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Abrir notificaciones"
          >
            <Ionicons name="notifications-outline" size={18} color={Colors.text} />
          </Pressable>
          <Pressable
            onPress={onPressSettings}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Abrir configuración"
          >
            <Ionicons name="settings-outline" size={18} color={Colors.text} />
          </Pressable>
        </View>
      </View>

      <View style={styles.chipBlock}>
        <View style={styles.chipRow}>
          {chips.map((c) => (
            <Pressable
              key={c.key}
              onPress={() => (c.onPress ? c.onPress() : openChip(c.key))}
              style={styles.chip}
              accessibilityRole="button"
              accessibilityLabel={c.a11y}
            >
              {c.icon}
              <Text style={styles.chipText}>{c.label}</Text>
            </Pressable>
          ))}
        </View>
        {activeChip && (
          <View style={styles.popoverRow}>
            {chips.map((c) => (
              <View key={c.key} style={styles.popoverSlot}>
                {activeChip === c.key && (
                  <Animated.View style={[styles.popover, animatedStyle]} accessibilityViewIsModal>
                    <Text style={styles.popoverTitle}>{c.title}</Text>
                    <Text style={styles.popoverDesc}>{c.desc}</Text>
                  </Animated.View>
                )}
              </View>
            ))}
          </View>
        )}
      </View>

      <View style={styles.levelRow}>
        <View style={styles.levelContainer} accessibilityRole="text" accessibilityLabel={`Nivel ${level}`}>
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
              style={styles.buffIcon}
              accessibilityRole="text"
              accessibilityLabel={b.type}
            >
              <Ionicons
                name={b.type === "xp_double" ? "flask" : "sparkles"}
                size={16}
                color={Colors.accent}
              />
            </View>
          ))}
        </View>
      </View>

      {activeChip && (
        <Pressable
          style={styles.overlay}
          onPress={closeChip}
          accessibilityRole="button"
          accessibilityLabel="Cerrar popover"
        />
      )}
    </View>
  );
}

