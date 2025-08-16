// [MB] Módulo: Planta / Sección: Progreso de crecimiento
// Afecta: PlantScreen (mini log)
// Propósito: renderiza un hito reciente de cuidado con icono y timestamp relativo
// Puntos de edición futura: mover estilos a .styles.js o agregar soporte de i18n
// Autor: Codex - Fecha: 2025-08-18

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors, Spacing, Typography, Opacity } from "../../theme";

export default function GrowthMilestoneItem({ icon, title, delta, timestamp }) {
  const relative = formatRelative(timestamp);
  const accessibilityLabel = `Hito: ${title}${delta ? `, ${delta}` : ""}, ${relative}`;

  return (
    <View
      // [MB] Cada hito se expone como texto accesible compuesto
      accessibilityRole="text"
      accessibilityLabel={accessibilityLabel}
      style={styles.container}
    >
      {/* [MB] Primera fila: icono, título y delta */}
      <View style={styles.row}>
        {icon ? (
          typeof icon === "string" ? (
            <Text style={styles.icon}>{icon}</Text>
          ) : (
            <View style={styles.icon}>{icon}</View>
          )
        ) : null}
        <Text style={styles.title}>{title}</Text>
        {delta ? <Text style={styles.delta}>{delta}</Text> : null}
      </View>
      {/* [MB] Segunda fila: timestamp relativo */}
      <Text style={styles.time}>{relative}</Text>
    </View>
  );
}

function formatRelative(ts) {
  // [MB] Formato simple relativo en segundos/minutos/horas/días
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return `hace ${diff}s`;
  if (diff < 3600) return `hace ${Math.floor(diff / 60)}m`;
  if (diff < 86400) return `hace ${Math.floor(diff / 3600)}h`;
  return `hace ${Math.floor(diff / 86400)}d`;
}

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.small,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  icon: {
    marginRight: Spacing.small,
  },
  title: {
    ...Typography.body,
    color: Colors.text,
    flex: 1,
  },
  delta: {
    ...Typography.body,
    color: Colors.text,
    opacity: Opacity.muted,
    marginLeft: Spacing.small,
  },
  time: {
    ...Typography.caption,
    color: Colors.text,
    opacity: Opacity.muted,
    marginTop: Spacing.tiny,
  },
});

