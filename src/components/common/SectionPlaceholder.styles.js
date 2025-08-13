// [MB] Módulo: Común / Componente: SectionPlaceholder.styles
// Afecta: SectionPlaceholder
// Propósito: Estilos base del placeholder de sección
// Puntos de edición futura: parametrizar colores según tema
// Autor: Codex - Fecha: 2025-08-31

import { StyleSheet } from "react-native";
import { Colors, Radii } from "../../theme";

export default StyleSheet.create({
  placeholder: {
    backgroundColor: Colors.surface,
    opacity: 0.5,
    borderRadius: Radii.lg,
  },
});
