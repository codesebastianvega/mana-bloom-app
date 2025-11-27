// [MB] Modulo: Navegacion / Seccion: AppDrawer (rediseño estilo mock)
// Afecta: overlay global
// Proposito: Drawer con perfil, XP, navegacion y toggles siguiendo el mock
// Autor: Codex - Fecha: 2025-11-26 (V4)

import React, { useCallback } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Switch,
  Image,
} from "react-native";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  useDrawer,
  useAppDispatch,
  useAppState,
  useProgress,
} from "../../state/AppContext";
import { Colors, Spacing, Radii, Typography } from "../../theme";
import { supabase } from "../../lib/supabase";
import { navigationRef } from "../../navigationRef";
import appManifest from "../../../app.json";

const NAV_ITEMS = [
  {
    icon: "sprout",
    label: "Jardín Zen",
    subtitle: "Ernesto te espera",
    route: "PlantScreen",
    pill: "Listo",
    accent: "#1bd5a8",
  },
  {
    icon: "format-list-bulleted",
    label: "Mis Misiones",
    subtitle: "5 pendientes",
    route: "TasksScreen",
    badge: 5,
    accent: "#f2b13f",
  },
  {
    icon: "book-open-page-variant",
    label: "Historia (Lore)",
    subtitle: "Capítulo 1 desbloqueado",
    route: "LoreScreen",
    accent: "#6fa1ff",
  },
  {
    icon: "account-group",
    label: "Bosque Social",
    subtitle: "3 amigos online",
    route: "SocialScreen",
    accent: "#b589ff",
    social: true,
  },
];

const SYNC_TOGGLES = [
  {
    key: "notifications",
    label: "Alertas",
    icon: "bell-outline",
    accent: "#ffca28",
  },
  { key: "sounds", label: "Sonidos", icon: "volume-high", accent: "#1bd5a8" },
  { key: "haptics", label: "Vibración", icon: "vibrate", accent: "#f57c00" },
];

const SPELLBOOK_IMG = require("../../../assets/tools/libro de hechizos.png");
const SOCIAL_AVATARS = [
  { color: "#6d5dfc" },
  { color: "#b76bff" },
  { color: "#1bd5a8" },
];
const SUPPORT_LINKS = [
  {
    icon: "cog-outline",
    label: "Ajustes Avanzados",
    route: "SettingsScreen",
    description: "Profundiza en la configuración",
  },
  {
    icon: "help-circle-outline",
    label: "Ayuda del Oráculo",
    route: "SettingsScreen",
    highlight: true,
    description: "Recibe guía mágica al instante",
  },
  {
    icon: "book-open-variant",
    label: "Guía del Grimorio",
    route: "LoreScreen",
    description: "Manual encantado de referencia",
  },
  {
    icon: "bug-outline",
    label: "Reportar Anomalía",
    route: "FeedbackScreen",
    description: "Envía feedback o errores",
  },
  {
    icon: "link-variant",
    label: "Portales Vinculados",
    route: "SettingsScreen",
    description: "Gestiona tus integraciones",
  },
];

const withAlpha = (hex = "", alpha = 1) => {
  if (typeof hex !== "string" || !hex.startsWith("#") || hex.length < 7) {
    return hex;
  }
  const normalized = hex.slice(0, 7);
  const alphaValue = Math.max(0, Math.min(1, alpha));
  const channel = Math.round(alphaValue * 255)
    .toString(16)
    .padStart(2, "0");
  return `${normalized}${channel}`;
};

export default function AppDrawer() {
  const { isDrawerOpen, closeDrawer } = useDrawer();
  const dispatch = useAppDispatch();
  const { level, preferences, displayName } = useAppState();
  const { xp = 0, xpGoal = 1000, progress = 0 } = useProgress?.() || {};
  const version = appManifest?.expo?.version || "0.0.0";
  const xpPercent = Math.min(1, xpGoal > 0 ? xp / xpGoal : progress || 0);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      // noop
    }
    closeDrawer();
    if (navigationRef.isReady()) {
      navigationRef.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    }
  };

  const handleNavigate = useCallback(
    (routeName, params) => () => {
      closeDrawer();
      if (navigationRef.isReady()) {
        navigationRef.navigate(routeName, params);
      }
    },
    [closeDrawer]
  );

  const handleToggle = (key) => (value) => {
    dispatch({ type: "SET_PREFERENCE", payload: { key, value } });
  };

  if (!isDrawerOpen) return null;

  return (
    <View style={styles.overlay} pointerEvents="auto">
      <Pressable style={styles.backdrop} onPress={closeDrawer}>
        <BlurView intensity={65} tint="dark" style={styles.backdropBlur} />
      </Pressable>
      <View style={styles.drawer}>
        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* Perfil */}
          <View style={styles.profileSection}>
            <LinearGradient
              colors={["#352358", "#1a122f"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={styles.profileCard}
            >
              <View style={styles.profileTopRow}>
                <View style={styles.avatarWrap}>
                  <View style={styles.avatarGlow} />
                  <LinearGradient
                    colors={["#ffb347", "#ffdf66"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    style={styles.avatarBorder}
                  >
                    <View style={styles.avatarCore}>
                      <MaterialCommunityIcons
                        name="account"
                        size={26}
                        color={Colors.text}
                      />
                    </View>
                  </LinearGradient>
                  <View style={styles.levelChip}>
                    <Text style={styles.levelText}>Lv.{level || 1}</Text>
                  </View>
                </View>
                <View style={styles.profileDetails}>
                  <Text style={styles.profileName}>
                    {displayName || "Alex"}
                  </Text>
                  <Text style={styles.profileRole}>Mago Aprendiz</Text>
                  <View style={styles.xpTrack}>
                    <View
                      style={[
                        styles.xpFill,
                        { width: `${Math.round(xpPercent * 100)}%` },
                      ]}
                    />
                  </View>
                  <Text style={styles.xpLabel}>
                    {xp}/{xpGoal} XP
                  </Text>
                </View>
              </View>

              <View style={styles.tabRow}>
                <Pressable
                  style={styles.tabButton}
                  onPress={handleNavigate("HomeScreen")}
                >
                  <MaterialCommunityIcons
                    name="home"
                    size={18}
                    color={Colors.text}
                  />
                  <Text style={styles.tabLabel}>Inicio</Text>
                </Pressable>
                <Pressable
                  style={styles.tabButton}
                  onPress={handleNavigate("ProfileScreen")}
                >
                  <MaterialCommunityIcons
                    name="account"
                    size={18}
                    color={Colors.text}
                  />
                  <Text style={styles.tabLabel}>Perfil</Text>
                </Pressable>
              </View>
            </LinearGradient>
          </View>

          {/* Pro card */}
          <LinearGradient
            colors={["#d47233", "#8f2a1d"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.proCard}
          >
            <View style={styles.proOverlay} pointerEvents="none" />
            <Image
              source={SPELLBOOK_IMG}
              style={styles.proIconImage}
              resizeMode="contain"
            />
            <View style={styles.proContent}>
              <View style={styles.proBadge}>
                <Text style={styles.proBadgeText}>PRO</Text>
              </View>
              <View style={styles.proTextBlock}>
                <Text style={styles.proTitle}>Grimorio Arcano</Text>
                <Text style={styles.proSubtitle}>
                  Desbloquea estadísticas avanzadas
                </Text>
              </View>
            </View>
          </LinearGradient>

          {/* Navegacion */}
          <Text style={styles.sectionTitle}>Navegación</Text>
          {NAV_ITEMS.map((item) => {
            const accent = item.accent || Colors.secondary;
            return (
              <Pressable
                key={item.label}
                style={[
                  styles.navItem,
                  {
                    borderColor: withAlpha(accent, 0.3),
                    shadowColor: withAlpha(accent, 0.35),
                  },
                ]}
                onPress={handleNavigate(item.route)}
              >
                <View
                  style={[
                    styles.navIconWrap,
                    {
                      backgroundColor: withAlpha(accent, 0.18),
                      borderColor: withAlpha(accent, 0.5),
                    },
                  ]}
                >
                  <MaterialCommunityIcons
                    name={item.icon}
                    size={20}
                    color={accent}
                  />
                </View>
                <View style={styles.navText}>
                  <Text style={styles.navLabel}>{item.label}</Text>
                  <Text style={styles.navSub}>{item.subtitle}</Text>
                </View>
                {item.badge ? (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.badge}</Text>
                  </View>
                ) : null}
                {item.pill ? (
                  <View
                    style={[
                      styles.pill,
                      {
                        backgroundColor: withAlpha(accent, 0.2),
                        borderColor: withAlpha(accent, 0.4),
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.pillText,
                        {
                          color: accent,
                          fontWeight:
                            item.label === "Jardín Zen" ? "900" : "700",
                        },
                      ]}
                    >
                      {item.label === "Jardín Zen" ? "Ver" : item.pill}
                    </Text>
                  </View>
                ) : null}
                {item.social ? (
                  <View style={styles.socialRow}>
                    {SOCIAL_AVATARS.map((avatar, index) => (
                      <View
                        key={avatar.color}
                        style={[
                          styles.socialDot,
                          {
                            backgroundColor: withAlpha(avatar.color, 0.85),
                            borderColor: withAlpha("#0a0714", 1),
                            marginLeft: index === 0 ? 0 : -8,
                            zIndex: SOCIAL_AVATARS.length - index,
                          },
                        ]}
                      />
                    ))}
                  </View>
                ) : null}
              </Pressable>
            );
          })}

          {/* Sincronizacion */}
          <Text style={[styles.sectionTitle, styles.sectionTitleSpacing]}>
            Sincronización
          </Text>
          <View style={styles.toggleCard}>
            {SYNC_TOGGLES.map((tog, index) => {
              const accentSoft = withAlpha(tog.accent, 0.75);
              const trackOn = withAlpha(tog.accent, 0.35);
              const thumbOn = withAlpha(tog.accent, 0.9);
              return (
                <View
                  key={tog.key}
                  style={[
                    styles.toggleRow,
                    index < SYNC_TOGGLES.length - 1 && styles.toggleDivider,
                  ]}
                >
                  <View style={styles.toggleLeft}>
                    <MaterialCommunityIcons
                      name={tog.icon}
                      size={18}
                      color={accentSoft}
                    />
                    <Text style={styles.toggleLabel}>{tog.label}</Text>
                  </View>
                  <Switch
                    style={styles.switch}
                    trackColor={{
                      false: "rgba(255,255,255,0.12)",
                      true: trackOn,
                    }}
                    thumbColor={
                      preferences?.[tog.key] ? thumbOn : "rgba(255,255,255,0.85)"
                    }
                    ios_backgroundColor="rgba(255,255,255,0.12)"
                    value={!!preferences?.[tog.key]}
                    onValueChange={handleToggle(tog.key)}
                  />
                </View>
              );
            })}
          </View>

          {/* Support links */}
          <Text style={[styles.sectionTitle, styles.supportTitle]}>
            Recursos
          </Text>
          <View style={styles.supportSection}>
            {SUPPORT_LINKS.map((link) => (
              <Pressable
                key={link.label}
                style={[
                  styles.supportRow,
                  link.highlight && styles.supportRowHighlight,
                ]}
                onPress={
                  link.route ? handleNavigate(link.route) : undefined
                }
              >
                <View style={styles.supportLeft}>
                  <MaterialCommunityIcons
                    name={link.icon}
                    size={16}
                    color={
                      link.highlight ? "#ff77c6" : "rgba(255,255,255,0.85)"
                    }
                  />
                  <View>
                    <Text
                      style={[
                        styles.supportLabel,
                        link.highlight && styles.supportLabelHighlight,
                      ]}
                    >
                      {link.label}
                    </Text>
                    {link.description ? (
                      <Text style={styles.supportDescription}>
                        {link.description}
                      </Text>
                    ) : null}
                  </View>
                </View>
                <MaterialCommunityIcons
                  name="chevron-right"
                  size={18}
                  color="rgba(255,255,255,0.4)"
                />
              </Pressable>
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footerSection}>
            <View style={styles.quoteBox}>
              <Text style={styles.quoteText}>
                "La constancia es la magia más poderosa."
              </Text>
            </View>
            <View style={[styles.versionRow, { marginTop: Spacing.small }]}>
              <Text style={styles.versionLabel}>v{version} Beta</Text>
              <Pressable style={styles.logoutChip} onPress={handleLogout}>
                <MaterialCommunityIcons
                  name="logout"
                  size={14}
                  color="#ffb3a1"
                />
                <Text style={styles.logoutText}>Salir</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },
  backdropBlur: {
    ...StyleSheet.absoluteFillObject,
  },
  drawer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: "82%",
    backgroundColor: "#0c0a18",
    borderRightWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 4, height: 0 },
    elevation: 10,
  },
  content: {
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.large,
    gap: Spacing.large,
  },
  profileSection: {
    gap: Spacing.base,
    marginHorizontal: -Spacing.base,
    paddingHorizontal: 0,
    marginTop: -Spacing.large,
  },
  profileCard: {
    gap: Spacing.base,
    paddingTop: Spacing.xlarge + Spacing.small,
    paddingBottom: Spacing.large - Spacing.small,
    paddingHorizontal: Spacing.base,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.06)",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  profileTopRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.base,
  },
  avatarWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarGlow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    borderRadius: 36,
    backgroundColor: "rgba(255,215,128,0.35)",
    opacity: 0.6,
  },
  avatarBorder: {
    width: "100%",
    height: "100%",
    borderRadius: 36,
    padding: 4,
  },
  avatarCore: {
    flex: 1,
    borderRadius: 32,
    backgroundColor: "#211835",
    alignItems: "center",
    justifyContent: "center",
  },
  levelChip: {
    position: "absolute",
    bottom: -6,
    paddingHorizontal: Spacing.small,
    paddingVertical: 2,
    borderRadius: Radii.pill,
    backgroundColor: "#f8b400",
    borderWidth: 1,
    borderColor: "#c57a00",
    shadowColor: "#f8b400",
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
  },
  levelText: {
    ...Typography.micro,
    color: "#3b2600",
    fontWeight: "800",
  },
  profileDetails: {
    flex: 1,
    gap: 4,
  },
  profileName: {
    ...Typography.h2,
    color: Colors.text,
    fontWeight: "800",
  },
  profileRole: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  xpTrack: {
    flex: 1,
    height: 6,
    borderRadius: Radii.pill,
    backgroundColor: "#0c091d",
    overflow: "hidden",
    marginTop: 2,
  },
  xpFill: {
    height: "100%",
    backgroundColor: "#f6a533",
  },
  xpLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontWeight: "700",
    textAlign: "right",
    marginTop: 2,
    alignSelf: "flex-end",
  },
  tabRow: {
    flexDirection: "row",
    gap: Spacing.small,
    marginTop: Spacing.small,
  },
  tabButton: {
    flex: 1,
    paddingVertical: Spacing.small,
    borderRadius: Radii.md,
    backgroundColor: "rgba(6,4,15,0.75)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.tiny,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  tabLabel: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "700",
  },
  proCard: {
    position: "relative",
    borderRadius: Radii.xl,
    paddingVertical: Spacing.large,
    paddingHorizontal: Spacing.base,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    overflow: "hidden",
  },
  proOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: Radii.xl,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    backgroundColor: "rgba(255,255,255,0.04)",
    opacity: 0.4,
  },
  proContent: {
    gap: Spacing.tiny,
    position: "relative",
    zIndex: 1,
  },
  proBadge: {
    alignSelf: "flex-start",
    paddingHorizontal: Spacing.small + 4,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "rgba(0,0,0,0.25)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  proBadgeText: {
    fontSize: 10,
    lineHeight: 12,
    color: "#ffdf9b",
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  proRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  proTextBlock: {
    flex: 1,
    gap: 2,
  },
  proTitle: {
    fontSize: Typography.body.fontSize + 1,
    lineHeight: Typography.body.lineHeight + 1,
    color: "#fff7eb",
    fontWeight: "900",
  },
  proSubtitle: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.8)",
  },
  proIconImage: {
    position: "absolute",
    right: -12,
    bottom: 4,
    width: 110,
    height: 110,
    opacity: 0.9,
    transform: [{ rotate: "-8deg" }],
  },
  sectionTitle: {
    ...Typography.caption,
    color: Colors.textMuted,
    letterSpacing: 0.6,
    marginBottom: Spacing.tiny / 2,
  },
  sectionTitleSpacing: {
    marginTop: Spacing.large,
  },
  navItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
    paddingVertical: Spacing.base / 1.5,
    paddingHorizontal: Spacing.base,
    borderRadius: 12,
    backgroundColor: "rgba(39, 30, 46, 0.92)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.05)",
    marginBottom: -15,
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  navIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: -2,
    backgroundColor: "rgba(255,255,255,0.06)",
    borderWidth: 0.5,
  },
  navText: {
    flex: 1,
    gap: 2,
  },
  navLabel: {
    ...Typography.body,
    color: Colors.text,
    fontWeight: "800",
  },
  navSub: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.6)",
  },
  badge: {
    minWidth: 24,
    height: 22,
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 11,
    backgroundColor: Colors.danger,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    fontSize: 10,
    color: Colors.text,
    fontWeight: "800",
    textAlign: "center",
  },
  pill: {
    paddingHorizontal: Spacing.small + 2,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  pillText: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: "800",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  socialRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 0,
  },
  socialDot: {
    width: 22,
    height: 22,
    borderRadius: 11,
    borderWidth: 2,
  },
  supportSection: {
    gap: Spacing.small,
    marginTop: Spacing.base,
  },
  supportTitle: {
    marginTop: Spacing.base,
  },
  supportRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.small,
    paddingHorizontal: Spacing.base,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.02)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  supportRowHighlight: {
    backgroundColor: "rgba(168,85,247,0.12)",
    borderColor: "rgba(168,85,247,0.4)",
  },
  supportLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  supportLabel: {
    ...Typography.body,
    color: Colors.text,
  },
  supportLabelHighlight: {
    color: "#ffd6ff",
    fontWeight: "700",
  },
  toggleCard: {
    backgroundColor: "rgba(255,255,255,0.04)",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  toggleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.tiny - 2,
    paddingHorizontal: Spacing.base - 4,
  },
  toggleDivider: {
    borderBottomWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
  },
  toggleLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  toggleLabel: {
    ...Typography.body,
    color: Colors.text,
  },
  switch: {
    transform: [{ scaleX: 0.9 }, { scaleY: 0.9 }],
  },
  quoteBox: {
    padding: Spacing.small,
    borderRadius: 14,
    backgroundColor: "rgba(129,104,255,0.08)",
    borderWidth: 1,
    borderColor: "rgba(129,104,255,0.3)",
    shadowColor: "#8154ff",
    shadowOpacity: 0.2,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
  },
  quoteText: {
    ...Typography.caption,
    color: Colors.textMuted,
    fontStyle: "italic",
    textAlign: "center",
  },
  versionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: Spacing.small,
  },
  versionLabel: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  logoutChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: Spacing.small + 2,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: "rgba(224,100,81,0.15)",
    borderWidth: 1,
    borderColor: "rgba(224,100,81,0.35)",
  },
  logoutText: {
    ...Typography.caption,
    color: "#ffb3a1",
    fontWeight: "800",
  },
  footerSection: {
    marginHorizontal: -Spacing.base,
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.large,
    paddingTop: Spacing.base,
    backgroundColor: "rgba(10,7,20,0.6)",
    borderTopWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: -4 },
  },
  supportDescription: {
    ...Typography.caption,
    color: "rgba(255,255,255,0.6)",
    marginTop: 2,
  },
});
