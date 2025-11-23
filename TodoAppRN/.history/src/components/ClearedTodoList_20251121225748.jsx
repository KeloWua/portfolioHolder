/* ClearedTodoList.jsx */
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Input from '../app/ui/Input';
import Button from '../app/ui/Button';

function ClearedTodoItem({ todo, categories }) {
    const categoryName = categories.find(c => c.id === todo.categoryId)?.name || "Sin categoría";

    return (
        <View style={styles.todoItem}>
        <Text style={styles.todoText}>{todo.text}</Text>
        <Text style={styles.todoCategory}>Category: {categoryName}</Text>
        <Text style={styles.todoClearedAt}>
            Cleared: {new Date(todo.clearedAt).toLocaleString("es-ES")}
        </Text>
        </View>
    );
    }

    export default function ClearedTodoList() {
    const [isSearch, setIsSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const clearedTodos = useSelector(state => state.todos.clearedTodos);
    const categories = useSelector(state => state.todos.categories);

    // Filtrado por búsqueda
    const filteredTodos = clearedTodos.filter(todo =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <View style={styles.container}>
        {/* Search */}
        <View style={styles.searchContainer}>
            <TouchableOpacity
            onPress={() => setIsSearch(!isSearch)}
            style={styles.searchToggle}
            >
            <Text style={styles.searchToggleText}>
                🔍 {isSearch ? 'Ocultar Búsqueda' : 'Buscar'}
            </Text>
            </TouchableOpacity>

            {isSearch && (
            <View style={styles.searchBox}>
                <Input
                placeholder="Search cleared todos..."
                value={searchTerm}
                onChangeText={text => setSearchTerm(text)}
                />
                <Button onPress={() => setSearchTerm('')} variant="secondary">
                <Text>✕ Limpiar búsqueda</Text>
                </Button>
            </View>
            )}
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
            <Text style={styles.statsTitle}>Cleared Todos</Text>
            <Text style={styles.statsCount}>{filteredTodos.length}</Text>
        </View>

        {/* Todos List */}
        <FlatList
            data={filteredTodos}
            keyExtractor={(todo) => todo.id}
            renderItem={({ item }) => (
            <ClearedTodoItem todo={item} categories={categories} />
            )}
            ListEmptyComponent={
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>There are no cleared Todos. 🎉</Text>
            </View>
            }
        />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, backgroundColor: '#f9fafb' },
    searchContainer: { marginBottom: 16 },
    searchToggle: { paddingVertical: 6 },
    searchToggleText: { fontSize: 16, color: '#2563eb', fontWeight: '500' },
    searchBox: { marginTop: 10, gap: 8 },
    statsContainer: { marginBottom: 16, alignItems: 'center' },
    statsTitle: { fontSize: 16, color: '#374151', fontWeight: '500' },
    statsCount: { fontSize: 24, color: '#059669', fontWeight: '700', marginTop: 4 },
    todoItem: { padding: 12, marginBottom: 8, borderRadius: 8, backgroundColor: '#d1fae5', borderWidth: 1, borderColor: '#10b981' },
    todoText: { fontSize: 16, fontWeight: '500', color: '#065f46' },
    todoCategory: { fontSize: 12, color: '#10b981', marginTop: 4 },
    todoClearedAt: { fontSize: 12, color: '#6b7280', marginTop: 2 },
    emptyContainer: { padding: 20, alignItems: 'center' },
    emptyText: { fontSize: 16, color: '#6b7280' },
});
