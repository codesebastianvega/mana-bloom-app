// [MB] Modulo: Navegacion / Seccion: AppDrawer
// Afecta: overlay global
// Proposito: Menu hamburguesa con ajustes rapidos y acciones de cuenta
// Puntos de edicion futura: conectar con tema real y enlaces profundos
// Autor: Codex - Fecha: 2025-11-22

import React, { useMemo, useState } from "react";
import { View, Text, Pressable, Switch, Alert, Linking } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./AppDrawer.styles";
import { useDrawer, useAppDispatch } from "../../state/AppContext";
import { supabase } from "../../lib/supabase";
import { navigationRef } from "../../navigationRef";

const HELP_LINKS = [
  { label: "Centro de ayuda", url: "https://manabloom.app/help" },
  { label: "Discord oficial", url: "https://discord.gg/manabloom" },
  { label: "Reportar bug", url: "mailto:hey@manabloom.app" },
];

export default function AppDrawer() {
  const { isDrawerOpen, closeDrawer } = useDrawer();
  const dispatch = useAppDispatch();
  const [preferences, setPreferences] = useState({
    themeDark: true,
    sounds: true,
    notifications: true,
  });

  const handleToggle = (key) => (value) => {
    setPreferences((prev) => ({ ...prev, [key]: value }));
  };

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
    closeDrawer();
    if (navigationRef.isReady()) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      "Eliminar cuenta",
      "Esta acción es permanente. ¿Deseas continuar?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Eliminar",
          style: "destructive",
          onPress: () => Alert.alert("Próximamente", "Pronto podrás eliminar la cuenta desde aquí."),
        },
      ]
    );
  };

  const handleLink = (url) => () => {
    closeDrawer();
    Linking.openURL(url).catch(() => null);
  };

  const sections = useMemo(
    () => [
      {
        title: "Cuenta",
        items: [
          { icon: "user", label: "Ver perfil", action: () => {
            closeDrawer();
            if (navigationRef.isReady()) {
              navigationRef.navigate("ProfileScreen");
            }
          } },
          { icon: "sign-out-alt", label: "Cerrar sesión", action: handleLogout },
          { icon: "trash-alt", label: "Eliminar cuenta", action: handleDeleteAccount, danger: true },
        ],
      },
      {
        title: "Apariencia",
        toggles: [
          { key: "themeDark", label: "Tema oscuro", value: preferences.themeDark },
          { key: "sounds", label: "Sonidos mágicos", value: preferences.sounds },
        ],
      },
      {
        title: "Juego & progreso",
        toggles: [
          { key: "notifications", label: "Notificaciones de racha", value: preferences.notifications },
        ],
      },
      {
        title: "Ayuda & comunidad",
        links: HELP_LINKS,
      },
    ],
    [preferences, closeDrawer]
  );

  if (!isDrawerOpen) {
    return null;
  }

  return (
    <View style={styles.overlay} pointerEvents="auto">
      <Pressable style={styles.backdrop} onPress={closeDrawer} />
      <View style={styles.drawer}>
        <Text style={styles.drawerTitle}>Menu magico</Text>
        <Text style={styles.drawerSubtitle}>Accesos rápidos y ajustes.</Text>
        {sections.map((section) => (
          <View key={section.title} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            {section.items &&
              section.items.map((item) => (
                <Pressable
                  key={item.label}
                  style={styles.sectionRow}
                  onPress={item.action}
                >
                  <View style={styles.rowIcon}>
                    <FontAwesome5
                      name={item.icon}
                      size={14}
                      color={item.danger ? "#ff6b6b" : "#ffffff"}
                    />
                  </View>
                  <Text
                    style={[
                      styles.rowLabel,
                      item.danger && styles.rowLabelDanger,
                    ]}
                  >
                    {item.label}
                  </Text>
                </Pressable>
              ))}
            {section.toggles &&
              section.toggles.map((toggle) => (
                <View key={toggle.key} style={styles.toggleRow}>
                  <View style={styles.toggleText}>
                    <Text style={styles.rowLabel}>{toggle.label}</Text>
                  </View>
                  <Switch
                    value={toggle.value}
                    onValueChange={(val) => handleToggle(toggle.key)(val)}
                  />
                </View>
              ))}
            {section.links &&
              section.links.map((link) => (
                <Pressable
                  key={link.url}
                  onPress={handleLink(link.url)}
                  style={styles.sectionRow}
                >
                  <View style={styles.rowIcon}>
                    <FontAwesome5 name="external-link-alt" size={12} color="#ffffff" />
                  </View>
                  <Text style={styles.rowLabel}>{link.label}</Text>
                </Pressable>
              ))}
          </View>
        ))}
        <Pressable style={styles.closeButton} onPress={closeDrawer}>
          <Text style={styles.closeButtonText}>Cerrar</Text>
        </Pressable>
      </View>
    </View>
  );
}
