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
      <View
        
      >
        {/* Texto + fecha */}
        <View
          className="flex flex-col gap-1 cursor-pointer flex-1"
          onClick={() => {
            setIsEditing(true);
            setNewTodoName(todo.text);
          }}
        >
          <span
            className={`
              text-lg font-medium 
              ${
                todo.completed
                  ? "line-through text-gray-400 dark:text-gray-500"
                  : "text-gray-900 dark:text-white"
              }
            `}
          >
            {todo.text}
          </span>

          <span className="text-xs text-gray-500 dark:text-gray-400">
            {formatDate(todo.createdAt)}
          </span>
        </View>

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
            <span className="font-semibold text-gray-900 dark:text-white">Editar tarea:</span>
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
