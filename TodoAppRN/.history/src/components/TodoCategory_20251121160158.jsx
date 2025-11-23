/* TodoCategory.jsx */

import { useSelector } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
/**Como instalar picker */
{ }


export default function TodoCategory({ todo, setCategory }) {
    const categories = useSelector((state) => state.todos.categories || []);

    return (
        

            <select
                className="
                    rounded-xl px-4 py-2 
                    bg-white dark:bg-gray-800 
                    text-gray-800 dark:text-gray-100 
                    border border-gray-300 dark:border-gray-600
                    shadow-sm 
                    focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    hover:shadow-md 
                    transition-all duration-200
                    cursor-pointer
                "
                value={todo.categoryId}            // ✅ CORREGIDO
                onChange={(e) => setCategory(e.target.value)}   // ✔️ ya devuelve el ID correcto
            >
                {categories.map((c) => (
                    <option
                        className="bg-white dark:bg-gray-800"
                        key={c.id}
                        value={c.id}   // ✔️ ID correcto
                    >
                        {c.name}
                    </option>
                ))}
            </select>
            );
}
