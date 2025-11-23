import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import DeletedTodoList from "../components/DeletedTodoList";

export default function HomeScreen() {
    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <DeletedTodoList />
        </SafeAreaView>
    );
    }
