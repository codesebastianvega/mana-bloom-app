// src/theme.js
/* [MB] Módulo: Sistema de diseño / Sección: Tokens globales
   Afecta: toda la app (colores, espaciado, tipografía, radios, elevación)
   Propósito: unificar estilos y facilitar que Codex y yo creemos UI coherente
   Puntos de edición futura: Typography, Radii
   Autor: Codex - Fecha: 2025-08-16
*/

export const Colors = {
  // Base
  background: "#0e0a1e", // Fondo oscuro profundo
  surface: "#1b1231", // Superficie ligeramente más clara
  surfaceAlt: "#1a1430",
  surfaceElevated: "#251a3f",
  border: "#2e2548",
  separator: "#3a2b5e",
  overlay: "rgba(0,0,0,0.5)",
  shadow: "#000000",

  // Marca
  primary: "#7e57c2", // Púrpura místico
  primaryLight: "#b39ddb",
  secondary: "#1cd47bff", // Turquesa etéreo (con alpha)
  secondaryLight: "#80deea",
  accent: "#ffca28", // Dorado suave para acentos
  onAccent: "#0e0a1e",

  // Fantasía (gradientes/decor)
  primaryFantasy: "#B542F6",
  secondaryFantasy: "#FFD700",

  // Estados
  success: "#1db954",
  warning: "#f5a623",
  danger: "#ef5350",
  info: "#64b5f6",

  // Texto
  text: "#FFFFFF",
  textMuted: "#b0bec5",
  textInverse: "#0e0a1e",
  icon: "#FFFFFF",

  // Controles
  buttonBg: "#00B4D8",
  filterBtnBg: "#222a36",

  // Elementos (rituales)
  elementWater: "#29b6f6",
  elementWaterLight: "#81d4fa",
  elementEarth: "#8d6e63",
  elementEarthLight: "#bcaaa4",
  elementFire: "#ff7043",
  elementFireLight: "#ffab91",
  elementAir: "#90a4ae",
  elementAirLight: "#cfd8dc",
};

export const Spacing = {
  tiny: 4,
  small: 8,
  base: 16,
  large: 24,
  xlarge: 32,
};

export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
};

export const Typography = {
  h1: { fontSize: 24, fontWeight: "700", lineHeight: 30 },
  h2: { fontSize: 20, fontWeight: "700", lineHeight: 26 },
  title: { fontSize: 18, fontWeight: "600", lineHeight: 24 },
  body: { fontSize: 14, fontWeight: "400", lineHeight: 20 },
  caption: { fontSize: 12, fontWeight: "500", lineHeight: 16 },
};

export const Elevation = {
  card: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 6,
  },
  raised: {
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
};

export const Gradients = {
  mana: [Colors.primaryFantasy, Colors.secondaryFantasy],
  xp: [Colors.primary, Colors.primaryLight],
};


export const Opacity = {
  disabled: 0.5,
  muted: 0.7,
};

export const isDarkTheme = true;
