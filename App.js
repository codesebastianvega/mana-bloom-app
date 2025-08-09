// App.js

import React from "react";
import { SafeAreaView, StyleSheet } from "react-native";
import { Colors } from "./src/theme";
import TasksScreen from "./src/screens/TasksScreen";

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <TasksScreen />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, // <-- aquí usamos tu token de tema
  },
});
