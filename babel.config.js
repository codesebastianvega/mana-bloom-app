module.exports = {
  presets: ["babel-preset-expo"],
  plugins: [
    // otros plugins…
    "react-native-reanimated/plugin", // ← ¡debe ir siempre al final!
  ],
};
