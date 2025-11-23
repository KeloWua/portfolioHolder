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

    