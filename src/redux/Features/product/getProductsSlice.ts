import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Productservice from './productServices'



  const initialState: any = {
    products: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER MERCHANT
export const getProductsAction = createAsyncThunk(
    "/getProductsAction",
    async (
      thunkAPI: any,
    ) => {
      try {
        return await Productservice.getProducts();
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
  
  export const getProductsSlice = createSlice({
    name: "getProducts",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.products = null;

      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getProductsAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getProductsAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.products = action.payload.product;
          state.message = action.payload.status
        })
        .addCase(getProductsAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload;
          state.products = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getProductsSlice.actions;
  
  export default getProductsSlice.reducer;