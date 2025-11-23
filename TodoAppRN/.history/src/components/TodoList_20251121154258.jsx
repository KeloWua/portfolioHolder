/*TodoList.jsx */
import { useSelector, useDispatch } from 'react-redux';
import { clearCompleted } from '../features/todos/todosSlice';
import TodoItem from './TodoItem';
import { useState } from 'react';
import { View, Text, ScrollView, TextInput, StyleSheet } from 'react-native';
import Button from '../app/ui/Button';
import Input from '../app/ui/Input';



export default function TodoList() {
    const todos = useSelector(state => state.todos.todos);
    const filter = useSelector(state => state.todos.filter);
    const categoryFilter = useSelector(state => state.todos.categoryFilter);
    const dispatch = useDispatch();

    const [isSearch, setIsSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    const filteredTodos = todos
    .filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
})
        .filter(todo => {
    if (categoryFilter === 'all') return true;
    return todo.categoryId === categoryFilter;
})
    .filter(todo =>  todo.text.toLowerCase().includes(searchTerm.toLowerCase())); // búsqueda


    const activeTodos = todos.filter(todo => !todo.completed).length;
    const completedTodos = todos.filter(todo => todo.completed).length;


    return (
    <View style={styles.container}>
        {/* Search Section */}
        <View style={styles.searchContainer}>
            <Button variant="ghost" onPress={() => setIsSearch(!isSearch)}>
            🔍 {isSearch ? 'Ocultar Búsqueda' : 'Buscar'}
            </Button>
            {isSearch && (
            <View style={{ marginTop: 10 }}>
                <Input
                    placeholder="Search todos..."
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                />
                <Button variant="secondary" onPress={() => setSearchTerm('')}>
                    ✕ Limpiar búsqueda
                </Button>
                </View>
                )}
            </View>

            {/* Stats */}
            <View className='grid grid-cols-2 gap-4'>
                <View className='bg-linear-to-br from-amber-50 to-yellow-50 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-yellow-200 dark:border-gray-600'>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>Tareas Pendientes</p>
                    <p className='text-2xl font-bold text-amber-600 dark:text-amber-400'>{activeTodos}</p>
                </View>
                <View className='bg-linear-to-br from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-800 p-4 rounded-lg border border-green-200 dark:border-gray-600'>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>Completadas</p>
                    <p className='text-2xl font-bold text-green-600 dark:text-green-400'>{completedTodos}</p>
                </View>
            </View>

            {/* Clear Completed Button */}
            {filter === 'completed' && completedTodos > 0  ? 
            <Button
            onClick={() => dispatch(clearCompleted())}
            variant="danger"
            className='w-full'
            >
                🗑️ Limpiar Completadas ({completedTodos})
            </Button> 
            : ''}

            {/* Todos List */}
            <View style={styles.statsContainer}>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Tareas Pendientes</Text>
                    <Text style={styles.statValue}>{activeTodos}</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statLabel}>Completadas</Text>
                    <Text style={styles.statValue}>{completedTodos}</Text>
                </View>
            </View>            
        </View>

      /* Clear Completed Button */
        {filter === 'completed' && completedTodos > 0 && (
            <Button
            variant="danger"
            onPress={() => dispatch(clearCompleted())}
            style={{ marginVertical: 10 }}
            >
            🗑️ Clear Completed ({completedTodos})
            </Button>
        )}

    /* Todos List */
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ gap: 10}}>
            {filteredTodos.length === 0 ? (
                <Text style={styles.noTodosText}>There are no ToDos here🎉</Text>
            ) : (
                filteredTodos.map(todo => <TodoItem key={todo.id} todo={todo} />)
            )}

        </ScrollView>




        );
    }