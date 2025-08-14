// [MB] Módulo: Home / Sección: HomeWelcomeCard
// Afecta: HomeScreen
// Propósito: Tarjeta de bienvenida con saludo y KPIs diarios
// Puntos de edición futura: animaciones y origen de datos real
// Autor: Codex - Fecha: 2025-02-15

import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import styles from "./HomeWelcomeCard.styles";
import { Gradients } from "../../theme";
import { useAppState, useDailyChallenges } from "../../state/AppContext";
import { getTasks } from "../../storage";

let BlurView;
try {
  BlurView = require("expo-blur").BlurView;
} catch (e) {
  BlurView = null;
}

export default function HomeWelcomeCard({ onNext }) {
  const { displayName } = useAppState();
  const { items } = useDailyChallenges();
  const [taskCounts, setTaskCounts] = useState({ tasks: null, habits: null });
  const chipsAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(chipsAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [chipsAnim]);

  useEffect(() => {
    getTasks().then((ts) => {
      const tasks = ts.filter((t) => t.type === "single" && !t.completed).length;
      const habits = ts.filter((t) => t.type === "habit" && !t.completed).length;
      setTaskCounts({ tasks, habits });
    });
  }, []);

  const completedChallenges = items.filter((it) => it.claimed).length;
  const totalChallenges = items.length;

  return (
    <View style={styles.wrapper}>
      {BlurView ? (
        <BlurView intensity={20} tint="dark" style={styles.blur} />
      ) : (
        <View style={styles.blurFallback} />
      )}
      <LinearGradient
        colors={Gradients.xp}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.container}
      >
        <Text accessibilityRole="header" style={styles.title}>{`¡Hola, ${displayName || "explorador"}!`}</Text>
        <Animated.View
          style={[
            styles.kpiRow,
            {
              opacity: chipsAnim,
              transform: [
                {
                  translateY: chipsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [8, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.kpiBox} accessibilityRole="text" accessibilityLabel={`Tareas para hoy: ${taskCounts.tasks ?? 0}`}>
            <Text style={styles.kpiNumber}>{taskCounts.tasks ?? "--"}</Text>
            <Text style={styles.kpiLabel}>Tareas</Text>
          </View>
          <View style={styles.kpiBox} accessibilityRole="text" accessibilityLabel={`Hábitos pendientes: ${taskCounts.habits ?? 0}`}>
            <Text style={styles.kpiNumber}>{taskCounts.habits ?? "--"}</Text>
            <Text style={styles.kpiLabel}>Hábitos</Text>
          </View>
          <View style={styles.kpiBox} accessibilityRole="text" accessibilityLabel={`Desafíos diarios: ${completedChallenges}/${totalChallenges}`}>
            <Text style={styles.kpiNumber}>{`${completedChallenges}/${totalChallenges}`}</Text>
            <Text style={styles.kpiLabel}>Desafíos</Text>
          </View>
        </Animated.View>
        <Pressable
          onPress={onNext}
          style={styles.nextButton}
          accessibilityRole="button"
          accessibilityLabel="Siguiente"
        >
          <Text style={styles.nextText}>Siguiente</Text>
        </Pressable>
      </LinearGradient>
    </View>
  );
}

