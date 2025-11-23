/* TodoCategory.jsx - React Native */
import { View, Text, StyleSheet } from "react-native";
import RNPickerSelect from "react-native-picker-select";

export default function CategoryPicker({ categories, category, setCategory }) {
    return (
        <View style={styles.container}>
        <Text style={styles.label}>Category:</Text>
        <RNPickerSelect
            value={category} // Valor actual seleccionado
            onValueChange={(itemValue) => setCategory(itemValue)}
            items={categories.map(c => ({ label: c.name, value: c.id }))}
            style={{
            inputIOS: styles.picker,
            inputAndroid: styles.picker,
            placeholder: { color: "#999" },
            }}
            placeholder={{ label: "Selecciona una categoría...", value: null }}
        />
        </View>
    );
    }

    const styles = StyleSheet.create({
    container: { marginVertical: 8 },
    label: { marginBottom: 4, fontSize: 14, color: "#fff" },
    picker: {
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        backgroundColor: "#222",
        color: "#fff",
        fontSize: 16,
    },
    });
