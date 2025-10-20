import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";



export const fetchTodos = createAsyncThunk("todos/fetchTodos",
    async () => {
        const res = await axios.get("http://localhost:4000/todo")
        return res.data
    }
)


export const deleteTodo = createAsyncThunk("todos/deleteTodo",
    async (id) => {
        const res = await axios.delete(`http://localhost:4000/todo/${id}`)
        return res.data
    }
)

export const addTodo = createAsyncThunk("todos/addTodo",
    async (title) => {
        const res = await axios.post(`http://localhost:4000/todo`, {title: title})
        return res.data
    }
)

export const editTodo = createAsyncThunk("todos/editTodo",
    async (editedTodo) => {
        const res = await axios.patch(`http://localhost:4000/todo/${editedTodo.id}`, {title: editedTodo.title})
        return res.data
    }
)


const todoSlice = createSlice({
    name: "todos",
    initialState: {
        todos: [],
        loading: false,
        errors: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state)=>{
                state.loading = true
                state.errors = null
            })
            .addCase(fetchTodos.fulfilled, (state, action)=>{
                state.loading = false
                    // state.errors = null
                state.todos = action.payload
            })
            .addCase(fetchTodos.rejected, (state, action)=>{
                state.loading = false
                state.errors = action.error.message
            })
            .addCase(deleteTodo.fulfilled, (state, action) =>{
                state.todos = state.todos.filter((todo) => todo.id !== action.payload.id)
            })
            .addCase(addTodo.fulfilled, (state, action)=>{
                state.todos = [...state.todos, action.payload]
            })
            .addCase(editTodo.fulfilled, (state, action)=>{
                state.todos = state.todos.map((todo) => todo.id === action.payload.id ? action.payload : todo)
            })

    }
})


export default todoSlice.reducer