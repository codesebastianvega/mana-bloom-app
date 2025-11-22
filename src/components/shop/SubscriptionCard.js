// [MB] Módulo: Shop / Componente: SubscriptionCard
// Afecta: ShopScreen
// Propósito: Mostrar opciones de suscripción con CTA
// Puntos de edición futura: integrar pasarela de pago real
// Autor: Codex - Fecha: 2025-08-24

import React from "react";
import { Pressable, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./SubscriptionCard.styles";
import { ShopColors } from "../../constants/shopCatalog";

export default function SubscriptionCard({
  tier,
  priceLabel,
  badge,
  desc,
  perks = [],
  ctaLabel = "Suscribirse",
  accent = {},
  onPress,
}) {
  const gradientColors =
    accent?.gradient && accent.gradient.length
      ? accent.gradient
      : [ShopColors.subs.bg, "#000"];
  const pillColor = accent?.pill || ShopColors.subs.pill;

  return (
    <Pressable
      onPress={onPress}
      style={styles.wrapper}
      accessibilityRole="button"
      accessibilityLabel={`Activar ${tier} por ${priceLabel}`}
    >
      <LinearGradient colors={gradientColors} style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{tier}</Text>
          {badge && (
            <View style={[styles.badge, { backgroundColor: pillColor }]}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.price}>{priceLabel}</Text>
        <Text style={styles.desc}>{desc}</Text>
        {perks?.length ? (
          <View style={styles.perksList}>
            {perks.map((perk) => (
              <View key={perk} style={styles.perkRow}>
                <View style={[styles.perkDot, { backgroundColor: pillColor }]} />
                <Text style={styles.perkText}>{perk}</Text>
              </View>
            ))}
          </View>
        ) : null}
        <View style={[styles.cta, { backgroundColor: pillColor }]}>
          <Text style={styles.ctaText}>{ctaLabel}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
