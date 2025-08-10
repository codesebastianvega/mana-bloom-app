// src/components/TaskFilters/TaskFilters.js

import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { FontAwesome5, FontAwesome } from "@expo/vector-icons";
import styles from "./TaskFilters.styles";
import { Colors } from "../../theme";

function renderRow(options, activeKey, setActive) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.row}
    >
      {options.map((opt) => {
        const isActive = activeKey === opt.key;
        const IconComp = opt.iconLibrary === "fa" ? FontAwesome : FontAwesome5;
        const color = opt.color || Colors.text;
        return (
          <TouchableOpacity
            key={opt.key}
            style={[
              styles.btn,
              isActive && {
                backgroundColor: color,
                borderColor: color,
              },
            ]}
            onPress={() => setActive(opt.key)}
          >
            {opt.icon && (
              <IconComp
                name={opt.icon}
                size={14}
                color={isActive ? Colors.background : color}
              />
            )}
            <Text
              style={[
                styles.text,
                opt.icon && { marginLeft: 4 },
                isActive && { color: Colors.background },
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

export default function TaskFilters({
  filters = [],
  active,
  onSelect,
  elementOptions = [],
  elementFilter,
  setElementFilter,
  priorityOptions = [],
  priorityFilter,
  setPriorityFilter,
  difficultyOptions = [],
  difficultyFilter,
  setDifficultyFilter,
  tags = [],
  tagFilter,
  setTagFilter,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estado</Text>
        {renderRow(
          filters.map((f) => ({
            ...f,
            iconLibrary: ["single", "completed", "deleted"].includes(f.key)
              ? "fa"
              : "fa5",
          })),
          active,
          onSelect
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Elemento</Text>
        {renderRow(elementOptions, elementFilter, setElementFilter)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Prioridad</Text>
        {renderRow(priorityOptions, priorityFilter, setPriorityFilter)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dificultad</Text>
        {renderRow(difficultyOptions, difficultyFilter, setDifficultyFilter)}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Etiquetas</Text>
        {renderRow(
          tags.map((tag) => ({ key: tag, label: tag, color: Colors.accent })),
          tagFilter,
          setTagFilter
        )}
      </View>
    </View>
  );
}
