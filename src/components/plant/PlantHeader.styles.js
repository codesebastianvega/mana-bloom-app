// [MB] Módulo: Planta / Sección: PlantHeader estilos
// Afecta: cabecera edge-to-edge
// Propósito: armonizar barra superior con el hero
// Autor: Codex - Fecha: 2025-11-17

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

export default StyleSheet.create({
  container: {
    marginHorizontal: -Spacing.base,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.large,
    paddingBottom: Spacing.base,
    gap: Spacing.small,
  },
  identityWrapper: {
    borderRadius: Radii.xl,
    overflow: "hidden",
    marginHorizontal: -Spacing.base,
    marginBottom: Spacing.small * 0.5,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  identityGradient: {
    padding: Spacing.base,
    gap: Spacing.small,
    backgroundColor: "transparent",
  },
  identityRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  identityBlock: {
    flex: 1,
  },
  nameStack: {
    flex: 1,
    gap: Spacing.tiny,
  },
  name: {
    ...Typography.h2,
    color: Colors.text,
  },
  stageChips: {
    flexDirection: "row",
    gap: Spacing.small,
    flexWrap: "wrap",
  },
  stageLabel: {
    ...Typography.caption,
    color: Colors.text,
    textTransform: "uppercase",
    letterSpacing: 0.6,
  },
  ritualTarget: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  missionText: {
    ...Typography.caption,
    color: Colors.textMuted,
    letterSpacing: 0.4,
  },
  reminderHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  reminderHeaderActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
  },
  toggleBtn: {
    padding: Spacing.tiny,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
  },
  reminderTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  reminderBtn: {
    flexDirection: "row",
    gap: Spacing.tiny,
    alignItems: "center",
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.22)",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  reminderBtnLabel: {
    ...Typography.caption,
    color: Colors.text,
  },
  reminderList: {
    gap: Spacing.small,
  },
  reminderListItem: {
    flexDirection: "row",
    gap: Spacing.small,
    alignItems: "flex-start",
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.03)",
    padding: Spacing.small,
  },
  reminderDot: {
    display: "none",
  },
  reminderCheckbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },
  reminderCheckboxChecked: {
    backgroundColor: Colors.secondary,
    borderColor: Colors.secondary,
  },
  reminderListBody: {
    flex: 1,
    gap: Spacing.tiny / 2,
  },
  reminderTimeRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  agendaTime: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  agendaImpact: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: "600",
  },
  agendaAction: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  reminderDoneText: {
    color: Colors.textMuted,
    textDecorationLine: "line-through",
  },
  agendaEmpty: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
});
