// [MB] Modulo: Auth / Seccion: Login
// Afecta: Autenticacion
// Proposito: Permitir a los usuarios iniciar sesion
// Autor: Antigravity - Fecha: 2025-11-20

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Spacing, Radii, Typography } from '../../theme';
import { supabase } from '../../lib/supabase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    Alert.alert('Próximamente', 'La autenticación con Google requiere configuración adicional en Google Cloud.');
    // TODO: Implementar Google Auth real
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Por favor ingresa email y contraseña');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error de Login', error.message);
      setLoading(false);
    } else {
      // El listener en App.js o SplashScreen manejará la navegación, 
      // pero por seguridad navegamos manual si es necesario.
      // En este flujo, App.js detectará el cambio de sesión si usamos un Provider,
      // pero por ahora navegamos directo.
      navigation.replace('Tabs');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>
          Continúa tu viaje en <Text style={styles.brandName}>Mana Bloom</Text>
        </Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="mago@ejemplo.com"
            placeholderTextColor={Colors.textMuted}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Contraseña</Text>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor={Colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
            />
            <Pressable onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <FontAwesome5 name={showPassword ? "eye-slash" : "eye"} size={16} color={Colors.textMuted} />
            </Pressable>
          </View>
        </View>

        <Pressable 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleLogin}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.text} />
          ) : (
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          )}
        </Pressable>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>O continúa con</Text>
          <View style={styles.dividerLine} />
        </View>

        <Pressable style={styles.googleButton} onPress={handleGoogleLogin}>
          <FontAwesome5 name="google" size={16} color={Colors.text} style={{ marginRight: 8 }} />
          <Text style={styles.googleButtonText}>Google</Text>
        </Pressable>

        <Pressable onPress={() => navigation.navigate('SignUp')} style={styles.linkButton}>
          <Text style={styles.linkText}>¿No tienes cuenta? <Text style={styles.linkAccent}>Regístrate</Text></Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: Colors.background,
    padding: Spacing.large,
    justifyContent: 'center',
  },
  header: {
    marginBottom: Spacing.xlarge,
    alignItems: 'center',
    width: '100%', // Asegurar ancho del contenedor
    paddingHorizontal: Spacing.small, // Margen de seguridad
  },
  title: {
    ...Typography.h1,
    fontSize: 32,
    color: Colors.text,
    marginBottom: Spacing.small,
    textAlign: 'center',
    // Eliminamos width: '100%' fijo del texto para evitar conflictos
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: Spacing.base, // Margen interno para el texto
  },
  brandName: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
  form: {
    gap: Spacing.large,
  },
  inputGroup: {
    gap: Spacing.small,
  },
  label: {
    ...Typography.caption,
    color: Colors.text,
    fontWeight: '600',
  },
  input: {
    backgroundColor: Colors.surface,
    borderRadius: Radii.md,
    padding: Spacing.base,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
    ...Typography.body,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: Radii.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  passwordInput: {
    flex: 1,
    padding: Spacing.base,
    color: Colors.text,
    ...Typography.body,
  },
  eyeIcon: {
    padding: Spacing.base,
  },
  button: {
    backgroundColor: Colors.primary,
    padding: Spacing.base,
    borderRadius: Radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.small,
    width: '100%', // Asegurar ancho completo
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.small,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.border,
  },
  dividerText: {
    ...Typography.caption,
    color: Colors.textMuted,
    marginHorizontal: Spacing.small,
  },
  googleButton: {
    backgroundColor: Colors.surface,
    padding: Spacing.base,
    borderRadius: Radii.pill,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%', // Asegurar ancho completo
  },
  googleButtonText: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: '600',
  },
  linkButton: {
    alignItems: 'center',
    padding: Spacing.small,
  },
  linkText: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  linkAccent: {
    color: Colors.secondary,
    fontWeight: 'bold',
  },
});
