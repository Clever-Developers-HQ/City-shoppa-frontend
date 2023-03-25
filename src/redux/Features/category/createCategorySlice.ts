import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import CategoryService, { CreateCategoryProps } from './categoryService'


  const initialState: any = {
    category: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


//create Category
export const createCategoryAction = createAsyncThunk(
    "/createCategoryAction",
    async (
      { name, token}: CreateCategoryProps,
      thunkAPI
    ) => {
      try {
        return await CategoryService.createCategory({
            name, token
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
  
  export const createCategory = createSlice({
    name: "createCategory",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.Category = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(createCategoryAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(createCategoryAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.category = action.payload.category.name;
          state.message = action.payload.status;
        })
        .addCase(createCategoryAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload;
          state.category = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = createCategory.actions;
  
  export default createCategory.reducer;