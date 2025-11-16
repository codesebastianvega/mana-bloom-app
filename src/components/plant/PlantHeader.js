// [MB] Módulo: Planta / Sección: Header diario
// Afecta: PlantScreen (cabecera principal)
// Propósito: resumir misión del día, agenda y clima sin duplicar el hero
// Puntos de edición futura: conectar con recordatorios reales y UI de CTA
// Autor: Codex - Fecha: 2025-11-13

import React, { useState, useRef } from "react";
import { View, Text, TextInput, Pressable, Animated, AccessibilityInfo } from "react-native";
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
  climateInfo,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const scale = useRef(new Animated.Value(1)).current;
  const [agendaExpanded, setAgendaExpanded] = useState(false);

  const temperatureDisplay =
    typeof climateInfo?.tempC === "number"
      ? `${Math.round(climateInfo.tempC)}°`
      : "—";
  const agendaPreview = agendaItems.slice(0, 3);

  const handleStartEdit = () => {
    setDraftName(name);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setDraftName(name);
    setIsEditing(false);
  };

  const handleSubmit = () => {
    const next = draftName.trim().slice(0, 40);
    if (!next) {
      handleCancel();
      return;
    }
    if (next !== name) {
      onRename && onRename(next);
      AccessibilityInfo.announceForAccessibility?.(
        "Nombre de planta actualizado a " + next
      );
    }
    setIsEditing(false);
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1.02,
        duration: 90,
        useNativeDriver: true,
      }),
      Animated.timing(scale, { toValue: 1, duration: 90, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View style={styles.wrapper} accessibilityRole="header">
      <LinearGradient
        colors={[Colors.surfaceElevated, Colors.surface]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientBg}
      >
        <View style={styles.titleRow}>
          <View style={styles.nameWrap}>
            {isEditing ? (
              <TextInput
                value={draftName}
                onChangeText={setDraftName}
                maxLength={40}
                style={styles.nameInput}
                autoFocus
                selectTextOnFocus
                onSubmitEditing={handleSubmit}
                onBlur={handleSubmit}
                onKeyPress={(e) => {
                  if (e.nativeEvent.key === "Escape") {
                    handleCancel();
                  }
                }}
                accessibilityLabel="Nombre de la planta"
              />
            ) : (
              <Animated.Text
                style={[styles.name, { transform: [{ scale }] }]}
                numberOfLines={2}
              >
                {name}
              </Animated.Text>
            )}
            <Pressable
              onPress={handleStartEdit}
              hitSlop={Spacing.small}
              style={styles.editBtn}
              accessibilityRole="button"
              accessibilityLabel="Editar nombre de la planta"
            >
              <Text style={styles.editIcon}>✏️</Text>
            </Pressable>
          </View>
        </View>
        <Text style={styles.mission}>{mission}</Text>
        <View style={styles.stageRow}>
          <FontAwesome5 name="seedling" size={12} color={Colors.text} style={styles.stageIcon} />
          <Text style={styles.stageLabel}>{stageLabel}</Text>
          {ritualTargets ? (
            <Text style={styles.ritualTarget}>{ritualTargets}</Text>
          ) : null}
        </View>
        <View style={styles.agendaCard}>
          <Pressable
            style={styles.agendaHeader}
            onPress={() => setAgendaExpanded((prev) => !prev)}
            accessibilityRole="button"
            accessibilityLabel="Mostrar u ocultar agenda de cuidado"
          >
            <View>
              <Text style={styles.agendaTitle}>Agenda de cuidado</Text>
              <Text style={styles.agendaSummary}>
                {agendaPreview.length === 0
                  ? "Sin recordatorios para hoy"
                  : `${agendaPreview.length} recordatorio${agendaPreview.length > 1 ? "s" : ""}`}
              </Text>
            </View>
            <FontAwesome5
              name={agendaExpanded ? "chevron-up" : "chevron-down"}
              size={12}
              color={Colors.textMuted}
            />
          </Pressable>
          {agendaExpanded && (
            <View style={styles.agendaList}>
              {agendaPreview.length === 0 ? (
                <Text style={styles.agendaEmpty}>Agrega rituales para verlos aquí.</Text>
              ) : (
                agendaPreview.map((item) => (
                  <View key={item.id} style={styles.agendaItem}>
                    <View style={styles.agendaDot} />
                    <View style={styles.agendaCopy}>
                      <Text style={styles.agendaTime}>{item.timeLabel}</Text>
                      <Text style={styles.agendaAction}>{item.label}</Text>
                    </View>
                    <Text style={styles.agendaImpact}>{item.impact}</Text>
                  </View>
                ))
              )}
            </View>
          )}
        </View>
        <View style={styles.climateRow}>
          <View style={styles.climateInfo}>
            <Text style={styles.climateEmoji}>🌤️</Text>
            <Text style={styles.climateTemp}>{temperatureDisplay}</Text>
            {climateInfo?.location ? (
              <Text style={styles.climateLocation}>{climateInfo.location}</Text>
            ) : null}
          </View>
          <Text style={styles.climateHint}>{climateInfo?.hint}</Text>
        </View>
      </LinearGradient>
    </View>
  );
}

