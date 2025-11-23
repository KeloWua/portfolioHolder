/* ClearedTodoList.jsx */
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import Input from '../app/ui/Input';
import Button from '../app/ui/Button';

function ClearedTodoItem({ todo, categories }) {
  const categoryName = categories.find(c => c.id === todo.categoryId)?.name || "Sin categoría";

  return (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{todo.text}</Text>
      <Text style={styles.todoCategory}>Category: {categoryName}</Text>
      <Text style={styles.todoClearedAt}>Cleared: {new Date(todo.clearedAt).toLocaleString("es-ES")}</Text>
    </View>
  );
}

export default function ClearedTodoList() {
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const clearedTodos = useSelector(state => state.todos.clearedTodos || []);
  const categories = useSelector(state => state.todos.categories || []);

  const filteredTodos = clearedTodos.filter(todo =>
    todo.text.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Cabecera: búsqueda + stats
  const ListHeader = () => (
    <View>
      {/* Search Button */}
      <Button onPress={() => setIsSearch(!isSearch)} variant="ghost">
        <Text>🔍 {isSearch ? 'Ocultar Búsqueda' : 'Buscar'}</Text>
      </Button>

      {/* Search Input */}
      {isSearch && (
        <View style={{ marginVertical: 10 }}>
          <Input
            placeholder="Search cleared todos..."
            value={searchTerm}
            onChangeText={setSearchTerm} // RN Input usa onChangeText
          />
          <Button onPress={() => setSearchTerm('')} variant="secondary">
            <Text>✕ Limpiar búsqueda</Text>
          </Button>
        </View>
      )}

      {/* Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Cleared Todos</Text>
        <Text style={styles.statsNumber}>{filteredTodos.length}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={filteredTodos}
      keyExtractor={(todo) => todo.id.toString()}
      renderItem={({ item }) => <ClearedTodoItem todo={item} categories={categories} />}
      ListHeaderComponent={<ListHeader />}
      ListEmptyComponent={
        <View style={styles.emptyContainer}>
          <Text>There are no cleared Todos. 🎉</Text>
        </View>
      }
      contentContainerStyle={{ padding: 16 }}
    />
  );
}

const styles = StyleSheet.create({
  statsContainer: { marginVertical: 16, alignItems: 'center' },
  statsText: { fontSize: 16, fontWeight: '500' },
  statsNumber: { fontSize: 20, fontWeight: '700', color: '#065f46' },
  todoItem: { padding: 12, marginBottom: 8, borderRadius: 8, backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', borderWidth: 1 },
  todoText: { fontSize: 16, fontWeight: '500', color: '#065f46' },
  todoCategory: { fontSize: 12, color: '#10b981', marginTop: 4 },
  todoClearedAt: { fontSize: 12, color: '#6b7280', marginTop: 2 },
  emptyContainer: { padding: 20, alignItems: 'center' },
});
