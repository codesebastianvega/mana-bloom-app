// [MB] Modulo: Planta / Seccion: Pantalla principal (estilos)
// Afecta: PlantScreen
// Proposito: Estilos alineados al dashboard renovado
// Puntos de edicion futura: variantes responsivas y animaciones
// Autor: Codex - Fecha: 2025-10-21

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Elevation } from "../theme";

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
    paddingBottom: Spacing.xlarge * 2,
    gap: Spacing.large,
  },
  contentInner: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.base,
    gap: Spacing.large,
  },
  elementBalanceSection: {
    gap: Spacing.small,
  },
  contentTablet: {
    paddingHorizontal: Spacing.xlarge,
    maxWidth: 960,
    alignSelf: "center",
    width: "100%",
  },
  actionToastContainer: {
    position: "absolute",
    left: Spacing.base,
    right: Spacing.base,
    alignItems: "center",
    zIndex: 120,
  },
  actionToastCard: {
    minWidth: 180,
    maxWidth: 320,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: withAlpha(Colors.accent, 0.6),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.7),
    overflow: "hidden",
    ...Elevation.raised,
    alignItems: "center",
  },
  actionToastContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.small,
  },
  actionToastDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.6,
    shadowRadius: 6,
  },
  actionToastText: {
    ...Typography.caption,
    color: Colors.text,
    textAlign: "center",
    flexShrink: 1,
  },
  dualRow: {
    flexDirection: "row",
    gap: Spacing.large,
  },
  dualCard: {
    flex: 1,
  },
  heroTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.small,
  },
  statusHeaderRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  statusBellWrap: {
    position: "relative",
    padding: 2,
  },
  statusBellDot: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  
  // Economia mini
  statusEconomyRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.tiny,
  },
  statusEconomyItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    paddingHorizontal: Spacing.tiny,
    paddingVertical: 2,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.25),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.25),
  },
  statusEconomyItemMana: {
    borderColor: withAlpha(Colors.secondary, 0.5),
    backgroundColor: withAlpha(Colors.secondary, 0.15),
  },
  statusEconomyItemCoins: {
    borderColor: withAlpha(Colors.accent, 0.5),
    backgroundColor: withAlpha(Colors.accent, 0.15),
  },
  statusEconomyItemGems: {
    borderColor: withAlpha(Colors.secondaryLight, 0.5),
    backgroundColor: withAlpha(Colors.secondaryLight, 0.18),
  },
  statusEconomyIcon: {
    opacity: 0.9,
  },
  statusEconomyImgIcon: {
    width: 12,
    height: 12,
    resizeMode: 'contain',
    opacity: 0.9,
  },
  statusEconomyText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  statusGrowthRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    marginTop: Spacing.tiny,
  },
  statusGrowthLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
  },
  statusGrowthText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  statusGrowthDot: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "700",
    marginHorizontal: 2,
  },
  statusStreakRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    paddingHorizontal: Spacing.tiny,
    paddingVertical: 2,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.25),
  },
  statusStreakDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.accent,
  },
  statusStreakLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  statusHealthCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: Colors.success,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: withAlpha(Colors.success, 0.08),
    marginLeft: Spacing.small,
  },
  statusHealthCircleText: {
    ...Typography.caption,
    color: Colors.success,
    fontWeight: "700",
  },
  statusGrowthBar: {
    height: 14,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surface, 0.35),
    overflow: "hidden",
    marginTop: Spacing.tiny,
    position: "relative",
  },
  statusGrowthFill: {
    height: "100%",
    borderRadius: Radii.pill,
    backgroundColor: Colors.primary,
  },
  statusGrowthShimmer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
  statusGrowthPercentOnBar: {
    ...Typography.caption,
    color: Colors.text,
    position: "absolute",
    right: Spacing.small,
    top: 0,
    lineHeight: 14,
    fontWeight: "700",
  },
  statusChipsGrid: {
    flexDirection: "row",
    gap: Spacing.small,
    marginTop: Spacing.small,
    flexWrap: "wrap",
    alignItems: "stretch",
  },
  statusChip: {
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: withAlpha(Colors.cardBorder, 0.9),
    backgroundColor: withAlpha(Colors.surface, 0.55),
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
    flexBasis: "49%",
    minWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusChipText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
    textAlign: 'center',
  },
  statusSuggestRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.tiny,
  },
  statusSuggestLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  statusSuggestValue: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
  },
  statusSuggestCta: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: "700",
  },
  statusGrowthLabelRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    marginTop: Spacing.tiny,
  },
  statusGrowthLabelIcon: {
    opacity: 0.8,
  },
  statusBuffsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    marginTop: Spacing.tiny,
    flexWrap: "wrap",
  },
  statusBuffTag: {
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.35),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.35),
    paddingHorizontal: Spacing.small,
    paddingVertical: 2,
  },
  statusBuffText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  // [MB] Hero / progreso
  heroCard: {
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: withAlpha(Colors.surfaceElevated, 0.5),
    backgroundColor: withAlpha(Colors.surface, 0.55),
    padding: Spacing.base + Spacing.small,
    gap: Spacing.large,
  },
  heroSectionTitle: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "700",
  },
  heroHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.base,
  },
  heroSectionCopy: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  heroSectionButton: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: Colors.secondary,
    backgroundColor: Colors.surfaceAlt,
  },
  heroSectionButtonText: {
    ...Typography.caption,
    color: Colors.secondary,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  heroEdgeSection: {
    marginHorizontal: -Spacing.base,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing.small * 0.5,
    paddingBottom: Spacing.large,
    gap: Spacing.small,
  },
  heroGradient: {
    borderRadius: Radii.lg,
    padding: Spacing.base,
    overflow: "hidden",
  },
  heroVignette: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    pointerEvents: "none",
  },
  heroPlantWrap: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: Spacing.small,
  },
  heroStatsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  heroNotch: {
    position: "absolute",
    top: Spacing.small,
    right: Spacing.small,
  },
  resourceChipsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginBottom: Spacing.small,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.3),
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.18),
  },
  chipText: {
    ...Typography.caption,
    color: Colors.text,
  },
  chipDelta: {
    ...Typography.caption,
    color: Colors.success,
    fontWeight: "700",
  },
  heroStatCard: {
    flex: 1,
    alignItems: "center",
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.32),
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.22),
    borderRadius: Radii.lg,
    paddingVertical: Spacing.small,
  },
  heroStatValue: {
    ...Typography.title,
    color: Colors.text,
  },
  heroStatLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  growthBar: {
    height: 8,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.text, 0.12),
    overflow: "hidden",
  },
  xpRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: Spacing.small,
    marginBottom: Spacing.tiny,
  },
  sectionHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  growthBarFill: {
    height: "100%",
    backgroundColor: Colors.accent,
    borderRadius: Radii.pill,
  },
  growthEta: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: "right",
  },
  growthStagesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Spacing.small,
  },
  growthStage: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.tiny,
  },
  growthStageActive: {},
  growthStageIcon: {
    marginBottom: Spacing.tiny,
  },
  growthStageLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  growthStageLabelActive: {
    color: Colors.success,
    fontWeight: "700",
  },
  evolveButton: {
    alignSelf: "flex-start",
    marginTop: Spacing.small,
    paddingHorizontal: Spacing.large,
    paddingVertical: Spacing.small,
    borderRadius: Radii.pill,
    backgroundColor: Colors.accent,
  },
  evolveButtonText: {
    ...Typography.body,
    color: Colors.onAccent,
    fontWeight: "700",
  },
  floatingActions: {
    display: 'none',
  },
  floatingAction: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.5),
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.22),
  },
  floatingActionText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  skinButton: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surface, 0.5),
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.18),
    alignSelf: "flex-start",
    marginTop: Spacing.tiny,
  },
  skinButtonText: {
    ...Typography.caption,
    color: Colors.text,
  },
  buffSection: {
    marginTop: Spacing.small,
  },
  buffTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginBottom: Spacing.tiny,
  },
  buffList: {
    paddingVertical: 0,
  },
  heroBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  heroBadge: {
    ...Typography.caption,
    color: Colors.text,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surface, 0.5),
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.18),
  },
  growthLevelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.small,
  },
  growthLevelLabel: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  // [MB] Secciones gen�ricas
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: Spacing.small,
  },
  sectionTitle: {
    ...Typography.title,
    color: Colors.text,
  },
  sectionCaption: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  statusCard: {
    borderRadius: Radii.xl,
    padding: Spacing.base,
    gap: Spacing.small,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.25),
    backgroundColor: withAlpha(Colors.surface, 0.6),
  },
  statusHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: Spacing.small,
  },
  statusTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    flex: 1,
  },
  statusTitle: {
    ...Typography.h2,
    color: Colors.text,
    flexShrink: 1,
  },
  statusNameInput: {
    ...Typography.h2,
    color: Colors.text,
    flex: 1,
  },
  statusEditIcon: {
    opacity: 0.6,
  },
  statusHealthBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surface, 0.5),
  },
  statusHealthValue: {
    ...Typography.body,
    fontWeight: "700",
    color: Colors.success,
  },
  statusMessage: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginBottom: Spacing.tiny,
  },
  statusBar: {
    height: 8,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.4),
    overflow: "hidden",
    marginTop: Spacing.tiny,
    marginBottom: Spacing.small + Spacing.tiny,
  },
  statusBarFill: {
    height: "100%",
    borderRadius: Radii.pill,
    backgroundColor: Colors.success,
  },
  statusStatsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
    justifyContent: "flex-start",
  },
  statusStatCard: {
    flexGrow: 1,
    minWidth: 96,
    backgroundColor: withAlpha(Colors.surface, 0.5),
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.25),
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small + Spacing.tiny,
    alignItems: "flex-start",
    gap: Spacing.tiny / 2,
  },
  statusStatValue: {
    ...Typography.body,
    fontSize: Typography.body.fontSize + 2,
    fontWeight: "700",
    color: Colors.text,
  },
  statusStatLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  heroCard: {
    borderRadius: Radii.xl,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.22),
    backgroundColor: withAlpha(Colors.surfaceAlt, 0.72),
  },
  heroGradient: {
    padding: Spacing.large,
    gap: Spacing.large,
  },
  heroPlantWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  heroBadgeRow: {
    alignItems: "center",
  },
  heroBadge: {
    ...Typography.caption,
    fontWeight: "600",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surface, 0.6),
    color: Colors.text,
  },
  heroStatsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: Spacing.base,
    flexWrap: "wrap",
  },
  heroStat: {
    flexGrow: 1,
    minWidth: 96,
    alignItems: "center",
    gap: Spacing.tiny,
  },
  heroStatTablet: {
    minWidth: 140,
  },
  heroStatValue: {
    ...Typography.h2,
    color: Colors.text,
  },
  heroStatLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    textAlign: "center",
  },
  buffSection: {
    gap: Spacing.small,
  },
  buffTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    letterSpacing: 0.2,
  },
  buffList: {
    gap: Spacing.small,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  sectionTitle: {
    ...Typography.h2,
    color: Colors.text,
  },
  sectionCaption: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  sectionHint: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  growthLevelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  growthLevelLabel: {
    ...Typography.body,
    fontWeight: "700",
    color: Colors.text,
  },
  growthBar: {
    height: 10,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.35),
    overflow: "hidden",
  },
  growthBarFill: {
    height: "100%",
    borderRadius: Radii.pill,
    backgroundColor: Colors.primaryFantasy,
  },
  growthStagesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.small,
  },
  growthStage: {
    flex: 1,
    alignItems: "center",
    gap: Spacing.tiny,
  },
  growthStageActive: {},
  growthStageIcon: {
    marginBottom: Spacing.tiny / 2,
  },
  growthStageLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  growthStageLabelActive: {
    color: Colors.success,
    fontWeight: "600",
  },
  elementSummaryRow: {
    flexDirection: "column",
    gap: Spacing.large,
  },
  elementSummaryRowTablet: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.xlarge,
  },
  elementBlock: {
    alignItems: "center",
    gap: Spacing.base,
  },
  elementDonut: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.25),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.48),
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
  },
  elementDonutGradient: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.85,
  },
  elementDonutTrack: {
    position: "absolute",
    top: 8,
    left: 8,
    right: 8,
    bottom: 8,
    borderRadius: 52,
    backgroundColor: withAlpha(Colors.surface, 0.55),
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.2),
  },
  elementDonutMarker: {
    position: "absolute",
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: withAlpha(Colors.surface, 0.35),
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 6,
    elevation: 4,
  },
  elementDonutMarkerLabel: {
    ...Typography.caption,
    fontSize: 10,
    fontWeight: "700",
    color: Colors.onAccent,
  },
  elementDonutInner: {
    width: 92,
    height: 92,
    borderRadius: 46,
    backgroundColor: withAlpha(Colors.surface, 0.82),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.35),
    gap: Spacing.tiny / 2,
  },
  elementDonutValue: {
    ...Typography.h1,
    fontSize: 28,
    color: Colors.text,
  },
  elementDonutLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  elementDonutSubLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontSize: 11,
  },
  elementGrid: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
  },
  elementGridWide: {
    flexBasis: "60%",
  },
  elementTile: {
    flexGrow: 1,
    minWidth: 148,
    backgroundColor: withAlpha(Colors.surface, 0.5),
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.22),
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.small + Spacing.tiny,
    gap: Spacing.small,
  },
  elementTileWide: {
    flexBasis: "46%",
  },
  elementTileHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  elementInfoBlock: {
    flex: 1,
    gap: Spacing.tiny,
  },
  elementIconInline: {
    width: 32,
    height: 32,
  },
  elementIconFallbackInline: {
    width: 32,
    height: 32,
    borderRadius: 16,
    opacity: 0.75,
  },
  elementChip: {
    alignSelf: "flex-start",
    marginTop: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.pill,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.35),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.35),
  },
  elementChipText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "600",
  },
  elementLineStrong: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  elementLine: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  elementTrack: {
    height: 6,
    borderRadius: Radii.pill,
    backgroundColor: withAlpha(Colors.surface, 0.35),
    overflow: "hidden",
  },
  elementTrackFill: {
    height: "100%",
    borderRadius: Radii.pill,
  },
  achievementGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.small,
  },
  achievementGridWide: {
    gap: Spacing.base,
  },
  achievementItem: {
    flexBasis: "48%",
    padding: Spacing.base,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.22),
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.32),
    gap: Spacing.tiny,
  },
  achievementItemWide: {
    flexBasis: "23%",
  },
  achievementItemEarned: {
    borderColor: withAlpha(Colors.success, 0.6),
    backgroundColor: withAlpha(Colors.success, 0.18),
  },
  achievementItemProgress: {
    borderColor: withAlpha(Colors.warning, 0.5),
    backgroundColor: withAlpha(Colors.warning, 0.15),
  },
  achievementItemLocked: {
    opacity: 0.6,
  },
  achievementTitle: {
    ...Typography.body,
    fontWeight: "700",
    color: Colors.text,
  },
  achievementDescription: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  inventoryRow: {
    flexDirection: "row",
    gap: Spacing.small,
  },
  inventoryRowWrap: {
    flexWrap: "wrap",
    gap: Spacing.base,
  },
  inventoryCard: {
    flex: 1,
    backgroundColor: withAlpha(Colors.surfaceElevated, 0.32),
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: withAlpha(Colors.primaryLight, 0.22),
    padding: Spacing.small,
    gap: Spacing.small,
    alignItems: "flex-start",
  },
  inventoryCardWide: {
    flexBasis: "31%",
    minWidth: 196,
  },
  inventoryCardActive: {
    borderColor: withAlpha(Colors.primary, 0.6),
  },
  inventoryThumb: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: Radii.md,
    backgroundColor: withAlpha(Colors.primary, 0.25),
  },
  inventoryLabel: {
    ...Typography.body,
    color: Colors.text,
  },
  inventoryBadge: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  linkText: {
    ...Typography.caption,
    color: Colors.primary,
    fontWeight: "600",
  },
});












