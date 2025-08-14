// [MB] Módulo: Home / Sección: HomeHeader
// Afecta: HomeScreen
// Propósito: Encabezado en dos filas con estado, recursos y accesos rápidos
// Puntos de edición futura: estilos y datos dinámicos
// Autor: Codex - Fecha: 2025-02-15

import React, { useMemo } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./HomeHeader.styles";
import { Colors, Gradients } from "../../theme";
import {
  useAppState,
  useWallet,
  useProgress,
  useDailyReward,
  useActiveBuffs,
} from "../../state/AppContext";

export default function HomeHeader({ onPressNotifications, onPressSettings, onPressDailyReward }) {
  const { plantState, streak, mana } = useAppState();
  const { coin, gem } = useWallet();
  const { level, progress } = useProgress();
  const { claimed } = useDailyReward();
  const buffs = useActiveBuffs();

  const rewardLabel = useMemo(() => {
    if (!claimed) return "Reclamar";
    const next = new Date();
    next.setHours(24, 0, 0, 0);
    const diff = next.getTime() - Date.now();
    const mins = Math.floor(diff / 60000);
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    return `${h}h ${m}m`;
  }, [claimed]);

  return (
    <View style={styles.container} accessibilityRole="header">
      <View style={styles.row1}>
        <Text style={styles.title}>Inicio</Text>
        <View style={styles.row1Right}>
          <View style={styles.pill} accessibilityRole="text" accessibilityLabel={`Estado de planta: ${plantState || 'desconocido'}`}> 
            <Text style={styles.pillText}>{plantState || '--'}</Text>
          </View>
          <View style={styles.pill} accessibilityRole="text" accessibilityLabel={`Racha: ${streak}`}> 
            <FontAwesome5 name="fire" size={12} color={Colors.text} style={styles.pillIcon} />
            <Text style={styles.pillText}>{streak}</Text>
          </View>
          <View style={styles.pill} accessibilityRole="text" accessibilityLabel={`Maná: ${mana}`}> 
            <Ionicons name="sparkles" size={12} color={Colors.text} style={styles.pillIcon} />
            <Text style={styles.pillText}>{mana}</Text>
          </View>
          <View style={styles.pill} accessibilityRole="text" accessibilityLabel={`Monedas: ${coin}`}> 
            <Ionicons name="pricetag" size={12} color={Colors.text} style={styles.pillIcon} />
            <Text style={styles.pillText}>{coin}</Text>
          </View>
          <View style={styles.pill} accessibilityRole="text" accessibilityLabel={`Diamantes: ${gem}`}> 
            <Ionicons name="diamond" size={12} color={Colors.text} style={styles.pillIcon} />
            <Text style={styles.pillText}>{gem}</Text>
          </View>
          <TouchableOpacity
            onPress={onPressNotifications}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Ver notificaciones (0)"
          >
            <Ionicons name="notifications-outline" size={18} color={Colors.text} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onPressSettings}
            style={styles.iconButton}
            accessibilityRole="button"
            accessibilityLabel="Abrir ajustes"
          >
            <Ionicons name="settings-outline" size={18} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row2}>
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
        <View style={styles.row2Right}>
          <TouchableOpacity
            onPress={onPressDailyReward}
            style={styles.rewardPill}
            accessibilityRole="button"
            accessibilityLabel="Recompensa diaria"
          >
            <Text style={styles.rewardText}>{rewardLabel}</Text>
          </TouchableOpacity>
          {buffs.map((b) => (
            <View
              key={b.id || b.type}
              style={styles.buffIcon}
              accessibilityRole="text"
              accessibilityLabel={b.type}
            >
              <Ionicons name={b.type === 'xp_double' ? 'flask' : 'sparkles'} size={16} color={Colors.accent} />
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

