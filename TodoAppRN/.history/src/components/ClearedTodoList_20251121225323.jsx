/* ClearedTodoList.jsx */
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import Input from '../app/ui/Input';
import Button from '../app/ui/Button';

function ClearedTodoItem({ todo, categories }) {
    const categoryName = categories.find(c => c.id === todo.categoryId)?.name || "Sin categoría";

    return (
        <View style={styles.todoItem}>
        <Text>{todo.text}</Text>
        <Text>Category: {categoryName}</Text>
        <Text>Cleared: {new Date(todo.clearedAt).toLocaleString("es-ES")}</Text>
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

    return (
        <View style={styles.container}>
        {/* Search */}
        <View style={styles.searchContainer}>
            <Button
            onClick={() => setIsSearch(!isSearch)}
            variant="ghost"
            >
            🔍 {isSearch ? 'Ocultar Búsqueda' : 'Buscar'}
            </Button>

            {isSearch && (
            <View style={{ marginTop: 10 }}>
                <Input
                type="text"
                placeholder="Search cleared todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={() => setSearchTerm('')} variant="secondary">
                    <Text>✕ Limpiar búsqueda</Text>
                </Button>
            </View>
            )}
        </View>

        {/* Stats */}
        <View style={styles.statsContainer}>
            <Text>Cleared Todos</Text>
            <Text>{filteredTodos.length}</Text>
        </View>

        {/* Todos List */}
        <View style={styles.todoList}>
            {filteredTodos.length === 0 ? (
            <View className="text-center py-12">
                <Text className="text-gray-500 dark:text-gray-400 text-lg">There are no cleared Todos. 🎉</Text>
            </View>
            ) : (
            filteredTodos.map(todo => (
                <ClearedTodoItem key={todo.id} todo={todo} categories={categories} />
            ))
            )}
        </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: { padding: 16 },
    searchContainer: { marginBottom: 16 },
    statsContainer: { marginBottom: 16, alignItems: 'center' },
    todoItem: { padding: 12, marginBottom: 8, borderRadius: 8, backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', borderWidth: 1 },
    todoText: { fontSize: 16, fontWeight: '500', color: '#065f46' },
    todoCategory: { fontSize: 12, color: '#10b981', marginTop: 4 },
    todoClearedAt: { fontSize: 12, color: '#6b7280', marginTop: 2 },
});