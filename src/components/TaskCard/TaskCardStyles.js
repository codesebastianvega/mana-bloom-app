// [MB] Modulo: Tasks / Seccion: Tarjeta de tarea
// Afecta: TaskCard
// Proposito: estilos de tarjeta, chips y micro interacciones visuales
// Puntos de edicion futura: TaskCardStyles refactor a .styles.js y animaciones
// Autor: Codex - Fecha: 2025-10-20


import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation, Typography } from "../../theme";

function withAlpha(hex = "", alpha = 1) {
  if (!hex) return hex;
  let cleaned = `${hex}`.replace("#", "").trim();
  if (cleaned.length === 3) {
    cleaned = cleaned
      .split("")
      .map((c) => `${c}${c}`)
      .join("");
  }
  if (cleaned.length === 8) {
    cleaned = cleaned.slice(0, 6);
  }
  if (cleaned.length !== 6) {
    return hex;
  }
  const value = parseInt(cleaned, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
}

const CARD_BACKGROUND = withAlpha(Colors.taskCardBackground, 0.9);
const CARD_BORDER = withAlpha(Colors.primaryLight, 0.28);
const CHIP_BACKGROUND = withAlpha(Colors.taskCardBackground, 0.6);
const TAG_BACKGROUND = withAlpha(Colors.primaryLight, 0.22);
const PRIORITY_CHIP_BACKGROUND = withAlpha(Colors.surfaceAlt, 0.35);
const PRIORITY_CHIP_BORDER = withAlpha(Colors.primaryLight, 0.22);

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
    minWidth: 170, // ancho mÃ­nimo mÃ¡s largo
    minHeight: 50, // alto mÃ­nimo mÃ¡s alto
  },
  leftAction: {
    position: "absolute",
    top: Spacing.tiny,
    bottom: Spacing.tiny,
    right: Spacing.tiny,
    borderRadius: Spacing.small,
    justifyContent: "center",
    alignItems: "center",
    minWidth: 140, // ancho mÃ­nimo mÃ¡s largo
    minHeight: 60, // alto mÃ­nimo mÃ¡s alto
  },
  actionText: {
    color: Colors.background,
    fontWeight: "600",
    marginTop: Spacing.tiny,
    fontSize: 12,
  },
  card: {
    width: "100%",
    backgroundColor: CARD_BACKGROUND,
    borderRadius: Radii.lg,
    paddingVertical: Spacing.small + Spacing.tiny,
    paddingHorizontal: Spacing.small + Spacing.tiny,
    borderLeftWidth: 3,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    flexDirection: "row",
    gap: Spacing.small,
    ...Elevation.card,
    shadowColor: Colors.taskCardGlow,
    shadowOpacity: 0.35,
    shadowRadius: 12,
  },
  mainColumn: {
    flex: 1,
    flexDirection: "column",
    gap: Spacing.small,
  },
  rightColumn: {
    alignItems: "flex-end",
    gap: Spacing.small,
  },
  typeAndElementRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  elementButton: {
    width: Spacing.large,
    height: Spacing.large,
    borderRadius: Radii.pill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: withAlpha(Colors.taskCardBackground, 0.5),
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  textContainer: {
    flex: 1,
    gap: Spacing.tiny,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
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
    color: Colors.text,
    marginLeft: Spacing.small,
    fontSize: 12,
    fontWeight: "600",
  },
  subtaskCountChip: {
    height: Spacing.base + Spacing.tiny,
    paddingHorizontal: Spacing.small,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.secondary, 0.18),
    borderWidth: 1,
    borderColor: Colors.secondary,
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
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.22),
    borderRadius: Radii.sm,
    paddingLeft: Spacing.small,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.18),
    gap: Spacing.tiny / 2,
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
    borderColor: withAlpha(Colors.primary, 0.8),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: withAlpha(Colors.surface, 0.65),
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
    alignItems: "center",
    flexWrap: "wrap",
    gap: Spacing.small - Spacing.tiny / 2,
  },

  typeChip: {
    height: Spacing.base + Spacing.small,
    paddingHorizontal: Spacing.small,
    borderRadius: Radii.pill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CHIP_BACKGROUND,
    borderWidth: 1,
    borderColor: CARD_BORDER,
  },
  priorityChip: {
    height: Spacing.base + Spacing.tiny,
    paddingHorizontal: Spacing.small - Spacing.tiny / 2,
    borderRadius: Radii.pill,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: Spacing.tiny,
    borderWidth: 1,
    backgroundColor: PRIORITY_CHIP_BACKGROUND,
    borderColor: PRIORITY_CHIP_BORDER,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  priorityChipText: {
    ...Typography.caption,
    fontSize: Typography.caption.fontSize - 1,
    fontWeight: "600",
    letterSpacing: 0.1,
  },
  typeChipText: {
    ...Typography.caption,
    fontSize: Typography.caption.fontSize,
    lineHeight: Typography.caption.fontSize,
    color: Colors.text,
  },
  tagChip: {
    height: Spacing.base + Spacing.small,
    paddingHorizontal: Spacing.small,
    borderRadius: Radii.pill,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: TAG_BACKGROUND,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    flexShrink: 1,
    maxWidth: "100%",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small - Spacing.tiny / 2,
    marginTop: Spacing.small,
  },
  tagText: {
    ...Typography.caption,
    fontSize: Typography.caption.fontSize - 1,
    lineHeight: Typography.caption.fontSize - 1,
    color: Colors.text,
  },
  rewardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    marginTop: Spacing.tiny,
    flexWrap: "wrap",
  },
  rewardLabel: {
    ...Typography.caption,
    fontWeight: "600",
  },
  rewardText: {
    ...Typography.caption,
    fontWeight: "600",
  },
  rewardSeparator: {
    ...Typography.caption,
  },
});
