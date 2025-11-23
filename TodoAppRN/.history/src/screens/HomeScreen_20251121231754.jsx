import React from 'react';
import { View, SafeAreaView,SafeAreaContext, StyleSheet, useColorScheme} from 'react-native';
import TodoList from "../components/TodoList";
import ClearedTodoList from '../components/ClearedTodoList';

export default function HomeScreen() {
    return (
        <SafeAreaContext style={styles.container}>
            <TodoList />
            <ClearedTodoList />
        </SafeAreaContext>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9fafb',
    },
});