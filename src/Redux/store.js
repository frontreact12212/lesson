import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./Slices/todoSlice.js";
import userReducer from "./Slices/authSlice.js"


export const store = configureStore({
    reducer: {
        todo: todoReducer,
        users: userReducer
    },
});