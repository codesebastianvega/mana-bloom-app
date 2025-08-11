// src/components/SwipeableTaskItem/SwipeableTaskItem.styles.js

import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme";

export default StyleSheet.create({
  container: {
    marginBottom: Spacing.small,
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
    // tarjeta de tarea
    backgroundColor: Colors.surface,
    borderRadius: Spacing.small,
    padding: Spacing.base,
    borderLeftWidth: 2,
    shadowColor: Colors.shadow,

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    color: Colors.text,
    fontSize: 17,
    fontWeight: "600",
  },
  note: {
    color: Colors.textMuted,
    fontSize: 14,
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
    // chip de etiqueta en tarjeta de tarea
    backgroundColor: Colors.background,
    borderRadius: 5,
    paddingHorizontal: Spacing.small,
    paddingVertical: 3,
    marginRight: Spacing.tiny,
    marginTop: 0.1,
  },
  tagText: {
    color: Colors.text,
    fontSize: 11,
    alignContent: "center",
    paddingBottom: 1,
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

  // fila de badges (elemento, tipo, prioridad):
  badgeRow: {
    flexDirection: "row",
    marginTop: Spacing.small,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    marginRight: Spacing.small,
    marginTop: 1,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "600",
  },
  // chip de prioridad:
  priorityChip: {
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: Spacing.small,
    paddingVertical: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  priorityChipText: {
    fontSize: 12,
    fontWeight: "500",
    textTransform: "capitalize",
  },
});
