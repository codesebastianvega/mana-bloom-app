// [MB] Modulo: Home / Seccion: HomeRewards
// Afecta: HomeScreen
// Proposito: Agrupar accesos a recompensas sociales y la recompensa diaria
// Puntos de edicion futura: sumar logros pendientes y ofertas limitadas
// Autor: Codex - Fecha: 2025-10-07

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Animated,
  Easing,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Colors, Spacing, Radii, Typography } from "../../theme";
import SectionPlaceholder from "../common/SectionPlaceholder";

export default function HomeRewardsSection({
  rewardState,
  streakCount,
  rewardLabel,
  onClaimReward,
  onPressSocial,
  isHydrating = false,
}) {
  const confettiPieces = useMemo(
    () => [
      {
        id: "confetti-1",
        offsetX: 120,
        offsetY: -160,
        spin: 260,
        delay: 0,
        duration: 900,
        color: "#ffd54f",
        size: [6, 16],
        scaleRange: [0.85, 1.25],
        opacityPeak: 1,
      },
      {
        id: "confetti-2",
        offsetX: -118,
        offsetY: -150,
        spin: -220,
        delay: 80,
        duration: 880,
        color: "#ff80ab",
        size: [8, 18],
        scaleRange: [0.9, 1.32],
        opacityPeak: 0.95,
      },
      {
        id: "confetti-3",
        offsetX: 68,
        offsetY: -132,
        spin: 210,
        delay: 140,
        duration: 820,
        color: "#80deea",
        size: [6, 14],
        scaleRange: [0.9, 1.2],
        opacityPeak: 0.9,
        shape: "dot",
      },
      {
        id: "confetti-4",
        offsetX: -82,
        offsetY: -118,
        spin: -240,
        delay: 180,
        duration: 830,
        color: "#b39ddb",
        size: [9, 12],
        scaleRange: [0.88, 1.18],
        opacityPeak: 0.88,
        shape: "dot",
      },
      {
        id: "confetti-5",
        offsetX: 150,
        offsetY: -142,
        spin: 320,
        delay: 60,
        duration: 910,
        color: "#f8bbd0",
        size: [6, 18],
        scaleRange: [0.9, 1.28],
        opacityPeak: 0.96,
      },
      {
        id: "confetti-6",
        offsetX: -156,
        offsetY: -118,
        spin: -300,
        delay: 220,
        duration: 910,
        color: "#ffe082",
        size: [7, 16],
        scaleRange: [0.86, 1.22],
        opacityPeak: 0.9,
      },
      {
        id: "confetti-7",
        offsetX: 94,
        offsetY: -206,
        spin: 280,
        delay: 30,
        duration: 960,
        color: "#69f0ae",
        size: [6, 20],
        scaleRange: [0.88, 1.25],
        opacityPeak: 0.88,
      },
      {
        id: "confetti-8",
        offsetX: -46,
        offsetY: -198,
        spin: -260,
        delay: 200,
        duration: 950,
        color: "#ffab91",
        size: [8, 18],
        scaleRange: [0.92, 1.32],
        opacityPeak: 0.9,
      },
      {
        id: "confetti-9",
        offsetX: 44,
        offsetY: -108,
        spin: 190,
        delay: 260,
        duration: 820,
        color: "#e1bee7",
        size: [6, 12],
        scaleRange: [0.92, 1.18],
        opacityPeak: 0.9,
        shape: "dot",
      },
      {
        id: "confetti-10",
        offsetX: -94,
        offsetY: -208,
        spin: -340,
        delay: 70,
        duration: 940,
        color: "#40c4ff",
        size: [6, 18],
        scaleRange: [0.9, 1.28],
        opacityPeak: 0.9,
      },
      {
        id: "confetti-11",
        offsetX: 132,
        offsetY: -148,
        spin: 300,
        delay: 130,
        duration: 900,
        color: "#ffeb3b",
        size: [6, 16],
        scaleRange: [0.88, 1.26],
        opacityPeak: 0.94,
      },
      {
        id: "confetti-12",
        offsetX: -132,
        offsetY: -138,
        spin: -320,
        delay: 240,
        duration: 880,
        color: "#ff8a80",
        size: [6, 16],
        scaleRange: [0.9, 1.24],
        opacityPeak: 0.9,
      },
    ],
    []
  );
  const confettiProgressRef = useRef(
    confettiPieces.map(() => new Animated.Value(0))
  );
  const confettiProgress = confettiProgressRef.current;
  const confettiBurst = useRef(new Animated.Value(0)).current;
  const [celebrating, setCelebrating] = useState(false);
  const previousRewardState = useRef(rewardState);

  const startCelebration = useCallback(() => {
    if (!confettiPieces.length) {
      return;
    }
    confettiProgress.forEach((value) => value.setValue(0));
    confettiBurst.setValue(0);
    setCelebrating(true);

    const easing = Easing.out(Easing.cubic);
    const confettiAnimations = confettiPieces.map((piece, index) =>
      Animated.sequence([
        Animated.delay(piece.delay || 0),
        Animated.timing(confettiProgress[index], {
          toValue: 1,
          duration: piece.duration || 900,
          easing,
          useNativeDriver: true,
        }),
      ])
    );

    Animated.parallel([
      Animated.timing(confettiBurst, {
        toValue: 1,
        duration: 880,
        easing,
        useNativeDriver: true,
      }),
      Animated.parallel(confettiAnimations),
    ]).start(() => {
      setCelebrating(false);
      confettiBurst.setValue(0);
      confettiProgress.forEach((value) => value.setValue(0));
    });
  }, [confettiBurst, confettiPieces, confettiProgress]);

  useEffect(() => {
    if (
      previousRewardState.current !== rewardState &&
      rewardState === "claimed"
    ) {
      startCelebration();
    }
    previousRewardState.current = rewardState;
  }, [rewardState, startCelebration]);

  const confettiBurstScale = confettiBurst.interpolate({
    inputRange: [0, 1],
    outputRange: [0.5, 1.6],
  });
  const confettiBurstOpacity = confettiBurst.interpolate({
    inputRange: [0, 0.6, 1],
    outputRange: [0.45, 0.28, 0],
  });
  if (isHydrating) {
    return <SectionPlaceholder height={220} />;
  }

  const isAvailable = rewardState === "available";
  const isClaimed = rewardState === "claimed";
  const rewardText = rewardLabel?.trim() || "+50 Maná";

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Recompensas</Text>

      <Pressable
        style={({ pressed }) => [
          styles.socialButton,
          pressed && styles.socialButtonPressed,
        ]}
        onPress={onPressSocial}
        accessibilityRole="button"
        accessibilityLabel="Abrir recompensas sociales"
      >
        <View style={styles.socialIconWrapper}>
          <MaterialCommunityIcons
            name="account-group"
            size={22}
            color={Colors.accent}
          />
        </View>
        <View style={styles.socialTexts}>
          <Text style={styles.socialTitle}>Recompensas sociales</Text>
          <Text style={styles.socialSubtitle}>
            Comparte magia y desbloquea bonos extra
          </Text>
        </View>
        <MaterialCommunityIcons
          name="chevron-right"
          size={20}
          color={Colors.accent}
        />
      </Pressable>

      {isClaimed ? (
        <View style={styles.claimedNotice}>
          <MaterialCommunityIcons
            name="check-decagram"
            size={18}
            color={Colors.accent}
          />
          <Text style={styles.claimedText}>
            {`Racha actual: ${streakCount} dias · regresa mañana`}
          </Text>
        </View>
      ) : (
        <Pressable
          style={({ pressed }) => [
            styles.dailyButton,
            !isAvailable && styles.dailyButtonDisabled,
            pressed && isAvailable && styles.dailyButtonPressed,
          ]}
          onPress={onClaimReward}
          disabled={!isAvailable}
          accessibilityRole="button"
          accessibilityState={{ disabled: !isAvailable }}
          accessibilityLabel={
            isAvailable
              ? `Reclamar recompensa diaria ${rewardText}`
              : "Recompensa diaria en espera"
          }
        >
          <View style={styles.dailyIconWrap}>
            <MaterialCommunityIcons
              name="gift"
              size={18}
              color={Colors.onAccent}
            />
          </View>
          <View style={styles.dailyTexts}>
            <Text style={styles.dailyButtonText}>Recompensa diaria</Text>
            <Text style={styles.dailySubtitle}>
              {isAvailable
                ? rewardText
                : `Disponible pronto · ${rewardText}`}
            </Text>
          </View>
        </Pressable>
      )}
      {celebrating && (
        <View style={styles.celebrationLayer} pointerEvents="none">
          <Animated.View
            style={[
              styles.celebrationBurst,
              {
                opacity: confettiBurstOpacity,
                transform: [{ scale: confettiBurstScale }],
              },
            ]}
          />
          <View style={styles.confettiContainer}>
            {confettiPieces.map((piece, index) => {
              const progress = confettiProgress[index];
              const translateX = progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, piece.offsetX],
              });
              const translateY = progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, piece.offsetY],
              });
              const rotate = progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", `${piece.spin || 180}deg`],
              });
              const scale = progress.interpolate({
                inputRange: [0, 1],
                outputRange: piece.scaleRange || [1, 1.2],
              });
              const opacity = progress.interpolate({
                inputRange: [0, 0.25, 0.8, 1],
                outputRange: [
                  0,
                  piece.opacityPeak || 1,
                  piece.opacityPeak || 1,
                  0,
                ],
              });

              return (
                <Animated.View
                  key={piece.id || index}
                  style={[
                    styles.confettiPiece,
                    piece.shape === "dot" && styles.confettiPieceDot,
                    {
                      backgroundColor: piece.color,
                      width: piece.size?.[0] ?? 6,
                      height: piece.size?.[1] ?? 14,
                      opacity,
                      transform: [
                        { translateX },
                        { translateY },
                        { scale },
                        { rotate },
                      ],
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: Spacing.base,
    gap: Spacing.base,
    position: "relative",
    overflow: "visible",
  },
  title: {
    ...Typography.h2,
    color: Colors.text,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.accent,
    backgroundColor: "rgba(255, 202, 40, 0.08)",
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
  },
  socialButtonPressed: {
    opacity: 0.85,
  },
  socialIconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 202, 40, 0.16)",
    justifyContent: "center",
    alignItems: "center",
  },
  socialTexts: {
    flex: 1,
    gap: 2,
  },
  socialTitle: {
    ...Typography.title,
    color: Colors.accent,
    fontSize: 16,
  },
  socialSubtitle: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  dailyButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    borderRadius: Radii.lg,
    backgroundColor: Colors.accent,
    paddingVertical: Spacing.small + 4,
    paddingHorizontal: Spacing.base * 1.25,
    shadowColor: Colors.accent,
    shadowOpacity: 0.32,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 5,
  },
  dailyIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(14, 10, 30, 0.12)",
    justifyContent: "center",
    alignItems: "center",
  },
  dailyTexts: {
    flex: 1,
    gap: 2,
  },
  dailyButtonPressed: {
    opacity: 0.92,
  },
  dailyButtonDisabled: {
    backgroundColor: Colors.border,
    shadowOpacity: 0,
    elevation: 0,
  },
  dailyButtonText: {
    ...Typography.title,
    color: Colors.onAccent,
    fontSize: 16,
  },
  dailySubtitle: {
    ...Typography.caption,
    color: Colors.onAccent,
    opacity: 0.82,
  },
  claimedNotice: {
    flexDirection: "row",
    gap: Spacing.small,
    alignItems: "center",
    paddingVertical: Spacing.small,
  },
  claimedText: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  celebrationLayer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 5,
  },
  celebrationBurst: {
    position: "absolute",
    top: 158,
    left: "50%",
    width: 220,
    height: 220,
    marginLeft: -110,
    marginTop: -110,
    borderRadius: 140,
    backgroundColor: "rgba(255, 212, 121, 0.4)",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  confettiContainer: {
    position: "absolute",
    top: 158,
    left: "50%",
    width: 1,
    height: 1,
  },
  confettiPiece: {
    position: "absolute",
    borderRadius: 3,
  },
  confettiPieceDot: {
    borderRadius: 999,
  },
});
