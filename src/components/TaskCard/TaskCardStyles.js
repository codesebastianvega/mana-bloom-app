// [MB] TaskCardStyles — limpieza acciones, recompensas y subtareas.
// [MB] Módulo: Tasks / Sección: Tarjeta de tarea
// Afecta: TaskCard
// Propósito: estilos de tarjeta y chips
// Puntos de edición futura: animaciones y badges
// Autor: Codex - Fecha: 2025-08-14

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation, Typography } from "../../theme";

export default StyleSheet.create({
  container: {
    marginBottom: Spacing.base,
  },
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
    backgroundColor: Colors.surface,
    borderRadius: Radii.lg,
    paddingVertical: Spacing.small + Spacing.tiny,
    paddingHorizontal: Spacing.small + Spacing.tiny,
    borderLeftWidth: 3,
    flexDirection: "row",
    gap: Spacing.small,
    ...Elevation.card,
  },
  mainColumn: {
    flex: 1,
    flexDirection: "column",
    gap: Spacing.small,
  },
  rightColumn: {
    width: Spacing.base * 4 + Spacing.small,
    alignItems: "flex-end",
    gap: Spacing.small,
    paddingLeft: Spacing.small,
  },
  editButton: {
    width: Spacing.large,
    height: Spacing.large,
    borderRadius: Radii.pill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reminderButton: {
    position: "relative",
    width: Spacing.large,
    height: Spacing.large,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
  },
  badge: {
    position: "absolute",
    top: -2,
    right: -2,
    minWidth: Spacing.base,
    height: Spacing.base,
    borderRadius: Radii.pill,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    ...Typography.caption,
    fontSize: Typography.caption.fontSize - 2,
    color: Colors.onAccent,
    lineHeight: Typography.caption.fontSize,
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
    fontSize: Typography.caption.fontSize + 1,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
    marginBottom: Spacing.tiny,
  },
  textCompleted: {
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },
  subtaskHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.tiny,
    marginBottom: Spacing.tiny,
  },
  subtaskToggle: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtaskToggleText: {
    color: Colors.secondary,
    marginLeft: Spacing.small,
    fontSize: 12,
  },
  subtaskCountChip: {
    height: Spacing.base + Spacing.tiny,
    paddingHorizontal: Spacing.small,
    borderRadius: Radii.pill,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  subtaskCountText: {
    ...Typography.caption,
    fontSize: Typography.caption.fontSize - 2,
    lineHeight: Typography.caption.fontSize,
    color: Colors.background,
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
    gap: Spacing.small,
  },
  labelRow: {
    marginTop: Spacing.small,
  },
  elementChip: {
    width: Spacing.base + Spacing.small + Spacing.tiny,
    height: Spacing.base + Spacing.small + Spacing.tiny,
    borderRadius: Radii.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  chip: {
    minHeight: Spacing.base + Spacing.small + Spacing.tiny,
    paddingHorizontal: Spacing.small + Spacing.tiny,
    paddingVertical: Spacing.tiny,
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
    borderWidth: 1,
  },
  tagChip: {
    backgroundColor: Colors.surfaceElevated,
    borderWidth: 1,
    borderColor: Colors.border,
    minHeight: Spacing.base + Spacing.small + Spacing.tiny,
    paddingHorizontal: Spacing.small,
  },
  rewardInlineText: {
    ...Typography.caption,
    flexShrink: 1,
    marginLeft: "auto",
    textShadowColor: "rgba(0,0,0,0.15)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  priorityChipText: {
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
