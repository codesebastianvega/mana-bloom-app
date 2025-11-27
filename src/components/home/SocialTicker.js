// [MB] Modulo: Home / Seccion: SocialTicker
// Afecta: HomeScreen
// Proposito: Barra de actividad reciente (amigos/eventos) bajo el header
// Puntos de edicion futura: conectar con feed real y acciones deep-link
// Autor: Codex - Fecha: 2025-11-26

import React, { useEffect, useRef, useState } from "react";
import { View, Text, Animated, StyleSheet } from "react-native";
import { Colors, Spacing, Typography } from "../../theme";
import { useNewsFeed } from "../../state/AppContext";

const FALLBACK_FEED = [
  { id: "f1", title: "Marcos completó el reto", timestamp: Date.now() - 36 * 60 * 60 * 1000 },
  { id: "f2", title: "Sofía regó su planta", timestamp: Date.now() - 2 * 60 * 60 * 1000 },
  { id: "f3", title: "Alex reclamó la recompensa diaria", timestamp: Date.now() - 6 * 60 * 60 * 1000 },
];

const INTERVAL_MS = 5000;
const FADE_MS = 300;

function formatTimeAgo(ts) {
  if (!ts) return "";
  const delta = Date.now() - ts;
  const minutes = Math.max(0, Math.floor(delta / 60000));
  if (minutes < 1) return "hace instantes";
  if (minutes < 60) return `hace ${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `hace ${days}d`;
}

export default function SocialTicker() {
  const { items } = useNewsFeed();
  const [feed, setFeed] = useState(FALLBACK_FEED);

  useEffect(() => {
    const list = Array.isArray(items) ? items : [];
    if (!list.length) {
      setFeed(FALLBACK_FEED);
      return;
    }
    const normalized = list
      .filter(Boolean)
      .map((it, idx) => ({
        id: it.id || `news-${idx}`,
        title: it.title || "Actividad reciente",
        timestamp: new Date(it.timestamp || Date.now()).getTime(),
      }))
      .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
    setFeed(normalized);
  }, [items]);

  const [index, setIndex] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const loop = setInterval(() => {
      Animated.timing(opacity, {
        toValue: 0,
        duration: FADE_MS,
        useNativeDriver: true,
      }).start(() => {
        setIndex((prev) => (prev + 1) % feed.length);
        Animated.timing(opacity, {
          toValue: 1,
          duration: FADE_MS,
          useNativeDriver: true,
        }).start();
      });
    }, INTERVAL_MS);
    return () => clearInterval(loop);
  }, [feed.length, opacity]);

  if (!feed.length) return null;
  const item = feed[index] || feed[0];
  const timeAgo = formatTimeAgo(item.timestamp);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.inner, { opacity }]}>
        <View style={styles.dot} />
        <Text style={styles.text}>
          <Text style={styles.strong}>{item.title}</Text>
        </Text>
        <Text style={styles.time}>{timeAgo}</Text>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(19,17,31,0.8)",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.border,
    paddingVertical: Spacing.tiny,
    paddingHorizontal: Spacing.base,
    alignItems: "center",
    justifyContent: "center",
  },
  inner: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.small,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.success,
  },
  text: {
    ...Typography.micro,
    color: Colors.textMuted,
  },
  strong: {
    color: Colors.text,
    fontWeight: "700",
  },
  time: {
    ...Typography.micro,
    color: Colors.textMuted,
    borderLeftWidth: StyleSheet.hairlineWidth,
    borderLeftColor: Colors.border,
    paddingLeft: Spacing.tiny,
  },
});
