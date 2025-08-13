// [MB] Módulo: Común / Componente: SectionPlaceholder
// Afecta: Secciones con carga diferida
// Propósito: Placeholder rectangular durante hidratación de módulo
// Puntos de edición futura: reemplazar con skeletons animados
// Autor: Codex - Fecha: 2025-08-31

import React from "react";
import { View } from "react-native";
import styles from "./SectionPlaceholder.styles";

export default function SectionPlaceholder({ height = 120 }) {
  return <View style={[styles.placeholder, { height }]} />;
}
