// [MB] Módulo: Tasks / Sección: Filtros avanzados
// Afecta: TaskFilters (modal de filtros)
// Propósito: Tabs y acciones con estilo del tema
// Puntos de edición futura: animaciones y validaciones
// Autor: Codex - Fecha: 2025-08-13

import React, { useState } from "react";
import { View, Pressable, Text } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import FilterBar from "./FilterBar/FilterBar";
import AdvancedFilters from "./AdvancedFilters/AdvancedFilters";
import styles from "./TaskFilters.styles";
import { Colors } from "../theme";

export default function TaskFilters({
  filters = [],
  elementOptions = [],
  priorityOptions = [],
  difficultyOptions = [],
  tags = [],
  onSelect,
  onClose,
}) {
  const [active, setActive] = useState("all");
  const [elementFilter, setElementFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [difficultyFilter, setDifficultyFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");

  const onApply = () => {
    if (onSelect) {
      onSelect({
        active,
        elementFilter,
        priorityFilter,
        difficultyFilter,
        tagFilter,
      });
    }
  };

  const onReset = () => {
    setActive("all");
    setElementFilter("all");
    setPriorityFilter("all");
    setDifficultyFilter("all");
    setTagFilter("all");
    if (onSelect) {
      onSelect({
        active: "all",
        elementFilter: "all",
        priorityFilter: "all",
        difficultyFilter: "all",
        tagFilter: "all",
      });
    } else if (onClose) {
      onClose();
    }
  };

  return (
    <View>
      {/* Sección de cierre del modal */}
      {onClose && (
        <Pressable
          style={styles.closeBtn}
          onPress={onClose}
          accessibilityRole="button"
        >
          <FontAwesome5 name="times" size={16} color={Colors.text} />
        </Pressable>
      )}
      {/* Barra superior con filtros rápidos */}
      <Text style={styles.title}>Filtros avanzados</Text>
      <FilterBar filters={filters} active={active} onSelect={setActive} />
      {/* Filtros avanzados del modal */}
      <AdvancedFilters
        elementOptions={elementOptions}
        elementFilter={elementFilter}
        setElementFilter={setElementFilter}
        priorityOptions={priorityOptions}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
        difficultyOptions={difficultyOptions}
        difficultyFilter={difficultyFilter}
        setDifficultyFilter={setDifficultyFilter}
        tags={tags}
        tagFilter={tagFilter}
        setTagFilter={setTagFilter}
      />
      {/* Botones de acción para aplicar o resetear los filtros */}
      <View style={styles.actions}>
        <Pressable
          style={styles.primaryButton}
          onPress={onApply}
          accessibilityRole="button"
        >
          <Text style={styles.primaryButtonLabel}>Aplicar filtros</Text>
        </Pressable>
        <Pressable
          style={styles.secondaryButton}
          onPress={onReset}
          accessibilityRole="button"
        >
          <Text style={styles.secondaryButtonLabel}>Limpiar</Text>
        </Pressable>
      </View>
    </View>
  );
}
