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
        <View style={{ width: "100%" }}>
            {/* Search Button */}
            <Button onPress={() => setIsSearch(!isSearch)} variant="ghost">
                <Text>🔍 {isSearch ? "Ocultar Búsqueda" : "Buscar"}</Text>
            </Button>

            {/* Search Input */}
            {isSearch && (
                <View style={{ marginVertical: 10 }}>
                    <Input
                        placeholder="Search cleared todos..."
                        value={searchTerm}
                        onChangeText={setSearchTerm}
                    />
                    <Button onPress={() => setSearchTerm("")} variant="secondary">
                        <Text>✕ Limpiar búsqueda</Text>
                    </Button>
                </View>
            )}
        {/* Stats */}
        <View style={styles.statsContainer}>
                <Text style={styles.statsText}>Deleted Todos</Text>
                <Text style={styles.statsNumber}>{filteredTodos.length}</Text>
            </View>

            {/* Todos */}
            {filteredTodos.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text>There are no deleted Todos. 🎉</Text>
                </View>
            ) : (
                filteredTodos.map((todo) => (
                    <ClearedTodoItem
                        key={todo.id}
                        todo={todo}
                        categories={categories}
                    />
                ))
            )}
        </View>
    );
}
