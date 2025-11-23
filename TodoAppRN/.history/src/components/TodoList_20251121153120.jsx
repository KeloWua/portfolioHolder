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
    <View styles={styles.container}>
        {/* Search Section */}
        <View styles={styles.searchContainer}>
            <Button>
            🔍 {isSearch ? 'Ocultar Búsqueda' : 'Buscar'}
            </Button>
            {isSearch && (
            <View className='mt-3 space-y-2'>
        <Input 
        type="text"
        placeholder="Search todos..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button 
        onClick={() => setSearchTerm('')}
        className='text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 transition-colors'
        >
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
        <View className='space-y-3'>
            {filteredTodos.length === 0 ? (
                <View className='text-center py-12'>
                    <p className='text-gray-500 dark:text-gray-400 text-lg'>No hay tareas aquí 🎉</p>
                </View>
            ) : (
                filteredTodos.map(todo => (
                    <View key={todo.id}>
                        <TodoItem todo={todo}/>
                    </View>
                ))
            )}
        </View>
    </View>
    );
}