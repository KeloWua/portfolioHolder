import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useState } from 'react';
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

    const clearedTodos = useSelector(state => state.todos.clearedTodos);
    const categories = useSelector(state => state.todos.categories);

    const filteredTodos = clearedTodos.filter(todo =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );



    <FlatList
    data={filteredTodos}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => <ClearedTodoItem todo={item} categories={categories} />}
    ListEmptyComponent={() => (
        <View style={{ padding: 16, alignItems: 'center' }}>
        <Text>There are no cleared Todos 🎉</Text>
        </View>
    )}
    ListHeaderComponent={() => (
        <View>
        {/* Aquí puedes poner la barra de búsqueda y stats */}
        </View>
    )}
/>

    // Cabecera con búsqueda + stats
    const ListHeader = () => (
        <View>
        {/* Search */}
        <Button onPress={() => setIsSearch(!isSearch)} variant="ghost">
            <Text>🔍 {isSearch ? 'Ocultar Búsqueda' : 'Buscar'}</Text>
        </Button>
        {isSearch && (
            <View style={{ marginVertical: 10 }}>
            <Input
                placeholder="Search cleared todos..."
                value={searchTerm}
                onChangeText={setSearchTerm}  // RN Input usa onChangeText
            />
            <Button onPress={() => setSearchTerm('')} variant="secondary">
                <Text>✕ Limpiar búsqueda</Text>
            </Button>
            </View>
        )}

        {/* Stats */}
        <View style={styles.statsContainer}>
            <Text>Cleared Todos</Text>
            <Text>{filteredTodos.length}</Text>
        </View>
        </View>
    );

    return (
        <FlatList
        data={filteredTodos}
        keyExtractor={(todo) => todo.id}
        renderItem={({ item }) => <ClearedTodoItem todo={item} categories={categories} />}
        ListHeaderComponent={<ListHeader />}
        ListEmptyComponent={
            <View style={{ padding: 20, alignItems: 'center' }}>
            <Text>There are no cleared Todos. 🎉</Text>
            </View>
        }
        contentContainerStyle={{ padding: 16 }}
        />
    );
    }

    const styles = StyleSheet.create({
    statsContainer: { marginVertical: 16, alignItems: 'center' },
    todoItem: { padding: 12, marginBottom: 8, borderRadius: 8, backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', borderWidth: 1 },
    todoText: { fontSize: 16, fontWeight: '500', color: '#065f46' },
    todoCategory: { fontSize: 12, color: '#10b981', marginTop: 4 },
    todoClearedAt: { fontSize: 12, color: '#6b7280', marginTop: 2 },
    });
