// [MB] Modulo: Tasks / Seccion: CreateTaskModal - ElementGrid
// Afecta: CreateTaskModal (seleccion de elemento)
// Proposito: Grid 2x2 con animaciones de seleccion de elementos
// Puntos de edicion futura: animaciones y estilos por elemento
// Autor: Codex - Fecha: 2025-10-20

import React, { useState, useMemo } from "react";
import { View, Pressable, Text, Image } from "react-native";
import { Colors, Spacing, Radii } from "../../theme";
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
  water: Colors.elementWater,
  fire: Colors.elementFire,
  earth: Colors.elementEarth,
  air: Colors.elementAir,
};

// TODO: restaurar emojis una vez se actualice el encoding global del repo.
const ELEMENTS = [
  { key: "water", label: "Agua", icon: require("../../../assets/water.png"), caption: "Fluye y enfoca" },
  { key: "fire", label: "Fuego", icon: require("../../../assets/fire.png"), caption: "Energía y empuje" },
  { key: "earth", label: "Tierra", icon: require("../../../assets/earth.png"), caption: "Constancia y base" },
  { key: "air", label: "Aire", icon: require("../../../assets/wind.png"), caption: "Ligereza y ritmo" },
];

export default function ElementGrid({ value, onChange, onLongPress, tileAspect = 0.78 }) {
  const [gridWidth, setGridWidth] = useState(0);
  const horizontalPadding = Spacing.small;
  const columnGap = Spacing.small;
  const cardSize = gridWidth
    ? (gridWidth - horizontalPadding * 2 - columnGap) / 2
    : 0;
  const cardHeight = cardSize * tileAspect;
  const rows = useMemo(() => {
    const chunked = [];
    for (let idx = 0; idx < ELEMENTS.length; idx += 2) {
      chunked.push(ELEMENTS.slice(idx, idx + 2));
    }
    return chunked;
  }, []);

  return (
    <View
      style={styles.elementGrid}
      onLayout={(e) => setGridWidth(e.nativeEvent.layout.width)}
    >
      {rows.map((row, rowIdx) => (
        <View
          key={`element-row-${rowIdx}`}
          style={[
            styles.elementRow,
            rowIdx === rows.length - 1 && styles.elementRowLast,
          ]}
        >
          {row.map((el, colIdx) => (
            <ElementTile
              key={el.key}
              element={el}
              width={cardSize}
              height={cardHeight}
              selected={value === el.key}
              onPress={() => onChange(el.key)}
              onLongPress={() => onLongPress(el.key)}
              isLastColumn={colIdx === row.length - 1}
              columnGap={columnGap}
            />
          ))}
          {row.length === 1 && (
            <View style={{ width: cardSize, height: cardHeight }} />
          )}
        </View>
      ))}
    </View>
  );
}

function ElementTile({ element, width, height, selected, onPress, onLongPress, isLastColumn, columnGap }) {
  const accent = ElementAccents[element.key];
  const activeBackground = selected ? withAlpha(accent, 0.16) : "transparent";
  const activeBorder = selected
    ? withAlpha(accent, 0.9)
    : withAlpha(Colors.primaryLight, 0.25);

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      accessibilityRole="button"
      accessibilityLabel={`Mantener presionado para ver ayuda de ${element.label}`}
      accessibilityState={{ selected }}
      style={[
        styles.elementTile,
        {
          width,
          height,
          borderColor: activeBorder,
          backgroundColor: activeBackground,
          marginRight: isLastColumn ? 0 : columnGap,
        },
        selected && styles.elementTileActive,
      ]}
    >
      <Image source={element.icon} style={{ width: 36, height: 36, marginBottom: Spacing.tiny }} resizeMode="contain" />
      <Text style={styles.elementTitle}>{element.label}</Text>
      <Text style={styles.elementCaption} numberOfLines={1} ellipsizeMode="tail">
        {element.caption}
      </Text>
    </Pressable>
  );
}


