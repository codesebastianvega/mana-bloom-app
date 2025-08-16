// [MB] Módulo: Planta / Sección: Inventario de macetas
// Afecta: PlantScreen (sheet de inventario)
// Propósito: tarjeta de skin con estados y acciones
// Puntos de edición futura: mover estilos a archivo separado o integrar economía real
// Autor: Codex - Fecha: 2025-08-16

import React, { useRef } from "react";
import {
  Animated,
  Pressable,
  Text,
  View,
  StyleSheet,
} from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Typography,
  Elevation,
  Opacity,
} from "../../theme";

// [MB] Acentos por rareza o clave explícita
const ElementAccents = {
  neutral: Colors.surfaceAlt,
  water: Colors.elementWater,
  spirit: Colors.secondaryFantasy,
  mana: Colors.primaryFantasy,
};

const RarityAccents = {
  common: "neutral",
  rare: "water",
  epic: "spirit",
  legendary: "mana",
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function PotSkinCard({ item, onPress, onEquip, onBuy }) {
  const scale = useRef(new Animated.Value(1)).current;
  const tooltipOpacity = useRef(new Animated.Value(0)).current;
  const tooltipTimeout = useRef();

  const accentKey = item.accentKey || RarityAccents[item.rarity];
  const accent = ElementAccents[accentKey] || Colors.surfaceElevated;
  const owned = item.owned;
  const equipped = item.equipped;

  const handlePressIn = () => {
    Animated.spring(scale, {
      toValue: 0.98,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };
  const handlePressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
      speed: 20,
      bounciness: 6,
    }).start();
  };

  const handleBuy = () => {
    onBuy && onBuy(item.id);
    Animated.timing(tooltipOpacity, {
      toValue: 1,
      duration: 150,
      useNativeDriver: true,
    }).start();
    tooltipTimeout.current && clearTimeout(tooltipTimeout.current);
    tooltipTimeout.current = setTimeout(() => {
      Animated.timing(tooltipOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }, 1000);
  };

  const accessibilityLabel = `Skin ${item.name}, ${
    owned ? "propia" : "bloqueada"
  }, rareza ${item.rarity}${equipped ? ", equipada" : ""}`;

  const costLabel =
    item.cost && `${item.cost.amount} ${item.cost.currency === "coins" ? "Monedas" : "Diamantes"}`;

  return (
    <AnimatedPressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel}
      accessibilityHint="Toca para previsualizar. Botón Equipar/Comprar al final de la tarjeta."
      onPress={() => onPress && onPress(item.id)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={[
        styles.card,
        { borderColor: accent, transform: [{ scale }] },
        !owned && { opacity: Opacity.muted },
      ]}
    >
      <View style={styles.thumbWrapper}>
        {item.thumb ? (
          typeof item.thumb === "string" ? (
            <Text style={styles.thumbText}>{item.thumb}</Text>
          ) : (
            <View>{/* imagen personalizada */}</View>
          )
        ) : (
          <Text style={styles.thumbText}>🎍</Text>
        )}
        {equipped ? (
          <View style={[styles.badge, { backgroundColor: accent }]}> 
            <Text style={styles.badgeText}>Equipado</Text>
          </View>
        ) : owned ? (
          <View style={[styles.badge, { backgroundColor: accent, opacity: 0.8 }]}> 
            <Text style={styles.badgeText}>Propio</Text>
          </View>
        ) : (
          <View style={[styles.badge, { backgroundColor: Colors.overlay }]}> 
            <Text style={styles.badgeText}>🔒</Text>
          </View>
        )}
      </View>
      <Text numberOfLines={1} style={styles.name}>
        {item.name}
      </Text>
      {owned && !equipped && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Equipar ${item.name}`}
          onPress={() => onEquip && onEquip(item.id)}
          style={[styles.actionButton, { backgroundColor: accent }]}
        >
          <Text style={styles.actionText}>Equipar</Text>
        </Pressable>
      )}
      {equipped && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Quitar ${item.name}`}
          onPress={() => onEquip && onEquip(undefined)}
          style={[styles.actionButton, { backgroundColor: Colors.surfaceAlt }]}
        >
          <Text style={styles.actionText}>Quitar</Text>
        </Pressable>
      )}
      {!owned && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Comprar ${item.name}`}
          onPress={handleBuy}
          style={[styles.actionButton, { backgroundColor: accent }]}
        >
          <Text style={styles.actionText}>Comprar</Text>
        </Pressable>
      )}
      {!owned && costLabel && (
        <Text style={styles.cost}>{costLabel}</Text>
      )}
      <Animated.View
        pointerEvents="none"
        accessible
        accessibilityLiveRegion="polite"
        accessibilityLabel="Compra no implementada (UI)"
        style={[styles.tooltip, { opacity: tooltipOpacity }]}
      >
        <Text style={styles.tooltipText}>Compra no implementada (UI)</Text>
      </Animated.View>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: "center",
    padding: Spacing.small,
    borderRadius: Radii.lg,
    borderWidth: 2,
    backgroundColor: Colors.surface,
    ...Elevation.card,
  },
  thumbWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: Spacing.small,
    position: "relative",
  },
  thumbText: {
    fontSize: Typography.h1.fontSize,
  },
  name: {
    ...Typography.body,
    color: Colors.text,
    marginBottom: Spacing.small,
  },
  badge: {
    position: "absolute",
    top: 0,
    right: 0,
    paddingHorizontal: Spacing.tiny,
    paddingVertical: 2,
    borderRadius: Radii.pill,
  },
  badgeText: {
    ...Typography.caption,
    color: Colors.textInverse,
  },
  actionButton: {
    marginTop: Spacing.tiny,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.small,
    borderRadius: Radii.pill,
  },
  actionText: {
    ...Typography.caption,
    color: Colors.textInverse,
  },
  cost: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginTop: Spacing.tiny,
  },
  tooltip: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: "center",
    transform: [{ translateY: 0 }],
  },
  tooltipText: {
    ...Typography.caption,
    color: Colors.text,
    backgroundColor: Colors.surfaceElevated,
    paddingHorizontal: Spacing.small,
    paddingVertical: Spacing.tiny,
    borderRadius: Radii.sm,
    ...Elevation.raised,
  },
});

