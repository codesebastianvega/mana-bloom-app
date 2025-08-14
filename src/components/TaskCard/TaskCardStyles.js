// [MB] Módulo: Tasks / Sección: Tarjeta de tarea
// Afecta: TaskCard
// Propósito: estilos de tarjeta y chips
// Puntos de edición futura: animaciones y badges
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation, Typography } from "../../theme";

export default StyleSheet.create({
  container: {},
  actionsOverlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: "row",
  },
  rightAction: {
    position: "absolute",
    top: Spacing.tiny,
    bottom: Spacing.tiny,
    left: Spacing.tiny,
    borderRadius: Spacing.small,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 170, // ancho mínimo más largo
    minHeight: 50, // alto mínimo más alto
  },
  leftAction: {
    position: "absolute",
    top: Spacing.tiny,
    bottom: Spacing.tiny,
    right: Spacing.tiny,
    borderRadius: Spacing.small,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 140, // ancho mínimo más largo
    minHeight: 60, // alto mínimo más alto
  },
  actionText: {
    color: Colors.background,
    fontWeight: "600",
    marginTop: Spacing.tiny,
    fontSize: 12,
  },
  card: {
    width: "100%",
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.lg,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.large,
    marginBottom: Spacing.tiny,

    flexDirection: "column",
    gap: Spacing.tiny,
    ...Elevation.card,
  },
  accentBar: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: Spacing.tiny,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
  },
  note: {
    ...Typography.body,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
    marginBottom: Spacing.tiny,
  },
  textCompleted: {
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },
  subtaskToggle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.tiny,
    marginBottom: Spacing.tiny,
    paddingHorizontal: Spacing.tiny,
  },
  subtaskToggleText: {
    color: Colors.textMuted,
    marginLeft: Spacing.small,
    fontSize: 12,
    marginBottom: Spacing.tiny,
  },
  subtaskList: {
    marginTop: 1,
    marginBottom: Spacing.tiny,
    paddingRight: Spacing.large,
    paddingVertical: Spacing.tiny,
    backgroundColor: Colors.surface,
    borderRadius: Radii.sm,
    paddingLeft: Spacing.small,
  },
  subtaskColumns: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  subtaskColumn: {
    flex: 1,
  },
  subtaskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.tiny,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: Colors.text,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
  subtaskText: {
    color: Colors.textMuted,
    marginLeft: Spacing.small,
    fontSize: 13,
  },
  subtaskTextCompleted: {
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },

  metaRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  labelRow: {
    marginTop: Spacing.tiny,
  },
  elementChip: {
    width: 24,
    height: 24,
    borderRadius: Radii.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  chip: {
    minHeight: 24,
    paddingHorizontal: Spacing.small,
    borderRadius: Radii.pill,
    justifyContent: "center",
    alignItems: "center",
  },
  chipText: {
    ...Typography.caption,
    lineHeight: Typography.caption.fontSize,
    color: Colors.text,
  },
  priorityChip: {
    borderWidth: StyleSheet.hairlineWidth,
  },
  tagChip: {
    backgroundColor: Colors.surface,
    transform: [{ scale: 0.95 }],
  },
  priorityChipText: {
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
