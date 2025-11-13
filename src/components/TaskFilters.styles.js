// [MB] Modulo: Tasks / Seccion: Filtros avanzados
// Afecta: TaskFilters (modal de filtros)
// Proposito: Botones y layout alineados al tema
// Puntos de edicion futura: variantes deshabilitadas
// Autor: Codex - Fecha: 2025-10-20

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Elevation, Typography } from "../theme";

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

export default StyleSheet.create({
  closeBtn: {
    alignSelf: "flex-end",
    padding: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.45),
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
    marginBottom: Spacing.base,
    letterSpacing: 0.3,
  },
  filterBarMargin: {
    marginBottom: Spacing.small,
  },
  actions: {
    flexDirection: "row",
    gap: Spacing.small,
    marginTop: Spacing.base,
  },
  primaryButton: {
    flex: 1,
    minHeight: 44,
    paddingHorizontal: Spacing.large,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: withAlpha(Colors.secondaryLight, 0.65),
    backgroundColor: withAlpha(Colors.secondary, 0.82),
    alignItems: "center",
    justifyContent: "center",
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
    minHeight: 44,
    paddingHorizontal: Spacing.large,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.35),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.72),
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryButtonLabel: {
    ...Typography.body,
    fontSize: Typography.body.fontSize,
    fontWeight: "600",
    color: Colors.textMuted,
    letterSpacing: 0.2,
  },
});
