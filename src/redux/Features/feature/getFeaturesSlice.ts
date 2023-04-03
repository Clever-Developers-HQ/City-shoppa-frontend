import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";import type { PayloadAction } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import featureservice from './featureService'



  const initialState: any = {
    features: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };

//REGISTER MERCHANT
export const getFeaturesAction = createAsyncThunk(
    "/getFeaturesAction",
    async (
      thunkAPI: any,
    ) => {
      try {
        return await featureservice.getFeatures();
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
  
  export const getFeaturesSlice = createSlice({
    name: "getFeatures",
    initialState,
    reducers: {
      //non asynchronous reducers goes here
      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.features = null;

      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(getFeaturesAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(getFeaturesAction.fulfilled, (state, action) => {
          state.loading = false;
          state.success = true;
          state.features = action.payload.feature;
          state.message = action.payload.status;
        })
        .addCase(getFeaturesAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = action.payload;
          state.features = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = getFeaturesSlice.actions;
  
  export default getFeaturesSlice.reducer;