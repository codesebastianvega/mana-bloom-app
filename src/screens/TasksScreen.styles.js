// [MB] Modulo: Tasks / Seccion: Pantalla de tareas
// Afecta: TasksScreen
// Proposito: Estilos base de listado, fab y modales
// Puntos de edicion futura: layout y overlays
// Autor: Codex - Fecha: 2025-10-20

import { StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Elevation,
  Typography,
  CardStyles,
} from "../theme";
import { FAB_SIZE } from "../components/AddTaskButton/AddTaskButton.styles";

const glassOverlay = (alpha) => `rgba(22, 16, 41, ${alpha})`;
const withAlpha = (hex = "", alpha = 1) => {
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
};

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.tiny,
  },
  missionHeaderWrapper: {
    marginBottom: Spacing.large,
    gap: Spacing.small,
  },
  missionHeaderTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  missionTitle: {
    ...Typography.sectionTitle,
    color: Colors.text,
  },
  missionSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  missionHeaderActions: {
    flexDirection: "row",
    gap: Spacing.tiny,
  },
  missionActionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.04)",
  },
  searchRow: {
    marginTop: Spacing.small,
  },
  missionTabs: {
    marginTop: Spacing.small,
  },
  missionTabsContent: {
    flexDirection: "row",
    gap: Spacing.tiny,
  },
  missionTab: {
    paddingHorizontal: Spacing.base * 1.25,
    paddingVertical: Spacing.tiny + 2,
    marginLeft: 1,
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(255,255,255,0.03)",
  },
  missionTabActive: {
    borderColor: Colors.primaryLight,
    backgroundColor: "rgba(179,157,219,0.18)",
  },
  missionTabLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "600",
  },
  missionTabLabelActive: {
    color: Colors.text,
  },
  progressCard: {
    marginTop: Spacing.small,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.26)",
    padding: 1,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  progressCardInner: {
    borderRadius: 8,
    padding: Spacing.base,
    gap: Spacing.tiny,
  },
  progressHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  progressBar: {
    marginTop: Spacing.small,
    height: 10,
    borderRadius: Radii.lg,
    backgroundColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  progressLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  progressPercent: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "800",
    fontSize: 14,
  },
  progressFill: {
    height: "100%",
    borderRadius: Radii.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.base,
    marginBottom: Spacing.small,
  },
  sectionTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
  sectionSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  sectionHeaderLine: {
    flex: 1,
    height: 1,
    backgroundColor: "rgba(255,255,255,0.12)",
  },
  sectionHeaderLabel: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    paddingHorizontal: Spacing.tiny,
  },
  sectionHeaderText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  progressFootnote: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: "center",
    marginTop: Spacing.tiny,
  },
  emptyState: {
    paddingVertical: Spacing.large,
    paddingHorizontal: Spacing.large,
  },
  emptyCard: {
    ...CardStyles.base,
    backgroundColor: Colors.surfaceAlt,
    padding: Spacing.base,
    gap: Spacing.small,
    alignItems: "center",
  },
  emptyTitle: {
    ...Typography.sectionSubtitle,
    color: Colors.text,
    textAlign: "center",
  },
  emptySubtitle: {
    ...Typography.cardSubtitle,
    color: Colors.textMuted,
    textAlign: "center",
  },
  emptyButton: {
    marginTop: Spacing.small,
    paddingHorizontal: Spacing.base * 1.5,
    paddingVertical: Spacing.small,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  emptyButtonText: {
    ...Typography.button,
    color: Colors.accent,
  },
  filterModalBackground: {
    flex: 1,
    backgroundColor: glassOverlay(0.55),
    justifyContent: "center",
    alignItems: "center",
  },
  filterModalContainer: {
    width: "90%",
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.92),
    borderRadius: Radii.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.25),
    maxHeight: "90%",
    ...Elevation.card,
  },
  fabContainer: {
    position: "absolute",
    right: Spacing.large,
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    overflow: "hidden",
    zIndex: 60,
    ...Elevation.raised,
  },
  fabGradient: {
    flex: 1,
    borderRadius: FAB_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
