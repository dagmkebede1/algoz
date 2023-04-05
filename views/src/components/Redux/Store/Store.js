import { configureStore } from "@reduxjs/toolkit";
import authSllice from "../Reducers/authSllice";
export const store = configureStore({
  reducer: { auth: authSllice },
});
