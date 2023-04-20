import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import orderService, {CreateOrderProps} from './orderService'


  const initialState: any = {
    order: null,
    loading: false,
    coupon: null,
    error: false,
    success: false,
    message: "",
  };


//create Order
export const createOrderAction = createAsyncThunk(
    "/createOrderAction",
    async (
      { products, quantity, userId}: CreateOrderProps,
      thunkAPI
    ) => {
      try {
        return await orderService.createOrder({
            products, quantity, userId
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
  
  export const createOrder = createSlice({
    name: "createOrder",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.order = null;
        state.coupon = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createOrderAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(createOrderAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.order = action.payload.cart;
          state.message = action.payload.status;
          state.coupon = action.payload.coupon
        })
        .addCase(createOrderAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload ? action.payload : action.error.message;
          state.order = null;
          state.coupon = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = createOrder.actions;
  
  export default createOrder.reducer;