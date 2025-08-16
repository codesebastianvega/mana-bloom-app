// [MB] Módulo: Planta / Sección: Header compacto
// Afecta: PlantScreen (cabecera principal)
// Propósito: agrupar nombre editable, salud/ánimo y economía
// Puntos de edición futura: mover cálculo de salud o estilos a .styles.js
// Autor: Codex - Fecha: 2025-08-16

import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Animated,
  AccessibilityInfo,
} from "react-native";
import ResourceCapsules from "../economy/ResourceCapsules";
import StreakChip from "../economy/StreakChip";
import HealthChip from "./HealthChip";
import MoodChip from "./MoodChip";
import {
  Colors,
  Spacing,
  Radii,
  Typography,
  Elevation,
} from "../../theme";

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
          <View style={{ width: Spacing.base }} />
          <MoodChip value={mood} />
        </View>
      </View>
      <View style={styles.bottomRow}>
        {/* [MB] Economía reubicada dentro del header */}
        <View style={styles.capsules}>
          <ResourceCapsules
            mana={mana}
            coins={coins}
            gems={gems}
            txn={txn}
            insufficient={insufficient}
          />
        </View>
        <View style={styles.streakItem}>
          <StreakChip days={streakDays} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.lg,
    padding: Spacing.large,
    ...Elevation.card,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  nameWrap: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: Spacing.base,
  },
  name: {
    ...Typography.h2,
    color: Colors.text,
    flexShrink: 1,
  },
  nameInput: {
    ...Typography.h2,
    color: Colors.text,
    flex: 1,
  },
  editBtn: {
    marginLeft: Spacing.small,
  },
  editIcon: {
    fontSize: Typography.body.fontSize,
    color: Colors.text,
  },
  chips: {
    flexDirection: "row",
    alignItems: "center",
  },
  bottomRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: Spacing.base,
  },
  capsules: {
    marginRight: Spacing.base,
    marginBottom: Spacing.small,
  },
  streakItem: {
    marginBottom: Spacing.small,
  },
});

