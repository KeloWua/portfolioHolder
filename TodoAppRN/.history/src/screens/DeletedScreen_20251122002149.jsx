import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Deleted from "../components/Deleted";

export default function HomeScreen() {
    return (
        <SafeAreaView style={{ flex: 1, padding: 16 }}>
        <Deleted />
        </SafeAreaView>
    );
    }
