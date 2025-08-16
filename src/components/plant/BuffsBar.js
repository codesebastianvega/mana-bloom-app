// [MB] Módulo: Planta / Sección: Buffs activos
// Afecta: PlantScreen (barra de buffs)
// Propósito: gestionar y mostrar chips de buffs con temporizador compartido
// Puntos de edición futura: extracción a contexto o data real
// Autor: Codex - Fecha: 2025-08-18

import React, { useCallback, useEffect, useState } from "react";
import { ScrollView, View, StyleSheet, Text } from "react-native";
import BuffChip from "./BuffChip";
import { Colors, Spacing, Typography, Opacity } from "../../theme";

export default function BuffsBar({ buffs, onExpire, horizontal = true }) {
  // [MB] Estado local para manejar ms restantes de cada buff
  const [buffsState, setBuffsState] = useState(() => buffs.map((b) => ({ ...b })));

  // [MB] Actualiza estado si cambian los buffs iniciales
  useEffect(() => {
    setBuffsState(buffs.map((b) => ({ ...b })));
  }, [buffs]);

  // [MB] Un solo intervalo para todos los buffs
  useEffect(() => {
    const id = setInterval(() => {
      setBuffsState((prev) =>
        prev.map((b) => ({ ...b, timeRemainingMs: b.timeRemainingMs - 1000 }))
      );
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const handleExpire = useCallback(
    (id) => {
      setBuffsState((prev) => prev.filter((b) => b.id !== id));
      onExpire && onExpire(id);
    },
    [onExpire]
  );

  if (buffsState.length === 0) {
    return (
      <Text style={styles.empty} accessibilityRole="text">
        Sin buffs activos
      </Text>
    );
  }

  const content = buffsState.map((b) => (
    <BuffChip key={b.id} {...b} onExpire={handleExpire} />
  ));

  if (horizontal) {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.row}
      >
        {content}
      </ScrollView>
    );
  }

  return <View style={[styles.row, styles.wrap]}>{content}</View>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    paddingVertical: Spacing.small,
  },
  wrap: {
    flexWrap: "wrap",
  },
  empty: {
    ...Typography.caption,
    color: Colors.text,
    opacity: Opacity.muted,
    textAlign: "center",
    paddingVertical: Spacing.small,
  },
});

