// [MB] Modulo: Tasks / Seccion: CreateTaskModal - ElementGrid
// Afecta: CreateTaskModal (seleccion de elemento)
// Proposito: Chips horizontales inspirados en el mock de afinidad elemental
// Puntos de edicion futura: animaciones onPress o gradientes dinamicos
// Autor: Codex - Fecha: 2025-10-20

import React from "react";
import { View, Pressable, Text, Image } from "react-native";
import { Colors, Spacing } from "../../theme";
import { ELEMENT_INFO } from "../../constants/elements";
import styles from "./CreateTaskModal.styles";

const withAlpha = (hex = "", alpha = 1) => {
  if (!hex) return hex;
  const cleaned = `${hex}`.replace("#", "").trim();
  const base = cleaned.length === 8 ? cleaned.slice(0, 6) : cleaned;
  if (base.length !== 6) return hex;
  const value = parseInt(base, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const ElementAccents = {
  fire: Colors.elementFire,
  water: Colors.elementWater,
  earth: Colors.elementEarth,
  air: Colors.elementAir,
};

const ELEMENT_ORDER = ["fire", "water", "earth", "air"];
const ELEMENT_LABELS = {
  fire: "FUEGO",
  water: "AGUA",
  earth: "TIERRA",
  air: "AIRE",
};
const ELEMENT_ICONS = {
  fire: require("../../../assets/fire.png"),
  water: require("../../../assets/water.png"),
  earth: require("../../../assets/earth.png"),
  air: require("../../../assets/wind.png"),
};

export default function ElementGrid({ value, onChange, onLongPress }) {
  return (
    <View style={styles.elementGrid}>
      <View style={styles.elementRow}>
        {ELEMENT_ORDER.map((key) => (
          <ElementTile
            key={key}
            elementKey={key}
            label={ELEMENT_LABELS[key]}
            icon={ELEMENT_ICONS[key]}
            selected={value === key}
            onPress={() => onChange(key)}
            onLongPress={() => onLongPress(key)}
          />
        ))}
      </View>
    </View>
  );
}

function ElementTile({ elementKey, label, icon, selected, onPress, onLongPress }) {
  const accent = ElementAccents[elementKey];
  const borderColor = selected
    ? withAlpha(accent, 0.85)
    : withAlpha(Colors.primaryLight, 0.2);
  const backgroundColor = selected
    ? withAlpha(Colors.surfaceElevated, 0.85)
    : withAlpha(Colors.surfaceAlt, 0.5);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={`Seleccionar ${label}`}
      accessibilityState={{ selected }}
      style={[
        styles.elementTile,
        {
          borderColor,
          backgroundColor,
          shadowColor: accent,
          shadowOpacity: selected ? 0.4 : 0,
          shadowRadius: selected ? 12 : 0,
          shadowOffset: { width: 0, height: selected ? 6 : 0 },
          elevation: selected ? 6 : 0,
        },
      ]}
    >
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: withAlpha(accent, selected ? 0.35 : 0.18),
          marginBottom: Spacing.tiny,
        }}
      >
        <Image source={icon} style={{ width: 26, height: 26 }} resizeMode="contain" />
      </View>
      <Text style={styles.elementTitle}>{label}</Text>
    </Pressable>
  );
}
