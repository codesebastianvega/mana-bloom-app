// [MB] FiltersHeader — bloque de tabs y buscador
// [MB] Módulo: Tasks / Sección: Encabezado de filtros
// Afecta: TasksScreen (bloque sticky de filtros)
// Propósito: Agrupar tabs de estado y barra de búsqueda
// Puntos de edición futura: animaciones y estados vacíos
// Autor: Codex - Fecha: 2025-08-14

import React from "react";
import { View } from "react-native";
import TaskFilterBar from "../TaskFilterBar/TaskFilterBar";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./FiltersHeader.styles";

export default function FiltersHeader({
  statusFilters,
  activeFilter,
  onSelectFilter,
  searchQuery,
  onChangeSearch,
  onToggleAdvanced,
}) {
  return (
    <View style={styles.container} accessibilityRole="header">
      <TaskFilterBar filters={statusFilters} active={activeFilter} onSelect={onSelectFilter} />
      <SearchBar
        value={searchQuery}
        onChange={onChangeSearch}
        onToggleAdvanced={onToggleAdvanced}
      />
    </View>
  );
}
