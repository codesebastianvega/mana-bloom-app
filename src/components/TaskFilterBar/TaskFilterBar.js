// [MB] TaskFilterBar — highlight per-tab + badge z-order

import React, { useRef, useEffect } from "react";
import { View, Text, Animated, Pressable, Easing } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./TaskFilterBar.styles";
import { Colors } from "../../theme";

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function TaskFilterBar({ filters, active, onSelect }) {
  const anims = useRef(
    filters.map((f) => ({
      opacity: new Animated.Value(active === f.key ? 1 : 0),
      scale: new Animated.Value(active === f.key ? 1 : 0.96),
      press: new Animated.Value(1),
    }))
  ).current;

  useEffect(() => {
    filters.forEach((f, index) => {
      const isActive = active === f.key;
      Animated.parallel([
        Animated.timing(anims[index].opacity, {
          toValue: isActive ? 1 : 0,
          duration: 180,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(anims[index].scale, {
          toValue: isActive ? 1 : 0.96,
          duration: 180,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    });
  }, [active, filters, anims]);

  return (
    <View style={styles.container}>
      {filters.map((f, index) => {
        const isActive = active === f.key;
        const { opacity, scale, press } = anims[index];
        const activeColor = Colors.textOnAccent || Colors.onAccent || Colors.text;
        const inactiveColor = Colors.textMuted;
        const color = isActive ? activeColor : inactiveColor;
        const accLabel = `${f.label}${f.count ? ` (${f.count})` : ""}`;
        const highlightColors = {
          pending: Colors.accent,
          completed: Colors.success,
          deleted: Colors.danger,
        };
        const highlightColor = highlightColors[f.key] || Colors.accent;

        return (
          <AnimatedPressable
            key={f.key}
            style={[styles.button, { transform: [{ scale: press }] }]}
            onPress={() => onSelect(f.key)}
            onPressIn={() =>
              Animated.timing(press, {
                toValue: 0.98,
                duration: 80,
                useNativeDriver: true,
              }).start()
            }
            onPressOut={() =>
              Animated.timing(press, {
                toValue: 1,
                duration: 80,
                useNativeDriver: true,
              }).start()
            }
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={accLabel}
          >
            <Animated.View
              pointerEvents="none"
              style={[
                styles.highlight,
                {
                  backgroundColor: highlightColor,
                  opacity,
                  transform: [{ scale }],
                },
              ]}
            />
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
