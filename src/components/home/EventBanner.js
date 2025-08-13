// [MB] Módulo: Home / Componente: EventBanner
// Afecta: HomeScreen
// Propósito: Banner de evento con cuenta regresiva
// Puntos de edición futura: reemplazar fecha fija por datos dinámicos
// Autor: Codex - Fecha: 2025-08-12

import React from "react";
import { View, Text } from "react-native";
import styles from "./EventBanner.styles";
import SectionPlaceholder from "../common/SectionPlaceholder";
import { useHydrationStatus } from "../../state/AppContext";

const EVENT_DATE = "2025-12-31T23:59:59.000Z";

function EventBanner() {
  const { modules } = useHydrationStatus();
  const daysRemaining = Math.max(
    0,
    Math.ceil((new Date(EVENT_DATE) - Date.now()) / 86400000)
  );

  if (modules.buffs) {
    return <SectionPlaceholder height={72} />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        Próximo Evento
      </Text>
      <View style={styles.chip} accessibilityRole="text">
        <Text style={styles.chipText}>{`${daysRemaining} días restantes`}</Text>
      </View>
    </View>
  );
}

export default React.memo(EventBanner);
