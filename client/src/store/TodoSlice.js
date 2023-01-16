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

const URL = `${process.env.REACT_APP_SERVER}/todos`;

export const getTodosThunk = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(URL, config);
  dispatch(setTodos(response.data))
}

export const addTodoThunk = (todo) => async (dispatch) => {
  const data = { todo };
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(URL, data, config);
  dispatch(setTodos(response.data));
}

export const updateTodoThunk = (todoId, todo) => async (dispatch) => {
  const data = { todoId, todo };
  const token = localStorage.getItem("token");
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.put(URL, data, config);
  dispatch(setTodos(response.data));
}

export const deleteTodoThunk = (todoId) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const response = await axios.delete(URL, {
    headers: {
      Authorization: `Bearer ${token}`
    },
    data: { todoId }
  });
  dispatch(setTodos(response.data));
}



export const { setTodos } = todoSlice.actions;

export default todoSlice.reducer;