// [MB] Modulo: Home / Seccion: HomeWelcomeCard
// Afecta: HomeScreen
// Proposito: Tarjeta de bienvenida con saludo y KPIs diarios
// Puntos de edicion futura: animaciones y origen de datos real
// Autor: Codex - Fecha: 2025-10-07 (V6)

import React, { useEffect, useRef, useState } from "react";
import { View, Text, Pressable, Animated, Image, Easing } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import styles from "./HomeWelcomeCard.styles";
import { ElementAccents } from "../../theme";
import {
  useAppState,
  useDailyChallenges,
} from "../../state/AppContext";
import { getTasks } from "../../storage";

const MOTIVATION_PHRASES = [
  "Tu mana esta listo para crear algo epico.",
  "Respira hondo, cada habito nutre la planta.",
  "Detalla tu ruta y haz florecer la idea.",
  "Hoy la constancia es tu mejor hechizo.",
  "Pequenos pasos, grandes ramas.",
  "Mantente curioso, la magia sigue creciendo.",
  "Un poco de foco y veras nuevas hojas.",
];

let BlurView;
try {
  BlurView = require("expo-blur").BlurView;
} catch (e) {
  BlurView = null;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
const avatarPlaceholder = require("../../../assets/icon.png");

const ENABLE_ORBIT_GLOW = false;

const GLASS_GRADIENT = {
  colors: ["rgba(32, 25, 55, 0.9)", "rgba(18, 13, 38, 0.92)", "rgba(12, 9, 26, 0.95)"],
  locations: [0, 0.65, 1],
  angle: 135,
};

const EDGE_SHEEN_GRADIENT = {
  colors: ["rgba(255, 255, 255, 0.18)", "rgba(255, 255, 255, 0.02)", "transparent"],
  locations: [0, 0.45, 1],
  angle: -120,
};

const ORBIT_GRADIENT = {
  colors: ["rgba(255, 213, 79, 0.75)", "rgba(181, 66, 246, 0.55)", "rgba(255, 213, 79, 0.75)"],
  locations: [0, 0.5, 1],
};

const NEON_BLOBS = [
  {
    id: "lava-core",
    colors: ["rgba(255, 96, 194, 0.78)", "rgba(255, 96, 194, 0.12)", "transparent"],
    locations: [0, 0.58, 1],
    angle: 140,
    style: {
      top: -180,
      right: -140,
      width: 420,
      height: 520,
      borderRadius: 260,
    },
    animation: {
      translateX: 34,
      translateY: 44,
      scaleRange: [0.82, 1.18],
      rotation: 14,
      duration: 7200,
      delay: 0,
      opacityRange: [0.18, 0.52, 0.26],
    },
  },
  {
    id: "lava-ember",
    colors: ["rgba(255, 165, 64, 0.68)", "rgba(255, 165, 64, 0.1)", "transparent"],
    locations: [0, 0.5, 1],
    angle: -35,
    style: {
      top: -100,
      left: -150,
      width: 380,
      height: 460,
      borderRadius: 240,
    },
    animation: {
      translateX: 42,
      translateY: 52,
      scaleRange: [0.84, 1.16],
      rotation: 18,
      duration: 8400,
      delay: 520,
      opacityRange: [0.16, 0.48, 0.22],
    },
  },
  {
    id: "lava-glow",
    colors: ["rgba(92, 210, 255, 0.46)", "rgba(92, 210, 255, 0.08)", "transparent"],
    locations: [0, 0.52, 1],
    angle: 32,
    style: {
      top: -60,
      left: 40,
      width: 360,
      height: 420,
      borderRadius: 220,
    },
    animation: {
      translateX: 26,
      translateY: 38,
      scaleRange: [0.88, 1.12],
      rotation: 10,
      duration: 9000,
      delay: 1040,
      opacityRange: [0.14, 0.4, 0.2],
    },
  },
  {
    id: "lava-trail",
    colors: ["rgba(116, 90, 255, 0.5)", "rgba(116, 90, 255, 0.08)", "transparent"],
    locations: [0, 0.55, 1],
    angle: 220,
    style: {
      bottom: -160,
      right: -120,
      width: 440,
      height: 520,
      borderRadius: 260,
    },
    animation: {
      translateX: 30,
      translateY: 48,
      scaleRange: [0.86, 1.14],
      rotation: 16,
      duration: 7800,
      delay: 1380,
      opacityRange: [0.15, 0.46, 0.24],
    },
  },
  {
    id: "lava-spark",
    colors: ["rgba(255, 214, 80, 0.4)", "rgba(255, 214, 80, 0.05)", "transparent"],
    locations: [0, 0.45, 1],
    angle: 75,
    style: {
      bottom: -120,
      left: -80,
      width: 360,
      height: 380,
      borderRadius: 210,
    },
    animation: {
      translateX: 34,
      translateY: 40,
      scaleRange: [0.9, 1.18],
      rotation: 22,
      duration: 8600,
      delay: 1760,
      opacityRange: [0.12, 0.38, 0.2],
    },
  },
  {
    id: "lava-sparkle-1",
    colors: ["rgba(255, 188, 120, 0.35)", "rgba(255, 188, 120, 0.04)", "transparent"],
    locations: [0, 0.55, 1],
    angle: 140,
    style: {
      top: 60,
      left: 40,
      width: 180,
      height: 200,
      borderRadius: 120,
    },
    animation: {
      translateX: 24,
      translateY: 28,
      scaleRange: [0.7, 1.2],
      rotation: 34,
      duration: 5200,
      delay: 2200,
      opacityRange: [0.08, 0.32, 0.16],
    },
  },
  {
    id: "lava-sparkle-2",
    colors: ["rgba(104, 196, 255, 0.32)", "rgba(104, 196, 255, 0.04)", "transparent"],
    locations: [0, 0.6, 1],
    angle: -60,
    style: {
      top: 120,
      right: 40,
      width: 160,
      height: 190,
      borderRadius: 110,
    },
    animation: {
      translateX: 26,
      translateY: 24,
      scaleRange: [0.74, 1.16],
      rotation: 40,
      duration: 4800,
      delay: 2600,
      opacityRange: [0.06, 0.28, 0.14],
    },
  },
  {
    id: "lava-sparkle-3",
    colors: ["rgba(181, 66, 246, 0.3)", "rgba(181, 66, 246, 0.04)", "transparent"],
    locations: [0, 0.58, 1],
    angle: 35,
    style: {
      bottom: 40,
      left: 120,
      width: 170,
      height: 190,
      borderRadius: 110,
    },
    animation: {
      translateX: 18,
      translateY: 26,
      scaleRange: [0.78, 1.22],
      rotation: 28,
      duration: 5600,
      delay: 3000,
      opacityRange: [0.08, 0.3, 0.16],
    },
  },
];

export default function HomeWelcomeCard({ onNext }) {
  const { displayName } = useAppState();
  const { items } = useDailyChallenges();
  const [taskCounts, setTaskCounts] = useState({ tasks: null, habits: null });
  const chipsAnim = useRef(new Animated.Value(0)).current;
  const ctaScale = useRef(new Animated.Value(1)).current;
  const neonAnimations = useRef(
    NEON_BLOBS.map(() => new Animated.Value(0))
  ).current;
  const lensAnim = useRef(new Animated.Value(0)).current;
  const orbitAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(chipsAnim, {
      toValue: 1,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }, [chipsAnim]);

  useEffect(() => {
    const easing = Easing.inOut(Easing.quad);
    const loops = neonAnimations.map((anim, index) => {
      const config = NEON_BLOBS[index].animation || {};
      const duration = config.duration || 6000;
      const delay = config.delay || index * 240;
      const sequence = Animated.sequence([
        Animated.delay(delay),
        Animated.timing(anim, {
          toValue: 1,
          duration,
          easing,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: -1,
          duration,
          easing,
          useNativeDriver: true,
        }),
        Animated.timing(anim, {
          toValue: 0,
          duration,
          easing,
          useNativeDriver: true,
        }),
      ]);
      const loop = Animated.loop(sequence, { resetBeforeIteration: false });
      loop.start();
      return loop;
    });

    return () => {
      loops.forEach((loop) => {
        if (loop && loop.stop) {
          loop.stop();
        }
      });
    };
  }, [neonAnimations]);

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(lensAnim, {
          toValue: 1,
          duration: 4200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(lensAnim, {
          toValue: 0,
          duration: 4200,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => {
      loop.stop();
    };
  }, [lensAnim]);

  useEffect(() => {
    if (!ENABLE_ORBIT_GLOW) return;
    const loop = Animated.loop(
      Animated.timing(orbitAnim, {
        toValue: 1,
        duration: 12000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => {
      loop.stop();
    };
  }, [orbitAnim]);

  useEffect(() => {
    getTasks().then((ts) => {
      const tasks = ts.filter((t) => t.type === "single" && !t.completed).length;
      const habits = ts.filter((t) => t.type === "habit" && !t.completed).length;
      setTaskCounts({ tasks, habits });
    });
  }, []);

  const completedChallenges = items.filter((it) => it.claimed).length;
  const totalChallenges = items.length;
  const lensScale = lensAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.94, 1.08],
  });
  const lensOpacity = lensAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.05, 0.18],
  });
  const lensTranslateX = lensAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-10, 10],
  });
  const lensTranslateY = lensAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-6, 12],
  });
  const orbitRotation = orbitAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });
  const subtitleMessage =
    MOTIVATION_PHRASES[
      (new Date().getDay() + MOTIVATION_PHRASES.length) %
        MOTIVATION_PHRASES.length
    ];

  return (
    <View style={styles.wrapper}>
      {ENABLE_ORBIT_GLOW && (
        <Animated.View
          pointerEvents="none"
          style={[styles.orbitContainer, { transform: [{ rotate: orbitRotation }] }]}
        >
          <LinearGradient
            colors={ORBIT_GRADIENT.colors}
            locations={ORBIT_GRADIENT.locations}
            style={styles.orbitRing}
            useAngle
            angle={120}
          >
            <View style={styles.orbitInner} />
          </LinearGradient>
        </Animated.View>
      )}
      {BlurView ? (
        <BlurView intensity={22} tint="dark" style={styles.blur} />
      ) : (
        <View style={styles.blurFallback} />
      )}
      <LinearGradient
        colors={GLASS_GRADIENT.colors}
        locations={GLASS_GRADIENT.locations}
        angle={GLASS_GRADIENT.angle}
        useAngle
        style={styles.container}
      >
        <View style={styles.neonLayer} pointerEvents="none">
          {NEON_BLOBS.map((blob, index) => {
            const anim = neonAnimations[index];
            const cfg = blob.animation || {};
            const translateX = anim.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [
                -(cfg.translateX || 0),
                0,
                cfg.translateX || 0,
              ],
            });
            const translateY = anim.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [
                -(cfg.translateY || 0),
                0,
                cfg.translateY || 0,
              ],
            });
            const scale = anim.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [
                (cfg.scaleRange?.[0] || 0.94),
                1,
                (cfg.scaleRange?.[1] || 1.06),
              ],
            });
            const rotate = anim.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [
                `${-(cfg.rotation || 0)}deg`,
                "0deg",
                `${cfg.rotation || 0}deg`,
              ],
            });
            const opacity = anim.interpolate({
              inputRange: [-1, 0, 1],
              outputRange: [
                cfg.opacityRange?.[0] ?? 0.12,
                cfg.opacityRange?.[1] ?? 0.36,
                cfg.opacityRange?.[2] ?? 0.18,
              ],
            });

            return (
              <Animated.View
                key={blob.id}
                style={[
                  styles.neonBlob,
                  blob.style,
                  {
                    transform: [{ translateX }, { translateY }, { scale }, { rotate }],
                    opacity,
                  },
                ]}
              >
                <LinearGradient
                  colors={blob.colors}
                  locations={blob.locations}
                  angle={blob.angle}
                  useAngle
                  style={styles.neonBlobGradient}
                />
              </Animated.View>
            );
          })}
          {BlurView ? (
            <BlurView intensity={90} tint="dark" style={styles.neonBlur} />
          ) : (
            <View style={styles.neonBlurFallback} />
          )}
        </View>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.lensLayer,
            {
              opacity: lensOpacity,
              transform: [
                { scale: lensScale },
                { translateX: lensTranslateX },
                { translateY: lensTranslateY },
              ],
            },
          ]}
        />
        <LinearGradient
          colors={EDGE_SHEEN_GRADIENT.colors}
          locations={EDGE_SHEEN_GRADIENT.locations}
          angle={EDGE_SHEEN_GRADIENT.angle}
          useAngle
          style={styles.edgeSheen}
          pointerEvents="none"
        />
        <View style={styles.content}>
        <View style={styles.titleRow}>
          <View style={styles.avatarWrapper}>
            <View style={styles.avatarInner}>
              <Image
                source={avatarPlaceholder}
                style={styles.avatarImage}
                resizeMode="cover"
              />
            </View>
            <View style={styles.avatarStatus}>
              <MaterialCommunityIcons
                name="sprout"
                size={14}
                color={ElementAccents.accentCta}
              />
            </View>
          </View>
          <Text accessibilityRole="header" style={styles.title}>
            {`Hola, ${displayName || "explorador"}!`}
          </Text>
        </View>
        <Text style={styles.subtitle}>{subtitleMessage}</Text>
        <Animated.View
          style={[
            styles.kpiRow,
            {
              opacity: chipsAnim,
              transform: [
                {
                  translateY: chipsAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [10, 0],
                  }),
                },
              ],
            },
          ]}
        >
          <View
            style={[styles.kpiBox, styles.kpiPrimary]}
            accessibilityRole="text"
            accessibilityLabel={`Tareas para hoy: ${taskCounts.tasks ?? 0}`}
          >
            <Text style={styles.kpiNumber}>{taskCounts.tasks ?? "--"}</Text>
            <Text style={styles.kpiLabel}>Tareas</Text>
          </View>
          <View
            style={styles.kpiBox}
            accessibilityRole="text"
            accessibilityLabel={`Habitos pendientes: ${taskCounts.habits ?? 0}`}
          >
            <Text style={styles.kpiNumber}>{taskCounts.habits ?? "--"}</Text>
            <Text style={styles.kpiLabel}>Habitos</Text>
          </View>
          <View
            style={styles.kpiBox}
            accessibilityRole="text"
            accessibilityLabel={`Desafios diarios: ${completedChallenges}/${totalChallenges}`}
          >
            <Text style={styles.kpiNumber}>
              {`${completedChallenges}/${totalChallenges}`}
            </Text>
            <Text style={styles.kpiLabel}>Desafios</Text>
          </View>
        </Animated.View>
        <AnimatedPressable
          onPress={onNext}
          onPressIn={() => {
            Animated.timing(ctaScale, {
              toValue: 0.97,
              duration: 90,
              useNativeDriver: true,
            }).start();
          }}
          onPressOut={() => {
            Animated.timing(ctaScale, {
              toValue: 1,
              duration: 120,
              useNativeDriver: true,
            }).start();
          }}
          style={[styles.footerButton, { transform: [{ scale: ctaScale }] }]}
          accessibilityRole="button"
          accessibilityLabel="Abrir agenda del día"
        >
          <Text style={styles.footerText}>Ver agenda del día</Text>
          <MaterialCommunityIcons
            name="chevron-right"
            size={18}
            color={ElementAccents.accentCta}
          />
        </AnimatedPressable>
        </View>
      </LinearGradient>
    </View>
  );
}



