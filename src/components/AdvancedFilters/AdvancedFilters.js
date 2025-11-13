// [MB] Modulo: Tasks / Seccion: Filtros avanzados
// Afecta: TaskFilters (modal de filtros)
// Proposito: Ajustar estilo y accesibilidad de los filtros avanzados
// Puntos de edicion futura: tokens de color y animaciones
// Autor: Codex - Fecha: 2025-10-20

import React, { useState, useEffect } from "react";
import { View, Text, Pressable, ScrollView, TextInput } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./AdvancedFilters.styles";
import { Colors, Spacing } from "../../theme";

// Utilidad para aplicar alpha a un color hex.
function withAlpha(hex, alpha) {
  const clean = hex.replace("#", "");
  const rgb = clean.length === 8 ? clean.slice(0, 6) : clean;
  const a = Math.round(alpha * 255)
    .toString(16)
    .padStart(2, "0");
  return `#${rgb}${a}`;
}

/**
 * Renderiza la cuadrícula de elementos.
 * Controla la sección "Elemento" del modal.
 */
function renderElementGrid(options, activeKey, setActive, overrideStyle) {
  return (
    <View style={styles.elementGrid}>
      {options.map((opt) => {
        const isActive = activeKey === opt.key;
        return (
          <Pressable
            key={opt.key}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            style={({ pressed }) => [
              styles.elementGridBtn,
              overrideStyle,
              { borderColor: opt.color },
              isActive && { backgroundColor: withAlpha(opt.color, 0.2) },
              pressed && styles.pressed,
            ]}
            onPress={() => setActive(opt.key)}
          >
            {opt.icon && (
              <FontAwesome5 name={opt.icon} size={18} color={opt.color} />
            )}
            <Text style={[styles.text, { color: opt.color }]}>{opt.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/**
 * Renderiza una fila completa de botones.
 * Se utiliza para secciones como "Prioridad" y "Dificultad" del modal.
 */
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
          <Pressable
            key={opt.key}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            style={({ pressed }) => [
              baseStyle,
              overrideStyle,
              {
                flex: 1,
                marginRight: index === options.length - 1 ? 0 : Spacing.small,
                borderColor: opt.color,
              },
              isActive && { backgroundColor: withAlpha(opt.color, 0.2) },
              pressed && styles.pressed,
            ]}
            onPress={() => setActive(opt.key)}
          >
            {opt.icon && (
              <FontAwesome5 name={opt.icon} size={14} color={opt.color} />
            )}
            <Text style={[styles.text, !opt.icon && styles.centerText, { color: opt.color }]}>
              {opt.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/**
 * Renderiza la fila horizontal de etiquetas.
 * Controla la sección "Etiquetas" del modal.
 */
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
          <Pressable
            key={opt.key}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            style={({ pressed }) => [
              baseStyle,
              overrideStyle,
              { borderColor: opt.color },
              isActive && { backgroundColor: withAlpha(opt.color, 0.2) },
              pressed && styles.pressed,
            ]}
            onPress={() => setActive(opt.key)}
          >
            <Text style={[styles.tagText, { color: opt.color }]}>{opt.label}</Text>
          </Pressable>
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
    <View
      style={styles.container}
      accessible={true}
      accessibilityViewIsModal={true}
      accessibilityLabel="Filtros avanzados"
    >
      {/* Sección del modal para seleccionar el elemento del hechizo */}
      <Text style={styles.sectionTitle}>Elemento</Text>
      {renderElementGrid(
        elementOptions,
        elementFilter,
        setElementFilter,
        elementBtnStyle
      )}
      {/* Sección del modal para ajustar la prioridad */}
      <Text style={styles.sectionTitle}>Prioridad</Text>
      {renderFullRow(
        priorityOptions,
        priorityFilter,
        setPriorityFilter,
        styles.priorityBtn,
        priorityBtnStyle
      )}
      {/* Sección del modal para definir la dificultad */}
      <Text style={styles.sectionTitle}>Dificultad</Text>
      {renderFullRow(
        difficultyOptions,
        difficultyFilter,
        setDifficultyFilter,
        styles.difficultyBtn,
        difficultyBtnStyle
      )}
      {/* Sección del modal para filtrar por etiquetas */}
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
          placeholderTextColor={Colors.textMuted}
          value={tagSearch}
          onChangeText={setTagSearch}
          onFocus={() => setTagSearchFocused(true)}
          onBlur={() => setTagSearchFocused(false)}
        />
        {tagSearch.length > 0 && (
          <Pressable
            onPress={() => setTagSearch("")}
            style={({ pressed }) => [styles.clearBtn, pressed && styles.pressed]}
            accessibilityRole="button"
          >
            <FontAwesome5 name="times" size={14} color={Colors.text} />
          </Pressable>
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

