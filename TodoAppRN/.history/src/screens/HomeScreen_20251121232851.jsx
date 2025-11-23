import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import TodoList from '../components/TodoList';
import ClearedTodoList from '../components/ClearedTodoList';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'bottom']}>
      <View style={styles.section}>
        <TodoList />
      </View>

      <View style={styles.section}>
        <ClearedTodoList />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f9fafb',
    paddingHorizontal: 16,
  },
  section: {
    marginVertical: 20, // espacio entre secciones
  }
});
