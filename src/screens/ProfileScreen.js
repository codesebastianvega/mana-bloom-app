import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../theme";

export default function ProfileScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Perfil</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.background,
  },
  text: {
    color: Colors.text,
    fontSize: 16,
  },
});
