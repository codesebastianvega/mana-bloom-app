// [MB] Módulo: Tasks / Sección: CreateTaskModal
// Afecta: CreateTaskModal
// Propósito: Estilos del modal para crear y editar tareas
// Puntos de edición futura: tokens en theme y ajustes de spacing
// Autor: Codex - Fecha: 2025-08-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation, Typography } from "../../theme";

export default StyleSheet.create({
  root: {
    backgroundColor: Colors.surfaceElevated || Colors.surface,
    borderRadius: Radii?.xl ?? 20,
    padding: Spacing.large,
    ...(Elevation?.modal || {}),
  },

  title: {
    ...(Typography?.h2 || { fontSize: 22, fontWeight: "700" }),
    color: Colors.text,
    marginTop: Spacing.large,
    marginBottom: Spacing.small,
  },

  sectionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
    marginTop: Spacing.base,
    marginBottom: Spacing.small,
  },

  helperText: {
    fontSize: 12,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  group: {
    marginTop: Spacing.base,
  },

  input: {
    height: 48,
    borderRadius: Radii?.lg ?? 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    paddingHorizontal: Spacing.base,
    color: Colors.text,
  },

  inputMultiline: {
    minHeight: 96,
    borderRadius: Radii?.lg ?? 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.base,
    color: Colors.text,
    textAlignVertical: "top",
  },

  segmentContainer: {
    flexDirection: "row",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  segmentButton: {
    flex: 1,
    minHeight: 40,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii?.pill ?? 999,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    backgroundColor: Colors.secondary,
    justifyContent: "center",
    alignItems: "center",
  },
  segmentButtonActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  segmentLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.text,
  },
  segmentLabelActive: {
    color: Colors.background,
  },

  elementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: Spacing.small,
  },
  elementCard: {
    position: "relative",
    borderWidth: 2,
    borderRadius: Radii.lg,
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.base,
    overflow: "hidden",
    ...(Elevation?.card || {}),
  },
  elementCardActive: {
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 6,
    borderWidth: 3,
  },
  elementGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Radii.lg,
    opacity: 0.35,
    pointerEvents: "none",
  },
  elementEmoji: { fontSize: 32, marginBottom: Spacing.tiny },
  elementTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
    textAlign: "center",
  },
  elementCaption: {
    fontSize: 12,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: 2,
  },

  subtasksChips: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
    marginTop: Spacing.small,
    marginBottom: Spacing.small,
  },
  chip: {
    minHeight: 28,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii?.pill ?? 999,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    backgroundColor: Colors.surface,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  chipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primary,
  },
  chipLabel: {
    fontSize: 13,
    color: Colors.text,
    fontWeight: "500",
  },
  chipLabelActive: {
    color: Colors.background,
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },

  priorityList: { marginTop: Spacing.small, gap: Spacing.small },
  priorityRow: {
    width: "100%",
    minHeight: 64,
    borderWidth: 2,
    borderRadius: Radii.lg,
    backgroundColor: Colors.surface,
    borderColor: Colors.textMuted,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    ...(Elevation?.card || {}),
  },
  priorityRowActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.surfaceElevated || Colors.surface,
  },
  priorityLeft: { maxWidth: "58%" },
  priorityTitle: { fontSize: 16, fontWeight: "700", color: Colors.text },
  priorityCaption: { fontSize: 12, color: Colors.textMuted, marginTop: 2 },
  priorityRewards: {
    flexDirection: "row",
    gap: Spacing.small,
    alignItems: "center",
  },
  rewardPill: {
    minHeight: 28,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii?.pill ?? 999,
    backgroundColor: Colors.surfaceElevated || Colors.surface,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    alignItems: "center",
    justifyContent: "center",
  },
  rewardText: { fontSize: 12, fontWeight: "700", color: Colors.text },

  subtaskRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  subtaskInput: {
    flex: 1,
    height: 44,
    borderRadius: Radii?.lg ?? 14,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    paddingHorizontal: Spacing.base,
    color: Colors.text,
  },
  subtaskAddBtn: {
    minHeight: 44,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii?.pill ?? 999,
    borderWidth: 1,
    borderColor: Colors.primary,
    backgroundColor: Colors.surfaceElevated || Colors.surface,
    justifyContent: "center",
    alignItems: "center",
    ...(Elevation?.card || {}),
  },
  subtaskAddLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },

  tagsList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  tagChip: {
    minHeight: 28,
    paddingHorizontal: Spacing.base,
    borderRadius: Radii?.pill ?? 999,
    backgroundColor: Colors.surfaceElevated || Colors.surface,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  tagText: { fontSize: 12, color: Colors.text },

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.large,
  },
  primaryButton: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: Spacing.large,
    borderRadius: Radii?.pill ?? 999,
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
    ...(Elevation?.card || {}),
  },
  primaryButtonLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: Colors.text,
  },
  secondaryButton: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: Spacing.large,
    borderRadius: Radii?.pill ?? 999,
    borderWidth: 1,
    borderColor: Colors.textMuted,
    backgroundColor: Colors.surface,
    justifyContent: "center",
    alignItems: "center",
  },
  secondaryButtonLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.textMuted,
    opacity: 0.2,
    marginVertical: Spacing.base,
    borderRadius: 1,
  },
});
