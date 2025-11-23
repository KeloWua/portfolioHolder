{/* src/components/TodoItem.jsx */}
import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  changeTodoCategory,
  changeTodoName,
} from "../features/todos/todosSlice";
import TodoCategory from "./TodoCategory.jsx";
import { Modal, View, Text, TouchableOpacity, StyleSheet} from "react-native";
import Input from "../app/ui/Input.jsx";
import Button from "../app/ui/Button.jsx";

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

  const formatDate(dateString) {
    return new Date(dateString).toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    
      {/* Tarjeta principal */}
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
            dispatch(
              changeTodoCategory({ id: todo.id, newCategoryId })
            )
          }

        />

        {/* Botones */}
        <View className="flex gap-2">
          <Button onClick={() => dispatch(toggleTodo(todo.id))}>
            Toggle
          </Button>

          <Button
            onClick={() => dispatch(deleteTodo(todo.id))}
            variant="danger"
          >
            Delete
          </Button>
        </View>
      </View>

      {/* Modal */}
      {isEditing && (
        <Modal onClose={() => setIsEditing(false)}>
          <View className="text-center mb-3">
            <Text className="font-semibold text-gray-900 dark:text-white">Editar tarea:</Text>
            <p className="bg-blue-100 dark:bg-blue-900 text-gray-900 dark:text-blue-100 p-2 mt-1 rounded">
              {todo.text}
            </p>
          </View>

          <Input
            value={newTodoName}
            onChange={(e) => setNewTodoName(e.target.value)}
          />

          <View className="flex gap-3 justify-center mt-4">
            <Button onClick={handleChangeTodoName}>Guardar</Button>
            <Button onClick={() => setIsEditing(false)} variant="secondary">
              Cancelar
            </Button>
          </View>
        </Modal>
      )}
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