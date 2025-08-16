// [MB] Módulo: Planta / Sección: Header compacto
// Afecta: PlantScreen (cabecera principal)
// Propósito: agrupar nombre editable, salud/ánimo y economía
// Puntos de edición futura: ajuste de estilos en PlantHeader.styles.js o cálculo de salud
// Autor: Codex - Fecha: 2025-08-16

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Animated,
  AccessibilityInfo,
} from "react-native";
import ResourceCapsules from "../economy/ResourceCapsules";
import StreakChip from "../economy/StreakChip";
import HealthChip from "./HealthChip";
import MoodChip from "./MoodChip";
import { Spacing } from "../../theme";
import styles from "./PlantHeader.styles";

// [MB] Helpers de salud y estados
const clamp01 = (n) => Math.max(0, Math.min(1, n ?? 0));
const calcHealth = (w, l, n) => {
  const vals = [w, l, n].map(clamp01);
  return (vals[0] + vals[1] + vals[2]) / 3;
};

export default function PlantHeader({
  name,
  onRename,
  water,
  light,
  nutrients,
  mood,
  mana,
  coins,
  gems,
  streakDays,
  txn,
  insufficient,
}) {
  const [isEditing, setIsEditing] = useState(false); // [MB] Control de modo edición
  const [draftName, setDraftName] = useState(name);
  const scale = useRef(new Animated.Value(1)).current; // [MB] animación al guardar

  const health = calcHealth(water, light, nutrients); // [MB] salud derivada de métricas

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
      Animated.timing(scale, { toValue: 1.02, duration: 70, useNativeDriver: true }),
      Animated.timing(scale, { toValue: 1, duration: 70, useNativeDriver: true }),
    ]).start();
  };

  return (
    <View
      style={styles.container}
      accessibilityRole="header"
      accessibilityLabel="Cabecera de la planta"
    >
      <View style={styles.topRow}>
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
            <>
              <Animated.Text
                style={[styles.name, { transform: [{ scale }] }]}
                numberOfLines={2}
              >
                {name}
              </Animated.Text>
              <Pressable
                onPress={handleStartEdit}
                hitSlop={Spacing.large}
                accessibilityRole="button"
                accessibilityLabel="Editar nombre de la planta"
                style={styles.editBtn}
              >
                <Text style={styles.editIcon}>✏️</Text>
              </Pressable>
            </>
          )}
        </View>
        <View style={styles.chips}>
          <HealthChip value={health} />
          <MoodChip value={mood} />
        </View>
      </View>
      <View style={styles.bottomRow}>
        {/* [MB] Economía reubicada dentro del header */}
        <ResourceCapsules
          mana={mana}
          coins={coins}
          gems={gems}
          txn={txn}
          insufficient={insufficient}
        />
        <StreakChip days={streakDays} />
      </View>
    </View>
  );
}

