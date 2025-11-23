/* TodoCategory.jsx - React Native */
import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

export default function TodoCategory({ todo, setCategory }) {
    const categories = useSelector((state) => state.todos.categories || []);
    const [isModalVisible, setIsModalVisible] = useState(false);

    const selectedCategory = categories.find(c => c.id === todo.categoryId)?.name || "Sin categoría";

    return (
        <View style={styles.container}>
        <Text style={styles.label}>📂 Category:</Text>

        <TouchableOpacity 
            style={styles.categoryBox} 
            onPress={() => setIsModalVisible(true)}
        >
            <Text style={styles.categoryText}>{selectedCategory}</Text>
        </TouchableOpacity>

        {/* Modal de selección */}
        <Modal
            visible={isModalVisible}
            transparent
            animationType="slide"
            onRequestClose={() => setIsModalVisible(false)}
        >
            <TouchableOpacity 
            style={styles.modalOverlay} 
            onPress={() => setIsModalVisible(false)}
            >
            <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Elige una categoría</Text>
                <FlatList
                data={categories}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                    style={styles.modalItem}
                    onPress={() => {
                        setCategory(item.id);
                        setIsModalVisible(false);
                    }}
                    >
                    <Text style={styles.modalItemText}>{item.name}</Text>
                    </TouchableOpacity>
                )}
                />
            </View>
            </TouchableOpacity>
        </Modal>
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { marginVertical: 8 },
    label: { fontWeight: "600", marginBottom: 4, color: "#7C3AED" },
    categoryBox: { 
        borderWidth: 1, borderColor: "#D1D5DB", borderRadius: 8, 
        paddingVertical: 10, paddingHorizontal: 12, backgroundColor: "#fff"
    },
    categoryText: { fontSize: 14, color: "#111827" },
    modalOverlay: { 
        flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', padding: 20 
    },
    modalContent: { 
        backgroundColor: "#fff", borderRadius: 10, padding: 16, maxHeight: "60%" 
    },
    modalTitle: { fontWeight: "700", fontSize: 16, marginBottom: 12, textAlign: "center" },
    modalItem: { paddingVertical: 12, borderBottomWidth: 1, borderColor: "#eee" },
    modalItemText: { fontSize: 14, color: "#111827", textAlign: "center" },
    });
    