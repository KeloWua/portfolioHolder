/* DeletedTodoList.jsx */
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Input from '../app/ui/Input';
import Button from '../app/ui/Button';
import { View, Text, StyleSheet } from "react-native";


function DeletedTodoItem({ todo, categories }) {
    const categoryName = categories.find(c => c.id === todo.categoryId)?.name || "Sin categoría";


        return (
        <View style={styles.todoItem}>
            <Text style={styles.todoText}>{todo.text}</Text>
            <Text style={styles.todoCategory}>Category: {categoryName}</Text>
            <Text style={styles.todoClearedAt}>
                Deleted: {new Date(todo.deletedAt).toLocaleString("es-ES")}
            </Text>
        </View>
    );
}


    export default function DeletedTodoList() {
    const [isSearch, setIsSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const deletedTodos = useSelector(state => state.todos.deletedTodos);
    const categories = useSelector(state => state.todos.categories);

    const filteredTodos = deletedTodos.filter(todo =>
        todo.text.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <View className="space-y-4">
        {/* Search */}
        <View className="bg-blue-50 dark:bg-gray-700 p-4 rounded-lg border border-blue-200 dark:border-gray-600">
            <button
            onClick={() => setIsSearch(!isSearch)}
            className="text-blue-600 dark:text-blue-400 font-medium hover:underline transition-colors"
            >
            🔍 {isSearch ? 'Ocultar Búsqueda' : 'Buscar'}
            </button>

            {isSearch && (
            <View className="mt-3 space-y-2">
                <Input
                type="text"
                placeholder="Search deleted todos..."
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
        <View className="bg-red-50 dark:bg-gray-900 p-4 rounded-lg border border-red-200 dark:border-red-700">
            <p className="text-sm text-gray-600 dark:text-gray-400">Deleted Todos</p>
            <p className="text-xl font-bold text-red-600 dark:text-red-400">{filteredTodos.length}</p>
        </View>

        {/* Todos List */}
        <View className="space-y-3">
            {filteredTodos.length === 0 ? (
            <View className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400 text-lg">No hay todos eliminados 🎉</p>
            </View>
            ) : (
            filteredTodos.map(todo => (
                <DeletedTodoItem key={todo.id} todo={todo} categories={categories} />
            ))
            )}
        </View>
        </View>
    );
}
