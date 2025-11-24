// [MB] Test para EconomyContext
// Componente simple para verificar que el contexto funciona

import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import {
  useMana,
  useWallet,
  useLevel,
  useEconomyDispatch,
  useCanAffordMana,
} from '../state/contexts/EconomyContext';

export default function EconomyTest() {
  const mana = useMana();
  const wallet = useWallet();
  const { level, xp, xpGoal } = useLevel();
  const dispatch = useEconomyDispatch();
  const canBuy50 = useCanAffordMana(50);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Economy Test</Text>
      
      <Text style={styles.text}>Mana: {mana}</Text>
      <Text style={styles.text}>Coins: {wallet.coin}</Text>
      <Text style={styles.text}>Gems: {wallet.gem}</Text>
      <Text style={styles.text}>Level: {level} ({xp}/{xpGoal} XP)</Text>
      <Text style={styles.text}>Can buy 50 mana item: {canBuy50 ? 'Yes' : 'No'}</Text>

      <Button
        title="Add 10 Mana"
        onPress={() => dispatch({ type: 'SET_MANA', payload: mana + 10 })}
      />
      
      <Button
        title="Add 5 Coins"
        onPress={() => dispatch({ type: 'ADD_COIN', payload: 5 })}
      />
      
      <Button
        title="Add Task Reward (+25 XP, +20 Mana)"
        onPress={() => dispatch({
          type: 'APPLY_TASK_REWARD',
          payload: { xpDelta: 25, manaDelta: 20 },
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
});
