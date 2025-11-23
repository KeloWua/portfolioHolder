/* AddTodo.jsx */
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo } from "../features/todos/todosSlice";
import Modal from "../app/ui/Modal";
import Button from "../app/ui/Button";
import Input from "../app/ui/Input";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function AddTodo() {
  const [isVisible, setIsVisible] = useState(false); // modal principal
  const [isCategoryModal, setIsCategoryModal] = useState(false); // modal de categorías
  const [todo, setTodo] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = useSelector((state) => state.todos.categories || []);
  const dispatch = useDispatch();

  // inicializamos la categoría por defecto
  useState(() => {
    if (categories.length && !selectedCategory) {
      setSelectedCategory(categories[0]);
    }
  }, [categories]);

  const handleAdd = () => {
    if (!todo.trim()) {
      alert("Por favor escribe algo!");
      return;
    }
    dispatch(
      addTodo({
        text: todo,
        categoryId: selectedCategory?.id,
      })
    );
    setTodo("");
    setSelectedCategory(categories[0] || null);
    setIsVisible(false);
  };

  return (
    <>
      {/* Botón para abrir modal de agregar todo */}
      <Button onPress={() => setIsVisible(true)} variant="primary">
        ➕ Nueva Tarea
      </Button>

      {/* Modal principal */}
      {isVisible && (
        <Modal onClose={() => setIsVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Crear Nueva Tarea</Text>

            <Input
              placeholder="¿Qué necesitas hacer?"
              value={todo}
              onChangeText={setTodo}
            />

            {/* Botón para abrir modal de categorías */}
            <Button
              onPress={() => setIsCategoryModal(true)}
              variant="secondary"
              style={{ marginVertical: 8 }}
            >
              {selectedCategory ? selectedCategory.name : "Selecciona categoría"}
            </Button>

            {/* Botones de acción */}
            <View style={styles.buttonsContainer}>
              <Button onPress={handleAdd} variant="success" style={{ flex: 1 }}>
                ✓ Agregar
              </Button>
              <Button
                onPress={() => setIsVisible(false)}
                variant="secondary"
                style={{ flex: 1 }}
              >
                Cancelar
              </Button>
            </View>
          </View>
        </Modal>
      )}

      {/* Modal de selección de categoría */}
      {isCategoryModal && (
        <Modal onClose={() => setIsCategoryModal(false)}>
          <View style={styles.categoryModalContent}>
            <Text style={styles.modalTitle}>Selecciona categoría</Text>
            <FlatList
              data={categories}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.categoryItem,
                    item.id === selectedCategory?.id && styles.categorySelected,
                  ]}
                  onPress={() => {
                    setSelectedCategory(item);
                    setIsCategoryModal(false);
                  }}
                >
                  <Text style={styles.categoryText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Modal>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    width: "90%",
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  categoryModalContent: {
    width: "90%",
    maxHeight: 300,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
  },
  categoryItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  categoryText: {
    fontSize: 16,
  },
  categorySelected: {
    backgroundColor: "#e0f2fe",
  },
});
