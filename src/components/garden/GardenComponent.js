// Placeholder Garden component
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function GardenComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Garden Component Placeholder</Text>
      <Text>Esta pantalla será reemplazada por la implementación completa del Garden.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
