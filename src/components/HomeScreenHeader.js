import React from "react";
import { View, Text } from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./HomeScreenHeader.styles";
import { Colors } from "../theme";

export default function HomeScreenHeader({ userName, manaCount, plantState }) {
  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>¡Hola, {userName}!</Text>
      <View style={styles.statusContainer}>
        <View style={styles.statusItem}>
          <LinearGradient
            colors={[Colors.primary, Colors.secondary]}
            style={styles.iconBackground}
          >
            <FontAwesome5 name="leaf" size={16} color={Colors.text} />
          </LinearGradient>
          <Text style={styles.statusText}>{plantState}</Text>
        </View>
        <View style={styles.statusItem}>
          <LinearGradient
            colors={[Colors.secondary, Colors.primary]}
            style={styles.iconBackground}
          >
            <Ionicons name="flash" size={16} color={Colors.text} />
          </LinearGradient>
          <Text style={styles.statusText}>{manaCount}</Text>
        </View>
      </View>
    </View>
  );
}
