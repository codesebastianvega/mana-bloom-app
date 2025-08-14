// [MB] Módulo: Home / Estilos: HomeWelcomeCard
// Afecta: HomeWelcomeCard
// Propósito: Estilos para tarjeta de bienvenida con KPIs
// Puntos de edición futura: sombras y blur avanzado
// Autor: Codex - Fecha: 2025-02-15

import { StyleSheet } from "react-native";
import { Colors, Spacing, Radii, Typography, Elevation } from "../../theme";

export default StyleSheet.create({
  wrapper: {
    position: "relative",
    borderRadius: Radii.xl,
    overflow: "visible",
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Radii.xl,
  },
  blurFallback: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Radii.xl,
    backgroundColor: Colors.overlay,
  },
  container: {
    borderRadius: Radii.xl,
    padding: Spacing.large,
    paddingBottom: Spacing.base,
    ...Elevation.card,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
  },
  kpiRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: Spacing.small,
    marginBottom: Spacing.base,
    gap: Spacing.small,
  },
  kpiBox: {
    flex: 1,
    height: 30,
    borderRadius: Radii.md,
    backgroundColor: Colors.surface + "80",
    justifyContent: "center",
    alignItems: "center",
  },
  kpiNumber: {
    ...Typography.title,
    fontSize: 16,
    color: Colors.text,
  },
  kpiLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  nextButton: {
    alignSelf: "flex-end",
    backgroundColor: Colors.accent,
    paddingHorizontal: Spacing.base,
    height: 30,
    borderRadius: Radii.md,
    justifyContent: "center",
  },
  nextText: {
    ...Typography.caption,
    color: Colors.onAccent,
  },
});

