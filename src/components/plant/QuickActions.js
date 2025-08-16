// [MB] Módulo: Planta / Sección: Acciones rápidas
// Afecta: PlantScreen (sección de botones)
// Propósito: orquestar botones de cuidado con estados
// Puntos de edición futura: conectar con economía real o backend
// Autor: Codex - Fecha: 2025-08-16

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import ActionButton from "./ActionButton";
import { Spacing } from "../../theme";

export default function QuickActions({
  canWater = true,
  canFeed = true,
  canClean = true,
  canMeditate = true,
  cooldowns = {},
  onAction,
}) {
  // [MB] Definición base de acciones
  const actions = [
    {
      key: "water",
      title: "Regar",
      icon: <Text>💧</Text>,
      accentKey: "water",
      costLabel: "-20 Maná",
      tooltip: "+15 Agua",
      hint: "Aumenta nivel de agua",
      enabled: canWater,
      cooldown: cooldowns.water || 0,
    },
    {
      key: "feed",
      title: "Alimentar",
      icon: <Text>🍽️</Text>,
      accentKey: "nutrients",
      costLabel: "-120 Monedas",
      tooltip: "+10 Nutrientes",
      hint: "Recupera nutrientes",
      enabled: canFeed,
      cooldown: cooldowns.feed || 0,
    },
    {
      key: "clean",
      title: "Limpiar",
      icon: <Text>🧼</Text>,
      accentKey: "clean",
      costLabel: undefined,
      tooltip: "+10 Pureza",
      hint: "Quita impurezas",
      enabled: canClean,
      cooldown: cooldowns.clean || 0,
    },
    {
      key: "meditate",
      title: "Meditar",
      icon: <Text>🧘‍♂️</Text>,
      accentKey: "spirit",
      costLabel: "-10 Maná",
      tooltip: "+5 Serenidad",
      hint: "Relaja el espíritu",
      enabled: canMeditate,
      cooldown: cooldowns.meditate || 0,
    },
  ];

  return (
    <View style={styles.container}>
      {actions.map((a) => (
        <View key={a.key} style={styles.item}>
          <ActionButton
            title={a.title}
            icon={a.icon}
            accentKey={a.accentKey}
            costLabel={a.costLabel}
            tooltip={a.tooltip}
            disabled={!a.enabled}
            cooldownMs={a.cooldown}
            accessibilityHint={a.hint}
            onPress={() => onAction && onAction(a.key)}
          />
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignSelf: "stretch",
    marginTop: Spacing.large,
    marginBottom: Spacing.large,
  },
  item: {
    flexBasis: "48%",
    marginBottom: Spacing.base,
  },
});

