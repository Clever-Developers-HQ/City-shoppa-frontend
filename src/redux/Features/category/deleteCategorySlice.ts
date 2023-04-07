import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import categoryervice,{ CategoryProps }  from './categoryService'
  
  const initialState: any = {
    category: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER Category
export const deleteCategoryAction = createAsyncThunk(
    "/deleteCategoryAction",
    async ({id,token}:CategoryProps, thunkAPI: any,
    ) => {
      try {
        return await categoryervice.deleteCategory({id, token});
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
  
  export const deleteCategorySlice = createSlice({
    name: "deleteCategory",
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
        .addCase(deleteCategoryAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteCategoryAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.category = action.payload.message;
        })
        
        .addCase(deleteCategoryAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something Went Wrong";
          state.category = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = deleteCategorySlice.actions;
  
  export default deleteCategorySlice.reducer;