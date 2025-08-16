// [MB] Módulo: Tasks / Sección: CreateTaskModal - ElementGrid
// Afecta: CreateTaskModal (selección de elemento)
// Propósito: Grid 2x2 con animaciones de selección de elementos
// Puntos de edición futura: animaciones y estilos por elemento
// Autor: Codex - Fecha: 2025-08-22

import React, { useState, useRef, useEffect } from "react";
import { View, Pressable, Text, Animated } from "react-native";
import { Colors, Spacing, Elevation } from "../../theme";
import styles from "./CreateTaskModal.styles";

const withAlpha = (hex, alpha) => {
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `${hex}${a}`;
};

const ElementAccents = {
  water: Colors.elementWater,
  fire: Colors.elementFire,
  earth: Colors.elementEarth,
  air: Colors.elementAir,
};

const ELEMENTS = [
  { key: "water", label: "Agua", emoji: "💧", caption: "Fluye y enfoca" },
  { key: "fire", label: "Fuego", emoji: "🔥", caption: "Energía y empuje" },
  { key: "earth", label: "Tierra", emoji: "🌱", caption: "Constancia y base" },
  { key: "air", label: "Aire", emoji: "💨", caption: "Ligereza y ritmo" },
];

export default function ElementGrid({ value, onChange, onLongPress }) {
  const [gridWidth, setGridWidth] = useState(0);
  const cardSize = gridWidth ? (gridWidth - Spacing.small) / 2 : 0;

  return (
    <View
      style={styles.elementGrid}
      onLayout={(e) => setGridWidth(e.nativeEvent.layout.width)}
    >
      {ELEMENTS.map((el, idx) => (
        <ElementTile
          key={el.key}
          element={el}
          index={idx}
          size={cardSize}
          selected={value === el.key}
          onPress={() => onChange(el.key)}
          onLongPress={() => onLongPress(el.key)}
        />
      ))}
    </View>
  );
}

function ElementTile({ element, index, size, selected, onPress, onLongPress }) {
  const accent = ElementAccents[element.key];
  const scale = useRef(new Animated.Value(selected ? 1 : 0.98)).current;
  const glowOpacity = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(scale, {
      toValue: selected ? 1 : 0.98,
      duration: 160,
      useNativeDriver: true,
    }).start();
    Animated.timing(glowOpacity, {
      toValue: selected ? 1 : 0,
      duration: 160,
      useNativeDriver: true,
    }).start();
  }, [selected, scale, glowOpacity]);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      style={{
        width: size,
        height: size,
        marginRight: index % 2 === 0 ? Spacing.small : 0,
        marginBottom: Spacing.small,
      }}
    >
      <Animated.View
        style={[
          styles.elementTile,
          {
            borderColor: selected ? accent : Colors.border,
            backgroundColor: selected
              ? withAlpha(accent, 0.12)
              : Colors.surface,
            transform: [{ scale }],
          },
          selected && { ...(Elevation.raised || {}), shadowColor: accent },
        ]}
      >
        <Animated.View
          style={[
            styles.elementGlow,
            {
              backgroundColor: withAlpha(accent, 0.18),
              opacity: glowOpacity,
              shadowColor: accent,
              shadowOpacity: 0.6,
              shadowRadius: 10,
              elevation: 6,
            },
          ]}
        />
        <Text style={styles.elementEmoji}>{element.emoji}</Text>
        <Text style={styles.elementTitle}>{element.label}</Text>
        <Text style={styles.elementCaption}>{element.caption}</Text>
      </Animated.View>
    </Pressable>
  );
}

