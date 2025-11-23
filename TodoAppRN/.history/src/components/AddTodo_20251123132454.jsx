/*AddTodo.jsx */

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";
import Modal from "../app/ui/Modal.jsx"
import Button from '../app/ui/Button';
import Input from "../app/ui/Input.jsx";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from '@react-native-picker/picker';
import CategorySelect from "../components/CategorySelect";

export default function AddTodo() {
    const [isVisible, setIsVisible] = useState(false);
    const [todo, setTodo] = useState("");
    const [category, setCategory] = useState("Importante");
    const categories = useSelector(state => state.todos.categories || []);
    const dispatch = useDispatch();

    const handleAdd = () => {
        if (todo.trim() === "") {
            alert("Por favor escribe algo!");
            return;
        }
        dispatch(addTodo({ text: todo, categoryId: category }));
        setTodo("");
        setIsVisible(false);
    };

    return (
        <>
            <Button
                onPress={() => setIsVisible(!isVisible)}
                variant="primary"
            >
                {isVisible ? "✕ Cerrar" : "➕ Nueva Tarea"}
            </Button>
            {isVisible && (
                <Modal onClose={() => setIsVisible(false)}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Crear Nueva Tarea</Text>
                        <Input
                            type="text"
                            placeholder="¿Qué necesitas hacer?"
                            value={todo}
                            onChangeText={setTodo}
                            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                        />

                        <View>
                            <Text style={{ marginBottom: 4 }}>
                                📂 Category:
                            </Text>
                            <CategorySelect
                            value={category}
                            />
                        </View>

                        <View style={styles.buttonsContainer}>
                            <Button onPress={handleAdd} variant="success" className="flex-1">✓ Agregar</Button>
                            <Button onPress={() => setIsVisible(false)} variant="secondary" className="flex-1">Cancelar</Button>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
}

const styles = StyleSheet.create({
    modalBackground: { flex:1, justifyContent:'center', alignItems:'center', backgroundColor:'rgba(0,0,0,0.5)' },
    modalContent: { width: '90%', padding: 16, backgroundColor: '#c65151ff', borderRadius: 10 },
    modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 12 },
    input: { borderWidth: 1, borderColor: '#b65656ff', padding: 8, borderRadius: 8, marginBottom: 12 },
    buttonsContainer: { flexDirection:'row', justifyContent:'space-between', marginTop: 8 },
});
