// [MB] Módulo: Tasks / Sección: Tarea swipeable
// Afecta: SwipeableTaskItem
// Propósito: estilos de tarjeta y chips
// Puntos de edición futura: animaciones y badges
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Elevation,
  Typography,
} from "../../theme";

export default StyleSheet.create({
  container: {
    marginVertical: Spacing.small,
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
    minHeight: 60, // alto mínimo más alto
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
  taskItem: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.lg,
    padding: Spacing.small + Spacing.tiny,
    borderLeftWidth: Spacing.tiny / 2,
    ...Elevation.card,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    marginLeft: 1,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
  },
  note: {
    ...Typography.body,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
    marginBottom: Spacing.small,
  },
  textCompleted: {
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },
  subtaskToggle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Spacing.tiny,
  },
  subtaskToggleText: {
    color: Colors.textMuted,
    marginLeft: Spacing.tiny,
    fontSize: 12,
  },
  subtaskList: {
    marginTop: Spacing.small,
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
    marginBottom: Spacing.tiny,
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: Colors.text,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.surface,
  },
  subtaskText: {
    color: Colors.textMuted,
    marginLeft: Spacing.small,
    fontSize: 14,
  },
  subtaskTextCompleted: {
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },

  // etiquetas (chips) existentes:
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: Spacing.small,
  },
  tagChip: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    marginRight: Spacing.tiny,
    marginTop: Spacing.tiny,
  },
  tagText: {
    ...Typography.caption,
    color: Colors.text,
  },

  // badge de elemento (círculo con icono)
  elementBadge: {
    width: 22,
    height: 22,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Spacing.small,
    marginTop: 1,
    // opcional: un poco de relieve
    shadowColor: Colors.shadow,

    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },

  // badges de dificultad:
  badgeRow: {
    flexDirection: "row",
    marginTop: Spacing.small,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    marginRight: Spacing.small,
    marginTop: Spacing.tiny,
  },
  badgeIcon: {
    marginRight: Spacing.tiny,
  },
  badgeText: {
    ...Typography.caption,
    fontWeight: "600",
  },
  // chip de prioridad:
  priorityChip: {
    borderRadius: Radii.pill,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: StyleSheet.hairlineWidth,
  },
  priorityChipText: {
    ...Typography.caption,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
