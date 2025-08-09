// src/components/AdvancedFilters/AdvancedFilters.js

import React from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./AdvancedFilters.styles";
import { Colors } from "../../theme";

// Puedes sobrescribir el estilo de los botones de cada sección pasando
// las props opcionales: elementBtnStyle, priorityBtnStyle,
// difficultyBtnStyle y tagBtnStyle.
export default function AdvancedFilters({
  elementOptions,
  elementFilter,
  setElementFilter,
  priorityOptions,
  priorityFilter,
  setPriorityFilter,
  difficultyOptions,
  difficultyFilter,
  setDifficultyFilter,
  tags,
  tagFilter,
  setTagFilter,
  // Estilos personalizados opcionales para cada sección
  elementBtnStyle,
  priorityBtnStyle,
  difficultyBtnStyle,
  tagBtnStyle,
}) {
  return (
    <View style={styles.container}>
      {/* Elementos */}
      <Text style={styles.title}>Elemento</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.row}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {elementOptions.map((el) => {
          const isActive = elementFilter === el.key;
          return (
            <TouchableOpacity
              key={el.key}
codex/add-optional-props-for-button-styles
              style={[
                styles.elementBtn,
                elementBtnStyle,
                isActive && { backgroundColor: el.color },
              ]}
              onPress={() => setElementFilter(isActive ? "all" : el.key)}
            >
              <FontAwesome5
                name={el.icon}
                size={14}
                color={isActive ? Colors.background : el.color}
              />
              <Text
                style={[styles.text, isActive && { color: Colors.background }]}
              >
                {el.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Prioridad */}
      <Text style={styles.title}>Prioridad</Text>
      <View style={styles.row}>
        {priorityOptions.map((opt) => {
          const isActive = priorityFilter === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              style={[
                styles.priorityBtn,
                priorityBtnStyle,
                isActive && { backgroundColor: opt.color },
              ]}

              onPress={() => setPriorityFilter(isActive ? "all" : opt.key)}
            >
              <Text
                style={[styles.text, isActive && { color: Colors.background }]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Dificultad */}
      <Text style={styles.title}>Dificultad</Text>
      <View style={styles.row}>
        {difficultyOptions.map((opt) => {
          const isActive = difficultyFilter === opt.key;
          return (
            <TouchableOpacity
              key={opt.key}
              style={[
                styles.difficultyBtn,
                difficultyBtnStyle,
                isActive && {
                  backgroundColor: opt.color,
                  borderColor: opt.color,
                },
              ]}
              onPress={() => setDifficultyFilter(isActive ? "all" : opt.key)}
            >
              <Text
                style={[styles.text, isActive && { color: Colors.background }]}
              >
                {opt.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Etiquetas */}
      <Text style={styles.title}>Etiquetas</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.row}
        contentContainerStyle={{ alignItems: "center" }}
      >
        {tags.map((tag) => {
          const isActive = tagFilter === tag;
          return (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tagBtn,
                tagBtnStyle,
                isActive && { backgroundColor: Colors.accent },
              ]}
              onPress={() => setTagFilter(isActive ? "all" : tag)}
            >
              <Text
                style={[styles.text, isActive && { color: Colors.background }]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}
