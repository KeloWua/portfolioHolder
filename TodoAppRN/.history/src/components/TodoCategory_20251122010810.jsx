/* TodoCategory.jsx - React Native */

import React from "react";
import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function TodoCategory({ todo, setCategory }) {
    const categories = useSelector((state) => state.todos.categories || []);

    return (
        <View style={styles.container}>
        <Text style={styles.label}>📂 Category:</Text>
        <RNPickerSelect
  onValueChange={(value) => setCategory(value)}
  value={todo.categoryId || (categories[0] && categories[0].id)}
  placeholder={{ label: "Selecciona una categoría...", value: null }}
  items={categories.map((c) => ({ label: c.name, value: c.id }))}
  style={{
    inputIOS: styles.inputIOS,
    inputAndroid: styles.inputAndroid,
    placeholder: { color: "#999" },
  }}
  useNativeAndroidPickerStyle={false}
  doneText="Hecho"        // ✅ importante en iOS
  hideIcon={false}        // muestra la flecha
/>

        </View>
    );
    }

    const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    label: {
        color: "#7C3AED", // morado
        marginBottom: 4,
        fontWeight: "600",
    },
    inputIOS: {
        height: 40,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        color: "#000",
        backgroundColor: "#fff",
    },
    inputAndroid: {
        height: 40,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
        paddingHorizontal: 8,
        color: "#000",
        backgroundColor: "#fff",
    },
});
