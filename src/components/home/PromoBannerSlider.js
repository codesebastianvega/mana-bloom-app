// [MB] Modulo: Home / Seccion: PromoBannerSlider
// Afecta: HomeScreen
// Proposito: Mostrar banners promocionales estilo Epic Games
// Puntos de edicion futura: agregar mas banners, cambiar tiempos
// Autor: Codex - Fecha: 2025-11-22

import React, { useRef, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  Pressable,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome5 } from "@expo/vector-icons";
import { Colors, Typography, Spacing, CategoryAccents, Radii } from "../../theme";
import { useNavigation } from "@react-navigation/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const BANNER_WIDTH = SCREEN_WIDTH * 0.85;
const BANNER_HEIGHT = 160;
const AUTO_SCROLL_INTERVAL = 5000;

const BANNERS = [
  {
    id: "garden",
    title: "Jardín místico",
    subtitle: "Cuida a Cocoa y desbloquea nuevos brotes.",
    cta: "Ir al jardín",
    image: require("../../../assets/banners/daycocoa.png"),
    route: "Garden",
    accentKey: "seeds",
    gradient: ["#0f5a33", "#18405f"],
  },
  {
    id: "inventory",
    title: "Inventario vivo",
    subtitle: "Revisa rápidamente tus tesoros mágicos.",
    cta: "Abrir inventario",
    image: require("../../../assets/banners/bannerinventory.png"),
    route: "InventoryModal",
    accentKey: "tools",
    gradient: ["#35246c", "#271442"],
  },
  {
    id: "premium",
    title: "Pases premium",
    subtitle: "Duplica XP y desbloquea misiones exclusivas.",
    cta: "Ver pases",
    image: require("../../../assets/banners/bannerpasessubs.png"),
    route: "Shop",
    accentKey: "cosmetics",
    gradient: ["#4a1d59", "#8b2a7e"],
  },
];

const withAlpha = (hex = "", alpha = 1) => {
  if (!hex) return hex;
  const cleaned = `${hex}`.replace("#", "").trim();
  const base = cleaned.length === 8 ? cleaned.slice(0, 6) : cleaned;
  if (base.length !== 6) return hex;
  const value = parseInt(base, 16);
  const r = (value >> 16) & 255;
  const g = (value >> 8) & 255;
  const b = value & 255;
  return `rgba(${r},${g},${b},${alpha})`;
};

const getAccent = (key) => CategoryAccents[key] || Colors.accent;

export default function PromoBannerSlider() {
  const scrollRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const autoScrollTimer = useRef(null);

  const scrollToIndex = (index) => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        x: index * BANNER_WIDTH,
        animated: true,
      });
      setCurrentIndex(index);
    }
  };

  const handleBannerPress = (banner) => {
    if (banner.route === "Garden") {
      navigation.navigate("Garden");
      return;
    }
    if (banner.route === "Shop") {
      navigation.navigate("ShopScreen", { initialTab: "subs" });
      return;
    }
    navigation.navigate(banner.route);
  };

  useEffect(() => {
    autoScrollTimer.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % BANNERS.length;
        scrollToIndex(nextIndex);
        return nextIndex;
      });
    }, AUTO_SCROLL_INTERVAL);

    return () => {
      if (autoScrollTimer.current) {
        clearInterval(autoScrollTimer.current);
      }
    };
  }, []);

  const handleScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / BANNER_WIDTH);
    if (index !== currentIndex) {
      setCurrentIndex(index);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={BANNER_WIDTH}
        snapToAlignment="center"
        contentContainerStyle={styles.scrollContent}
      >
        {BANNERS.map((banner) => {
          const accent = getAccent(banner.accentKey);
          const baseGradient =
            banner.gradient || [accent, withAlpha(accent, 0.6)];
          const gradientColors = baseGradient.map((color, idx) =>
            color.startsWith("#")
              ? withAlpha(color, idx === 0 ? 0.35 : 0.55)
              : color
          );
          return (
            <Pressable
              key={banner.id}
              style={styles.bannerWrapper}
              onPress={() => handleBannerPress(banner)}
              accessibilityRole="button"
              accessibilityLabel={banner.cta}
            >
              <ImageBackground
                source={banner.image}
                style={styles.banner}
                imageStyle={styles.bannerImage}
                resizeMode="cover"
              >
                <LinearGradient
                  colors={gradientColors}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={StyleSheet.absoluteFill}
                />
                <View style={styles.patternOverlay} />
                <View style={styles.content}>
                  <View style={styles.textBlock}>
                    <Text style={styles.title}>{banner.title}</Text>
                    <Text style={styles.subtitle}>{banner.subtitle}</Text>
                  </View>
                  <View
                    style={[
                      styles.ctaButton,
                      {
                        borderColor: withAlpha(Colors.text, 0.3),
                        backgroundColor: withAlpha(Colors.text, 0.18),
                      },
                    ]}
                  >
                    <Text style={styles.ctaText}>{banner.cta}</Text>
                    <FontAwesome5 name="arrow-right" size={12} color={Colors.text} />
                  </View>
                </View>
              </ImageBackground>
            </Pressable>
          );
        })}
      </ScrollView>

      <View style={styles.pagination}>
        {BANNERS.map((banner, index) => (
          <Pressable
            key={index}
            onPress={() => scrollToIndex(index)}
            style={[
              styles.dot,
              currentIndex === index && [
                styles.dotActive,
                { backgroundColor: getAccent(banner.accentKey) },
              ],
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.large,
    marginBottom: Spacing.small,
  },
  scrollContent: {
    paddingHorizontal: (SCREEN_WIDTH - BANNER_WIDTH) / 2,
  },
  bannerWrapper: {
    width: BANNER_WIDTH,
    marginRight: Spacing.small,
  },
  banner: {
    height: BANNER_HEIGHT,
    borderRadius: Radii.lg,
    overflow: "hidden",
    padding: Spacing.base,
    justifyContent: "space-between",
  },
  bannerImage: {
    borderRadius: Radii.lg,
  },
  patternOverlay: {
    ...StyleSheet.absoluteFillObject,
    opacity: 0.08,
    backgroundColor: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    gap: Spacing.small,
  },
  textBlock: {
    gap: Spacing.tiny,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
    fontWeight: "700",
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.text,
  },
  ctaButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: Spacing.small / 2,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small - 2,
    borderWidth: 1,
    borderRadius: Radii.md,
  },
  ctaText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  dotActive: {
    width: 32,
  },
});

