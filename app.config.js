// [MB] Modulo: Core / Seccion: ExpoConfig
// Afecta: configuracion nativa (splash, iconos, updates)
// Proposito: centralizar overrides dinamicos de Expo y nuevos assets nativos
// Puntos de edicion futura: cuando cambien assets globales o deep linking
// Autor: Codex - Fecha: 2025-11-22

const baseConfig = require("./app.json");

module.exports = {
  expo: {
    ...baseConfig.expo,
    splash: {
      ...(baseConfig.expo?.splash ?? {}),
      image: "./assets/Manabloomsplashes/inicio.png",
      resizeMode: "cover",
      backgroundColor: "#0e0a1e",
    },
  },
};
