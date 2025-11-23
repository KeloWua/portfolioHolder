import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import ClearedTodoList from "../components/ClearedTodoList";

export default function ClearedScreen() {
  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <ClearedTodoList />
    </SafeAreaView>
  );
}
