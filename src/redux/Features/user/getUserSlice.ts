import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userServices,{ UserProps }  from './userService'

  const initialState: any = {
    user: null,
    loading: false,
    error: false,
    success: false,
    message: "",
    orders: null
  };


export const getUserAction = createAsyncThunk(
    "/getUserAction",
    async ({id,token}:UserProps, thunkAPI: any,
    ) => {
      try {
        return await userServices.getUser({id, token});
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
  
  
  export const getUserSlice = createSlice({
    name: "getUser",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.user = null;
        state.orders = null
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getUserAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getUserAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.user = action.payload.user;
          state.orders = action.payload.userOrder;
        })
        
        .addCase(getUserAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "Something went wrong";
          state.user = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getUserSlice.actions;
  
  export default getUserSlice.reducer;