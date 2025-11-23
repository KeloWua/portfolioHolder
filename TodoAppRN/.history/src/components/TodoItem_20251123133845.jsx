
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  changeTodoCategory,
  changeTodoName,
} from "../features/todos/todosSlice";
import TodoCategory from "./TodoCategory";
import { Modal, View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Input from "../app/ui/Input";
import Button from "../app/ui/Button";

export default function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [newTodoName, setNewTodoName] = useState("");

  const handleChangeTodoName = () => {
    if (newTodoName.trim() === "") {
      alert("El nombre no puede estar vacío");
      return;
    }
    dispatch(changeTodoName({ id: todo.id, newName: newTodoName }));
    setNewTodoName("");
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <View style={styles.card}>
      {/* Texto + fecha */}
      <TouchableOpacity
        style={styles.textContainer}
        onPress={() => {
          setIsEditing(true);
          setNewTodoName(todo.text);
        }}
      >
        <Text style={[styles.text, todo.completed && styles.completedText]}>
          {todo.text}
        </Text>
        <Text style={styles.date}>{formatDate(todo.createdAt)}</Text>
      </TouchableOpacity>

      {/* Categoría */}
      <TodoCategory
        todo={todo}
        setCategory={(newCategoryId) =>
          dispatch(changeTodoCategory({ id: todo.id, newCategoryId }))
        }
      />

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <Button onPress={() => dispatch(toggleTodo(todo.id))}>Toggle</Button>
        <Button onPress={() => dispatch(deleteTodo(todo.id))} variant="danger">
          Delete
        </Button>
      </View>

      {/* Modal */}
      {isEditing && (
        <Modal transparent animationType="slide" visible={isEditing}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Editar tarea:</Text>
              <Text style={styles.modalText}>{todo.text}</Text>

              <Input
                value={newTodoName}
                onChangeText={setNewTodoName}
                placeholder="Nuevo nombre"
              />

              <View style={styles.modalButtons}>
                <Button onPress={handleChangeTodoName}>Guardar</Button>
                <Button onPress={() => setIsEditing(false)} variant="secondary">
                  Cancelar
                </Button>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#f9fafb",
    borderColor: "#d1d5db",
    borderWidth: 1,
  },
  textContainer: { flex: 1, marginBottom: 10 },
  text: { fontSize: 16, fontWeight: "500", color: "#111827" },
  completedText: { textDecorationLine: "line-through", color: "#9ca3af" },
  date: { fontSize: 12, color: "#6b7280", marginTop: 2 },
  buttonContainer: { flexDirection: "row", gap: 10 },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
  modalText: { marginBottom: 10, fontSize: 16, color: "#111827" },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
});
