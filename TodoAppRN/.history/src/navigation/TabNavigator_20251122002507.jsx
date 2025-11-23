import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ClearedScreen from "../screens/ClearedScreen";
import SettingsScreen from "../screens/SettingsScreen";
import DeletedScreen from "../screens/DeletedScreen";
import { Ionicons } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
    return (
        <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "#22c55e",
            tabBarInactiveTintColor: "#6b7280",
            tabBarStyle: {
            backgroundColor: "#fff",
            paddingBottom: 6,
            height: 60,
            },
            tabBarIcon: ({ color, size }) => {
            let icon = "ios-home";

            if (route.name === "Todos") icon = "checkbox-outline";
            if (route.name === "Cleared") icon = "trash-outline";
            if (route.name === "Deleted") icon = "clear-outline";
            if (route.name === "Settings") icon = "settings-outline";
            

            return <Ionicons name={icon} size={size} color={color} />;
            },
        })}
        >
        <Tab.Screen name="Todos" component={HomeScreen} />
        <Tab.Screen name="Cleared" component={ClearedScreen} />
        <Tab.Screen name="Deleted" component={DeletedScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
    );
    }
