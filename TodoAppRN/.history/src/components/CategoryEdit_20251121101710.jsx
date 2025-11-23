// src/components/CategoryEdit.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    addCategory,
    renameCategory,
    deleteCategory,
} from "../features/todos/todosSlice";
import Modal from "../app/ui/Modal.jsx";
import Input from "../app/ui/Input.jsx";
import Button from "../app/ui/Button.jsx";

export default function CategoryEdit() {
    const categories = useSelector((state) => state.todos.categories || []);
    const todos = useSelector((state) => state.todos.todos || []);
    const [isVisible, setIsVisible] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const [newCategory, setNewCategory] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryName, setCategoryName] = useState("");

    const dispatch = useDispatch();
    useEffect(() => {
    if (!categories.length) return;

    // Si la seleccionada ya no existe → seleccionar otra
    if (!selectedCategory || !categories.some(c => c.id === selectedCategory.id)) {
        setSelectedCategory(categories[0]);
    }
}, [categories]);


    // Inicializar selectedCategory con la primera categoría disponible
    useEffect(() => {
        if (!selectedCategory && categories.length > 0) {
        setSelectedCategory(categories[0]);
        }
        // si la categoría seleccionada fue borrada, reajustar
        if (
        selectedCategory &&
        !categories.some((c) => c.id === selectedCategory.id)
        ) {
        setSelectedCategory(categories[0] || null);
        }
    }, [categories, selectedCategory]);

    // ------------------------------
    // ADD CATEGORY
    // ------------------------------
    const handleAddCategory = () => {
        const trimmed = (newCategory || "").trim();
        if (!trimmed) {
        alert("No puedes agregar una categoría vacía.");
        return;
        }
        // dispatch
        dispatch(addCategory(trimmed));
        setNewCategory("");
        setIsAdding(false);
    };

    // ------------------------------
    // EDIT CATEGORY (rename)
    // ------------------------------
    const handleEditCategory = () => {
        if (!selectedCategory || !categoryName.trim()) return;
        dispatch(
        renameCategory({ id: selectedCategory.id, newName: categoryName.trim() })
        );
        setCategoryName("");
        setIsEditing(false);
    };

    // ------------------------------
    // DELETE CATEGORY (confirm)
    // ------------------------------
    const handleDeleteCategory = () => {
        if (!selectedCategory) return;
        setConfirmDelete(true);
    };

    // comprobar si la categoría está en uso por algún todo (por categoryId)
    const isCategoryInUse = selectedCategory
        ? todos.some((todo) => todo.categoryId === selectedCategory.id)
        : false;

    return (
        <>
        {/* ADD CATEGORY MODAL */}
        {isAdding && (
            <Modal onClose={() => setIsAdding(false)}>
            <Input
                type="text"
                placeholder="New Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
                <Button onClick={handleAddCategory}>Agregar</Button>
                <Button onClick={() => setIsAdding(false)}>Cancelar</Button>
            </div>
            </Modal>
        )}

        {/* EDIT CATEGORY MODAL */}
        {isEditing && selectedCategory && (
            <Modal onClose={() => setIsEditing(false)}>
            <div className="mb-2">
                <div className="text-sm text-gray-400">Edit Category:</div>
                <div className="font-semibold text-lg">{selectedCategory.name}</div>
            </div>

            <Input
                type="text"
                placeholder="New category name"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
            />
            <div className="flex justify-end gap-2 mt-2">
                <Button onClick={handleEditCategory}>Cambiar nombre</Button>
                <Button onClick={() => setIsEditing(false)}>Cancelar</Button>
            </div>
            </Modal>
        )}

        {/* DELETE CATEGORY MODAL */}
        {confirmDelete && selectedCategory && (
            <Modal onClose={() => setConfirmDelete(false)}>
            {isCategoryInUse ? (
                <div className="text-center p-4">
                <h2 className="text-red-500 font-bold text-xl mb-2">
                    Cannot delete
                </h2>
                <p className="text-gray-700 dark:text-gray-300 mb-4">
                    Esta categoría está siendo usada por uno o más todos.
                </p>
                <Button
                    variant="secondary"
                    onClick={() => setConfirmDelete(false)}
                >
                    OK
                </Button>
                </div>
            ) : (
                <div className="text-center p-2">
                <h2 className="text-red-500 font-bold text-xl mb-2">
                    Delete Category
                </h2>
                <p className="text-gray-700 dark:text-gray-300">
                    Are you sure you want to delete <br />
                    <span className="font-semibold text-red-400">
                    {selectedCategory.name}
                    </span>
                    ?
                </p>
                <div className="flex justify-center gap-3 mt-4">
                    <Button
                    variant="danger"
                    onClick={() => {
                        dispatch(deleteCategory(selectedCategory.id));
                        const remaining = categories.filter(
                        (c) => c.id !== selectedCategory.id
                        );
                        setSelectedCategory(remaining[0] || null);
                        setConfirmDelete(false);
                    }}
                    >
                    Yes, delete
                    </Button>
                    <Button
                    variant="secondary"
                    onClick={() => setConfirmDelete(false)}
                    >
                    Cancel
                    </Button>
                </div>
                </div>
            )}
            </Modal>
        )}

        {/* BUTTON TO OPEN CATEGORY PANEL */}
        <Button
            onClick={() => setIsVisible(!isVisible)}
            variant="gradientBluePrimary"
            className="mb-2"
        >
            Categories
        </Button>

        {/* CATEGORY MENU */}
        {isVisible && selectedCategory && (
            <div>
            <select
                className="
                    w-full rounded-xl px-4 py-2 
                    bg-white dark:bg-gray-800 
                    text-gray-800 dark:text-gray-100 
                    border border-blue-400/30 
                    shadow-md 
                    focus:outline-none 
                    focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                    hover:shadow-lg 
                    transition-all duration-200
                    cursor-pointer
                "
                value={selectedCategory.id}
                onChange={(e) => {
                const cat = categories.find((c) => c.id === e.target.value);
                setSelectedCategory(cat || null);
                }}
            >
                {categories.map((c) => (
                <option key={c.id} value={c.id}>
                    {c.name}
                </option>
                ))}
            </select>

            <div className="flex flex-wrap mt-2 gap-2">
                <Button variant="gradientBlue" onClick={() => setIsEditing(true)}>
                Edit Category
                </Button>
                <Button variant="gradientBlue" onClick={() => setIsAdding(true)}>
                New Category
                </Button>
                <Button
                variant="danger"
                disabled={categories.length === 1}
                onClick={handleDeleteCategory}
                >
                Delete Category
                </Button>
            </div>
            </div>
        )}
        </>
    );
    }
