// [MB] Modulo: Home / Seccion: PromoBannerSlider
// Afecta: HomeScreen
// Proposito: Mostrar banners promocionales estilo Epic Games
// Puntos de edicion futura: agregar mas banners, cambiar tiempos
// Autor: Codex - Fecha: 2025-11-22

import React, { useRef, useState, useEffect } from 'react';
import { View, ScrollView, Pressable, Text, StyleSheet, Dimensions, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../../theme';
import { useNavigation } from '@react-navigation/native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH; // Full width for edge-to-edge
const BANNER_HEIGHT = 200;
const AUTO_SCROLL_INTERVAL = 5000;

const BANNERS = [
  {
    id: 'garden',
    title: 'Jardín Místico',
    subtitle: 'Cultiva tu magia interior',
    cta: 'Explorar',
    image: require('../../../assets/banners/daycocoa.png'),
    route: 'Garden',
  },
  {
    id: 'inventory',
    title: 'Tu Inventario',
    subtitle: 'Descubre tus tesoros mágicos',
    cta: 'Ver inventario',
    image: require('../../../assets/banners/bannerinventory.png'),
    route: 'InventoryModal',
  },
  {
    id: 'premium',
    title: 'Pases Premium',
    subtitle: 'Desbloquea todo tu potencial',
    cta: 'Obtener',
    image: require('../../../assets/banners/bannerpasessubs.png'),
    route: 'Shop',
  },
];

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

  const handleBannerPress = (route) => {
    if (route === 'Garden') {
      navigation.navigate('Garden');
    } else if (route === 'Shop') {
      navigation.navigate('ShopScreen', { initialTab: 'subs' });
    } else {
      navigation.navigate(route);
    }
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
        {BANNERS.map((banner) => (
          <Pressable
            key={banner.id}
            style={styles.bannerWrapper}
            onPress={() => handleBannerPress(banner.route)}
          >
            <ImageBackground
              source={banner.image}
              style={styles.banner}
              imageStyle={styles.bannerImage}
              resizeMode="cover"
            >
              {/* Bottom gradient for text readability */}
              <LinearGradient
                colors={['transparent', 'rgba(0,0,0,0.8)']}
                style={styles.gradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
              />
              
              {/* Epic Games style content - bottom left */}
              <View style={styles.content}>
                <View style={styles.textBlock}>
                  <Text style={styles.title}>{banner.title}</Text>
                  <Text style={styles.subtitle}>{banner.subtitle}</Text>
                </View>
                
                {/* CTA Button - Elegant style */}
                <View style={styles.ctaButton}>
                  <Text style={styles.ctaText}>{banner.cta}</Text>
                  <FontAwesome5 name="arrow-right" size={12} color="#FFFFFF" />
                </View>
              </View>
            </ImageBackground>
          </Pressable>
        ))}
      </ScrollView>

      {/* Pagination Dots - Epic Games style */}
      <View style={styles.pagination}>
        {BANNERS.map((_, index) => (
          <Pressable
            key={index}
            onPress={() => scrollToIndex(index)}
            style={[
              styles.dot,
              currentIndex === index && styles.dotActive,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: Spacing.base,
    marginBottom: 0, // Remove bottom margin to reduce gap
    marginHorizontal: -Spacing.base, // Negative margin to break out of parent padding
  },
  scrollContent: {
    paddingHorizontal: 0,
  },
  bannerWrapper: {
    width: SCREEN_WIDTH,
    paddingHorizontal: Spacing.base,
  },
  banner: {
    width: '100%',
    height: BANNER_HEIGHT,
    backgroundColor: '#000',
    borderRadius: 16, // Rounded corners for app style
    overflow: 'hidden',
  },
  bannerImage: {
    borderRadius: 16, // Match container radius
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: Spacing.base,
    paddingBottom: Spacing.base + 4,
    gap: Spacing.small, // Reduced gap between text and button
  },
  textBlock: {
    gap: Spacing.tiny,
  },
  title: {
    ...Typography.title,
    color: Colors.text,
  },
  subtitle: {
    ...Typography.caption,
    color: Colors.text,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: Spacing.small,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.small,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8, // Slightly rounded, not pill
  },
  ctaText: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.small,
    marginTop: Spacing.base,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dotActive: {
    width: 32,
    backgroundColor: '#FFFFFF',
  },
});
