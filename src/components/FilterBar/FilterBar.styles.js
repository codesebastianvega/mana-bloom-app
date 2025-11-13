// [MB] Modulo: Tasks / Seccion: Barra de filtros modal
// Afecta: TaskFilters (modal de filtros)
// Proposito: Estilos para tabs compactas
// Puntos de edicion futura: animaciones y estados
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

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.78),
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.tiny,
    paddingVertical: Spacing.tiny / 2,
    borderWidth: 0,
    borderColor: "transparent",
    gap: Spacing.tiny,
    zIndex: 50,
    shadowColor: Colors.shadow,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    ...(Elevation?.raised || {}),
  },
  button: {
    flex: 1,
    height: 40,
    borderRadius: Radii.lg,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  buttonActive: {
    backgroundColor: withAlpha(Colors.secondary, 0.32),
    borderColor: withAlpha(Colors.secondaryLight, 0.75),
  },
  buttonInactive: {
    backgroundColor: withAlpha(Colors.surfaceAlt, 0.55),
    borderColor: withAlpha(Colors.separator, 0.65),
  },
  label: {
    ...Typography.body,
    fontSize: Typography.body.fontSize - 1,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  labelActive: {
    color: Colors.text,
  },
  labelInactive: {
    color: Colors.textMuted,
  },
});
