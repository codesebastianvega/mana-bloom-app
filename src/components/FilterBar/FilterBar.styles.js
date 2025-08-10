// src/components/FilterBar/FilterBar.styles.js
import { StyleSheet } from "react-native";
import { Colors, Spacing } from "../../theme";

export default StyleSheet.create({
  // wrapper externo para margen
  wrapper: {
    marginVertical: Spacing.small,
  },

  // barra “glass”
  glassBar: {
    backgroundColor: "rgba(255,255,255,0.04)", // traslúcido
    borderColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 8,
  },

  // Scroll horizontal
  container: {
    flexGrow: 0,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // “botón” transparente (solo texto/ícono cambian)
  btn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
    marginRight: Spacing.small,
    backgroundColor: "transparent",
  },

  icon: {
    marginRight: 6,
  },

  // texto base
  text: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: "500",
  },

  // refuerzo para activo
  textActive: {
    fontWeight: "700",
    // “glow” suave (iOS). En Android se nota menos, pero no molesta.
    textShadowColor: "rgba(255,255,255,0.15)",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 4,
  },

  // subrayado bajo la palabra
  underline: {
    height: 2,
    borderRadius: 2,
    marginTop: 3,
  },
});
