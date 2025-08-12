// [MB] Módulo: Core / Archivo: App
// Afecta: navegación global
// Propósito: Configurar navegación y proveer contexto global
// Puntos de edición futura: agregar providers adicionales
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "./src/theme";

import Footer from "./src/components/Footer";
import HomeScreen from "./src/screens/HomeScreen";
import TasksScreen from "./src/screens/TasksScreen";
import PlantScreen from "./src/screens/PlantScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import { AppProvider } from "./src/state/AppContext";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{ headerShown: false }}
          tabBar={(props) => <Footer {...props} />}
          sceneContainerStyle={{ backgroundColor: Colors.background }}
        >
          <Tab.Screen name="HomeScreen" component={HomeScreen} />
          <Tab.Screen name="TasksScreen" component={TasksScreen} />
          <Tab.Screen name="PlantScreen" component={PlantScreen} />
          <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
