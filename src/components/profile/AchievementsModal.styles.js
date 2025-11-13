// [MB] Modulo: Profile / Seccion: AchievementsModal (estilos)
// Afecta: AchievementsModal
// Proposito: Estilos base para modal de logros
// Puntos de edicion futura: adaptar para tablets y mejorar animaciones
// Autor: Codex - Fecha: 2025-10-21

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography } from "../../theme";

const withAlpha = (hex = "", alpha = 1) => {
  if (!hex) return hex;
  const cleaned = `${hex}`.replace("#", "").trim();
  if (cleaned.length !== 6 && cleaned.length !== 8) {
    return hex;
  }
  const value = parseInt(cleaned.slice(0, 6), 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

export default StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "flex-end",
  },
  sheet: {
    backgroundColor: withAlpha(Colors.surface, 0.95),
    borderTopLeftRadius: Radii.xl,
    borderTopRightRadius: Radii.xl,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.large,
    paddingBottom: Spacing.xlarge,
    gap: Spacing.base,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.25),
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  list: {
    gap: Spacing.small,
    paddingBottom: Spacing.xlarge,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.4),
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.2),
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
  },
  itemUnlocked: {
    borderColor: withAlpha(Colors.secondary, 0.5),
    backgroundColor: withAlpha(Colors.secondary, 0.18),
  },
  itemClaimed: {
    borderColor: withAlpha(Colors.accent, 0.45),
    backgroundColor: withAlpha(Colors.accent, 0.18),
  },
  iconWrap: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: withAlpha(Colors.surface, 0.5),
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: Colors.text,
  },
  itemText: {
    flex: 1,
    gap: Spacing.tiny / 2,
  },
  itemTitle: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "600",
  },
  itemDescription: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  statusTag: {
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surface, 0.5),
  },
  statusText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
});
