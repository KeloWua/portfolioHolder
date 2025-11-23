import React from 'react';
import { View, SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import TodoList from "../components/TodoList";
import ClearedTodoList from '../components/ClearedTodoList';



export default function HomeScreen() {
const colorScheme = useColorScheme();
const backgroundColor = colorScheme === 'dark' ? '#714f4fff' : '#f9fafb';
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
        backdropFilter: 'blur(10px)',
    },
});