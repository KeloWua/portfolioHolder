// src/app/ui/Input.jsx
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

export default function Input({ label, style, ...props }) {
  return (
    <View style={[styles.container, style]}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholderTextColor="#999"
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 8,
  },
  label: {
    fontSize: 14,
    color: '#ddd',
    marginBottom: 4,
  },
  input: {
    borderWidth: 1,
    borderColor: '#666',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    color: '#fff',
    backgroundColor: '#222',
  },
});
