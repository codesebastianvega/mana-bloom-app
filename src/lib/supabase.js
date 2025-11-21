import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppState } from 'react-native';

// [MB] TODO: Reemplazar con las credenciales reales de tu proyecto Supabase
// Puedes encontrarlas en Supabase Dashboard -> Settings -> API
const SUPABASE_URL = 'https://jwkacbafozgkitentphs.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3a2FjYmFmb3pna2l0ZW50cGhzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM2ODEwMDIsImV4cCI6MjA3OTI1NzAwMn0.ok3KYb5ugR4u83R0b5Yn2mOXtJQDPR3w9GWc9vq6T28';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Escuchar cambios de estado de la app para manejar el refresco de sesión
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});
