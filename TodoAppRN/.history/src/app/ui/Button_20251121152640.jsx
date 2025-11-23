import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ children, variant = "primary", style, ...props }) {
  // Define estilos según variant
  const variants = {
    primary: { backgroundColor: "#3b82f6", color: "white" },
    secondary: { backgroundColor: "#d1d5db", color: "#111827" },
    danger: { backgroundColor: "#ef4444", color: "white" },
    success: { backgroundColor: "#22c55e", color: "white" },
    info: { backgroundColor: "#06b6d4", color: "white" },
    warning: { backgroundColor: "#facc15", color: "#111827" },
    outline: { backgroundColor: "transparent", borderWidth: 1, borderColor: "#9ca3af", color: "#111827" },
    ghost: { backgroundColor: "transparent", color: "#3b82f6" },
    subtle: { backgroundColor: "#bfdbfe", color: "#1e3a8a" },
  };

  const variantStyles = variants[variant] || variants.primary;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: variantStyles.backgroundColor, borderWidth: variantStyles.borderWidth, borderColor: variantStyles.borderColor }, style]}
      {...props}
    >
      <Text style={{ color: variantStyles.color, fontWeight: "600", textAlign: "center" }}>
        {children}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
});
