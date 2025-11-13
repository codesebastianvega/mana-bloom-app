// [MB] Módulo: Economía / Sección: Cápsulas de recursos
// Afecta: PlantScreen (encabezado económico)
// Propósito: fila de recursos con orquestación de transacciones y errores
// Puntos de edición futura: mover a Context o persistencia real
// Autor: Codex - Fecha: 2025-08-16

import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ResourceChip from "./ResourceChip";
import { Spacing } from "../../theme";

export default function ResourceCapsules({
  mana,
  coins,
  gems,
  txn,
  insufficient,
  style,
  itemStyle,
}) {
  const [hintFor, setHintFor] = useState(null);

  useEffect(() => {
    if (insufficient?.id) {
      setHintFor(insufficient.resource);
    }
  }, [insufficient?.id, insufficient?.resource]);

  const handleHintHidden = (res) => {
    if (hintFor === res) {
      setHintFor(null);
    }
  };

  return (
    <View style={[styles.row, style]}>
      <View style={[styles.item, itemStyle]}>
        <ResourceChip
          type="mana"
          value={mana}
          txnId={txn?.resource === "mana" ? txn.id : undefined}
          delta={txn?.resource === "mana" ? txn.amount : undefined}
          showInsufficientHint={hintFor === "mana"}
          onHintHidden={() => handleHintHidden("mana")}
        />
      </View>
      <View style={[styles.item, itemStyle]}>
        <ResourceChip
          type="coins"
          value={coins}
          txnId={txn?.resource === "coins" ? txn.id : undefined}
          delta={txn?.resource === "coins" ? txn.amount : undefined}
          showInsufficientHint={hintFor === "coins"}
          onHintHidden={() => handleHintHidden("coins")}
        />
      </View>
      <View style={[styles.item, itemStyle]}>
        <ResourceChip
          type="gems"
          value={gems}
          txnId={txn?.resource === "gems" ? txn.id : undefined}
          delta={txn?.resource === "gems" ? txn.amount : undefined}
          showInsufficientHint={hintFor === "gems"}
          onHintHidden={() => handleHintHidden("gems")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  item: {
    marginRight: Spacing.small,
  },
});

