import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
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
  };

  return (
    <View>
      {onClose && (
        <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
          <FontAwesome5 name="times" size={16} color={Colors.text} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>Filtros avanzados</Text>
      <FilterBar filters={filters} active={active} onSelect={setActive} />
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
      <View style={styles.buttons}>
        {/* styles.apply controla el botón "Aplicar" */}
        <TouchableOpacity style={[styles.button, styles.apply]} onPress={onApply}>
          <Text style={styles.buttonText}>Aplicar</Text>
        </TouchableOpacity>
        {/* styles.reset controla el botón "Resetear" */}
        <TouchableOpacity style={[styles.button, styles.reset]} onPress={onReset}>
          <Text style={styles.buttonText}>Resetear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
