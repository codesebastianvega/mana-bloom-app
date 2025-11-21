import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Typography, Spacing } from '../../theme';
import { supabase } from '../../lib/supabase';

export default function SplashScreen({ navigation }) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animación de pulsación (respiración)
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();

    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        // Delay aumentado a 3 segundos como pediste
        setTimeout(() => {
          if (session) {
            navigation.replace('Tabs');
          } else {
            navigation.replace('Login');
          }
        }, 3000);
        
      } catch (error) {
        console.error('Error checking session:', error);
        navigation.replace('Login');
      }
    };

    checkSession();
  }, [navigation, scaleAnim]);

  return (
    <View style={styles.container}>
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <FontAwesome5 name="leaf" size={80} color={Colors.primary} />
      </Animated.View>
      <Text style={styles.title}>Mana Bloom</Text>
      <Text style={styles.subtitle}>Cargando magia...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.large,
  },
  title: {
    ...Typography.h1,
    fontSize: 42,
    color: Colors.text,
    fontWeight: 'bold',
    marginTop: Spacing.large,
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
  },
});
