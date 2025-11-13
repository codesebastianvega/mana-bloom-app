// [MB] Modulo: Tasks / Seccion: Filtros avanzados
// Afecta: TaskFilters (modal de filtros)
// Proposito: Tokens y estilos alineados al tema
// Puntos de edicion futura: tipografias y variantes de elevacion
// Autor: Codex - Fecha: 2025-10-20

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation, Typography } from "../../theme";

const withAlpha = (hex = "", alpha = 1) => {
  if (!hex) return hex;
  const cleaned = `${hex}`.replace("#", "").trim();
  const base = cleaned.length === 8 ? cleaned.slice(0, 6) : cleaned;
  const value = parseInt(base, 16);
  if (Number.isNaN(value)) return hex;
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const baseBtn = {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  paddingVertical: Spacing.tiny,
  paddingHorizontal: Spacing.small,
  minHeight: Spacing.base + Spacing.small,
  borderRadius: Radii.pill,
  borderWidth: 1,
  borderColor: withAlpha(Colors.primaryLight, 0.35),
  marginRight: Spacing.small,
  backgroundColor: withAlpha(Colors.surfaceAlt, 0.55),
  shadowColor: Colors.shadow,
  shadowOpacity: 0.18,
  shadowRadius: 6,
  shadowOffset: { width: 0, height: 3 },
};

export default StyleSheet.create({
  container: {
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.92),
    borderRadius: Radii.xl,
    paddingVertical: Spacing.base,
    paddingHorizontal: Spacing.base + Spacing.small / 2,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.18),
    gap: Spacing.small,
    ...(Elevation?.modal || {}),
  },
  row: {
    flexDirection: "row",
    marginBottom: Spacing.small,
    gap: Spacing.small,
  },
  elementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: Spacing.small,
    gap: Spacing.small,
  },
  elementGridBtn: {
    ...baseBtn,
    width: "48%",
    justifyContent: "center",
    marginRight: 0,
    marginBottom: Spacing.small,
  },
  priorityBtn: {
    ...baseBtn,
    justifyContent: "center",
  },
  difficultyBtn: {
    ...baseBtn,
    justifyContent: "center",
  },
  tagBtn: {
    ...baseBtn,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    marginRight: Spacing.tiny,
  },
  tagText: {
    ...Typography.caption,
    fontWeight: "600",
    letterSpacing: 0.2,
    color: Colors.text,
  },
  tagSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: withAlpha(Colors.surfaceAlt, 0.62),
    borderRadius: Radii.md,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.small,
    marginBottom: Spacing.small,
    borderWidth: 1,
    borderColor: withAlpha(Colors.separator, 0.6),
    shadowColor: Colors.shadow,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
  },
  tagSearchContainerFocused: {
    borderColor: Colors.accent,
    shadowOpacity: 0.28,
  },
  tagSearchInput: {
    flex: 1,
    color: Colors.text,
    ...Typography.body,
    paddingVertical: 0,
  },
  clearBtn: {
    marginLeft: Spacing.small,
    padding: Spacing.tiny,
  },
  sectionTitle: {
    ...Typography.body,
    fontSize: Typography.body.fontSize + 1,
    fontWeight: "700",
    color: Colors.text,
    marginTop: Spacing.small,
    marginBottom: Spacing.tiny,
    letterSpacing: 0.2,
  },
  text: {
    ...Typography.caption,
    fontWeight: "600",
    letterSpacing: 0.2,
    color: Colors.text,
    marginLeft: Spacing.small,
  },
  centerText: {
    marginLeft: 0,
    textAlign: "center",
    flex: 1,
  },
  pressed: {
    transform: [{ scale: 0.97 }],
  },
});
