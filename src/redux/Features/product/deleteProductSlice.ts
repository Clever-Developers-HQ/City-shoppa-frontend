import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import productervice,{ ProductProps }  from './productServices'



  
  const initialState: any = {
    product: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const deleteProductAction = createAsyncThunk(
    "/deleteProductAction",
    async ({product_id, token}:ProductProps, thunkAPI: any,
    ) => {
      try {
        return await productervice.deleteProduct({product_id, token});
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
  
  export const deleteProductSlice = createSlice({
    name: "deleteProduct",
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
        .addCase(deleteProductAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteProductAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.product = action.payload.message;
        })
        
        .addCase(deleteProductAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something Went Wrong";
          state.product = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = deleteProductSlice.actions;
  
  export default deleteProductSlice.reducer;