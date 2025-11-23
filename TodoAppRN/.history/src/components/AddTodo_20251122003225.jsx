/*AddTodo.jsx */

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";
import Modal from "../app/ui/Modal.jsx"
import Button from '../app/ui/Button';
import Input from "../app/ui/Input.jsx";

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
                className="flex items-center gap-2 mb-4"
            >
                {isVisible ? "✕ Cerrar" : "➕ Nueva Tarea"}
            </Button>
            {isVisible && (
                <Modal onClose={() => setIsVisible(false)}>
                    <View className="space-y-4">
                        <Text className="text-lg font-bold text-gray-900 dark:text-white">Crear Nueva Tarea</Text>
                        <Input
                            type="text"
                            placeholder="¿Qué necesitas hacer?"
                            value={todo}
                            onChange={(e) => setTodo(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleAdd()}
                        />

                        <View>
                            <label htmlFor="category" className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                                📂 Category:
                            </label>
                            <Picker
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className='w-full px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400'
                            >
                                {categories.map((c, index) => (
                                    <option key={index} value={c.id}>{c.name}</option>
                                ))}
                            </Picker>
                        </View>

                        <View className="flex gap-2">
                            <Button onPress={handleAdd} variant="success" className="flex-1">✓ Agregar</Button>
                            <Button onPress={() => setIsVisible(false)} variant="secondary" className="flex-1">Cancelar</Button>
                        </View>
                    </View>
                </Modal>
            )}
        </>
    );
}
