/* TodoCategory.jsx - React Native nativo */
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";

export default function TodoCategory({ todo, setCategory }) {
  const categories = useSelector((state) => state.todos.categories || []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>📂 Category:</Text>
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={todo.categoryId ?? (categories[0] && categories[0].id)}
          onValueChange={(itemValue) => setCategory(itemValue)}
          mode="dropdown" // iOS dropdown nativo
          style={styles.picker}
        >
          {categories.map((c) => (
            <Picker.Item key={c.id} label={c.name} value={c.id} />
          ))}
        </Picker>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  label: {
    color: "#7C3AED",
    marginBottom: 4,
    fontWeight: "600",
    fontSize: 14,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#D1D5DB",
    borderRadius: 8,
    overflow: "hidden", // importante para iOS
  },
  picker: {
    height: 40,
    color: "#111827",
    backgroundColor: "#fff",
  },
});
