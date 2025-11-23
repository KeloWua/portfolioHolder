import React from 'react';
import { View, SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import TodoList from "../components/TodoList";
import ClearedTodoList from '../components/ClearedTodoList';


const colorScheme = useColorScheme();

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