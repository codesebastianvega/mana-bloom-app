import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../theme";
import HomeScreenHeader from "../components/HomeScreenHeader";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <HomeScreenHeader
        userName="Jugador"
        manaCount={50}
        plantState="Floreciendo"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "stretch",
    backgroundColor: Colors.background,
  },
});
