// 1) Polyfills / gesture handler, si los necesitas:
import "react-native-url-polyfill/auto";
import "react-native-gesture-handler";

import { AppRegistry } from "react-native";
import App from "./App";

// 3) Registra tu App como "main" — Metro ya la buscará con este nombre
AppRegistry.registerComponent("main", () => App);
