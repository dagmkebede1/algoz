import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuth: false,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login() {},
    logout() {},
  },
});

export default authSlice.reducer;
export const { login, logout } = authSlice.actions;

console.log("Abeba");
console.log("Kebede");

setTimeout(() => {
  console.log("Almaz");
}, 0);

console.log("Challa");
