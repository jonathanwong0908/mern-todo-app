import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  todos: []
}

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload.todos
    }
  }
})