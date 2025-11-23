import { useDispatch, useSelector } from "react-redux";
import { setFilter, setCategoryFilter } from "../features/todos/todosSlice";
import Button from "../app/ui/Button";

    export default function TodoFilters() {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.todos.filter);
    const categories = useSelector(state => state.todos.categories || []);
    const categoryFilter = useSelector(state => state.todos.categoryFilter);


    return (
        <View className='space-y-4'>
            {/* Status Filters */}
            <View className='flex flex-wrap gap-2'>
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
                <Text className="block mb-2 text-gray-700 dark:text-gray-300 font-medium">
                    🏷️ Filtrar por Categoría:
                </Text>
                <Picker
                    id="category"
                    onValueChange={(value, index) => dispatch(setCategoryFilter(value))}
                    selectedValue={categoryFilter}
                >
                    <option value="all">Todas las Categorías</option>
                    {categories.map((c, index) => (
                        <option key={index} value={c.id}>{c.name}</option>
                    ))}
                    <Picker.Item 
                    {categories.map((c) => (
                                    <Picker.Item key={c.id} label={c.name} value={c.id} />
                                ))}
                </Picker>
                <Picker
                                selectedValue={category}
                                onValueChange={(itemValue, itemIndex) => setCategory(itemValue)} 
                            >
                                {categories.map((c) => (
                                    <Picker.Item key={c.id} label={c.name} value={c.id} />
                                ))}
                </Picker>
            </View>
        </View>
    );
}

    