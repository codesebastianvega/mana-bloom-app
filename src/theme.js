// [MB] Modulo: Sistema de diseno / Seccion: Tokens globales
// Afecta: toda la app (colores, espaciado, tipografia, radios, elevacion)
// Proposito: unificar estilos y facilitar que Codex y yo creemos UI coherente
// Puntos de edicion futura: Typography, Radii
// Autor: Codex - Fecha: 2025-10-20

export const Opacity = {
  disabled: 0.5,
  overlay: 0.06,
  muted: 0.7,
};

export const Colors = {
  // Base
  background: "#0e0a1e", // Fondo oscuro profundo
  surface: "#1b1231", // Superficie ligeramente más clara
  surfaceAlt: "#1a1430",
  surfaceElevated: "#251a3f",
  border: "#2e2548",
  separator: "#3a2b5e",
  overlay: `rgba(0,0,0,${Opacity.overlay})`,
  shadow: "#000000",

  // Marca
  primary: "#7e57c2", // Púrpura místico
  primaryLight: "#b39ddb",
  secondary: "#1cd47bff", // Turquesa etéreo (con alpha)
  secondaryLight: "#80deea",
  accent: "#ffca28", // Dorado suave para acentos
  onAccent: "#0e0a1e",

  // Componentes
  taskCardBackground: "#251a3f",
  taskCardGlow: "#c2a7ff",

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
  icon: "#FFFFFF", // Icons mirror text color for contrast

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

  card: "#1b1231",
  cardBorder: "#2e2548",
  onCard: "#FFFFFF",

  // Rituales
  ritualCalm: "#7c7cf8",
  ritualHydrate: "#41c8f4",
  ritualStretch: "#5be7c8",
  ritualSun: "#f5c35c",
  ritualFocus: "#c0a5ff",
  ritualJournal: "#f28db2",
  ritualGratitude: "#ff9bb0",
};


export const Spacing = {
  tiny: 4,
  small: 8,
  base: 16,
  large: 24,
  xlarge: 32,
};

export const Radii = {
  sm: 6,
  md: 10,
  lg: 14,
  xl: 18,
  pill: 999,
};

export const Typography = {
  screenTitle: { fontSize: 30, fontWeight: "700", lineHeight: 36 },
  h1: { fontSize: 24, fontWeight: "700", lineHeight: 30 },
  h2: { fontSize: 20, fontWeight: "700", lineHeight: 26 },
  sectionTitle: { fontSize: 20, fontWeight: "700", lineHeight: 26 },
  title: { fontSize: 18, fontWeight: "600", lineHeight: 24 },
  sectionSubtitle: { fontSize: 16, fontWeight: "500", lineHeight: 22 },
  cardTitle: { fontSize: 16, fontWeight: "600", lineHeight: 22 },
  cardSubtitle: { fontSize: 13, fontWeight: "500", lineHeight: 18 },
  body: { fontSize: 14, fontWeight: "400", lineHeight: 20 },
  button: {
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 18,
    letterSpacing: 0.5,
  },
  caption: { fontSize: 12, fontWeight: "500", lineHeight: 16 },
  label: {
    fontSize: 12,
    fontWeight: "600",
    lineHeight: 16,
    letterSpacing: 0.6,
  },
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
  growth: [Colors.success, Colors.secondary],
};

export const CardStyles = {
  base: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
  },
  elevated: {
    backgroundColor: Colors.surfaceElevated,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: Colors.cardBorder,
    ...Elevation.card,
  },
};


export const ElementAccents = {
  gradients: {
    xp: {
      low: {
        colors: [Colors.primaryLight, Colors.primary],
        locations: [0, 1],
        angle: 45,
      },
      med: {
        colors: [Colors.primary, Colors.secondary],
        locations: [0, 1],
        angle: 45,
      },
      high: {
        colors: [Colors.secondary, Colors.accent],
        locations: [0, 1],
        angle: 45,
      },
    },
    potions: {
      colors: [Colors.primaryFantasy, Colors.primaryLight],
      locations: [0, 1],
      angle: 45,
    },
    tools: {
      colors: [Colors.elementEarth, Colors.elementEarthLight],
      locations: [0, 1],
      angle: 45,
    },
    cosmetics: {
      colors: [Colors.secondaryFantasy, Colors.accent],
      locations: [0, 1],
      angle: 45,
    },
    gem: {
      colors: [Colors.secondaryLight, Colors.secondary],
      locations: [0, 1],
      angle: 45,
    },
  },
  accentCta: Colors.accent,
};

export const CategoryAccents = {
  potions: Colors.primaryFantasy,
  tools: Colors.secondary,
  cosmetics: Colors.secondaryFantasy,
  seeds: Colors.elementEarth,
  pets: Colors.warning,
  inventory: Colors.accent,
};

export const PriorityAccents = {
  easy: Colors.secondary,
  medium: Colors.accent,
  hard: Colors.danger,
};

export const isDarkTheme = true;
