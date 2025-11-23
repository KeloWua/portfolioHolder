/* CategoryEdit.jsx - React Native */
import React, { useState, useEffect } from "react";
import { View, Text, Modal, TouchableOpacity, FlatList, StyleSheet, Alert } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addCategory, renameCategory, deleteCategory } from "../features/todos/todosSlice";
import Input from "../app/ui/Input";
import Button from "../app/ui/Button";
import CategorySelect from "../components/CategorySelect";


export default function CategoryEdit() {
    const categories = useSelector((state) => state.todos.categories || []);
    const todos = useSelector((state) => state.todos.todos || []);
    const dispatch = useDispatch();

    const [isVisible, setIsVisible] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [newCategoryName, setNewCategoryName] = useState("");

    // Inicializar categoría seleccionada
    useEffect(() => {
        if (!selectedCategory && categories.length > 0) {
        setSelectedCategory(categories[0]);
        }
    }, [categories]);

    // ------------------- ADD CATEGORY -------------------
    const handleAddCategory = () => {
        const trimmed = newCategoryName.trim();
        if (!trimmed) return alert("No puedes agregar una categoría vacía.");
        dispatch(addCategory(trimmed));
        setNewCategoryName("");
        setIsAdding(false);
    };

    // ------------------- EDIT CATEGORY -------------------
    const handleEditCategory = () => {
        if (!selectedCategory || !newCategoryName.trim()) return;
        dispatch(renameCategory({ id: selectedCategory.id, newName: newCategoryName.trim() }));
        setNewCategoryName("");
        setIsEditing(false);
    };

    // ------------------- DELETE CATEGORY -------------------
    const handleDeleteCategory = () => {
        if (!selectedCategory) return;

        const isInUse = todos.some((todo) => todo.categoryId === selectedCategory.id);
        if (isInUse) return alert("Esta categoría está siendo usada por uno o más todos.");

        Alert.alert(
        "Borrar Categoría",
        `¿Seguro que quieres borrar "${selectedCategory.name}"?`,
        [
            {
            text: "Cancelar",
            style: "cancel",
            },
            {
            text: "Borrar",
            style: "destructive",
            onPress: () => {
                dispatch(deleteCategory(selectedCategory.id));
                setSelectedCategory(categories.filter(c => c.id !== selectedCategory.id)[0] || null);
            },
            },
        ]
        );
    };

    return (
        <View style={styles.container}>
        {/* Botón para abrir menú de categorías */}
        <Button onPress={() => setIsVisible(!isVisible)} variant="primary">
            Categories
        </Button>

        {isVisible && selectedCategory && (
            <View style={styles.menu}>
            <Text style={styles.selectedCategoryText}>Seleccionada: {selectedCategory.name}</Text>
            <CategoryEdit
            value={selectedCategory.id}
            onChange={(catId) => {
                const cat = categories.find(c => c.id === catId);
                setSelectedCategory(cat);
            }}
            />

            <View style={styles.actions}>
                <Button onPress={() => setIsEditing(true)} variant="secondary">Renombrar</Button>
                <Button onPress={() => setIsAdding(true)} variant="secondary">Agregar</Button>
                <Button
                onPress={handleDeleteCategory}
                variant="danger"
                disabled={categories.length === 1}
                >
                Borrar
                </Button>
            </View>
            </View>
        )}

        {/* MODAL AGREGAR CATEGORÍA */}
        <Modal visible={isAdding} transparent animationType="slide">
            <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsAdding(false)}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Nueva Categoría</Text>
                <Input
                placeholder="Nombre de la categoría"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
                />
                <View style={styles.modalButtons}>
                <Button onPress={handleAddCategory} variant="success">Agregar</Button>
                <Button onPress={() => setIsAdding(false)} variant="secondary">Cancelar</Button>
                </View>
            </View>
            </TouchableOpacity>
        </Modal>

        {/* MODAL RENOMBRAR CATEGORÍA */}
        <Modal visible={isEditing} transparent animationType="slide">
            <TouchableOpacity style={styles.modalOverlay} onPress={() => setIsEditing(false)}>
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Renombrar Categoría</Text>
                <Input
                placeholder="Nuevo nombre"
                value={newCategoryName}
                onChangeText={setNewCategoryName}
                />
                <View style={styles.modalButtons}>
                <Button onPress={handleEditCategory} variant="success">Cambiar</Button>
                <Button onPress={() => setIsEditing(false)} variant="secondary">Cancelar</Button>
                </View>
            </View>
            </TouchableOpacity>
        </Modal>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { marginVertical: 10 },
    menu: { marginTop: 8, padding: 8, backgroundColor: "#f3f4f6", borderRadius: 8 },
    selectedCategoryText: { fontWeight: "600", marginBottom: 8, color: "#374151" },
    actions: { flexDirection: "row", justifyContent: "space-around" },
    modalOverlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", padding: 20 },
    modalContent: { backgroundColor: "#fff", borderRadius: 10, padding: 16 },
    modalTitle: { fontSize: 16, fontWeight: "700", marginBottom: 12, textAlign: "center" },
    modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 12 },
});
