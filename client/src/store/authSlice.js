import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const token = localStorage.getItem("token");

const initialState = {
  isAuthenticated: token ? true : false,
  token: token ? token : null,
  user: null
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.user = action.payload.user.username;
    },
    logout: state => {
      state.isAuthenticated = false;
      state.token = null;
      state.user = null;
    }
  }
})

export const signupThunk = ({ username, password }) =>
  async () => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/auth/signup`,
      { username, password }
    )
    console.log(response.data.username);
  }

export const loginThunk = ({ username, password }) =>
  async (dispatch) => {
    const response = await axios.post(
      `${process.env.REACT_APP_SERVER}/auth/login`,
      { username, password }
    )
    const { token, user } = response.data;
    localStorage.setItem("token", response.data.token);
    await dispatch(login({ token, user }));
  }


export const logoutThunk = () => async (dispatch) => {
  localStorage.removeItem("token");
  dispatch(logout());
}

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;