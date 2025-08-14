// [MB] Módulo: Core / Archivo: App
// Afecta: navegación global
// Propósito: Configurar navegación y proveer contexto global
// Puntos de edición futura: agregar providers adicionales
// Autor: Codex - Fecha: 2025-08-13

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Colors } from "./src/theme";

import Footer from "./src/components/Footer";
import HomeScreen from "./src/screens/HomeScreen";
import TasksScreen from "./src/screens/TasksScreen";
import PlantScreen from "./src/screens/PlantScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import InventoryScreen from "./src/screens/InventoryScreen";
import NewsInboxScreen from "./src/screens/NewsInboxScreen";
import ShopScreen from "./src/screens/ShopScreen";
import RewardsScreen from "./src/screens/RewardsScreen";
import { AppProvider } from "./src/state/AppContext";

const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

function TabsNavigator() {

  return (
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
  );
}

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <RootStack.Navigator screenOptions={{ headerShown: false }}>
          <RootStack.Screen name="Tabs" component={TabsNavigator} />
          <RootStack.Screen
            name="InventoryModal"
            component={InventoryScreen}
            options={{ presentation: "modal" }}
          />
          <RootStack.Screen
            name="NewsInboxModal"
            component={NewsInboxScreen}
            options={{ presentation: "modal", headerShown: false }}
          />
          <RootStack.Screen
            name="ShopScreen"
            component={ShopScreen}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="Rewards"
            component={RewardsScreen}
            options={{ headerShown: false }}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}
