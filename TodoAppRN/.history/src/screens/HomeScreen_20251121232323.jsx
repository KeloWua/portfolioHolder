import React from 'react';
import { View, SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import TodoList from "../components/TodoList";
import ClearedTodoList from '../components/ClearedTodoList';



export default function HomeScreen() {
const colorScheme = useColorScheme();
const backgroundColor = colorScheme === 'dark' ? '#4a3b3bff' : '#869fb8ff';
    return (
        <SafeAreaView style={styles.container, {backgroundColor}}>
            <TodoList />
            <ClearedTodoList />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f0f4f8',
    },
});