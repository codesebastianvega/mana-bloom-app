// [MB] Modulo: Home / Seccion: Inventario (Estilos)
// Afecta: HomeScreen
// Proposito: Estilos para resumen de inventario compacto
// Puntos de edicion futura: responsivo y variantes de color
// Autor: Codex - Fecha: 2025-10-15

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default StyleSheet.create({
  container: {
    marginHorizontal: -Spacing.base,
    paddingHorizontal: Spacing.base * 1.5,
    paddingVertical: Spacing.large,
    gap: Spacing.base,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  pressableTile: {
    flexBasis: "48%",
    borderRadius: Radii.lg,
  },
  tilePressed: {
    opacity: 0.85,
  },
  tile: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    backgroundColor: Colors.surfaceAlt,
    borderColor: Colors.border,
    gap: Spacing.tiny,
  },
  tileLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  tileValue: {
    ...Typography.title,
    fontSize: 20,
    fontWeight: "700",
  },
  tileCta: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  emptyState: {
    alignItems: "center",
    gap: Spacing.small,
  },
  emptyText: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: "center",
  },
  emptyLink: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surfaceAlt,
  },
  emptyLinkText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  emptyLinkIcon: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "600",
  },
});
