import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productService from './productServices'


  const initialState: any = {
    product: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER Product
export const getProductAction = createAsyncThunk(
    "/getProductAction",
    async (product_id : string, thunkAPI,
    ) => {
      try {
        return await productService.getProduct(product_id);
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
  
  export const getProductSlice = createSlice({
    name: "getProduct",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.product = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getProductAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getProductAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.Product = action.payload.response;
        })
        .addCase(getProductAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "Something went wrong";
          state.Product = null;
          state.products = []
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getProductSlice.actions;
  
  export default getProductSlice.reducer;