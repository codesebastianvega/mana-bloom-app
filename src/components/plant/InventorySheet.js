// [MB] Módulo: Planta / Sección: Inventario de macetas
// Afecta: PlantScreen (sheet de inventario)
// Propósito: hoja modal con previsualización y grid de skins
// Puntos de edición futura: mover estilos a archivo separado o conectar con backend
// Autor: Codex - Fecha: 2025-08-16

import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  Text,
  View,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import {
  Colors,
  Spacing,
  Radii,
  Typography,
  Elevation,
  Opacity,
} from "../../theme";
import PlantHero from "./PlantHero";
import PotSkinCard from "./PotSkinCard";

// [MB] Acentos para preview (placeholder de maceta)
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

export default function InventorySheet({
  visible,
  skins,
  selectedId,
  equippedId,
  onClose,
  onSelect,
  onEquip,
  onBuy,
}) {
  const [mounted, setMounted] = useState(visible);
  const sheetAnim = useRef(new Animated.Value(0)).current; // 0 oculto, 1 visible
  const backdropAnim = useRef(new Animated.Value(0)).current;
  const sheetHeight = useRef(0);

  useEffect(() => {
    if (visible) {
      setMounted(true);
      Animated.parallel([
        Animated.timing(sheetAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else if (mounted) {
      Animated.parallel([
        Animated.timing(sheetAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(backdropAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start(() => setMounted(false));
    }
  }, [visible, mounted, sheetAnim, backdropAnim]);

  const { width } = useWindowDimensions();
  const numColumns = width < 360 ? 2 : 3;

  const selected = skins.find((s) => s.id === selectedId) || skins.find((s) => s.id === equippedId);
  const accentKey = selected?.accentKey || (selected ? RarityAccents[selected.rarity] : undefined);
  const accent = accentKey ? ElementAccents[accentKey] : undefined;
  const ownedCount = skins.filter((s) => s.owned).length;
  const lockedCount = skins.length - ownedCount;
  const rarityLabelMap = {
    common: "común",
    rare: "rara",
    epic: "épica",
    legendary: "legendaria",
  };

  if (!mounted) return null;

  const translateY = sheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [sheetHeight.current || 0, 0],
  });

  return (
    <View
      style={StyleSheet.absoluteFill}
      pointerEvents="box-none"
      accessible
      accessibilityViewIsModal
    >
      {/* [MB] Backdrop con fade */}
      <AnimatedPressable
        accessibilityRole="button"
        accessibilityLabel="Cerrar inventario"
        onPress={onClose}
        style={[styles.backdrop, { opacity: backdropAnim }]}
      />
      <Animated.View
        onLayout={(e) => (sheetHeight.current = e.nativeEvent.layout.height)}
        style={[
          styles.sheet,
          { transform: [{ translateY }] },
        ]}
      >
        <View style={styles.header} accessibilityRole="header">
          <Text style={styles.title}>Inventario</Text>
          <Text style={styles.subtitle}>{`Propias ${ownedCount} • Bloqueadas ${lockedCount}`}</Text>
        </View>
        <View style={styles.preview}>
          <PlantHero size="md" skinAccent={accent} />
          {selected && (
            <Text style={styles.previewLabel}>{`${selected.name} • ${rarityLabelMap[selected.rarity]}`}</Text>
          )}
        </View>
        <FlatList
          data={skins}
          keyExtractor={(item) => item.id}
          numColumns={numColumns}
          contentContainerStyle={styles.grid}
          renderItem={({ item }) => (
            <View style={{ flex: 1 / numColumns, padding: Spacing.small }}>
              <PotSkinCard
                item={item}
                onPress={(id) => onSelect && onSelect(id)}
                onEquip={(id) => onEquip && onEquip(id)}
                onBuy={(id) => onBuy && onBuy(id)}
              />
            </View>
          )}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.overlay,
  },
  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: Colors.surfaceElevated,
    borderTopLeftRadius: Radii.xl,
    borderTopRightRadius: Radii.xl,
    paddingBottom: Spacing.large,
    paddingTop: Spacing.base,
    ...Elevation.card,
  },
  header: {
    alignItems: "center",
    marginBottom: Spacing.base,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.text,
    opacity: Opacity.muted,
    marginTop: Spacing.tiny,
  },
  preview: {
    alignItems: "center",
    marginBottom: Spacing.base,
  },
  previewLabel: {
    ...Typography.body,
    color: Colors.text,
    marginTop: Spacing.small,
  },
  grid: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.large,
  },
});

