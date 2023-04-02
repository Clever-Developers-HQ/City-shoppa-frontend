import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import featureervice,{ FeatureProps }  from './featureService'

  
  const initialState: any = {
    feature: null,
    loading: false,
    error: false,
    success: false,
    message: "",
  };


export const deleteFeatureAction = createAsyncThunk(
    "/deleteFeatureAction",
    async ({id,token}:FeatureProps, thunkAPI: any,
    ) => {
      try {
        return await featureervice.deleteFeature({id, token});
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
  
  export const deleteFeatureSlice = createSlice({
    name: "deleteFeature",
    initialState,
    reducers: {
    

      reset: (state) => {
        state.loading = false;
        state.error = false;
        state.success = false;
        state.message = "";
        state.feature = null;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(deleteFeatureAction.pending, (state) => {
          state.loading = true;
        })
        .addCase(deleteFeatureAction.fulfilled, (state, action) => {

          state.loading = false;
          state.success = true;
          state.message = action.payload.message;
        })
        
        .addCase(deleteFeatureAction.rejected, (state, action) => {
          state.loading = false;
          state.error = true;
          state.message = "Something Went Wrong";
          state.feature = null;
        });
    },
  });
  
  // Action creators are generated for each case reducer function
  export const { reset } = deleteFeatureSlice.actions;
  
  export default deleteFeatureSlice.reducer;