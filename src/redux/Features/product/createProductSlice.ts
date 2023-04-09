import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productService, {AddProductProps } from './productServices'


  const initialState: any = {
    Product: null,
    loading: false,
    coupon: null,
    error: false,
    success: false,
    message: "",
  };


//create Product
export const createProductAction = createAsyncThunk(
    "/createProductAction",
    async (
      { category_id, product_name, description, product_price, user_id, merchant_id, qty, token, brand, image, discount, imageTop, imageSide, imageBack}: AddProductProps,
      thunkAPI
    ) => {
      try {
        return await productService.createProduct({
            category_id, product_name, description, product_price, user_id, merchant_id, qty, token, brand, image, discount, imageTop, imageSide, imageBack
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
  
  export const createProduct = createSlice({
    name: "createProduct",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.Product = null;
        state.coupon = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createProductAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(createProductAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.Product = action.payload.cart;
          state.message = action.payload.status;
          state.coupon = action.payload.coupon
        })
        .addCase(createProductAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload ? action.payload : action.error.message;
          state.Product = null;
          state.coupon = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = createProduct.actions;
  
  export default createProduct.reducer;