import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import TodoList from "../components/TodoList";

export default function HomeScreen() {
    return (
        <ScrollView style={styles.container}>
            <View>
                <TodoList />
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5',
    }
})