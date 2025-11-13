// [MB] SearchBar.styles — ajusta buscador full-width
// [MB] Módulo: Tasks / Sección: Barra de búsqueda
// Afecta: SearchBar
// Propósito: Estilo alineado al tema
// Puntos de edición futura: focos y estados deshabilitados
// Autor: Codex - Fecha: 2025-08-14

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii } from "../../theme";

const withAlpha = (hex = "", alpha = 1) => {
  const cleaned = `${hex}`.replace("#", "");
  if (cleaned.length !== 6) {
    return hex;
  }
  const value = parseInt(cleaned, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const BOX_BACKGROUND = withAlpha(Colors.surfaceElevated, 0.4);
const BOX_BORDER = withAlpha(Colors.primaryLight, 0.25);

export default StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    gap: Spacing.small,
  },
  searchBox: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    backgroundColor: BOX_BACKGROUND,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: BOX_BORDER,
    minHeight: Spacing.large + Spacing.small,
    gap: Spacing.small,
  },
  input: {
    flex: 1,
    color: Colors.text,
    fontSize: 14,
    padding: 0,
  },
  filterButton: {
    width: Spacing.base * 2.2,
    height: Spacing.base * 2.2,
    borderRadius: Radii.lg,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: BOX_BACKGROUND,
    borderWidth: 1,
    borderColor: BOX_BORDER,
  },
});
