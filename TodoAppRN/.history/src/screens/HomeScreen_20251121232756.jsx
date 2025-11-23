import React from 'react';
import { View, StyleSheet, useColorScheme} from 'react-native';
import TodoList from "../components/TodoList";
import ClearedTodoList from '../components/ClearedTodoList';
import { SafeAreaView } from "react-native-safe-area-context";


export default function HomeScreen() {
const colorScheme = useColorScheme();
const backgroundColor = colorScheme === 'dark' ? '#4a3b3bff' : '#acccecff';
    return (
        <SafeAreaView style={[styles.container, {backgroundColor}]}>
            <TodoList />
            <ClearedTodoList />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    style={
        flex: 1,
        edges: ['top', 'bottom']
        } 
});