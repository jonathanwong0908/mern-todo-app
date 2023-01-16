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
      state.todos = action.payload;
    }
  }
})

const TOKEN = localStorage.getItem("token");
const URL = `${process.env.REACT_APP_SERVER}/todos`;
const CONFIG = { headers: { Authorization: `Bearer ${TOKEN}` } };

export const getTodosThunk = () => async (dispatch) => {
  const response = await axios.get(URL, CONFIG);
  dispatch(setTodos(response.data))
}

export const addTodoThunk = (todo) => async (dispatch) => {
  const data = { todo };
  const response = await axios.post(URL, data, CONFIG);
  dispatch(setTodos(response.data));
}

export const updateTodoThunk = (todoId, todo) => async (dispatch) => {
  const data = { todoId, todo };
  const response = await axios.put(URL, data, CONFIG);
  dispatch(setTodos(response.data));
}

export const deleteTodoThunk = (todoId) => async (dispatch) => {
  const response = await axios.delete(URL, {
    headers: {
      Authorization: `Bearer ${TOKEN}`
    },
    data: { todoId }
  });
  dispatch(setTodos(response.data));
}



export const { setTodos } = todoSlice.actions;

export default todoSlice.reducer;