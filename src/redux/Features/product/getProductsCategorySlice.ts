import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Productservice from './productServices'



  const initialState: any = {
    products: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const getProductsCategoryAction = createAsyncThunk(
    "/getProductsCategoryAction",
    async (
        category_id : string,
      thunkAPI: any,
    ) => {
      try {
        return await Productservice.getProductsCategory(category_id);
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
  
  export const getProductsCategorySlice = createSlice({
    name: "getProductsCategory",
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
        .addCase(getProductsCategoryAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getProductsCategoryAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.products = action.payload.categoryProduct;
          state.message = action.payload.status
        })
        .addCase(getProductsCategoryAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "Something  Went Wrong. Please Try Again";
          state.products = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getProductsCategorySlice.actions;
  
  export default getProductsCategorySlice.reducer;