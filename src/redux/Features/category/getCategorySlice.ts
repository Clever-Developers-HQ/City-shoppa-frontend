import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import categoryService,{ CategoryProps }  from './categoryService'


  const initialState: any = {
    category: null,
    loading: false,
    error: false,
    success: false,
    message: "",
    products: null
  };


export const getCategoryAction = createAsyncThunk(
    "/getCategoryAction",
    async ({id,token}:CategoryProps, thunkAPI: any,
    ) => {
      try {
        return await categoryService.getCategory({id, token});
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
  
  export const getCategorySlice = createSlice({
    name: "getCategory",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.category = null;
        state.products = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getCategoryAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getCategoryAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.category = action.payload.category;
          state.products = action.payload.categoryProduct;
        })
        
        .addCase(getCategoryAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload || "Something went wrong";
          state.category = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getCategorySlice.actions;
  
  export default getCategorySlice.reducer;