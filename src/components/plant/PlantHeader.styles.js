// [MB] Módulo: Planta / Sección: Header compacto
// Afecta: PlantHeader
// Propósito: Estilos separados para la cabecera de planta
// Puntos de edición futura: ajustar padding, radii y fila de recursos
// Autor: Codex - Fecha: 2025-08-16

import { StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Typography,
  Elevation,
} from "../../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.md,
    padding: Spacing.base,
    ...Elevation.card,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  nameWrap: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: Spacing.base,
  },
  name: {
    ...Typography.h2,
    color: Colors.text,
    flexShrink: 1,
  },
  nameInput: {
    ...Typography.h2,
    color: Colors.text,
    flex: 1,
  },
  editBtn: {
    marginLeft: Spacing.small,
  },
  editIcon: {
    fontSize: Typography.body.fontSize,
    color: Colors.text,
  },
  chips: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  bottomRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    marginTop: Spacing.base,
    justifyContent: "space-between",
    gap: Spacing.small,
  },
});
