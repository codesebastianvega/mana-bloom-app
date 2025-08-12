import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Colors } from "./src/theme";

import Footer from "./src/components/Footer";
import HomeScreen from "./src/screens/HomeScreen";
import TasksScreen from "./src/screens/TasksScreen";
import MiPlantaScreen from "./src/screens/MiPlantaScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={{ headerShown: false }}
        tabBar={(props) => <Footer {...props} />}
        sceneContainerStyle={{ backgroundColor: Colors.background }}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="TasksScreen" component={TasksScreen} />
        <Tab.Screen name="MiPlantaScreen" component={MiPlantaScreen} />
        <Tab.Screen name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
