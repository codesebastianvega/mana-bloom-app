// [MB] Módulo: Noticias / Pantalla: NewsInboxScreen
// Afecta: HomeScreen (modal de noticias)
// Propósito: mostrar bandeja de noticias
// Puntos de edición futura: estilos dedicados y conexión real
// Autor: Codex - Fecha: 2025-08-19

import React from "react";
import { SafeAreaView, Text } from "react-native";
import { Colors, Spacing } from "../theme";

export default function NewsInboxScreen() {
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: Colors.background, padding: Spacing.base }}
    >
      <Text style={{ color: Colors.text }}>Bandeja de noticias</Text>
    </SafeAreaView>
  );
}
