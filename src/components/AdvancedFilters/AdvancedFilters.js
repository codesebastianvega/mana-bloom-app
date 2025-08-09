// src/components/AdvancedFilters/AdvancedFilters.js

import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./AdvancedFilters.styles";
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

export default function AdvancedFilters({
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
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filtros avanzados</Text>
      {renderRow(
        elementOptions,
        elementFilter,
        setElementFilter,
        styles.elementBtn,
        elementBtnStyle
      )}
      {renderRow(
        priorityOptions,
        priorityFilter,
        setPriorityFilter,
        styles.priorityBtn,
        priorityBtnStyle
      )}
      {renderRow(
        difficultyOptions,
        difficultyFilter,
        setDifficultyFilter,
        styles.difficultyBtn,
        difficultyBtnStyle
      )}
      {renderRow(
        tags.map((tag) => ({ key: tag, label: tag, color: Colors.accent })),
        tagFilter,
        setTagFilter,
        styles.tagBtn,
        tagBtnStyle
      )}
    </View>
  );
}
