// src/components/CategorySelect.jsx

import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export default function CategorySelect({
    value,
    onChange,
    label = "Categoría",
    placeholder = "Selecciona una categoría",
    style
}) {
    const categories = useSelector((state) => state.todos.categories || []);

    const data = categories.map(c => ({
        label: c.name,
        value: c.id
    })).,;
    console.log("CategorySelect data:", data);
    return (
        <View style={[styles.container, style]}>
            {label && <Text style={styles.label}>{label}</Text>}

            <Dropdown
                style={styles.dropdown}
                data={data}
                labelField="label"
                valueField="value"
                placeholder={placeholder}
                value={value}
                onChange={(item) => onChange(item.value)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginBottom: 10,
    },
    label: {
        color: "#7C3AED",
        marginBottom: 5,
        fontWeight: "600",
    },
    dropdown: {
        height: 48,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 12,
        backgroundColor: "#fff",
    },
});
