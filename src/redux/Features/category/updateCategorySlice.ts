import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Categoryervice,{ UpdateCategoryProps }  from './categoryService'

  
  const initialState: any = {
    category: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const updateCategoryAction = createAsyncThunk(
    "/updateCategoryAction",
    async ({id, token,  name}:UpdateCategoryProps, thunkAPI: any,
    ) => {
      try {
        return await Categoryervice.updateCategory({id, token,  name});
      } catch (error: any) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        toast.error(`${message}`);
        return thunkAPI.rejectWithValue(message);
      }
    }
  );
  
  export const updateCategorySlice = createSlice({
    name: "updateCategory",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.category = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(updateCategoryAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(updateCategoryAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.category = action.payload.category;
          state.message = "Category Updated Successfully";
        })
        .addCase(updateCategoryAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something went wrong";
          state.category = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = updateCategorySlice.actions;
  
  export default updateCategorySlice.reducer;