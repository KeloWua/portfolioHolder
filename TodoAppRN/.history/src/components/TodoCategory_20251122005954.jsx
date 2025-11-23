/* TodoCategory.jsx - React Native */

import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from 'react-native-picker-select';

export default function TodoCategory({ todo, setCategory }) {
    const categories = useSelector((state) => state.todos.categories || []);

    return (
        <View style={styles.container}>
        <Text style={styles.label}>Category:</Text>
        <RNPickerSelect
            selectedValue={todo.categoryId}
            style={styles.picker}
            onValueChange={(itemValue) => setCategory(itemValue)}
            items={categories.map(c => ({ label: c.name, value: c.id }))}
        />
            
        </RNPickerSelect>
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
    picker: {
        height: 40,
        borderWidth: 1,
        borderColor: "#D1D5DB",
        borderRadius: 8,
    },
    });
