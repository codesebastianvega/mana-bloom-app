// App.js

import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View, Text } from "react-native";
import { Colors } from "./src/theme";
import TasksScreen from "./src/screens/TasksScreen";
import Footer from "./src/components/Footer";

export default function App() {
  const [activeScreen, setActiveScreen] = useState("tasks");

  const handleNavigate = (screen) => {
    setActiveScreen(screen);
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case "tasks":
        return <TasksScreen />;
      case "plant":
        return (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Planta</Text>
          </View>
        );
      case "stats":
        return (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Estadísticas</Text>
          </View>
        );
      case "profile":
        return (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>Perfil</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {renderScreen()}
      <Footer activeScreen={activeScreen} onNavigate={handleNavigate} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // <-- aquí usamos tu token de tema
  },
  placeholder: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    color: Colors.text,
    fontSize: 16,
  },
});
