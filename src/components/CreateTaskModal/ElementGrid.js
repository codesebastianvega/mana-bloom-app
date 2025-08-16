// [MB] Módulo: Tasks / Sección: CreateTaskModal - ElementGrid
// Afecta: CreateTaskModal (selección de elemento)
// Propósito: Grid 2x2 con animaciones de selección de elementos
// Puntos de edición futura: animaciones y estilos por elemento
// Autor: Codex - Fecha: 2025-08-16

import React, { useState, useRef, useEffect } from "react";
import { View, Pressable, Text, Animated, Easing } from "react-native";
import { Colors, Spacing, Elevation, Radii } from "../../theme";
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

export default function ElementGrid({ value, onChange, onLongPress, tileAspect = 0.78 }) {
  const [gridWidth, setGridWidth] = useState(0);
  const cardSize = gridWidth ? (gridWidth - Spacing.small) / 2 : 0;
  const cardHeight = cardSize * tileAspect;

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
          width={cardSize}
          height={cardHeight}
          selected={value === el.key}
          onPress={() => onChange(el.key)}
          onLongPress={() => onLongPress(el.key)}
        />
      ))}
    </View>
  );
}

function ElementTile({ element, index, width, height, selected, onPress, onLongPress }) {
  const accent = ElementAccents[element.key];
  const glowScale = useRef(new Animated.Value(selected ? 1 : 0.98)).current;
  const glowOpacity = useRef(new Animated.Value(selected ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(glowScale, {
      toValue: selected ? 1 : 0.98,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
    Animated.timing(glowOpacity, {
      toValue: selected ? 1 : 0,
      duration: 150,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [selected, glowScale, glowOpacity]);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={`Mantén presionado para ver ayuda de ${element.label}`}
      accessibilityState={{ selected }}
      style={{
        width,
        height,
        marginRight: index % 2 === 0 ? Spacing.small : 0,
        marginBottom: Spacing.small,
        borderRadius: Radii.lg,
      }}
    >
      <Animated.View
        pointerEvents="none"
        style={[
          styles.elementGlow,
          {
            backgroundColor: withAlpha(accent, 0.26),
            opacity: glowOpacity,
            transform: [{ scale: glowScale }],
            shadowColor: accent,
            shadowOpacity: 0.8,
            shadowRadius: 12,
            elevation: 8,
            borderRadius: Radii.lg,
          },
        ]}
      />
      <View
        style={[
          styles.elementTile,
          {
            borderColor: selected ? accent : Colors.border,
            backgroundColor: selected
              ? withAlpha(accent, 0.18)
              : Colors.surface,
          },
          selected && { ...(Elevation.raised || {}), shadowColor: accent },
        ]}
      >
        <Text style={styles.elementEmoji}>{element.emoji}</Text>
        <Text style={styles.elementTitle}>{element.label}</Text>
        <Text
          style={styles.elementCaption}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {element.caption}
        </Text>
      </View>
    </Pressable>
  );
}

