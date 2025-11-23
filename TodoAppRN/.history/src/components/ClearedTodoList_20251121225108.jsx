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
        <Text >{todo.text}</Text>
        <Text >Category: {categoryName}</Text>
        <Text >Cleared: {new Date(todo.clearedAt).toLocaleString("es-ES")}</Text>
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
        <View className="space-y-4">
        {/* Search */}
        <View className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border border-blue-200 dark:border-gray-600">
            <Button
            onClick={() => setIsSearch(!isSearch)}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline transition-colors"
            >
            🔍 {isSearch ? 'Ocultar Búsqueda' : 'Buscar'}
            </Button>

            {isSearch && (
            <View className="mt-3 space-y-2">
                <Input
                type="text"
                placeholder="Search cleared todos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button onClick={() => setSearchTerm('')} variant="secondary">
                ✕ Limpiar búsqueda
                </Button>
            </View>
            )}
        </View>

        {/* Stats */}
        <View className="bg-green-50 dark:bg-gray-900 p-4 rounded-lg border border-green-200 dark:border-green-700">
            <Text className="text-sm text-gray-600 dark:text-gray-400">Cleared Todos</Text>
            <Text className="text-xl font-bold text-green-600 dark:text-green-400">{filteredTodos.length}</Text>
        </View>

        {/* Todos List */}
        <View className="space-y-3">
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
    todoItem: { padding: 12, marginBottom: 8, borderRadius: 8, backgroundColor: '#f0fdf4', borderColor: '#bbf7d0', borderWidth: 1 },
    todoText: { fontSize: 16, fontWeight: '500', color: '#065f46' },
    todoCategory: { fontSize: 12, color: '#10b981', marginTop: 4 },
    todoClearedAt: { fontSize: 12, color: '#6b7280', marginTop: 2 },
});