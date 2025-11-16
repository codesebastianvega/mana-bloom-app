// [MB] Módulo: Planta / Sección: Header mejorado
// Afecta: PlantHeader
// Propósito: layout vidrio con barras, chips y avatar
// Puntos de edición futura: ajustar CTA y tamaños del avatar
// Autor: Codex - Fecha: 2025-11-13

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Elevation } from "../../theme";

export default StyleSheet.create({
  wrapper: {
    borderRadius: Radii.xl,
    overflow: "hidden",
    backgroundColor: Colors.surfaceElevated,
    ...Elevation.card,
  },
  gradientBg: {
    padding: Spacing.base,
    borderRadius: Radii.xl,
    gap: Spacing.small,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: Spacing.small,
  },
  nameWrap: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: Spacing.tiny,
  },
  name: {
    ...Typography.h2,
    color: Colors.text,
    flex: 1,
  },
  nameInput: {
    ...Typography.h2,
    color: Colors.text,
    flex: 1,
  },
  editBtn: {
    padding: Spacing.tiny,
  },
  editIcon: {
    fontSize: Typography.body.fontSize,
    color: Colors.text,
  },
  mission: {
    ...Typography.caption,
    color: Colors.textMuted,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  stageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    flexWrap: "wrap",
  },
  stageIcon: {
    opacity: 0.85,
  },
  stageLabel: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  ritualTarget: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  agendaCard: {
    borderRadius: Radii.lg,
    backgroundColor: "rgba(0,0,0,0.25)",
    padding: Spacing.base,
    gap: Spacing.small,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    marginTop: Spacing.small,
  },
  agendaHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  agendaTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  agendaSummary: {
    ...Typography.caption,
    color: Colors.text,
    marginTop: 2,
  },
  agendaEmpty: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  agendaList: {
    gap: Spacing.small,
  },
  agendaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  agendaDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.secondary,
  },
  agendaCopy: {
    flex: 1,
    gap: 2,
  },
  agendaTime: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  agendaAction: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  agendaImpact: {
    ...Typography.caption,
    color: Colors.secondary,
    textAlign: "right",
  },
  climateRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  climateInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  climateEmoji: {
    fontSize: 16,
  },
  climateTemp: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "700",
  },
  climateLocation: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  climateHint: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: "right",
    flex: 1,
  },
});
