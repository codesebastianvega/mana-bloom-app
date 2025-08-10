// src/components/TaskFilters/TaskFilters.js

import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Collapsible from "react-native-collapsible";
import styles from "./TaskFilters.styles";
import { Colors } from "../../theme";

function renderRow(options, activeKey, setActive, baseStyle, overrideStyle) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.row}
    >
      {options.map((opt) => {
        const isActive = activeKey === opt.key;
        return (
          <TouchableOpacity
            key={opt.key}
            style={[
              baseStyle,
              overrideStyle,
              isActive && {
                backgroundColor: opt.color,
                borderColor: opt.color,
              },
            ]}
            onPress={() => setActive(opt.key)}
          >
            {opt.icon && (
              <FontAwesome5
                name={opt.icon}
                size={14}
                color={isActive ? Colors.background : opt.color}
              />
            )}
            <Text
              style={[
                styles.text,
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
  elementBtnStyle,
  priorityBtnStyle,
  difficultyBtnStyle,
  tagBtnStyle,
}) {
  const [elementExpanded, setElementExpanded] = useState(false);
  const [priorityExpanded, setPriorityExpanded] = useState(false);
  const [difficultyExpanded, setDifficultyExpanded] = useState(false);
  const [tagsExpanded, setTagsExpanded] = useState(false);

  const renderSection = (title, expanded, toggle, content) => (
    <View style={styles.section}>
      <TouchableOpacity style={styles.sectionHeader} onPress={toggle}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <FontAwesome5
          name={expanded ? "chevron-up" : "chevron-down"}
          size={12}
          color={Colors.text}
        />
      </TouchableOpacity>
      <Collapsible collapsed={!expanded}>{content}</Collapsible>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtros avanzados</Text>
      {renderSection(
        "Elemento",
        elementExpanded,
        () => setElementExpanded(!elementExpanded),
        renderRow(
          elementOptions,
          elementFilter,
          setElementFilter,
          styles.elementBtn,
          elementBtnStyle
        )
      )}
      {renderSection(
        "Prioridad",
        priorityExpanded,
        () => setPriorityExpanded(!priorityExpanded),
        renderRow(
          priorityOptions,
          priorityFilter,
          setPriorityFilter,
          styles.priorityBtn,
          priorityBtnStyle
        )
      )}
      {renderSection(
        "Dificultad",
        difficultyExpanded,
        () => setDifficultyExpanded(!difficultyExpanded),
        renderRow(
          difficultyOptions,
          difficultyFilter,
          setDifficultyFilter,
          styles.difficultyBtn,
          difficultyBtnStyle
        )
      )}
      {renderSection(
        "Etiquetas",
        tagsExpanded,
        () => setTagsExpanded(!tagsExpanded),
        renderRow(
          tags.map((tag) => ({ key: tag, label: tag, color: Colors.accent })),
          tagFilter,
          setTagFilter,
          styles.tagBtn,
          tagBtnStyle
        )
      )}
    </View>
  );
}
