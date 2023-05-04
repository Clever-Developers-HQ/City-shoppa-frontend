import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import OrderService  from './orderService'


  const initialState: any = {
    Order: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const updateOrderAction = createAsyncThunk(
    "/updateOrderAction",
    async ({id, state, decline_reason, token}:any, thunkAPI,
    ) => {
      try {
        return await OrderService.updateOrder({id, token, decline_reason, state});
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
  
  export const updateOrderSlice = createSlice({
    name: "updateOrder",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.Order = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(updateOrderAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateOrderAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.Order = action.payload.Order;
          state.message = action.payload.status;
        })
        .addCase(updateOrderAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something went wrong";
          state.Order = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = updateOrderSlice.actions;
  
  export default updateOrderSlice.reducer;