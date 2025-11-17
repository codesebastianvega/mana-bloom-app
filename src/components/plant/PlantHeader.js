// [MB] Módulo: Planta / Sección: Header diario
// Afecta: PlantScreen (cabecera principal)
// Propósito: resumir misión, clima y agenda alineados al hero edge-to-edge
// Puntos de edición futura: conectar con recordatorios reales y CTA
// Autor: Codex - Fecha: 2025-11-17

import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Spacing } from "../../theme";
import styles from "./PlantHeader.styles";

export default function PlantHeader({
  name,
  onRename,
  mission,
  stageLabel,
  ritualTargets,
  agendaItems = [],
  onAddReminder,
  onToggleReminder,
}) {
  const [reminderExpanded, setReminderExpanded] = useState(false);
  const agendaPreview = agendaItems.slice(0, 4);

  return (
    <View style={styles.container} accessibilityRole="header">
      <View style={styles.identityWrapper}>
        <LinearGradient
          colors={[
            "rgba(120,110,255,0.35)",
            "rgba(94,168,255,0.22)",
            "rgba(52,250,195,0.18)",
            "rgba(18,10,28,0.65)",
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.identityGradient}
        >
          <View style={styles.identityRow}>
            <View style={styles.identityBlock}>
              <View style={styles.nameStack}>
                <Text style={styles.name} numberOfLines={1}>
                  {name}
                </Text>
                <View style={styles.stageChips}>
                  <Text style={styles.stageLabel}>{stageLabel}</Text>
                  {ritualTargets ? (
                    <Text style={styles.ritualTarget}>{ritualTargets}</Text>
                  ) : null}
                </View>
              </View>
            </View>
          </View>

          {mission ? (
            <Text style={styles.missionText} numberOfLines={2}>
              {mission}
            </Text>
          ) : null}

          <View style={styles.reminderHeader}>
            <Text style={styles.reminderTitle}>Recordatorios</Text>
            <View style={styles.reminderHeaderActions}>
              <Pressable
                onPress={() => setReminderExpanded((prev) => !prev)}
                style={styles.toggleBtn}
                accessibilityRole="button"
                accessibilityLabel="Mostrar u ocultar recordatorios"
              >
                <FontAwesome5
                  name={reminderExpanded ? "chevron-up" : "chevron-down"}
                  size={12}
                  color={Colors.text}
                />
              </Pressable>
              <Pressable
                onPress={onAddReminder}
                style={styles.reminderBtn}
                accessibilityRole="button"
                accessibilityLabel="Crear recordatorio"
              >
                <FontAwesome5 name="plus" size={12} color={Colors.text} />
                <Text style={styles.reminderBtnLabel}>Nuevo</Text>
              </Pressable>
            </View>
          </View>

          {reminderExpanded ? (
            agendaPreview.length ? (
              <View style={styles.reminderList}>
                {agendaPreview.map((item) => (
                  <View key={item.id} style={styles.reminderListItem}>
                    <Pressable
                      onPress={() => onToggleReminder?.(item.id, !item.completed)}
                      style={[
                        styles.reminderCheckbox,
                        item.completed && styles.reminderCheckboxChecked,
                      ]}
                      accessibilityRole="checkbox"
                      accessibilityState={{ checked: item.completed }}
                    >
                      {item.completed ? (
                        <FontAwesome5 name="check" size={10} color={Colors.background} />
                      ) : null}
                    </Pressable>
                    <View style={styles.reminderListBody}>
                      <View style={styles.reminderTimeRow}>
                        <Text style={styles.agendaTime}>{item.timeLabel}</Text>
                        <Text style={styles.agendaImpact}>{item.impact}</Text>
                      </View>
                      <Text
                        style={[
                          styles.agendaAction,
                          item.completed && styles.reminderDoneText,
                        ]}
                        numberOfLines={2}
                      >
                        {item.label}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.agendaEmpty}>No tienes recordatorios aún. Toca “Nuevo”.</Text>
            )
          ) : null}
        </LinearGradient>
      </View>
    </View>
  );
}
