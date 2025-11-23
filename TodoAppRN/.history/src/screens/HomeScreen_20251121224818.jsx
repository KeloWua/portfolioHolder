import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TodoList from "../components/TodoList";
import ClearedTodoList from '../components/ClearedTodoList';

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container}>
            <View>
                <TodoList />
                <ClearedTodoList />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9fafb',
    },
});