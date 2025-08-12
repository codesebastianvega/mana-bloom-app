import React from "react";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "../theme";
import HomeScreenHeader from "../components/HomeScreenHeader";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <HomeScreenHeader
        userName="Jugador"
        manaCount={50}
        plantState="Floreciendo"
      />
    </SafeAreaView>
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
