import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import TodoList from "../components/TodoList";
import ClearedTodoList from '../components/ClearedTodoList';

export default function HomeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <TodoList />
            <ClearedTodoList />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 116,
        backgroundColor: '#f9fafb',
    },
});