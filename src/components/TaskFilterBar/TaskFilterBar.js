// [MB] TaskFilterBar — tabs de estado con chip animado
// [MB] Módulo: Tasks / Sección: Barra de filtros
// Afecta: TaskFilterBar (tabs principales)
// Propósito: Tabs accesibles alineadas al tema con chip trasero
// Puntos de edición futura: estilos de enfoque y más tabs
// Autor: Codex - Fecha: 2025-08-16

import React, { useRef, useState, useEffect } from "react";
import { View, Text, Animated, Pressable, Easing } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./TaskFilterBar.styles";
import { Colors, Spacing } from "../../theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TaskFilterBar({ filters, active, onSelect }) {
  const [width, setWidth] = useState(0);
  const gap = Spacing.small;
  const padding = Spacing.small;
  const tabWidth = width
    ? (width - padding * 2 - gap * (filters.length - 1)) / filters.length
    : 0;
  const translateX = useRef(new Animated.Value(0)).current;
  const chipOpacity = useRef(new Animated.Value(0)).current;
  const scales = useRef(filters.map(() => new Animated.Value(1))).current;

  useEffect(() => {
    if (!width) return;
    const index = filters.findIndex((f) => f.key === active);
    Animated.parallel([
      Animated.timing(translateX, {
        toValue: index * (tabWidth + gap),
        duration: 180,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
      Animated.timing(chipOpacity, {
        toValue: 1,
        duration: 150,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }),
    ]).start();
  }, [active, width, tabWidth, gap]);

  const handleLayout = (e) => setWidth(e.nativeEvent.layout.width);

  return (
    <View style={styles.container} onLayout={handleLayout}>
      {width > 0 && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.chip,
            {
              width: tabWidth,
              transform: [{ translateX }],
              opacity: chipOpacity,
            },
          ]}
        />
      )}
      {filters.map((f, index) => {
        const isActive = active === f.key;
        const scale = scales[index];
        const activeColor = Colors.textOnAccent || Colors.onAccent || Colors.text;
        const inactiveColor = Colors.textMuted;
        const color = isActive ? activeColor : inactiveColor;
        const accLabel = `${f.label}${f.count ? ` (${f.count})` : ""}`;
        return (
          <AnimatedPressable
            key={f.key}
            style={[styles.button, { transform: [{ scale }] }]}
            onPress={() => onSelect(f.key)}
            onPressIn={() =>
              Animated.timing(scale, {
                toValue: 0.98,
                duration: 80,
                useNativeDriver: true,
              }).start()
            }
            onPressOut={() =>
              Animated.timing(scale, {
                toValue: 1,
                duration: 80,
                useNativeDriver: true,
              }).start()
            }
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={accLabel}
          >
            <View style={styles.tabContent}>
              {f.icon && (
                <FontAwesome5 name={f.icon} size={14} color={color} />
              )}
              <Text style={[styles.label, { color }]}>{f.label}</Text>
            </View>
            {f.count > 0 && (
              <View style={styles.badge} pointerEvents="none">
                <Text style={styles.badgeText}>{f.count}</Text>
              </View>
            )}
          </AnimatedPressable>
        );
      })}
    </View>
  );
}
