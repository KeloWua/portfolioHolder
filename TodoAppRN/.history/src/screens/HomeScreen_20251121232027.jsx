import React from 'react';
import { View, SafeAreaView, StyleSheet, useColorScheme} from 'react-native';
import TodoList from "../components/TodoList";
import ClearedTodoList from '../components/ClearedTodoList';



export default function HomeScreen() {
const colorScheme = useColorScheme();
    return (
        <SafeAreaView style={styles.container, {backdropColor: colorScheme === 'dark' ? '#000' : '#f9fafb'}}>
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