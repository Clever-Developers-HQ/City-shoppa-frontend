import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import featureService from './featureService'
import { CreateFeatureProps } from "./featureService";


  const initialState: any = {
    Feature: "",
    loading: false,
    error: false,
    success: false,
    message: "",
  };



export const createFeatureAction = createAsyncThunk(
    "/createFeatureAction",
    async (
      { token, image}: CreateFeatureProps,
      thunkAPI
    ) => {
      try {
        return await featureService.createFeature({
            image, token
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
  
  export const createFeature = createSlice({
    name: "createFeature",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.feature = "";
      },
    },
    extraReducers: (builder) => {

      builder
        .addCase(createFeatureAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(createFeatureAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.feature = action.payload;
          state.message = action.payload;
        })
        .addCase(createFeatureAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload;
          state.feature = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = createFeature.actions;
  
  export default createFeature.reducer;