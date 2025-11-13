// [MB] TaskFilterBar — highlight per-tab + badge z-order

import React, { useRef, useEffect } from "react";
import { View, Text, Animated, Pressable, Easing } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./TaskFilterBar.styles";
import { Colors } from "../../theme";

const withAlpha = (hex = "", alpha = 1) => {
  const cleaned = `${hex}`.replace("#", "");
  if (cleaned.length !== 6) {
    return hex;
  }
  const value = parseInt(cleaned, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

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
        const accent = f.accent || Colors.accent;
        const accLabel = `${f.label}${f.count ? ` (${f.count})` : ""}`;
        const highlightFill = withAlpha(accent, 0.3);
        const highlightBorder = withAlpha(accent, 0.6);
        const activeColor = Colors.text;
        const inactiveColor = Colors.textMuted;
        const textColor = isActive ? activeColor : inactiveColor;
        const iconColor = isActive ? activeColor : withAlpha(accent, 0.55);

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
            {isActive && (
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.highlight,
                  {
                    backgroundColor: highlightFill,
                    borderColor: highlightBorder,
                    opacity,
                    transform: [{ scale }],
                  },
                ]}
              />
            )}
            <View style={styles.tabContent}>
              {f.icon && (
                <FontAwesome5 name={f.icon} size={14} color={iconColor} />
              )}
              <Text style={[styles.label, { color: textColor }]}>{f.label}</Text>
            </View>
          </AnimatedPressable>
        );
      })}
    </View>
  );
}
