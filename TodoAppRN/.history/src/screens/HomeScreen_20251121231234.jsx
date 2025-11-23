import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TodoList from "../components/TodoList";
import ClearedTodoList from '../components/ClearedTodoList';

export default function HomeScreen() {
    return (
        <View style={styles.container}>
            <View>
                <TodoList />
                <ClearedTodoList />
            </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9fafb',
    },
});