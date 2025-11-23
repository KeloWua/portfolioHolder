import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TodoList from "../components/TodoList";
import AddTodo from "../components/AddTodo";

export default function HomeScreen() {
    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
        
        <TodoList />
        <AddTodo />
        </SafeAreaView>
    );
    }
