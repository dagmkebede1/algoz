import { createSlice, createAsyncThunk, isPending } from "@reduxjs/toolkit";
import { axiosInstance } from "../../utility/axios";

const initialState = {
  isLoading: true,
  isAuth: false,
  user: {},
  errMessage: "",
};

export const getUser = createAsyncThunk("getUser", async (name, thunkAPI) => {
  return axiosInstance
    .get("/me")
    .then((resp) => {
      return resp.data.me;
    })
    .catch((err) => {
      throw err.response.data.message;
    });
});

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  extraReducers: {
    [getUser.pending]: (state) => {
      state.isLoading = true;
    },
    [getUser.fulfilled]: (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.isLoading = false;
    },
    [getUser.rejected]: (state, action) => {
      state.isAuth = false;
      state.errMessage = action.error;
      state.isLoading = false;
    },
  },
});

export default authSlice.reducer;

// export const getUserAction = authSlice.actions;
