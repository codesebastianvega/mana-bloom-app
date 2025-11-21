// [MB] Modulo: Auth / Seccion: SignUp
// Afecta: Autenticacion
// Proposito: Registrar nuevos usuarios
// Autor: Antigravity - Fecha: 2025-11-20

import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ActivityIndicator, ScrollView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Spacing, Radii, Typography } from '../../theme';
import { supabase } from '../../lib/supabase';

export default function SignUpScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validaciones en tiempo real
  const hasUpperCase = /[A-Z]/.test(password);
  const hasNumber = /\d/.test(password);
  const isLongEnough = password.length >= 8;
  const passwordsMatch = password && confirmPassword && password === confirmPassword;

  const handleGoogleSignUp = async () => {
    Alert.alert('Próximamente', 'La autenticación con Google requiere configuración adicional en Google Cloud.');
  };

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    if (!isLongEnough || !hasUpperCase || !hasNumber) {
      Alert.alert('Error', 'La contraseña no cumple con los requisitos de seguridad.');
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      Alert.alert('Error de Registro', error.message);
      setLoading(false);
    } else {
      Alert.alert(
        'Registro Exitoso', 
        'Por favor verifica tu email para confirmar tu cuenta.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>
          Únete a <Text style={styles.brandName}>Mana Bloom</Text>
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
          
          <View style={styles.requirementsContainer}>
            <RequirementItem label="Mínimo 8 caracteres" met={isLongEnough} />
            <RequirementItem label="Una mayúscula" met={hasUpperCase} />
            <RequirementItem label="Un número" met={hasNumber} />
          </View>
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Repetir Contraseña</Text>
          <View style={[styles.passwordContainer, confirmPassword.length > 0 && { borderColor: passwordsMatch ? Colors.success : Colors.danger }]}>
            <TextInput
              style={styles.passwordInput}
              placeholder="••••••••"
              placeholderTextColor={Colors.textMuted}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry={!showPassword}
            />
             {confirmPassword.length > 0 && (
              <View style={styles.matchIndicator}>
                <FontAwesome5 
                  name={passwordsMatch ? "check-circle" : "times-circle"} 
                  size={16} 
                  color={passwordsMatch ? Colors.success : Colors.danger} 
                />
              </View>
            )}
          </View>
          {confirmPassword.length > 0 && (
            <Text style={[styles.matchText, { color: passwordsMatch ? Colors.success : Colors.danger }]}>
              {passwordsMatch ? "Las contraseñas coinciden" : "Las contraseñas no coinciden"}
            </Text>
          )}
        </View>

        <Pressable 
          style={[styles.button, loading && styles.buttonDisabled]} 
          onPress={handleSignUp}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color={Colors.textInverse} />
          ) : (
            <Text style={styles.buttonText}>Registrarse</Text>
          )}
        </Pressable>

        <View style={styles.dividerContainer}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>O regístrate con</Text>
          <View style={styles.dividerLine} />
        </View>

        <Pressable style={styles.googleButton} onPress={handleGoogleSignUp}>
          <FontAwesome5 name="google" size={16} color={Colors.text} style={{ marginRight: 8 }} />
          <Text style={styles.googleButtonText}>Google</Text>
        </Pressable>

        <Pressable onPress={() => navigation.goBack()} style={styles.linkButton}>
          <Text style={styles.linkText}>¿Ya tienes cuenta? <Text style={styles.linkAccent}>Inicia Sesión</Text></Text>
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
    width: '100%',
    paddingHorizontal: Spacing.small,
  },
  title: {
    ...Typography.h1,
    fontSize: 32,
    color: Colors.text,
    marginBottom: Spacing.small,
    textAlign: 'center',
  },
  subtitle: {
    ...Typography.body,
    color: Colors.textMuted,
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: Spacing.base,
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
  requirementsContainer: {
    marginTop: Spacing.small,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  requirementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: Spacing.small,
    marginBottom: 4,
  },
  requirementText: {
    ...Typography.caption,
    marginLeft: 4,
  },
  matchIndicator: {
    padding: Spacing.base,
  },
  matchText: {
    ...Typography.caption,
    marginTop: Spacing.tiny,
    marginLeft: Spacing.tiny,
  },
  button: {
    backgroundColor: Colors.secondary,
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
    color: Colors.textInverse,
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
    marginTop: Spacing.base,
  },
  linkText: {
    ...Typography.body,
    color: Colors.textMuted,
  },
  linkAccent: {
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

function RequirementItem({ label, met }) {
  return (
    <View style={styles.requirementItem}>
      <FontAwesome5 
        name={met ? "check" : "circle"} 
        size={10} 
        color={met ? Colors.success : Colors.textMuted} 
      />
      <Text style={[styles.requirementText, { color: met ? Colors.success : Colors.textMuted }]}>
        {label}
      </Text>
    </View>
  );
}
