import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import orderService from './orderService'


  const initialState: any = {
    order: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER Order
export const getOrderAction = createAsyncThunk(
    "/getOrderAction",
    async (id:string, thunkAPI,
    ) => {
      try {
        return await orderService.getOrder(id);
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.error ||
          error.toString();
        toast.warning(`${message}`);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  export const getOrderSlice = createSlice({
    name: "getOrder",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.order = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getOrderAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getOrderAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.order = action.payload.order;
          state.status = action.payload.status
        })
        .addCase(getOrderAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "Something went wrong";
          state.order = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getOrderSlice.actions;
  
  export default getOrderSlice.reducer;