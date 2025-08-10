import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import FilterBar from "./FilterBar/FilterBar";
import AdvancedFilters from "./AdvancedFilters/AdvancedFilters";
import { Colors, Spacing } from "../theme";

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
        <TouchableOpacity style={[styles.button, styles.apply]} onPress={onApply}>
          <Text style={styles.buttonText}>Aplicar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.reset]} onPress={onReset}>
          <Text style={styles.buttonText}>Resetear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  closeBtn: {
    alignSelf: "flex-end",
    padding: Spacing.tiny,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.base,
  },
  button: {
    flex: 1,
    padding: Spacing.small,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: Spacing.tiny,
  },
  apply: {
    backgroundColor: Colors.primary,
  },
  reset: {
    backgroundColor: Colors.danger,
  },
  buttonText: {
    color: Colors.background,
    fontWeight: "600",
  },
});
