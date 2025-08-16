// [MB] Módulo: Home / Estilos: HomeWelcomeCard
// Afecta: HomeWelcomeCard
// Propósito: Estilos para tarjeta de bienvenida con KPIs
// Puntos de edición futura: sombras y blur avanzado
// Autor: Codex - Fecha: 2025-02-15

import { StyleSheet } from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Typography,
  Elevation,
  ElementAccents,
} from "../../theme";

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
    padding: Spacing.base,
    ...Elevation.card,
  },
  title: {
    ...Typography.title,
    color: Colors.onAccent,
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
    height: 28,
    borderRadius: Radii.lg,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    justifyContent: "center",
    alignItems: "center",
    ...Elevation.raised,
  },
  kpiNumber: {
    ...Typography.body,
    fontWeight: "600",
    color: Colors.onCard,
  },
  kpiLabel: {
    ...Typography.caption,
    color: Colors.onCard,
  },
  nextButton: {
    alignSelf: "flex-end",
    backgroundColor: ElementAccents.accentCta,
    paddingHorizontal: Spacing.base,
    height: 30,
    borderRadius: Radii.lg,
    justifyContent: "center",
    ...Elevation.raised,
  },
  nextText: {
    ...Typography.caption,
    color: Colors.onAccent,
  },
});

