import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";



export const fetchUsers = createAsyncThunk("Users/fetchUsers",
    async () => {
        const res = await axios.get("http://localhost:4000/users")
        return res.data
    }
)


export const deleteUser = createAsyncThunk("Users/deleteUser",
    async (id) => {
        const res = await axios.delete(`http://localhost:4000/users/${id}`)
        return res.data
    }
)

export const addUser = createAsyncThunk("Users/addUser",
    async (info) => {
        const res = await axios.post(`http://localhost:4000/users`, info)
        return res.data
    }
)

export const editUser = createAsyncThunk("Users/editUser",
    async (editedUser) => {
        const res = await axios.patch(`http://localhost:4000/users/${editedUser.id}`, {title: editedUser.title})
        return res.data
    }
)


const UserSlice = createSlice({
    name: "Users",
    initialState: {
        Users: [],
        loading: false,
        errors: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state)=>{
                state.loading = true
                state.errors = null
            })
            .addCase(fetchUsers.fulfilled, (state, action)=>{
                state.loading = false
                    // state.errors = null
                state.Users = action.payload
            })
            .addCase(fetchUsers.rejected, (state, action)=>{
                state.loading = false
                state.errors = action.error.message
            })
            .addCase(deleteUser.fulfilled, (state, action) =>{
                state.Users = state.Users.filter((User) => User.id !== action.payload.id)
            })
            .addCase(addUser.fulfilled, (state, action)=>{
                state.Users = [...state.Users, action.payload]
            })
            .addCase(editUser.fulfilled, (state, action)=>{
                state.Users = state.Users.map((User) => User.id === action.payload.id ? action.payload : User)
            })

    }
})


export default UserSlice.reducer