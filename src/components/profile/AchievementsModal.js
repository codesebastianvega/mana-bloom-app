// [MB] Modulo: Profile / Seccion: AchievementsModal
// Afecta: ProfileScreen
// Proposito: Modal para ver el listado completo de logros
// Puntos de edicion futura: filtrar por estado y permitir reclamarlos
// Autor: Codex - Fecha: 2025-10-21

import React from "react";
import { Modal, View, Text, Pressable, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import styles from "./AchievementsModal.styles";
import { Colors } from "../../theme";

export default function AchievementsModal({
  visible,
  onClose,
  achievements = [],
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.backdrop}>
        <View style={styles.sheet}>
          <View style={styles.header}>
            <Text style={styles.title}>Logros mágicos</Text>
            <Pressable onPress={onClose} hitSlop={12}>
              <FontAwesome5 name="times" size={16} color={Colors.text} />
            </Pressable>
          </View>
          <ScrollView contentContainerStyle={styles.list}>
            {achievements.map((item) => (
              <View
                key={item.id}
                style={[
                  styles.item,
                  item.unlocked && styles.itemUnlocked,
                  item.claimed && styles.itemClaimed,
                ]}
              >
                <View style={styles.iconWrap}>
                  <FontAwesome5
                    name={item.icon || "star"}
                    size={14}
                    color={Colors.text}
                    solid={item.unlocked}
                  />
                </View>
                <View style={styles.itemText}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDescription}>{item.description}</Text>
                </View>
                <View style={styles.statusTag}>
                  <Text style={styles.statusText}>
                    {item.claimed
                      ? "Reclamado"
                      : item.unlocked
                      ? "Listo"
                      : `${item.progress}/${item.goal}`}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

