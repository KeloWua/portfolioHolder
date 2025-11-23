// src/components/TodoFilters.jsx

import { useDispatch, useSelector } from "react-redux";
import { setFilter, setCategoryFilter } from "../features/todos/todosSlice";
import Button from "../app/ui/Button";
import { View, Text } from "react-native";
import { Picker } from '@react-native-picker/picker';
import CategorySelect from "../components/CategorySelect";


    export default function TodoFilters() {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.todos.filter);
    const categories = useSelector((state) => state.todos.categories || []);
    const categoryFilter = useSelector((state) => state.todos.categoryFilter);

    return (
        <View>
        {/* Status Filters */}
        <View>
            <Button
            onPress={() => dispatch(setFilter("all"))}
            variant={filter === "all" ? "primary" : "secondary"}
            >
            📋 Todas
            </Button>

            <Button
            onPress={() => dispatch(setFilter("active"))}
            variant={filter === "active" ? "primary" : "secondary"}
            >
            ⏳ Activas
            </Button>

            <Button
            onPress={() => dispatch(setFilter("completed"))}
            variant={filter === "completed" ? "primary" : "secondary"}
            >
            ✅ Completadas
            </Button>
        </View>

        {/* Category Filter */}
        <View>
            <CategorySelect
            onChange={(value) => dispatch(setCategoryFilter(value))}
            value={categoryFilter}
            label="🏷️ Filter by category"
            extraItems={[{ label: "All", value: "all" }]}
            />
        </View>
        </View>
);  
}
