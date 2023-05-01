import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import userService,{ UpdateUser }  from './userService'

  
  const initialState: any = {
    user: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const updateUserAction = createAsyncThunk(
    "/updateUserAction",
    async ({id, merchant_application, role,  token, business_name, address, website}:any, thunkAPI: any,
    ) => {
      try {
        return await userService.updateUser({id, merchant_application, role,  token, business_name, address, website});
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(`${message}`);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  export const updateUserSlice = createSlice({
    name: "updateUser",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.User = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(updateUserAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateUserAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.User = action.payload.User;
          state.message = action.payload.status;
        })
        .addCase(updateUserAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something went wrong";
          state.User = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = updateUserSlice.actions;
  
  export default updateUserSlice.reducer;