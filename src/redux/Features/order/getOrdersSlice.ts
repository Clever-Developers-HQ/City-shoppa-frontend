import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import orderservice from './orderService'

  const initialState: any = {
    orders: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const getOrdersAction = createAsyncThunk(
    "/getUserAction",
    async (token:string, thunkAPI: any,
    ) => {
      try {
        return await orderservice.getOrders(token);
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
  
  
  export const getOrdersSlice = createSlice({
    name: "getUser",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.orders = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getOrdersAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getOrdersAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.orders = action.payload.responses;
        })
        
        .addCase(getOrdersAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "Something went wrong";
          state.orders = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getOrdersSlice.actions;
  
  export default getOrdersSlice.reducer;