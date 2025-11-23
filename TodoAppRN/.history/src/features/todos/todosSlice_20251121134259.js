// src/features/todos/todosSlice.js
import { createSlice } from "@reduxjs/toolkit";

/* ---------------- helpers para localStorage y IDs autoincrementales ---------------- */

function load(key, fallback) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : fallback;
    } catch {
        return fallback;
    }
    }

    function saveAll(state) {
    try {
        localStorage.setItem("todos", JSON.stringify(state.todos));
        localStorage.setItem("categories", JSON.stringify(state.categories));
        localStorage.setItem("deletedTodos", JSON.stringify(state.deletedTodos));
        localStorage.setItem("clearedTodos", JSON.stringify(state.clearedTodos));
    // eslint-disable-next-line no-unused-vars
    } catch (e) {
        // ignore
    }
    }

    /** Devuelve el siguiente id numérico (como string) basado en la lista.
     *  Si hay ids no numéricos los ignora.
     */
    function getNextId(list) {
    const nums = list
        .map((it) =>
        typeof it.id === "number" || /^\d+$/.test(String(it.id))
            ? Number(it.id)
            : NaN
        )
        .filter((n) => !isNaN(n));
    return nums.length > 0 ? String(Math.max(...nums) + 1) : "1";
    }

    /* ---------------- estado inicial ---------------- */

    const defaultCategories = [
    { id: "1", name: "Importante" },
    { id: "2", name: "Trabajo" },
    { id: "3", name: "Medico" },
    { id: "4", name: "Compra" },
    ];

    const initialState = {
    todos: load("todos", [
        // ejemplos iniciales (usando categoryId)
        {
        id: "1",
        text: "Making the first flow reduct",
        completed: false,
        createdAt: Date.now(),
        categoryId: "1",
        },
        {
        id: "2",
        text: "React app",
        completed: false,
        createdAt: Date.now(),
        categoryId: "2",
        },
        {
        id: "3",
        text: "Optimizing everything",
        completed: false,
        createdAt: Date.now(),
        categoryId: "2",
        },
        {
        id: "4",
        text: "Posting it online",
        completed: false,
        createdAt: Date.now(),
        categoryId: "1",
        },
    ]),
    categories: load("categories", defaultCategories),
    deletedTodos: load("deletedTodos", []),
    clearedTodos: load("clearedTodos", []),
    filter: "all",
    categoryFilter: "all",
    };

    /* ---------------- slice ---------------- */

    const todosSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        // Añadir un todo: payload { text, categoryId? }
        addTodo: (state, action) => {
        const text = action.payload?.text?.trim();
        if (!text) return;

        const categoryId =
            action.payload?.categoryId ??
            (state.categories[0] && state.categories[0].id) ??
            "1";

        const newId = getNextId(state.todos);
        state.todos.push({
            id: newId,
            text,
            completed: false,
            createdAt: Date.now(),
            categoryId,
        });

        saveAll(state);
        },

        // Toggle completado (payload: todoId)
        toggleTodo: (state, action) => {
        const t = state.todos.find((todo) => todo.id === action.payload);
        if (t) {
            t.completed = !t.completed;
            saveAll(state);
        }
        },

        // Delete -> mueve a deletedTodos con deletedAt y lo borra de todos
        // payload: todoId
        deleteTodo: (state, action) => {
        const todo = state.todos.find((t) => t.id === action.payload);
        if (!todo) return;

        state.deletedTodos.push({
            ...todo,
            deletedAt: Date.now(),
            id: `${todo.id}-${Date.now()}` // asegura que sea único
            });


        state.todos = state.todos.filter((t) => t.id !== action.payload);
        saveAll(state);
        },

        // Clear completed -> mueve a clearedTodos con clearedAt y los borra de todos
        clearCompleted: (state,) => {
        const now = Date.now();
        const completed = state.todos.filter((t) => t.completed);
        if (completed.length === 0) return;

        state.clearedTodos.push(
            ...completed.map((t) => ({
                ...t,
                clearedAt: now,
                id: `${t.id}-${now}`,
            }))
        );
        state.todos = state.todos.filter((t) => !t.completed);
        saveAll(state);
        },

        // Cambiar texto de un todo (payload: { id, newName })
        changeTodoName: (state, action) => {
        const { id, newName } = action.payload;
        const t = state.todos.find((todo) => todo.id === id);
        if (t) {
            t.text = newName;
            saveAll(state);
        }
        },

        // Cambiar categoría de un todo (payload: { id, newCategoryId })
        changeTodoCategory: (state, action) => {
        const { id, newCategoryId } = action.payload;
        const t = state.todos.find((todo) => todo.id === id);
        if (t) {
            t.categoryId = newCategoryId;
            saveAll(state);
        }
        },

        // Añadir categoría (payload: name)
        addCategory: (state, action) => {
        const name = (action.payload || "").trim();
        if (!name) return;
        if (state.categories.some((c) => c.name === name)) return;

        const newId = getNextId(state.categories);
        state.categories.push({ id: newId, name });
        saveAll(state);
        },

        // Renombrar categoría (payload: { id, newName })
        renameCategory: (state, action) => {
        const { id, newName } = action.payload;
        const trimmed = (newName || "").trim();
        if (!trimmed) return;

        // evitar duplicados por nombre
        if (state.categories.some((c) => c.name === trimmed)) return;

        const cat = state.categories.find((c) => c.id === id);
        if (!cat) return;

        cat.name = trimmed;
        saveAll(state);
        },

        // Borrar categoría (payload: categoryId)
        deleteCategory: (state, action) => {
            const id = action.payload;

            // ❌ No permitir eliminar la última categoría
            if (state.categories.length === 1) return;

            // ❌ No permitir si está en uso
            const inUse = state.todos.some(t => t.categoryId === id);
            if (inUse) return;

            // ✔️ Borrar
            state.categories = state.categories.filter(c => c.id !== id);
            saveAll(state);
        },


        // Filters
        setFilter: (state, action) => {
        state.filter = action.payload;
        // no guardamos filtros globales en localStorage aquí (opcional)
        },

        setCategoryFilter: (state, action) => {
        state.categoryFilter = action.payload;
        },
    },
    });

    export const {
    addTodo,
    toggleTodo,
    deleteTodo,
    changeTodoCategory,
    changeTodoName,
    addCategory,
    renameCategory,
    deleteCategory,
    clearCompleted,
    setFilter,
    setCategoryFilter,
    } = todosSlice.actions;

    export default todosSlice.reducer;
