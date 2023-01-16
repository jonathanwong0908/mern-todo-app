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

export const getTodosThunk = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const url = `${process.env.REACT_APP_SERVER}/todos`;
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.get(url, config);
  dispatch(setTodos(response.data))
}

export const addTodoThunk = (todo) => async (dispatch) => {
  const token = localStorage.getItem("token");
  const url = `${process.env.REACT_APP_SERVER}/todos`;
  const data = { todo };
  const config = { headers: { Authorization: `Bearer ${token}` } };
  const response = await axios.post(url, data, config);
  dispatch(setTodos(response.data));
}

export const { setTodos } = todoSlice.actions;

export default todoSlice.reducer;