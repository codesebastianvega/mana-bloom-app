// [MB] Modulo: Planta / Seccion: CareMetrics
// Afecta: PlantScreen (grupo de indicadores visuales)
// Proposito: mostrar barras compactas para agua, luz, nutrientes y animo
// Puntos de edicion futura: conectar con estado real y responsivo extra
// Autor: Codex - Fecha: 2025-10-21

import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import MetricPill from "./MetricPill";
import { Colors, Spacing } from "../../theme";

export default function CareMetrics({
  water,
  light,
  nutrients,
  mood,
  purity,
  temperature,
  rituals,
  focus,
  style,
}) {
  const { width } = useWindowDimensions();
  const isCompact = width < 400;

  const metrics = [
    {
      key: "water",
      label: "Agua",
      value: water,
      accentKey: "water",
      icon: (
        <FontAwesome5 name="tint" size={Spacing.base - 2} color={Colors.text} />
      ),
    },
    {
      key: "light",
      label: "Luz",
      value: light,
      accentKey: "light",
      icon: (
        <FontAwesome5 name="sun" size={Spacing.base - 2} color={Colors.text} />
      ),
    },
    {
      key: "nutrients",
      label: "Nutrientes",
      value: nutrients,
      accentKey: "nutrients",
      icon: (
        <FontAwesome5 name="leaf" size={Spacing.base - 2} color={Colors.text} />
      ),
    },
    {
      key: "mood",
      label: "Ánimo",
      value: mood,
      accentKey: "mood",
      icon: (
        <FontAwesome5 name="smile" size={Spacing.base - 2} color={Colors.text} />
      ),
    },
    {
      key: "purity",
      label: "Pureza",
      value: purity,
      accentKey: "purity",
      icon: (
        <FontAwesome5 name="wind" size={Spacing.base - 2} color={Colors.text} />
      ),
    },
    {
      key: "temperature",
      label: "Temperatura",
      value: temperature,
      accentKey: "temperature",
      icon: (
        <FontAwesome5 name="thermometer-half" size={Spacing.base - 2} color={Colors.text} />
      ),
    },
    {
      key: "rituals",
      label: "Rituales",
      value: rituals,
      accentKey: "rituals",
      icon: (
        <FontAwesome5 name="fire" size={Spacing.base - 2} color={Colors.text} />
      ),
    },
    {
      key: "focus",
      label: "Focus",
      value: focus,
      accentKey: "focus",
      icon: (
        <FontAwesome5 name="medkit" size={Spacing.base - 2} color={Colors.text} />
      ),
    },
  ];

  return (
    <View
      style={[
        styles.grid,
        { gap: Spacing.small },
        style,
      ]}
    >
      {metrics.map((metric) => (
        <View
          key={metric.key}
          style={{ flexBasis: isCompact ? "100%" : "48%" }}
        >
          <MetricPill
            icon={metric.icon}
            label={metric.label}
            value={metric.value}
            accentKey={metric.accentKey}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "stretch",
  },
});
