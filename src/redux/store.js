import { createSlice, configureStore } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
  },
  reducers: {
    login(state) {
      state.isLogin = true;
      //window.open("http://localhost:3000/")

    },
    logout(state) {
      state.isLogin = false;
    },
  },
});
export const authActions = authSlice.actions;

export const store = configureStore({
  reducer: authSlice.reducer,
});