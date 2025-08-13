// [MB] Módulo: Home / Sección: Encabezado
// Afecta: HomeScreenHeader
// Propósito: Estilos para título y pills de recursos
// Puntos de edición futura: ajustar tokens y responsive wrap
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../theme";

export default StyleSheet.create({
  container: {
    backgroundColor: Colors.surface,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...Typography.h1,
    color: Colors.text,
  },
  plantStatus: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.small,
  },
  iconBackground: {
    padding: Spacing.tiny,
    borderRadius: 8,
    marginRight: Spacing.small,
  },
  statusText: {
    color: Colors.text,
    fontSize: 16,
  },
  statusContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    columnGap: Spacing.tiny,
    rowGap: Spacing.tiny,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.surfaceElevated || Colors.surface,
    borderColor: `${Colors.accent}55`,
    borderWidth: 1,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.base,
    height: 28,
    gap: Spacing.tiny,
  },
  pillText: {
    ...Typography.caption,
    color: Colors.text,
  },
});
