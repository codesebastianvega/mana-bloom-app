// [MB] Módulo: Planta / Sección: Métricas de cuidado
// Afecta: PlantScreen (grupo de indicadores)
// Propósito: agrupar barras de agua, luz, nutrientes y ánimo
// Puntos de edición futura: fuentes de datos reales
// Autor: Codex - Fecha: 2025-08-16

import React from "react";
import { View, StyleSheet, useWindowDimensions } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import MetricPill from "./MetricPill";
import { Colors, Spacing } from "../../theme";

// type MetricValue = number | undefined; ver spec en tarea
export default function CareMetrics({
  water,
  light,
  nutrients,
  mood,
  style,
}) {
  const { width } = useWindowDimensions();
  const isCompact = width < 400; // [MB] Corte simple para 1×4 en pantallas estrechas

  const metrics = [
    {
      key: "water",
      label: "Agua",
      value: water,
      accentKey: "water",
      icon: (
        <FontAwesome5
          name="tint"
          size={Spacing.base}
          color={Colors.icon}
        />
      ),
    },
    {
      key: "light",
      label: "Luz",
      value: light,
      accentKey: "light",
      icon: (
        <FontAwesome5
          name="sun"
          size={Spacing.base}
          color={Colors.icon}
        />
      ),
    },
    {
      key: "nutrients",
      label: "Nutrientes",
      value: nutrients,
      accentKey: "nutrients",
      icon: (
        <FontAwesome5
          name="leaf"
          size={Spacing.base}
          color={Colors.icon}
        />
      ),
    },
    {
      key: "mood",
      label: "Ánimo",
      value: mood,
      accentKey: "mood",
      icon: (
        <FontAwesome5
          name="smile"
          size={Spacing.base}
          color={Colors.icon}
        />
      ),
    },
  ];

  return (
    <View
      style={[
        styles.container,
        { gap: Spacing.base },
        style,
      ]}
    >
      {metrics.map((m) => (
        <View
          key={m.key}
          style={{ flexBasis: isCompact ? "100%" : "48%" }}
        >
          <MetricPill
            icon={m.icon}
            label={m.label}
            value={m.value}
            accentKey={m.accentKey}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

