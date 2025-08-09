// src/components/StatsHeader.js

import React from "react";
import { View, Text, StyleSheet, Platform, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Colors, Spacing } from "../theme";

const StatsHeader = ({ level, xp, mana }) => {
  const percent = Math.min(Math.max((xp / 100) * 100, 0), 100);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View style={styles.levelContainer}>
          <Text style={styles.levelText}>Level {level}</Text>
          <Text style={styles.xpText}>{xp}/100 XP</Text>
        </View>
        <Text style={styles.manaText}>Vida: {mana}</Text>
      </View>
      <View style={styles.progressBackground}>
        <LinearGradient
          colors={[Colors.secondary, Colors.primary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.progressFill, { width: `${percent}%` }]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop:
      Platform.OS === "android" ? StatusBar.currentHeight / 4 : Spacing.tiny,
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    backgroundColor: Colors.surface,
    borderRadius: 12,
    marginBottom: Spacing.small,
    shadowColor: "#000",
    paddingBottom: Spacing.base,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: Spacing.base,
  },
  levelContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
  levelText: {
    fontSize: 18,
    color: Colors.text,
    fontWeight: "600",
    marginRight: Spacing.small,
  },
  xpText: {
    fontSize: 14,
    color: Colors.text,
  },
  manaText: {
    fontSize: 14,
    color: Colors.text,
    fontWeight: "600",
  },
  progressBackground: {
    width: "100%",
    height: Spacing.small,
    backgroundColor: Colors.background,
    borderRadius: Spacing.small / 2,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: Spacing.small / 2,
  },
});

export default StatsHeader;
