// [MB] Módulo: Planta / Sección: Pantalla principal (Estilos)
// Afecta: PlantScreen
// Propósito: Estilos base para layout de la planta
// Puntos de edición futura: ajustar padding y disposición
// Autor: Codex - Fecha: 2025-08-16

import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    padding: Spacing.large,
    paddingBottom: Spacing.large * 3,
    gap: Spacing.xlarge,
  },
});

