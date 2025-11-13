// [MB] Modulo: Tasks / Seccion: CreateTaskModal
// Afecta: CreateTaskModal
// Proposito: Estilos del modal para crear y editar tareas
// Puntos de edicion futura: tokens en theme y ajustes de spacing
// Autor: Codex - Fecha: 2025-10-20

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation, Typography } from "../../theme";

const withAlpha = (hex = "", alpha = 1) => {
  if (!hex) return hex;
  const cleaned = `${hex}`.replace("#", "").trim();
  const base = cleaned.length === 8 ? cleaned.slice(0, 6) : cleaned;
  if (base.length !== 6) return hex;
  const value = parseInt(base, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const glassPanel = withAlpha(Colors.surface, 0.96);
const glassSurface = withAlpha(Colors.surfaceAlt, 0.52);
const glassDeep = withAlpha(Colors.surfaceAlt, 0.64);
const borderSoft = withAlpha(Colors.primaryLight, 0.28);
const borderStrong = withAlpha(Colors.primaryLight, 0.55);

const shadowSoft = {
  shadowColor: Colors.shadow,
  shadowOpacity: 0.18,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 4 },
};

const chipBase = {
  minHeight: Spacing.base + Spacing.small,
  paddingHorizontal: Spacing.small + Spacing.tiny,
  borderRadius: Radii.pill,
  borderWidth: 1,
  borderColor: borderSoft,
  backgroundColor: glassSurface,
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  gap: Spacing.tiny,
  ...shadowSoft,
};

const inputBase = {
  borderRadius: Radii.lg,
  backgroundColor: glassSurface,
  borderWidth: 1,
  borderColor: borderSoft,
  paddingHorizontal: Spacing.base,
  color: Colors.text,
  ...shadowSoft,
};

export default StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: withAlpha(Colors.background, 0.2),
    overflow: "hidden",
  },
  root: {
    backgroundColor: glassPanel,
    borderRadius: Radii.xl,
    paddingHorizontal: Spacing.base + Spacing.small / 2,
    paddingTop: Spacing.xlarge + Spacing.small,
    paddingBottom: Spacing.base + Spacing.small,
    borderWidth: 1,
    borderColor: borderSoft,
    gap: Spacing.base,
    ...(Elevation?.modal || {}),
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    marginTop: 0,
    marginBottom: Spacing.small,
    letterSpacing: 0.2,
  },
  sectionLabel: {
    ...Typography.body,
    fontSize: Typography.body.fontSize + 1,
    fontWeight: "700",
    color: Colors.text,
    letterSpacing: 0.2,
    marginTop: Spacing.base,
    marginBottom: Spacing.tiny,
  },
  helperText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
    marginBottom: Spacing.small / 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  group: {
    marginTop: Spacing.base,
    gap: Spacing.small / 2,
  },
  input: {
    ...inputBase,
    height: 48,
  },
  inputMultiline: {
    ...inputBase,
    minHeight: 96,
    paddingTop: Spacing.base,
    textAlignVertical: "top",
  },
  segmentContainer: {
    flexDirection: "row",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  segmentButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.35),
    backgroundColor: withAlpha(Colors.surfaceAlt, 0.6),
    paddingVertical: Spacing.small + Spacing.tiny,
    paddingHorizontal: Spacing.base,
  },
  segmentButtonActive: {
    borderColor: withAlpha(Colors.primary, 0.8),
    backgroundColor: withAlpha(Colors.primary, 0.2),
  },
  segmentLabel: {
    ...Typography.caption,
    fontSize: Typography.caption.fontSize + 1,
    fontWeight: "600",
    color: Colors.text,
    letterSpacing: 0.2,
  },
  segmentLabelActive: {
    color: Colors.primaryLight,
  },
  elementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    marginTop: Spacing.small,
    paddingHorizontal: Spacing.small,
  },
  elementRow: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: Spacing.small,
  },
  elementRowLast: {
    marginBottom: 0,
  },
  elementTile: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
  },
  elementTileActive: {
    borderWidth: 2,
  },
  elementEmoji: {
    fontSize: 30,
    marginBottom: Spacing.tiny,
  },
  elementTitle: {
    ...Typography.body,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },
  elementCaption: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.tiny,
  },
  whichBlock: {
    marginTop: Spacing.small,
    gap: Spacing.tiny,
  },
  whichQuestion: {
    ...Typography.body,
    fontWeight: "700",
    color: Colors.text,
    letterSpacing: 0.2,
  },
  whichRow: {
    marginTop: Spacing.tiny,
  },
  whichSnippet: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  whichMore: {
    ...Typography.caption,
    color: Colors.info,
  },
  subtasksChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
    marginTop: Spacing.small,
    marginBottom: Spacing.small,
  },
  chip: {
    ...chipBase,
  },
  chipActive: {
    borderColor: borderStrong,
    backgroundColor: withAlpha(Colors.primaryLight, 0.24),
    shadowColor: Colors.primaryLight,
    shadowOpacity: 0.28,
    shadowRadius: 10,
  },
  chipLabel: {
    ...Typography.caption,
    fontWeight: "600",
    color: Colors.text,
  },
  chipLabelActive: {
    color: Colors.text,
  },
  difficultyRow: {
    flexDirection: "row",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  difficultyChip: {
    flex: 1,
    minWidth: 0,
    ...chipBase,
  },
  priorityList: {
    marginTop: Spacing.small,
    gap: Spacing.small,
  },
  priorityRow: {
    width: "100%",
    minHeight: 56,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: borderSoft,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priorityLeft: { maxWidth: "60%" },
  priorityTitle: {
    ...Typography.body,
    fontSize: Typography.body.fontSize + 2,
    fontWeight: "700",
    color: Colors.text,
  },
  priorityCaption: {
    ...Typography.caption,
    fontSize: Math.max(Typography.caption.fontSize - 1, 10),
    color: Colors.textMuted,
    marginTop: Spacing.tiny / 2,
  },
  priorityRewards: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: Spacing.small,
    minWidth: 0,
  },
  rewardPill: {
    minHeight: Spacing.base + Spacing.tiny,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.small + Spacing.tiny / 2,
    borderRadius: Radii.sm,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.25),
    backgroundColor: withAlpha(Colors.surfaceAlt, 0.6),
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.tiny,
  },
  rewardText: {
    ...Typography.caption,
    fontSize: Math.max(Typography.caption.fontSize - 1, 10),
    fontWeight: "600",
    color: Colors.text,
    textAlign: "center",
  },
  subtaskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  subtaskInput: {
    flex: 1,
    height: 44,
    ...inputBase,
  },
  subtaskAddBtn: {
    height: 44,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: withAlpha(Colors.secondaryLight, 0.65),
    backgroundColor: withAlpha(Colors.secondary, 0.82),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.secondary,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  subtaskAddLabel: {
    ...Typography.body,
    fontWeight: "700",
    color: Colors.onAccent,
  },
  tagsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small - Spacing.tiny,
    marginTop: Spacing.small,
  },
  tagChip: {
    ...chipBase,
  },
  tagText: {
    ...Typography.caption,
    color: Colors.text,
  },
  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.large,
  },
  primaryButton: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: Spacing.large,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: withAlpha(Colors.secondaryLight, 0.65),
    backgroundColor: withAlpha(Colors.secondary, 0.82),
    justifyContent: "center",
    alignItems: "center",
    shadowColor: Colors.secondary,
    shadowOpacity: 0.28,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    ...(Elevation?.card || {}),
  },
  primaryButtonLabel: {
    ...Typography.body,
    fontSize: Typography.body.fontSize + 1,
    fontWeight: "700",
    color: Colors.onAccent,
    letterSpacing: 0.2,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 48,
    paddingHorizontal: Spacing.large,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.35),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.72),
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonLabel: {
    ...Typography.body,
    fontWeight: "600",
    color: Colors.textMuted,
    letterSpacing: 0.2,
  },
  divider: {
    height: 1,
    backgroundColor: withAlpha(Colors.primaryLight, 0.2),
    marginVertical: Spacing.base,
    borderRadius: 1,
  },
});

