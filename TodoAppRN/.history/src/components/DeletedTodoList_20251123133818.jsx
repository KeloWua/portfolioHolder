// src/components/DeletedTodoListr.jsx

import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import Input from "../app/ui/Input";
import Button from "../app/ui/Button";

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
                    <DeletedTodoItem
                        key={todo.id}
                        todo={todo}
                        categories={categories}
                    />
                ))
            )}
        </View>
    );
}


const styles = StyleSheet.create({
    statsContainer: { marginVertical: 16, alignItems: "center" },
    statsText: { fontSize: 16, fontWeight: "500" },
    statsNumber: { fontSize: 20, fontWeight: "700", color: "#065f46" },
    todoItem: {
        padding: 12,
        marginBottom: 8,
        borderRadius: 8,
        backgroundColor: "#f0fdf4",
        borderColor: "#bbf7d0",
        borderWidth: 1,
    },
    todoText: { fontSize: 16, fontWeight: "500", color: "#065f46" },
    todoCategory: { fontSize: 12, color: "#10b981", marginTop: 4 },
    todoClearedAt: { fontSize: 12, color: "#6b7280", marginTop: 2 },
    emptyContainer: { padding: 20, alignItems: "center" },
});
