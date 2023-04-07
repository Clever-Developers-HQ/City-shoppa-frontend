import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userService, {RegisterUserProps } from './userService'


  
  const initialState: any = {
    user: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


//REGISTER user
export const userRegisterAction = createAsyncThunk(
    "/userRegisterAction",
    async (
      { name, token, phone, password, email}: RegisterUserProps,
      thunkAPI
    ) => {
      try {
        return await userService.registerUser({
            name, token, phone, password, email
        });
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.warning(`${message}`);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  export const userRegister = createSlice({
    name: "userRegister",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.user = null;
      },
    },
    extraReducers: (builder) => {
      
      builder
        .addCase(userRegisterAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(userRegisterAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.user = action.payload.user;
          state.message = action.payload.status;
        })
        .addCase(userRegisterAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload;
          state.user = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = userRegister.actions;
  
  export default userRegister.reducer;