// src/components/AdvancedFilters/AdvancedFilters.js

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./AdvancedFilters.styles";
import { Colors, Spacing } from "../../theme";

function renderElementGrid(options, activeKey, setActive, overrideStyle) {
  return (
    <View style={styles.elementGrid}>
      {options.map((opt) => {
        const isActive = activeKey === opt.key;
        return (
          <TouchableOpacity
            key={opt.key}
            style={[
              styles.elementGridBtn,
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
                size={18}
                color={isActive ? Colors.background : opt.color}
              />
            )}
            <Text
              style={[styles.text, isActive && { color: Colors.background }]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function renderFullRow(
  options,
  activeKey,
  setActive,
  baseStyle,
  overrideStyle
) {
  return (
    <View style={styles.row}>
      {options.map((opt, index) => {
        const isActive = activeKey === opt.key;
        return (
          <TouchableOpacity
            key={opt.key}
            style={[
              baseStyle,
              overrideStyle,
              {
                flex: 1,
                marginRight: index === options.length - 1 ? 0 : Spacing.small,
              },
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
                !opt.icon && styles.centerText,
                isActive && { color: Colors.background },
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

function renderTagRow(options, activeKey, setActive, baseStyle, overrideStyle) {
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
            <Text
              style={[styles.tagText, isActive && { color: Colors.background }]}
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
  const [tagSearch, setTagSearch] = useState("");
  const [tagSearchFocused, setTagSearchFocused] = useState(false);
  const [debouncedTagSearch, setDebouncedTagSearch] = useState(tagSearch);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedTagSearch(tagSearch), 300);
    return () => clearTimeout(handler);
  }, [tagSearch]);

  const filteredTags = tags.filter((tag) =>
    tag.toLowerCase().includes(debouncedTagSearch.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Elemento</Text>
      {renderElementGrid(
        elementOptions,
        elementFilter,
        setElementFilter,
        elementBtnStyle
      )}
      <Text style={styles.sectionTitle}>Prioridad</Text>
      {renderFullRow(
        priorityOptions,
        priorityFilter,
        setPriorityFilter,
        styles.priorityBtn,
        priorityBtnStyle
      )}
      <Text style={styles.sectionTitle}>Dificultad</Text>
      {renderFullRow(
        difficultyOptions,
        difficultyFilter,
        setDifficultyFilter,
        styles.difficultyBtn,
        difficultyBtnStyle
      )}
      <Text style={styles.sectionTitle}>Etiquetas</Text>
      <View
        style={[
          styles.tagSearchContainer,
          tagSearchFocused && styles.tagSearchContainerFocused,
        ]}
      >
        <TextInput
          style={styles.tagSearchInput}
          placeholder="Buscar etiqueta"
          placeholderTextColor={Colors.text}
          value={tagSearch}
          onChangeText={setTagSearch}
          onFocus={() => setTagSearchFocused(true)}
          onBlur={() => setTagSearchFocused(false)}
        />
        {tagSearch.length > 0 && (
          <TouchableOpacity
            onPress={() => setTagSearch("")}
            style={styles.clearBtn}
          >
            <FontAwesome5 name="times" size={14} color={Colors.text} />
          </TouchableOpacity>
        )}
      </View>
      {renderTagRow(
        filteredTags.map((tag) => ({
          key: tag,
          label: tag,
          color: Colors.accent,
        })),
        tagFilter,
        setTagFilter,
        styles.tagBtn,
        tagBtnStyle
      )}
    </View>
  );
}
