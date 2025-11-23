import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import TodoList from "../components/TodoList";
import ClearedTodoList from '../components/ClearedTodoList';
import { useColorScheme } from 'react-native';

const colorScheme = useColorScheme();
const backgroundColor = colorScheme === 'dark' ? '#121212' : '#f9fafb';


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
        padding: 16,
        backgroundColor: '#f9fafb',
    },
});