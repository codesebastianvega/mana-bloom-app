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

export default function SubscriptionCard({ tier, priceLabel, badge, desc, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={styles.wrapper}
      accessibilityRole="button"
      accessibilityLabel={`Suscribirse ${tier}`}
    >
      <LinearGradient colors={[ShopColors.subs.bg, "#000"]} style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.title}>{tier}</Text>
          {badge && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{badge}</Text>
            </View>
          )}
        </View>
        <Text style={styles.price}>{priceLabel}</Text>
        <Text style={styles.desc}>{desc}</Text>
        <View style={styles.cta}>
          <Text style={styles.ctaText}>Suscribirse</Text>
        </View>
      </LinearGradient>
    </Pressable>
  );
}
