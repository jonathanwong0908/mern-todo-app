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
  const response = await axios.get(
    `${process.env.REACT_APP_SERVER}/todos`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  dispatch(setTodos(response.data))
}

export const { setTodos } = todoSlice.actions;

export default todoSlice.reducer;