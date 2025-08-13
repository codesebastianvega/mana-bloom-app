// [MB] Módulo: Home / Componente: SectionPlaceholder
// Afecta: HomeScreen
// Propósito: Placeholder temporal mientras se hidrata el estado
// Puntos de edición futura: animaciones o skeletons
// Autor: Codex - Fecha: 2025-08-13

import React from "react";
import { View, Text } from "react-native";
import { Colors, Radii } from "../../theme";

export default function SectionPlaceholder({ height }) {
  return (
    <View
      style={{
        height,
        backgroundColor: Colors.surface,
        borderRadius: Radii.lg,
        opacity: 0.5,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ color: Colors.text }}>Cargando…</Text>
    </View>
  );
}
