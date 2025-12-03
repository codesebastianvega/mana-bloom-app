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

const CARD_BACKGROUND = "#1f1b2d"; // morado oscuro tipo mock
const CARD_BORDER = "rgba(255,255,255,0.08)";
const CHIP_BACKGROUND = withAlpha(Colors.taskCardBackground, 0.6);
const TAG_BACKGROUND = "rgba(179,157,219,0.12)";
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
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.base,
    borderLeftWidth: 2,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    flexDirection: "row",
    gap: Spacing.small,
    ...Elevation.card,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  mainColumn: {
    flex: 1,
    flexDirection: "column",
    gap: Spacing.small,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.small,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    flexWrap: "wrap",
  },
  typeText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  separatorDot: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "700",
  },
  priorityText: {
    ...Typography.caption,
    fontWeight: "700",
  },
  elementPill: {
    paddingHorizontal: Spacing.tiny,
    paddingVertical: Spacing.tiny / 2,
    borderRadius: Radii.sm,
    borderWidth: 1,
    backgroundColor: withAlpha(Colors.surfaceAlt, 0.4),
  },
  priorityPill: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.sm,
    borderWidth: 1,
    borderColor: PRIORITY_CHIP_BORDER,
    backgroundColor: PRIORITY_CHIP_BACKGROUND,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  priorityPillText: {
    ...Typography.caption,
    fontWeight: "600",
  },
  difficultyText: {
    ...Typography.caption,
    fontWeight: "600",
  },
  headerTile: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: withAlpha(Colors.surfaceAlt, 0.35),
    borderRadius: Radii.sm,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
    gap: Spacing.small,
    justifyContent: "space-between",
    width: "100%",
  },
  headerTileColumn: {
    flexDirection: "column",
    gap: Spacing.tiny / 2,
    alignItems: "center",
    flex: 1,
  },
  headerTileLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "700",
    fontSize: Typography.caption.fontSize - 1,
  },
  headerTileValueRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  headerTileValue: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  tileDivider: {
    width: 1,
    alignSelf: "stretch",
    backgroundColor: withAlpha(Colors.textMuted, 0.25),
  },
  subtaskCountChip: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.sm,
    borderWidth: 1,
    borderColor: withAlpha(Colors.secondary, 0.6),
    backgroundColor: withAlpha(Colors.secondary, 0.15),
  },
  subtaskCountText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  checkCircle: {
    width: Spacing.large,
    height: Spacing.large,
    borderRadius: Spacing.large / 2,
    borderWidth: 1,
    borderColor: CARD_BORDER,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: withAlpha(Colors.surfaceAlt, 0.35),
  },
  checkCircleDone: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  titleBlock: {
    gap: Spacing.tiny / 2,
    flex: 1,
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: Spacing.small,
  },
  titleBlockRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  title: {
    ...Typography.title,
    fontWeight: "900",
    color: Colors.text,
  },
  note: {
    ...Typography.body,
    fontSize: Typography.caption.fontSize + 1,
    color: Colors.textMuted,
  },
  textCompleted: {
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },
  notePreview: {
    ...Typography.caption,
    fontSize: Typography.caption.fontSize,
    color: withAlpha(Colors.textMuted, 0.8),
    marginTop: Spacing.tiny / 2,
    lineHeight: 16,
  },
  progressBarContainer: {
    marginTop: Spacing.small,
    marginBottom: -Spacing.tiny,
  },
  progressBar: {
    height: 3,
    backgroundColor: withAlpha(Colors.surfaceAlt, 0.3),
    borderRadius: 2,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 2,
  },
  rewardRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny + 2,
    flexWrap: "wrap",
    marginTop: Spacing.tiny,
  },
  rewardText: {
    ...Typography.caption,
    fontWeight: "800",
  },
  rewardTextMuted: {
    color: Colors.textMuted,
  },
  chevronHit: {
    marginLeft: "auto",
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
  },
  reviveButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: withAlpha(Colors.secondary, 0.5),
    backgroundColor: withAlpha(Colors.secondary, 0.15),
  },
  reviveLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: withAlpha(Colors.textMuted, 0.4),
  },
  separatorBar: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "800",
  },
  tagsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.tiny,
    marginTop: Spacing.tiny / 2,
    marginBottom: -8,
  },
  tagChip: {
    paddingHorizontal: Spacing.small + 2,
    paddingVertical: Spacing.tiny / 2,
    borderRadius: 3,
    backgroundColor: TAG_BACKGROUND,
    borderWidth: 0,
  },
  tagText: {
    ...Typography.caption,
    color: "#BFC6D0",
  },
  expandBlock: {
    marginTop: Spacing.small,
    gap: Spacing.base,
    borderTopWidth: 1,
    borderTopColor: withAlpha(Colors.primaryLight, 0.15),
    paddingTop: Spacing.small + Spacing.tiny,
  },
  focusButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.tiny,
    paddingVertical: Spacing.small,
    borderRadius: Radii.lg,
    backgroundColor: withAlpha(Colors.primaryLight, 0.25),
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.4),
  },
  focusButtonText: {
    ...Typography.button,
    color: Colors.text,
  },
  descriptionText: {
    ...Typography.body,
    fontSize: Typography.caption.fontSize + 1,
    fontWeight: "600",
    color: Colors.textMuted,
    backgroundColor: withAlpha(Colors.background, 0.55),
    borderRadius: Radii.md,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.12),
    marginVertical: Spacing.tiny,
  },
  subtaskList: {
    marginTop: Spacing.tiny,
    gap: Spacing.tiny,
  },
  subtaskAddRow: {
    borderTopWidth: 1,
    borderTopColor: withAlpha(Colors.primaryLight, 0.1),
    marginTop: Spacing.small,
    paddingTop: Spacing.base,
  },
  subtaskAddText: {
    ...Typography.caption,
    color: withAlpha(Colors.textMuted, 0.6),
  },
  subtaskSubtitle: {
    ...Typography.caption,
    fontWeight: "700",
    color: Colors.text,
    marginBottom: -10,
  },
  subtaskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small,
    borderRadius: Radii.sm,
    backgroundColor: "rgba(60,58,82,0.3)",
  },
  checkbox: {
    width: 16,
    height: 16,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: "rgba(179,157,219,0.7)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: withAlpha(Colors.surface, 0.65),
  },
  subtaskText: {
    ...Typography.body,
    fontSize: Typography.caption.fontSize + 1,
    fontWeight: "600",
    color: Colors.textMuted,
    marginLeft: Spacing.small,
  },
  subtaskTextCompleted: {
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },
  subtaskInput: {
    ...Typography.body,
    fontSize: Typography.caption.fontSize + 1,
    fontWeight: "600",
    color: Colors.text,
    backgroundColor: withAlpha(Colors.surface, 0.65),
    borderRadius: Radii.sm,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small,
    borderWidth: 1.5,
    borderColor: withAlpha(Colors.primaryLight, 0.4),
  },
  statusLinesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    rowGap: 2,
    marginBottom: Spacing.tiny,
    paddingHorizontal: 4,
  },
  creationDateText: {
    ...Typography.caption,
    color: withAlpha(Colors.textMuted, 0.8),
    fontSize: 10,
  },
  ribbonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    borderTopRightRadius: Radii.lg,
    borderBottomLeftRadius: Radii.md,
    overflow: 'hidden',
    zIndex: 10,
  },
  ribbonGradient: {
    paddingHorizontal: Spacing.small,
    paddingVertical: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ribbonHelperText: {
    ...Typography.caption,
    fontSize: 8,
    color: Colors.white,
    fontWeight: 'bold',
    opacity: 0.9,
    marginBottom: -2,
  },
  ribbonValueText: {
    ...Typography.caption,
    fontSize: 10,
    color: Colors.white,
    fontWeight: 'bold',
  },
});
